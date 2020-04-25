package com.codegoing.day05;

public class demo02Array {
  public static void main(String[] args) {
    int[] arrayA = new int[3];
    arrayA[0] = 100;
    arrayA[1] = 200;
    arrayA[2] = 300;
    System.out.println("arrayA" + arrayA[0]);
    System.out.println("arrayA" + arrayA[1]);
    System.out.println("arrayA" + arrayA[2]);
    System.out.println("==========");


    int[] arrayB = arrayA;
    arrayB[1] = 200;
    System.out.println("arrayB" + arrayB[0]);
    System.out.println("arrayB" + arrayB[1]);
    System.out.println("arrayB" + arrayB[2]);
    System.out.println("==========");
    System.out.println("arrayB" + arrayB[1]);
    System.out.println("arrayA" + arrayA[1]);


    byte[] byteA = new byte[]{11, 22, 33};
    System.out.println("==========");
    System.out.println("byteA " + byteA[0]);
    System.out.println("byteA " + byteA[1]);

    // 数组静态初始化
    String[] stringA = { "str1", "str2", "str3", "str1", "str2", "str3", "str1", "str2", "str3"};
    System.out.println("==========");
    System.out.println("stringA " + stringA[0]);
    System.out.println("stringA " + stringA[1]);
    System.out.println("stringA " + stringA[2]);
    System.out.println("stringA length: " + stringA.length);


    int[] arrayC = new int[3];
    System.out.println("arrayC " + arrayC.length);
    arrayC = new int[8];
    System.out.println("arrayC " + arrayC.length);

  }
}
