/**
 * 公告详情
 * 1、页面载入后----获取参数----获取数据------展示数据
 * 2、附件下载----点击下载按钮----弹出下载框----点击下载，调用native接口下载或是使用web自带的下载功能下载；
 */
HW.BulletinDetail=(function(){
    //公告正文ID参数
    var _id="",_newsTitle="", _newsDate="",_myScroll=null;
    var _handleImg = function () {
        var oHtml = $("pre").html();
        $("<div>" + oHtml + "</div>").replaceAll("pre");
        //先处理外链添加提示，提示用户将使用浏览器打开页面
        if (HW.GlobalState.container == "native") {
           var oAlink = $("#bulletinDetailBox a");
           oAlink.each(function(i,e){
               var curAlink =$(e);
               curAlink.unbind().bind("click",function(e){
                   simpleDialog.confirm({content:HW.lang.getLocalString('browserPage'),buttons:{
                       ok:function(){
                           var href='showRegisterPage:{"url":"'+curAlink.attr("href")+'"}';
                           window.location.href = href;
                       }
                   }
                   });
                   e.preventDefault();
                   return false;
               });
           })
       }
        //图片处理，包装上a标签，给终端用，web中则在新窗口中打开图片。
        var oImg = $("#bulletinDetailBox img");
        oImg.each(function (i, n) {
            //先去掉 width与height属性
            $(n).attr({height:"",width:""});
            var curImg = n;
            var imgSrc= n.src;
            var imgW=0;
            //等待图片加载完成，才开始设置。
            curImg.onload=function(){
                //图片宽度处理
                imgW = curImg.width;
                if (imgW * 1 > 360){
                    this.style.width = "100%";
                    var oViewWidth = document.defaultView.getComputedStyle(curImg, null).getPropertyValue('width');
                    var oWidthLast = oViewWidth.replace(/px/gi, '');
                    if (oWidthLast >= imgW) {
                        this.style.width = "";
                    }
                    _myScroll.refresh();
                }
                if (HW.GlobalState.container == "native") {
                    $(this).wrap("<a  href='openImage:{\"url\":\"" + imgSrc + "\"}'></a>");
                } else {
                    $(this).wrap('<a  href="' + imgSrc + '" target="_blank"></a>');
                }
            }
        });
        //图片处理
        var imgErr='../skin/default/images/';
        $("img").error(function() {
            $(this).attr("src", imgErr+"d_pic_text.png");
        });




   };
    /**
     *  1、获取ID参数；
     */
    function _getId(){
        _id=HW.Tools.parseURL(window.location.href)["newsid"];
        _newsTitle=HW.Tools.parseURL(window.location.href)["newstitle"];
        _newsDate=HW.Tools.parseURL(window.location.href)["newsdate"];
        HW.BulletinDetail.pageConfig.ajaxOptions.data["newsid"]=_id;
    };
    /**
     * 2、下载按钮事件注册
     */
    function _regEventDownBtn(){
       $("#bulletinDetailBox").undelegate(".downloada","click").delegate(".downloada","click",function(e){
           var that=$(this);
           if(HW.GlobalState.container =='native'){
                   simpleDialog.confirm({content:HW.lang.getLocalString('ask_download'),buttons:{
                       ok:function(){
                           window.location.href = that.attr("href");
                       }
                   }
                 });
               e.preventDefault();
               return false;
           }
           e.preventDefault();
           return false;
       });
    } ;
    /**
     * 转换附件单位大小
     * @param size
     * @returns {*}
     */
    function _transformSize (size) {
        if ((/k/i).test(size)) {
            size = parseFloat(size) * 1024;
        }
        else if ((/m/i).test(size)) {
            size = parseFloat(size) * 1024 * 1024;
        }
        return size;
    }
    return {
        pageConfig:{
            name : 'BulletinDetail' ,
            id : "bulletinDetail",
            eventType:'pageshow',
            processData:'showDetailCont' ,
            ajaxOptions : {
                url : HW.GlobalState.baseUrl+"/news/news/submitNewsDetails.json",
                cache:false,
                data : {
                        "newsid":_id,
                          userid: ""
                }
            }
        },
        init:function(){
            HW.Tools.myMenuBottom(5);
            _getId();
            _regEventDownBtn();
        },
        /**
         * 显示公告详情
         */
        showDetailCont:function(data){
            console.log(data);
            var bulletinDownLoadBox=$('<div id="bulletinDownLoadBox" class="DownLoadBoxList"></div>');
            var bulletinDetailBox=$("#bulletinDetailBox");
            var downCont=/supportMobileAtt\[.+\]/.exec(data);
            console.log(downCont)
            var htmlArr=[];
            if(downCont && downCont.length>0){
                var arr=downCont[0].split("supportMobileAtt");
                 console.log(arr[1]);
               //转换成数组
                var downList=HW.Tools.conveJson(arr[1]);
                for(var k= 0,temp =[];k<downList.length;k++){
                    var _name = downList[k].name,
                        _suffix = _name.substring(_name.lastIndexOf('.')+1)
                    if(_suffix.toLowerCase() == 'pdf' || _suffix.toLowerCase() == 'epub'){
                        temp.push(downList[k]);
                    }
                }
                downList = temp;
                //native版中的链接
                if(HW.GlobalState.container =='native'){
                    for(var i=0;i<downList.length;i++){
                        var obj= downList[i];
                        var  downHtml="<p>";
                        downHtml+=" <b>"+obj.name +"</b>";
                        var size=_transformSize(obj.size);
                        var url=obj.path;

                        downHtml+= '<a href=\'addDownload:{\"list\":[{\"name\":\"'+obj.name+'\",\"url\":\"'+url+'\",\"size\":\"'+size+'\"}]} \'  class="downloada">'+  HW.lang.getLocalString('dir_download') +'</a>';
                        downHtml+="</p>";
                        htmlArr.push(downHtml);
                    }

                  } else{
                    //web版中的链接
                    for(var i=0;i<downList.length;i++){
                        var obj= downList[i];
                        var  downHtml="<p>";
                        downHtml+=" <b>"+obj.name +"</b>";
                        downHtml+= "<a href='"+obj.path+"' class='downloada'>"+ HW.lang.getLocalString('dir_download') +"</a>";
                        downHtml+="</p>";
                        htmlArr.push(downHtml);
                    }

                 }
                bulletinDownLoadBox.html(htmlArr.join(" "));
                var pubTime=HW.lang.getLocalString('newPubTime')
                bulletinDetailBox.append("<div class='content_til'>"+_newsTitle+"</div><div class='content_date'>"+pubTime+_newsDate+"</div>");
                bulletinDetailBox.append("<div class='content_text'>"+data.replace(downCont[0],"")+"</div>");
                //将html加入到容器中；
                if(htmlArr && htmlArr.length>0){
                    bulletinDetailBox.append(bulletinDownLoadBox);
                }
            }else{
                if(/supportMobileAtt\[\]/.test(data)){
                    data=data.replace("supportMobileAtt[]","");
                }
                bulletinDetailBox.append("<div class='content_til'>"+_newsTitle+"</div><div class='content_date'>"+HW.lang.getLocalString('newPubTime')+_newsDate+"</div>");
                bulletinDetailBox.append("<div class='content_text'>"+data+"</div>");
            }
            _handleImg();
            $(".bull_contentd  *").removeClass("");
            $(".bull_contentd  *").attr("style","");
            $(".bull_contentd *").attr("align","");
            $(".bull_contentd table").attr("width","100%").css("table-layout","fixed");
            $(".bull_contentd table td").attr("width","");
            //添加滑动
			window.setTimeout(function(){
				//$("#bulletinDetailBox").css("width","intrinsic");
				_myScroll=HW.Tools._addiScroll("bulletinDetailBoxWrapper","bulletinDetailBox",{hScroll:true,vScrollbar:true});
			},100);
           // _myScroll=HW.Tools._addiScroll("bulletinDetailBoxWrapper","bulletinDetailBox",0,0,92,0);
        }

    }
})();
HW.Core.addModule("BulletinDetail",HW.BulletinDetail);
HW.Core.loadPage("BulletinDetail");

