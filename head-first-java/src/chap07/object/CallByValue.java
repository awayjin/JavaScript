package chap07.object;

/**
 * Created by jinw01 on 2019/3/25.
 */
public class CallByValue {
    public static void  main(String[] args) {
        Test2 ob = new Test2();

        int a = 15, b = 20;
        System.out.println("a and b before call. a:" + a + ", b:" + b);

        ob.meth(a, b);
        System.out.println("a and b After call. a:" + a + ", b:" + b);


    }
}

class Test2 {
    void meth(int i, int j) {
        i *= 2;
        j /= 2;
    }
}