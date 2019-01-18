package chap04;

/**
 * Created by jinw01 on 2019/1/14.
 */
public class Variables {
    int a = 3;
    byte b = 3;

    public static void main(String [] args) {
        Variables v = new Variables();
        if (v.a == v.b) { // 判断字节组合
            System.out.println(22);
        }

        Variables a = new Variables();
        Variables b = new Variables();
        Variables c = a;

        System.out.println(a == b);
        System.out.println(a == c);

    }

}
