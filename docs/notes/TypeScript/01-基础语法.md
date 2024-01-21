# TS基础语法

[TypeScript文档](https://ts.nodejs.cn/docs/)

## 简单体验

```sh
# 安装 TypeScript
npm install -g typescript 
```
```ts
// string: ts给我们定义的标识符类型
// String: js中字符串的包装类型
let message: string = 'Hello World'

function logMessage(message: string) {
	console.log(message)
}

logMessage('aaa')
console.log(message);

export {}
```
```sh
# 编译 TypeScript
tsc 文件名.ts
```
```sh
# 简化 TypeScript 运行
npm install -g typescript
# 安装 TypeScript 后分别安装下面两个包
npm install -g ts-node
npm install -g tslib @types/node
# 运行编译 TypeScript
ts-node 文件名.ts
```

## 变量的声明

> let/const 标识符: 数据类型 = 赋值

```ts
let name: string = '三九'
```

## 变量的类型注解
```ts
// 定义标识符
let name: string = '三九'

const age: number = 19
const height: number = 168

name = 'XiaoBin'
console.log(name)

export {}
```

## 标识符的类型推导
> let进行类型推导,推导出来的是通用类型

> const进行类型推导,推导出来的是字面量类型
```ts
// 声明一个标识符时,如果直接进行赋值,会根据赋值的类型推导出标识符的类型注解
let name: string = '三九'
// 字面量类型
const height = 1.88
const height: 1.88 = 1.88

name = 123 // 报错类型不匹配
name = 'XiaoBin'

export {}
```