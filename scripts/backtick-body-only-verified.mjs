#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const args = process.argv.slice(2)
const getArg = (name, fallback = '') => {
  const hit = args.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.slice(name.length + 3) : fallback
}

const ROOT_DIR = getArg('dir', 'docs')
const EXTS = getArg('ext', '.md,.mdx')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
const DRY_RUN = args.includes('--dry-run')
const VERIFY = args.includes('--verify')

const keywords = [
  'class',
  'public',
  'private',
  'protected',
  'static',
  'final',
  'void',
  'int',
  'long',
  'float',
  'double',
  'boolean',
  'byte',
  'short',
  'char',
  'if',
  'else',
  'for',
  'while',
  'switch',
  'case',
  'break',
  'continue',
  'return',
  'new',
  'null',
  'true',
  'false',
  'import',
  'package',
  'try',
  'catch',
  'throw',
  'throws',
  'extends',
  'implements',
  'interface',
]

const kw = Array.from(new Set(keywords)).sort((a, b) => b.length - a.length)
const kwRe = new RegExp(
  `\\b(${kw.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'g'
)

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (EXTS.includes(path.extname(e.name))) out.push(p)
  }
  return out
}

function parseFenceMarker(line) {
  const m = line.match(/^([ \t]*)(`{3,}|~{3,})/)
  if (!m) return null
  return { ch: m[2][0], len: m[2].length }
}

function isFenceClose(line, st) {
  const re = new RegExp(`^[ \\t]*${st.ch}{${st.len},}\\s*$`)
  return re.test(line)
}

function splitByFences(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const parts = []
  let buf = []
  let inFence = false
  let st = null

  const flush = type => {
    if (!buf.length) return
    parts.push({ type, text: buf.join('\n') })
    buf = []
  }

  for (const line of lines) {
    if (!inFence) {
      const mk = parseFenceMarker(line)
      if (mk) {
        flush('normal')
        inFence = true
        st = mk
        buf.push(line)
      } else {
        buf.push(line)
      }
    } else {
      buf.push(line)
      if (isFenceClose(line, st)) {
        flush('fence')
        inFence = false
        st = null
      }
    }
  }
  flush(inFence ? 'fence' : 'normal')
  return parts
}

function transformNormalPart(text) {
  const bag = []
  const prot = m => {
    bag.push(m)
    return `@@PROT_${bag.length - 1}@@`
  }

  let t = text

  // 1. 保护 Script 和 Style 块（VitePress 特有）
  t = t.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, prot)

  // 2. 保护 HTML/Vue 标签（支持跨多行的标签，彻底解决 Element is missing end tag）
  t = t.replace(/<[^>]+>/g, prot)

  // 3. 保护行内代码
  t = t.replace(/`[^`]*`/g, prot)

  // 4. 保护 Markdown 链接和图片
  t = t.replace(/!?\[[^\]]*\]\([^)]+\)/g, prot)

  // 5. 保护缩进代码块（以 4 个空格或 Tab 开头的行）
  t = t.replace(/^( {4,}|\t).*$/gm, prot)

  // === 只有真正干净的正文文本，才会执行关键字替换 ===
  t = t.replace(kwRe, m => `\`${m}\``)

  // 还原所有被保护的内容
  let prev = ''
  while (t !== prev) {
    prev = t
    t = t.replace(/@@PROT_(\d+)@@/g, (_, i) => bag[Number(i)])
  }

  return t
}

function extractFenceBodies(content) {
  return splitByFences(content)
    .filter(p => p.type === 'fence')
    .map(p => p.text)
}

function main() {
  const abs = path.resolve(process.cwd(), ROOT_DIR)
  const files = walk(abs)
  let changed = 0
  let totalFencesFound = 0

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8')
    const parts = splitByFences(raw)

    // 多行全局处理，不拆分 \n，防止跨行组件断裂
    const next = parts
      .map(p => (p.type === 'fence' ? p.text : transformNormalPart(p.text)))
      .join('\n')

    if (VERIFY) {
      const beforeFences = extractFenceBodies(raw)
      const afterFences = extractFenceBodies(next)
      totalFencesFound += beforeFences.length

      if (beforeFences.length !== afterFences.length) {
        console.error(`\n[VERIFY FAIL] 发现代码块数量变动: ${file}`)
        process.exit(2)
      }
      for (let i = 0; i < beforeFences.length; i++) {
        if (beforeFences[i] !== afterFences[i]) {
          console.error(`\n[VERIFY FAIL] 代码块内容被污染: ${file}`)
          process.exit(2)
        }
      }
    }

    if (next !== raw) {
      changed++
      if (!DRY_RUN) fs.writeFileSync(file, next, 'utf8')
      console.log(`[CHANGED] ${path.relative(process.cwd(), file)}`)
    }
  }

  console.log(`\nDone. 保护了 ${totalFencesFound} 个代码块。 changed: ${changed}/${files.length}`)
}

main()
