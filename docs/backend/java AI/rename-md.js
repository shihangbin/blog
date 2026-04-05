import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前目录（兼容 ES module）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 获取当前目录下所有 .md 文件
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.md'))

// 按照文件名排序（保持当前顺序）
files.sort((a, b) => a.localeCompare(b))

let n = 1
for (const oldName of files) {
  // 获取文件名（不含扩展名）
  const baseName = path.basename(oldName, '.md')

  // 去掉开头的数字、点、下划线
  const cleanName = baseName.replace(/^[\d\._]+/, '')

  // 生成新的编号（两位数，01、02...）
  const num = n.toString().padStart(2, '0')
  const newName = `${num}_${cleanName}.md`

  // 如果新旧名字相同，跳过
  if (oldName === newName) {
    console.log(`跳过: ${oldName} (已经是正确格式)`)
    n++
    continue
  }

  // 检查目标文件是否已存在
  if (fs.existsSync(path.join(__dirname, newName))) {
    console.log(`错误: ${newName} 已存在，跳过 ${oldName}`)
    n++
    continue
  }

  // 重命名
  fs.renameSync(path.join(__dirname, oldName), path.join(__dirname, newName))
  console.log(`重命名: ${oldName} -> ${newName}`)
  n++
}

console.log(`\n完成！共处理 ${n - 1} 个文件`)
