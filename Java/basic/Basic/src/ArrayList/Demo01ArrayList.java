package ArrayList;

import java.util.ArrayList;

public class Demo01ArrayList {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    list.add("杨颖");
    list.add("娜扎");
    list.add("小璐");
    list.add("高圆圆");
    System.out.println(list);


    System.out.println(list.get(1));
    list.remove(2);
    System.out.println(list);
    // list.fori
    for (int i = 0; i < list.size(); i++) {
      System.out.println(list.get(i));
    }


    // 只能是引用类型
//    ArrayList<int> list2 = new ArrayList<int>();



    String[] str2 = null;
//    str2 = "11";

    // array 1
    System.out.println("---> array 1--->");
    String[] str = new String[3];
    str[2] = "str2";
    for (int i = 0; i < str.length; i++) {
      System.out.println(str[i]);
    }

    System.out.println("---> array 2--->");
    // array 2
    int[] myList2 = {11, 22, 33};
    for (int i = 0; i < myList2.length; i++) {
      System.out.println(myList2[i]);
    }

    System.out.println("---> array 3--->");
    // array 3
    int arr3[] = new int[3];
    arr3[2] = 33;
    for (int i = 0; i < arr3.length; i++) {
      System.out.println(arr3[i]);
    }



  }
}


