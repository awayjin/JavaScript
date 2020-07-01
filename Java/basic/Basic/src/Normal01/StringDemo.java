package Normal01;

import java.util.Scanner;

public class StringDemo {
  public static void main(String[] args) {

    /**
     *
     * 字符串的特点：
     * 1. 字符串的内容永不可变。【重点】
     * 2. 正是因为字符串不可改变，所以字符串是可以共享使用的。
     * 3. 字符串效果上相当于是char[]字符数组，但是底层原理是byte[]字节数组。
     *
     * 创建字符串的常见3+1种方式。
     * 三种构造方法：
     * public String()：创建一个空白字符串，不含有任何内容。
     * public String(char[] array)：根据字符数组的内容，来创建对应的字符串。
     * public String(byte[] array)：根据字节数组的内容，来创建对应的字符串。
     * 一种直接创建：
     * String str = "Hello"; // 右边直接用双引号
     * */


    String str1 = new String();
    System.out.println("第一个:" + str1);

    char[] char1 = { 'A', 'B', 'C'}; // 字符数组
    String str2 = new String(char1);
    System.out.println("字符数组创建字符串:" + str2);

    byte[] byte1 = { 97, 98, 65, 66, 48, 49}; // 字节数组 abAB01
    String str3 = new String(byte1);
    System.out.println("字节数组:" + str3); // abAB01

    String str4 = "AAAA";
    System.out.println("str4" + str4);

    System.out.println("=======");
    equalsStr();
  }

  static void equalsStr () {


    System.out.println("=======");

    String str1 = "abc";
    String str2=  "abc";

    char[] charArray = { 'a', 'b', 'c'};
    String str3 = new String(charArray);

    String str4 = "Abc";

    System.out.println(str1 == str2); // true
    System.out.println(str3 == str2); // false
    System.out.println(str2.equals(str3)); // true
    System.out.println(str1.equals(str4)); // false

    // 字符串的获取相关方法
    System.out.println(str1.equalsIgnoreCase(str4)); // true
    System.out.println(str1.concat(str4)); // abcAbc
    System.out.println(str1.indexOf('c')); // 2
    System.out.println(str1.indexOf("d")); // -1


    System.out.println("=======");
    System.out.println(str1.charAt(1)); // b
    // { 97, 98, 65, 66, 48, 49}; // 字节数组 abAB01
    System.out.println(str1.codePointAt(1)); // 97


    System.out.println("===String 装换相关方法====");

    char[] chars = "hello".toCharArray();
    byte[] bytes = "abcdef".getBytes();

    System.out.println("getBytes:" + bytes[0]);
    System.out.println("getBytes:" + bytes[2]);
    System.out.println("getBytes:" + bytes[4]);

    System.out.println("toCharArray:" + chars[0]);
    System.out.println("toCharArray:" + chars[1]);
    System.out.println("toCharArray:" + chars[3]);

    System.out.println("字符串截取：" + "helloworld".substring(2));
    System.out.println("替换：" + "hello world".replace('l', '*'));

    String strSplit = "aa,bb,cc";
    String[] strArr = strSplit.split(",");
    for (int i = 0; i < strArr.length; i++) {
      System.out.println("分割：" + strArr[i]);
    }

    String strStar = "xx.yy.zz";
    String[] strStarArr = strStar.split("\\."); // 注意事项
    System.out.println("长度：" + strStarArr.length);
    for (int i = 0; i < strStarArr.length; i++) {
      System.out.println("分割 xx.y.z：" + strArr[i]);
    }

    countString();
  }

  // 统计字符串出现的次数
  static void countString () {
    // toCharArray 将此字符串转换为一个新的字符数组。
    System.out.println("hello".toCharArray());

    Scanner sc = new Scanner(System.in);
    System.out.println("请输入一个字符串");

    String input = sc.next();
    int countUpper = 0;
    int countLower = 0;
    int countNumber = 0;
    int countOther = 0;

    char[] charArray = input.toCharArray();
    for (int i = 0; i < charArray.length; i++) {
      char ch = charArray[i];
      if (ch >= 'A' && ch <= 'Z') {
        countUpper++;
      } else if (ch >= 'a' && ch <= 'z') {
        countLower++;
      } else if (ch >= '0' && ch <= '9') {
        countNumber++;
      } else {
        countOther++;
      }
    }

    System.out.println("大写字母出现的次数:" + countUpper);
    System.out.println("小写字母出现的次数:" + countLower);
    System.out.println("数字出现的次数:" + countNumber);
    System.out.println("其他字符的次数:" + countOther);

  }

}
