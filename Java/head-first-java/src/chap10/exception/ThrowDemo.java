package chap10.exception;

/**
 * Created by jinw01 on 2019/4/9.
 */
public class ThrowDemo {
    static void demop () {
        try {
            throw new NullPointerException("demo");
        } catch (NullPointerException e) {
            System.out.println("Caught inside demop");
            throw e;
        }
    }

    public static void main(String args[]) {
        try {
            demop();
        } catch (NullPointerException e) {
            System.out.println("Recaught:" + e);
        }
    }
}
