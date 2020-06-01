package Normal01;

public class PersonArray {
  public static void main(String[] args) {

    Person[] array = new Person[3];

    Person one = new Person(29, "王二");
    Person two = new Person(18, "张三");
    Person three = new Person(18, "李四");

    array[0] = one;
    array[1] = two;
    array[2] = three;

    System.out.println(array[0]);
    System.out.println(array[1]);
    System.out.println(array[2]);

    System.out.println(array[0].getName());
    System.out.println(array[1].getName());
    System.out.println(array[2].getName());
  }


}
