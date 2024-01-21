# koa 框架

> 前面我们已经学习了 express，另外一个非常流行的 Node Web 服务器框架就是 Koa。

> Koa 官方的介绍：

- koa：next generation web framework for node.js；
- koa：node.js 的下一代 web 框架；

  > 事实上，koa 是 express 同一个团队开发的一个新的 Web 框架：

- 目前团队的`核心开发者 TJ 的主要精力也在维护 Koa`，express 已经交给团队维护了；
- Koa 旨在为 Web 应用程序和 API 提供`更小、更丰富和更强大的能力`；
- 相`对于 express 具有更强`的异步处理能力（后续我们再对比）；
- `Koa 的核心代码只有 1600+行`，是一个`更加轻量级的框架`；
- 我们`可以根据需要安装和使用中间件`；

> 事实上学习了 express 之后，学习 koa 的过程是很简单的；

## Koa 初体验

> 我们来体验一下 koa 的 Web 服务器，创建一个接口。

- koa 也是通过注册中间件来完成请求操作的；

> koa 注册的中间件提供了两个参数：

> ctx：上下文（Context）对象；

- koa 并没有像 express 一样，将 req 和 res 分开，而是将它们作为 ctx 的属性；
- ctx 代表一次请求的上下文对象；
- ctx.request：获取请求对象；
- ctx.response：获取响应对象；

  > next：本质上是一个 dispatch，类似于之前的 next；

- 后续我们学习 Koa 的源码，来看一下它是一个怎么样的函数

![](https://img.xbin.cn/images/2023/10/10-20-31-b7bd06.png)

## Koa 中间件

> koa 通过创建的 app 对象，注册中间件只能通过 use 方法：

- Koa 并`没有提供methods的方式来注册中间件`；
- 也`没有提供path中间件来匹配路径`；

> 但是真实开发中我们如何将路径和 method 分离呢？

- 方式一：根据`request自己来判断`；
- 方式二：使用`第三方路由中间件`；

![](https://img.xbin.cn/images/2023/10/10-20-32-a262bf.png)

## 路由的使用

> koa 官方并没有给我们提供路由的库，我们可以选择第三方库：`koa-router`

```sh
npm install @koa/router
```

> 我们可以先封装一个 user.router.js 的文件：

> 在 app 中将 router.routes()注册为中间件：

> 注意：allowedMethods 用于判断某一个 method 是否支持：

- 如果我们请求 get，那么是正常的请求，因为我们有实现
  get；
- 如果我们请求 put、delete、patch，那么就自动报错：
  Method Not Allowed，状态码：405；
- 如果我们请求 link、copy、lock，那么久自动报错：Not
  Implemented，状态码：501；

![](https://img.xbin.cn/images/2023/10/10-20-33-03671c.png)

![](https://img.xbin.cn/images/2023/10/10-20-34-ab4f2b.png)

## 参数解析：params - query

> 请求地址：`http://localhost:8000/users/123`

- 获取 params：

![](https://img.xbin.cn/images/2023/10/10-20-37-fe4b2e.png)

> 请求地址：`http://localhost:8000/login?username=why&password=123`

- 获取 query：

![](https://img.xbin.cn/images/2023/10/10-20-37-f94acf.png)

## 参数解析：json

> 请求地址：`http://localhost:8000/login`

> body 是 json 格式

![](https://img.xbin.cn/images/2023/10/10-20-38-52ed4c.png)

> 获取 json 数据：

- 安装依赖： npm install koa-bodyparser;
- 使用 koa-bodyparser 的中间件；

![](https://img.xbin.cn/images/2023/10/10-20-39-bb7e2a.png)

## 参数解析：x-www-form-urlencoded

> 请求地址：`http://localhost:8000/login`

- body 是 x-www-form-urlencoded 格式：

![](https://img.xbin.cn/images/2023/10/10-20-39-3509ba.png)

> 获取 json 数据：(和 json 是一致的)

- 安装依赖： npm install koa-bodyparser;
- 使用 koa-bodyparser 的中间件；

![](https://img.xbin.cn/images/2023/10/10-20-40-6f5acd.png)

## 参数解析：form-data

> 请求地址：`http://localhost:8000/login`

- body 是 form-data 格式

![](https://img.xbin.cn/images/2023/10/10-20-41-b30ca2.png)

> 解析 body 中的数据，我们需要使用 multer

- 安装依赖：npm install koa-multer;
- 使用 multer 中间件；

![](https://img.xbin.cn/images/2023/10/10-20-41-65db76.png)

## Multer 上传文件

![](https://img.xbin.cn/images/2023/10/10-20-42-40c837.png)

## 静态服务器

> koa 并没有内置部署相关的功能，所以我们需要使用第三方库：

```sh
npm install koa-static
```

- 部署的过程类似于 express：

![](https://img.xbin.cn/images/2023/10/10-20-43-ed3414.png)

## 数据的响应

> 输出结果：body 将响应主体设置为以下之一：

- string ：字符串数据
- Buffer ：Buffer 数据
- Stream ：流数据
- Object|| Array：对象或者数组
- null ：不输出任何内容
- 如果 response.status 尚未设置，Koa 会自动将状态设置为 200 或 204。

> 请求状态：status

![](https://img.xbin.cn/images/2023/10/10-20-43-3f3075.png)

## 错误处理

![](https://img.xbin.cn/images/2023/10/10-20-44-4dfb0f.png)

## 创建 Koa 的过程

![](https://img.xbin.cn/images/2023/10/10-20-44-a030f2.png)

## 开启监听

![](https://img.xbin.cn/images/2023/10/10-20-45-f4a58f.png)

## 注册中间件

![](https://img.xbin.cn/images/2023/10/10-20-45-82e0cd.png)

## 监听回调

![](https://img.xbin.cn/images/2023/10/10-20-45-4814cb.png)

## compose 方法

![](https://img.xbin.cn/images/2023/10/10-20-46-871d9f.png)

## 和 express 对比

> 在学习了两个框架之后，我们应该已经可以发现 koa 和 express 的区别：

> 从架构设计上来说：

> express 是完整和强大的，其中帮助我们内置了非常多好用的功能；

> koa 是简洁和自由的，它只包含最核心的功能，并不会对我们使用其他中间件进行任何的限制。

- 甚至是在 app 中连最基本的 get、post 都没有给我们提供；
- 我们需要通过自己或者路由来判断请求方式或者其他功能；

> 因为 express 和 koa 框架他们的核心其实都是中间件：

- 但是他们的中间件事实上，它们的中间件的执行机制是不同的，特别是针对某个中间件中包含异步操作时；
- 所以，接下来，我们再来研究一下 express 和 koa 中间件的执行顺序问题；

## 案例实现

> 我通过一个需求来演示所有的过程：

- 假如有三个中间件会在一次请求中匹配到，并且按照顺序执行；
- 我希望最终实现的方案是：
  ✓ 在 middleware1 中，在 req.message 中添加一个字符串 aaa；
  ✓ 在 middleware2 中，在 req.message 中添加一个 字符串 bbb；
  ✓ 在 middleware3 中，在 req.message 中添加一个 字符串 ccc；
  ✓ 当所有内容添加结束后，在 middleware1 中，通过 res 返回最终的结果；

> 实现方案：

- Express 同步数据的实现；
- Express 异步数据的实现；
- Koa 同步数据的实现；
- Koa 异步数据的实现；
  > 具体的代码查看课堂演练

## koa 洋葱模型

两层理解含义：

- 中间件处理代码的过程；
- Response 返回 body 执行；

![](https://img.xbin.cn/images/2023/10/10-20-47-352d4b.png)
