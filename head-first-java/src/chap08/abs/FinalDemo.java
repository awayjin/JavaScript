package chap08.abs;

/**
 * Created by jinw01 on 2019/4/4.
 */
public class FinalDemo extends A {
    void  meth3 () {
        double result = 3;
    }

}


class A {
    // final 不能被重载
    final void meth () {

    }
}