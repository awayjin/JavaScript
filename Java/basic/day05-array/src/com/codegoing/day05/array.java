package com.codegoing.day05;

public class array {
  public static void main(String[] args) {
    defineArray();
  }

  static void defineArray () {
    int[] arr = new int[13]; // 动态初始化
    byte[] arrByte = new byte[]{1, 2, 3, 4};
    byte b = 12;
    short s = 13;
    long l = 14L;

    long[] arrLong = { 11, 22L, 33 };
    String[] arrString = { "aa", "bb"};

    System.out.println(arr[1] + ", len:" + arr.length);
    System.out.println(arrByte[1] + ", len: " + arrByte.length);
    System.out.println(arrLong[1] + ", len: " + arrLong.length);
    System.out.println(arrString[1] + ", len: " + arrString.length);

    long lon = arrLong[1];
    System.out.printf("num:" + lon);
  }
}
