package chap08.abs;

/**
 * Created by jinw01 on 2019/3/25.
 */
class Test {
    int a, b;
    Test(int i, int j) {
        a = i;
        b = j;
    }
    // pass an object
    void meth(Test o) {
        o.a *= 2;
        o.b /= 2;
    }
}
class CallByRef {
    public static void main(String args[]) {
        Test ob = new Test(15, 20);
        System.out.println("ob.a and ob.b before call: " +
                ob.a + " " + ob.b);
        ob.meth(ob);
        System.out.println("ob.a and ob.b after call: " +
                ob.a + " " + ob.b);
    }
}