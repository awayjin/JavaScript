package Normal01;

import java.util.ArrayList;
import java.util.Random;

public class ArrayListStudent {
  public static void main(String[] args) {
    ArrayList<Student> listStu = new ArrayList<>();

    Student one = new Student("张三", 14);
    Student two = new Student("李四", 15);
    Student three = new Student("王二", 16);
    Student four = new Student("麻子", 17);

    listStu.add(one);
    listStu.add(two);
    listStu.add(three);
    listStu.add(four);

    for (int i = 0; i < listStu.size(); i++) {
      Student stu = listStu.get(i);
      System.out.println("姓名:" + stu.getName() + ", 年龄:" + stu.getAge());
    }

    ArrayList<String> strList = new ArrayList<>();
    strList.add("张三");
    strList.add("张三2");
    strList.add("张三3");
    strList.add("张三4");
    printArrayList(strList);

    // 集合筛选
    ArrayList<Integer> bigList = new ArrayList<>();
    Random rn = new Random();
    for (int i = 0; i < 40; i++) {
      int num = rn.nextInt(100) + 1; // [1, 100]
      bigList.add(num);
    }

    ArrayList<Integer> bl = getSmallList(bigList);
    System.out.println("偶数的总数:" + bl.size());
    for (int i = 0; i < bl.size(); i++) {
      System.out.println(bl.get(i));
    }

  }

  // 集合筛选
  static ArrayList<Integer> getSmallList(ArrayList<Integer> bigList) {
    ArrayList<Integer> smallList = new ArrayList<>();

    for (int i = 0; i < bigList.size(); i++) {
      int num = bigList.get(i);
      if (num % 2 == 0) {
        smallList.add(num);
      }
    }

    return smallList;
  }

  // 打印
  static void printArrayList (ArrayList<String> list) {
    System.out.println(list);

    System.out.print("{");
    for (int i = 0; i < list.size(); i++) {
      String name = list.get(i);
      if (i == list.size() - 1) {
        System.out.print(name + "}");
      } else {
        System.out.print(name + "@");
      }
    }

  }
}
