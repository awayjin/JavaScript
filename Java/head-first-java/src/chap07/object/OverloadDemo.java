package chap07.object;

/**
 * Created by jinw01 on 2019/3/21.
 */
public class OverloadDemo {
    public static void main(String[] args) {
        OverloadDemo demo = new OverloadDemo();
        demo.test();
        demo.test(2);
        demo.test(2.232);
        demo.test(2, 3);

        Box bo1 = new Box();
        Box bo2 = new Box(2);
        Box bo3 = new Box(2, 5, 10);
        bo1.volume();
        bo2.volume();
        bo3.volume();
    }

    // 方法重载-类型和(or)数量不同
    void test() {
        System.out.println("No parameters");
    }

    void test(double a) {
        System.out.println("double a:" + a);
    }

    void test(int a) {
        System.out.println("int a:" + a);
    }

    void test(int a, int b) {
        System.out.println("a:" + a +  ", b:" + b);
    }
}
