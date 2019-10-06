<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-8-7
 * Time: 上午10:13
 * To change this template use File | Settings | File Templates.
 */
//最大的执行时间，单位为秒。如果设置为0（零），没有时间方面的限制。
//set_time_limit(0);

require("../../../xs_php/FirePHPCore/fb.php");

$time = time();
$data = "06_2data.txt";
fb(filemtime($data));
fb($time);

while(true){
  file_exists($data) and
  //判断文件修改
  filemtime($data) > $time and
  //输出并断开Http
  die(file_get_contents($data));
    // 清除文件状态缓存
    clearstatcache();
//    sleep(1);
}

?>
