package chap05.method;

/**
 * Created by jinw01 on 2019/1/15.
 */
public class SimpleDotCom {
    int[] locationsCells;
    int numOfHits = 0;

    public static void main (String[] args) {
        SimpleDotComTestDriver();
    }


    public void setLocationsCells(int[] locs) {
        locationsCells = locs;
    }

    public String checkYourself (String stringGuess) {
        // string转换为int
        int guess = Integer.parseInt(stringGuess);
        // 声明一个变量保存返回结果, 默认miss
        String result = "miss";

        for (int cell: locationsCells) { // 遍历数组
            // 把用户猜猜值与数组中的元素相比较
            if (guess == cell) {
                result = "hit";
                numOfHits++;
                break;
            } // end if
        } // end for

        if (numOfHits == locationsCells.length) {
            result = "Kill";
        }
        System.out.println("numOfHits:" + numOfHits);
        System.out.println("locationsCells.length:" + locationsCells.length);
        System.out.println("result:" + result);
        return  result;
    }

    static void SimpleDotComTestDriver () {
        SimpleDotCom dot = new SimpleDotCom();

        int[] locationsCell = {4, 5, 6};
        dot.setLocationsCells(locationsCell);

        // for加强
        int[] dd = {4, 4, 5};
        for (int cell: dd) {
            System.out.println(cell);
        }

        String userGuess = "2";
        String result = dot.checkYourself(userGuess);
        String testResult = "failed";

        if (result.equals("hit")) { // equals
            testResult = "passed";
        }
        System.out.println(testResult);
    }
}
