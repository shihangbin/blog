#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const EXTS = ['.md', '.mdx']

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (EXTS.includes(path.extname(e.name))) out.push(p)
  }
  return out
}

function fixCorruptedHtml(content) {
  // 1. 暴力修复最常见的属性破坏
  let t = content.replace(/`class`=/g, 'class=')
  t = t.replace(/`for`=/g, 'for=')

  // 2. 找到所有类似 HTML 的标签 <div ...>，把标签内部的反引号全部剔除
  t = t.replace(/<[a-zA-Z0-9-]+(?:[\s\n]+[^>]*?)?>/g, match => {
    return match.replace(/`/g, '')
  })

  return t
}

const files = walk(path.resolve(process.cwd(), 'docs'))
let changed = 0

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const fixed = fixCorruptedHtml(raw)
  if (fixed !== raw) {
    changed++
    fs.writeFileSync(file, fixed, 'utf8')
    console.log(`[FIXED HTML] ${path.relative(process.cwd(), file)}`)
  }
}

console.log(`完成！修复了 ${changed} 个文件中的损坏 HTML 标签。`)
// 修复 Markdown 文件中被误伤的 HTML 标签
// 使用方法:
//   node rescue-html.mjs
