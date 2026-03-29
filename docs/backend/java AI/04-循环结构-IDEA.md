# 一、复习

1、输出语句

```java
System.out.println(【内容】); //输出内容之后换行
System.out.print(内容); //输出内容之后不换行
```

2、输入语句

```java
import java.util.Scanner;

public class 类名{
    public static void main(String[] args){
        Scanner 变量名 = new Scanner(System.in);

        System.out.print("请输入xxx内容：");
        String s = 变量名.next();
        int i = 变量名.nextInt();
        double d = 变量名.nextDouble();
        boolean b = 变量名.nextBoolean();
        char c = 变量名.next().charAt(索引编号);

        变量名.close();
    }
}
```

```java
import java.util.Scanner;

public class 类名{
    public static void main(String[] args){
        Scanner 变量名 = new Scanner(System.in);

        System.out.print("请输入xxx内容：");
        String s = 变量名.next();
        变量名.nextLine();//不接收

        System.out.print("请输入一行的内容：");
        String s = 变量名.nextLine();

        变量名.close();
    }
}
```

3、条件判断

单分支：

```java
if(条件1){
    语句1;
}
if(条件2){
    语句2;
}
if(条件3){
    语句3;
}
//每一个if都是独立的
//不定项选择
```

双分支：

```java
if(条件){
    语句1;
}else{
    语句2;
}
//二选一
```

多分支：

```java
if(条件1){
    语句1;
}else if(条件2){
    语句2;
}else if(条件3){
    语句3;
}

//如果条件1成立，下面的条件2,3就不看了。如果条件1不成立，才看条件2.
//如果条件2成立，下面的条件3就不看了。如果条件2不成立，才看条件3.
//多选一
```

4、选择结构

传统有穿透性：

```java
switch(表达式){
    case 常量值1:
        语句1;
        【break;】
    case 常量值2:
        语句2;
        【break;】
     【
     default:
        语句n;
            】
}
```

新特性：

```java
switch(表达式){
    case 常量值1 ->
        语句1;
    case 常量值2 ->
        语句2;
     【
     default ->
        语句n;
            】
}
```

```java
变量 = switch(表达式){
    case 常量值1 ->
        值1;
    case 常量值2 ->
        值2;
     default ->
        值n;
}
```

```java
变量 = switch(表达式){
    case 常量值1 ->
        {
            语句;
        	yield 值1;
        }

    case 常量值2 ->
        值2;
     default ->
        值n;
}
```

```java
switch(表达式){
    case 常量值1,常量值2,常量值3 ->
        语句1;
    case 常量值4 ->
        语句2;
     【
     default ->
        语句n;
            】
}
```

`switch(表达式)`的类型只能是 byte,short,char,int 或者是他们的包装类，字符串，枚举。

# 二、循环结构

## 2.1 循环结构的作用

可以`反复/重复`执行某些语句。

## 2.2 循环结构的分类

- for 循环
- while 循环
- do-while 循环

这 3 种循环结构作用相同，完全可以互换。只是程序员会有一些使用习惯：

- 当循环次数比较明显的，首先考虑用 for
- 当这些需要重复执行的语句，至少执行 1 次，一般考虑用 do-while
- 当次数不明显，循环条件比较清晰，需要重复执行的语句不是至少执行 1 次，那么考虑用 while

## 2.3 for 循环

### 2.3.1 语法格式和执行特点

语法格式：

```java
for( ; ; ){ //两个;不能多也不能少
    需要重复执行的语句;//循环体语句
}
```

- 如果`for()`没有明确写条件，{}里面也没有用 break，return 跳转的语句，那么它就是一个死循环。

```java
for(①循环变量初始化表达式 ; ②循环条件判断表达式 ; ③循环变量的修改迭代表达式){
    ④循环体语句;
}
```

执行过程：

- 情况 1：① -> ② 不成立
- 情况 2：① -> ② 成立 -> ④ -> ③ -> ② 成立 -> ④ -> ③ 。。。。-> ② 不成立

```java
public class ForTest1 {
    public static void main(String[] args) {
     /*   for(;;){//死循环
            System.out.println("我爱尚硅谷");
        }*/

        //这里i<5成立时，表示循环体语句要执行。当i>=5，循环就结束了
/*        for(int i=0; i<5; i++){
            System.out.println("我爱尚硅谷");
        }*/
        /*
        第1次： i=0, i<5成立， System.out.println("我爱尚硅谷");
            i++
        第2次： i=1, i<5成立， System.out.println("我爱尚硅谷");
            i++
        第3次： i=2, i<5成立， System.out.println("我爱尚硅谷");
            i++
        第4次： i=3, i<5成立， System.out.println("我爱尚硅谷");
            i++
        第5次： i=4, i<5成立， System.out.println("我爱尚硅谷");
            i++
            i=5, i<5不成立，结束
         */

        for(int i=0; i>5; i++){//一次都不执行
            System.out.println("我爱尚硅谷");
        }
        /*
        第1次： i=0, i>5不成立，直接结束
         */
    }
}

```

### 2.3.2 案例演示

#### 1、案例 1

```java
public class ForTest2 {
    public static void main(String[] args) {
        //循环输出1-10的数字，统计1-10的累加和
        /*int sum = 0;
        for(int i=1; i<=10; i++){
            sum += i;
            System.out.println("i = " + i);
        }
        System.out.println("sum = " + sum);*/

        System.out.println("=================");
        //循环输出1-10的偶数，统计1-10的偶数累加和
        /*int sum = 0;
        for(int i=1; i<=10; i++){
            if(i%2==0) {
                sum += i;
                System.out.println("i = " + i);
            }
        }
        System.out.println("sum = " + sum);*/

        System.out.println("=================");
        //循环输出1-10的偶数，统计1-10的偶数累加和
        int sum = 0;
        for(int i=2; i<=10; i+=2){
            sum += i;
            System.out.println("i = " + i);
        }
        System.out.println("sum = " + sum);

    }
}
```

#### 2、练习题 2

```java
public class ForExercise2 {
    public static void main(String[] args) {
        //2、所谓水仙花数是指一个3位数，其各个位上数字立方和等于其本身。
        // 例如： 153 = 1*1*1 + 5*5*5 + 3*3*3，找出所有的水仙花数，并统计他们有几个。
        /*
        分析：
        （1）3位数，范围是[100, 999] ，[100, 1000)
        （2）各个位上数字
        （3）如何统计他们的个数 ？需要单独定义变量，代表个数，找到一个水仙花数，就count++;
         */
        int count = 0;
        for (int i = 100; i < 1000; i++) {
            int bai = i / 100;
            int shi = i / 10 % 10;
            int ge = i % 10;

           /* if (bai * bai * bai + shi * shi * shi + ge * ge * ge == i) {
                System.out.println(i);
            }*/
            if (Math.pow(bai,3) + Math.pow(shi,3)+ Math.pow(ge,3) == i) {
                System.out.println(i);
                count++;
            }
        }
        System.out.println("水仙花数的个数： " + count);
    }
}

```

#### 3、练习题 3

```java
public class ForExercise3 {
    public static void main(String[] args) {
        //3、从1循环到150并在每行打印一个值，另外在每个3的倍数行上打印出“foo”,
        // 在每个5的倍数行上打印“biz”,在每个7的倍数行上打印输出“baz”。
        /*
        分析：
        （1）数字范围 [1,150]
        (2)如何判断3的倍数、5的倍数、7的倍数
        i%3==0
        i%5==0
        i%7==0
        （3）上面3个条件是什么关系？独立的关系
        （4）什么时候换行？？？？
         */
        for(int i=1; i<=150; i++){
            System.out.print(i);
            if(i%3==0){
                System.out.print("\tfoo");
            }
            if(i%5==0){
                System.out.print("\tbiz");
            }
            if(i%7==0){
                System.out.print("\tbaz");
            }
            System.out.println();
        }
    }
}

```

```java
public class ForExercise3_2 {
    public static void main(String[] args) {
        //3、从1循环到150并在每行打印一个值，另外在每个3的倍数行上打印出“foo”,
        // 在每个5的倍数行上打印“biz”,在每个7的倍数行上打印输出“baz”。
        /*
        分析：
        （1）数字范围 [1,150]
        (2)如何判断3的倍数、5的倍数、7的倍数
        i%3==0
        i%5==0
        i%7==0
        （3）上面3个条件是什么关系？独立的关系
        （4）什么时候换行？？？？
         */
        for (int i = 1; i <= 150; i++) {
            String str = i + "";
            str += (i % 3 == 0 ? "\tfoo" : "");
            str += (i % 5 == 0 ? "\tbiz" : "");
            str += (i % 7 == 0 ? "\tbaz" : "");
            System.out.println(str);
        }
    }
}

```

#### 4、练习题 4

```java
import java.util.Scanner;

public class ForExercise4 {
    public static void main(String[] args) {
        /*
        4、声明变量balance并初始化为0，用以表示银行账户的余额，下面通过ATM机程序实现存款，取款等功能。
        ---------ATM-------
            1、存款
            2、取款
            3、显示余额
            4、退出
        请选择：

         */
        Scanner input = new Scanner(System.in);

        double balance = 0.0;
        boolean flag = true;
        for(; flag ;) {
            System.out.println("---------ATM-------");
            System.out.println("       1、存款");
            System.out.println("       2、取款");
            System.out.println("       3、显示余额");
            System.out.println("       4、退出");
            System.out.print("       请选择：");
            int select = input.nextInt();
            switch (select){
                case 1 -> {
                    System.out.print("请输入存款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("存款金额不能为负数！");
                    }else {
                        balance += money;
                    }
                }
                case 2 ->{
                    System.out.print("请输入取款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("取款金额不能为负数！");
                    }else if(balance >= money) {
                        balance -= money;
                    }else{
                        System.out.println("余额不足！");
                    }
                }
                case 3 -> System.out.println("余额：" + balance);
                case 4 -> flag=false;
            }
        }

        input.close();

    }
}

```

## 2.4 while 循环

### 2.4.1 语法格式和执行特点

语法格式：

```java
①循环变量初始化;

while(②循环条件){
    ④循环体语句;
    ③循环变量的修改迭代语句;
}
```

执行过程：

情况一：①->② 条件不成立，结束

情况二：①->② 条件成立->④->③->② 条件成立->④->③->...② 条件不成立

```java
public class WhileTest1 {
    public static void main(String[] args) {
        //需求：输出5次的我爱尚硅谷
        /*while(true){//死循环
            System.out.println("我爱尚硅谷");
        }*/

        int i=1;
        while(i<=5){
            System.out.println("我爱尚硅谷");
            i++;
        }

        /*
        int i=1;
        while(i>=5){//一次都不执行
            System.out.println("我爱尚硅谷");
            i++;
        }*、
    }
}

```

### 2.4.2 案例演示

#### 1、案例 1

```java
public class WhileExercise1 {
    public static void main(String[] args) {
//        打印1-100之间的偶数
        /*for(int i=2; i<=100; i+=2){
            System.out.println(i);
        }*/
        int i=2;
        while(i<=100){
            System.out.println(i);
            i+=2;
        }

    }
}

```

#### 2、案例 2

```java
public class WhileExercise2 {
    public static void main(String[] args) {
        //2、所谓水仙花数是指一个3位数，其各个位上数字立方和等于其本身。
        int count = 0;
        int i = 100;
        while ( i < 1000 ) {

            int bai = i / 100;
            int shi = i / 10 % 10;
            int ge = i % 10;
            if (Math.pow(bai,3) + Math.pow(shi,3)+ Math.pow(ge,3) == i) {
                System.out.println(i);
                count++;
            }
            i++;
        }
        System.out.println("水仙花数的个数： " + count);
    }
}

```

#### 3、案例 3

```java
public class WhileExercise3 {
    public static void main(String[] args) {
        //3、从1循环到150并在每行打印一个值，另外在每个3的倍数行上打印出“foo”,
        // 在每个5的倍数行上打印“biz”,在每个7的倍数行上打印输出“baz”。
        int i=1;
        while( i<=150){
            System.out.print(i);
            if(i%3==0){
                System.out.print("\tfoo");
            }
            if(i%5==0){
                System.out.print("\tbiz");
            }
            if(i%7==0){
                System.out.print("\tbaz");
            }
            System.out.println();
            i++;
        }
    }
}

```

#### 4、案例 4

```java
import java.util.Scanner;

public class WhileExercise4 {
    public static void main(String[] args) {
                /*
        4、声明变量balance并初始化为0，用以表示银行账户的余额，下面通过ATM机程序实现存款，取款等功能。
        ---------ATM-------
            1、存款
            2、取款
            3、显示余额
            4、退出
        请选择：

         */
        Scanner input = new Scanner(System.in);

        double balance = 0.0;
        boolean flag = true;
        while(flag) {
            System.out.println("---------ATM-------");
            System.out.println("       1、存款");
            System.out.println("       2、取款");
            System.out.println("       3、显示余额");
            System.out.println("       4、退出");
            System.out.print("       请选择：");
            int select = input.nextInt();
            switch (select){
                case 1 -> {
                    System.out.print("请输入存款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("存款金额不能为负数！");
                    }else {
                        balance += money;
                    }
                }
                case 2 ->{
                    System.out.print("请输入取款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("取款金额不能为负数！");
                    }else if(balance >= money) {
                        balance -= money;
                    }else{
                        System.out.println("余额不足！");
                    }
                }
                case 3 -> System.out.println("余额：" + balance);
                case 4 -> flag=false;
            }
        }

        input.close();
    }
}

```

## 2.5 do-while 循环

### 2.5.1 语法格式和执行特点

语法格式：

```java
do{
    循环体语句;
}while(循环条件);
```

执行特点：循环体语句至少执行 1 次。

```java
public class DoWhileTest1 {
    public static void main(String[] args) {
        /*do{
            System.out.println("我爱尚硅谷");
        }while (false);
        //至少执行一次循环体语句*/


        int i = 1;
        do{
            System.out.println("我爱尚硅谷" + i);
            i++;
        }while (i<=5);
    }
}

```

### 2.5.2 案例演示

#### 1、案例 1

```java
public class DoWhileExercise1 {
    public static void main(String[] args) {
        // 打印1-100之间的偶数
        int even = 2;//even偶数，odd奇数
        do{
            System.out.println(even);
            even +=2;
        }while (even<=100);

    }
}

```

#### 2、案例 2

```java
import java.util.Scanner;

public class DoWhileExercise4 {
    public static void main(String[] args) {
         /*
        4、声明变量balance并初始化为0，用以表示银行账户的余额，下面通过ATM机程序实现存款，取款等功能。
        ---------ATM-------
            1、存款
            2、取款
            3、显示余额
            4、退出
        请选择：

         */
        Scanner input = new Scanner(System.in);

        double balance = 0.0;
        boolean flag = true;
        do{
            System.out.println("---------ATM-------");
            System.out.println("       1、存款");
            System.out.println("       2、取款");
            System.out.println("       3、显示余额");
            System.out.println("       4、退出");
            System.out.print("       请选择：");
            int select = input.nextInt();
            switch (select){
                case 1 -> {
                    System.out.print("请输入存款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("存款金额不能为负数！");
                    }else {
                        balance += money;
                    }
                }
                case 2 ->{
                    System.out.print("请输入取款金额：");
                    double money = input.nextDouble();
                    if(money<0) {
                        System.out.println("取款金额不能为负数！");
                    }else if(balance >= money) {
                        balance -= money;
                    }else{
                        System.out.println("余额不足！");
                    }
                }
                case 3 -> System.out.println("余额：" + balance);
                case 4 -> flag = false;
            }
        }while(flag);

        input.close();
    }
}

```

## 2.6 循环嵌套

循环嵌套的形式：

- for 套 for，for 套 while，while 套 for，........
- 嵌套的层数理论上没有限制，但是习惯上最多不超过 3 层

循环嵌套的执行特点：外循环循环一次，内循环循环一轮。

比喻：外循环相当于时针，内循环相当于分钟

### 2.6.1 案例 1

```java
public class ForForTest1 {
    public static void main(String[] args) {
       /* for(int i=1; i<=5; i++){//外循环5次
            for(int j=1; j<=10; j++){//内循环5轮，每一轮10次
                System.out.println("i = " + i +", j =" + j);//执行了50次
            }
        }*/

        for(int hour=0; hour<24; hour++){
            System.out.println("时" + hour);//24次

            for(int minute=0; minute<60; minute++){
                System.out.println("\t分：" + minute);//24*60
            }
        }
    }
}

```

### 2.6.2 案例 2

```java
/*

*
**
***
****
*****

 */
public class ForForTest2 {
    public static void main(String[] args) {
        for(int i=1; i<=5; i++){
            //打印n个*
            /*
            当i=1，第1轮，1个*，内循环走1轮才打印1个*  j=1; j<=1
            当i=2，第2轮，2个*，内循环走1轮才打印2个*  j=1; j<=2
            当i=3，第3轮，3个*，内循环走1轮才打印3个*  j=1; j<=3
            当i=4，第4轮，4个*，内循环走1轮才打印4个*  j=1; j<=4
            当i=5，第5轮，5个*，内循环走1轮才打印5个*  j=1; j<=5
             */
            for(int j=1; j<=i; j++){
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

```

### 2.6.3 案例 3

```java
/*

    *
   ***
  *****
 *******
*********

 */
public class ForForTest3 {
    public static void main(String[] args) {
        for(int i=1; i<=5; i++){
            //打印m个空格‘
            /*
            i=1,4个空格  j=1; j<=4
            i=2,3个空格  j=1; j<=3
            i=3,2个空格  j=1; j<=2
            i=4,1个空格  j=1; j<=1
            i=5,0个空格  j=1; j<=0
                            j<=5-i
             */
            for(int j=1; j<=5-i; j++){
                System.out.print(" ");
            }

            //打印n个*
            /*
            当i=1，第1轮，1个*  j=1; j<=1
            当i=2，第2轮，3个*  j=1; j<=3
            当i=3，第3轮，5个*  j=1; j<=5
            当i=4，第4轮，7个* j=1; j<=7
            当i=5，第5轮，9个* j=1; j<=9
                                 j<=2*i-1
             */
            for(int j=1; j<=2*i-1; j++){
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

```

### 2.6.4 练习题

#### 练习题 1：九九乘法表

```java
public class ForForExercise1 {
    public static void main(String[] args) {
        /*
        1、理解双重循环的执行过程
        2、对于图形打印来说，外循环控制的行，内循环控制的是每一行列（列可能是空格或*或数字）
        九九乘法表：
        （1）外循环控制9行
        （2）内循环控制9个式子
         */
        for(int i=1; i<=9; i++){
            //第i行有i个式子
            for(int j=1; j<=i; j++){
                System.out.print(j +"*" + i + "=" + i*j + "\t" );
            }
            System.out.println();
        }
    }
}

```

#### 练习题 2：完数

```java
public class ForForExercise2 {
    public static void main(String[] args) {
        /*
        一个数如果恰好等于它的因子之和，这个数就称为"完数"。（因子：除去这个数本身的约数）
        例如6=1＋2＋3.编程 找出1000以内的所有完数
        6的约数：1,2,3,6
        6的因子：1,2,3

        数字 i，它的因子怎么找？
        for(int j=1; j<i; j++){
            if(i%j==0){
                j是i的因子
            }
        }
         */

        /*for(int i=1; i<1000; i++){
            int sum = 0;//当i变化时，sum归零。
            for(int j=1; j<i; j++){
                if(i%j==0){
                    sum+=j;//j是i的因子
                }
            }
            //sum是i的所有因子之和
            if(sum == i){
                System.out.println(i);
            }
        }*/

        for(int i=1; i<1000; i++){
            int sum = 0;//当i变化时，sum归零。
            for(int j=1; j<=i/2; j++){
                if(i%j==0){
                    sum+=j;//j是i的因子
                }
            }
            //sum是i的所有因子之和
            if(sum == i){
                System.out.println(i);
            }
        }
    }
}

```

#### 练习题 3：菱形

```java
public class ForForExercise3 {
    public static void main(String[] args) {
        //上下部分分开（95%+都是这种思路）
        //上半部分：5行
        /*
        第1行，1个*，4个空格
        第2行，3个*，3个空格
        第3行，5个*，2个空格
        第4行，7个*，1个空格
        第5行，9个*，0个空格
         */
        for(int i=1; i<=5; i++){
            for(int j=1; j<=5-i; j++){
                System.out.print("  ");
            }
            for(int j=1; j<=2*i-1; j++){
                System.out.print("* ");
            }
            System.out.println();
        }
        //下半部分：4行
        /*
        第1行：7个*，1个空格
        第2行：5个*，2个空格
        第3行：3个*，3个空格
        第4行：1个*，4个空格
         */
        for(int i=1; i<=4; i++){
            for(int j=1; j<=i; j++){
                System.out.print("  ");
            }
            for(int j=1; j<=9-2*i; j++){
                System.out.print("* ");
            }
            System.out.println();
        }

    }
}

```

<img src="https://img.xbin.cn//notes/20250910221422741.png" alt="image-20250630150647356" style="zoom:50%;" />

```java
public class ForForExercise3_2 {
    public static void main(String[] args) {
        int line = 9;
        int center = line/2;
        for(int i=0; i<line; i++){
            for(int j=0; j<line; j++){
                /*
                横向的步数： |j-center|
                纵向的步数： |i-center|
                 */
                if(Math.abs(j-center) + Math.abs(i-center)<=center){
                    System.out.print("* ");
                }else{
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}

```

## 2.7 跳转语句

### 2.7.1 语法格式和执行特点

|  | break | continue | return |
| --- | --- | --- | --- |
| 用在什么结构中 | 循环 或 switch-case | 循环 | 方法中即可 |
| 作用 | 中断或跳出当前的循环或 switch-case | 跳过本次循环剩下的语句，继续下一次循环 | 跳出/结束当前方法 |

```java
public class KeyWordTest {
    public static void main(String[] args) {
        for(int i=1; i<=5; i++){
            for(int j=1; j<=5; j++){
                System.out.print(j);
                if(i==j){
                    break;
                }
            }
            System.out.println();
        }
        /*
        1
        12
        123
        1234
        12345
         */
       /* for(int i=1; i<=5; i++){
            for(int j=1; j<=5; j++){
                if(i==j){
                    continue;
                }
                System.out.print(j);
            }
            System.out.println();
        }*/
        /*
        2345
        1345
        1245
        1235
        1234
         */

       /* for(int i=1; i<=5; i++){
            for(int j=1; j<=5; j++){
                System.out.print(j);
                if(i==j){
                    return;
                }

            }
            System.out.println();
        }*/

        System.out.println("在循环外面的语句");
    }



}

```

### 2.7.2 案例

#### 1、案例 1

```java
import java.util.Scanner;

public class KeyWordTest2 {
    public static void main(String[] args) {
        //请输入一个正整数，如果输入的不是正整数，就重新输入
        //例如：年份值
        Scanner input = new Scanner(System.in);

        while(true) {
            System.out.print("请输入正整数：");
            int num = input.nextInt();

            if (num <= 0) {
                System.out.println("请重新输入！");
            }else{
                System.out.println("正整数：" + num);
                break;
            }
        }

        input.close();
    }
}

```

#### 2、案例 2

```java
import java.util.Scanner;

public class KeyWordTest3 {
    public static void main(String[] args) {
        //请输入一个合格的日期
        //年份是正整数、月份[1,12]，日期：[1,31或30或28或29]
        Scanner input = new Scanner(System.in);

        int year;
        while(true) {
            System.out.print("请输入年份（必须正数）：");
            year = input.nextInt();

            if (year <= 0) {
                System.out.println("请重新输入！");
            }else{
                break;
            }
        }

        int month;
        while(true){
            System.out.print("请输入月份[1,12]：");
            month = input.nextInt();
            if (month <1 || month>12) {
                System.out.println("请重新输入！");
            }else{
                break;
            }
        }

        int totalDays = 0;
        if(month==2){
            totalDays = year%4==0 && year%100!=0 || year%400==0 ? 29 : 28;
        }else if(month==4 || month==6 || month==9 || month==11){
            totalDays = 30;
        }else{
            totalDays = 31;
        }

        int day;
        while(true){
            System.out.print("请输入日期[1,"+totalDays+"]：");
            day = input.nextInt();
            if (day <1 || day>totalDays) {
                System.out.println("请重新输入！");
            }else{
                break;
            }
        }

        System.out.println(year + "年" + month + "月" + day +"日");


        input.close();
    }
}

```

### 2.7.3 练习题

#### 练习题 1

```java
import java.util.Scanner;

public class LoopExercise1_2 {
    public static void main(String[] args) {
        /*
        1、练习题:从键盘输入1个正整数，判断它是不是素数
        素数：大于1的自然数中，只能被1和它本身整除的数
         */
        Scanner input = new Scanner(System.in);

        int num;
        while(true) {
            System.out.print("请输入正整数：");
            num = input.nextInt();

            if (num <= 0) {
                System.out.println("请重新输入！");
            }else{
                System.out.println("正整数：" + num);
                break;
            }
        }

        //判断num是不是素数
       /* for(int i=2; i<num; i++){
            if(num%i==0){
                System.out.println(num +"不是素数");
            }else{//错误，因为不能单独靠某个一个i的值来决定 num是素数
                System.out.println(num +"是素数");
                break;
            }
        }*/
        int i;
        boolean flag = true;//true代表num是素数
        for(i=2; i<num; i++){
            if(num%i==0){
               flag = false;
               break;//当找到一个num的因子，就可以证明num不是素数，就可以提前结束循环
            }
        }
        System.out.println(flag ?"是素数" :"不是素数");

        input.close();
    }
}

```

```java
import java.util.Scanner;

public class LoopExercise1 {
    public static void main(String[] args) {
        /*
        1、练习题:从键盘输入1个正整数，判断它是不是素数
        素数：大于1的自然数中，只能被1和它本身整除的数
         */
        Scanner input = new Scanner(System.in);

        int num;
        while(true) {
            System.out.print("请输入正整数：");
            num = input.nextInt();

            if (num <= 0) {
                System.out.println("请重新输入！");
            }else{
                System.out.println("正整数：" + num);
                break;
            }
        }

        //判断num是不是素数
       /* for(int i=2; i<num; i++){
            if(num%i==0){
                System.out.println(num +"不是素数");
            }else{//错误，因为不能单独靠某个一个i的值来决定 num是素数
                System.out.println(num +"是素数");
                break;
            }
        }*/
        int i;
        for(i=2; i<num; i++){
            if(num%i==0){
                System.out.println(num +"不是素数");
                break;
            }
        }
        /*
        如果num是素数，不会满足上面的if，当i<num不成立，结束 循环，i=num
        如果num不是素数，满足 if(num%i==0)  i<num，break  i!=num
         */
        if(i==num){//if(num不能被[2,num-1]的所有数整除){
            System.out.println(num + "是素数");
        }

        input.close();
    }
}

```

#### 练习题 2

```java
import java.util.Scanner;

public class LoopExercise2 {
    public static void main(String[] args) {
        /*
        猜数游戏，随机产生[1,100]之间的正数，
        让用户猜这个数，猜中了为止。
        例如：随机产生35
        当用户输入50，提示大了，数字在[1,50]之间
        当用户输入20，提示小了，数字在[20,50]之间
         */

        //随机产生[1,100]之间的正数
        /*
        Math.random() 得到[0,1)的小数
        Math.random()*100  得到[0,100)的小数
        Math.random()*100+1  得到[1,101)的小数
        (int)(Math.random()*100+1) 得到[1,101)的整数， [1,100]的整数
         */
        int num = (int)(Math.random()*100+1);
        Scanner input = new Scanner(System.in);

        int left = 1;
        int right = 100;
        while(true){
            System.out.println("范围：[" + left +"," + right +"]");
            System.out.print("请猜：");
            int guess = input.nextInt();

            if(num == guess){
                System.out.println("猜对了");
                break;
            }else if(guess > num){
                System.out.println("猜大了");
                right = guess;
            }else{//guess<num
                System.out.println("猜小了");
                left = guess;
            }
        }
    }
}

```

## 2.8 标签（拓展，了解）

Java 中允许给循环等结构取标签。

语法格式：

```java
标签名: 循环结构
标签名：if结构
```

- 说明：Java 中其实不推荐使用，这也是为什么 Java 中没有把 goto 用起来，因为它会让程序的流程变的比较混乱。

```java
public class LabelTest {
    public static void main(String[] args) {
       out: for(int i=1; i<=5; i++){
          in: for(int j=1; j<=5; j++){
                System.out.print(j);
                if(i==j){
                    break in;
                }
            }
            System.out.println();
        }
    }
}

```

```java
public class LabelTest2 {
    public static void main(String[] args) {
        boolean flag = true;
        out:
        if (flag) {
            for (int i = 1; i <= 5; i++) {
                System.out.println(i);
                if (i == 3) {
                    break out;
                }
            }
            System.out.println("atguigu");
        }
    }
}
```

# 三、IDEA

## 3.1 sca（键盘输入）

![image-20250630165917812](https://img.xbin.cn//notes/20250910221422742.png)

![image-20250630165954800](https://img.xbin.cn//notes/20250910221422743.png)

![image-20250630170011344](https://img.xbin.cn//notes/20250910221422744.png)

![image-20250630170305115](https://img.xbin.cn//notes/20250910221422745.png)

## 3.2 sop（输出不换行）

![image-20250630170421025](https://img.xbin.cn//notes/20250910221422746.png)
