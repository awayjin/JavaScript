<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>XMLHttpRequest</title>
</head>

<body>
<script>
/*
alert(typeof XMLHttpRequest + ", "+Boolean(typeof XMLHttpRequest)); //undefined
alert(typeof XMLHttpRequest); //
if(typeof XMLHttpRequest){
	alert('为什么可以弹出，？'); 
}

alert(typeof XMLHttpRequst); //undefined
alert(Boolean(typeof XMLHttpRequst)); //true;
if(typeof XMLHttpRequst){
  //这个有if语句的时候js会自动调用转换函数Boolean,其实这个typeof XMLHttpRequst是字符串"undefined",而非数据类型undefined
}
*/

//ie6 解析XML字符串
//var xmldom = new ActiveXObject("MSXML2.DOMDocument.6.0");  
//xmldom.loadXML("<root><c></root>");;
//alert(xmldom);


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
		d.异步请求
			readyState
			0:未初始化。未调用open方法
			1:启动。 已调用open方法，但未调用send方法
			2:发送。 已调用send方法，但未收到响应 
			3:接收。	己接到部分响应数据 
			4: 完成。 接到全部响应数据，且可以在客户端使用。
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
var xhr = createXHR();

//同步请求
xhr.open("get", "example.xml", false);
xhr.send(null); //请求主题发达的数据 

if(xhr.status >= 200 || xhr.status<300){
/*	
alert("作为响应主体返回的数据:"+xhr.responseText
	   + "\n响应内容类型是text/xml或application/xml:" + xhr.responseXML
	   + "\n响应的HTTP状态:" + xhr.status
	   + "\nHTTP状态说明:" + xhr.statusText);
 */
}else{
	 alert("同步不成功"+xhr.status)
}

//异步请求
var xhr2 = createXHR();
xhr2.abort();

xhr2.onreadystatechange = function(){
	if(xhr2.readyState == 4){
		if(xhr2.status >= 200 || xht.status<300 || xhr2.status==304){
			alert("异步请求成功:"+xhr2.responseText);
		}
		else{
			alert("异步请求失败"+xhr2.responseText);
		}	
	}
}
xhr2.open("post", "example.txt", true)
xhr2.send(null);

</script>

</body>
</html>
