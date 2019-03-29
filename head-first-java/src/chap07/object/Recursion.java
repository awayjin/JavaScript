package chap07.object;

/**
 * Created by jinw01 on 2019/3/26.
 */
public class Recursion {
    public static void main(String[] args) {
        Factory f1 = new Factory();
        int result = f1.fact(4);
        System.out.println("Recursion:" + result);
    }
}

class Factory {
    // 递归函数
    int fact(int n) {
        int result;
        if (n == 1) return  1;
        result = fact(n-1) * n;
        return  result;
    }
}
