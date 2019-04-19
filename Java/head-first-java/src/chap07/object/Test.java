package chap07.object;

/**
 * Created by jinw01 on 2019/3/22.
 */
public class Test {
    int a, b;
    Test(int i, int j) {
        a = i;
        b = j;
    }

    // 比较两个对象的相等性
    boolean equals(Test o) {
        if (o.a == a && o.b == b) {
            return  true;
        } else {
            return  false;
        }
    }
}
