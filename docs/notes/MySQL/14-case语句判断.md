# CASE 语句

```sh
# 准备工作： 1.导入 atguigudb 数据库

# 2.建立 dbtest08 数据库
CREATE DATABASE dbtest08 CHARACTER SET utf8;

# 3.切换当前数据库为 dbtest08
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

# 例 1：编写一个过程 get_grade，实现以下功能，并用 IN 参数 score 接收输入的成绩，用 OUT 参数 grade 输出该成绩的等级。90~100 优秀80~89 良好70~79 中等60~69 及格0~59 不及格
DELIMITER //
  CREATE PROCEDURE get_grade(IN score FLOAT, OUT grade VARCHAR(5))
  BEGIN
  CASE
    WHEN score >= 90 THEN
      SET grade = '优秀';
    WHEN score >= 80 THEN
      SET grade = '良好';
    WHEN score >= 70 THEN
      SET grade = '中等';
    WHEN score >= 60 THEN
      SET grade = '及格';
    ELSE
      SET grade = '不及格';
    END CASE;
END //
DELIMITER ;

CALL get_grade(75, @res);
SELECT @res;

# 例 2：编写一个过程 get_english_weekday，实现以下功能，用 IN 参数 weekday_num 接收输入的 weekday 编号，用 OUT 参数 weekday_name 得到该编号对应的英文名称。0---Sunday1---Monday2---Tuesday3---Wednesday4---Thursday5---Friday6---Saturday

DELIMITER //
  CREATE PROCEDURE get_english_weekday(IN weekday_num INT, OUT weekday_name VARCHAR(15))
  BEGIN
  CASE weekday_num
    WHEN 0 THEN
     SET weekday_name = 'Sunday';
    WHEN 1 THEN
     SET weekday_name = 'Monday';
    WHEN 2 THEN
     SET weekday_name = 'Tuesday';
    WHEN 3 THEN
      SET weekday_name = 'wednesday';
    WHEN 4 THEN
     SET weekday_name = 'Thursday';
    WHEN 5 THEN
     SET weekday_name = 'Friday';
    ELSE
      SET weekday_name = 'Saturday';
    END CASE;
  END //
DELIMITER ;

CALL get_english_weekday(5, @res);
SELECT @res;

# 例 3：编写一个过程 get_month_days，实现求某年某月有多少天，用 IN 参数 year 和 month 来接收输入的年和月，用 OUT 参数 days 得到某年某月的天数。

DELIMITER //
CREATE PROCEDURE get_month_days(IN YEAR INT, IN MONTH INT, OUT days INT)
BEGIN
  CASE
    WHEN MONTH IN (1, 3, 5, 7, 8, 10, 12) THEN
      SET days = 31;
    WHEN MONTH IN (4, 6, 9, 11) THEN
      SET days = 30;
    ELSE
      IF YEAR % 4 = 0 AND YEAR % 100 <> 0 || YEAR % 400 = 0 THEN
        SET days = 29;
      ELSE
        SET days = 28;
      END IF;
    END CASE;
END //
DELIMITER ;

CALL get_month_days(1900, 2, @res);
SELECT @res;

# 例 4：声明存储过程 update_salary_by_eid4，定义 IN 参数 emp_id，输入员工编号。判断该员工的入职年限，如果是 0 年，薪资涨 50；如果是 1 年，薪资涨 100；如果是 2 年，薪资涨 200；如果是 3 年，薪资涨 300；如果是 4 年，薪资涨 400；其他的涨薪 500。

DELIMITER //
  CREATE PROCEDURE update_salary_by_eid4(IN emp_id INT)
  BEGIN
  DECLARE years INT;
  SELECT FLOOR(DATEDIFF(CURDATE(), hire_date) / 365) INTO years
  FROM emps
  WHERE employee_id = emp_id;
    CASE years
     WHEN 0 THEN
      UPDATE emps SET salary = salary + 50 WHERE employee_id = emp_id;
     WHEN 1 THEN
      UPDATE emps SET salary = salary + 100 WHERE employee_id = emp_id;
     WHEN 2 THEN
      UPDATE emps SET salary = salary + 200 WHERE employee_id = emp_id;
     WHEN 3 THEN
      UPDATE emps SET salary = salary + 300 WHERE employee_id = emp_id;
     WHEN 4 THEN
      UPDATE emps SET salary = salary + 400 WHERE employee_id = emp_id;
     ELSE
    UPDATE emps SET salary = salary + 500 WHERE employee_id = emp_id;
    END CASE;
  END //
DELIMITER ;

SELECT _ FROM emps WHERE employee_id = 104;
CALL update_salary_by_eid4(104);
SELECT _ FROM emps WHERE employee_id = 104;

# 例 5：声明存储过程“update_salary_by_eid5”，定义 IN 参数 emp_id，输入员工编号。判断该员工薪资如果低于 9000 元，就更新薪资为 9000 元；薪资大于等于 9000 元且低于 10000 的，但是奖金比例为 NULL 的，就更新奖金比例为 0.01；其他的涨薪 100 元。
DELIMITER //
CREATE PROCEDURE update_salary_by_eid5(IN emp_id INT)
BEGIN
DECLARE emp_sal, emp_comm DOUBLE;
SELECT salary, commission_pct INTO emp_sal, emp_comm
FROM emps
WHERE employee_id = emp_id;
  CASE
   WHEN emp_sal < 9000 THEN
     UPDATE emps SET salary = 9000 WHERE employee_id = emp_id;
   WHEN emp_sal < 10000 AND emp_comm IS NULL THEN
     UPDATE emps SET commission_pct = 0.01 WHERE employee_id = emp_id;
  ELSE
     UPDATE emps SET salary = salary + 100 WHERE employee_id = emp_id;
  END CASE;
END //
DELIMITER ;

SELECT _ FROM emps WHERE employee_id = 103;
CALL update_salary_by_eid5(103);
SELECT _ FROM emps WHERE employee_id = 103;

# 例 6：创建存储过程 test_if_pro()，传入工资值，如果工资值<3000,则删除工资为此值的员工，如果 3000 <= 工资值 <= 5000,则修改此工资值的员工薪资涨 1000，否则涨工资 500
DELIMITER //
CREATE PROCEDURE test_if_pro(IN emp_sal DOUBLE)
BEGIN
  CASE
   WHEN emp_sal < 3000 THEN
      DELETE FROM emps WHERE salary = emp_sal;
    WHEN emp_sal <= 5000 THEN
      UPDATE emps SET salary = salary + 1000 WHERE salary = emp_sal;
    ELSE
      UPDATE emps SET salary = salary + 500 WHERE salary = emp_sal;
  END CASE;
END //
DELIMITER ;

SELECT _ FROM emps WHERE employee_id = 150;
CALL test_if_pro(10000);
SELECT _ FROM emps WHERE employee_id = 150;

```
