# 八. swiper

> <https://www.swiper.com.cn/>

```js
$.get('http://localhost:3000/banner').then((res) => {
  console.log(res)
  render(res)
  initSwiper()
})

function render(list) {
  var oslides = list.map(
    (item) => `
            <div class="swiper-slide">
                <img src="${item.imgUrl}"/>
            </div>
            `
  )

  // console.log(oslides.join(""))

  $('.swiper-wrapper').html(oslides.join(''))
}

$.extend({
  swiper: function (ele, obj) {
    new Swiper(ele, obj)
  },
})

function initSwiper() {
  $.swiper('.xiaobin', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    observer: true,
  })
}
```
