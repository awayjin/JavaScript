<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
</head>
<?php
print_r(array(-99))
?>
<body>
<style>
li{ color:red; background-color:#999; width:150px;}
li:hover{ -webkit-transition:color 1s linear, background-color 1s linear, width 0.1s linear;  -moz-transition:color 1s linear, background-color 1s linear, width 0.2s linear;background-color:#900; color:#999; cursor:pointer; width:180px;}
.active{ color:green;}
</style>
<div class="test">
	<ul>
    	<li data-tab="111" >1</li>
        <li data-tab="222">2</li>
         <li data-tab="333">3</li>
    </ul>
</div>
<script src="/JavaScript/jQuery/jquery-1.5.1.js"></script>
<script>


$.fn.extend({
    tabs: function(){
        console.log("1:", this, $(this));
		var control = this;
		
		control.delegate("li", "click", function(){
			//$(this).addClass("active").siblings().removeClass("active");
			var tabName = $(this).attr("data-tab");
			control.trigger("change.tab", tabName);
			
		});	
		
		
		control.bind("change.tab", function(e, tabName){
			control.find("li").removeClass("active");
			control.find(">[data-tab="+tabName+"]").addClass("active");	
		});
		
		var firstName = control.find("li:first").attr("data-tab");
		control.trigger("change.tab", firstName);
		
		

    }
	
	
	
});
$(".test ul").tabs();

$.extend({
	tabs: function(){
        console.log("2:", this, $(this))
    }
});

/*

$.fn.tabs=function(){
        console.log(this, $(this))
    } 
$.fn = {
    tabs: function(){
        console.log(this, $(this))
    }
}*/
//$("body").tabs();
//$.tabs();



//自定义事件
jQuery.fn.tabs22 = function (control) {
    var element = $(this);
    control = $(control);
    //初始化完毕

    element.delegate("li", "click", function () {
        //找到需要修改的目标
        var tabName = $(this).attr("data-tab");
        //点击选项卡触发自定义事件
        element.trigger("change.tabs", tabName);
		//console.log(element, tabName)
    });

    element.bind("change.tabs", function (e, tabname) {
        element.find("li").removeClass("active");
        element.find(">[data-tab='" + tabname + "']").addClass("active");
    });

    var firstName = element.find("li:first").attr("data-tab");
    element.trigger("change.tabs",firstName);

    return this;
}

//$(".test ul").tabs("ul");
</script>


<div class="delegate">
    <button>button</button>
	<span>sss</span>
</div>

<p></p>

<script>
	$(".delegate").delegate("button", "click", function(){
		console.log(this, $(this))
		$(".delegate span").toggle("fast");	
	});
	
	//自定义事件
	$("p").bind("myEvent", function(event, msg1, msg2){
		//alert(msg1+msg2);
	});
	//$("p").trigger("myEvent", ["c1", "c2"]);
	
</script>
</body>
</html>