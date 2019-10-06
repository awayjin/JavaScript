<?php
//header("Content-type:text/html; charset=gb2312");

$ghk = iconv("utf-8", "gb2312", "中国 ");
echo $_GET['name'];	

//header("Location: http://www.php.net"); 

//header — Send a raw HTTP header

//重定向
//header("location:http://www.baidu.com");

 // 范例三: 让使用者的浏览器出现找不到档案的信息。 
    //header("Status: jinwei-404 Not Found");
	//header("myheader: value22");
	 
if($_POST["name"] == 'post13'){

	echo "\nca:".$_POST["name2"];
	
	foreach(getallheaders() as $name =>$value){
		//echo $name.":".$value."\n";
	}
	
	//最得所有请求头信息
	$header = getallheaders();//Fetch all HTTP request headers
	
	$keys = array_keys($header);
	foreach($header as $key => $value){
		if($value == "value2"){
			//echo $key;	
		}
	}
	//echo "\n ".$header["myheader"];
	//echo "\n".;

}
?>