package chap06.func.lib;
import java.util.ArrayList;

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



    }
}
