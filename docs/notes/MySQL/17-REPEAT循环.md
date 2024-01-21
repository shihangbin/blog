# REPEAT 循环

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

# ---------------------------------------REPEAT循环----------------------------------------------------------------------
# 例1：编写一个函数get_sum3，定义参数start_val和end_val，计算从start_val到end_val所有整数之和。
DELIMITER //
CREATE FUNCTION get_sum3(start_val INT, end_val INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET i = start_val;
    SET res = 0;
    label:REPEAT
        IF i > end_val THEN
            LEAVE label;
        END IF;
        SET res = res + i;
        SET i = i + 1;
        UNTIL i > end_val
    END REPEAT;
    RETURN res;
END //
DELIMITER ;

SELECT get_sum3(1, 100);

# 例2：当市场环境变好时，公司为了奖励大家，决定给大家涨工资。声明存储过程“update_salary_repeat()”，声明OUT参数num，输出循环次数。存储过程中实现循环给大家涨薪，薪资涨为原来的1.15倍。直到全公司的平均薪资达到13000结束。并统计循环次数。
DELIMITER //
CREATE PROCEDURE update_salary_repeat(OUT num INT)
BEGIN
    DECLARE avg_sal DOUBLE;
    SELECT AVG(salary) INTO avg_sal FROM emps;
    SET num = 0;
    label:REPEAT
        IF avg_sal >= 13000 THEN
            LEAVE label;
        END IF;
        UPDATE emps SET salary = salary * 1.15;
        SET num = num + 1;
        SELECT AVG(salary) INTO avg_sal FROM emps;
        UNTIL avg_sal >= 13000
    END REPEAT;

END //
DELIMITER ;

CALL update_salary_repeat(@cnt);
SELECT @cnt;

# 例3：编写一个函数get_factorial，定义参数n，实现求n的阶乘。10!=1*2*3*4*...*10=3628800
DELIMITER //
CREATE FUNCTION get_factorial(n INT)
RETURNS INT
BEGIN
    DECLARE i, res INT;
    SET i = 1;
    SET res = 1;
    label:REPEAT
        IF i > n THEN
            LEAVE label;
        END IF;
        SET res = res * i;
        SET i = i + 1;
        UNTIL i > n
    END REPEAT;
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
    label:REPEAT
        IF i > end_year THEN
            LEAVE label;
        END IF;
        IF i % 4 = 0 AND i % 100 <> 0 OR i % 400 = 0 THEN
            SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
        UNTIL i > end_year
    END REPEAT;
    SELECT res;
END //
DELIMITER ;

CALL get_leap_year(1970, 2023);

# 例5：编写一个过程get_narcissistic_num，输出所有的水仙花数。153 = 1 ^ 3 + 5 ^ 3 + 3 ^ 3
DELIMITER //
CREATE PROCEDURE get_narcissistic_num()
BEGIN
    DECLARE i, ge, shi, bai, total INT;
    DECLARE res VARCHAR(100);
    SET i = 100;
    SET res = '';
    label:REPEAT
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
        UNTIL i >= 1000
    END REPEAT;
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
    label1:REPEAT
        IF i > 100 THEN
            LEAVE label1;
        END IF;
        SET j = 2;
        SET n = FLOOR(SQRT(i));
        label2:REPEAT
            IF j > n THEN
                LEAVE label2;
            END IF;
            IF i % j = 0 THEN
                LEAVE label2;
            END IF;
            SET j = j + 1;
            UNTIL j > n
        END REPEAT;
        IF j > n THEN
           SET res = CONCAT(res, i, '  ');
        END IF;
        SET i = i + 1;
        UNTIL i > 100
    END REPEAT;
    SELECT res;
END //
DELIMITER ;

CALL get_prime_num();
```
