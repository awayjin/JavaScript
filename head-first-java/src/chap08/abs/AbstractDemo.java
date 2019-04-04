package chap08.abs;

/**
 * Created by jinw01 on 2019/4/2.
 */
// 抽象类 抽象方法
public class AbstractDemo extends SuperClass {
    int callTwo() {
        System.out.println("This is a abstract method");
        return 33;
    }

    public static void main(String args[]) {
        AbstractDemo demo = new AbstractDemo();
        demo.callTwo();
        demo.callMe();
//        SuperClass d = new SuperClass(); // 抽象类不能实例化
    }
}

abstract class SuperClass {
    void callMe() {
        System.out.println("This is a method of abstract class method");
    }
    abstract int callTwo ();
}
