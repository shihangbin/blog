# RESTful

REST 表现层状态装换，实际就是一种接口的命名规范。

- url（请求路径）用来定义资源名称

- method（请求类型）用来定义资源动作

## 请求类型

- get（获取，查询）

- pust（新增）

- put（修改）

- delete（删除）

## 请求方式

如果传递的数据中有一个唯一值 \_id，我们会将 \_id 放到 url 中。

```js
// 前端（删除）
axios({
    method: 'delete',
    url: `/students/${_id}`,
}).then((response) => { }

// 后端（删除）
router.delete('/:_id', async function (req, res, next) {
    const data = await servDelStudents(req.params._id)
    res.send(data)
});
```

![image-20230207172859014](https://img.xbin.cn/images/2023/07/24-03-28-60ab8b.png)

![image-20230207162143798](https://img.xbin.cn/images/2023/07/24-03-28-b3cd2c.png)
