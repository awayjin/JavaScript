package com.codegoing;

public class TeacherDemo05 {
  public static void main(String[] args) {
    Teacher t1 = new Teacher();
    System.out.println("name:" + t1.getName() + ", age:" + t1.getAge());
    Teacher t2 = new Teacher( 14, "娜扎");
    System.out.println("name:" + t2.getName() + ", age:" + t2.getAge());
  }
}
