<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-8-8
 * Time: 上午10:00
 * To change this template use File | Settings | File Templates.
 */

//$data = file_get_contents("06_2data.txt");
//echo $data;

$data = "06_2data.txt";
echo filemtime($data);
echo "<br>";
echo time();

echo "<br>";
die(file_get_contents($data));

