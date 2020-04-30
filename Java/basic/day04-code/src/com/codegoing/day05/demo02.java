package com.codegoing.day05;

public class demo02 {
  public static void main(String[] args) {
    printMethod();
    sum(4, 5);
    byte result = (byte) sum(10, 5);
    System.out.println(result);
  }

  static int sum(int a, int b) {
    int result = a + b;
    System.out.println("和:" + result);
    return result;
  }

  static void printMethod () {
    for (int i = 0; i < 5; i++) {
      for (int j = 0; j < 20; j++) {
        System.out.print("*");
      }
      System.out.println();
    }
  }
}
