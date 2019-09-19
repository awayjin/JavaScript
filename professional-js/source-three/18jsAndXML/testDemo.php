<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-7-26
 * Time: 上午10:35
 * To change this template use File | Settings | File Templates.
 */

//
/*

3.0	文件的基本操作

    3.3 读取文件内容

*/
header("Content-type:text/html;charset=utf-8");

//a. fread读文件
//$filename = "http://www.baidu.com/";
$filename = "books.xml";
$handle = fopen($filename, "r");
$contents = fread($handle, 50);
echo $contents;
fclose($handle);

echo "<hr><hr><hr><hr><hr><hr>";
$cc = file_get_contents("http://www.baidu.com", NULL, NULL, 2, 4050);
echo $cc;
