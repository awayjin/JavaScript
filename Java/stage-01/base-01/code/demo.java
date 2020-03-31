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


  }
}