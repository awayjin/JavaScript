package com.codegoing;

public class DemoPerson {
  public static void main(String[] args) {
    Person p1 = new Person();
    p1.show();

    Person p2 = new Person();
//    p2.setAge = "beautiful girl";
    p2.setName("beautiful girl");
//    p2.age = 16;
    p2.setAge(14);
    p2.show();

    p2.setAge(-20);
    System.out.println("getsAge: " + p2.getAge());
    p2.show();
  }
}
