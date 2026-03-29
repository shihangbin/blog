# 一、Java 的概述

## 1.1 计算机组成（了解）

> 要求：
>
> CPU：i5 以上
>
> 内存：建议 16G 以上
>
> 建议（不强制）：有独立显卡，便于本地部署大模型

![image-20250626091337385](https://img.xbin.cn//notes/20250910221118859.png)

## 1.2 DOS 命令（了解）

> 主要掌握：
>
> - 切换盘：例如：从 C 盘切换到 D 盘
> - 进入到某个目录（文件夹）
> - 其他命令能看懂即可

![image-20250626091537867](https://img.xbin.cn//notes/20250910221118860.png)

## 1.3 Java 语言概述（记住）

- Java 诞生于 SUN 公司（Stanford University Network，斯坦福大学网络公司）。
- Java 现在属于 Oracle（甲骨文）
- Java 之父 l 詹姆斯.高斯林（James Gosling）
- Java 最新版本是 24（会变）
- 目前学习和使用的 Java17
  - 企业中按比例：Java17 > Java11 > Java8 > ....

- Java 分为 3 个方向：JavaSE、JavaEE（咱们学的是这个）、JavaME

## 1.4 下载（了解）

官网网址：www.oracle.com，JDK下载地址：https://www.oracle.com/java/technologies/downloads/#jdk17-windows/

- 找到安装包，例如：安装环境是 Windows 系统基于 x64 处理器

![image-20230415182643364](https://img.xbin.cn//notes/20250910221118861.png)

- 选择同意协议

![image-20211019111252989](https://img.xbin.cn//notes/20250910221118862.png)

- 注册或登录后下载

![image-20211019111922387](https://img.xbin.cn//notes/20250910221118863.png)

## 1.5 Java 开发环境搭建（掌握）

### 1.5.1 需要安装什么

> JDK、JRE、JVM 的关系
>
> - JDK 包含 JRE + 开发工具（例如：javac.exe，jar.exe 等）
> - JRE 包含 JVM + 核心类库

结论：咱们作为开发人员，需要安装的是 JDK.

### 1.5.2 如何安装

- 避免中文目录
- 每一个软件要有独立的文件夹
- 建议所有开发类的软件，统一安装在一起，便于管理

![image-20250626102610048](https://img.xbin.cn//notes/20250910221118864.png)

- 安装步骤：
  - 双击`jdk-17_windows-x64_bin.exe`文件，并单击`下一步`，如图所示：

    ![image-20230415182837540](https://img.xbin.cn//notes/20250910221118865.png)

- 修改安装路径，单击更改，如图所示：

![image-20230415182929529](https://img.xbin.cn//notes/20250910221118866.png)

- 将安装路径修改为`D:\ProgramFiles\Java\jdk-17`，并单击确定，如图所示：

![image-20230415183005724](https://img.xbin.cn//notes/20250910221118867.png)

![image-20230415183025001](https://img.xbin.cn//notes/20250910221118868.png)

- 稍后几秒，安装完成，如图所示：

  ![image-20230415183147910](https://img.xbin.cn//notes/20250910221118869.png)

- 目录结构，如图所示：

![image-20230415183225113](https://img.xbin.cn//notes/20250910221118870.png)

### 1.5.3 卸载

控制面板 -> 程序 -> 卸载程序 -> JDK 对应版本

![image-20250626102751214](https://img.xbin.cn//notes/20250910221118871.png)

### 1.5.4 验证安装的结果

```txt
java空格-version
```

```txt
javac空格-version
```

![image-20250626103154977](https://img.xbin.cn//notes/20250910221118872.png)

### 1.5.5 配置环境变量

当我们运行 java 命令时，出现如下错误提示：

![image-20250626103329770](https://img.xbin.cn//notes/20250910221118873.png)

> 什么是环境变量？
>
> 环境：软件运行的环境，这里是指操作系统环境。
>
> 变量：用一个单词（专业的称为标识符）等于一个值。例如：age=18

这里需要配置 2 个环境变量？

- JAVA_HOME，这个变量的值是等于 JDK 的安装`根`目录，例如：JAVA_HOME=D:\ProgramFiles\JDK\jdk-17
- path，这个变量的值有很多，它里面存的值都是各种软件的路径，例如 JDK 的开发工具软件的路径，当我们需要在命令行中运行 java 命令时，需要找到 java.exe，它在 D:\ProgramFiles\JDK\jdk-17\bin 下面。当我们把 D:\ProgramFiles\JDK\jdk-17\bin 配置到 path 中之后，就可以在任意目录下运行 java 等命令了

> 新建环境变量 JAVA_HOME

![image-20250626103857328](https://img.xbin.cn//notes/20250910221118874.png)

![image-20250626103921438](https://img.xbin.cn//notes/20250910221118875.png)

![image-20250626103945841](https://img.xbin.cn//notes/20250910221118876.png)

![image-20250626104011066](https://img.xbin.cn//notes/20250910221118877.png)

![image-20250626104054063](https://img.xbin.cn//notes/20250910221118878.png)

> 配置 path 环境变量（修改即可，不需要新建）

1、删除 C:\Program Files\Common Files\Oracle\Java\javapath

![image-20250626104250079](https://img.xbin.cn//notes/20250910221118879.png)

![image-20250626104359300](https://img.xbin.cn//notes/20250910221118880.png)

2、加上%JAVA_HOME%\bin

![image-20250626104612214](https://img.xbin.cn//notes/20250910221118881.png)

## 1.6 第一个 Java 程序（会写）

开发步骤：

第一步：创建源代码文件（简称源文件），必须以.java 结尾

第二步：编写代码，有固定结构

```java
类{
    方法{
        语句;
    }
}
```

因为 Java 是面向对象的编程语言（关于什么是面向对象，下一周再说），这种编程思想的语言都是以类为最基本的结构。

```java
public class HelloJava{

}
```

第三步：编译

编译的目的是把 xx.java 文件中的代码编译为 JVM（Java 虚拟机）能认识的字节码，字节码文件的特点是 xx.class。

编译的工具：javac.exe 程序

```command
javac 源文件名.java
```

![image-20250626111417460](https://img.xbin.cn//notes/20250910221118882.png)

![image-20250626111538632](https://img.xbin.cn//notes/20250910221118883.png)

第四步：运行

```command
java 主类名
```

> 什么是主类？
>
> 包含 main 方法的类，被称为主类。
>
> 如果类不包含 main 方法，是不能作为 Java 程序的入口的。

![image-20250626111711859](https://img.xbin.cn//notes/20250910221118884.png)

```java
public class HelloJava{
    public static void main(String[] args){
        System.out.println("hello");
        System.out.println("java");
    }
}
```

> 开发工具：
>
> - 记事本（很 low）
> - 增强版记事本（一般 low）：例如：notapad++等文本编辑器
> - 集成开发工具（IDE）：例如：eclipse、IDEA（我们选它）、vscode 等

## 1.7 常见问题（能解决问题）

1、笔记图片问题

![image-20250626113818975](https://img.xbin.cn//notes/20250910221118885.png)

2、中文问题

> 源代码文件，即 xx.java 文件的编码，如果用记事本写的话，建议用 GBK。因为 cmd 命令行默认的编码方式是 GBK。

![image-20250626114532012](https://img.xbin.cn//notes/20250910221118886.png)

![image-20250626114559257](https://img.xbin.cn//notes/20250910221118887.png)

3、类名与源文件名一致问题

![image-20250626114759069](https://img.xbin.cn//notes/20250910221118888.png)

> 当 class 前面不是 public 的时候，类名可以与源文件名不一致，但是不推荐这么干，会增加维护的困难程度。
>
> 建议：无论 class 前面是不是 public，类名与源文件名都一致，包括大小写。

# 二、IDEA

## 2.1 安装（掌握）

第一步：双击![image-20241029092521617](https://img.xbin.cn//notes/20250910221118889.png)

第二步：弹出欢迎页，单击下一步

![image-20241029092621193](https://img.xbin.cn//notes/20250910221118890.png)

第三步：确认安装路径，避免中文等特殊字符

![image-20241029092738710](https://img.xbin.cn//notes/20250910221118891.png)

第四步：创建桌面快捷方式

![image-20241029092803599](https://img.xbin.cn//notes/20250910221118892.png)

第五步：选择开始菜单目录（默认即可）

![image-20241029092823705](https://img.xbin.cn//notes/20250910221118893.png)

第六步：安装

![image-20241029092840237](https://img.xbin.cn//notes/20250910221118894.png)

第七步：完成安装

![image-20241029093216944](https://img.xbin.cn//notes/20250910221118895.png)

## 2.2 激活（掌握）

第一步：启动一下 IDEA，然后直接退出

第二步：运行

![image-20250626145503055](https://img.xbin.cn//notes/20250910221118896.png)

## 2.3 创建空工程（掌握）

### 2.3.1 创建 Empty 项目

![image-20221105095000573](https://img.xbin.cn//notes/20250910221118897.png)

![image-20221105095212112](https://img.xbin.cn//notes/20250910221118898.png)

![image-20221105095415637](https://img.xbin.cn//notes/20250910221118899.png)

> 隐藏.idea 和 JavaSE_Code.imp

![image-20250626142902335](https://img.xbin.cn//notes/20250910221118900.png)

![image-20250626143030975](https://img.xbin.cn//notes/20250910221118901.png)

### 2.3.2 创建 HelloWorld 模块

![image-20221105095505555](https://img.xbin.cn//notes/20250910221118902.png)

![image-20221105095617017](https://img.xbin.cn//notes/20250910221118903.png)

![image-20221105100323110](https://img.xbin.cn//notes/20250910221118904.png)

### 2.3.3 创建 HelloWorldTest 类

![image-20221105100532802](https://img.xbin.cn//notes/20250910221118905.png)

![image-20221105100623001](https://img.xbin.cn//notes/20250910221118906.png)

![image-20250626144117665](https://img.xbin.cn//notes/20250910221118907.png)

### 2.3.4 编写代码

```java
public class HelloWorldTest {
    public static void main(String[] args) {
        System.out.println("hello java");
    }
}
```

### 2.3.5 运行 Java 类

![image-20221105100807957](https://img.xbin.cn//notes/20250910221118908.png)

## 2.4 基本设置

### 2.4.1 设置项目文件编码（一定要改）

![image-20220615190832482](https://img.xbin.cn//notes/20250910221118909.png)

说明： Transparent native-to-ascii conversion 主要用于转换 ascii，显式原生内容。一般都要勾选。

### 2.4.2 代码字体大小（建议修改）

![1655136907073](https://img.xbin.cn//notes/20250910221118910.png)

更详细的字体与颜色如下：

![image-20221019182625234](https://img.xbin.cn//notes/20250910221118911.png)

> 温馨提示：如果选择某个 font 字体，中文乱码，可以在 fallback font（备选字体）中选择一个支持中文的字体。

# 三、基础语法

## 3.1 Java 的注释

注释是给自己或团队中其他开发人员看的，用来对代码进行解释说明。

Java 中的注释分为 3 种形式：

1、单行注释（掌握）

```java
// 单行注释内容
```

2、多行注释（掌握）

```java
/*
多行注释内容1
多行注释内容2
*/
```

3、文档注释（后续再说）

```java
/**
按照一定的格式要求来编写
*/
```

```java
public class Hello {
    /*
    这是Java的程序入口
    main方法也被称为主方法
    包含主方法的类称为主类
     */
    public static void main(String[] args) {
        //这是一个输出语句
        System.out.println("hello");
    }

    /**
     * 这是一个求两个整数的和的方法
     * @param a int 第一个整数
     * @param b int 第二个整数
     * @return int 返回a+b的值
     */
    public static int add(int a, int b) {
        return a + b;
    }
}

```

## 3.2 Java 的关键字（慢慢积累，开始留意）

关键字：有特殊意义的单词，全部都是小写的。

保留字：预留的关键字，还未在 Java 中启用。

<img src="https://img.xbin.cn//notes/20250910221118912.png" alt="image-20250626152127961" style="zoom:50%;" />

> 以上的 47 个单词接下来我们会重点讲解

后面我们在`特定场景下`会使用到上下文关键字：

![image-20250626152448167](https://img.xbin.cn//notes/20250910221118913.png)

> 另外，有 3 个单词比较特殊，容易被误认为是关键字：true,false,null

## 3.3 标识符（刻意记住）

标识符是用来给 Java 中的类、方法、变量等取名字的单词。

标识符的命名规则（必须遵守，不遵守就报错）：

- 虽然所有字符都可以用来作为 Java 的标识符，但是我们强烈建议只使用 26 个英文字母、数字 0-9、下划线、美元符号这些作为标识符的字符。
- 数字不能开头
- 一个标识符中不能包含空格
- 严格区分大小写
- 不能直接使用关键字、保留字、特殊值作为标识符

标识符的命名规范（建议遵守，会被鄙视）：

- 尽量见名知意
- 类名等遵循大驼峰命名法，即每一个单词首字母大写，例如：HelloWorld，HelloJava 等，形式：XxxYyyZzz
- 变量名、方法名等遵循小驼峰命名法，即从第二个单词开始首字母大写，例如：myAge，yourAge，形式：xxxYyyZzz
- 包名，所有单词都小写，形式：xxx.yyy.zzz
- 常量名，所有单词都大写，形式：XXX_YYY_ZZZ，例如：Integer.MAX_VALUE，Math.PI

更多的命名规范请看《阿里开发手册》

## 3.4 Java 的基本数据类型

Java 是面向对象的编程语言，数据类型是分为 2 大类：

- 引用数据类型：凡是引用数据类型的值都是对象（后面再学习）
- 基本数据类型：一共有 8 种

```java
整数类型：
    byte < short < int < long
小数类型：Java中习惯称为浮点型，它们是不精确的，计算有误差
    float < double
    float是单精度浮点型，大约可以表示（科学计数法）小数点后7-8位
    double是双精度浮点型，大约可以表示（科学计数法）小数点后15-16位
单字符类型：
    char
布尔类型：
    boolean
```

> String 不属于基本数据类型，属于引用数据类型，它是对象。

## 3.5 字面量值（掌握）

- long 类型的字面量值，需要在数字后面加 L
- float 类型的字面量值，需要在数字后面加 F
- 单字符类型的字面量值，需要加单引号
- 字符串类型的字面量，需要加双引号
  - 部分转义字符：

```txt
\'：代表单引号本身，在''里面使用
\"：代表双引号本身，在""里面使用
\t：代表制表位
\b：代表退格键Backspace
\n：代表换行
\r：代表回车，结束本行，光标移到行首
\\：斜杆本身
```

```java
public class LiteralValueTest {//Literal value字面量值
    public static void main(String[] args) {
        System.out.println(185145214563214521L);
        System.out.println(3.14F);

        float f = 3.148632456321456315321F;
        double d = 3.148632456321456315321;

        System.out.println(f);
        System.out.println(d);

        System.out.println('a');
        System.out.println('尚');
        System.out.println('\'');

        System.out.println("=================================");
        System.out.println("chai\tis\ta\tgirl");//代表键盘的Tab键
        System.out.println("lin \tis\ta\tboy");

        System.out.println("==================");
        System.out.println("hello\bworld");//\b代表退一格，相当于键盘的Backspace
        System.out.println("hello\rhi");//\r把光标定位到行首
        System.out.println("hello\nworld");//\n代表换行

        System.out.println("hello\\world");//想要表示斜杆本身，需要用\\
        System.out.println("\"helloworld\"");//在双引号中想要表示普通双引号，需要用\"
    }
}

```

## 3.6 变量（掌握）

变量是指用一个标识符（通常是单词）来代表一个数据值，例如：age=18，用 age 代表年龄值 18.

变量需要先声明，再初始化、再使用。

```java
数据类型 变量名;  //声明
```

变量的初始化：第一次赋值叫做初始化

```java
变量名 = 值1; //初始化
```

变量修改值：再次赋值

```java
变量名 = 值2;
```

通常情况下，声明和初始化会放在一个语句中完成。

```java
数据类型 变量名 = 值1;  //声明和初始化
```

变量的使用有要求：

- 必须先声明后使用

- 在输出变量或用变量计算之前，变量必须初始化

- 变量不能重复声明

- 变量有作用域

- 给变量赋的值，必须符合变量的类型，即值的类型必须小于或等于变量的类型
  - ```
    byte<short/char<int<long<float<double
    ```

![image-20250626162049871](https://img.xbin.cn//notes/20250910221118914.png)

```java
public class VariableExercise {
    public static void main(String[] args) {
        /*
        定义一组变量，存储我的个人信息，包括姓名、年龄、性别、体重、是否已婚等等
         */
        String name = "柴林燕";
        int age = 18;
        char gender = '女';
        double weight = 85.5;
        boolean marry = true;

        //快捷键，向下复制一行：Ctrl + D
        System.out.println(name);
        System.out.println(age);
        System.out.println(gender);
        System.out.println(weight);
        System.out.println(marry);

        //+表示拼接，把一个字符串与另一值拼接到一起输出
        System.out.println("姓名：" +  name);
        System.out.println("name：" + name); //在""里面的name是原样显示，它是字面量值，不是变量

    }
}

```

# 四、IDEA 的使用

## 4.1 IDEA 自带的 AI 代码提示

![image-20250626162516716](https://img.xbin.cn//notes/20250910221118915.png)

## 4.2 快捷代码模板

```java
main 或 psvm ： public static void main(String[] args) {}
soutv 或 变量名.soutv ：输出最近的变量， System.out.println("变量名 = " + 变量名);
```

## 4.3 部分快捷键（自己熟悉过程）

### 4.3.1 通用型

| 说明            | 快捷键           |
| --------------- | ---------------- |
| 复制代码-copy   | ctrl + c         |
| 粘贴-paste      | ctrl + v         |
| 剪切-cut        | ctrl + x         |
| 撤销-undo       | ctrl + z         |
| 反撤销-redo     | ctrl + shift + z |
| 保存-save all   | ctrl + s         |
| 全选-select all | ctrl + a         |

### 4.3.2 提高编写速度（上）

| 说明                                               | 快捷键                     |
| -------------------------------------------------- | -------------------------- |
| 智能提示-edit                                      | alt + enter                |
| 提示代码模板-insert live template                  | ctrl+j                     |
| 批量修改指定的变量名、方法名、类名等-rename        | shift+f6                   |
| 大小写的切换-toggle case                           | ctrl+shift+u               |
| 自动生成返回值变量-introduce variable ...          | ctrl+alt+v 等价与 函数.var |
| 复制指定行的代码-duplicate line or selection       | ctrl+d                     |
| 删除指定行的代码-delete line                       | ctrl+y                     |
| 切换到下一行代码空位-start new line                | shift + enter              |
| 切换到上一行代码空位-start new line before current | ctrl +alt+ enter           |

![image-20250626165401825](https://img.xbin.cn//notes/20250910221118916.png)

### 4.3.3 调整格式

| 说明                                         | 快捷键           |
| -------------------------------------------- | ---------------- |
| 格式化代码-reformat code                     | ctrl+alt+l       |
| 使用单行注释-comment with line comment       | ctrl + /         |
| 使用/取消多行注释-comment with block comment | ctrl + shift + / |
| 选中数行，整体往后移动-tab                   | tab              |
| 选中数行，整体往前移动-prev tab              | shift + tab      |
| 向上移动一行-move line up                    | alt+shift+↑      |
| 向下移动一行-move line down                  | alt+shift+↓      |
| 向上移动整个方法代码-move statement up       | ctrl+shift+↑     |
| 向下移动整个方法代码-move statement down     | ctrl+shift+↓     |

## 4.4 模块管理（能照着笔记做即可）

### 4.4.1 项目结构

Java 的项目结构：

Project（第一层）

- Module1（第二层）
  - src（第三层）
    - 类 1
    - 类 2
    - 类 3
- Module2
  - src
    - 类 1
    - 类 2
    - 类 3

### 4.4.2 创建模块（请看 2.3.2 小节）

### 4.4.3 删除模块

第一步：移除模块

![image-20250626170841301](https://img.xbin.cn//notes/20250910221118917.png)

![image-20250626170912511](https://img.xbin.cn//notes/20250910221118918.png)

![image-20250626171026003](https://img.xbin.cn//notes/20250910221118919.png)

第二步：删除模块

![image-20250626171100851](https://img.xbin.cn//notes/20250910221118920.png)

![image-20250626171151576](https://img.xbin.cn//notes/20250910221118921.png)

### 4.4.4 恢复已经被 remove 的模块

![image-20250626171349435](https://img.xbin.cn//notes/20250910221118922.png)

### 4.4.5 重命名模块

![image-20250626171554604](https://img.xbin.cn//notes/20250910221118923.png)

![image-20250626171659388](https://img.xbin.cn//notes/20250910221118925.png)

## 4.5 Debug（动手试一下）

```java
public class DebugTest {
    public static void main(String[] args) {
        /*
        Debug：
        bug：虫子。在编程中是指漏洞，问题。
        Debug：找bug

        Debug除了用来找问题之外，也可以用来观察代码的运行过程。
         */
        int a = 1;
        System.out.println("a = " + a);
        a = a + 1;
        System.out.println("a = " + a);

    }
}

```

第一步：打断点

![image-20250626172035621](https://img.xbin.cn//notes/20250910221118926.png)

第二步：以 Debug 模式运行

![image-20250626172114440](https://img.xbin.cn//notes/20250910221118927.png)

第三步：单步调试

![image-20250626172232015](https://img.xbin.cn//notes/20250910221118928.png)

![image-20250626172359682](https://img.xbin.cn//notes/20250910221118929.png)
