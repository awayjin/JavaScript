package api;


import java.util.Arrays;

public class SystemDmo {
  public static void main(String[] args) {
    long start = System.currentTimeMillis();
    for (int i = 0; i < 999; i++) {
      System.out.println(i);
    }
    long end = System.currentTimeMillis();
    System.out.println("执行多少" + (end - start) + "毫秒.");

    demo();
  }

  private static void demo() {
    int target[] = {1, 2, 3, 4, 5};
    int dest[] = {6, 7, 8, 9, 10, 11};

    System.out.println("复制前 dest: " + Arrays.toString(dest));
    /**
     *
     * 参数：
     * src - 源数组。
     * srcPos - 源数组中的起始位置。
     * dest - 目标数组。
     * destPos - 目标数据中的起始位置。
     * length - 要复制的数组元素的数量。
     * */
    System.arraycopy(target, 2, dest, 3,2);
    System.out.println("复制后的 dest: " + Arrays.toString(dest));

  }
}
