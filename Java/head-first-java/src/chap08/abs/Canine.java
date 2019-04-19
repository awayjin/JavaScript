package chap08.abs;

import chap07.object.Animal;

/**
 * Created by jinw01 on 2019/2/25.
 */
// 使用抽象类来声明为引用类型给多态使用
// 抽象类除了被继承过之外，是没有用途、没有值、没有目的
abstract class Canine extends Animal {
    public static void main(String[] args) {
//        Canine d = new Canine();
    }
    public void roam () {}
}

