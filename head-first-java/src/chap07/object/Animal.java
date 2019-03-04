package chap07.object;

/**
 * Created by jinw01 on 2019/2/22.
 */
public class Animal extends Dog {
    public static void main(String[] args) {
        Dog[] animals = new Animal[3];
        Dog my = new Animal();
        System.out.println(animals);
        my.go();
//        animals.add(new Dog());
        for (int i = 0; i < animals.length; i++) {
//            System.out.println(animals[0].go();
            animals[i].go();
        }
    }
    public void dd () {

    }
}

