package Normal01;


import java.util.Random;

public class RandomDemo {
  public static void main(String[] args) {

    Random rd = new Random();

    int num = rd.nextInt();
    System.out.println("随机数:" + num);

//    for (int i = 0; i < 100; i++) {
//      int num2 = rd.nextInt(10);
//      System.out.println("10 以内的随机数:" + num2);
//    }

    System.out.println("=========");
    randomMet(5);
  }

  static void randomMet (int num) {
    for (int i = 0; i < 20; i++) {
      Random ra = new Random();
      int n = ra.nextInt(num) + 1;
      System.out.println(n);
    }
  }
}
