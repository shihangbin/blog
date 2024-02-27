# fs 模块

## 读取 api

https://nodejs.org/docs/latest-v16.x/api/fs.html

## flag

flag 的值有很多：https://nodejs.org/dist/latest-v14.x/docs/api/fs.html#fs_file_system_flags

- w 打开文件写入，默认值；
- w+打开文件进行读写（可读可写），如果不存在则创建文件；
- r 打开文件读取，读取时的默认值；
- r+ 打开文件进行读写，如果不存在那么抛出异常；
- a 打开要写入的文件，将流放在文件末尾。如果不存在则创建文件；
- a+打开文件以进行读写（可读可写），将流放在文件末尾。如果不存在则创建文件

## 同步读取

```js
const fs = require('fs')

const res = fs.readFileSync('./aaa.txt', { encoding: 'utf-8' })
console.log(res)
```

## 异步读取

```js
fs.readFile('./aaa.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log('读取错误', err)
    return
  }
  console.log('读取结果', data)
})
```

## 异步读取: Promise

```js
fs.promises
  .readFile('./aaa.txt', { encoding: 'utf-8' })
  .then((res) => {
    console.log('获取结果', res)
  })
  .catch((err) => {
    console.log('发生错误', err)
  })
```

## 文件描述符使用

```js
// 打开一个文件
fs.open('./bbb.txt', (err, fd) => {
  if (err) {
    console.log('打开文件错误:', err)
    return
  }

  // 1.获取文件描述符
  console.log(fd)

  // 2.读取到文件的信息
  fs.fstat(fd, (err, stats) => {
    if (err) return
    console.log(stats)

    // 3.手动关闭文件
    fs.close(fd)
  })
})
```

## 写入 api

```js
const fs = require('fs')

// 1.有一段内容(客户端传递过来http/express/koa)
const content = 'hello world, my name is coderwhy'

// 2.文件的写入操作
fs.writeFile(
  './ccc.txt',
  content,
  {
    encoding: 'utf8',
    flag: 'a',
  },
  (err) => {
    if (err) {
      console.log('文件写入错误:', err)
    } else {
      console.log('文件写入成功')
    }
  }
)
```

## 创建文件夹

```js
const fs = require('fs')

// 创建文件夹 directory
fs.mkdir('./why', (err) => {
  console.log(err)
})
```

## 读取文件夹

```js
const fs = require('fs')

// 读取文件夹
// 1.读取文件夹, 获取到文件夹中文件的字符串
fs.readdir('./why', (err, files) => {
  console.log(files)
})

// 2.读取文件夹, 获取到文件夹中文件的信息
fs.readdir('./why', { withFileTypes: true }, (err, files) => {
  files.forEach((item) => {
    if (item.isDirectory()) {
      console.log('item是一个文件夹:', item.name)

      fs.readdir(
        `./why/${item.name}`,
        { withFileTypes: true },
        (err, files) => {
          console.log(files)
        }
      )
    } else {
      console.log('item是一个文件:', item.name)
    }
  })
})

// 3.递归的读取文件夹中所有的文件
function readDirectory(path) {
  fs.readdir(path, { withFileTypes: true }, (err, files) => {
    files.forEach((item) => {
      if (item.isDirectory()) {
        readDirectory(`${path}/${item.name}`)
      } else {
        console.log('获取到文件:', item.name)
      }
    })
  })
}
readDirectory('./why')
```

## 从命名

```js
const fs = require('fs')

// 1.对文件夹进行重命名
fs.rename('./why', './kobe', (err) => {
  console.log("重命名结果:", err)
// })

// 2.对文件重命名
fs.rename('./ccc.txt', './ddd.txt', (err) => {
  console.log('重命名结果:', err)
})
```
