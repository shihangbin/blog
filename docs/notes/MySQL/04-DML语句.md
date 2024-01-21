# DML 语句

> DML：Data Manipulation Language（数据操作语言）

## 创建新表-删除操作

> 创建一张新的表

```sh
CREATE TABLE IF NOT EXISTS `products`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `title` VARCHAR(20),
  `description` VARCHAR(200),
  `price` DOUBLE,
  `publishTime` DATETIME
)
```

> 插入数据：

```sh
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`)
  VALUES ('iPhone', 'iPhone12只要998', 998.88, '2020-10-10');
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`)
  VALUES ('huawei', 'iPhoneP40只要888', 888.88, '2020-11-11');
```

## 删除操作-更新操作

> 删除数据：

```sh
# 删除数据
# 会删除表中所有的数据
DELETE FROM `products`;
# 会删除符合条件的数据
DELETE FROM `products` WHERE `title` = 'iPhone';
```

> 修改数据：

```sh
# 修改数据
# 会修改表中所有的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88;
# 会修改符合条件的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88 WHERE `title` = 'iPhone';
```

> 如果我们希望修改完数据后，直接可以显示最新的更新时间：

```sh
ALTER TABLE `products` ADD `updateTime` TIMESTAMP
  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
```
