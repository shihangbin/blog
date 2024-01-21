# DDL 语句

> DDL（Data Definition Language）：数据定义语言；

- 可以通过 DDL 语句对数据库或者表进行：创建、删除、修改等操作；

## 数据库的操作（一）

> 查看当前数据库：

```sh
# 查看所有的数据
SHOW DATABASES;
# 使用某一个数据
USE coderhub;
# 查看当前正在使用的数据库
SELECT DATABASE();
```

> 创建新的数据库：

```sh
# 创建数据库语句
CREATE DATABASE bilibili;
CREATE DATABASE IF NOT EXISTS bilibili;
CREATE DATABASE IF NOT EXISTS bilibili
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

## 数据库的操作（二）

> 删除数据库：

```sh
# 删除数据库
DROP DATABASE bilibili;
DROP DATABASE IF EXIT bilibili;
```

> 修改数据库：

```sh
# 修改数据库的字符集和排序规则
ALTER DATABASE bilibili CHARACTER SET = utf8 COLLATE = utf8_unicode_ci;
```

## 数据表的操作（三）

> 查看数据表

```sh
# 查看所有的数据表
SHOW TABLES;
# 查看某一个表结构
DESC user;
```

> 创建数据表

```sh
CREATE TABLE IF NOT EXISTS `users`(
  name VARCHAR(20),
  age INT,
  height DOUBLE
);
```

## 创建一个完整的表

> 创建数据表

```sh
# 创建一张表
CREATE TABLE IF NOT EXISTS `users`(
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  age INT DEFAULT 0,
  telPhone VARCHAR(20) DEFAULT '' UNIQUE NOT NULL
);
```

> 删除数据表

```sh
# 删除数据库
DROP TABLE users;
DROP TABLE IF EXISTS users;
```

## 修改表

> 如果我们希望对表中某一个字段进行修改：

```sh
# 1.修改表名
ALTER TABLE `moments` RENAME TO `moment`;
# 2.添加一个新的列
ALTER TABLE `moment` ADD `publishTime` DATETIME;
ALTER TABLE `moment` ADD `updateTime` DATETIME;
# 3.删除一列数据
ALTER TABLE `moment` DROP `updateTime`;
# 4.修改列的名称
ALTER TABLE `moment` CHANGE `publishTime` `publishDate` DATE;
# 5.修改列的数据类型
ALTER TABLE `moment` MODIFY `id` INT;
```
