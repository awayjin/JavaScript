<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-8-2
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
header('Content-Type:text/html; charset=utf-8');

set_time_limit(10);
//echo str_repeat(' ',1024);
//flush();

$i = 0;
while(true){
    echo "J-Number is:".$i;
    flush();

    sleep(5);

    $i++;
}

/*//设置文档类型，有些浏览器只解析HTML类型的文档
header('Content-Type:text/html; charset=utf-8');
//设置当前脚本为无超时状态
set_time_limit(0);
//先输出1KB的空格
//浏览器要接收一定量的数据之后才会开始解析
echo str_repeat(' ',1024);
flush();
//死循环
while(1){
    //输出当前时间
    echo date('Y-m-d H:i:s');
    //输出一个分隔符
    echo chr(1);
    //发送到客户都
    flush();
    //等待1秒
    sleep(1);
}*/

