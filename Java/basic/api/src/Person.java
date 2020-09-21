public class Person {
  private String name;
  public void setName (String str) {
    name = str;
  }
  void show () {
    System.out.println("nam:" + this.name);
  }
  public Person () {
    System.out.println("no arguments");
  }
  // 重载
  public Person (String name) {
    System.out.println("全参构造方法." + name );
    this.name = name;
  }
}
