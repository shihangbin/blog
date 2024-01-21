# events

## 基本使用

```js
// events模块中的事件总线
const EventEmitter = require('events')

// 创建EventEmitter的实例
const emitter = new EventEmitter()

// 监听事件
emitter.on('why', () => {
  console.log('监听why的事件')
})

// 发射事件
setTimeout(() => {
  emitter.emit('why')
}, 2000)
```

## 取消事件

```js
// events模块中的事件总线
const EventEmitter = require('events')

// 创建EventEmitter的实例
const emitter = new EventEmitter()

// 监听事件
function handleWhyFn() {
  console.log('监听why的事件')
}
emitter.on('why', handleWhyFn)

// 发射事件
setTimeout(() => {
  emitter.emit('why')

  // 取消事件监听
  emitter.off('why', handleWhyFn)

  setTimeout(() => {
    emitter.emit('why')
  }, 1000)
}, 2000)
```

## 传递参数

```js
// events模块中的事件总线
const EventEmitter = require('events')

// 创建EventEmitter的实例
const emitter = new EventEmitter()

// 监听事件
function handleWhyFn(name, age, height) {
  console.log('监听why的事件', name, age, height)
}
emitter.on('why', handleWhyFn)

// 发射事件
setTimeout(() => {
  emitter.emit('why', 'coderwhy', 18, 1.88)

  // 取消事件监听
  emitter.off('why', handleWhyFn)

  setTimeout(() => {
    emitter.emit('why')
  }, 1000)
}, 2000)
```
