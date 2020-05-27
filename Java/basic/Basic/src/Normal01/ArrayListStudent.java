package Normal01;

import java.util.ArrayList;

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
  }
}
