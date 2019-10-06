<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>XMLHttpRequest</title>
</head>

<body>
<form method="get" action="#">
 <label for="user-name">Name:</label><input type="text" name="user-nassme" /><br />
        <label for="user-email">Email:</label><input type="text" id="user-essmail" name="ss-email" /><br />
        <input type="submit" value="Submit"  />
</form>


<form id="user-info">
        <label for="user-name">Name:</label><input type="text" id="user-name" name="user-name" /><br />
        <label for="user-email">Email:</label><input type="text" id="user-email" name="user-email" /><br />
        <input type="button" value="Submit" onclick="submitData()" />


</form>
<script>
/*
  1.0 XMLHttpRequest对象
  	var xhr = new XMLHttpRequest();
	var xhr = new AcitveXObject("MSXML2.XMLHttp.6.0"); //ie6-
	
	1.1 xhr的用法
		a. open方法  
			xhr.open("get", "xx.txt", false)
			
		b. send请求主体发送的数据 
			xhr.send(null);
			
 		c. XHR对象的属性
 			xhr.responseText xhr.responseXML
			xhr.status 200 204 304
			xhr.statusText
			
		d. 异步请求
			readyState属性 abort方法 onreadystatechange事件
			0:未初始化。未调用open方法
			1:启动。 已调用open方法，但未调用send方法
			2:发送。 已调用send方法，但未收到响应 
			3:接收。	己接到部分响应数据 
			4:完成。 接到全部响应数据，且可以在客户端使用。
	
	 1.2 头部信息	
	 	a.设置请求头信息setRequestHeader
		b. 得到响应头信息 getResponseHeader getResonseAllHeaders();		
		
	 1.3 get请求
	 	 xhr.open("get", "example", true);
		 
	 1.4 post方法	 	
 */	 
 


//惰性载入函数
function createXHR(){
	//alert("第一次执行函数弹出，后面就不弹出了");
	if(typeof XMLHttpRequest !== 'undefined'){
		createXHR = function(){
			return new XMLHttpRequest();
		};	
	}else if(typeof ActiveXObject !== "undefined"){
		createXHR = function(){
			return new ActiveXObject("MSXML2.XMLHttp.6.0");
		};
	}	
	return createXHR();
}	

function submitData(){
	var xhr = createXHR();
	xhr.open("post", "postexample.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	xhr.send();	
}
submitData();


</script>



</body>
</html>
