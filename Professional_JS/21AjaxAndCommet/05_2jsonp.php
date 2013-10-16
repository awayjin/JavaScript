<?php
if($_GET['callback'] == 'jwTest'){
    echo 'handleResponseFunc({"name": "jinwei"})';
//  echo 'handleResponseFunc({"ip":"202.104.122.216","country_code":"CN","country_name":"China","region_code":"30","region_name":"Guangdong","city":"Guangzhou","zipcode":"","latitude":23.1167,"longitude":113.25,"metro_code":"","areacode":""})';

}


$obj = array("sky"=> 'skyblue', 'author'=> 'jQ json name');

//获取传入的参数名
$callback = $_GET["callback"];
if(!$callback){
    $callback = jqJSONResponse;
}
//echo $callback.'('.json_encode($obj).');';
