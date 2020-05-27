package Normal01;

import java.util.ArrayList;

public class ArrayListDemo01 {
  public static void main(String[] args) {
    ArrayList<String> list = new ArrayList<>();
    System.out.println(list);
    list.add("迪丽热巴");
    list.add("古力娜扎");
    boolean success = list.add("天爱");
    System.out.println(list);
    System.out.println(success);
    System.out.println("get(2)" + list.get(2));
    System.out.println("size:" + list.size());


    ArrayList<String> listA = new ArrayList<>();
    // 错误写法！泛型只能是引用类型，不能是基本类型
//        ArrayList<int> listB = new ArrayList<>();

    ArrayList<Integer> listC = new ArrayList<>();
    listC.add(100);
    listC.add(200);
    System.out.println(listC); // [100, 200]

    int num = listC.get(1);
    System.out.println("第1号元素是：" + num);

    ArrayList<Boolean> listBl = new ArrayList<>();
    listBl.add(false);
    listBl.add(true);
    listBl.add(false);
    System.out.println("ArrayList listBl:" + listBl.get(0));
    System.out.println("ArrayList listBl:" + listBl.get(1));
    System.out.println("ArrayList listBl:" + listBl.get(2));

  }
}
