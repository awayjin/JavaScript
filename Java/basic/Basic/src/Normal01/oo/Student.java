package Normal01.oo;

public class Student {
  int num = 10; // this.成员变量名
  public static void main(String[] args) {
    Teacher t1 = new Teacher();
    System.out.println("t1.num: " + t1.num);
    t1.method();
  }
}
