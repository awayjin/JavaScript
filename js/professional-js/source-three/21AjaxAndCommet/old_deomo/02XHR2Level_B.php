<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>XMLHttpRequest</title>
<script src="/js/jq.js"></script>

</head>

<body>

<header style="" class="transform">
<style>
.transform{-webkit-transform:rotate(30deg);-moz-transform:rotate(-30deg); border:1px solid #35b9ff; color: red; width:150px; height:30px;}
</style>
	rotate transform
</header>
  
<form method="get" action="02XHR2Level.php#">
 <label for="user-name">Name:</label><input type="text" name="user-nassme" /><br />
        <label for="user-email">Email:</label><input type="text" id="user-essmail" name="ss-email" /><br />
        <input type="button" value="Submit"  />
</form>


<form id="user-info">
        <label for="user-name">Name:</label>
        	<input type="text" id="user-name" name="user-name" autocomplete="on" /><br />
        <label for="user-email">Email:</label>
        <input type="text" id="user-email" name="user-email" autocomplete="default" /><br />
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
	 		setRequestHeader("Content-type", "x-www-form-urlencoded");	
	 
   2.0 XMLHttpRequest 2级
      2.1 FormData	
	  	 a.序列化表单 b.创建与表单格式相同的数据
	  
	  2.2 超时设定
	  	ontimeout事件
	
	  2.3 重写MIME类型 overrideMimeType
		  	
 */

function createXHR(){
    if(typeof XMLHttpRequest != 'undefined'){
        return new XMLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
        return new ActiveXObject("MSXML2.XMLHttp.6.0");
    }
}

var xhr = createXHR();
xhr.open("post", "example_B.php");
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
        var status = xhr.status;
        if(status >= 200 && status<300 || status===304 ){
            console.log("1.0:", xhr.responseText);
//            console.log(xhr.responseText, xhr.responseXML)
        }
    }
};
//xhr.overrideMimeType("text/xml");
xhr.send(null);





</script>



</body>
</html>
