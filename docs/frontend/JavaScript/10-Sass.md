# 十. Sass

- [SASS 官网](https://www.sass.hk/)

- 世界上最成熟、最稳定、最强大的专业级 CSS 扩展语言！

- `sass` 是一个 `css` 的预编译工具

- 也就是能够 **更优雅** 的书写 `css`

- `sass` 写出来的东西 **浏览器不认识**

- 依旧是要转换成 `css` 在浏览器中运行

## 变量

- 定义一个变量，在后面的代码中使用

- 使用 `$$` 来定义变量

  ```scss
  // 定义一个 $c 作为变量，值是 红色
  $c: red;

  h1 {
    // 在使用 $c 这个变量
    color: $c;
  }
  ```

- 上面定义的变量全局都可以使用

- 我们也可以在规则块内定义私有变量

  ```scss
  h1 {
    // 这个 $w 变量只能在 h1 这个规则块中使用
    $w: 100px;
    width: $w;
  }
  ```

## 嵌套

- `sass` 里面我们最长用到的就是嵌套了

- 而且相当的好用

  ```scss
  h1 {
    width: 100px;

    div {
      width: 200px;
    }
  }

  // 编译结果
  h1 {
    width: 100px;
  }

  h1 div {
    width: 200px;
  }
  ```

- 这个就是嵌套，理论上可以无限嵌套下去

  ```scss
  ul {
    width: 100px;

    li {
      width: 90px;

      div {
        width: 80px;

        p {
          width: 70px;

          span: {
            color: red;
          }
        }
      }
    }
  }
  ```

### 嵌套中的 &

- 在嵌套中还有一个标识符是 `&` 我们可以使用

- 先来看一个例子

  ```scss
  div {
    width: 100px;
    height: 100px;

    :hover {
      width: 200px;
    }
  }

  // 我想的是 div 被鼠标悬停的时候 width 变成 200
  // 但是编译结果却是
  div {
    width: 100px;
    height: 100px;
  }
  div :hover {
    width: 200px;
  }
  ```

- 和预想的结果不一样了

- 这个时候就要用到 `&` 来连接了

  ```scss
  div {
    width: 100px;
    height: 100px;

    &:hover {
      width: 200px;
    }
  }

  // 编译结果
  div {
    width: 100px;
    height: 100px;
  }
  div:hover {
    width: 200px;
  }
  ```

- 这个时候就和我需要的一样了

### 群组嵌套

- 群组嵌套就是多个标签同时嵌套

  ```scss
  div {
    width: 100px;

    .box1,
    .box2,
    .box3 {
      color: red;
    }
  }

  // 编译结果
  div {
    width: 100px;
  }
  div .box1,
  div .box2,
  div .box3 {
    color: red;
  }
  ```

- 还有一种就是多个标签同时嵌套一个标签

  ```scss
  h1,
  h2,
  h3 {
    width: 100px;

    .box {
      color: red;
    }
  }

  // 编译结果
  h1,
  h2,
  h3 {
    width: 100px;
  }
  h1 .box,
  h2 .box,
  h3 .box {
    color: red;
  }
  ```

## 混入

- 也叫 **混合器**

- 其实就是定义一个 **<span style="color:red;">“函数”</span>** 在 `scss` 文件中使用

  ```scss
  // 定义一个混合器使用  @mixin 关键字
  @mixin radius {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
  }
  ```

- 上面是定义好的一个混合器

- 他是不会被编译的，只有当你使用了他以后，才会被编译

  ```scss
  // 使用混合器使用 @include 关键字
  div {
    width: 100px;
    height: 100px;

    @include radius;
  }
  ```

- 这个就是吧刚才定义的混合器拿过来使用

- 编译结果

  ```scss
  div {
    width: 100px;
    height: 100px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
  }
  ```

### 混合器传参

- 我们既然说了，混合器就像一个 “函数” 一样，那么就一定可以像 “函数” 一样传递参数

- 和 “函数” 的使用方式一样，在定时的时候是 “形参”，在调用的时候是 “实参”

  ```scss
  // 定义混合器
  @mixin my_transition($pro, $dur, $delay, $tim) {
    -webkit-transition: $pro $dur $delay $tim;
    -moz-transition: $pro $dur $delay $tim;
    -ms-transition: $pro $dur $delay $tim;
    -o-transition: $pro $dur $delay $tim;
    transition: $pro $dur $delay $tim;
  }
  ```

- 使用这个混合器的时候传递 “实参”

  ```scss
  div {
    width: 100px;
    height: 100px;

    @include my_transition(all, 1s, 0s, linear);
  }
  ```

- 编译结果

  ```scss
  div {
    width: 100px;
    height: 100px;
    -webkit-transition: all 1s 0s linear;
    -moz-transition: all 1s 0s linear;
    -ms-transition: all 1s 0s linear;
    -o-transition: all 1s 0s linear;
    transition: all 1s 0s linear;
  }
  ```

- 写了多少个 “形参”，那么调用的时候就要传递多少个 “实参”

- 不然会报错的

### 参数默认值

- 我们在定义混合器的时候，也可以给一些参数写一些默认值

- 这样一来，就可以不传递 “实参” 了

  ```scss
  // 设置一些带有默认值的参数
  @mixin my_transition($dur: 1s, $pro: all, $delay: 0s, $tim: linear) {
    -webkit-transition: $dur $pro $delay $tim;
    -moz-transition: $dur $pro $delay $tim;
    -ms-transition: $dur $pro $delay $tim;
    -o-transition: $dur $pro $delay $tim;
    transition: $dur $pro $delay $tim;
  }
  ```

- 使用的时候，如果你不传递，那么就是使用默认值

  ```scss
  div {
    width: 100px;
    height: 100px;

    // 使用的时候，只传递一个，剩下的使用默认值
    @include my_transition(2s);
  }
  ```

- 编译结果

  ```scss
  div {
    width: 100px;
    height: 100px;
    -webkit-transition: 2s all 0s linear;
    -moz-transition: 2s all 0s linear;
    -ms-transition: 2s all 0s linear;
    -o-transition: 2s all 0s linear;
    transition: 2s all 0s linear;
  }
  ```

## 继承

- 在 `sass` 里面使用继承可以大大的提高开发效率

- 其实继承很简单，就是把之前写过的选择器里面的内容直接拿过来一份

  ```scss
  div {
    width: 100px;
    height: 100px;
    background-color: pink;
  }
  ```

- 这个是之前写过的一个规则样式表

- 接下来我要写另外一个样式了，发现我要写的一些内容和之前这个 `div` 一样，并且还有一些我自己的内容

- 那么我就可以把这个样式表先继承下来，再写我自己的内容就好了

  ```scss
  p {
    @extend div;

    font-size: 20px;
    color: red;
  }
  ```

- 编译结果

  ```scss
  div,
  p {
    width: 100px;
    height: 100px;
    background-color: pink;
  }

  p {
    font-size: 20px;
    color: red;
  }
  ```

## 导入文件

- 我们刚才学过了定义变量，定义混合器

- 而这两个内容在定义过以后，如果没有使用，是不会被编译出内容的

- 所以我们可以把变量单独写一个文件，混合器单独写一个文件，然后直接导入后使用

  ```scss
  // 我是 variable.scss
  $w: 100px;
  $h: 200px;
  $c: pink;

  // 我是 mixin.scss
  @mixin my_transition($dur: 1s, $pro: all, $delay: 0s, $tim: linear) {
    -webkit-transition: $dur $pro $delay $tim;
    -moz-transition: $dur $pro $delay $tim;
    -ms-transition: $dur $pro $delay $tim;
    -o-transition: $dur $pro $delay $tim;
    transition: $dur $pro $delay $tim;
  }

  @mixin radius {
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
  }
  ```

- 然后在我们的主要文件中把这个两个文件导入进来就行了

  ```scss
  // 我是 index.scss
  @import './variable.scss';
  @import './mixin.scss';

  div {
    width: $w;
    height: $h;
    background-color: $c;

    @include radius;
  }

  h1 {
    @include my_transition;
  }
  ```

- 编译结果

  ```scss
  div {
    width: 100px;
    height: 200px;
    background-color: pink;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
    border-radius: 10px;
  }

  h1 {
    -webkit-transition: 1s all 0s linear;
    -moz-transition: 1s all 0s linear;
    -ms-transition: 1s all 0s linear;
    -o-transition: 1s all 0s linear;
    transition: 1s all 0s linear;
  }
  ```
