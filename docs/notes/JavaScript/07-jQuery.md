# 七. jQuery

- `jQuery` 是一个前端库，也是一个方法库
- 他里面封装着一些列的方法供我们使用
- 我们常用的一些方法它里面都有，我们可以直接拿来使用就行了
- `jQuery` 之所以好用，很多人愿意使用，是因为他的几个优点太强大了
  1.  优质的选择器和筛选器
  2.  好用的隐式迭代
  3.  强大的链式编程
- 因为这些东西的出现，很多时候我们要做的事情被 “一行代码解决”
- 接下来我们就来认识一下 `jQuery`

## 1. jQuery 的使用

- [jQuery 官网](https://jquery.com/)

- [jQuery 方法大全中文网](http://jquery.cuishifeng.cn/)

  - 这个网站可以多看看
  - 里面是 `jQuery` 的方法大全，而且是中文的

- 我们要使用 `jQuery` 首先要下载一个

  - 可以去官网下载

- 然后就是再页面里面引入 `jQuery.js` 就行了

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0" />
      <meta
        http-equiv="X-UA-Compatible"
        content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <script src="./jquery/jquery.js"></script>
    </body>
  </html>
  ```

- 然后就可以开始使用了

- `jQuery` 向全局暴露的接口就是 `jQuery` 或者 `$$` 都行

## 2.选择器和筛选器

- 选择器和筛选器就是用来帮我们获取 DOM 元素的

### 2-1 选择器

- `jQuery` 有着相当强大的选择器

  ```javascript
  // 按照 id 获取页面中的元素
  const ele = jQuery('#box')
  const ele = $('#box')
  ```

  - 上面两个都可以按照 id 来获取元素

  ```javascript
  // 按照类名来选择
  const eles = jQuery('.a')
  const eles = $('.a')
  ```

  - 上面就是按照类名来选择元素，可以获取到一组元素

  ```javascript
  const lis = jQuery('li')
  const lis = $('li')
  ```

  - 上面就是按照标签名来获取元素，可以获取到一组元素

  ```javascript
  const eles = jQuery('ul > li')
  const eles = $('ul > li')
  ```

  - 上面就是按照选择器来获取元素，可以获取到一组元素

### 2-2 特殊选择器

- 直接找到第一个

  ```javascript
  $('li:first') // 找到所有 li 中的第一个
  ```

- 直接找到最后一个

  ```javascript
  $('li:last') // 找到所有 li 中的最后一个
  ```

- 直接找到第几个

  ```javascript
  $('li:eq(3)') // 找到所有 li 中索引为 3 的那个
  ```

- 找到所有奇数个

  ```javascript
  $('li:odd') // 找到所有 li 中索引为 奇数 的
  ```

- 找到所有偶数

  ```javascript
  $('li:even') // 找到所有 li 中索引为 偶数 的
  ```

### 2-3 筛选器

- jQuery 的筛选器就是在选择器选择到一组元素以后

- 对元素进行筛选，也可以对准确的某一个元素进行判断和获取

  1.  找到所有元素中的第一个

      ```javascript
      $('li').first()
      ```

  2.  找到所有元素中的最后一个

      ```javascript
      $('li').last()
      ```

  3.  找到某一个元素的下一个兄弟元素

      ```javascript
      $('li:eq(3)').next()
      ```

  4.  找到某一个元素的上一个兄弟元素

      ```javascript
      $('li:eq(3)').prev()
      ```

  5.  找到某一个元素的后面的所有兄弟元素

      ```javascript
      $('li:eq(3)').nextAll()
      ```

  6.  找到某一个元素的前面的所有兄弟元素

      ```javascript
      $('li:eq(3)').prevAll()
      ```

  7.  找到某一个元素的父元素

      ```javascript
      $('li:eq(3)').parent()
      ```

  8.  找到某一个元素的所有结构父级，一直到 html

      ```javascript
      $('li:eq(3)').parents()
      ```

  9.  找到一组元素中的某一个

      ```javascript
      // 在 li 的所有父级里面找到所有 body 标签
      $('li').parents().find('body')

      // 找到 div 标签下所有后代元素中所有类名为 box 的元素
      $('div').find('.box')
      ```

## 3.属性操作

- 给一个元素添加某个属性

  ```javascript
  // 给 div 元素添加一个 id 属性，值是 box
  $('div').prop('id', 'box')
  // 获取 div 的 id 属性
  console.log($('div').prop('id'))
  ```

  - prop 这个方法只能添加元素自己本身就有的属性
  - 如果是添加的自定义属性，不会显示在标签上，但是可以使用

- 给一个元素添加某个自定义属性

  ```javascript
  // 给 div 添加一个 index 属性，值是 1
  $('div').attr('index', 1)
  // 获取 div 的 index 属性
  console.log($('div').attr('index'))
  ```

- 移除元素的某一个属性

  ```javascript
  // 移除元素自己本身的属性
  $('div').removeProp('id')
  // 移除元素的自定义属性
  $('div').removeAttr('index')
  ```

## 4.操作元素的类名

```js
// 判断某一个元素有没有某一个 class
$('div').hasClass('box') // true 表示该元素有 box 类名，false 表示该元素没有 box 类名

// 给元素添加一个类名
$('div').addClass('box2') // 给 div 元素添加一个 box2 类名

// 移除元素的类名
$('div').removeClass('box') // 移除 div 的 box 类名

// 切换元素类名
$('div').toggleClass('box3') // 如果元素本身有这个类名就移除，本身没有就添加
```

## 5. 操作元素的内容

```js
给元素的 innerHTML 赋值
$('div').html('<span>hello world</span>')
// 获取元素的 innerHTML
$('div').html()

// 给元素的 innerText 赋值
$('div').text('hello world')
// 获取元素的 innerText
$('div').text()

// 给元素的 value 赋值
$('input').val('admin')
// 获取元素的 value 值
$('input').val()
```

## 6. 操作样式

- jQuery 操作元素的样式就是一个方法 `css`

  ```javascript
  // 给元素设置一个 css 样式
  $('div').css('width', '100px')

  // 获取元素的某一个样式
  $('div').css('width')

  // 给元素设置一组样式
  $('div').css({
    width: '100px',
    height: '200px',
  })
  ```

## 7. 元素尺寸

- 操作元素的宽和高

  ```javascript
  // 获取 div 元素内容位置的高，不包含 padding 和 border
  $('div').height()
  // 设置 div 内容位置的高为 200px
  $('div').height(200)

  // 获取 div 元素内容位置的宽，不包含 padding 和 border
  $('div').width()
  // 设置 div 内容位置的宽为 200px
  $('div').width(200)
  ```

- 获取元素的内置宽和高

  ```javascript
  // 获取 div 元素内容位置的高，包含 padding 不包含 border
  $('div').innerHeight()

  // 获取 div 元素内容位置的宽，包含 padding 不包含 border
  $('div').innerWidth()
  ```

- 获取元素的外置宽和高

  ```javascript
  // 获取 div 元素内容位置的高，包含 padding 和 border
  $('div').outerHeight()
  // 获取 div 元素内容位置的高，包含 padding 和 border 和 margin
  $('div').outerHeight(true)

  // 获取 div 元素内容位置的宽，包含 padding 和 border
  $('div').outerWidth()
  // 获取 div 元素内容位置的高，包含 padding 和 border 和 margin
  $('div').outerWidth(true)
  ```

## 8. 元素位置

- 元素相对页面的位置

  ```javascript
  // 获取 div 相对页面的位置
  $('div').offset() // 得到的是以一个对象 { left: 值, top: 值 }

  // 给 div 设置相对页面的位置
  $('div').offset({ left: 100, top: 100 })
  // 获取定位到一个距离页面左上角 100 100 的位置
  ```

- 元素相对于父元素的偏移量

  ```javascript
  // 获取 div 相对于父元素的偏移量（定位的值）
  $('div').position()
  ```

- 获取页面卷去的高度和宽度

  ```javascript
  window.onscroll = function () {
    // 获取浏览器卷去的高度
    console.log($(window).scrollTop())
  }

  window.onscroll = function () {
    // 获取浏览器卷去的宽度
    console.log($(window).scrollLeft())
  }
  ```

## 9. 元素事件

- 绑定事件的方法

  ```javascript
  // 给 button 按钮绑定一个点击事件
  $('button').on('click', function () {
    console.log('我被点击了')
  })

  // 给 button 按钮绑定一个点击事件，并且携带参数
  $('button').on('click', { name: 'xiaobin' }, function (e) {
    console.log(e) // 所有的内容都再事件对象里面
    console.log(e.data) // { name: 'xiaobin' }
  })

  // 事件委托的方式给 button 绑定点击事件
  $('div').on('click', 'button', function () {
    console.log(this) // button 按钮
  })

  // 事件委托的方式给 button 绑定点击事件并携带参数
  $('div').on('click', 'button', { name: 'xiaobin' }, function (e) {
    console.log(this) // button 按钮
    console.log(e.data)
  })
  ```

- 移除事件

  ```javascript
  // 给 button 按钮绑定一个 点击事件，执行 handler 函数
  $('button').on('click', handler)

  // 移除事件使用 off
  $('button').off('click', handler)
  ```

- 只能执行一次的事件

  ```javascript
  // 这个事件绑定再 button 按钮身上
  // 当执行过一次以后就不会再执行了
  $('button').one('click', handler)
  ```

- 直接触发事件

  ```javascript
  // 当代码执行到这里的时候，会自动触发一下 button 的 click 事件
  $('button').trigger('click')
  ```

**可以直接使用的常见事件**

- 可以直接使用的事件就是可以不利用 `on` 来绑定，直接就可以使用的事件方法

- `click`

  ```javascript
  // 直接给 div 绑定一个点击事件
  $('div').click(function () {
    console.log('我被点击了')
  })

  // 给 div 绑定一个点击事件并传递参数
  $('div').click({ name: 'xiaobin' }, function (e) {
    console.log(e.data)
  })
  ```

- `dblclick`

  ```javascript
  // 直接给 div 绑定一个双击事件
  $('div').dblclick(function () {
    console.log('我被点击了')
  })

  // 给 div 绑定一个双击事件并传递参数
  $('div').dblclick({ name: 'xiaobin' }, function (e) {
    console.log(e.data)
  })
  ```

- `scroll`

  ```javascript
  // 直接给 div 绑定一个滚动事件
  $('div').scroll(function () {
    console.log('我被点击了')
  })

  // 给 div 绑定一个滚动事件并传递参数
  $('div').scroll({ name: 'xiaobin' }, function (e) {
    console.log(e.data)
  })
  ```

## 10.动画

- `show`

  ```javascript
  // 给 div 绑定一个显示的动画
  $('div').show() // 如果元素本身是 display none 的状态可以显示出来

  // 给 div 绑定一个显示的动画
  // 接受三个参数
  // $('div').show('毫秒', '速度', '回调函数')
  $('div').show(1000, 'linear', function () {
    console.log('我显示完毕')
  })
  ```

- `hide`

  ```javascript
  // 给 div 绑定一个隐藏的动画
  $('div').hide() // 如果元素本身是 display block 的状态可以隐藏起来

  // 给 div 绑定一个显示的动画
  // 接受三个参数
  // $('div').show('毫秒', '速度', '回调函数')
  $('div').hide(1000, 'linear', function () {
    console.log('我隐藏完毕')
  })
  ```

- `toggle`

  ```javascript
  // 给 div 绑定一个切换的动画
  $('div').hide() // 元素本身是显示，那么就隐藏，本身是隐藏那么就显示

  // 给 div 绑定一个显示的动画
  // 接受三个参数
  // $('div').show('毫秒', '速度', '回调函数')
  $('div').toggle(1000, 'linear', function () {
    console.log('动画执行完毕')
  })
  ```

- `animate`

  ```javascript
  // 定义一个自定义动画
  $('.show').click(function () {
    $('div').animate(
      {
        width: 500,
        height: 300,
      },
      1000,
      'linear',
      function () {
        console.log('动画运动完毕')
      }
    )
  })
  ```

- `stop`

  ```javascript
  // 立刻定制动画
  $('div').stop() // 就停止再当前状态
  ```

- `finish`

  ```javascript
  // 立刻结束动画
  $('div').finish() // 停止在动画结束状态
  ```

## 11. 元素操作

- 创建一个元素

  ```javascript
  var div = $('<div></div>')
  ```

- 内部插入元素

  ```javascript
  // 向 div 元素中插入一个 p 元素，放在最后
  $('div').append($('<p></p>'))

  // 把 p 元素插入到 div 中去，放在最后
  $('<p>hello</p>').appendTo($('div'))

  // 向 div 元素中插入一个 p 元素，放在最前
  $('div').prepend($('<p></p>'))

  // 把 p 元素插入到 div 中去，放在最前
  $('<p>hello</p>').prependTo($('div'))
  ```

- 外部插入元素

  ```javascript
  // 在 div 的后面插入一个元素 p
  $('div').after($('<p></p>'))

  // 在 div 的前面插入一个元素 p
  $('div').before($('<p></p>'))

  // 把 p 元素插入到 div 元素的后面
  $('div').insertAfter($('<p></p>'))

  // 把 p 元素插入到 div 元素的前面
  $('div').insertBefore($('<p></p>'))
  ```

- 替换元素

  ```javascript
  // 把 div 元素替换成 p 元素
  $('div').replaceWith($('<p></p>'))

  // 用 p 元素替换掉 div 元素
  $('<p></p>').replaceAll($('div'))
  ```

- 删除元素

  ```javascript
  // 删除元素下的所有子节点
  $('div').empty()

  // 把自己从页面中移除
  $('div').remove()
  ```

- 克隆元素

  ```javascript
  // 克隆一个 li 元素
  // 接受两个参数
  //   参数1： 自己身上的事件要不要复制，默认是 false
  //   参数2： 所有子节点身上的事件要不要复制，默认是 true
  $('li').clone()
  ```

## 12. 发送 ajax 请求

- 发送 get 请求

  ```javascript
  // 直接使用 $.get 方法来发送一个请求
  /*
  	参数一： 请求地址
  	参数二： 请求时携带的参数
  	参数三： 请求成功的回调
  	参数四： 返回的数据类型
  */
  $.get(
    './ajax.php',
    { id: 10 },
    function (res) {
      console.log(res)
    },
    'json'
  )
  ```

- 发送 post 请求

  ```javascript
  // 直接使用 $.post 方法来发送一个请求
  /*
  	参数一： 请求地址
  	参数二： 请求时携带的参数
  	参数三： 请求成功的回调
  	参数四： 返回的数据类型
  */
  $.post(
    './ajax.php',
    { id: 10 },
    function (res) {
      console.log(res)
    },
    'json'
  )
  ```

- 综合发送 ajax 请求

  ```javascript
  // 使用 $.ajax 方法
  // 只接受一个参数，是一个对象，这个对象对当前的请求进行所有的配置
  $.ajax({
    url: './ajax', // 必填，请求的地址
    type: 'GET', // 选填，请求方式，默认是 GET（忽略大小写）
    data: {}, // 选填，发送请求是携带的参数
    dataType: 'json', // 选填，期望返回值的数据类型
    async: true, // 选填，是否异步，默认是 true
    success() {}, // 选填，成功的回调函数
    error() {}, // 选填，失败的回调函数
    cache: true, // 选填，是否缓存，默认是 true
    context: div, // 选填，回调函数中的 this 指向，默认是 ajax 对象
    status: {}, // 选填，根据对应的状态码进行函数执行
    timeout: 1000, // 选填，超时事件
  })
  ```

- 发送一个 jsonp 请求

  ```javascript
  // 使用 $.ajax 方法也可以发送 jsonp 请求
  // 只不过 dataType 要写成 jsonp
  $.ajax({
    url: './jsonp.php',
    dataType: 'jsonp',
    data: { name: 'xiaobin', age: 18 },
    success(res) {
      console.log(res)
    },
    jsonp: 'cb', // jsonp 请求的时候回调函数的 key
    jsonpCallback: 'fn', // jsonp 请求的时候回调函数的名称
  })
  ```

## 13. 全局 ajax 函数

- 全局的 `ajax` 函数我们也叫做 **`ajax` 的钩子函数**
- 也就是在一个 `ajax` 的整个过程中的某一个阶段执行的函数
- 而且每一个 `ajax` 请求都会触发

### ajaxStart

- 任意一个请求在 **开始** 的时候就会触发这个函数

  ```javascript
  $(window).ajaxStart(function () {
    console.log('有一个请求开始了')
  })
  ```

### ajaxSend

- 任意一个请求在 **准备 send 之前** 会触发这个函数

  ```javascript
  $(window).ajaxSend(function () {
    console.log('有一个要发送出去了')
  })
  ```

### ajaxSuccess

- 任意一个请求在 **成功** 的时候就会触发这个函数

  ```javascript
  $(window).ajaxSuccess(function () {
    console.log('有一个请求成功了')
  })
  ```

### ajaxError

- 任意一个请求在 **失败** 的时候就会触发这个函数

  ```javascript
  $(window).ajaxError(function () {
    console.log('有一个请求失败了')
  })
  ```

### ajaxComplete

- 任意一个请求在 **完成** 的时候就会触发这个函数

  ```javascript
  $(window).ajaxComplete(function () {
    console.log('有一个请求完成了')
  })
  ```

### ajaxStop

- 任意一个请求在 **结束** 的时候就会触发这个函数

  ```javascript
  $(window).ajaxStop(function () {
    console.log('有一个请求结束了')
  })
  ```

## 14.jQuery 的多库共存

- 我们一直在使用 `jQuery`，都没有什么问题

- 但是如果有一天，我们需要引入一个别的插件或者库的时候

- 人家也向外暴露的是 `$$` 获取 `jQuery`

- 那么，我们的 `jQuery` 就不能用了

- 那么这个时候，`jQuery` 为我们提供了一个多库并存的方法

  ```javascript
  // 这个方法可以交还 jQuery 命名的控制权
  jQuery.noConflict()

  // 上面代码执行完毕以后 $ 这个变量就不能用了
  // 但是 jQuery 可以使用
  console.log($) // undefined
  console.log(jQuery) // 可以使用
  ```

- 完全交出控制权

  ```javascript
  // 这个方法可以交并且传递一个 true 的时候，会完全交出控制权
  jQuery.noConflict(true)

  // 上面代码执行完毕以后 $ 这个变量就不能用了
  // jQuery 这个变量也不能用了
  console.log($) // undefined
  console.log(jQuery) // undefined
  ```

- 更换控制权

  ```javascript
  // 可以用一个变量来接受返回值，这个变量就是新的控制权
  var aa = jQuery.noConflict(true)

  // 接下来就可以把 aa 当作 jQuery 向外暴露的接口使用了
  aa('div').click(function () {
    console.log('我被点击了')
  })
  ```

## 15 . JQuery 的插件扩展

- `jQuery` 确实很好很强大
- 但是也有一些方法是他没有的，我们的业务需求中有的时候会遇到一些它里面没有的方法
- 那么我们就可以给他扩展一些方法

### 扩展给他自己本身

- 扩展给自己本身使用 `jQuery.extend` 这个方法

- 扩展完后的内容只能用 `$$` 或者 `jQuery` 来调用

  ```javascript
  // jQuery.extend 接受一个参数，是一个对象，对象里面是我们扩展的方法
  jQuery.extend({
    max: function (...n) {
      return Math.max.apply(null, n)
    },
    min: function (...n) {
      return Math.min.apply(null, n)
    },
  })
  ```

- 扩展完毕我们就可以使用了

  ```javascript
  const max = $.max(4, 5, 3, 2, 6, 1)
  console.log(max) // 6
  const min = $.min(4, 5, 3, 2, 6, 1)
  console.log(min) // 1
  ```

### 扩展给元素集

- 扩展完毕以后给元素的集合使用

- 也就是我们用 `$('li')` 这样的选择器获取到的元素集合来使用

- 使用 `jQuery.fn.extend()` 方法来扩展

  ```javascript
  // jQuery.fn.extend() 接受一个参数，是一个对象，对象里面是我们扩展的方法
  jQuery.fn.extend({
    checked: function () {
      // return 关键字是为了保证链式编程
      // 后面的代码才是业务逻辑
      return this.each(function () {
        this.checked = true
      })
    },
  })
  ```

- 扩展完毕我们就可以使用了

  ```javascript
  // 靠元素集合来调用
  $('input[type=checkbox]').checked()
  // 执行完毕之后，所有的 复选框 就都是选中状态了
  ```
