# stream

什么是 Stream（小溪、小河，在编程中通常翻译为流）呢？

- 我们的第一反应应该是`流水，源源不断的流动`；
- 程序中的流也是`类似的含义`，我们可以想象`当我们从一个文件中读取数据时，文件的二进制（字节）数据会源源不断的被读取到我们程序中`；
- 而`这个一连串的字节，就是我们程序中的流`；

所以，我们可以这样理解流：

- 是`连续字节的一种表现形式和抽象概念`；
- 流应该是`可读的`，也是`可写的`；

在之前学习文件的读写时，我们可以直接通过 readFile 或者 writeFile 方式读写文件，为什么还需要流呢？

- 直接读`写文件的方式，虽然简单`，但是`无法控制一些细节的操作`；
- 比如从`什么位置开始读、读到什么位置、一次性读取多少个字节`；
- 读到`某个位置`后，`暂停读取`，`某个时刻恢复继续读取`等等；
- 或者这个`文件非常大`，比如`一个视频文件`，`一次性全部读取并不合适`；

事实上 Node 中很多对象是基于流实现的：

- `http` 模块的 `Request` 和 `Response` 对象；

官方文档：另外所有的流都是 EventEmitter 的实例。

那么在 Node 中都有哪些流呢？

Node.js 中有四种基本流类型：

- `Writable`：可以向其`写入数据的流`（例如 [fs.createWriteStream()](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_createwritestream_path_options)）。
- `Readable`：可以从中`读取数据的流`（例如 [fs.createReadStream()](https://nodejs.org/dist/latest-v15.x/docs/api/fs.html#fs_fs_createreadstream_path_options)）。
- `Duplex`：同时为 Readable 和 Writable（例如 [net.Socket](https://nodejs.org/dist/latest-v15.x/docs/api/net.html#net_class_net_socket)）。
- `Transform`：Duplex `可以在写入和读取数据时修改或转换数据的流`（例如 [zlib.createDeflate()](https://nodejs.org/dist/latest-v15.x/docs/api/zlib.html#zlib_zlib_createdeflate_options)）。

这里我们通过 fs 的操作，讲解一下 Writable、Readable，另外两个大家可以自行学习一下。

## 基本使用

```js
const fs = require('fs')

// 通过流读取文件
// 1.创建一个可读流
// start: 从什么位置开始读取
// end: 读取到什么位置后结束(包括end位置字节)
// highWaterMark：一次性读取字节的长度，默认是64kb；
const readStream = fs.createReadStream('./aaa.txt', {
  start: 8,
  end: 22,
  highWaterMark: 3,
})

readStream.on('data', (data) => {
  console.log(data.toString())
  // 关闭流
  readStream.pause()

  setTimeout(() => {
    // 打开流
    readStream.resume()
  }, 2000)
})
```

## 可读流其他事件

```js
const fs = require('fs')

// 1.通过流读取文件
const readStream = fs.createReadStream('./aaa.txt', {
  start: 8,
  end: 22,
  highWaterMark: 3,
})

// 2.监听读取到的数据
readStream.on('data', (data) => {
  console.log(data.toString())
})

// 3.补充其他的事件监听
readStream.on('open', (fd) => {
  console.log('通过流将文件打开~', fd)
})

readStream.on('end', () => {
  console.log('已经读取到end位置')
})

readStream.on('close', () => {
  console.log('文件读取结束, 并且被关闭')
})
```

## 可写流使用过程

```js
const fs = require('fs')

// 1.一次性写入内容
fs.writeFile(
  './bbb.txt',
  'hello world',
  {
    encoding: 'utf-8',
    flag: 'a+',
  },
  (err) => {
    console.log('写入文件结果:', err)
  }
)

// 2.创建一个写入流
const writeStream = fs.createWriteStream('./ccc.txt', {
  flags: 'a',
})

writeStream.on('open', (fd) => {
  console.log('文件被打开', fd)
})

writeStream.write('coderwhy')
writeStream.write('aaaa')
writeStream.write('bbbb', (err) => {
  console.log('写入完成:', err)
})

writeStream.on('finish', () => {
  console.log('写入完成了')
})

writeStream.on('close', () => {
  console.log('文件被关闭~')
})

// 3.写入完成时, 需要手动去掉用close方法
writeStream.close()

// 4.end方法:
// 操作一: 将最后的内容写入到文件中, 并且关闭文件
// 操作二: 关闭文件
writeStream.end('哈哈哈哈')
```

## 文件的拷贝流

```js
const fs = require('fs')

// 1.方式一: 一次性读取和写入文件
fs.readFile('./foo.txt', (err, data) => {
  console.log(data)
  fs.writeFile('./foo_copy01.txt', data, (err) => {
    console.log('写入文件完成', err)
  })
})

// 2.方式二: 创建可读流和可写流
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo_copy02.txt')

readStream.on('data', (data) => {
  writeStream.write(data)
})

readStream.on('end', () => [writeStream.close()])

// 3.在可读流和可写流之间建立一个管道
const readStream = fs.createReadStream('./foo.txt')
const writeStream = fs.createWriteStream('./foo_copy03.txt')

readStream.pipe(writeStream)
```
