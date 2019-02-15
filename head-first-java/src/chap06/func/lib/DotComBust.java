package chap06.func.lib;

import chap05.method.GameHelper;
//import java.util.*;
import java.util.ArrayList;

/**
 * Created by jinw01 on 2019/2/12.
 */
public class DotComBust {
    // 1 声明并初始化变量
    private GameHelper helper = new GameHelper();
    private ArrayList<DotCom> dotComsList = new ArrayList<DotCom>();
    private int numOfHits = 0;

    private void setUpGame() {
        // first
        // 创建3个DotCom对象并指派名称并置入ArrayList
        DotCom one = new DotCom();
        one.setName("Pets.com");

        DotCom two = new DotCom();
        two.setName("eToys.com");

        DotCom three = new DotCom();
        three.setName("go2.com");

        dotComsList.add(one);
        dotComsList.add(two);
        dotComsList.add(three);

        System.out.println("dotComList:" + dotComsList.size());
        System.out.println("dotComList:" + dotComsList.get(0));

        for(DotCom dotComToSet: dotComsList) { // 对list中所有的 DotCom重复
            ArrayList<String> newLocation = helper.placeDotCom(3); // 要求DotCom的位置
            dotComToSet.setLocationCells(newLocation); //调用这个DotCom的setter方法来指派刚取得的位置
        } // close for loop
//        ArrayList<String> list = new ArrayList();
    }  // close setUpGame method

    private void startPlaying () {
        while(!dotComsList.isEmpty()) {
            String userGuess = helper.getUserInput("Enter a guess");
            checkUserGuess(userGuess);
        }
        finishGame();
    } // close startPlaying method

    private void checkUserGuess(String userGuess) {
        numOfHits++;
        String result = "miss";
        for (DotCom dotComToTest : dotComsList) {
            result = dotComToTest.checkYourself(userGuess);
            if (result.equals("hit")) {
                break;
            }

            if (result.equals("kill")) {
                dotComsList.remove(dotComToTest);
                break;
            }
        } // close for
        System.out.println(result);
    } // close method

    private void finishGame() {
        System.out.println("1. All Dot Coms are dead! Your stock is worthless.");

        if (numOfHits <= 18) {
            System.out.println("2. It only took you " + numOfHits + " guesses.");
            System.out.println("You got out before your options sank");
        } else {
            System.out.println("3. Took you long enough." + numOfHits + " guesses");
            System.out.println("Fish are dancing with your options.");
        }
    } // close method

    public static void main(String [] args) {
        DotComBust game = new DotComBust();
        game.setUpGame();
        game.startPlaying();
//        dotComList;
    }
}

