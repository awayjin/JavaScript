package Normal01;

import java.util.ArrayList;
import java.util.Random;

/**
 *
 *
 * 如果希望向集合ArrayList当中存储基本类型数据，必须使用基本类型对应的“包装类”。
 *
 * 基本类型    包装类（引用类型，包装类都位于java.lang包下）
 * byte        Byte
 * short       Short
 * int         Integer     【特殊】
 * long        Long
 * float       Float
 * double      Double
 * char        Character   【特殊】
 * boolean     Boolean
 *
 * 从JDK 1.5+开始，支持自动装箱、自动拆箱。
 *
 * 自动装箱：基本类型 --> 包装类型
 * 自动拆箱：包装类型 --> 基本类型
 *
 * */
public class ArrayListGet {
  public static void main(String[] args) {
    ArrayList<String> listS = new ArrayList<>();

    listS.add("张三");
    listS.add("李四");
    listS.add("王二");
    listS.add("麻子");
    listS.remove(2);

    for (int i = 0; i < listS.size(); i++) {
      System.out.println(listS.get(i));
    }

    RandomInt();
  }

  static void RandomInt () {
    System.out.println("============");
    ArrayList<Integer> listI = new ArrayList<>();
    Random ran = new Random();
    for (int i = 0; i < 56; i++) {
      int num = ran.nextInt(33) + 1;
      listI.add(num);
    }
    for (int i = 0; i < listI.size(); i++) {
      if (33 == listI.get(i)) {
        System.out.println("---------->这是最大值：" + listI.get(i));
      } else {
        System.out.println("56个 1-33 的随机数：" + listI.get(i));
      }
    }

  }

}
