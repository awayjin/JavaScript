/**
 * 视频
 */
HW.videoList = (function () {
	
	var myScroller;
    //侧栏_动画效果
    function _mySidebarAll($id1,$id2,$id3){
        /*
         * $id1 左边ID / $id2 侧栏ID / $id3 按钮ID
         * */
        var sidebar_left=$("#"+$id2),sidebar_right=$("#"+$id1),sidebar_btn=$("#"+$id3);
        function _mySwipeleft(){
            sidebar_right.removeClass("scroller-hide").addClass("scroller");
            sidebar_left.removeClass("hide").addClass("leftAbso left2");
        }
        function _mySwiperight(){
            sidebar_right.removeClass("scroller").addClass("scroller-hide");
            sidebar_left.addClass("hide").removeClass("leftAbso left2");
        }
        sidebar_btn.unbind("click").bind("click swiperight",function(oEnt){
            oEnt.stopPropagation();
            if(sidebar_left.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        sidebar_left.unbind("click").bind("click",function(oEnt){
            var oE=$(oEnt.target);
            if(oE.attr("class")!="cePage" && !oE.parent(".cePage").length){
                sidebar_left.addClass("hide").removeClass("leftAbso left2");
                sidebar_right.removeClass("scroller");
            }
        });
        sidebar_left.swipeleft(function(){
            _mySwipeleft();
        })
        sidebar_left.swiperight(function(){
            _mySwiperight();
        })
    };
	
	//顶部下拉列表
	function _videoSelect(){
		var videoSelect = $(".video_select"),
			videoArr = $(".video_arr");
		
		videoArr.unbind("click").click(function(){
			var button = $(this).find("b");
			if(button.hasClass("cur")){
				button.removeClass("cur");
				videoSelect.slideUp(200);
			}
			else{
				button.addClass("cur");
				videoSelect.slideDown(200);
			}
		});
		videoSelect.find("li").click(function(){
			$(this).addClass("cur").siblings().removeClass("cur");
			videoArr.find("span").html($(this).text());
			setTimeout(function(){videoArr.trigger("click")},200)
		});
	};
	

	function getJsonp(){
		$.ajax({
				type: "GET",
				dataType: "jsonp",
			    url: HW.GlobalState.baseUrl + "/productnode/productnode/getMediaResults.json",

				cache: false,
				timeout:20000,
				data: {
                    deviceid: "1234",
                    imeiid: "12345",
                    lang: HW.GlobalState.appConifg.currentLang,
                    userid:HW.GlobalState.user.userId,
					"mid":"M_VIDEO",
					"limit":"10000",
				    "offset":"0"
				},
				success: function (data) {

					if(data != null && data.head != null && data.head.errorcode == 0){
						buildVideoList(data.body)
					}else{
						console.log('video 获取数据错误， data='+$.toJSON(data));
					}
				},
				error: function(){
					console.log('video JSONP调取失败');

				}
		});
		
	}
	
	function buildVideoList(body){
		var imgUrlbase = HW.GlobalState.baseUrlimg;//'http://support-trial.huawei.com/carrier/contentview!getImgFileStream.action?uuid=';
		if(body != null && body.productdocumentdos != null){
			if(body.productdocumentdos.length > 0){
				var listHtml = new StringBuffer();
				for(var i=0;i<body.productdocumentdos.length;i++){
					listHtml.append('<li id="');
					listHtml.append(i);
					listHtml.append('" onclick=HW.videoList.listItemOnclick("');
					listHtml.append(body.productdocumentdos[i].documentid);
					listHtml.append('")><a href="#"><img src="');
					if(body.productdocumentdos[i].img != ''){
						listHtml.append(imgUrlbase+body.productdocumentdos[i].img);
					}else{
						listHtml.append('../skin/default/images/df_video_icon.png');
					}
					listHtml.append('"><p><span>');
					listHtml.append(body.productdocumentdos[i].documentname);
					listHtml.append('</span></p></a></li>');
				}
				$("#videolistContainer").html(listHtml.toString());

                var width = HW.Tools.getStyle($("#videolistContainer").find("img")[0],"width");



                $("#videolistContainer img").each(function(i,val){
                    $(val).css("width",width);
                    $(val).css("height",width);
                    $(val).load(function(){
                        myScroller.refresh();
                    });
                });
			}else{
				console.log('video 数据为 空');
			}
		}else{
			console.log('video 数据错误，为 null');
		}
	}
	
	return{
		pageConfig: {
            name: 'videoList',
            id: 'videoList',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
			'onlyExecNotAjax':true
        },
        
        showData: function (data) {
        	myScroller = HW.Tools._addiScroll('videolist_wapper','videolist_scroller',0,0,0,0);
        	myScroller.refresh();
        	getJsonp();
			_videoSelect();
			
            _mySidebarAll("videoList_left_Sidebar","videoList_right_Sidebar","videoList_rightbtn");
            
            
        }
	}

})();

HW.videoList.NativeIntf = {
		videoPlayback:'videoPlayback:',
		videoDownLoad:'videoDownLoad:'
}

HW.videoList.listItemOnclick = function(documentid){
	//var videoUrl = 'http://dsdp-beta.huawei.com/carrier/contentview!getFileStream.action?mid=SUP_DOC&viewNid='
	var videoUrl = HW.GlobalState.baseUrl +'/productnode/productnode/getVideo.json?'+
    'docid=' + documentid  + '&partno=6001&type=.mp4';

	var json = {
		url:videoUrl
	}
	window.location.href = HW.videoList.NativeIntf.videoPlayback+$.toJSON(json);
};

//使用前，需要先注册 Demo对象
HW.Core.addModule("videoList", HW.videoList);

//加载Demo页面的数据
HW.Core.loadPage("videoList");

