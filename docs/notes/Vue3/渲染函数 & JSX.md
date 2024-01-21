# 渲染函数 & JSX

## h 函数

```js
import { h } from 'vue'

export default {
	// render 写在组件内部
	render() {
		// h 创建 VNode
		// h(元素,{方法},内容 or 子元素)
		return h('div', { className: 'app' }, [
			h('h2', { className: 'title' }, '我是标题'),
			h('p', { className: 'content' }, '我是内容'),
		])
	},
}
```

![](https://img.xbin.cn/images/2023/08/04-14-09-266eee.png)

## h 函数小案例

```js
import { h } from 'vue'
import Home from './Home.vue'

export default {
	data() {
		return {
			counter: 0,
		}
	},
	render() {
		return h('div', { className: 'app' }, [
			h('h2', null, `当前计数:${this.counter}`),
			h('button', { onClick: this.increment }, ' + 1'),
			h('button', { onClick: this.decrement }, ' - 1'),
			// 直接渲染组件
			h(Home),
		])
	},
	methods: {
		increment() {
			this.counter++
		},
		decrement() {
			this.counter--
		},
	},
}
```
![](https://img.xbin.cn/images/2023/08/04-14-19-d05933.png)

## JSX

**1.安装**
```sh
npm i @vitejs/plugin-vue-jsx -D
```

**2.安装完后再vite.config.js文件中的plugins字段中添加如下字段**
```js
import jsx from '@vitejs/plugin-vue-jsx'
	
export default defineConfig({
  plugins: [
    jsx(), // 这里一定要添加，不然不起作用
  ]
})
```

**3.编写jsx**
```vue
<script lang="jsx">
import About from './About.vue'

export default {
  data() {
    return {
      counter: 0
    }
  },
  render() {
    return (
      <div class='app'>
        <h2>当前计数:{this.counter}</h2>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
			   // 直接使用组件
				<About></About>
      </div>
    )
  },
  methods: {
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    }
  }
}
</script>

<style lang='scss' scoped></style>
```

**3.编写 jsx setup 语法糖**
```vue
<script lang="jsx" setup>
import { ref } from 'vue'
import About from './About.vue'

const counter = ref(0)

const increment = () => {
	counter.value++
}
const decrement = () => {
	counter.value--
}

const jsx = () => (
	<div class='app'>
		<h2>当前计数:{counter.value}</h2>
		<button onClick={increment}>+1</button>
		<button onClick={decrement}>-1</button>
		<About></About>
	</div>
)
</script>

<template>
	<jsx />
</template>

<style lang="scss" scoped></style>
```