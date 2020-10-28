package api;

public class StringBuilderDemo {
  public static void main(String[] args) {
    StringBuilder bu = new StringBuilder();
    StringBuilder bu2 = bu.append("abc");
    System.out.println(bu);
    System.out.println(bu2);
    System.out.println(bu == bu2);

    bu2.append(3).append(true).append(3.3);
    System.out.println(bu2);
  }
}
