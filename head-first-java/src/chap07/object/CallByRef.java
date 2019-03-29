package chap07.object;

import chap08.abs.*;

/**
 * Created by jinw01 on 2019/3/25.
 */
public class CallByRef {
    public static void main(String args[]) {
        // 按引用传递
        Test3 ob = new Test3(15, 16);

        System.out.println("a and b before call. ob.a:" + ob.a + ", ob.a:" + ob.b);

        ob.meth(ob);

        System.out.println("a and b After call. ob.a:" + ob.a + ", ob.a:" + ob.b);
    }
}

class Test3 {

    int a, b;

    Test3(int i, int j) {
        a = i;
        b = j;
    }

    // pass an object
    void meth(Test3 t3) {
        t3.a *= 2;
        t3.b /= 2;
    }
}
