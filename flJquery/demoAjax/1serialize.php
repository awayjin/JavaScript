<?php 
	//header("Content-Type:text/html; charset=utf-8");
	//echo "<div class='comment'><h6>{$_REQUEST['username']}:</h6><p class='para'>{$_REQUEST['content']}</p></div>";
	  //echo "<div class='comment'><h6>{$_POST['username']}:</h6><p class='para'>{$_POST['content']}</p></div>";
	
	$link = mysql_connect("localhost", "root", "123") or die("账号错误:".mysql_error());  
	mysql_select_db("jwwebsite") or die("数据库连接错误:".mysql_error());
	
	$resulte = mysql_query("select name from users");  
	while($row=mysql_fetch_row($resulte)){
		foreach($row as $data){
			if($data == $_POST['username']){
				//echo "用户名已存在".$data."<br>";
				echo "用户名不可用！";
			}else{
				//mysql_query("insert into users(name) values(".$_POST['username'].")");
				echo "用户名可用！";
			}
		}
	}
	
/*	echo "cc中国";
	echo "<div class='comment'>
		<h6>".$_POST['username'].":</h6>
		<p class='para'>{$_POST['content']}</p>
	</div>";*/
?>
