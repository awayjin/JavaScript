/*
通用数据水平层级选择控件
作者：jinwei
版本：v1.00
E-Mail:258246377@qq.com
修改时间：2012年2月10日
other:这里要感谢前作者-绿豆膏，所做的贡献，我把很多不好的地方重写了。使得用户体验更好
*/
(function(){
/***************************************************************************************************************/
  $.openLayer = function(p){
		var param = $.extend({
				maxItems : 5, //能选择的城市个数
				showLevel : 5, //显示级别
				width : 650,
				oneLevel : true,	//是否限制选择相同级别的数据，可以不为同一个父节点，
								//false为不限制，可以同时选择不同级别的数据，true为限制。
				shared : true,
	 			index : 1,						//如果页面中有多于1个的弹出选择,如果不共享之前的操作界面则必须设置不同的index值，否则不同的弹出选择共享相同的操作界面。
				title : "通用城市选择器v1.00",
				pid : 0,
				url : "",
				cacheEnable : true,
				span_width : { d1:120,d2:120,d3:150 },
				splitChar : ",:",
				returnValue : "", //以，分隔的选取结果id存放的位置id，默认为一个input。
				returnTxts : ""	 //返回的value值，
			
		},p ||{});
		
		var fs = {
			init_Container : function(){ //初始化头部和内容容器
				var Title = param.title+",你最多能选择"+param.maxItems+"项！";
				var Close = "<span style='cursor:pointer;' id='_cancel'>[取消]</span>&nbsp;&nbsp;<span style='cursor:pointer;' id='_ok'>[确定]</span>";
				var htmlDiv = "<div id='heads'><div id='headdiv'><span id='title'>" + Title + "</span><span id='close'>" + Close + "</span></div></div>";
				htmlDiv += "<div id='container'></div>";
				return htmlDiv;
			},
			init_area : function(){ //初始化数据容器
				var _container = $("#container");
				var selArea = $("<div id='selArea'><div>已选择项目：</div></div>");
				_container.append(selArea);	
				
				//if(param.maxItem == 1){ selArea.hide(); };
				
				//初始化第一层级数据容器，以后各级容器都clone本容器
				var d1 = $("<div id='d1'></div>");
				var dc = $("<div id='dc'></div>");
				_container.append(dc, d1);
				dc.hide();
				fs.add_data(d1); //添加数据
			},
			add_data : function(targetid){
				targetid.nextAll().remove();				//删除目标容器之后的所有同级别容器
				//$("#d2").nextAll().remove();

				var pid = param.pid;
				var url = param.url;
				var data = "";
				if(param.cacheEnable){ data = _cache[pid]; }//如果cache开启则首先从cache中取得数据
				//var span_width = eval("param.span_width." + targetid.attr("id"));
				//alert(span_width);
				//cache和ajax都没有数据或者错误,添加提示信息返回
				
				if(data == "" || data == null){
					//targetid.empty().show().append($("<span style='color:red;'>没有下级数据！</span>"));
					return;
				}
	
				var span_width = eval("param.span_width."+targetid.attr("id"));			//每个数据显示项的宽度
				var dat = data.split( param.splitChar.charAt(0) ); //第一次分隔数据
				//alert(dat instanceof Array); //true
				var html =[];
				var ss =[]; //第二次分隔数据 保存数组
				for(var i=0; i<dat.length; i++){
					ss = dat[i].split(param.splitChar.charAt(1)); //第二次分隔数据
					html.push("<span style='width:"+span_width+"px;white-space:nowrap;float:left;' name='"+pid+"' title='"+dat[i]+"'>");
					html.push("<input type='checkbox' value='"+ss[0]+"' name='"+ss[1]+"'>");
					//html.push("<input type='checkbox' value='" + ss[0] + "'>");
					html.push("<span style='margin-left:3px;' name='"+targetid.attr("id")+"'>"+ss[1]+"</span>");
					html.push("</span>");
				}
				
				targetid.empty().show().append( $(html.join("")) );		//格式化的html代码放入目标容器
				//targetid.empty().append( $(html.join("")) );
				if(param.maxItem > 1){ fs.change_status(targetid); }
				fs.add_input_event(targetid); //加入input的绑定事件
				fs.add_span_event(targetid); //span元素的绑定事件
			},
			init_event : function(){		//绑定已选择框中checkbox的事件，确定，取消事件响应
				var selArea = $("#selArea");
				selArea.find(":input").live("click", function(){
					//取消选中状态
					$("#container").find(":input[value='"+this.value+"']").attr("checked", false);
					$(this).parent().remove();	//删除点击的包含input
				});
				$("#_cancel").click(function(){ //取消事件 
					$("#bodybg, #popupAddr").hide();
				});
				$("#_ok").click(function(){ //确定按钮
					 var vals="",txts="";
					 $("#selArea").find(":input").each(function(){
						 vals += ("+" + this.value); //选中的ID号（也就是独立的value号）
						 txts += ("+" + $(this).next().text()); //选中的文字值
					 });
					 fs.set_returnValue(param.returnValue, vals); //设置
					 fs.set_returnValue(param.returnTxts, txts);
					 
					// $("#_cancel").click();
					$("#bodybg").hide();
					$("#popupAddr").fadeOut();
				
				});
			},
			add_input_event: function(targetid){
				var selArea = $("#selArea");
				//alert(targetid.attr("id")) //d1 d2
				targetid.find(":input").click(function(){ //点击input元素
					  if(param.maxItems == 1){
						  	selArea.find("span").remove();
							targetid.find("input").not($(this)).attr("checked", false);
							selArea.append($(this).parent().clone());
							$("#_ok").click();
					  }else{
						    if( this.checked && fs.check_num(this) && fs.check_level(this) ){
								//复制一份省份添加到容器里
								selArea.append($(this).parent().clone().css({"width":"","background":"","border":""})); 
							}else{
								selArea.find(":input[value="+this.value+"]").parent().remove(); //再一次点击 删除
							}		
					  }
					
				});
			},
			add_span_event: function(targetid){
				  var thislevel = parseInt(targetid.attr("id").substring(1)); //取得层级数字
				  var spans = targetid.children("span"); //id="d1"下的子元素span
				//  var spans = $("#d1").children("span");
				  spans.unbind().bind("mouseover", function(){ //鼠标滑过
				 	  spans.css({"background":"","border":"","margin":""});
					  $(this).css({"background":"orange","border":"1px ridge","margin":"-1"});//添加选中背景颜色
					  
					  if($(this).parent().is("#d2")){//如果鼠标滑到第二层（市级）则退出函数，不加载新的数据
						  return false;
					  }
					  
					   var next=$("#dc").clone(); //复制一份容器
						   next.attr("id","d"+(thislevel+1)); //把
						   targetid.after(next);
						  
					 	var offset = $(this).offset();//获取匹配元素在当前视口的相对偏移
						//这个要注意。 必须得减去最外层容器的宽、高。 因为子标签#d2的袓标签已经设置了position:absolute,所以它用
						//父标签来当作相对元素
						var offset_left = parseInt(offset.left)-$("#popupAddr").offset().left; //当前x轴位置
						  var offset_top = parseInt(offset.top)-$("#popupAddr").offset().top; //当前y轴位置
						var obj = $("#d2");//显示市级地区
						obj.css({
							  position : "absolute",
							  left : offset_left+80, 
							  top : offset_top, 
							  "z-index" : 710 
						});
						
						  param.pid = $(this).children("span").prev().val(); //取得鼠标滑过value的值
						  //alert(next.attr("id"))
						  fs.add_data(next);
						  //fs.add_data("<div id='d2'></div>");
						
				  });
				  
				  spans.children("span").click(function(){ //点击span标签
//						  var next=$("#dc").clone(); //复制一份容器
//						  next.attr("id","d"+(thislevel+1)); //把
//						  targetid.after(next);
//				  
//						  spans.css({"background":"","border":"","margin":""}); //去掉选中背景
//						  $(this).parent().css({"background":"orange","border":"1px ridge","margin":"-1"});//添加选中背景颜色
//						  param.pid = $(this).prev().val();
//						  //alert($(this).prev().val());
//						  fs.add_data(next);
		
				  });	
				  
			},
			check_num: function(obj){ //检查已选择项目的数量
				var selArea = $("#selArea");
				//alert(obj) //input
				if(selArea.find(":input").length < param.maxItems){
					return true;
				}else{
					obj.checked = false;
					alert("你最多只能选择"+param.maxItems+"项！");
					return false;	
				}
			},
			check_level: function(obj){//检查选择是否同一级城市(省份)
				var selobj = $("#selArea > span");
				if(selobj.length == 0 ){ return true; }
				
				var oneLevel = param.oneLevel;
				if(oneLevel == false){ //不限制城市选择级别
					//var selValue = $("#selArea").find("input").attr("value"); //已选择元素的级别(value值)
					var thisValue = $(obj).attr("value"); //当前点击input元素(value值)
					//alert(thisValue);//这里只能选择第一个
					
					//alert($(obj).attr("value"));
					//$("#selArea").find(":input[value="+$(obj).attr("value")+"]").parent().remove(); //再一次点击 删除
					
					var selValue =[];
					$("#selArea").find("input").each(function(i){
						
						selValue.push($(this).attr("value")); //已选择的input元素valu值
						//alert(selValue instanceof Array);
						
						
						if(selValue.length == 0){
							return true;	
						}else{
							if(selValue[i].substring(0,2) == thisValue.substring(0,2) && (selValue[i].substring(2,5)=='00')){
								//alert(selValue[i]);
								$(this).parent().remove();
							}else if(selValue[i].substring(0,2) == thisValue.substring(0,2) && (selValue[i].substring(2,5)!='00')){
								//selValue[i].parent().remove();
								
								if(selValue[i].substring(2,5)=='00'){
									alert(23)
									$(this).parent().remove();
								}else{
									alert(33)
								}
							}
						}
						
					});
					
					return true;	
				}else{ 
					var selLevel = selobj.find("span").attr("name"); //d1(d2) 已选择元素的级别(name值)
					var thisLevel = $(obj).next().attr("name"); //d1 or d2 当前元素级别别(name值)
					//alert(selLevel) //d1(d2)
					//alert(thisLevel); //d1 or d2
					if(selLevel != thisLevel) { //不是同一级的
						obj.checked = false;
						alert("当前设定只允许选择同一级别的元素！");
						return false;
					}else{
						return true;	
					}
				}
			},
			set_returnValue: function(id, vals){ //按"确定"按钮时处理、设置返回值
				if(id != ""){
					var id = $("#" + id);
					if(id.length > 0 ){
						 if(id.is("input")){
							//alert(vals)
							id.val(vals.substring(1));
						  }else{
							 // alert(vals)
							id.text(vals.substring(1));
						  }
					}
				}
			},
			init_style : function(){
				var _margin = 4;
				var _width = param.width-_margin*5;
	
				var css = [];
				var aotu = "border:2px groove";
				<!--css.push("#popupAddr {position:absolute;border:3px ridge;width:"+param.width+"px;height:auto;background-color:#e3e3e3;z-index:301;-moz-box-shadow:5px 5px 5px rgba(0,0,0,0.5);box-shadow:5px 5px 5px rgba(0,0,0,0.5);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5,OffY=5,Color=gray);-ms-filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=5,OffY=5,Color='gray');}");-->
				css.push("#popupAddr {position:absolute;border:3px ridge;width:"+param.width+"px;height:auto;background-color:#e3e3e3;z-index:301;-moz-box-shadow:5px 5px 5px rgba(0,0,0,0.5);box-shadow:5px 5px 5px rgba(0,0,0,0.5);}");
				css.push("#bodybg {width:100%;z-index:300;position:absolute;top:0;left:0;background-color:#000;opacity:0.1;filter:alpha(opacity =10);}");
				css.push("#heads {width:100%;font-size:12px;margin:0 auto;}");
				css.push("#headdiv {color:white;background-color:green;font-size:13px;height:25px;margin:1px;" +aotu+"}");
				css.push("#title {line-height:30px;padding-left:20px;float:left;}");
				css.push("#close {float:right;padding-right:12px;line-height:30px;}");
				css.push("#container {width:100%;height:auto;}");
				css.push("#selArea {width:"+_width+"px;height:48px;margin:"+_margin+"px;padding:5px;background-color:#f4f4f4;float:left;"+aotu+"}");
				css.push("#pbar {width:"+_width+"px;height:12px;margin:4px;-moz-box-sizing: border-box;display:block;overflow: hidden;font-size:1px;border:1px solid red;background:#333333;float:left;}");
		
				var d_css = "{width:"+_width+"px;margin:"+_margin+"px;padding:5px;height:auto;background-color:khaki;float:left;"+aotu+"}";
				css.push("dc "+d_css);
				for (i = 1; i <=param.showLevel; i++) { css.push("#d" + i + " " + d_css); }
				if($("#popupAddr").length == 0){
					$("head").append($("<style>"+css.join(" ")+"</style>"));
				}
			}
		};
		if(window._cache == undefined || !param.shared ){ _cache={}; }
		if(window._index == undefined ){ _index = param.index; }

		fs.init_style(); //初始化样式
		
		var popupDiv = $("#popupAddr"); //创建数据最外层包含框
		if(popupDiv.length == 0 ){
			var popupDiv = $("<div id='popupAddr'></div>");
			$("body").append(popupDiv);
		}
		var yPos = ($(document).height()-popupDiv.height()) / 3;
		var xPos = ($(window).width()-popupDiv.width()) / 2;
		popupDiv.css({
			position : "absolute",
			left : xPos,
			top : yPos
		});
		
		var bodyBack = $("#bodybg");
		if(bodyBack.length == 0){
			var bodyBack = $("<div id='bodybg'></div>");
			bodyBack.height($(document).height());
			$("body").append(bodyBack);
			
			popupDiv.html(fs.init_Container());	//弹出层内容
			fs.init_area(); //初始化数据容器
			fs.init_event(); ////绑定已选择框中checkbox的事件，确定，取消事件响应
			
		}else{
			//$("#bodybg, #popupAddr").show();
			if(_index != param.index){
				popupDiv.html(fs.init_Container());
				fs.init_area();
				fs.init_event();
				_index = param.index;
			}
		}
		
		bodyBack.show();
		popupDiv.fadeIn();
	  
  };

	$("#popupAddr").live("mouseleave", function(){
		$("#d2").hide();	
	})
	
/***************************************************************************************************************/		  
})(jQuery);


_cache ={"0":"0100:北京市,0200:上海,0300:广东省,0500:天津市,0600:重庆市,0700:江苏省,0800:浙江省,0900:四川省,1000:海南省,1100:福建省,1200:山东省,1300:江西省,1400:广西,1500:安徽省,1600:河北省,1700:河南省,1800:湖北省,1900:湖南省,2000:陕西省,2100:山西省,2200:黑龙江省,2300:辽宁省,2400:吉林省,2500:云南省,2600:贵州省,2700:甘肃省,2800:内蒙古,2900:宁夏,3000:西藏,3100:新疆,3200:青海省,3300:香港,3400:澳门,3500:台湾,3600:国外"
,"0300":"0302:广州市,0303:惠州市,0304:汕头市,0305:珠海市,0306:佛山市,0307:中山市,0308:东莞市,0310:从化市,0314:韶关市,0315:江门市,0316:增城市,0317:湛江市,0318:肇庆市,0319:清远市,0320:潮州市,0321:河源市,0322:揭阳市,0323:茂名市,0324:汕尾市,0325:顺德市"
,"0700":"0702:南京市,0703:苏州市,0704:无锡市,0705:常州市,0706:昆山市,0707:常熟市,0708:扬州市,0709:南通市,0710:镇江市,0711:徐州市,0712:连云港市,0713:盐城市,0714:张家港市"
,"0800":"0802:杭州市,0803:宁波市,0804:温州市,0805:绍兴市,0806:金华市,0807:嘉兴市,0808:台州市,0809:湖州市,0810:丽水市,0811:舟山市,0812:衢州市"
,"0900":"0902:成都市,0903:绵阳市,0904:乐山市,0905:泸州市,0906:德阳市,0907:宜宾市,0908:自贡市,0909:内江市,0910:攀枝花市"
,"1000":"1002:海口市,1003:三亚市"
,"1100":"1102:福州市,1103:厦门市,1104:泉州市,1105:漳州市,1106:莆田市,1107:三明市,1108:南平市,1109:宁德市,1110:龙岩市"
,"1200":"1202:济南市,1203:青岛市,1204:烟台市,1205:潍坊市,1206:威海市,1207:淄博市,1208:临沂市,1209:济宁市,1210:东营市,1211:泰安市,1212:日照市,1213:德州市"
,"1300":"1302:南昌市,1303:九江市"
,"1400":"1402:南宁市,1403:桂林市,1404:柳州市,1405:北海市"
,"1500":"1502:合肥市,1503:芜湖市,1504:安庆市,1505:马鞍山市,1506:蚌埠市,1507:阜阳市,1508:铜陵市,1509:滁州市,1510:黄山市,1511:淮南市,1512:六安市,1513:巢湖市,1514:宣城市,1515:池州市"
,"1600":"1602:石家庄市,1603:廊坊市,1604:保定市,1605:唐山市,1606:秦皇岛市,1607:沧州市"
,"1700":"1702:郑州市,1703:洛阳市,1704:开封市"
,"1800":"1802:武汉市,1803:宜昌市,1804:黄石市,1805:襄樊市,1806:十堰市,1807:荆州市,1808:荆门市,1809:孝感市,1810:鄂州市"
,"1900":"1902:长沙市,1903:株洲市,1904:湘潭市,1905:衡阳市,1906:岳阳市,1907:常德市,1908:益阳市,1909:郴州市,1910:邵阳市,1911:怀化市,1912:娄底市,1913:永州市,1914:张家界市,1915:吉首市"
,"2000":"2002:西安市,2003:咸阳市,2004:宝鸡市,2005:铜川市,2006:延安市"
,"2100":"2102:太原市,2103:运城市,2104:大同市,2105:临汾市"
,"2200":"2202:哈尔滨市,2203:伊春市,2204:绥化市,2205:大庆市,2206:齐齐哈尔市,2207:牡丹江市,2208:佳木斯"
,"2300":"2302:沈阳市,2303:大连市,2304:鞍山市,2305:营口市,2306:抚顺市,2307:锦州市,2308:丹东市,2309:葫芦岛市,2310:本溪市,2311:辽阳市,2312:铁岭市"
,"2400":"2402:长春市,2403:吉林市,2404:辽源市,2405:通化市"
,"2500":"2502:昆明市,2503:曲靖市,2504:玉溪市,2505:大理市,2506:丽江市,2507:蒙自市,2508:开远市,2509:个旧市,2510:红河州"
,"2600":"2602:贵阳市,2603:遵义市"
,"2700":"2702:兰州市,2703:金昌市"
,"2800":"2802:呼和浩特市,2803:赤峰市,2804:包头市"
,"2900":"2902:银川市"
,"3000":"3002:拉萨市,3003:日喀则市"
,"3100":"3102:乌鲁木齐市,3103:克拉玛依市,3104:喀什地区市"
,"3200":"3202:西宁市"
,"1607":"16071:黄骅市,16072:海兴,16073:盐山,16074:孟村"
,"1602":"16021:正定,16022:无极,16023:新华区"
,"16071":"160711:城关镇,160712:吕桥镇,160713:齐家务,160714:官庄乡,160715:李村,160716:黄骅港"};						//缓存

