public class Demo01Eequals {

  public static void main(String[] args) {
    Person p1 = new Person("name p1");
    Person p2 = new Person();
    p1.show();
    System.out.println("p1 === p2" + p1.equals(p2));
    p2 = p1;
    System.out.println("p1 === p2" + p1.equals(p2));

  }
}
