package chap09.packageinterface;

import com.sun.org.apache.bcel.internal.generic.ArithmeticInstruction;

/**
 * Created by jinw01 on 2019/4/8.
 */
public class MyBalance {
    // 多重语句
    public static void main(String[] args) {
        int a = 4;
        int b = 0;
        int c;
        try {
            int len = args.length;
            System.out.println("len:" + len);

            int arr[] = { 122, 33 };
            arr[1] = 123;
            System.out.println("arr:" + arr[1]);
            System.out.println("arr:" + arr[3]);

            c = a / b;

            System.out.println("This will not be printed.: " + c);
        } catch (ArithmeticException e) {
            System.out.println("Division by zero.");
            System.out.println(e);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Exception---:" + e);
        }
    }
}
