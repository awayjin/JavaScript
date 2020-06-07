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

  }
}
