import java.util.ArrayList;

public class Demo01Eequals {

  public static void main(String[] args) {
//    Person p1 = new Person("name p1");
//    Person p2 = new Person();
//    p1.show();
//    System.out.println("p1 === p2" + p1.equals(p2));
//    p2 = p1;
//    System.out.println("p1 === p2" + p1.equals(p2));

    Person p3 = new Person("古力娜扎", 16);
    Person p4 = new Person("古力娜扎", 16);
    System.out.println("override equals:" + p3.equals(p4));

    ArrayList<String> list = new ArrayList<>();
    boolean b = p3.equals(list);
    System.out.println("ArrayList:" + b);

  }
}
