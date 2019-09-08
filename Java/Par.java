public class Par {

    public static void main(String[] args) {
        A a = new A(5);
        fun(a);
        System.out.println(a.a);// 输出结果为6
    }

    private static void fun(A a) {
        a.a += 1;
//        B b = new B(10);
//        b.a += 30;
    }

    static class A {
        public int a;

        public A(int a) {
            this.a = a;
        }
    }

    static class B {

    }
}

