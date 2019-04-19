package chap05.method;

/**
 * Created by jinw01 on 2019/1/16.
 */
public class Demo {
    public static void main(String [] args) {
        for (int i = 0; i < 4; i++) {
            System.out.println(i);
        }
        // 加强版
        int[] arr = {4, 5, 5};
        for(int cell: arr) {
            System.out.println(cell);
        }

        String[] str = {"a", "b", "c", "4"};
        for (String cell: str) {
//            int a = Integer.parseInt(cell) ;
//            if (a instanceof int) {
//
//            }
            System.out.println(cell);
        }

        // 转换primitive主数据类型
        long y = 42;
        int x =  (int) y; // 前置的类型转换
        System.out.println(x);

        float f = 3.14f;
        x = (int)f;
        System.out.println(x);


    }
}
