# 一、复习

1、基本常识

Java 诞生于 SUN，现在属于 Oracle。最新的版本是 JDK24，最新的长期支持版本 21，我们使用的是 JDK17。

Java 之父詹姆斯.高斯林。

2、JDK，JRE，JVM

JDK：Java 开发工具包

JRE：Java 运行环境

JVM：Java 虚拟机

三者关系：JDK = JRE + 开发工具 ， JRE = JVM + 核心类库

3、环境变量

JAVA_HOME：JDK 的安装根目录

path：某些软件找命令的路径，Java 的 path 应该是 %JAVA_HOME%\bin

4、Java 的注释

```java
public class 类名{
    /**
    对方法的解释
    @param args String[] main方法的参数解释
    */
    public static void main(String[] args){
        //单行注释
        /*
        多行注释
        */
    }
}
```

5、关键字、保留字、特殊值

全局关键字：51 个

其中有 3 个保留字：const, goto, \_

特殊值有 3 个，不属于关键字：true, false, null

6、标识符

标识符是给变量、方法、类取名字单词和字符。

标识符的命名规则：

- 建议只使用 26 个英文字母、数字 0-9，下划线，美元符号
- 不能以数字开头
- 1 个标识符中间不能包含空格
- 不能直接使用关键字、保留字、特殊值
- 严格区分大小写

标识符的命名规范：

- 见名知意
- 类名等遵循大驼峰命名法，每一个单词首字母大写，形式：XxxYyyZzz
- 变量名等遵循小驼峰命名法，从第二个单词开始首字母大写，形式：xxYyyZzz
- 常量名，每一个单词字母都大写，单词直接可以使用\_分割，形式：XXX_YYY_ZZZ
- 包名，每一个单词都小写，单词直接使用.分割，形式：xxx.yyy.zzz

7、8 种基本数据类型

byte,short,int,long,float,double,char,boolean

8、字面量值

- long 类型：在数字后面加 L（大小写 L 都可以，一般写大写）
- float 类型：在数字后面加 F（大小写 F 都可以，一般写大写）
- char 类型：加单引号
- String 类型：加双引号

9、变量

```java
数据类型 变量名 = 初始值;
```

- 变量的值的类型必须小于等于变量声明的类型
- 变量必须先声明后使用
- 在用变量计算，输出变量的值之前变量必须初始化
- 变量有作用域

# 二、Java 基础语法

## 2.1 进制（了解，会用计算器即可）

生活中使用的是十进制，计算机世界中只有二进制。为了在程序中方便二进制、十进制的转换，或者二进制的表示引入的八进制和十六进制。

|                | 十进制   | 二进制        | 八进制       | 十六进制                      |
| -------------- | -------- | ------------- | ------------ | ----------------------------- |
| 数字组成       | 0-9      | 0-1           | 0-7          | 0-9，A-F（大小写都可以）      |
| 进位规则       | 逢十进一 | 逢二进一      | 逢八进一     | 逢十六进一                    |
| 借位规则       | 借一当十 | 借一当二      | 借一当八     | 借一当十六                    |
| 代码中怎么表示 | 正常表示 | 数字前面加 0B | 数字前面加 0 | 数字前面加 0X（大小写都可以） |
|                | 0        | 0             | 0            | 0                             |
|                | 1        | 1             | 1            | 1                             |
|                | 2        | 10            | 2            | 2                             |
|                | 3        | 11            | 3            | 3                             |
|                | 4        | 100           | 4            | 4                             |
|                | 5        | 101           | 5            | 5                             |
|                | 6        | 110           | 6            | 6                             |
|                | 7        | 111           | 7            | 7                             |
|                | 8        | 1000          | 10           | 8                             |
|                | 9        | 1001          | 11           | 9                             |
|                | 10       | 1010          | 12           | A                             |
|                | 11       | 1011          | 13           | B                             |
|                | 12       | 1100          | 14           | C                             |
|                | 13       | 1101          | 15           | D                             |
|                | 14       | 1110          | 16           | E                             |
|                | 15       | 1111          | 17           | F                             |
|                | 16       | 10000         | 20           | 10                            |

![image-20250627085643109](https://img.xbin.cn//notes/20250910221242025.png)

> 从十进制到二进制，有计算规则（了解）：除二倒取余

![image-20250627085812164](https://img.xbin.cn//notes/20250910221242026.png)

> 反过来，从二进制到十进制也有规则（了解）：权值相加法

![image-20250627090209711](https://img.xbin.cn//notes/20250910221242027.png)

```java
public class ScaleTest {//进制的演示

    public static void main(String[] args) {
        //1010111
        System.out.println("十进制：" + 1010111);//十进制：1010111
        System.out.println("二进制：" + 0B1010111);//二进制：87（87是十进制结果）
        System.out.println("八进制：" + 01010111);//八进制：266313
        System.out.println("十六进制：" + 0X1010111);//十六进制：16843025
        //结果显示是十进制结果

//        System.out.println("二进制："  + 0B25);//报错，0B代表二进制，那么0B后面只能出现0和1
        System.out.println("十六进值：" + 0x56AF);//十六进值：22191
    }
}

```

## 2.2 计算机中存储单位（记住）

最小单位：位（比特 bit），1 位只能表示 0 或 1.

最基本的单位：字节（byte），1 个字节等于 8 位。

1B = 8 位

1KB = 1024B

1MB = 1024KB

1GB = 1024MB

1TB = 1024GB

1PB = 1024TB

> 10 月 24 日是程序员节

> 拓展：
>
> - 带宽：100mb （这里的 b 是比特）
> - 硬盘等硬件的存储容量 1KB = 1000B （硬件行业的标准与软件行业的标准不同）

## 2.3 符号位、原码、反码、补码（理解）

```txt
以25为例，宽度以1个字节为例
十进制的25，表示成二进制  00011001

如果想要表示-25，怎么办？
	想法1： -00011001    不可取，因为任何数字、字符（包括图片、音频、视频）在计算机中都要用0或1表示，所以正负号也要用0或1表示。
	想法2：用0代表正数，1代表负数 ==> 符号位
		规定：最高位（最左边的位）是符号位
	    按照想法2，-25的二进制   10011001

25 + (-25) = 	 00011001 +  10011001 = 10110010（想要得到的是00000000） 结果不对

我们既要考虑正负号的表示，还要考虑计算问题，所以又要引入原码、反码、补码的概念。
```

![image-20250627092219885](https://img.xbin.cn//notes/20250910221242028.png)

```txt
规定：
	正数的原码、反码、补码，三码合一，不区分
	负数的原码、反码、补码，不同。
		以-25为例
		原码：最高位是1，其余位是它绝对值的二进制	 10011001
		反码：符号位不变，其余位取反（1变0,0变1）    11100110
		补码：在反码的基础上+1                     11100111

	计算机底层的存储和计算都用补码进行。

 25 + (-25) = 	   00011001 + 11100111 = 00000000
```

![image-20250627092702089](https://img.xbin.cn//notes/20250910221242029.png)

## 2.4 以 1 个字节为例整数的存储范围是多少（记结论即可）

```txt
1个字节 = 8位

补码

最小的正数：		00000001      => 十进制 1
最大的正数：      01111111      => 十进制 127

最小的负数：      10000001	  => 十进制-127
最大的负数：      11111111	  => 十进制-1

零：
正的0：		  00000000		=> 十进制 0
负的0：          10000000      => 十进制 -0 （？？？）因为0没必要区分正负号
								为了不浪费每一种表示方式，这里把10000000表示为 -128。它不符合原码反码补码的推导过程，只能单独记


人工算（用权值相加法：必须换回原码）
补码：1000 0001
反码：1000 0000（减1）
原码：1111 1111（符号位不变，其余取反）
	最高位的1代表负数，其余 1111111代表数据  127

补码：11111111
反码：11111110（减1）
原码：10000001（符号位不变，其余取反）
	最高位的1代表负数，其余 0000001代表数据 1

为什么10000000是-128？
因为必须满足计算规则，例如：
-127 - 1 = 10000001（补码） - 00000001（补码） = 10000000（补码） = -128（十进制）
```

> 结论：1 个字节的存储范围：[-128, 127]

## 2.5 4 种整数类型的存储范围（知道大小关系）

![image-20250627093722313](https://img.xbin.cn//notes/20250910221242030.png)

```java
import java.math.BigInteger;

public class IntegerNumberTest {
    public static void main(String[] args) {
        byte b1 = 100;
//        byte b2 = 200;//报错，超出byte范围

        short s1 = 100;
        short s2 = 200;
//        short s3 = 32769;//报错，超出short范围

        int i1 = 100;
        int i2 = 32769;
//        int i3 = 32769814521;//报错，超出int范围

        long l1 = 100;
        long l2 = 32769814521L;//超过int范围的字面量值必须加L
//        long l3 = 86321458632145634563214563L;//超过long的范围

        /*BigInteger a = new BigInteger("86321456321456314563245201453");
        BigInteger b = new BigInteger("862145863214586386214563214521452421452012");
        System.out.println(a.add(b));*/
    }
}

```

## 2.6 小数如何存储（记结论即可）

小数的存储与整数的存储有相同点：

- 有符号位

小数的存储与整数的存储的不同点：

- 没有原码、反码、补码
- 分为 1 位符号位 + 8 位指数位 + 23 位尾数位

```txt
以+8.2为例，以float类型为例   float是4个字节，共32位
首先：正数，符号位是0
	0xxxxxxx xxxxxxxx xxxxxxxx xxxxxxxx
其次：
	（1）整数部分：  1000
	（2）小数部分：  0.0011 0011 0011 ....
	  合起来： 1000.0011 0011 0011 ....

第三步：把上面的二进制，转为 科学计数法
	1000.0011 0011 0011 ....  科学计数法   1.0000011 0011 0011 .... * 2的3次

以十进制为例复习一下  科学计数法
	8293.6585222 科学计数法  8.2936585222 * 10的3次
	0.000856     科学计数法  8.56*10的-4次

思考：二进制的数字用科学计数法表示完之后，整数部分一定是1 => 不需要存储1.   （这样可以避免表示小数点）

第四步：表示小数点后的尾数，和2的指数
	float类型规定 8位用来表示指数，剩下的23位用来表示尾数
	结构：
		1位符号位 +  8位指数位 + 23位尾数位

第五步：指数部分仍然有正和负，为了避免处理正负号，采用偏移量的方式
	会把指数 +128得到最终的存储指数

	加完之后 <=127说明原来是负指数，>127原来是正指数

```

> 结论：
>
> （1）无论是 float 还是 double 都是不精确的，只能得到近似值
>
> float 大约能表示的精度范围是 十进制科学计数法小数点后 7-8 位
>
> double 大约能表示的精度范围是 十进制科学计数法小数点后 15-16 位
>
> （2）double 类型是 8 个字节，float 类是 4 个字节
>
> 所以无论是从存储范围还是精度范围来说，double > float
>
> （3）long 类型是 8 个字节，float 类型是 4 个字节，但是存储范围来说 float > long（因为底层的存储方式不同）
>
> （4）如果项目中对计算的精度要求比较高，就不用 float 和 double，采用后面要学习的 BigDecimal

![image-20250627134514807](https://img.xbin.cn//notes/20250910221242031.png)

## 2.7 boolean 类型如何存储（理解）

本质上用 1 位就够了，0 代表 false,1 代表 true。

在别的编程语言中，任何非 0 的都是识别为 rue，但是 Java 中，boolean 类型只能赋值 true 和 false，不与其他类型进行混合计算。

为了内存的管理更方便，1 个 boolean 类型的值也会分配 1 个字节。

## 2.8 char 类型如何存储（知道编码值概念）

计算机中所有字符（包括汉字、字母、标点符号、数字等）、图片、音频、视频等全部都要用二进制表示。

最早有一个 ASCII 码表，把每一个字符都用 1 个整数来表示，最早只能表示 128 个字符。

- 'A'：65，'B'：66....
- 'a'：97，'b'：98...
- '0'：48，'1'：49....

后来，计算机传到了欧洲的一些国家，每个国家对 ASCII 码表都有自己的扩展，各不相同，后面欧洲 xx 协会统一了标准 ISO8859-1，Latin1 等，可以表示 1 个字节范围内，0-255。

在后来，计算机传到亚洲，例如：中国，就指定了新的编码表，GB2312，后面扩展为 GBK。每一个国家的字符集都不兼容。

为了兼容所有国家的文字，发明了万国码，即 Unicode 字符集，它可以表示世界上所有的文字。

> 问：Unicode 字符集被称为万国码，涵盖全球所有文字、符号和表情，实现跨语言、跨平台的统一编码，Unicode 的编码值范围是多少？
>
> 答：总范围是`U+0000` 到 `U+10FFFF`（十六进制），共 **1,114,112** 个码位

> 问：Java 中 1 个 char 占 2 个字节，那 1 个 char 可以表示哪些字符？
>
> 答：在 Java 中，`char` 类型用于表示 **Unicode 字符**，但其范围受限于 **UTF-16 编码** 的特性，**其表示范围**：`0` 到 `65,535`（无符号整数）。即 Java 中的**`char` 不能表示所有 Unicode 字符**，单个 `char` 只能覆盖 BMP 字符（`U+0000`–`U+FFFF`），更高码位的字符需要 `String` 或 `int` 存储。
>
> **Unicode 字符集划分区域**：
>
> - **基本多文种平面（BMP, Plane 0）**：`U+0000` 到 `U+FFFF`（共 65,536 个码位）。
> - **补充平面（Plane 1-16）**：`U+10000` 到 `U+10FFFF`（共 16 × 65,536 = 1,048,576 个码位）

```java
public class CharTest {
    public static void main(String[] args) {
        char c1 = '尚';
        char c2 = 'a';
        String emoji = "🚀";

        System.out.println("c1 = " + c1);
        System.out.println("c2 = " + c2);
        System.out.println("emoji = " + emoji);

        char c3 = 97; //可以用十进制的编码值，来表示一个char字符
        System.out.println("c3 = " + c3);

        char c4 = '\u5C1A';//可以用十六进制编码值，来表示一个char
        System.out.println("c4 = " + c4);
    }
}

```

## 2.9 基本数据类型的转换（会应用）

### 2.9.1 自动类型提升

（1）当把一个存储范围小的类型的值（字面量值、变量、表达式）赋值给一个类型存储范围更大的变量

（2）当多种数据类型混合运算时，结果按照他们中最大的

（3）特殊：byte，short，char 它们之间的计算，都会升级为 int

```java
public class DataTypeChange {
    public static void main(String[] args) {
        int num = 'a';
        //左边num变量是int类型
        //右边'a'是字面值是char类型
        //char  < int
        System.out.println("num = " + num);

        double d = 5;
        //左边d变量是double类型
        //右边5是字面量值是int类型
        //double > int
        System.out.println("d = " + d);

        System.out.println('a' + 5 + 5.6F + 9.6);//最终类型是double
        //                  97 + 5 + 5.6 + 9.6
        //117.19999847412109（有误差）

        byte b1 = 1;
        byte b2 = 2;
        //byte b3 = b1 + b2;//报错，因为 b1 + b2升级为int
        //int > byte

        short s1 = 1;
        short s2 = 2;
        //short s3 = s1 + s2;//报错，因为 s1 + s2升级为int

        char c1 = '0';
        char c2 = '1';
//        char c3 = c1 + c2;//报错，因为c1+c2升级为int


    }
}

```

### 2.9.2 强制类型转换

- 当把一个存储范围大的类型的值（字面量值、变量、表达式）赋值给一个类型存储范围小的变量，就需要强制类型转换，此时可能有风险，可能会溢出截断或损失精度
- 特殊：有时候，会故意提升某个值的类型，也用强制类型转换，但是此时没有风险

```java
public class DataTypeChange2 {
    public static void main(String[] args) {
        double d = 8.5;
        int a = (int) d;//把double的值强制转换为int
        //左边是int，右边是double, doouble > int'
        System.out.println("d = " + d);//d = 8.5
        System.out.println("a = " + a);//a = 8

        byte b1 = 1;
        byte b2 = 127;
        byte b3 = (byte) (b1 + b2);//把int结果强制转换为byte
        System.out.println("b1 = " + b1);
        System.out.println("b2 = " + b2);
        System.out.println("b3 = " + b3);
        //b3 = -128
        /*
        1的二进制：  00000001
        127的二进制：01111111
        结果：      10000000 （结果转为byte，只有1个字节，只截取低8位）
                   10000000都是补码，它所以特殊的补码

                   如果想要看结果，用计算器看非常简单，直接把二进制“补码”粘贴到计算器中，就可以得到结果
         */

        System.out.println("========================");
        int x = 1;
        int y = 2;
        System.out.println(x / y); //0   因为 int/int 结果也是int类型
        System.out.println((double)x/y);//这里表示把x强制提升为double，然后 double/int，结果是double
        System.out.println((double)(x/y));//0.0
        //(1)先计算(x/y) 得到0(2)把0强制提升为double
    }
}

```

![image-20250627113842726](https://img.xbin.cn//notes/20250910221242032.png)

## 2.10 答疑

```java
public class DataTypeExercise {
    public static void main(String[] args) {
//        char c1 = '0';
//        char c2 = '1';
//        char c3 = c1 + c2;//报错，因为c1+c2升级为int，int>char

        char c1 = '0';
        char c2 = '1';
        System.out.println(c1 + c2);//这里c1+c2也升级为int
        //但是println函数可以接收各种类型的参数，输出97，不是'a'
        System.out.println((char)(c1+c2));
    }

}

```

```java
public class DataTyleAsk {
    public static void main(String[] args) {
        byte b = 5;
        //这句话有几个类型？？
        //如果=右边是字面量值，当整数值在byte,short,char的编码值范围内的话，编译可以通过

        int a = 5;
//        byte b2 = a;//报错，因为a变量明确说是int类型， int>byte

        short s = 5;
        char c = 97;
//        char c2 = 65536;//错误，因为 65536超出char的编码值范围，它只能表示[0, 65535]之间
    }
}

```

## 2.11 算术运算符（重要）

算术运算符：

```txt
加：+
	（1）求和：只要+两边没有字符串，就是求和
	（2）拼接：如果+的左右两边有任意一边是字符串，那么+就是拼接，拼接的结果也是字符串
减：-
乘：*
除：/
	注意： 整数 / 整数 结果 也是整数
		  整数 / 0 会报错
		  小数 / 0 得到 Infinity
模（取余）：%
	注意：
		余数的正负号与被除数一样的
		整数 % 0 会报错
		小数 % 0 得到 NaN  ：not a number
自增：++，自增变量本身自增1
	a++（对）， 5++（错误）
自减：--，自减变量本身自减1

	以自增为例：
	（1）如果自增表达式是独立的一个语句，那么a++与++a效果一样。
	（2）如果自增表达式与其他计算或操作合在一个语句中，那么
	a++：先取a变量的值，放一边，然后a再自增1，此时会用之前取出来的值参与其他运算
	++a：先对a自增1，然后取a的值，放一边，用新取出来的值参与其他运算
```

```java
public class ArithmeticOperatorTest1 {// Arithmetic算术，Operator运算符，操作符

    public static void main(String[] args) {
        System.out.println('a' + 'b');//求和 97+98=195
        System.out.println('a' + "b");//拼接 ab
        System.out.println(1 + 2);//求和
        System.out.println("1" + 2);//拼接 "12"，在控制台打印只能看12

        System.out.println("================");
        System.out.println(5 / 2);//2
        //System.out.println(5 / 0);//发生java.lang.ArithmeticException算术异常
        System.out.println(5.0 / 0);//Infinity 无穷
        System.out.println(5 / 3);

        System.out.println("================");
        System.out.println(7 / 2);//求商  3
        System.out.println(7 % 2);//求余数 1
        //数学  7 ÷ 2 = 3...1

        System.out.println(7 % -2);//求余数 1
        //数学 7 ÷ -2 = -3 ...1
        //被除数 = 除数 * 商 + 余数
        System.out.println(-7 % 2);//求余数 -1
        //数学 -7 ÷ 2 = -3 ...-1
        System.out.println(-7 % -2);//求余数 -1
        //数学 -7 ÷ -2 = 3 ...-1
        //结论：余数的正负号与被除数一样

        System.out.println(7.0 % 0);//NaN
       // System.out.println(7 % 0);//java.lang.ArithmeticException

        System.out.println("=================");
        //System.out.println(5++);//错误，5不是变量
        int a = 1;
        System.out.println("a = " + a);//a=1
        a++;
        System.out.println("a = " + a);//a=2
        ++a;
        System.out.println("a = " + a);//a=3

        System.out.println("=================");
        int i = 1;
        System.out.println(i++);//1
        //先取i的值1，放一边，然后i自增1，i变为2，再用取出来的值输出
        System.out.println(i);
        System.out.println("====================");
        int j = 1;
        System.out.println(++j);
        //先对j自增1，然后取j的值2，输出的是2
        System.out.println(j);//2

        System.out.println("======================");
        int k = 1;
        int m = k++;//因为先取k的值1，放一边，然后k自增2，用之前取出来的1赋值给m
        System.out.println("k = " + k);//k=2
        System.out.println("m = " + m);//m=1
        System.out.println("====================");
        int n = 1;
        int p = ++n;//先对n自增1，n=2，取2赋值给p
        System.out.println("n = " + n);//n=2
        System.out.println("p = " + p);//p=2

        System.out.println("====================");
        int q = 1;
        q = q++;//先取q的值1，放一边，q自增为2，然后用之前取出来的1赋值给q
        System.out.println("q = " + q);//q=1
        q = ++q;//先对q自增1，q=2,取2的值赋值给q
        System.out.println("q = " + q);//q=2

        System.out.println("======================");
        int x = 1;
        int y = 2;
        int z = x++ + ++x * y--;
        // (1)处理x++     先取x的值1放一边，然后x自增1,x=2
        //    因为+的优先级没有*高，所以先算后面的乘法
//        （2）++x       先对x自增1，x=3，取x的值3放一边
//        （3）y--        先取y的值2，放一边，然后y自减1，y=1
//        （4）算乘法  3 * 2 = 6
//        （5）算加法   1 + 6 = 7
        System.out.println("x = " + x);//x=3
        System.out.println("y = " + y);//y=1
        System.out.println("z = " + z);//z=7
    }

}

```

> 拓展：如何查看指令
>
> javap -c 字节码文件名.class

![image-20250627144747539](https://img.xbin.cn//notes/20250910221242033.png)

![image-20250627144923768](https://img.xbin.cn//notes/20250910221242034.png)

![image-20250627145030805](https://img.xbin.cn//notes/20250910221242035.png)

## 2.12 赋值运算符（重要）

基本的赋值运算符：

```txt
=
	注意：
		=的左边一定是一个变量，不能是字面量，表达式等，即 变量 = 值；
		=的优先级比较低，最后算赋值
```

复合的赋值运算符：

```txt
+=
-=
*=
/=
%=
	注意：	+=，-=等的左边也必须是一个变量
		  以+=为例
		  	a += a + b;  等价于  a = (强制类型转换)(a + (a+b));
		  即结果可能发生溢出截断或损失精度

以下的是和位运算符结合的，等学完位运算符再说。
>>=
<<=
>>>=
&=
|=
^=
```

```java
public class AssignOperatorTest1 {
    public static void main(String[] args) {
        int a;
        a = 1;
//        1 = a;//错误 =左边必须是一个变量

        System.out.println("================");
        int i = 1;
        int j = 2;
        i += j; //等价于  i = i + j
        System.out.println("i = " + i);//i=3
        System.out.println("j = " + j);//j=2

        System.out.println("===================");
        int k = 3;
        int n = 6;
        k *= k + n;//等价于  k = k * (k+n)  k = 3 * (3+6) = 27
        System.out.println("k = " + k);

        System.out.println("=====================");
        byte b1 = 1;
        byte b2 = 127;
//        b1 = b1 + b2;//报错 ，b1+b2升级为int
        b1 += b2;//等价于  b1 = (byte)(b1 + b2)
        System.out.println("b1 = " + b1);//-128
    }
}

```

> 经典算法题：交换 2 个变量的值

```java
public class AssignOperatorTest2 {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;

        //交换a,b变量的值
        //最基本的操作：借助第3个变量
        int temp = a;//把a变量的值复制一份给temp
        a = b; //把b变量的值赋值给a
        b = temp;
        System.out.println("a = " + a);//a=2
        System.out.println("b = " + b);//b=1

        System.out.println("========================");
        //（了解）有缺陷，i+j可能发生溢出
        int i = 1;
        int j = 2;

        i = i + j;//i新的值 = i旧的值 + j旧的值
        j = i - j;//j新的值 = i新的值 - j旧的值 = i旧的值 + j旧的值 - j旧的值 = i旧的值
        i = i - j;//i再次新的值 = i新的值  - j新的值 = i旧的值 + j旧的值 - i旧的值 = j旧的值
        System.out.println("i = " + i);
        System.out.println("j = " + j);

    }
}

```

## 2.13 关系/比较运算符（重要）

```txt
大于：>
小于：<
大于等于：>=
小于等于：<=
等于：==
不等于：!=
```

以上运算符通常用于条件判断，结果只有 true 或 false。

```java
public class RelationOperatorTest {//Relation关系
    public static void main(String[] args) {
        int a = 4;
        int b = 5;

        System.out.println(a > b);//false
        System.out.println(a < b); //true  成立的，正确的
        System.out.println(a >= b);//false
        System.out.println(a <= b);//true  成立的，正确的
        System.out.println(a == b);//false
        System.out.println(a != b);//true  成立的，正确的

        System.out.println(a = b);//赋值 （1）把b的值赋值给a（2）取a的值输出
        System.out.println("a = " + a);//a=5
        System.out.println("b = " + b);

        System.out.println("=====================");
        boolean flag = true;
        if(flag){//条件为true，就表示成立，输出hello
            System.out.println("hello1");
        }
        System.out.println("===============");
        if(flag=false){//（1）先把false赋值给flag（2）再取flag的值作为条件  等价于 if(false)
            System.out.println("hello2");
        }
        if(flag == false){//（1）取flag的false（2） false == false 成立
            System.out.println("hello3");
        }
    }
}

```

## 2.14 逻辑运算符（重要）

```txt
与：&
	表示两个条件要同时成立
	true & true 结果才为true
	true & false 结果是false
	false & true 结果是false
	false & false 结果是false
或：|
	表示两个条件有1个成立即可
	true | true 结果是true
	true | false 结果是true
	false | true 结果是true
	false | false 结果是false
异或：^
	表示两个条件要不同，一个成立一个不成立，结果才为true
	true ^ true 结果是false
	true ^ false 结果是true
	false ^ true 结果是true
	false ^ false 结果是false
逻辑非： !
	对条件取反
	!true 结果是false
	!false 结果是true
短路与：&&
	表示两个条件要同时成立
	true && true 结果才为true
	true && false 结果是false
	false && ？ 结果是false
	当左边是false时，右边不看，结果直接是false
短路或：||
	表示两个条件有1个成立即可
	true || ？ 结果是true
	false || true 结果是true
	false || false 结果是false
	当左边是true是，右边不看，结果直接是true
```

```java
public class LogicOperatorTest {
    public static void main(String[] args) {
        int age = 45;
        //判断年龄是不是在[18,35]之间
        // age >= 18  &  age <= 35
        // age >= 18  &&  age <= 35
        //数学中： 18<=age<=35
//        System.out.println(18 <= age <= 35);//错误
        //      先算 18 <= age 结果是true
        //     在算  true <= 35 没法算， boolean不能与数字比大小
        System.out.println(age >= 18  &  age <= 35);

        System.out.println("======================");
        int a = 1;
        int b = 2;
        System.out.println(a++ == 1 && b++ == 2);//true
        /*
        a++ == 1  先取a的值1，然后a自增为2， 1==1 成立
            不满足短路条件，右边继续看
         b++ == 2 先取b的值2， 然后b自增为3， 2==2 成立
            true && true
         */
        System.out.println("a = " + a);//a=2
        System.out.println("b = " + b);//b=3

        System.out.println(a++ == 1 && b++ == 2);//false
        /*
        a++ == 1  先取a的值2，然后a自增为3， 2==1 不成立
            发生短路现象，右边不看，结果直接false
         */
        System.out.println("a = " + a);//a=3
        System.out.println("b = " + b);//b=3
    }
}

```

## 2.15 条件运算符（重要）

Java 中条件运算符只有 1 个，同时也是唯一的三元运算符。

```txt
条件表达式 ? 结果值1 : 结果值2

当条件表达式的结果是true，整个表达式取 结果值1，否则取结果值2，即二选一的计算
```

> 拓展：
>
> 运算符有一个分类方式，按照运算符的操作数的个数来划分：
>
> - 一元运算符，它只需要 1 个操作数，例如： a++， !flag 等
> - 二元运算符，它需要 2 个操作数，例如：a+b， a>b 等
> - 三元运算符，它需要 3 个操作数，例如：条件表达式 ? 结果值 1 : 结果值 2

```java
public class ConditionOperatorTest {
    public static void main(String[] args) {
        boolean marry = false;
        System.out.println(marry ? "已婚" : "未婚");

        System.out.println("=====================");
        //判断num是偶数还是奇数
        int num = 5;
        System.out.println(num % 2 == 0 ? "偶数" : "奇数");

        System.out.println("================");
        int x = 6;
        int y = 6;
        System.out.println("x = " + x + ", y = " + y + "中大的数是：" + (x > y ? x : y));

        System.out.println("================");
        int m = 5;
        int n = 7;
        int p = 3;
        //输出最大值
        System.out.println((m > n ? m : n) > p ? (m > n ? m : n) : p);//可读性差
        int max = m > n ? m : n; //max存的是m和n中较大者
        max = max > p ? max : p;
        System.out.println("max = " + max);

        System.out.println("============================");
        int a = 1;
        char c = 'a';
        System.out.println(true ? a : c);//1  a变量和c变量类型不同，统一为int
        System.out.println(true ? 'a' : 86);//a  'a'和85字面量值， 86在char的编码值范围内，会按照char处理
        System.out.println(true ? 'a' : 65536);//97 'a'和65536字面量值，65536超出char编码值范围，会按int类型处理
        //条件运算符的2个结果必须统一类型
    }
}

```

## 2.16 位运算符（难，使用频率比较低，了解）

```txt
左移： <<
	左移几位，相当于乘以2的几次方
右移： >>
	右移几位，相当于除以2的几次方，如果除不尽会向下取整
无符号右移： >>>
	对于正数来说，无符号右移与普通右移是一样的。
	对于负数来说，没有快速计算口诀，负数无符号右移完是正数
按位与：&
	1 & 1 是1
	1 & 0 是0
	0 & 1 是0
	0 & 0 是0
按位或：|
	1 | 1 是1
	1 | 0 是1
	0 | 1 是1
	0 | 0 是0
按位异或：^
	1 ^ 1 是0
	1 ^ 0 是1
	0 ^ 1 是1
	0 ^ 0 是0
按位取反：~
	原来是0变为1,1变为0，此时包括符号位
所有的位运算符都是基于 补码 计算的。
```

```java
public class BitOperatorTest {
    public static void main(String[] args) {
        System.out.println(5 << 2);//20
        /*
        实际运算符规则：
            5的二进制补码： 00000000 00000000 00000000 00000101
            5<<2         00000000 00000000 00000000 00010100 （左移2位，右边补2个0）
                      把00000000 00000000 00000000 00010100 粘到计算器中就可以看到结果

         快速口诀：左移几位，相当于乘以2的几次方
             5<<2 =  5 * 2的2次 = 5 * 4 = 20
         */

        System.out.println(-5 << 2);
        /*
        快速口诀：左移几位，相当于乘以2的几次方
            -5<<2 =  -5 * 2的2次 = -5 * 4 = -20
         实际运算符规则：
            -5的二进制：11111111 11111111 11111111 11111011（补码）
            -5<<2     11111111 11111111 11111111 11101100
                计算器算： 11111111 11111111 11111111 11101100粘到计算器中
                人工算：换回原码
                        11111111 11111111 11111111 11101100 补码
                        11111111 11111111 11111111 11101011 反码
                        10000000 00000000 00000000 00010100 原码
                        -                             16+4=20
            复习：
                -5的原码 10000000 00000000 00000000 00000101
                -5的反码：11111111 11111111 11111111 11111010
                -5的补码：11111111 11111111 11111111 11111011
         */

        System.out.println("=================================");
        System.out.println(40 >> 2);
        /*
        快速口诀：   右移几位，相当于除以2的几次方
            40 >> 2 = 40 / 2的2次 = 40 / 4 = 10

         实际运算：
            40的补码：00000000  00000000 00000000 00101000
            40>>2   00000000 00000000 00000000 00001010 （原来最高位是0，左边继续补0）
                   用计算器：直接把 00000000 00000000 00000000 00001010
                   人工算：                                      8 +2 = 10
         */

        System.out.println(-40 >> 4);
        /*
        快速口诀：   右移几位，相当于除以2的几次方
            -40 >> 4 = -40 / 2的4次 = -40 / 16 = -3 （向下取整）
        实际运算：
            -40的补码：11111111111111111111111111011000
            -40>>4：  11111111111111111111111111111101（原来最高位是1，左边继续补1）
                用计算器：11111111111111111111111111111101 粘到计算器中
                人工算：
                        11111111111111111111111111111101 补码
                        11111111111111111111111111111100 反码
                        10000000000000000000000000000011 原码
                        -                             2+1=-3

         */

        System.out.println("========================================");
        System.out.println(40 >>> 2);//10  等价于 40>>2
        System.out.println(-40 >>> 4);//268435453
        /*
        实际运算：
            -40的补码：11111111111111111111111111011000
            -40>>>4： 00001111111111111111111111111101
                最高位是0，是正数，此时补码就是原码

         */

        System.out.println("========================================");

        System.out.println( 5 & 3);//1
        /*
        5的二进制补码：00000000 00000000 00000000 00000101
        3的二进制补码：00000000 00000000 00000000 00000011
        &---------------------------------------------------
                    00000000 00000000 00000000 00000001
         */

        System.out.println("========================================");

        System.out.println( 5 | 3);//7
        /*
        5的二进制补码：00000000 00000000 00000000 00000101
        3的二进制补码：00000000 00000000 00000000 00000011
        |---------------------------------------------------
                    00000000 00000000 00000000 00000111
         */

        System.out.println("========================================");

        System.out.println( 5 ^ 3);//6
        /*
        5的二进制补码：00000000 00000000 00000000 00000101
        3的二进制补码：00000000 00000000 00000000 00000011
        ^---------------------------------------------------
                    00000000 00000000 00000000 00000110
         */

        System.out.println("========================================");
        System.out.println(~5);//-6
        /*
        5的二进制补码：00000000 00000000 00000000 00000101
        ~5：         11111111 11111111 11111111 11111010
                得到的是 补码 11111111 11111111 11111111 11111010
                用计算器，直接粘贴 11111111 11111111 11111111 11111010
                人工算：
                    11111111 11111111 11111111 11111010 补码
                    11111111 11111111 11111111 11111001 反码
                    10000000 00000000 00000000 00000110 原码 -6
         */
    }
}

```

## 2.17 运算符优先级

| 优先级 | 符号 | 优先级 | 符号 |
| --- | --- | --- | --- |
| 1 | ( ) | 9 | == != |
| 2 | .（成员访问操作符，请看第 5 章面向对象上） <br />[ ]（数组元素访问符，请看第 4 章数组） | 10 | & |
| 3 | +（正） -（负） | 11 | ^ |
| 4 | ++ -- ~ ! | 12 | \| |
| 5 | \* / % | 13 | && |
| 6 | +（加：求和、拼接） -（减） | 14 | \|\| |
| 7 | << >> >>> | 15 | ? : |
| 8 | < > <= >= instanceof（请看第 6 章面向对象中） | 16 | = += -= \*= /= %= <<= >>= >>>= &= ^= \|= |

口诀：

小括号( )优先算；成员老二正负三；单目运算排第四；

乘除余五加减六；移位七，关系八；等和不等排第九；

位与、异或和位或；短路与和短路或；依次从十到十四；

条件排在第十五；赋值一定是最后；不把握就加小括号( )。

> 建议：不要求背下来
>
> （1）当你不确定谁优先级高低的时候，A：查表 B：加()
>
> （2）尽量不要写太复杂的表达式，可以分步骤写

# 三、IDEA

取消双击 shift 或 ctrl 弹出搜索框

![image-20250627164442311](https://img.xbin.cn//notes/20250910221242036.png)
