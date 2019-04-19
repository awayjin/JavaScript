package chap04;

/**
 * Created by jinw01 on 2019/1/11.
 */
public class ElectricGuitar {
    String brand;
    int numOfPickups;
    boolean rockStar;

    String getBrand() {
        return  brand;
    }

    void setBrand (String aBrand) {
        brand = aBrand;
    }

    int getNumOfPickups () {
        return numOfPickups;
    }

    void setNumOfPickups (int num) {
        numOfPickups = num;
    }

    public static void main (String [] args) {
        ElectricGuitar ele = new ElectricGuitar();
        ele.setBrand("brand..");
        System.out.println(ele.getBrand());

        ele.setNumOfPickups(333);
        System.out.println(ele.getNumOfPickups());
    }
}
