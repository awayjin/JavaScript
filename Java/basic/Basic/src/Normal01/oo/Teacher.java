package Normal01.oo;

public class Teacher extends Emplyee {
  int num = 20; // 成员变量
  public void method() {
    int num = 10; // 局部变量
    System.out.println("局部变量: " + num);
    System.out.println("成员变量: " + this.num);
    System.out.println("父亲的成员变量: " + super.num);
  }
}
