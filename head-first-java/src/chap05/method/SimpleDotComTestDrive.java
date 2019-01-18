package chap05.method;

/**
 * Created by jinw01 on 2019/1/15.
 */
public class SimpleDotComTestDrive {
    public static void main (String[] args) {
        SimpleDotCom dot = new SimpleDotCom();

        int[] locationsCell = {2, 3,4};
        dot.setLocationsCells(locationsCell);

        String userGuess = "2";
        String result = dot.checkYourself(userGuess);
        String testResult = "failed";

        if (result.equals("hit")) { // equals
            testResult = "passed";
        }
        System.out.println(testResult);
    }
}
