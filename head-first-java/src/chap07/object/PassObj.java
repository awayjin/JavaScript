package chap07.object;

/**
 * Created by jinw01 on 2019/3/22.
 */
public class PassObj {
    public static void main(String [] args) {
        Test obj1 = new Test(100, 22);
        Test obj2 = new Test(100, 22);
        Test obj3 = new Test(100, 32);

        System.out.println("obj1 == obj2:" + obj1.equals(obj2));
        System.out.println("obj1 == obj3:" + obj1.equals(obj3));
    }
}
