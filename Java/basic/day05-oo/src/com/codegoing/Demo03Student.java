package com.codegoing;

public class Demo03Student {
  public static void main(String[] args) {
    Student s1 = new Student();
    Student s2 = new Student("美娜", 16);
    System.out.println(s2.getName() + ", 年龄：" + s2.getAge());

  }
}
