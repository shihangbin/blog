# HTTP

## 基本使用

```js
const http = require('http')

// 创建一个 http 对应的服务器
const server = http.createServer((request, response) => {
  // request 对象中包含本次客户端请求的所有信息
  // 请求的 url
  // 请求的 method
  // 请求的 headers
  // 请求携带的数据

  // response 对象用于给客户端返回结果的
  response.end('Hello World')
})

// 开启对应的服务器, 并且告知需要监听的端口
// 监听端口时, 监听 1024 以上的端口, 666535 以下的端口
// 1025~65535 之间的端口
// 2 个字节 => 256\*256 => 65536 => 0~65535
server.listen(8000, () => {
  console.log('服务器已经开启成功了~')
})
```

## 创建多个服务器

```js
const http = require('http')

// 1.创建一个服务器
const server1 = http.createServer((req, res) => {
  res.end('2000端口服务器返回的结果~')
})
server1.listen(2000, () => {
  console.log('2000端口对应的服务器启动成功~')
})

// 2.创建第二个服务器
const server2 = http.createServer((req, res) => {
  res.end('3000端口服务器返回的结果~')
})
server2.listen(3000, () => {
  console.log('3000端口对应的服务器启动成功~')
})

// 3.创建第三个服务器
// const server3 = new http.Server()
```

## request

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // request对象中包含哪些信息?
  // 1.url信息
  console.log(req.url)
  // 2.method信息(请求方式)
  console.log(req.method)
  // 3.headers信息(请求信息)
  console.log(req.headers)

  res.end('hello world aaaa')
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 区分不同的 url

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  const url = req.url

  if (url === '/login') {
    res.end('登录成功~')
  } else if (url === '/products') {
    res.end('商品列表~')
  } else if (url === '/lyric') {
    res.end('天空好想下雨, 我好想住你隔壁!')
  }
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 区分不同的 method

在 Restful 规范（设计风格）中，我们对于数据的增删改查应该通过不同的请求方式：

- GET：查询数据；
- POST：新建数据；
- PATCH：更新数据；
- DELETE：删除数据；

所以，我们可以通过判断不同的请求方式进行不同的处理。

- 比如创建一个用户：
- 请求接口为 /users；
- 请求方式为 POST 请求；
- 携带数据 username 和 password；

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/login') {
    if (method === 'POST') {
      res.end('登录成功~')
    } else {
      res.end('不支持的请求方式, 请检测你的请求方式~')
    }
  } else if (url === '/products') {
    res.end('商品列表~')
  } else if (url === '/lyric') {
    res.end('天空好想下雨, 我好想住你隔壁!')
  }
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## query 参数

```js
const http = require('http')
const url = require('url')
const qs = require('querystring')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 1.参数一: query类型参数
  // /home/list?offset=100&size=20
  // 1.1.解析url
  const urlString = req.url
  const urlInfo = url.parse(urlString)

  // 1.2.解析query: offset=100&size=20
  const queryString = urlInfo.query
  const queryInfo = qs.parse(queryString)
  console.log(queryInfo.offset, queryInfo.size)

  res.end('hello world aaaa bbb')
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## body 参数

```js
const http = require('http')
const url = require('url')
const qs = require('querystring')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 获取参数: body参数
  req.setEncoding('utf-8')

  // request对象本质是上一个readable可读流
  let isLogin = false
  req.on('data', (data) => {
    const dataString = data
    const loginInfo = JSON.parse(dataString)
    if (loginInfo.name === 'coderwhy' && loginInfo.password === '123456') {
      isLogin = true
    } else {
      isLogin = false
    }
  })

  req.on('end', () => {
    if (isLogin) {
      res.end('登录成功, 欢迎回来~')
    } else {
      res.end('账号或者密码错误, 请检测登录信息~')
    }
  })
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## headers 参数

content-type 是这次请求携带的数据的类型：

- application/x-www-form-urlencoded：表示数据被编码成以 '&' 分隔的键 - 值对，同时以 '=' 分隔键和值
- application/json：表示是一个 json 类型；
- text/plain：表示是文本类型；
- application/xml：表示是 xml 类型；
- multipart/form-data：表示是上传文件；

content-length：文件的大小长度

keep-alive：

- http 是基于 TCP 协议的，但是通常在进行一次请求和响应结束后会立刻中断；
- 在 http1.0 中，如果想要继续保持连接：
  ✓ 浏览器需要在请求头中添加 connection: keep-alive；
  ✓ 服务器需要在响应头中添加 connection:keey-alive；
  ✓ 当客户端再次放请求时，就会使用同一个连接，直接一方中断连接；
- 在 http1.1 中，所有连接默认是 connection: keep-alive 的；
  ✓ 不同的 Web 服务器会有不同的保持 keep-alive 的时间；
  ✓ Node 中默认是 5s 中；

accept-encoding：告知服务器，客户端支持的文件压缩格式，比如 js 文件可以使用 gzip 编码，对应 .gz 文件；

accept：告知服务器，客户端可接受文件的格式类型；

user-agent：客户端相关的信息；

```js
const http = require('http')
const url = require('url')
const qs = require('querystring')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  console.log(req.headers)
  console.log(req.headers['content-type'])

  // cookie/session/token
  const token = req.headers['authorization']
  console.log(token)

  res.end('查看header的信息~')
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 响应方式

如果我们希望给客户端响应的结果数据，可以通过两种方式：

- Write 方法：这种方式是直接写出数据，但是并没有关闭流；
- end 方法：这种方式是写出最后的数据，并且写出后会关闭流；

如果我们没有调用 end 和 close，客户端将会一直等待结果：

- 所以客户端在发送网络请求时，都会设置超时时间。

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // res: response对象 => Writable可写流
  // 1.响应数据方式一: write
  res.write('Hello World')
  res.write('哈哈哈哈')

  // // 2.响应数据方式二: end
  res.end('本次写出已经结束')
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 响应状态

Http 状态码（Http Status Code）是用来表示 Http 响应状态的数字代码：

- Http 状态码非常多，可以根据不同的情况，给客户端返回不同的状态码；
- MDN 响应码解析地址：https://developer.mozilla.org/zh-CN/docs/web/http/status

![](https://img.xbin.cn/images/2023/09/15-12-04-f4cb6f.png)

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 响应状态码
  // 1.方式一: statusCode
  // res.statusCode = 403

  // 2.方式二: setHead 响应头
  res.writeHead(401)

  res.end('hello world aaaa')
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 响应 header

返回头部信息，主要有两种方式：

- res.setHeader：一次写入一个头部信息；
- res.writeHead：同时写入 header 和 status；

```js
const http = require('http')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  // 设置header信息: 数据的类型以及数据的编码格式
  // 1.单独设置某一个header
  // res.setHeader('Content-Type', 'text/plain;charset=utf8;')

  // 2.和http status code一起设置
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf8;',
  })

  const list = [
    { name: 'why', age: 18 },
    { name: 'kobe', age: 30 },
  ]
  res.end(JSON.stringify(list))
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```

## 发送 Axios

```js
const axios = require('axios')

axios.get('http://localhost:8000').then((res) => {
  console.log(res.data)
})
```

## 发送 http 请求

```js
const http = require('http')

// 1.使用http模块发送get请求
// http.get('http://localhost:8000', (res) => {
//   // 从可读流中获取数据
//   res.on('data', (data) => {
//     const dataString = data.toString()
//     const dataInfo = JSON.parse(dataString)
//     console.log(dataInfo)
//   })
// })

// 2.使用http模块发送post请求
const req = http.request(
  {
    method: 'POST',
    hostname: 'localhost',
    port: 8000,
  },
  (res) => {
    res.on('data', (data) => {
      const dataString = data.toString()
      const dataInfo = JSON.parse(dataString)
      console.log(dataInfo)
    })
  }
)

// 必须调用end, 表示写入内容完成
req.end()
```

## 上传图片

```js
const http = require('http')
const fs = require('fs')

// 1.创建server服务器
const server = http.createServer((req, res) => {
  req.setEncoding('binary')

  const boundary = req.headers['content-type']
    .split('; ')[1]
    .replace('boundary=', '')
  console.log(boundary)

  // 客户端传递的数据是表单数据(请求体)
  let formData = ''
  req.on('data', (data) => {
    formData += data
  })

  req.on('end', () => {
    console.log(formData)
    // 1.截图从image/jpeg位置开始后面所有的数据
    const imgType = 'image/jpeg'
    const imageTypePosition = formData.indexOf(imgType) + imgType.length
    let imageData = formData.substring(imageTypePosition)

    // 2.imageData开始位置会有两个空格
    imageData = imageData.replace(/^\s\s*/, '')

    // 3.替换最后的boundary
    imageData = imageData.substring(0, imageData.indexOf(`--${boundary}--`))

    // 4.将imageData的数据存储到文件中
    fs.writeFile('./bar.png', imageData, 'binary', () => {
      console.log('文件存储成功')
      res.end('文件上传成功~')
    })
  })
})

// 2.开启server服务器
server.listen(8000, () => {
  console.log('服务器开启成功~')
})
```
