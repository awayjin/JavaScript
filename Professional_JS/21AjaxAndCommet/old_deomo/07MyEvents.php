<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-8-6
 * Time: 上午10:04
 * To change this template use File | Settings | File Templates.
 */
header("Content-type:text/event-stream;charset=utf-8");
//每次都会访问服务器
header("Cache-control:no-cache");
date_default_timezone_set("PRC");

//RFC 822 格式的日期 例如：Thu, 21 Dec 2000 16:01:07 +0200
$time = date("H:i:s, Y-M-d");
echo "\ndata: The server time is: {$time}";
//
sleep(1);
//刷新输出缓存 默认5s一次
flush();

//for($i=0; $i<10; $i++){
//    echo "<br>abc:".$i;
//    flush();
//    ob_flush();
//    sleep(1);
//}