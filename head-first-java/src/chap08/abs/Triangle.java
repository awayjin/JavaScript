package chap08.abs;

/**
 * Created by jinw01 on 2019/4/3.
 */
public class Triangle extends Rectangle {
    Triangle(double a, double b) {
        super(a, b);
    }

    public static void main(String args[]) {
        Rectangle rec1 = new Rectangle(3, 4);
        double d = rec1.area();
        System.out.println("Area is " + d);

//        Figure f = new Figure(10, 10);
        Figure figRef; // 创建一个Figure类型的引用变量

        figRef = rec1;
        System.out.println("Area is " + figRef.area());

        Triangle tri1 = new Triangle(8, 9);
        figRef = tri1;
        System.out.println("Area is " + figRef.area());

    }

//    double area (double dim1) {
//        return dim1;
//    }
}

