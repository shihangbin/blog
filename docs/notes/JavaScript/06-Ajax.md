# 六. AJAX

- `ajax` 全名 `async javascript and XML`
- 是前后台交互的能力
- 也就是我们客户端给服务端发送消息的工具，以及接受响应的工具
- 是一个 **默认异步** 执行机制的功能 第三个属性 true 为异步，false 为同步

## AJAX 的优势

1.  不需要插件的支持，原生 js 就可以使用
2.  用户体验好（不需要刷新页面就可以更新数据）
3.  减轻服务端和带宽的负担
4.  缺点： 搜索引擎的支持度不够，因为数据都不在页面上，搜索引擎搜索不到

## AJAX 的使用

- 在 js 中有内置的构造函数来创建 ajax 对象
- 创建 ajax 对象以后，我们就使用 ajax 对象的方法去发送请求和接受响应

### 创建一个 ajax 对象

```javascript
// IE9及以上
const xhr = new XMLHttpRequest()

// IE9以下
const xhr = new ActiveXObject('Mricosoft.XMLHTTP')
```

- 上面就是有了一个 ajax 对象
- 我们就可以使用这个 `xhr` 对象来发送 ajax 请求了

### 配置链接信息

```javascript
const xhr = new XMLHttpRequest()

// xhr 对象中的 open 方法是来配置请求信息的
// 第一个参数是本次请求的请求方式 get / post / put / ...
// 第二个参数是本次请求的 url
// 第三个参数是本次请求是否异步，默认 true 表示异步，false 表示同步
// xhr.open('请求方式', '请求地址', 是否异步)
xhr.open('get', './data.php')
```

- 上面的代码执行完毕以后，本次请求的基本配置信息就写完了

### 发送请求

```javascript
const xhr = new XMLHttpRequest()
xhr.open('get', './data.php')

// 使用 xhr 对象中的 send 方法来发送请求
xhr.send()
```

- 上面代码是把配置好信息的 ajax 对象发送到服务端

### 一个基本的 ajax 请求

- 一个最基本的 ajax 请求就是上面三步
- 但是光有上面的三个步骤，我们确实能把请求发送的到服务端
- 如果服务端正常的话，响应也能回到客户端
- 但是我们拿不到响应
- 如果想拿到响应，我们有两个前提条件
  1.  本次 HTTP 请求是成功的，也就是我们之前说的 http 状态码为 200 \~ 299
  2.  ajax 对象也有自己的状态码，用来表示本次 ajax 请求中各个阶段

### ajax 状态码

- ajax 状态码 - `xhr.readyState`
- 是用来表示一个 ajax 请求的全部过程中的某一个状态
  - `readyState === 0`： 表示未初始化完成，也就是 `open` 方法还没有执行
  - `readyState === 1`： 表示配置信息已经完成，也就是执行完 `open` 之后
  - `readyState === 2`： 表示 `send` 方法已经执行完成
  - `readyState === 3`： 表示正在解析响应内容
  - `readyState === 4`： 表示响应内容已经解析完毕，可以在客户端使用了
- 这个时候我们就会发现，当一个 ajax 请求的全部过程中，只有当 `readyState === 4` 的时候，我们才可以正常使用服务端给我们的数据
- 所以，配合 http 状态码为 200 \~ 299
  - 一个 ajax 对象中有一个成员叫做 `xhr.status`
  - 这个成员就是记录本次请求的 http 状态码的
- 两个条件都满足的时候，才是本次请求正常完成

### readyStateChange

- 在 ajax 对象中有一个事件，叫做 `readyStateChange` 事件

- 这个事件是专门用来监听 ajax 对象的 `readyState` 值改变的的行为

- 也就是说只要 `readyState` 的值发生变化了，那么就会触发该事件

- 所以我们就在这个事件中来监听 ajax 的 `readyState` 是不是到 4 了

  ```javascript
  const xhr = new XMLHttpRequest()
  xhr.open('get', './data.php')

  xhr.send()

  xhr.onreadyStateChange = function () {
    // 每次 readyState 改变的时候都会触发该事件
    // 我们就在这里判断 readyState 的值是不是到 4
    // 并且 http 的状态码是不是 200 ~ 299
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      // 这里表示验证通过
      // 我们就可以获取服务端给我们响应的内容了
    }
  }
  ```

### responseText

- ajax 对象中的 `responseText` 成员

- 就是用来记录服务端给我们的响应体内容的

- 所以我们就用这个成员来获取响应体内容就可以

  ```javascript
  const xhr = new XMLHttpRequest()
  xhr.open('get', './data.php')

  xhr.send()

  xhr.onreadyStateChange = function () {
    if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
      // 我们在这里直接打印 xhr.responseText 来查看服务端给我们返回的内容
      console.log(xhr.responseText)
    }
  }
  ```

## 使用 ajax 发送请求时携带参数

- 我们使用 ajax 发送请求也是可以携带参数的
- 参数就是和后台交互的时候给他的一些信息
- 但是携带参数 get 和 post 两个方式还是有区别的

### 发送一个带有参数的 get 请求

- get 请求的参数就直接在 url 后面进行拼接就可以

  ```javascript
  const xhr = new XMLHttpRequest()
  // 直接在地址后面加一个 ?，然后以 key=value 的形式传递
  // 两个数据之间以 & 分割
  xhr.open('get', './data.php?a=100&b=200')

  xhr.send()
  ```

  - 这样服务端就能接受到两个参数
  - 一个是 a，值是 100
  - 一个是 b，值是 200

### 发送一个带有参数的 post 请求

- post 请求的参数是携带在请求体中的，所以不需要再 url 后面拼接

  ```javascript
  const xhr = new XMLHttpRequest()
  xhr.open('get', './data.php')

  // 如果是用 ajax 对象发送 post 请求，必须要先设置一下请求头中的 content-type
  // 告诉一下服务端我给你的是一个什么样子的数据格式
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 请求体直接再 send 的时候写在 () 里面就行
  // 不需要问号，直接就是 'key=value&key=value' 的形式
  xhr.send('a=100&b=200')
  ```

  - `application/x-www-form-urlencoded` 表示的数据格式就是 `key=value&key=value`

## 封装 ajax

```js
function queryStringify(obj) {
  let str = ''
  for (let k in obj) str += `${k}=${obj[k]}&`
  return str.slice(0, -1)
}

// 封装 ajax
function ajax(options) {
  let defaultoptions = {
    url: '',
    method: 'GET',
    async: true,
    data: {},
    headers: {},
    success: function () {},
    error: function () {},
  }
  let { url, method, async, data, headers, success, error } = {
    ...defaultoptions,
    ...options,
  }

  if (
    typeof data === 'object' &&
    headers['content-type']?.indexOf('json') > -1
  ) {
    data = JSON.stringify(data)
  } else {
    data = queryStringify(data)
  }
  // 如果是 get 请求, 并且有参数, 那么直接组装一下 url 信息
  if (/^get$/i.test(method) && data) url += '?' + data

  // 4. 发送请求
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, async)
  xhr.onload = function () {
    if (!/^2\d{2}$/.test(xhr.status)) {
      error(`错误状态码:${xhr.status}`)
      return
    }
    // 执行解析
    try {
      let result = JSON.parse(xhr.responseText)
      success(result)
    } catch (err) {
      error('解析失败 ! 因为后端返回的结果不是 json 格式字符串')
    }
  }

  // 设置请求头内的信息
  for (let k in headers) xhr.setRequestHeader(k, headers[k])
  if (/^get$/i.test(method)) {
    xhr.send()
  } else {
    xhr.send(data)
  }
}
```

```js
ajax({
  url: 'http://localhost:3000/users',
  method: 'GET',
  async: true,
  data: {
    username: 'xiaobin',
    password: '123',
  },
  headers: {},
  success: function (res) {
    console.log(res)
  },
  error: function (err) {
    console.log(err)
  },
})
```

## Promise

- `promise` 是一个 ES6 的语法
- 承诺的意思，是一个专门用来解决异步 **回调地狱** 的问题

### 回调地狱

- 当一个回调函数嵌套一个回调函数的时候

- 就会出现一个嵌套结构

- 当嵌套的多了就会出现回调地狱的情况

- 比如我们发送三个 ajax 请求

  - 第一个正常发送
  - 第二个请求需要第一个请求的结果中的某一个值作为参数
  - 第三个请求需要第二个请求的结果中的某一个值作为参数

  ```javascript
  ajax({
    url: '我是第一个请求',
    success (res) {
      // 现在发送第二个请求
      ajax({
        url: '我是第二个请求'，
        data: { a: res.a, b: res.b },
        success (res2) {
          // 进行第三个请求
          ajax({
            url: '我是第三个请求',
            data: { a: res2.a, b: res2.b },
    				success (res3) {
              console.log(res3)
            }
          })
        }
      })
    }
  })
  ```

- **回调地狱，其实就是回调函数嵌套过多导致的**

![](https://xiaobinw-1300776728.cos.ap-shanghai.myqcloud.com/img/%E5%9B%9E%E8%B0%83%E5%9C%B0%E7%8B%B1.jpeg)

- 当代码成为这个结构以后，已经没有维护的可能了
- 所以我们要把代码写的更加的艺术一些

### PROMISE

- 为了解决回调地狱

- 我们就要使用 promise 语法

- 语法：

  ```javascript
  new Promise(function (resolve, reject) {
    // resolve 表示成功的回调
    // reject 表示失败的回调
  })
    .then(function (res) {
      // 成功的函数
    })
    .catch(function (err) {
      // 失败的函数
    })
  ```

- promise 就是一个语法

  - 我们的每一个异步事件，在执行的时候
  - 都会有三个状态，执行中 / 成功 / 失败

- 因为它包含了成功的回调函数

- 所以我们就可以使用 promise 来解决多个 ajax 发送的问题

  ```javascript
  new Promise(function (resolve, reject) {
    ajax({
      url: '第一个请求',
      success(res) {
        resolve(res)
      },
    })
  })
    .then(function (res) {
      // 准备发送第二个请求
      return new Promise(function (resolve, reject) {
        ajax({
          url: '第二个请求',
          data: { a: res.a, b: res.b },
          success(res) {
            resolve(res)
          },
        })
      })
    })
    .then(function (res) {
      ajax({
        url: '第三个请求',
        data: { a: res.a, b: res.b },
        success(res) {
          console.log(res)
        },
      })
    })
  ```

## ASYNC/AWAIT

- `async/await` 是一个 es7 的语法

- 这个语法是 **回调地狱的终极解决方案**

- 语法：

  ```javascript
  async function fn() {
    const res = await promise对象
  }
  ```

- 这个是一个特殊的函数方式

- 可以 await 一个 promise 对象

- **可以把异步代码写的看起来像同步代码**

- 只要是一个 promiser 对象，那么我们就可以使用 `async/await` 来书写

  ```javascript
  async function fn() {
    const res = new Promise(function (resolve, reject) {
      ajax({
        url: '第一个地址',
        success(res) {
          resolve(res)
        },
      })
    })

    // res 就可以得到请求的结果
    const res2 = new Promise(function (resolve, reject) {
      ajax({
        url: '第二个地址',
        data: { a: res.a, b: res.b },
        success(res) {
          resolve(res)
        },
      })
    })

    const res3 = new Promise(function (resolve, reject) {
      ajax({
        url: '第三个地址',
        data: { a: res2.a, b: res2.b },
        success(res) {
          resolve(res)
        },
      })
    })

    // res3 就是我们要的结果
    console.log(res3)
  }
  ```

  - 这样的异步代码写的就看起来像一个同步代码了

## fetch

```·
*XMLHttpRequest 是一个设计粗糙的 API，配置和调用方式非常混乱， 而且基于事件的异步模型写起来不友好。*

**兼容性不好 polyfill: https://github.com/camsong/fetch-ie8**
```

```js
fetch('http://localhost:3000/users')
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
  })

fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username: 'xiaobin',
    password: '123',
  }),
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
  })

fetch('http://localhost:3000/users/5', {
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    username: 'xiaobin',
    password: '456',
  }),
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
  })

fetch('http://localhost:3000/users/5', {
  method: 'DELETE',
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
  })
```

```js
//错误处理
fetch('http://localhost:3000/users1')
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject({
        status: res.status,
        statusText: res.statusText,
      })
    }
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
```

## cookie

**cookie 的特点**

1.  只能存储文本
2.  单条存储有大小限制 4KB 左右
    数量限制（一般浏览器，限制大概在 50 条左右）
3.  读取有域名限制：不可跨域读取，只能由来自 写入 cookie 的 同一域名 的网页可进行读取。简单的讲就是，哪个服务器发给你的 cookie，只有哪个服务器有权利读取
4.  时效限制：每个 cookie 都有时效，默认的有效期是，会话级别：就是当浏览器关闭，那么 cookie 立即销毁，但是我们也可以在存储的时候手动设置 cookie 的过期时间
5.  路径限制：存 cookie 时候可以指定路径，只允许子路径读取外层 cookie，外层不能读取内层。

## jsonp

Jsonp(JSON with Padding) 是 json 的一种"使用模式"，可以让网页从别的域名（网站）那获取资料，即跨域读取数据。

为什么我们从不同的域（网站）访问数据需要一个特殊的技术( JSONP )呢？这是因为同源策略。

```js
const script = document.createElement('script')
script.src = './xiaobin.txt'
document.body.appendChild(script)
```