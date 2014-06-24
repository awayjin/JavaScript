/**
 * 首页
 * 1、我的收藏 产品 文档 意见
 * 2、产品大全展示
 * 4、公告展示
 * 5、推荐产品和热门产品
 */
HW.Index=(function(){
    //当前容器环境
    var _curContainer=HW.GlobalState.container,_searchData=[], _myScroller=null;
    //我的收藏_动画效果
    function _myFavoriteAnimate(){
        var active = 0,
            as = document.getElementById('pagenavi').getElementsByTagName('a');
            t2 = null;
            t2 = new TouchSlider({id:'sliderUl', speed:600,auto:false, before:function(index){
                    as[active].className='';
                    active=index;
                    as[active].className='active';
            }});
        for(var i=0;i<as.length;i++){
            if(i == 0){
                as[i].className = 'active';
            }else{
                as[i].className = '';
            }
            (function(){
                var j=i;
                as[i].onclick=function(){
                    t2.slide(j);
                    return false;
                }
            })();
        };
    };
    //公告效果_动画效果
    function _myNewsStartMarquee(lh,speed,delay){
        var p=false, t,oUl=document.getElementById("newsUl");
        oUl.innerHTML+=oUl.innerHTML,oUl.style.marginTop=0;
        oUl.onmouseover=function(){p=true;};
        oUl.touchstart=function(){p=true};
        oUl.onmouseout=function(){p=false;};
        oUl.touchend=function(){p=false;};
        function start(){
            t=setInterval(scrolling,speed);
            if(!p) oUl.style.marginTop=parseInt(oUl.style.marginTop)-1+"px";
        };
        function scrolling(){
            if(parseInt(oUl.style.marginTop)%lh!=0){
                oUl.style.marginTop=parseInt(oUl.style.marginTop)-1+"px";
                if(Math.abs(parseInt(oUl.style.marginTop))>=oUl.scrollHeight/2) oUl.style.marginTop=0;
            }else{
                clearInterval(t);
                setTimeout(start,delay);
            }
        };
        setTimeout(start,delay);
    };
    //侧栏_动画效果
    function _mySidebarAll($id1,$id2,$id3,elm){
        //$id1 左边ID / $id2 侧栏ID / $id3 按钮ID
        var sidebar_left=$("#"+$id1),sidebar_right=$("#"+$id2),sidebar_btn=$("#"+$id3);
        function _mySwipeleft(){
            HW.Tools.myMenuBottom('5');
            sidebar_left.removeClass("scroller-hide").addClass("scroller shadow");
            sidebar_right.removeClass("hide").addClass("leftAbso left2");
            $("#page_mask").removeClass("hide");
        }
        function _mySwiperight(){
            HW.Tools.myMenuBottom('1');
            sidebar_left.removeClass("scroller shadow").addClass("scroller-hide");
            sidebar_right.addClass("hide").removeClass("leftAbso left2");
            $("#page_mask").addClass("hide");
        }
        sidebar_btn.unbind("click").bind("click swiperight",function(oEnt){
            oEnt.stopPropagation();
            if(sidebar_right.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        $("#page_mask").unbind("click").click(function(){
            _eventComment();
            /*
            _myRegEnterEvent();
            _myProductFavorite();
            _myDocumentPerferenceQuery();
            //_myQueryMyFeedback();
            _myFavoriteAnimate();
            if(HW.GlobalState.user.isSignIn){
                _delegateContentShow();
                _regProductUnfold();//产品拆展事件
            }
            _myNewsData();
            _regEventAttentionClick();
            _mySwiperight();
            _myScroller.refresh();
            */
        })
        //swipeleft  swiperight
        $("#page_mask").unbind("swiperight").bind("swiperight",function(){
            _mySwiperight();
            _eventComment();
        });


        function _eventComment(){
            _myRegEnterEvent();
            //_myQueryMyFeedback();
            _myFavoriteAnimate();
            _myNewsData();
            _regEventAttentionClick();
            _mySwiperight();
            _myScroller.refresh();
        }
    };
    //收藏未登录状态
    function _noLoginDisplay(id){
        var sHtml = '<li class="noData"><span>'+HW.lang.getLocalString('index_no_login_begin')+'<a class="aLogins" href="page/signIn.html?from=index">'+HW.lang.getLocalString('index_no_login_middle')+'</a>'+HW.lang.getLocalString('index_no_login_end')+'</span></li>'
        $("#"+id).html(sHtml);
    };
    //产品收藏URL
    function _getURL(d){
        var newUrl='page/doc.html?mid=SUP_DOC&termid=' + d.productid + '&productname='+ d.productname;
        return HW.Tools.reEncondeURIComponent(newUrl);
    };
    //产品收藏结构
    function _showProductSelect(data){
        var sHtml='',i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length,
            querytype=0,_limit;
        for(i=0;i<len;i++){
            sHtml+='<li><a href="'+_getURL(perferenceProducts[i])+'">'+perferenceProducts[i].productname+'</a></li>'
        }
        if(len>=6){
            sHtml+='<li class="more"><a href="page/myAttention.html" id="attentionLink">'+HW.lang.getLocalString('common_more_only')+'</a></li>';
        }
        $("#myProductShou").html(sHtml);
        //_myScroller.refresh();
        if(len%2==1){
            $("#myProductShou").append("<li><a></a></li>")
        }
    };
    //产品收藏查询
    function _myProductFavorite(){
        if(HW.GlobalState.user.isSignIn){
            var option,keywords='';
            option={
                url:HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json",
                data:{
                    limit:6,
                    offset:'0',
                    keywords:''
                }
            };
            option.success=function(data){
                window.setTimeout(function(){
                    _myDocumentPerferenceQuery();
                },100);
                if(data.body==null || data.body.perferenceProducts.length==0){
                    var sHtml = '<li class="noData"><span>'+HW.lang.getLocalString('index_favorites_no_product')+'</span></li>'
                    $("#myProductShou").html(sHtml);
                    return;
                }
                _showProductSelect(data);
                _myScroller.refresh();
            }
            HW.Core.loadPage(option);

        }else{
            window.setTimeout(function(){
                _myDocumentPerferenceQuery();
            },100);
            _noLoginDisplay("myProductShou");
            return false;
        }
    };
    //文档收藏url
    function _myGetDocDocumentUrl(d){
        var _url='';
        _url = 'page/docContent.html?documentid=' + d['documentid'] +'&documentname=' + d['documentname'] +
        '&mid=' + 'SUP_DOC';
        _url +='&ishedex=' + d['ishedex'];
        _url +='&isdirectory=' + d['isdirectory'];
        _url +='&directoryid=' + (d['directoryid'] || '');
        _url +='&libid=' + (d['libid'] || '');
        _url +='&libversion=' + (d['libversion'] || '');
        _url +='&url=' + (d['url'] || '');
        _url +='&iswatchflag='+(d['iswatchflag'] || '');
        _url +='&fid='+(d['fid'] || '');




        return HW.Tools.reEncondeURIComponent(_url);
    }
    function _autoComplete(skey) {
        var data = [];
        var localData = HW.Tools.getLocalStorage(skey);
        if (!$.isArray(localData)) {
            return;
        }
        var len = localData.length;
        if (len == 0) {
            return;
        } else {
            for (var i = 0; i < len; i++) {
                var obj = localData[i];
                data.push(obj["name"]);
            }
            $("#searchKeys").autocomplete(data.reverse(), {
                max: 5,
                selectFirst: false,
                highlight: false,
                multipleSeparator: "",
                delay: 100
            });
        }
    }
    //文档收藏查询
    function _myDocumentPerferenceQuery(){
        var option;
        if(HW.GlobalState.user.isSignIn){
            option={
                url:HW.GlobalState.baseUrl+"/productnode/productnode/getDocFavorites.json",
                data:{
                    "offset":'0',
                    "limit":6,
                    "Keyword":''
                }
            };
            option.success=function(data){
                window.setTimeout(function(){
                    if(HW.GlobalState.user.isSignIn){
                        _delegateContentShow();
                        _regProductUnfold();//产品拆展事件
                    }
                },100);
                var sHtml='', i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length;
                if(data.body==null || len==0){
                    var sHtml = '<li class="noData"><span>'+HW.lang.getLocalString('index_favorites_no_doc')+'</span></li>';
                    $("#myDocumentShou").html(sHtml);
                    setTimeout(function(){
                        _myFavoriteAnimate();
                    },1);
                    return false;
                }
                for(i=0;i<len;i++){
                    sHtml+='<li><a href="'+_myGetDocDocumentUrl(perferenceProducts[i])+'">'+perferenceProducts[i].documentname+'</a></li>'
                }
                if(len>=6){
                    sHtml+='<li class="more"><a href="page/myAttention.html" id="attentionLink">'+HW.lang.getLocalString('common_more_only')+'</a></li>';
                }
                $("#myDocumentShou").html(sHtml);
                if(len%2==1){
                    $("#myDocumentShou").append("<li><a></a></li>")
                }
                setTimeout(function(){
                    _myFavoriteAnimate();
                    _myScroller.refresh();
                },1);
            }
            HW.Core.loadPage(option);

        }else{
            _noLoginDisplay("myDocumentShou");
            setTimeout(function(){
                _myFavoriteAnimate();
            },1);
            return false;
        }
    };
    //公告数据封装
    function _myNewsData(){
        var sHtml='',option;
        option={
            url : HW.GlobalState.baseUrl+"/news/news/submitNewsListing.json",
            data:{
                "keywrods":'',
                "newstype":"SUP_NEWS",
                "limit":3,
                "offset":0
            }
        };
        option.success = function (data) {
            window.setTimeout(function(){
                $("#myProductShou").html("");
                $("#myDocumentShou").html("");
                if(HW.GlobalState.user.isSignIn){
                    _myProductFavorite();
                }else{
                    _noLoginDisplay("myProductShou");
                    _noLoginDisplay("myDocumentShou");
                    setTimeout(function(){
                        _myFavoriteAnimate();
                    },1);
                }
            },100);
            if(data.body==null || data.body.newsTitleList<=0){
                var sHtml = '<li><a href="'+link+'">'+HW.lang.getLocalString('bulletin_no_news')+'</a></li>';
                $("#newsUl").html(sHtml);
                return;
            }
            var newsNames=data.body.newsTitleList,len=newsNames.length,oHtml='',
                pageLink="page/bulletinDetail.html",type="SUP_NEWS";
            if(len>0 && data.body!==null){
                for(var i=0;i<len;i++){
                    var curObj=newsNames[i];
                    var link=pageLink+'?type='+type+'&newsid='+curObj.newsid+'&newstitle='+curObj.name+'&newsdate=';
                    if(curObj.publishTime && curObj.publishTime.length>11){
                        link+=curObj.publishTime.substring(0,11);
                    }else{
                        link+=curObj.publishTime;
                    };
                    link=HW.Tools.reEncondeURIComponent(link);
                    oHtml+='<a href="'+link+'">'+newsNames[i].name+'</a>'
                };
            }
            $("#newsUl").html(oHtml);
            //_myScroller.refresh();
            var oLh=$("#newsUl a").height();
            _myNewsStartMarquee(oLh,20,1500);

            _myScroller.refresh();
        }
        HW.Core.loadPage(option);
    };
    //我的产品-级目录显示
    function _delegateContentShow() {
        var qt,options, stext,idpath =  '';
        options = {
            url: HW.GlobalState.baseUrl + "/productnode/productnode/getPrductNode.json",
            initData: function () {
                var o = {}, result;
                o.nodeid = o.nodeid || '';
                o.idpath = o.idpath || '';
                result = {"nodeid": o.nodeid, "idpath": o.idpath};
                return  result;
            },
            data: {mid: "SUP_DOC"},
            error: _handleError
        };
        options.success = function (data) {
            var sHtml = '<dl>',productNodeDos ,len ,i, name;

            if (data && data.body && !!data.body.productnodedos && data.body.productnodedos.length != 0) {
                productNodeDos = data.body.productnodedos;
                //显示产品目录及产品列表
                for (i = 0; i < data.body.productnodedos.length; i++) {
                    name = productNodeDos[i].nodename;
                    //产品列表
                    if (!productNodeDos[i].isproduct) {
                        sHtml += '<dd><a class="lev1_a" href="#" ' +
                            ' nodeid="' + productNodeDos[i].nodeid + '"><span class="pFlgs"></span><b>' + name +
                            '</b><span class="goPage"></span></a>'+  '</dd>';
                    }

                }
                $("#my_index_product").html(sHtml+'</dl><div class="clear"></div>');
            }
            else{
                $("#my_index_product").html('<dl><dd><a class="lev1_a" href="#"><b>' +HW.lang.getLocalString('common_no_records')+ '</b></a></dd></dl>');
            }

            window.setTimeout(function(){
                _myScroller.refresh();
            },10);

            /*if(_myScroller != null){
                _myScroller.destroy();
                _myScroller = null;
            }

            setTimeout(function(){
                _myScroller = HW.Tools._addiScroll('index_data_wapper','home_wapper',0,0,0,0);
            },100);*/
        }
        HW.Core.loadPage(options);
    };

    //注册产品一级目录收藏与展开事件
    function _regProductUnfold(){
        $('#my_index_product').unbind('click').bind('click',function(e){
            var target = e.target,
                tagName = target.tagName.toUpperCase(),
                $target = $(target),
                tempTarget,
                domDownArrow,
                $dd;
            //修正目标对象target
            if(tagName !== "A"){
                tempTarget = $(target).closest('a');
                if(tempTarget.length){
                    $target = tempTarget;
                    target = tempTarget[0];

                }
            }
            $dd = $target.closest('dd');
            if($target.hasClass('lev1_a')){ //二三级目录 收藏展开
                domDownArrow = $('.goPage', $target);
                if(domDownArrow.hasClass('unfoldPage')){//收藏
                    $('.lev_2', $dd).addClass('hide');
                    domDownArrow.removeClass('unfoldPage');
                    _myScroller.scrollToElement($('#searchKeys')[0], 30);
                }
                else{//展开
                    if($('.lev_2', $dd).length){
                        $('.lev_2', $dd).removeClass('hide');
                        _myScroller.scrollToElement($target[0], 30);
                    }
                    else{ //第一次去取数据
                        _getSecondProductDirs($target.attr('nodeid'), $target);
                    }
                    domDownArrow.addClass('unfoldPage');
                }
            }
            else if($target.hasClass('lev1_b')){ //二三级目录跳到四五级产品目录

            }


        });
    }
     function _handleError(){}
    /*取产品二三级目录数据*/
    function _getSecondProductDirs(nodeId, $target){
        var  option={
            url:HW.GlobalState.baseUrl+"/productnode/productnode/getSecondPrductNode.json",
            error: _handleError,
            data:{
                "mid":"SUP_DOC",
                "idpath":"",
                nodeid:nodeId
            }
        };
        option.success=function(data){
            var sHtml = '',productNodeDos , parentNodeId, paretIdpath, len ,
                i, odd,  childNodes,   childLen, k, ChildIdpath, ChildNodeId,urls;

            if (data && data.body && !!data.body.parentnodedos &&
                data.body.parentnodedos.length != 0) {
                productNodeDos = data.body.parentnodedos;
                len   = productNodeDos.length;
                //显示产品目录及产品列表
                for (i = 0; i < len; i++) {
                    //产品列表
                    parentNodeId = productNodeDos[i].nodeid;
                    paretIdpath = nodeId +'|' + parentNodeId;
                    sHtml += '<div class="lev_2 "><h3 class="levH3" nodeid="'+ parentNodeId  +
                        ' "idpath="' + paretIdpath + '"><i></i><span>' + productNodeDos[i].nodename +  '</span></h3><ul class="slider_p"> ';
                    childNodes = productNodeDos[i]['childNodes'];
                    childLen = childNodes.length;

                    for(k = 0; k < childLen; k++){
                        ChildNodeId =  childNodes[k]['nodeid'];
                        ChildIdpath =  paretIdpath + '|'  + ChildNodeId;
                        urls =HW.Tools.reEncondeURIComponent('page/productSupport.html?mid=SUP_DOC&nodeid=' +
                            ChildNodeId + '&idpath=' + ChildIdpath);
                        sHtml += '<li><a href="'+urls+
                            '" class="lev1_b" >' + childNodes[k]['nodename'] + '</a></li> ';
                    }
                    if(childLen % 2){
                        sHtml += '<li><a href="#"  ></a></li> ';
                    }
                    sHtml += '</ul></div>';
                }

            }
            $target.after(sHtml);
            window.setTimeout(function(){
                _myScroller.refresh();
                _myScroller.scrollToElement($target[0], 30);
            },10);
        }
        HW.Core.loadPage(option);
    }

    //产品参数idpath拼装
    function _getProductIDPath(data, idpath){
        if (!data)  return ''; //
        return !!idpath ? idpath + "|" + data.nodeid : data.nodeid ;
    };

    //产品目录
    function _getProductDirHrefUrlOfList(data, idpath) {

        if (!!data) {
            var _idpath
            console.log(!!idpath)
            if (!!idpath) {
                _idpath = idpath + "|" + data.nodeid;
            } else {
                _idpath = data.nodeid;
            }
            var _url =  HW.Tools.reEncondeURIComponent("productSupport.html?nodeid=" + data.nodeid + "&idpath=" +
                _idpath + "&title=" + HW.Tools.replaceAMP(data.nodename));
            return _url;
        } else {
            return "#";
        }
    };

    //产品一级last border处理
    function _lastBorder(el){
        console.log(el);
        $("."+el).find("a:last").css("borderBottom","0");
        _myScroller.refresh();
    };

    //全站搜索enter按键事件注册
    function _myRegEnterEvent() {
        $("#searchKeys").unbind().bind('keydown',function(e){
//            e = e || window.event;
            if (e.keyCode == 13) {
                var key= $.trim($(this).val());

                var re =/^[\`\~!@#\$%\^&\*\(\)\+=\|\{\}'\:;",\\\[\]\.\<\>\/\?~\！\@#\￥\%\……\&\*\（\）\-\-\+\|\{\}\【\】\‘\；\：\”\“\’\。\，\、\？]+$/gi
                $(this).blur();
                $('#indexSearchBtn').focus();

                if(key.length==0){

                    simpleDialog.alert({
                        content:HW.lang.getLocalString('siteSearchList_search')
                    });

                }else if(key.length==1){
                    simpleDialog.alert({
                        content:HW.lang.getLocalString('search_key_one')
                    });

                }
                else if(re.test(key)){
                    simpleDialog.alert({
                        content:HW.lang.getLocalString('gs_keywords_invalid')
                    });
                }
                else{
                    //将搜索记录存入localStroage中 ，键为searchHistoryRecord    跳转到搜索页
                    //HW.Tools.setLocalStorage("searchHistoryRecord", {"key":key,"type":'',"lang":''}  ,  100  , "key");
                    //_searchData.push(key);
                    //_showSearchRecordList();
                    $(this).val('');
                    var toPage="page/siteSearchList.html?isSearch=true&keywords="+ encodeURIComponent(key);                   //ios5有问题；
                    $.mobile.changePage(toPage);
                }
                e.preventDefault();
                return false;
            }
        });
    };

    //检测登录状态跳转登录页面
    function _regEventAttentionClick(){
        var gz=$("#attentionLink");
        gz.bind("click",function(e){
            if(!HW.GlobalState.user.isSignIn){
                HW.GlobalState.signJumpPage="myAttention.html";
                HW.GlobalState.signBackPage="../index.html";
                $.mobile.changePage("page/signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }else{
                $.mobile.changePage("page/" + "myAttention.html");
            }
        });
    };
    //标准的登录或是我的空间跳转
    function _signInBtnLink(){
      var signInBtn=$("#signInBtn");
        signInBtn.unbind().bind("click",function(e){
            e.preventDefault();
           if(HW.GlobalState.user.isSignIn){
               $.mobile.changePage("page/myZone.html");
           }else{
               //如果登录后要跳转的是关注页。那么进入页面则不记入历史记录中。
               //alert(HW.GlobalState.appConifg.jumpPage=="attention.html");
               if(HW.GlobalState.appConifg.jumpPage=="myAttention.html"){
                   HW.GlobalState.signJumpPage=HW.GlobalState.appConifg.jumpPage;
                   HW.GlobalState.signBackPage="#home";
                   $.mobile.changePage("page/signIn.html",{changeHash:false});
               }else{
                   $.mobile.changePage("page/signIn.html?from=index");
               }
           }
            return false;
        });
   };
    //在浏览器中刷新操作，载入首页后，将页面跳转到刷新的位置
    function _redirect(){
        var descUrl = HW.Tools.parseURL(window.location.href).redirect;
        console.log(descUrl)
        if(descUrl){
            $.mobile.changePage(decodeURIComponent(window.location.href.substr(window.location.href.indexOf("=")+1)));
        }
        return;
    }

    function return_Refresh_page(){
        if(HW.GlobalState.container=="native"){
            $('#fixedMenuFined').addClass("hide");
        }else{
            $('#fixedMenuFined').removeClass("hide");
        }
        $(document).bind( "pagebeforeshow", function(){
            //_myProductFavorite();
            if($("#home_right_Sidebar").hasClass("hide")){
                window.setTimeout(function(){
                    HW.Tools.myMenuBottom('1');
                },10);
            }else{
                window.setTimeout(function(){
                    HW.Tools.myMenuBottom('5');
                },20);
            }
            _myNewsData();

            if(!HW.GlobalState.user.isSignIn){
                $("#my_index_product").html("");
            }
        });
    }
    return {
        init:function(){
            //HW.Tools.myMenuBottom(1);
            console.log("首页初始化");
            _myRegEnterEvent();
            //_myFavoriteAnimate();
            _myNewsData();
            return_Refresh_page();
            _regEventAttentionClick();
            _signInBtnLink();
            HW.Tools.btnChange();
            _mySidebarAll("home_left_Sidebar","home_right_Sidebar","bulAA","cePage");

            HW.lang.replaceLocalString();
            _autoComplete(HW.GlobalState.lastProSearch);

            if(!(_myScroller instanceof iScroll)){
                _myScroller = HW.Tools._addiScroll('index_data_wapper','home_wapper',0,0,0,0);
            }

        }
    }
})();
$(function(){
    window.setTimeout(function(){
        HW.Index.init();
    },100);
});


