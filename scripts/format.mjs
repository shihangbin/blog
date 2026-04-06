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

  for (let line of lines) {
    if (!inFence) {
      const mk = parseFenceMarker(line)
      if (mk) {
        flush('normal')
        inFence = true
        st = mk

        // === 新增：如果代码块没有指定语言，默认补上 shell ===
        const fenceStr = mk.ch.repeat(mk.len)
        const afterFence = line.substring(line.indexOf(fenceStr) + mk.len).trim()
        if (!afterFence) {
          line = line.replace(fenceStr, fenceStr + 'shell')
        }

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
    return `『『${bag.length - 1}』』`
  }

  let t = text

  // === 0. 预处理 ===
  t = t.replace(/\\<([^>]+)>/g, '`<$1>`')
  t = t.replace(/\\\[([^\]]+)\]/g, '`[$1]`')

  // === 保护各种语法块 ===
  t = t.replace(/^---\n[\s\S]*?\n---/g, prot)
  t = t.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, prot)
  t = t.replace(/<[^>]+>/g, prot)
  t = t.replace(/`[^`]*`/g, prot)
  t = t.replace(/!?\[[^\]]*\]\([^)]+\)/g, prot)
  t = t.replace(/^:::.*$/gm, prot)
  t = t.replace(/^\|?[\s\-:]+\|[\s\-:|]*$/gm, prot)
  t = t.replace(/https?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/g, prot)
  t = t.replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, prot)
  t = t.replace(/&[a-zA-Z0-9#]+;/g, prot)
  t = t.replace(/:[a-zA-Z0-9_+-]+:/g, prot)
  t = t.replace(/\$\$[\s\S]*?\$\$/g, prot)
  t = t.replace(/\$[^$\n]+\$/g, prot)
  t = t.replace(/^( {4,}|\t).*$/gm, prot)

  // === 核心执行：全量英文与数字 ===
  const engRe = /\b[a-zA-Z0-9_][a-zA-Z0-9_.-]*\b/g

  // 物理切割，绝不误伤占位符
  const parts = t.split(/(『『\d+』』)/)
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith('『『')) {
      parts[i] = parts[i].replace(engRe, m => `\`${m}\``)
    }
  }
  t = parts.join('')

  // 还原内容
  let prev = ''
  while (t !== prev) {
    prev = t
    t = t.replace(/『『(\d+)』』/g, (_, i) => bag[Number(i)])
  }

  // === 智能排版合并 ===
  let prevMerge = ''
  while (t !== prevMerge) {
    prevMerge = t
    t = t.replace(/`([^`\n]+)`[ \t]*`([^`\n]+)`/g, '`$1 $2`')
  }

  t = t.replace(/`([^`\n]+)`([ \t]*([.]{2,}|…+))(?=[ \t]|\||$|，|。|、)/g, '`$1$2`')

  t = t.replace(/([\u4e00-\u9fa5])`/g, '$1 `')
  t = t.replace(/`([\u4e00-\u9fa5])/g, '` $1')

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
// 格式化所有 Markdown 文件
// 使用方法:
//  node scripts/format.mjs --verify
