package api;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateDemo01 {
  public static void main(String[] args) throws ParseException {
    System.out.println(System.currentTimeMillis());
    System.out.println("----------");
    demo01();
    System.out.println("-----new date(0l)-----");
    demo02();
    System.out.println("----getTime------");
    demo03();
    System.out.println("----Calendar------");
    demo04();
    System.out.println("----DateFormat------");
    demo05();
    System.out.println("----Parse------");
    demoParse();
  }

  private static void demoParse() throws ParseException {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM-dd HH:mm:ss");
    Date dateParse = sdf.parse("2020年10-19 10:09:33");
    System.out.println(dateParse);
  }

  private static void demo05() {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("y-M-d k:mm:s");
    SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    String formatDate = sdf.format(date);
    String formatDate2 = sdf2.format(date);
    System.out.println(formatDate);
    System.out.println(formatDate2);
  }

  private static void demo04() {
    Date date = new Date();
    long times = date.getTime();
    System.out.println(times);
    int year = Calendar.YEAR;
    System.out.println(year);;

  }

  private static void demo03() {
    Date date = new Date();
    System.out.println(date.getTime());
    System.out.println(new Date(date.getTime()));
  }

  private static void demo02() {
    // 1000 * 60 * 60 * 24 * 365 一年 31536000000
    Date date = new Date(31536000000l * 51);
    Date date2 = new Date(0l);
    System.out.println(date);
    System.out.println(date2);
  }

  private static void demo01() {
    Date date = new Date();
    System.out.println(date);
    System.out.println(date.getYear());
  }
}
