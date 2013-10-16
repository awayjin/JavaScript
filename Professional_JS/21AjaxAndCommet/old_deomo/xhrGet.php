<!doctype html>
<html>
<head>
<meta charset="gb2312">
<title>无标题文档</title>
</head>

<body>
<div contenteditable="true">sdfdsf</div>
<script>
function createXHR(){
	if(typeof XMLHttpRequest !== 'undefined'){
		return new XMLHttpRequest();	
	}else if(typeof ActiveXObject !== 'undefined'){
		return new ActiveXObject("MSXML2.XMLHttp.6.0");	
	}
	
}
var xhr = createXHR();

xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		 if(xhr.status >=200 || xhr<300|| xhr==304){
			var text = decodeURI(xhr.responseText);
			alert("返回的数据:" + text);	 
		 }else{
			alert("请求失败");	 
		 }
	}
};

xhr.open("get", "example.php ?name=中自卫队", false);
xhr.send(null);

</script>

</body>
</html>