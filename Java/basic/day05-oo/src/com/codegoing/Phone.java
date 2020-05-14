package com.codegoing;

public class Phone {
  String color;
  double price;
  String brand;

  public void call(String who) {
    System.out.println("给" + who + "打电话");
  }

  public void sendToMessage () {
    System.out.printf("sent to message.");
  }
}
