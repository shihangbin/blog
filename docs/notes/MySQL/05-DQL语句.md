# DQL 语句

> DQL：Data Query Language（数据查询语言）

- SELECT 用于从一个或者多个表中检索选中的行（Record）。

## 查询的格式如下：

```sh
SELECT select_expr [, select_expr]...
  [FROM table_references]
  [WHERE where_condition]
  [ORDER BY expr [ASC | DESC]]
  [LIMIT {[offset,] row_count | row_count OFFSET offset}]
  [GROUP BY expr]
  [HAVING where_condition]
```

## 准备数据：

```sh
CREATE TABLE IF NOT EXISTS `products` (
  id INT PRIMARY KEY AUTO_INCREMENT,
  brand VARCHAR(20),
  title VARCHAR(100) NOT NULL,
  price DOUBLE NOT NULL,
  score DECIMAL(2,1),
  voteCnt INT,
  url VARCHAR(100),
  pid INT
);
```

```js
const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Coderwhy888.',
  database: 'coderhub',
})
const statement = `INSERT INTO products SET ?;`
const phoneJson = require('./phone.json')
for (let phone of phoneJson) {
  connection.query(statement, phone)
}
```

## 基本查询

> 查询所有的数据并且显示所有的字段：

```sh
SELECT * FROM `products`;
```

> 查询 title、brand、price：

```sh
SELECT title, brand, price FROM `products`;
```

> 我们也可以给字段起别名：

- 别名一般在多张表或者给客户端返回对应的 key 时会使用到；

```sh
SELECT title as t, brand as b, price as p FROM `products`;
```

## where 查询条件（一）

> 在开发中，我们希望根据条件来筛选我们的数据，这个时候我们要使用条件查询：

- 条件查询会使用 WEHRE 查询子句；

> WHERE 的比较运算符

```sh
# 查询价格小于1000的手机
SELECT * FROM `products` WHERE price < 1000;
# 查询价格大于等于2000的手机
SELECT * FROM `products` WHERE price >= 2000;
# 价格等于3399的手机
SELECT * FROM `products` WHERE price = 3399;
# 价格不等于3399的手机
SELECT * FROM `products` WHERE price != 3399;
# 查询华为品牌的手机
SELECT * FROM `products` WHERE `brand` = '华为';
```

## where 查询条件（二）

> WHERE 的逻辑运算符

```sh
# 查询品牌是华为，并且小于2000元的手机
SELECT * FROM `products` WHERE `brand` = '华为' and `price` < 2000;
SELECT * FROM `products` WHERE `brand` = '华为' && `price` < 2000;
# 查询1000到2000的手机（不包含1000和2000）
SELECT * FROM `products` WHERE price > 1000 and price < 2000;
# OR: 符合一个条件即可
# 查询所有的华为手机或者价格小于1000的手机
SELECT * FROM `products` WHERE brand = '华为' or price < 1000;
# 查询1000到2000的手机（包含1000和2000）
SELECT * FROM `products` WHERE price BETWEEN 1000 and 2000;
# 查看多个结果中的一个
SELECT * FROM `products` WHERE brand in ('华为', '小米');
```

## where 查询条件（三）

> 模糊查询使用 LIKE 关键字，结合两个特殊的符号：

- %表示匹配任意个的任意字符；
- \_表示匹配一个的任意字符；

```sh
# 查询所有以v开头的title
SELECT * FROM `products` WHERE title LIKE 'v%';
# 查询带M的title
SELECT * FROM `products` WHERE title LIKE '%M%';
# 查询带M的title必须是第三个字符
SELECT * FROM `products` WHERE title LIKE '__M%';
```

## 查询结果排序

> 当我们查询到结果的时候，我们希望讲结果按照某种方式进行排序，这个时候使用的是 ORDER BY；
> `ORDER BY` 有两个常用的值：

- `ASC：升序排列；`
- `DESC：降序排列；`

查询结果排序

```sh
SELECT * FROM `products` WHERE brand = '华为' or price < 1000 ORDER BY price ASC;
```

## 分页查询

> 当数据库中的数据非常多时，一次性查询到所有的结果进行显示是不太现实的：

- 在真实开发中，我们都会要求用户传入 offset、limit 或者 page 等字段；
- 它们的目的是让我们可以在数据库中进行分页查询；
- 它的用法有[LIMIT {[offset,] row_count | row_count OFFSET offset}]

```sh
SELECT * FROM `products` LIMIT 30 OFFSET 0;
SELECT * FROM `products` LIMIT 30 OFFSET 30;
SELECT * FROM `products` LIMIT 30 OFFSET 60;
# 另外一种写法：offset, row_count
SELECT * FROM `products` LIMIT 90, 30;
```
