package chap08.abs;

/**
 * Created by jinw01 on 2019/3/4.
 */
public class AnimalTestDrive {
    public static void main(String[] args) {
        MyAnimalList list = new MyAnimalList();
        Dog a = new Dog();
        Cat c = new Cat();
        list.add(a);
        list.add(c);
    }
}
