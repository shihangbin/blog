# LOOP 循环语句

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

# -----------------------------------Loop循环----------------------------------------------------------
# 例1：编写一个函数get_sum，定义参数start_val和end_val，计算从start_val到end_val所有整数之和。
DELIMITER //
CREATE FUNCTION get_sum(start_val INT, end_val INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET res = 0;
    SET i = start_val;
    label:LOOP
        IF i > end_val THEN
            LEAVE label;
        END IF;
        SET res = res + i;
        SET i = i + 1;
    END LOOP;
    RETURN res;
END //
DELIMITER ;

SELECT get_sum(1000, 2000);

# 例2：当市场环境变好时，公司为了奖励大家，决定给大家涨工资。声明存储过程“update_salary_loop()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家涨薪，薪资涨为原来的1.1倍。直到全公司的平均薪资达到12000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_loop(OUT num INT)
BEGIN
    DECLARE avg_sal DOUBLE;
    SET num = 0;
    label:LOOP
        SELECT AVG(salary) INTO avg_sal
        FROM emps;
        IF avg_sal >= 12000 THEN
            LEAVE label;
        END IF;
        UPDATE emps SET salary = salary * 1.1;
        SET num = num + 1;
    END LOOP;
END //
DELIMITER ;

CALL update_salary_loop(@cnt);
SELECT @cnt;


# 例3：编写一个函数get_factorial，定义参数n，实现求n的阶乘。 n! = 1 * 2 * 3 * 4 * ... * n
DELIMITER //
CREATE FUNCTION get_factorial(n INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET i = 1;
    SET res = 1;
    label:LOOP
        IF i > n THEN
            LEAVE label;
        END IF;
        SET res = res * i;
        SET i = i + 1;
    END LOOP;
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
    label:LOOP
        IF i > end_year THEN
            LEAVE label;
        END IF;
        IF i % 4 = 0 AND i % 100 <> 0 OR i % 400 = 0 THEN
            SET  res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END LOOP;
    SELECT res;
END //
DELIMITER ;

CALL get_leap_year(1900, 2023);


# 例5：编写一个过程get_narcissistic_num，输出所有的水仙花数。 153 = 1 ^ 3 + 5 ^ 3 + 3 ^ 3
DELIMITER //
CREATE PROCEDURE get_narcissistic_num()
BEGIN
    DECLARE i, ge, shi, bai, total INT;
    DECLARE res VARCHAR(100);
    SET i = 100;
    SET res = '';
    label:LOOP
        IF i >= 1000 THEN
            LEAVE label;
        END IF;
        SET ge = i % 10;
        SET shi = FLOOR(i / 10) % 10;
        SET bai = FLOOR(i / 100);
        SET total = ge * ge * ge + shi * shi * shi + bai * bai * bai;
        IF total = i THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END LOOP;
    SELECT res;
END //
DELIMITER ;

CALL get_narcissistic_num();


# 例6：编写一个过程get_prime_num，输出1--100以内所有的素数。质数（只能被1和它本身整除的数）2，3，5， 7， 11， 13，17， 19..。双重循环

DELIMITER //
CREATE PROCEDURE get_prime_num()
BEGIN
    DECLARE i, j, n INT;
    DECLARE res VARCHAR(1000);
    SET i = 2;
    SET res = '';
    label:LOOP
        IF i > 100 THEN
            LEAVE label;
        END IF;
        #判断每一个i是不是素数，如果是记录到res中
        SET j = 2;
        SET n = FLOOR(SQRT(i));
        label2:LOOP
            IF j > n THEN
                LEAVE label2;
            END IF;
            IF i % j = 0 THEN
                LEAVE label2;
            END IF;
            SET j = j + 1;
        END LOOP;
        IF j > n  THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
    END LOOP;
    SELECT res;
END //

DELIMITER ;

CALL get_prime_num();
```
