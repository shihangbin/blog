# 二 BOM

- `BOM（Browser Object Model）`： 浏览器对象模型
- 其实就是操作浏览器的一些能力
- 我们可以操作哪些内容
  - 获取一些浏览器的相关信息（窗口的大小）
  - 操作浏览器进行页面跳转
  - 获取当前浏览器地址栏的信息
  - 操作浏览器的滚动条
  - 浏览器的信息（浏览器的版本）
  - 让浏览器出现一个弹出框（`alert` / `confirm` / `prompt`）
  - ...
- `BOM` 的核心就是 `window` 对象
- `window` 是浏览器内置的一个对象，里面包含着操作浏览器的方法

## 1. 获取浏览器窗口的尺寸

- ` innerHeight` 和 `innerWidth`

- 这两个方法分别是用来获取浏览器窗口的宽度和高度（包含滚动条的）

  ```javascript
  var windowHeight = window.innerHeight
  console.log(windowHeight)

  var windowWidth = window.innerWidth
  console.log(windowWidth)
  ```

## 2. 浏览器的弹出层

- `alert` 是在浏览器弹出一个提示框

  ```javascript
  window.alert('我是一个提示框')
  ```

  ![](https://xiaobinw-1300776728.cos.ap-shanghai.myqcloud.com/img/alert.png)

  - 这个弹出层知识一个提示内容，只有一个确定按钮
  - 点击确定按钮以后，这个提示框就消失了

- `confirm` 是在浏览器弹出一个询问框

  ```javascript
  var boo = window.confirm('我是一个询问框')
  console.log(boo)
  ```

  ![](https://xiaobinw-1300776728.cos.ap-shanghai.myqcloud.com/img/confirm.png)

  - 这个弹出层有一个询问信息和两个按钮
  - 当你点击确定的时候，就会得到 `true`
  - 当你点击取消的时候，就会得到 `false`

- `prompt` 是在浏览器弹出一个输入框

  ```javascript
  var str = window.prompt('请输入内容')
  console.log(str)
  ```

  ![](https://xiaobinw-1300776728.cos.ap-shanghai.myqcloud.com/img/prompt.png)

  - 这个弹出层有一个输入框和两个按钮
  - 当你点击取消的时候，得到的是 `null`
  - 当你点击确定的时候得到的就是你输入的内容

- `close`和`open`开启和关闭浏览器

  - `close`关闭当前窗口
  - `open`打开一个新页面

## 3. 浏览器的地址信息

- 在 `window` 中有一个对象叫做 `location`
- 就是专门用来存储浏览器的地址栏内的信息的

### location.href

- `location.href` 这个属性存储的是浏览器地址栏内 `url` 地址的信息

  ```javascript
  console.log(window.location.href)
  ```

  - 会把中文变成 `URI` 编码的格式

`decodeURI(location.href)` 这个属性转换浏览器地址栏内地址的编码格式信息

```javascript
let res = decodeURI(location.href)
console.log(res)
```

- 会把 `URI` 变成中文编码的格式

- `location.href` 这个属性也可以给他赋值

  ```javascript
  window.location.href = './index.html'
  // 这个就会跳转页面到后面你给的那个地址
  ```

### location.reload

- `location.reload()` 这个方法会重新加载一遍页面，就相当于刷新是一个道理

  ```javascript
  window.location.reload()
  ```

  - 注意： **不要写在全局，不然浏览器就会一直处在刷新状态**

## 4. 浏览器的历史记录

- `window` 中有一个对象叫做 `history`
- 是专门用来存储历史记录信息的

### history.back

- `history.back` 是用来会退历史记录的，就是回到前一个页面，就相当于浏览器上的 ⬅️ 按钮

  ```javascript
  window.history.back()
  ```

  - 前提是你要有上一条记录，不然就是一直在这个页面，也不会回退

### history.forword

- `history.forword` 是去到下一个历史记录里面，也就是去到下一个页面，就相当于浏览器上的 ➡️ 按钮

  ```javascript
  window.history.forward()
  ```

  - 前提是你要之前有过回退操作，不然的话你现在就是最后一个页面，没有下一个

### history.go

- `history.go` 正数就相当于浏览器上的 ➡️ 按钮，负数就相当于浏览器上的 ⬅️ 按钮

  ```javascript
  window.history.go(number)
  ```

  - 前提是你要之前有过回退操作，不然的话你现在就是最后一个页面，没有下一个

## 5. 浏览器的 onload 事件

- 这个不在是对象了，而是一个事件

- 是在页面所有资源加载完毕后执行的

  ```javascript
  window.onload = function () {
    console.log('页面已经加载完毕')
  }
  ```

### 5-1 在 html 页面中把 js 写在 head 里面

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <script>
      // 这个代码执行的时候，body 还没有加载
      // 这个时候我们就获取不到 body 中的那个 div

      // 就需要使用 window.onload 事件
      window.onload = function () {
        // 这个函数会在页面加载完毕以后在执行
        // 那么这个时候页面的 DOM 元素都已经加载了，我们就可以获取 div 了
      }
    </script>
  </head>
  <body>
    <div></div>
  </body>
</html>
```

### 5-2 在 html 页面中把 js 写在 body 最后面

```html
<html>
  <head>
    <meta charset="UTF-8" />
  </head>
  <body>
    <div></div>

    <script>
      // 这个代码执行的时候，body 已经加载完毕了
      // 在这里就可以获取到 div，写不写 window.onload 就无所谓了

      window.onload = function () {
        // 这个函数会在页面加载完毕以后在执行
        // 那么这个时候页面的 DOM 元素都已经加载了，我们就可以获取 div 了
      }
    </script>
  </body>
</html>
```

## 6. 浏览器的 onscroll 事件

- 这个 `onscroll` 事件是当浏览器的滚动条滚动的时候触发

- 或者鼠标滚轮滚动的时候出发

  ```javascript
  window.onscroll = function () {
    console.log('浏览器滚动了')
  }
  ```

  - 注意：**前提是页面的高度要超过浏览器的可是窗口才可以**

## 7. 浏览器滚动的距离

- 浏览器内的内容即然可以滚动，那么我们就可以获取到浏览器滚动的距离
- 思考一个问题？
  - 浏览器真的滚动了吗？
  - 其实我们的浏览器是没有滚动的，是一直在那里
  - 滚动的是什么？是我们的页面
  - 所以说，**其实浏览器没有动，只不过是页面向上走了**
- 所以，这个已经不能单纯的算是浏览器的内容了，而是我们页面的内容
- 所以不是在用 `window` 对象了，而是使用 `document` 对象

### scrollTop

- 获取的是页面向上滚动的距离

- 一共有两个获取方式

  - `document.body.scrollTop`
  - `document.documentElement.scrollTop`

  ```javascript
  window.onscroll = function () {
    console.log(document.body.scrollTop)
    console.log(document.documentElement.scrollTop)
  }
  ```

  - 两个都是获取页面向上滚动的距离
  - 区别：
    - IE 浏览器
      - 没有 `DOCTYPE` 声明的时候，用这两个都行
      - 有 `DOCTYPE` 声明的时候，只能用 `document.documentElement.scrollTop`
    - Chrome 和 FireFox
      - 没有 `DOCTYPE` 声明的时候，用 `document.body.scrollTop`
      - 有 `DOCTYPE` 声明的时候，用 `document.documentElement.scrollTop`
    - Safari
      - 两个都不用，使用一个单独的方法 `window.pageYOffset `

### scrollLeft

- 获取页面向左滚动的距离

- 也是两个方法

  - `document.body.scrollLeft`

  - `document.documentElementLeft`

    ```javascript
    window.onscroll = function () {
      console.log(document.body.scrollLeft)
      console.log(document.documentElement.scrollLeft)
    }
    ```

  - 两个之间的区别和之前的 `scrollTop` 一样

## 8. 本地存储

### 8-1 localStorage

```js
//增
localStorage.setItem('name', 'xiaobin')
//取
localStorage.getItem('name')
//删
localStorage.removeItem('name')
//清空
localStorage.clear()
```

### 8-2 sessionStorage

```js
//增
sessionStorage.setItem('name', 'xiaobin')
//取
sessionStorage.getItem('name')
//删
sessionStorage.removeItem('name')
//清空
sessionStorage.clear()
```
