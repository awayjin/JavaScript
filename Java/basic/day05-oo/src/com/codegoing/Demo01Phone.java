package com.codegoing;

public class Demo01Phone {
  public static void main(String[] args) {
    Phone p1 = new Phone();
    System.out.println(p1.brand); // null
    System.out.println(p1.color); // null
    System.out.println(p1.price); // 0.0
    System.out.println("---------"); //
    p1.price = 8888;
    p1.brand = "iPhone";
    p1.color = "silver";
    System.out.println(p1.brand); // null
    System.out.println(p1.color); // null
    System.out.println(p1.price); // 0.0
    System.out.println("------------"); //
    p1.call("wade");
    p1.sendToMessage();

    Phone two = p1;
    two.price = 38888;
    two.brand = "aiPhone";
    two.color = "a silver";
    System.out.println(two.brand); // d null
    System.out.println(two.color); // null
    System.out.println(two.price); // 0.0
    System.out.println("------------"); //
    two.call("a wade");
    two.sendToMessage();
  }
}
