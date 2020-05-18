package com.codegoing;

public class Student {
  private String name;
  private int age;

  public Student () {
    System.out.println("无参数构造方法");
  }

  // 重载
  public Student (String name, int age) {
    System.out.println("全参构造方法." + name + age);
    this.name = name;
    this.age = age;
  }

  public void setAge (int age) {
    this.age = age;
  }
  public int getAge () {
    return this.age;
  }

  public void setName (String name) {
    this.name = name;
  }
  public String getName () {
    return this.name;
  }

}
