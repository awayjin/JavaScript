package chap08.abs;

/**
 * Created by jinw01 on 2019/3/4.
 */
public class MyAnimalList {
    private Animal[] animals = new Animal[3];
    private int  nextIndex = 0;

    // 修改数组的类型，调整add()方法的参数
    public void add(Animal a) {
        if (nextIndex < animals.length) {
            animals[nextIndex] = a;
            System.out.println("Animal added at " + nextIndex);
            nextIndex++;
        }
    }
}
