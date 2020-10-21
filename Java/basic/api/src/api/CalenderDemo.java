package api;

import java.util.Calendar;
import java.util.Date;

public class CalenderDemo {
  public static void main(String[] args) {
    Calendar c = Calendar.getInstance();
    System.out.println(c);
    System.out.println(
        "YEAR: " + c.get(Calendar.YEAR) +
            ", m: " +  c.get(Calendar.MONTH) +
            ", day:" + c.get(Calendar.DAY_OF_MONTH)
    );

    // 设置年
    c.set(Calendar.YEAR, 3010);
    c.set(Calendar.MONTH, 2);
    c.set(Calendar.DAY_OF_MONTH, 8);



    System.out.println(
        "YEAR: " + c.get(Calendar.YEAR) +
        ", m: " +  c.get(Calendar.MONTH) +
        ", day:" + c.get(Calendar.DAY_OF_MONTH)
    );

    // 同时设置
    c.set(8888, 8, 8);
    System.out.println(
        "同时设置 YEAR: " + c.get(Calendar.YEAR) +
            ", m: " +  c.get(Calendar.MONTH) +
            ", day:" + c.get(Calendar.DAY_OF_MONTH)
    );

    // add 增加年
    c.add(Calendar.YEAR, 2);
    c.add(Calendar.MONTH, -3);
    System.out.println(
        "增加 YEAR: " + c.get(Calendar.YEAR) +
            ", m: " +  c.get(Calendar.MONTH) +
            ", day:" + c.get(Calendar.DAY_OF_MONTH)
    );

    // getTime 把日历变成日期
    Date time = c.getTime();
    System.out.println(time);

  }
}
