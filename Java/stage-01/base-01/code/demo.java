public class demo {
  public static void main(String[] args) {
    System.out.println("demo");

    // 整型
    byte b = 1;
    short s = 2;
    int i = 3;
    long l = 4L;

    // 浮点型
    float f = 5F;
    double d = 6;

    System.out.println(b);
    System.out.println(s);
    System.out.println(i);
    System.out.println(l);
    System.out.println(f);
    System.out.println(d);

    // 类型自动转换, 由小到大
    // int -> long
    long num1 = 100;
    System.out.println(num1);

    // float -> double
    double num2 = 2.5F;
    System.out.println(num2);

    // long -> float
    float num3 = 4L;
    System.out.println(num3);

    // 强制类型转换
    float num4 = (float) 100L;
    System.out.println(num4);


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



  }
}