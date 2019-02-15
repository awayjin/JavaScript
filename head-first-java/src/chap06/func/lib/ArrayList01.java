package chap06.func.lib;
import java.util.ArrayList;
import java.util.Objects;

/**
 * Created by jinw01 on 2019/1/18.
 */
public class ArrayList01 {
    public static void main(String[]args) {
        // 创建出Egg类型的List
        ArrayList<Egg> myList = new ArrayList<Egg>();

        // 加入元素
        Egg a = new Egg();
        myList.add(a);

        // 再次加入元素
        Egg b = new Egg();
        myList.add(b);

        // 查询大小
        int theSize = myList.size();
        System.out.println("theSize:" + theSize);

        // 查询特定大小
        boolean isIn = myList.contains(a);
        System.out.println("isIn:" + isIn);

        // 查询特定元素的位置
        int indexA = myList.indexOf(a);
        int indexB = myList.indexOf(b);
//        indexB = myList.indexOf(a);
        System.out.println("indexA:" + indexA + ", indexB:" + indexB);

        // 删除元素
        myList.remove(b);
        indexB = myList.indexOf(b);
        System.out.println("indexA:" + indexA + ", indexB:" + indexB + ", myList.size():" + myList.size());

        // 判断是否为空
        myList.remove(a);
        boolean empty = myList.isEmpty();
        System.out.println("empty:" + empty + ", myList.size():" + myList.size());


        ArrayList<String> myList2 = new ArrayList<>();
        ArrayList<String> a2 = new ArrayList<>();

        String a3 = new String("woo");
        myList2.add(a3);
        int a4[] = {1, 2, 3, 4};
//        myList2.add(a4[1]);
        System.out.println("myList2:" + myList2);

        int theSize2 = myList2.size();
        System.out.println("theSize2:" + theSize2);

        Object o2 = myList2.get(0);
        System.out.println("myList2.get:" + o2);

        /**
         *
         * 比较ArrayList与一般数组
         *
         */
        String[] s2 = new String[2]; // 需要指定大小
        String s3[] = new String[2];
        String s4[] = {"2", "3"};
        String[] s5 = {"2", "3"};
        s2[0] = "a1";

        // ArrayList数组
//        ArrayList<String> arr2[] = new ArrayList<String>()[]; // 即数组元素的类型不可以包含任何类型形参，除非是无上限通配符。

        ArrayList<String> arr[] = new ArrayList[3];
        ArrayList<String> arr2 = new ArrayList<String>();
//        ArrayList<Demo> arr3 = new ArrayList<Demo>();
        arr2.add("arr2");
        arr2.add("arr3");
        arr2.add("arr4");
        arr2.add("arr5");
        System.out.println("arr2.size:" + arr2.size() + ", arr2[1]:," + arr2.get(2));


    }
}
