package Normal01;

import java.util.Random;

public class RandomDemo {
  public static void main(String[] args) {

    Random rd = new Random();

    int num = rd.nextInt();
    System.out.println("随机数:" + num);




    for (int i = 0; i < 100; i++) {
      int num2 = rd.nextInt(10);
      System.out.println("10 以内的随机数:" + num2);
    }


  }
}
