package Normal01;
import java.util.Scanner;
import java.lang.String;

public class ScannerDemo {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int num = sc.nextInt();
    System.out.println("得到一个整数:" + num);
    String str = sc.next();
    System.out.println("得到一字符串:" + str);
  }

}
