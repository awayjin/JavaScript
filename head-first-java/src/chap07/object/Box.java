package chap07.object;

/**
 * Created by jinw01 on 2019/3/21.
 */
// 构造函数重载
public class Box {
    double width;
    double height;
    double depth;

    // 构造函数重载
    Box(int len) {
        width = height = depth = len;
    }

    Box () {
        width = height = depth = -1;
    }

    Box (double w, double h, double d) {
        width = w;
        height = h;
        depth = d;
    }

    double volume () {
        double volume = width * height * depth;
        System.out.println("volume:" + volume);
        return volume;
    }
}
