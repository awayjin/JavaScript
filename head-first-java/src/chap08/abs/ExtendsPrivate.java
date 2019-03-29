package chap08.abs;

/**
 * Created by jinw01 on 2019/3/27.
 */
class Extends extends B {
    public static void main(String args[]) {
        B sub = new B();
        sub.setij(2, 3);
        System.out.println(sub.i);
//        System.out.println(sub.j); // 不能访问
    }
}

class B {
    int i; // public by default
    private int j;

    void setij (int x, int y) {
        i = x;
        j = y;
    }

    private void dd () {

    }
}
