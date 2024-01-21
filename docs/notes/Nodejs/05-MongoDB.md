# MongoDB

数据库（database），用于数据的管理。

- 关系型数据库：MySQL
- 非关系型数据库：MongoDB

使用方法

- 命令行操作 MongoDB
- 可视化图形工具中操作 MongoDB
- 通过后端代码去操作 MongoDB

![image-20230202231619742](https://img.xbin.cn/images/2023/07/24-03-24-f1b9eb.png)

![image-20230202233328915](https://img.xbin.cn/images/2023/07/24-03-24-1cc987.png)

## 1.在命令行中操作 MongoDB

找到 MongoDB 安装包中的 bin 目录下的 mongodbsh.exe

### 常用命令

1. 查看当前 MongoDB 服务器中所有的数据库

```bash
show dbs
```

2. 查看当前执行的数据库

```bash
db
```

3. 新建/切换数据库

```bash
use 数据库名
```

4. 查件当前数据库中所有的结合

```bash
show collections
```

5. 往集合中添加数据（如果集合不存在，会自动创建该集合）

```bash
db.集合名称.insert({name:'小斌',age:'19',sex:'男'})
```

6. 查看某个集合中所有数据

```bash
db.集合名称.find()
```

7. 后续命令省略，因为命令行太他妈麻烦了，了解就好需要百度

## 2.可视化图形操作 MongoDB

简单不用做笔记

## 3.后端代码操作 MongoDB

mongoose 是 NodeJS 中提供的一个便捷操作 MongoDB 的库

1.  下载

```bash
npm i mongoose --save
```

2.  连接 MongoDB

```js
// 连接 MongoDB 将 express 项目与 MongoDB 服务器连接起来
const mongoose = require('mongoose')
// 项目需要连接的数据库地址
const dbURI = 'mongodb://localhost:27017/xiaobin'
// 关闭警告
mongoose.set('strictQuery', true)
// 连接数据库
mongoose.connect(dbURI)
// 当数据库连接成功时触发下面事件
mongoose.connection.on('connected', function () {
	console.log(dbURI + '数据库连接成功')
})
```

3.  数据库集合相关配置(models)

```js
// 1.定义数据集合的结构：定义集合中数据有哪些属性，属性的值类型是什么类型
const { Schema, model } = require('mongoose')
const usersSchema = new Schema({
	userName: String,
	password: String,
})

// 2.定义数据集合的模型：将 schema 和数据库中的数据关联起来
// model('模型名称','schema名称','数据库中的集合名称')
const usersModel = model('usersModel', usersSchema, 'users')
router.post('/login', async function (req, res, next) {
	// 1.接收前端发送的数据
	//  post：req.body
	//  get: req.query
	const result = await usersModel.find(req.body)
	if (result.length > 0) {
		res.send({
			message: '登录成功',
			status: 1,
		})
	}
})
```

## 操作数据

- 查询，查找

```js
// 按条件查询
usersModel.find({ userName: 'xiaobin' })
// 查询所以数据
usersModel.find()
```

- 新增，删除，修改

```js
// 新增
usersModel.create( {userName:'xiaobin'} )
// 删除(一个)
usersModel.deleteOne( {_id: 1'} )
// 删除(多个)
usersModel.deleteMany( {userName:'xiaobin'} )
// 修改
usersModel.updateOne( {_id: 1}, {userName:'xiaobin'} )
```

注：以上所以方法都是异步方法，且这些方法的返回值都是 Promise 对象，因此需要通过 await 去等待结果。
