package chap06.func.lib;

import java.util.ArrayList;

/**
 * Created by jinw01 on 2019/2/12.
 */
public class DotCom {
//    int[] locationCells;
//    int numOfHits = 0;
    private ArrayList<String> locationCells;
    private String name;

//    public void setLocationCells(int[] locs) {
//        locationCells = locs;
//    }
    public void setLocationCells(ArrayList<String> loc) {
        locationCells = loc;
    }

    // 设置名称
    public void setName(String n) {
        name = n;
    }

    public String checkYourself(String userInput) {
        String result = "miss";

        int index = locationCells.indexOf(userInput);

        if (index >= 0) {
            locationCells.remove(index);

            if (locationCells.isEmpty()) {
                result = "kill";
            } else {
                result = "hit";
            } // close if
        } // close outer if

        return result;
    }
//    public String checkYourself(String stringGuess) {
//        int guess = Integer.parseInt(stringGuess);
//        String result = "miss";
//
//        for (int cell: locationCells) {
//            if (guess == cell) {
//                result = "hit";
//                numOfHits++;
//                break;
//            }
//        }
//
//        if (numOfHits == locationCells.length) {
//            result = "kill";
//        }
//
//        System.out.println(result);
//
//        return result;
//    }
}
