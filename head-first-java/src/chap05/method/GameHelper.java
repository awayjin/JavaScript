package chap05.method;
import java.io.*;
import java.util.ArrayList;

/**
 * Created by jinw01 on 2019/1/15.
 */
public class GameHelper {
    public String getUserInput (String prompt) {
        String inputLine = null;
        System.out.println(prompt + "  ");
        try {
            BufferedReader is = new BufferedReader(
               new InputStreamReader(System.in)
            );
            inputLine = is.readLine();
            if (inputLine.length() == 0) return null;
        } catch (IOException e) {
            System.out.println("IOException:" + e);
        }
        return inputLine;
    }

    public ArrayList<String> placeDotCom(int num) {
        ArrayList<String> alphaCells = new ArrayList<String>();
        return alphaCells;
    }
}
