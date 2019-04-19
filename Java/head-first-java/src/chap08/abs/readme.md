# 继承
> 被继承的类叫超类(superclass),继承超类的类叫子类(subclass)

## 8.1 继承的基础

### 8.1.1 成员的访问和继承
> 尽管子类包括超类的所有成员，它不能访问超类被声明private的成员

### 8.1.2 更实际的例子
> 继承的一个主要优势一旦你已经创建了一个超类，而该超类定义了适用于一组对象的属性，它可用来创建任何数量的说明更多细节的子类

### 8.1.3 超类变量可以引用子类对象


## 8.2 使用super
> 调用超类的构造函数
> 用来访问被子类的成员隐藏的超类成员

### 8.2.1 使用super调用超类构造函数
> super()必须是在子类构造函数中第一个执行语句

## 8.7 使用抽象类
> 超类定义了一种给定结构的抽象但是不提供任何完整方法的实现
> 所有子类共享的通用形式
> 任何含有一个或多个抽象方法的类都必须声明成抽象类
```java
public class AbstractDemo extends SuperClass {
    int callTwo() {
        System.out.println("This is a abstract method");
        return 33;
    }

    public static void main(String args[]) {
        AbstractDemo demo = new AbstractDemo();
        demo.callTwo();
        demo.callMe();
//        SuperClass d = new SuperClass(); // 抽象类不能实例化
    }
}

abstract class SuperClass {
    void callMe() {
        System.out.println("This is a method of abstract class method");
    }
    abstract int callTwo ();
}
```

## 8.8 继承中使用final
> 用于已命名常量的等价物，用于继承

### 8.8.1 使用final阻止重载
> 声明成final的方法不能被重载

## 8.9 Object类
> Object是所有其他类的超类
