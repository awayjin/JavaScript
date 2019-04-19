package chap08.abs;

/**
 * Created by jinw01 on 2019/3/29.
 */
public class BoxWeight extends Box {
    double weight;
    BoxWeight(double w, double h, double d, double m) {
        super(w, h, d);
        weight = m;
    }

    // 没有参数
    BoxWeight () {
        super();
    }

    BoxWeight (int a) {
//        super.i = a;
        super(a);
    }

    BoxWeight (BoxWeight ob) {
        super(ob);
        weight = ob.weight;

    }

    public static void main (String args[]) {
        BoxWeight my1 = new BoxWeight();
        BoxWeight my2 = new BoxWeight(10, 16, 15, 34.3);
        BoxWeight my3 = new BoxWeight(33);
        BoxWeight myclone = new BoxWeight(my2);
        double vol;

//        my1.width;
        System.out.println("my3 of my1: " + my3.i);
        System.out.println("Volume of my1: " + my1.volume());
        System.out.println("Volume of my2: " + my2.volume());
        System.out.println("Volume of myclone: " + myclone.volume());
        System.out.println("Weight of myclone: " + myclone.weight);

//        Box box1 = new Box();
//        System.out.println("Volume of box1:" + box1.volume());

    }
}
