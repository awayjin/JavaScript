package chap08.abs;

/**
 * Created by jinw01 on 2019/4/3.
 */
public class Rectangle extends Figure {
    Rectangle (double a, double b) {
        super(a, b);
    }
    double area () {
        System.out.println("Inside Area for Rectangle.");
        return dim1 * dim2;
    }
}
