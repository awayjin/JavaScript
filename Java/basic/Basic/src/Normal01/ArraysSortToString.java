package Normal01;

import java.util.Arrays;

public class ArraysSortToString {
  public static void main(String[] args) {
    int[] intArray = {10, 20, 30};
    // toString
    System.out.println(Arrays.toString(intArray));

    int[] array1 = {1, 2, 4, 11, 5, 33, 6};
    Arrays.sort(array1);
    System.out.println(Arrays.toString(array1));

    String[] arr2 = {"aaa", "ccc", "bb"};
    Arrays.sort(arr2);
    System.out.println(Arrays.toString(arr2));

    System.out.println("======");

    // 升序排列字符串
    String str = "abddzfs12392";
    char[] chars = str.toCharArray(); // 字符串转为数组
    Arrays.sort(chars);
    for (int i = chars.length - 1; i >= 0; i--) {
      System.out.println(chars[i]);
    }

  }
}
