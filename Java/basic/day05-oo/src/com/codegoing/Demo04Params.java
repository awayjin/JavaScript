package com.codegoing;
import com.codegoing.Phone;

public class Demo04Params {
  String name;
  private int age;
  public static void main(String[] args) {

    Phone one = new Phone();
    one.color = "black";
    one.price = 8848;
    one.brand = "iPhone";

    method(one);
//    this.method(one);

    Phone two = getPhone();
    System.out.println(two.brand);
    System.out.println(two.color);
    System.out.println(two.price);

    int[] array = {11, 44, 22, 33};
    int max = getMax(array);
    System.out.println("求数组最大值：" + max);
  }

  public static int getMax (int[] array) {
    // 面向对象三大特征之封装性
    int max = 0;
    for (int i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  }

  // 成员变量和局部变量
  public void method (int par) {
    System.out.println(par);
    System.out.println(name);
  }

  // 按引用传递参数
  public static void method(Phone param) {
    System.out.println(param.brand);
    System.out.println(param.color);
    System.out.println(param.price);
    int age;
//    System.out.println(age); // 错误的
  }

  // 返回
  public static Phone getPhone () {
//    System.out.println(name); // 错误的
    Phone one = new Phone();
    one.color = "black";
    one.price = 8848;
    one.brand = "iPhone";
    return one;
  }
}
