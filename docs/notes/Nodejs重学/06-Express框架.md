# Express

官网: https://www.expressjs.com.cn/

前面我们已经学习了使用 http 内置模块来搭建 Web 服务器，为什么还要使用框架？

- 原生 http 在进行很多处理时，会较为复杂；
- 有 URL 判断、Method 判断、参数处理、逻辑代码处理等，都需要我们自己来处理和封装；
- 并且所有的内容都放在一起，会非常的混乱；

目前在 Node 中比较流行的 Web 服务器框架是 express、koa；

- 我们先来学习 express，后面再学习 koa，并且对他们进行对比；

express 早于 koa 出现，并且在 Node 社区中迅速流行起来：

- 我们可以基于 express 快速、方便的开发自己的 Web 服务器；
- 并且可以通过一些实用工具和中间件来扩展自己功能；

## Express 安装

express 的使用过程有两种方式：

- 方式一：通过 express 提供的脚手架，直接创建一个应用的骨架；
- 方式二：从零搭建自己的 express 应用结构；

方式一：安装 express-generator

```sh
# 安装脚手架
npm install -g express-generator
# 创建项目
express express-demo
# 安装依赖
npm install
# 启动项目
node bin/www
```

方式二：从零搭建自己的 express 应用结构；

```sh
npm init -y
```

## 基本使用

```js
const express = require('express')

// 1.创建express的服务器
const app = express()

// 客户端访问URL: /login和/home
app.post('/login', (req, res) => {
  // 处理login请求
  res.end('登录成功, 欢迎回来~')
})

app.get('/home', (req, res) => {
  res.end('首页的轮播图/推荐数据列表~')
})

// 2.启动服务器, 并且监听端口
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 认识中间件

- 请求对象（request 对象）；
- 响应对象（response 对象）；
- next 函数（在 express 中定义的用于执行下一个中间件的函数）

```js
const express = require('express')

const app = express()

// 给express创建的app传入一个回调函数
// 传入的这个回调函数就称之为是中间件(middleware)
// app.post('/login', 回调函数 => 中间件)
app.post('/login', (req, res, next) => {
  // 1.中间件中可以执行任意代码
  console.log('first middleware exec~')
  // 打印
  // 查询数据
  // 判断逻辑

  // 2.在中间件中修改req/res对象
  req.age = 99

  // 3.可以在中间件中结束响应周期
  // res.json({ message: "登录成功, 欢迎回来", code: 0 })

  // 4.执行下一个中间件
  next()
})

app.use((req, res, next) => {
  console.log('second middleware exec~')
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 注册普通中间件

```js
const express = require('express')

const app = express()

// 总结: 当express接收到客户端发送的网络请求时, 在所有中间中开始进行匹配
// 当匹配到第一个符合要求的中间件时, 那么就会执行这个中间件
// 后续的中间件是否会执行呢? 取决于上一个中间件有没有执行next

// 通过use方法注册的中间件是最普通的/简单的中间件
// 通过use注册的中间件, 无论是什么请求方式都可以匹配上
// login/get
// login/post
// abc/patch
app.use((req, res, next) => {
  console.log('normal middleware 01')
  // res.end('返回结果了, 不要等了')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware 02')
})

// 开启服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 注册路径匹配

```js
const express = require('express')

const app = express()

// 注册普通的中间件
// app.use((req, res, next) => {
//   console.log('match normal middleware')
//   res.end('--------')
// })

// 注册路径匹配的中间件
// 路径匹配的中间件是不会对请求方式(method)进行限制
app.use('/home', (req, res, next) => {
  console.log('match /home middleware')
  res.end('home data')
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 注册路径-方法匹配

```js
const express = require('express')

const app = express()

// 注册中间件: 对path/method都有限制
// app.method(path, middleware)
app.get('/home', (req, res, next) => {
  console.log('match /home get method middleware')
  res.end('home data')
})

app.post('/users', (req, res, next) => {
  console.log('match /users post method middleware')
  res.end('create user success')
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 注册多个中间件

```js
const express = require('express')

const app = express()

// app.get(路径, 中间件1, 中间件2, 中间件3)
app.get(
  '/home',
  (req, res, next) => {
    console.log('match /home get middleware01')
    next()
  },
  (req, res, next) => {
    console.log('match /home get middleware02')
    next()
  },
  (req, res, next) => {
    console.log('match /home get middleware03')
    next()
  },
  (req, res, next) => {
    console.log('match /home get middleware04')
  }
)

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 中间件匹配练习

```js
const express = require('express')

const app = express()

// 1.注册两个普通的中间件
app.use((req, res, next) => {
  console.log('normal middleware01')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware02')
  next()
})

// 2.注册路径path/method的中间件
app.get(
  '/home',
  (req, res, next) => {
    console.log('/home get middleware01')
    next()
  },
  (req, res, next) => {
    console.log('/home get middleware02')
    next()
  }
)

app.post('/login', (req, res, next) => {
  console.log('/login post middleware')
  next()
})

// 3.注册普通的中间件
app.use((req, res, next) => {
  console.log('normal middleware03')
  next()
})

app.use((req, res, next) => {
  console.log('normal middleware04')
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 中间件案例

```js
const express = require('express')

const app = express()

// 注册两个实际请求的中间件
// 案例一: 用户登录的请求处理 /login post => username/password
app.post('/login', (req, res, next) => {
  // 1.获取本次请求过程中传递过来的json数据
  let isLogin = false
  req.on('data', (data) => {
    const dataString = data.toString()
    const dataInfo = JSON.parse(dataString)
    if (dataInfo.username === 'coderwhy' && dataInfo.password === '123456') {
      isLogin = true
    }
  })

  req.on('end', () => {
    if (isLogin) {
      res.end('登录成功, 欢迎回来~')
    } else {
      res.end('登录失败, 请检测账号和密码是否正确~')
    }
  })
})

// 案例二: 注册用户的请求处理 /register post => username/password
app.post('/register', (req, res, next) => {
  // 1.获取本次请求过程中传递过来的json数据
  let isRegister = false
  req.on('data', (data) => {
    const dataString = data.toString()
    const dataInfo = JSON.parse(dataString)
    // 查询数据库中该用户是否已经注册过
    isRegister = false
  })

  req.on('end', () => {
    if (isRegister) {
      res.end('注册成功, 开始你的旅程~')
    } else {
      res.end('注册失败, 您输入的用户名被注册~')
    }
  })
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 中间件案例(重构)

```js
const express = require('express')

const app = express()

// 直接使用express提供给我们的中间件
app.use(express.json())

// 注册两个实际请求的中间件
// 案例一: 用户登录的请求处理 /login post => username/password
app.post('/login', (req, res, next) => {
  console.log(req.body)
})

// 案例二: 注册用户的请求处理 /register post => username/password
app.post('/register', (req, res, next) => {
  console.log(req.body)
})

app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 中间件应用-urlencoded

```js
const express = require('express')

// 创建app对象
const app = express()

// 应用一些中间件
app.use(express.json()) // 解析客户端传递过来的json
// 解析传递过来urlencoded的时候, 默认使用的node内置querystring模块
// { extended: true }: 不再使用内置的querystring, 而是使用qs第三方库
app.use(express.urlencoded({ extended: true })) // 解析客户端传递过来的urlencoded

// 编写中间件
app.post('/login', (req, res, next) => {
  console.log(req.body)
  res.end('登录成功, 欢迎回来~')
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 单个文件上传

```js
const express = require('express')
const multer = require('multer')

// 创建app对象
const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})
// 应用一个express编写第三方的中间件
const upload = multer({
  storage,
})

// 编写中间件
// 上传单文件: singer方法
app.post('/avatar', upload.single('avatar'), (req, res, next) => {
  console.log(req.file)
  res.end('文件上传成功~')
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 多个文件上传

```js
const express = require('express')
const multer = require('multer')

// 创建app对象
const app = express()

// 应用一个express编写第三方的中间件
const upload = multer({
  // dest: './uploads'
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, './uploads')
    },
    filename(req, file, callback) {
      callback(null, Date.now() + '_' + file.originalname)
    },
  }),
})

// 编写中间件
// 上传单文件: single方法
app.post('/avatar', upload.single('avatar'), (req, res, next) => {
  console.log(req.file)
  res.end('文件上传成功~')
})

// 上传多文件:
app.post('/photos', upload.array('photos'), (req, res, next) => {
  console.log(req.files)
  res.end('上传多张照片成功~')
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## formdata 解析

```js
const express = require('express')
const multer = require('multer')

// 创建app对象
const app = express()

// express内置的插件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 编写中间件
const formdata = multer()

app.post('/login', formdata.any(), (req, res, next) => {
  console.log(req.body)
  res.end('登录成功, 欢迎回来~')
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 客户端参数解析

客户端传递到服务器参数的方法常见的是 5 种：

- 方式一：通过 get 请求中的 URL 的 params；
- 方式二：通过 get 请求中的 URL 的 query；
- 方式三：通过 post 请求中的 body 的 json 格式（中间件中已经使用过）；
- 方式四：通过 post 请求中的 body 的 x-www-form-urlencoded 格式（中间件使用过）；
- 方式五：通过 post 请求中的 form-data 格式（中间件中使用过）；

```js
const express = require('express')

// 创建app对象
const app = express()

// 编写中间件
// 1.解析queryString
app.get('/home/list', (req, res, next) => {
  // offset/size
  const queryInfo = req.query
  console.log(queryInfo)

  res.end('data list数据')
})

// 2.解析params参数
app.get('/users/:id', (req, res, next) => {
  const id = req.params.id

  res.end(`获取到${id}的数据~`)
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## 服务器返回数据方式

end 方法

- 类似于 http 中的 response.end 方法，用法是一致的

json 方法

- json 方法中可以传入很多的类型：object、array、string、boolean、number、null 等，它们会被转换成 json 格式返回；

status 方法

- 用于设置状态码；
- 注意：这里是一个函数，而不是属性赋值；
  更多响应的方式：https://www.expressjs.com.cn/4x/api.html#res

```js
const express = require('express')

// 创建app对象
const app = express()

// 编写中间件
app.post('/login', (req, res, next) => {
  // 1.res.end方法(比较少)
  // res.end('登录成功, 欢迎回来~')

  // 2.res.json方法(最多)
  // res.json({
  //   code: 0,
  //   message: '欢迎回来~',
  //   list: [
  //     { name: 'iPhone', price: 111 },
  //     { name: 'iPad', price: 111 },
  //     { name: 'iMac', price: 111 },
  //     { name: 'Mac', price: 111 },
  //   ]
  // })

  // 3.res.status方法: 设置http状态码
  res.status(201)
  res.json('创建用户成功~')
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## Express 中路由的使用方式

```js
// 路由文件
const express = require('express')

// 1.创建路由对象
const userRouter = express.Router()

// 2.定义路由对象中的映射接口
userRouter.get('/', (req, res, next) => {
  res.json('用户列表数据')
})
userRouter.get('/:id', (req, res, next) => {
  const id = req.params.id
  res.json('某一个用户的数据:' + id)
})
userRouter.post('/', (req, res, next) => {
  res.json('创建用户成功')
})
userRouter.delete('/:id', (req, res, next) => {
  const id = req.params.id
  res.json('删除某一个用户的数据:' + id)
})
userRouter.patch('/:id', (req, res, next) => {
  const id = req.params.id
  res.json('修改某一个用户的数据:' + id)
})

// 3.将路由导出
module.exports = userRouter
```

```js
// app文件
const express = require('express')
const userRouter = require('./router/userRouter')

// 创建app对象
const app = express()

// 编写中间件
app.post('/login', (req, res, next) => {})

app.get('/home', (req, res, next) => {})

// 让路由生效
app.use('/users', userRouter)

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## Express 静态资源服务器

```js
const express = require('express')

// 创建app对象
const app = express()

// 内置的中间件: 直接将一个文件夹作为静态资源
app.use(express.static('./uploads'))
app.use(express.static('./build'))

// 编写中间件
app.post('/login', (req, res, next) => {})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```

## Express 错误处理方案

```js
const express = require('express')

// 创建app对象
const app = express()

app.use(express.json())

// 编写中间件
app.post('/login', (req, res, next) => {
  // 1.获取登录传入的用户名和密码
  const { username, password } = req.body

  // 2.对用户名和密码进行判断
  if (!username || !password) {
    next(-1001)
  } else if (username !== 'coderwhy' || password !== '123456') {
    next(-1002)
  } else {
    res.json({
      code: 0,
      message: '登录成功, 欢迎回来~',
      token: '323dfafadfa3222',
    })
  }
})

// 错误处理的中间件
app.use((errCode, req, res, next) => {
  const code = errCode
  let message = '未知的错误信息'

  switch (code) {
    case -1001:
      message = '没有输入用户名和密码'
      break
    case -1002:
      message = '输入用户名或密码错误'
      break
  }

  res.json({ code, message })
})

// 启动服务器
app.listen(9000, () => {
  console.log('express服务器启动成功~')
})
```
