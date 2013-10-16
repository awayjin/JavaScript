
/*4.0
 *func: 通过类名取得元素引用
 */
//原生js取得class类名，直接传递名称即可
function getByClass(className, context, tagName){
	var context = context || document;
	//如果浏览器支持getElementsByClassName方法，直接返回
	if(context.getElementsByClassName){
		return document.getElementsByClassName(className);
	}
	
	var nodes = context.getElementsByTagName('*');
	var classArr = [];
	for(var i=0; i<nodes.length; i++){
		if(hasClass(nodes[i], className)){
			 //把符合的添加到数组中
			classArr.push(nodes[i]);
		}
	}
	return classArr;
}
//判断有没有传过来class类名
function hasClass(node, className){
	 //类名是空隔分开的
	var name = node.className.split(/\s/);
	for(var i=0; i<name.length; i++){
		if(name[i] == className){
			//alert(name[i])
			return true;
		}
	}
	return false;
}


/*6.0
 *func: 不同分辨率下弹出层居中
 *popCenter(clickId, popId, popClose)
 * clickId点击id, popId要弹出的容器id, popClose弹出层的关闭id
 *author: jinwei
 *email: awayInner@gmail.com
 *Date: 2012-08-07
 */

function popCenter(clickId, popId, popClose){
	var clickId = document.getElementById(clickId);	
	var popId = document.getElementById(popId);
	var popClose = document.getElementById(popClose);
	
	clickId.onclick = function(){
		popId.style.display = 'block'; //先显示以便于计算元素实际宽度
		var offsetWidth = popId.offsetWidth; //元素的宽度 包括边框
		var documentWidth = document.body.offsetWidth; //屏幕的宽度
		var scrollTop = document.documentElement.scrollTop + 50; //浏览器滚动条的大小
		
		//弹出层水平居中
		var centerX = (documentWidth - offsetWidth)*0.5;
		popId.style.cssText = "position:absolute; left:"+centerX+"px; top:"+scrollTop+"px; display:block";
	
	};
	
	popClose.onclick = function(){
		popId.style.display = 'none'; 
	}
}

