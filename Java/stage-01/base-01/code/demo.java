import java.util.Random;
public class demo {
  public static void main(String[] args) {
    System.out.println("demo");

    dataType();
    exchange();
    compileOptimize();

    repeatMethod();
//    forMethod();

    continueMethod();

    hourMintes();

    // 死循环
//    for (int i = 1; i < 10;) {
//      System.out.println(i + "层到了。");
//    }
  }

  static void hourMintes () {
    for (int hour = 0; hour < 60; hour++) {
      for (int minute = 0; minute < 60; minute++) {
        System.out.println(hour + "点" + minute + "分钟");
      }
    }
  }

  static void continueMethod () {
    for (int i = 1; i < 10; i++) {
      if (i == 4) {
        continue;
      }
      System.out.println(i + "层到了。");
    }
  }

  // 循环
  static void repeatMethod () {

    int sum = 0;
    for (int i = 0; i <= 10; i++) {
      if (i % 2 == 0) {
        sum += i;
      }
    }
    System.out.println("---> sum:" + sum);
  }

  static void forMethod () {
    int aa = 10;
    int bb = 20;
    int max = aa > bb ? aa: bb;
    System.out.println(max); // 20
    System.out.println(aa > bb ? aa: bb); // 20

    Random random = new Random();
    int sw = 20;
    int ran = random.nextInt(20);
    System.out.println("随机数--" + ran);
    switch (sw) {
      // 穿透
      case 20:
        System.out.println("20 穿透--");
//        break;
      case 30:
        System.out.println("30--");
        break;
      default:
        System.out.println("default--");
        break;
    }


    for (int i = 0; i < 5; i++) {
      System.out.println("for 循环-- i:" + i);
    }

    int wh = 5;
    while (wh > 0) {
      System.out.println("while 循环-- i:" + wh);
      wh--;
    }
  }

  // 编译器的两点优化
  static void compileOptimize () {
    System.out.println("编译器的两点优化-----Begin");
    char a = 48; // 0
    char b = 65; // A
    char c = 97; // a

    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
//    char result = a + c; // 错误写法
    System.out.println(a + c); // 正确
    System.out.println("编译器的两点优化-----End");
  }

  // data-type
  protected static void dataType () {
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
  }

  // exchange
  public static void exchange () {
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