package chap04;

/**
 * Created by jinw01 on 2019/1/11.
 */
public class GoodDog {
    private int size;

    public int getSize (){
        return size;
    }

    public void setSize(int s) {
        size = s;
    }

    void bark () {
        if (size > 60) {
            System.out.println("Woof");
        } else if (size > 30) {
            System.out.println("Roof");
        } else {
            System.out.println("Yip");
        }
    }

    public static void main(String[] dd) {
        GoodDog one = new GoodDog();
        one.setSize(40);
        one.bark();
        GoodDog two = new GoodDog();
        two.setSize(80);
        two.bark();
        one.setSize(10);
        one.bark();
    }
}
