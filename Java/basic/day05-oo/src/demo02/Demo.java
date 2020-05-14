package demo02;
import demo.Student;

public class Demo {
  public static void main(String[] args) {
    Student s1 = new Student();
    s1.name = "demo 2";
    s1.sayName();
    System.out.println(s1.age);
  }
}
