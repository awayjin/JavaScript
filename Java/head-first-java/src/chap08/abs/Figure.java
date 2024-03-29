package chap08.abs;

/**
 * Created by jinw01 on 2019/4/3.
 */
abstract class Figure {
    double dim1;
    double dim2;

    Figure(double a, double b) {
        dim1 = a;
        dim2 = b;
    }

    // area is now an abstract method
    abstract double area();
}
