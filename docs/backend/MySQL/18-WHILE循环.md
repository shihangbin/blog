# WHILE 循环

```sh
# 准备工作：
# 1.导入atguigudb数据库


# 2.建立dbtest08数据库
CREATE DATABASE dbtest08 CHARACTER SET utf8;

# 3.切换当前数据库为dbtest08
USE dbtest08;

# 4.建立表
CREATE TABLE emps
AS
SELECT * FROM atguigudb.employees;

CREATE TABLE depts
AS
SELECT * FROM atguigudb.departments;

SELECT * FROM emps;

SELECT * FROM depts;

# ---------------------------------------WHILE循环----------------------------------------------------------------
# 例1：编写一个函数get_sum2，定义参数start_val和end_val，计算从start_val到end_val所有整数之和。
DELIMITER //
CREATE FUNCTION get_sum2(start_val INT, end_val INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET i = start_val;
    SET res = 0;
    WHILE i <= end_val DO
        SET res = res + i;
        SET i = i + 1;
    END WHILE;
    RETURN res;
END //
DELIMITER ;

SELECT get_sum2(1, 100);

# 例2：市场环境不好时，公司为了渡过难关，决定暂时降低大家的薪资。声明存储过程“update_salary_while()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家降薪，薪资降为原来的90%。直到全公司的平均薪资达到3000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_while(OUT num INT)
BEGIN
    DECLARE avg_sal DOUBLE;
    SET num = 0;
    SELECT AVG(salary) INTO avg_sal FROM emps;
    WHILE avg_sal > 3000 DO
        UPDATE emps SET salary = salary * 0.9;
        SET num = num + 1;
        SELECT AVG(salary) INTO avg_sal FROM emps;
    END WHILE;
END //
DELIMITER ;

CALL update_salary_while(@cnt);
SELECT @cnt;

# 例3：编写一个函数get_factorial，定义参数n，实现求n的阶乘
DELIMITER //
CREATE FUNCTION get_factorial(n INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET i = 1;
    SET res = 1;
    WHILE i <= n DO
        SET res = res * i;
        SET i = i + 1;
    END WHILE;
    RETURN res;
END //
DELIMITER ;

SELECT get_factorial(10);


# 例4：编写一个过程get_leap_year，定义参数start_year和end_year，输出所有的闰年。
DELIMITER //
CREATE PROCEDURE get_leap_year(IN start_year INT, IN end_year INT)
BEGIN
    DECLARE i INT;
    DECLARE res VARCHAR(1000);
    SET i = start_year;
    SET res = '';
    WHILE i <= end_year DO
        IF i % 4 = 0 AND i % 100 <> 100 OR i % 400 = 0 THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END WHILE;
    SELECT res;
END //
DELIMITER ;

CALL get_leap_year(1970, 2023);


# 例5：编写一个过程get_narcissistic_num，输出所有的水仙花数。
DELIMITER //
CREATE PROCEDURE get_narcissistic_num()
BEGIN
    DECLARE i, ge, shi, bai, total INT;
    DECLARE res VARCHAR(100);
    SET i = 100;
    SET res = '';
    WHILE i < 1000 DO
        SET ge = i % 10;
        SET shi = FLOOR(i / 10) % 10;
        SET bai = FLOOR(i / 100);
        SET total = ge * ge * ge + shi * shi * shi + bai * bai * bai;
        IF total = i THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END WHILE;
    SELECT res;
END //
DELIMITER ;

CALL get_narcissistic_num();


# 例6：编写一个过程get_prime_num，输出1--100以内所有的素数。
DELIMITER //
CREATE PROCEDURE get_prime_num()
BEGIN
    DECLARE i, j, n INT;
    DECLARE res VARCHAR(1000);
    SET i = 2;
    SET res = '';
    WHILE i <= 100 DO
        SET j = 2;
        SET n = FLOOR(SQRT(i));
        label:WHILE j <= n DO
            IF i % j = 0 THEN
                LEAVE label;
            END IF;
            SET j = j + 1;
        END WHILE;
        IF j > n THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END WHILE;
    SELECT res;
END //
DELIMITER ;

CALL get_prime_num();
```
