package Normal01;

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

  }

}
