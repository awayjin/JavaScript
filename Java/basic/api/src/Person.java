import java.util.Objects;

public class Person {
  private String name;
  private int age;
//  public void setName (String str) {
//    name = str;
//  }
  void show () {
    System.out.println("nam:" + this.name);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Person person = (Person) o;
    return age == person.age &&
               Objects.equals(name, person.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, age);
  }

  /*@Override // 重写
  public boolean equals(Object obj) {
    // 向下转型
//    Person p = (Person)obj;
//    boolean b = this.name.equals(p.name) && this.age == p.age;
//    return b;
    if (obj instanceof Person) {
      //使用向下转型,把obj转换为Person类型
      Person p = (Person)obj;
      //比较两个对象的属性,一个对象是this(p1),一个对象是p(obj->p2)
//    boolean b = this.name.equals(p.name) && this.ag//使用向下转型,把obj转换为Person类型
    Person p = (Person)obj;
    //比较两个对象的属性,一个对象是this(p1),一个对象是p(obj->p2)
//    boolean b = this.name.equals(p.name) && this.age==p.age;
    boolean b = this.name == p.name && this.age==p.age;
    return b;e==p.age;
      boolean b = this.name == p.name && this.age==p.age;
      return b;
    }
    return false;
  }*/

  public Person () {
    System.out.println("no arguments");
  }

  // 重载
  public Person (String name) {
    System.out.println("全参构造方法." + name );
    this.name = name;
  }
  public Person (String name, int age) {
    this.name = name;
    this.age = age;
  }


}
