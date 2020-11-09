package api;

public class WrapClass {
  public static void main(String[] args) {
    Integer i1 = new Integer("3");
    Integer i2 = new Integer(3);
//    Integer i3 = new Integer("3a");
    System.out.println(i1);
    System.out.println(i2);

    int i = i1.intValue();
    System.out.println(i);
  }
}
