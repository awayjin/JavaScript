package chap05.method;

/**
 * Created by jinw01 on 2019/1/15.
 */
public class SimpleDotGame {
    public static void  main(String [] args) {
        int numOfGuess = 0; // 猜的次数
        int randomNum = (int) (Math.random() * 5); // 随机数
        int[] locations  = { randomNum, randomNum + 1, randomNum + 2}; // 随机数 递增数组
        System.out.println("randomNum:" + randomNum);

        GameHelper helper = new GameHelper(); // IO读取

        SimpleDotCom dotCom = new SimpleDotCom();
        dotCom.setLocationsCells(locations); // 设置数组

        boolean isAlive = true;

        while (isAlive == true) {
            String guess = helper.getUserInput("enter a number");
            String result = dotCom.checkYourself(guess); // 猜的结果
            numOfGuess++;
            if (result.equals("kill")) {
                isAlive = false;
                System.out.println("You took " + numOfGuess + " guesses.");
            } // close if
        } // close while
    } // close main
}
