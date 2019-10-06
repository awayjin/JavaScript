<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-8-7
 * Time: 上午10:13
 * To change this template use File | Settings | File Templates.
 */

//设置当前脚本无超时状态
//最大的执行时间，单位为秒。如果设置为0（零），没有时间方面的限制。
set_time_limit(0); //设置脚本最大执行时间

$data = "./06_2data.txt";
$time = time();
$bool = true;
echo 'ca';
while($bool){
    //判断文件存在
    file_exists($data) and
    //判断文件修改
    filemtime($data) > $time and
    //输出文件内容并断开HTTP
    die(file_get_contents($data));
    //清空文件状态缓存
    clearstatcache();
    sleep(1);
}

?>
