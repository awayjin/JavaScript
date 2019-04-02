package chap08.abs;

// 构造函数重载
public class Box {
    private double width;
    private double height;
    private double depth;
    int i;

    // construct clone of an object
    Box(Box ob) { // pass object to constructor
        width = ob.width;
        height = ob.height;
        depth = ob.depth;
    }

    // 构造函数重载
    Box(int len) {
        width = height = depth = len;
    }

    // 没有参数
    Box() {
        width = height = depth = -1;
    }

    Box(double w, double h, double d) {
        width = w;
        height = h;
        depth = d;
    }

    double volume () {
        double volume = width * height * depth;
//        System.out.println("volume:" + volume);
        return volume;
    }
}
