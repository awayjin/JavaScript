# 第1节 运行环境

### 计算机进制转换

二进制转十进制，

十进制转二进制，（位权）

```js
let num = 12; 
num.toString(2) // 1100
parseInt(1100, 2) // 12
```

### 计算机存储单元

位(bit): 一个数字0或一个数字1，代表一位。

字节(Byte)：每逢8位是一个字节，数据存储的最小单位。

1 Byte = 8 bit

1 KB = 1024 Byte
1 MB = 1024 KB
1 GB = 1024 MB
1 TB = 1024 GB
1 PB = 1024 TB


### 常用

DOS(Dist Operating System)

### JVM JRE JDK

- JVM（Java Virtual Machine ）：Java虚拟机.我们编写的Java代码，都运行在 JVM 之上。

- JRE (Java Runtime Environment) ：是Java程序的运行时环境，包含 JVM 和运行时所需要的 核心类库 。

- JDK (Java Development Kit)：是Java程序开发工具包，包含 JRE 和开发人员使用的工具

我们想要运行一个已有的Java程序，那么只需安装 JRE 即可。
我们想要开发一个全新的Java程序，那么必须安装 JDK 。

### 关键字

完全小写的字母，编辑中有特殊颜色。

### 标识符的概念与规则
class Hi

- 字符常量: 单引号引起来,只能写一个字符,必须有内容
- 字符串常量: 双引号引起来,可以写多个字符,也可以不写


### 数据类型
Java的数据类型分为两大类：
- 基本数据类型：包括 整数 、 浮点数 、 字符 、 布尔  

- 引用数据类型：包括 类 、 数组 、 接口 。

字符串不是基本类型，而是引用类型

四类八种基本数据类型：
- byte
- short
- int
- long

- float
- double
- char
- boolean

```
//定义单精度浮点型变量
float f = 5.5F;
System.out.println(f);
//定义双精度浮点型变量
double d = 8.5;
System.out.println(d);
long l = 456L;
```

long类型：建议数据后加L表示。
float类型：建议数据后加F表示。


### 类型转换
数据类型转换_自动转换: 数据范围从小到大。

1. 强制类型转换一般不推荐使用，因为有可能发生精度损失、数据溢出。
	
2. byte/short/char这三种类型都可以发生数学运算，例如加法“+”.

3. byte/short/char这三种类型在运算的时候，都会被首先提升成为int类型，然后再计算。

4. boolean类型不能发生数据类型转换

```
char a = 48; // 0
char b = 65; // A
char c = 97; // a

System.out.println(a);
System.out.println(b);
System.out.println(c);
```

### ASCII 编码表

48 > 0, 65 -> A, 97 -> a

数字和字符的对照关系表（编码表）：

ASCII码表：American Standard Code for Information Interchange，美国信息交换标准代码。

Unicode码表：万国码。也是数字和符号的对照关系，开头0-127部分和ASCII完全一样，但是从128开始包含有更多字符。

```
// 强制类型转换，注意事项
byte num5 = 50;
byte num6 = 60;
//    byte result = num5 + num6;  // wrong
int result = num5 + num6;  // wrong
System.out.println(result);

char charA = 'A';
// charA 转换成数值了
System.out.println(charA + 0); // 65

char chara = 'a';
System.out.println(chara + 0); // 97

char char0 = '0';
System.out.println(char0 + 0); // 48

```

### 语法
switch后面小括号当中只能是下列数据类型：
基本数据类型：byte/short/char/int
引用数据类型：String字符串、enum枚举