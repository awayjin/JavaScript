package com.codegoing;

public class Person {
  private int age;
  private String name;
  private boolean male;

  public void setBool (Boolean b) {
    male = b;
  }

  public boolean isMale () {
    return male;
  }

  public void setAge (int number) {
    if (number > 0) {
      age = number;
    } else {
      System.out.println("年龄不合法." + number);
    }
  }

  public void setName(String str) {
    name = str;
  }


  public int getAge () {
    return age;
  }

  public void show () {
    System.out.println("我叫: " + name + ", 年龄：" + age);
  }

  public void sayHello (String name) {
    System.out.println(this.name + ", 我是" + name);
    System.out.println(this);
  }
}
