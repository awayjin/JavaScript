<?php
/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-9-5
 * Time: 下午5:46
 * To change this template use File | Settings | File Templates.
 */

//<!--jsonp = {name:'jack'};-->

$arr = array("name"=> 'jack');

if(!$_GET['callback']){
    $jsonp = 'jsonp';
}else{
    $jsonp = $_GET['callback'];
}

echo $jsonp.'='.json_encode($arr);

//echo "jsonp = {name:'jack'}";