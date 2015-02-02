<?php

header("Content-type: text/html; charset=utf-8");


sleep(2);
if($_POST['name2'] !== null){
    echo "form表单post提交过来的值:".$_POST["name2"];
    echo "<br>";
    echo "<br>";
}else{
    echo "get提交的值:".$_GET['name2']."\n  停止2秒 返回值 from php file...";
}
