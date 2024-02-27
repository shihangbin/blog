# Nodejs

## Nodejs 简介

Nodejs 是基于 Chrome V8 引擎的 javascript 运行的。

- javascript 运行时：JS 代码的运行环境
- Chrome V8 引擎
  - 浏览器内核：主要分为“渲染引擎”和 “JS 引擎”
    - 渲染引擎：负责解析 HTML 和 CSS 代码
    - JS 引擎：赋值解析 JS 代码
  - V8 引擎是谷歌公司开发的一款 JS 引擎，目前公认的解析 JS 代码最快的引擎

Nodejs 让 javascript 代码可以运行在服务端

## 命令行工具

`cd`：进入某个文件夹

- cd 后面可以跟某个路径（建议直接拖）
- cd 后面还可以跟文件夹名字（该文件夹必须当前路径的子文件）

## 模块化

每个 JS 文件都是独立的模块，模块之间是没有关联的。默认情况下模块之间不能进行数据交换。

以前“模块化”是后端的一种概念，前端没有模块化，从 ES6 开始前端也引入模块化的概念。

### 前端模块化

#### 引入 JS

- 在 HTML 引入 JS：需要添加一个`type="module"`属性

```javascript
<script
	src='./index.js'
	type='module'></script>
```

- 在 JS 中引入 JS：一个模块中加载另一个模块`import '相对路径'`

```javascript
import './a.js'
```

#### 暴露和引入

1.1 暴露`export default`

```javascript
function foo() {
	console.log('foo')
}
export default { a: 1, foo: foo }
```

1.2 引入`import 变量名 from '相对路径'`

```javascript
import a from './a'
console.log(a.a)
a.foo()
```

2.1 暴露`export`

```javascript
export let a = 1
export function foo {
    console.log('hello foo')
}
```

2.2 引入`import { 变量名 } from '相对路径'`

```javascript
import { a } from './a.js'
// 重命名
import { a as A } './a.js'
```

### 后端模块化

#### CommonJS

ECMAscript 是一种规范，javascript 是这个规范的实现

CommonJS 是一种规范，NodeJS 是这个规范的实现

- 在 JS 中引入 JS：

```javascript
require('./a.js')
```

- 暴露和引入 JS：

  - 暴露

```javascript
module.exports.a = 10
module.exports = { a: 10 }
```

- 引入

```javascript
const a = require('./a.js')
const { a } = require('./a.js')
```

注意：

1.  当前使用 require 去加载某个模块时，除了第一次加载会运行文件以外（第一次运行完成后会进行缓存），后续的加载都会从缓存中读取文件内容。换句话说同一个文件被 require 多次，只执行一次。
2.  require 中的 JS 文件后缀可以省略。
3.  require 中的路径如果有模块名，那就说明引入的是第三方下载的模块或者是 NodeJS 原生自带的模块

## 内置模块

### fs

- 读取文件`fs.readFile`异步

```javascript
// 异步
fs.readFile('./test.txt', 'utf-8', (err, data) => {
	if (err) {
		console.log('异步读取失败：', err)
	} else {
		console.log('异步读取成功', data)
	}
})
```

- 读取文件`fs.readFileSync`同步

```javascript
// 同步
try {
	const result = fs.readFileSync('./test.txt', 'utf-8')
	console.log('同步读取成功', result)
} catch (error) {
	console.log('同步读取失败', error)
}
```

- `fs.writeFile`往文件里写入内容 (会覆盖，会自动创建文件（但不会创建文件夹）)

```javascript
fs.writeFile('./test.txt', 'hello world', (err) => {
	if (err) {
		console.log('写入失败', err)
	} else {
		console.log('写入成功')
	}
})
```

- `fs.appendFile`往文件追加内容

```javascript
fs.appendFile('./test.txt', '\n这是新加的内容', (err) => {}
```

- `fs.copyFile`复制文件

```javascript
fs.copyFile('./test.txt', './test2.txt', (err) => {}
```

- `fs.unlink`文件删除

```javas
fs.unlink('./test.txt', (err) => {}
```

- `fs.rename`文件重命名

```js
fs.rename('./test.txt','test1.txt',(err)=>{}
```

- `fs.mkdir`创建文件夹（只能创建一个文件夹）

```js
fs.mkdir('./public', (err) => {
	if (err) {
		console.log('创建文件夹失败', err)
	} else {
		console.log('创建文件夹成功')
	}
})
```

- `fs.rmdir`删除文件夹(只能删除空文件夹)

```js
fs.rmdir('./a', (err) => {}
```

- `fs.readdir`读取文件夹内容

```js
fs.readdir('./a', (err, data) => {}
```

- `fs.access`判断文件（文件夹是否存在）

```js
fs.access('./a/b/c', (err) => {}
```

- `fs.stat`查看文件（文件夹状态）:判断是文件还是文件夹

```js
fs.stat('./a', (err, stats) => {
	if (err) {
		console.log('查看失败', err)
	} else {
		const isFile = stats.isFile()
		const idDir = stats.isDirectory()
		console.log(isFile, idDir)
	}
})
```

### path

**path 获取**

- `basename()`：获取指定路径中最后一部分

```js
const path = require('path')
const myPath = __dirname + '\\a.js'
console.log(path.basename(myPath))
```

- `dirname()`：获取指定路径中除了 basename 以外的其他路径

```js
console.log(path.dirname(myPath))
```

- `extname()`：获取指定路径对应的扩展名

```js
console.log(path.extname(myPath))
```

**path 组合**

- `join()`：相对路径

```js
console.log(path.join('a', 'b', 'c')) // a/b/c
```

- `resolve()`：绝对路径

```js
console.log(path.resolve('a', 'b', 'c')) // E://xxx/a/b/c
```

**path 拆分**

- `parse()`：从对象返回路径字符串

```js
console.log(path.parse(myPath))
/* {
  root: 'E:\\',
  dir: 'E:\\nodejs\\02-nodejs模块',
  base: 'a.js',
  ext: '.js',
  name: 'a'
} */
```

### http

```js
const http = require('http')

// 创建本地服务器来从其接收数据
// request(req)：请求对象，包含了请求相关的数据和方法
// response(res)：响应对象，包含响应相关的数据和方法
const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'application/json' })
	res.end(
		JSON.stringify({
			data: 'Hello World!',
		})
	)
})

server.listen(3000, () => {
	console.log('服务器开启成功端口号为：http://localhost:3000/')
}) // http://localhost:3000/
```
