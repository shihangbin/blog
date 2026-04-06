#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

/**
 * 用法:
 *   node scripts/backtick-body-only-verified.mjs --dry-run
 *   node scripts/backtick-body-only-verified.mjs
 *   node scripts/backtick-body-only-verified.mjs --dir=docs --ext=.md,.mdx --verify
 */

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
  // 可按需增删
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
const kwRe = new RegExp(`\\b(${kw.map(escapeRegExp).join('|')})\\b`, 'g')

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

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
  // 允许最多3个空格缩进（CommonMark）
  const m = line.match(/^( {0,3})(`{3,}|~{3,})(.*)$/)
  if (!m) return null
  return { indent: m[1].length, ch: m[2][0], len: m[2].length }
}

function isFenceClose(line, st) {
  // 关闭围栏：同类型字符，长度 >= 开始长度，允许前导 <= 3 空格，后面只允许空白
  const re = new RegExp(`^( {0,3})(${st.ch}{${st.len},})\\s*$`)
  return re.test(line)
}

function splitByFences(content) {
  const lines = content.split('\n')
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

function protectInlineCode(line) {
  const bag = []
  const text = line.replace(/`[^`\n]*`/g, m => {
    const token = `@@IC_${bag.length}@@`
    bag.push(m)
    return token
  })
  return {
    text,
    restore: s => s.replace(/@@IC_(\d+)@@/g, (_, i) => bag[Number(i)]),
  }
}

function isIndentedCodeLine(line) {
  // 缩进代码块：4空格或tab
  return /^( {4,}|\t)/.test(line)
}

function transformNormalPart(text) {
  const lines = text.split('\n')
  const out = lines.map(line => {
    if (!line.trim()) return line
    if (isIndentedCodeLine(line)) return line

    const { text: p, restore } = protectInlineCode(line)
    const replaced = p.replace(kwRe, m => `\`${m}\``)
    return restore(replaced)
  })
  return out.join('\n')
}

function extractFenceBodies(content) {
  return splitByFences(content)
    .filter(p => p.type === 'fence')
    .map(p => p.text)
}

function transformFile(raw) {
  const parts = splitByFences(raw)
  return parts.map(p => (p.type === 'fence' ? p.text : transformNormalPart(p.text))).join('\n')
}

function main() {
  const abs = path.resolve(process.cwd(), ROOT_DIR)
  if (!fs.existsSync(abs)) {
    console.error(`[ERR] dir not found: ${abs}`)
    process.exit(1)
  }

  const files = walk(abs)
  let changed = 0

  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8')
    const next = transformFile(raw)

    if (VERIFY) {
      const beforeFences = extractFenceBodies(raw)
      const afterFences = extractFenceBodies(next)
      if (beforeFences.length !== afterFences.length) {
        console.error(`[VERIFY FAIL] fence count changed: ${file}`)
        process.exit(2)
      }
      for (let i = 0; i < beforeFences.length; i++) {
        if (beforeFences[i] !== afterFences[i]) {
          console.error(`[VERIFY FAIL] fence content changed: ${file} (fence #${i + 1})`)
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

  console.log(`Done. ${DRY_RUN ? '[dry-run] ' : ''}changed: ${changed}/${files.length}`)
}

main()
