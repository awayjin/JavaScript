/**
 * 公告首页，
 * 1、载入页面，请求第一项的公告数据 --------展示数据
 * 2、点击某个分类---请求此分类下的数据-------展示数据
 * 3、点击加载更多----请求对应分类下的数据----展示数据；
 * 4、从详情页返回，使用jqm中保持的状态。
 * 5、从其它页跳转过来。获取base中href地址。
 */
HW.Bulletin=(function(){
    //是否为第一次进入页面 ，默认为true;
    var _isFirst=true;
    //请求参数
    var _url= HW.GlobalState.baseUrl+"/news/news/submitNewsListing.json";
    var _eventType="pageshow",_processData="showTitles";
    //要获取数据的条数
    var _limit=20;
    //第一次请求时的从第几条数据的位置开始获取
    var _offset= 0,_offsetAll= 0,_offsetWeb= 0,_offsetEox= 0,_offsetYjzg= 0,_offsetPcn=0;
    //类型
    var _type='SUP_NEWS';
    //是否加载更多
    var _isLoadMore=false;
    //某个类别是否已加载过数据了，在切换选项时先判断是否已加载过了，没有则去请求，数据，有则直接显示数据。
    var isGetDataAll=false,isGetDataWeb=false,isGetDataEox=false,isGetDataYjzg=false,isGetDaclickcn=false,_myScroll=null;
    //获取type类型
    function _getType(){
        if(!_isFirst){return false;}
        var href=HW.Tools.parseURL($("base").attr("href"));
        _type=href["type"];
        if(_type=="undefined"){
            _type="SUP_NEWS";
        }
    }
    /**
     * 1、创建列表项html代码
     * @param arr    存储了所有内容的数组对象，
     * @param fieldArr      字段数组  单个对象的所有属性名称。 如 ["productid","productname","publishtime"]
     * @param pageLink      链接到的页面地址
     * @param type              公告所属类型；
     * @returns {Array}       返回htmlArr数组
     * @private
     */
    function _createLiEle(arr,fieldArr,pageLink,type,num){
        var len=arr.length;
        if(len<=0){return;}
        //数组作排序处理,排序方法中有两个参数，表示数组中两个用来排序的元素
        var htmlArr=[];
        for(var i=0;i<len;i++){
            var curObj=arr[i];
            var li= '<li><a href="';
            var link= pageLink+'?type='+type+'&newsid='+curObj[fieldArr[0]]+'&newstitle='+curObj[fieldArr[1]]+'&newsdate=';
            if(curObj[fieldArr[3]] && curObj[fieldArr[3]].length>11){
                link+=curObj[fieldArr[3]].substring(0,11);
            }else{
                link+=curObj[fieldArr[3]];
            }
            link=HW.Tools.reEncondeURIComponent(link);
            li=li+link+ '" >'+ curObj[fieldArr[1]];
            //新公告标识
            if(curObj[fieldArr[2]]==true){
                li+='<span class="new"></span>';
            }
            li+='</a></li>';
            htmlArr.push(li);
        }
        //查看更多
        if(len>=_limit){
            htmlArr.push("<li class='more'><a href='?offset="+num+"&type="+type+"' class='loadMore'>"+ HW.lang.getLocalString('common_more') +"</a></li>");
        }
        return htmlArr;
    };
    /**
     * 2、获取分类数据；
     *   点击某个分类---请求此分类下的数据-------展示数据
     */
    function _getCatagroyData(){
        var _navbarLinks=$("#bullType a");//导航条对象
        _navbarLinks.unbind().bind("click",function(e){
            _isLoadMore=false;
            _simpleTab.call(this,e);
            _myScroll.refresh();
            _type=HW.Tools.parseURL(this.href)["type"];
            HW.Bulletin.pageConfig.ajaxOptions.data.newstype=_type;
            console.log(_type);
            //如果已经获取过一次内容，则只需要显示容器即可，不需要在发请求，取数据；
            //获取过内容，只需判断对应的容器下是否有li，有则说明已请求过内容，没有则说明没有
            if(_type=="all"){
                if($("#bulletinAll li").length>0){
                    _myScroll.refresh();
                    e.preventDefault();
                    return false;
                }
            }
            if(_type=="SUP_NEWS"){
                if($("#bulletinWeb li").length>0){
                    _myScroll.refresh();
                    e.preventDefault();
                    return false;
                }
            }
            if(_type=="SUP_EOX"){
                if($("#bulletinEox li").length>0){
                    _myScroll.refresh();
                    e.preventDefault();
                    return false;
                }
            }
            if(_type=="SUP_PREC"){
                if($("#bulletinYjzg li").length>0){
                    _myScroll.refresh();
                    e.preventDefault();
                    return false;
                }
            }
            if(_type=="SUP_PCN"){
                if($("#bulletinPcn li").length>0){
                    _myScroll.refresh();
                    e.preventDefault();
                    return false;
                }
            }
            //否则，为一次新的请求，开始去请求数据。
            var config=HW.Bulletin.pageConfig;
            config.tag=true;
            config.processData='showCataTitles';
            var data= {
                "keywrods":"",
                "newstype":_type,
                "limit":_limit,
                "offset":0
            };
            config.ajaxOptions.url=HW.GlobalState.baseUrl+"/news/news/submitNewsListing.json";
            config.ajaxOptions.data=data;
            HW.Core.loadPage("Bulletin");
            e.preventDefault();
            return false;
        });
    };
    /**
     * 3、简单选项卡效果
     */
    function _simpleTab(e){
        var ulList= $("#bulletinDataBox").children('ul');
        var navbarLinks=$("#bullType").children("a");
        var t=$(this);
        var index=navbarLinks.index(t);
        if(!t.hasClass("active")){
            t.addClass("active").siblings().removeClass("active");
            var curUl=ulList.eq(index);
            if(curUl.hasClass("hide")){
                curUl.removeClass("hide").siblings().addClass("hide");
            }
        }
    };
    /**
     * 3.1、根据_type更新当前项
     */
    function _simpleTab2(){
        //获取最新的DOM元素对象
        var ulList= $("#bulletinDataBox").children('ul');
        var navbarLinks=$("#bullType").children("a");
        var index=0;
        $.each(navbarLinks,function(i,e){
            var curA=$(e);
            var curType=HW.Tools.parseURL(curA.attr("href"))["type"];
            if(curType==_type){
                index=navbarLinks.index(curA);
                curA.addClass("active");
            }else{
                curA.removeClass("active");
            }
        });
        var curUl=ulList.eq(index);
        curUl.removeClass("hide").siblings().addClass("hide");
    };
    /**
     * 4、点击加载更多，事件注册。给 bulletinDataBox容器绑定事件， 因为loadMore按钮是动态生成的。
     */
    function _regEventLoadMore(){
        $("#bulletinDataBox").undelegate(".loadMore","click").delegate(".loadMore","click",function(e){
            e.preventDefault();
            _isLoadMore=true;
            _type=HW.Tools.parseURL(this.href)["type"];
            _offset=HW.Tools.parseURL(this.href)["offset"]*1;
            var config=HW.Bulletin.pageConfig;
            config.tag=true;
            config.processData="loadMoreTitles";
            config.ajaxOptions.data.newstype=_type;
            config.ajaxOptions.data.limit=_limit;
            config.ajaxOptions.data.offset=_offset;
            HW.Core.loadPage("Bulletin");
            return false;
        });
    };
    /*搜索HTML*/
    function _createSearchLiEle(arr,fieldArr,pageLink,type,offset){
        var len=arr.length,htmlArr=[];
        for(var i=0;i<len;i++){
            var curObj=arr[i];
            var li= '<li><a href="';
            var link= HW.Tools.reEncondeURIComponent(pageLink+'?type='+type+'&newsid='+curObj[fieldArr[0]]+'&newstitle='+curObj[fieldArr[1]]+'&newsdate='+curObj[fieldArr[3]]) ;
            li=li+link+ '" >'+ curObj[fieldArr[1]];
            if(curObj[fieldArr[2]]==true){
                li+='<span class="new"></span>';
            }
            li+='</a></li>';
            htmlArr.push(li);
        }
        //添加查看更多链接
        if(len>=_limit){
            htmlArr.push("<li class='more'><a href='?keyword="+_keyword+"&offset="+offset+"&type="+_type+"' class='loadMore'>"+  HW.lang.getLocalString('common_more')+"</a></li>");
        }
        return htmlArr;
    };
    /**
     * 第一次进入页面时，去获取数据；与从其它页面返回时获取数据；
     */
    function _getData(){
        console.log(_isFirst);
        var config=HW.Bulletin.pageConfig;
        if(_isFirst){
            config.tag=false;
            config.eventType=_eventType;
            config.processData=_processData;
            config.isM=true;
            var param= {
                url : _url,
                data : {
                    "keywrods":"",
                    "newstype":_type,
                    "limit":_limit,
                    "offset":_offsetAll,
                    'userid':""
                }
            }
            config.ajaxOptions=param;
            HW.Bulletin.pageConfig.ajaxOptions.data.newstype="SUP_NEWS";
            HW.Core.loadPage("Bulletin");
        }else{
            //从其它页面返回来时，直接请求数据即可；使用的偏移量需确定
            config.tag=false;
            config.processData=_processData;
            //如果已经使用地加载更多，那么请求数据的数量为最后offset值，偏移量则为0，
            if(_isLoadMore){
                var total=0;
                //alert("2:"+_type);
                switch (_type){
                    case "SUP_NEWS":
                        total=_offsetWeb;
                        break;
                    case "SUP_EOX":
                        total=_offsetEox;
                        break;
                    case "SUP_PREC":
                        total=_offsetYjzg;
                        break;
                    case "SUP_PCN":
                        total=_offsetPcn;
                        break;
                    default :
                        total=_offsetAll;
                }
                config.ajaxOptions.data.offset=0;
            }
            //config.ajaxOptions.data.newstype=_type;
            HW.Core.loadPage("Bulletin");
        }

    };
    function _btnBack(){
        var bulletionBtnBack=$("#bulletionBtnBack");
        bulletionBtnBack.unbind().bind("click",function(){
            _isFirst=true;
        });
    };
    /*搜索框图标变化*/
    /*
    * 1.inID    文本框ID
    * */
    function _focusInput(inID){
        var input_timer,inFocus=$("#"+inID);
        inFocus.focus(function(){
            inFocus.siblings("div").addClass("focusDel");
            var that = this;
            input_timer = setInterval(function () {
                if (that.value == "") {
                    $(".placeHolderV").show();
                }else{
                    $(".placeHolderV").hide();
                }
            }, 200);

        }).blur(function(){
                if(inFocus.val()==""){
                    $(".placeHolderV").show();
                }
            }).keypress(function(){
                $(".placeHolderV").hide();
            });
        $(".focusDis").unbind().bind("click",function(){
            inFocus.focus();
        })

    };
    /*search*/
    function _searchPage(){
        $("#bulletinKey").unbind().bind("keypress",function(e){
            var eleBox=$("#bulletinSearchResult"),options,_keyword= $.trim($("#bulletinKey").val());
            eleBox.empty();
            if (e.keyCode==13){
                eleBox.removeClass("hide").siblings("ul").addClass("hide");
                console.log(_keyword+"+keyword");
                console.log(_type+"+type");
                options={
                    url : HW.GlobalState.baseUrl+"/news/news/submitNewsListing.json",
                    data:{
                        "keywrods":_keyword,
                        "newstype":_type,
                        "limit":_limit,
                        "offset":_offsetAll
                    }
                };
                options.success=function(data){
                    console.log(data)
                    if(data.body ==null || data.body==' ' ||  data.body.newsTitleList.length==0){
                        eleBox.html("");
                        eleBox.html("<li><a>"+HW.lang.getLocalString('bulletin_search_no_relevant')+"</a></li>");
                        _myScroll.refresh();
                        return;
                    }
                    var dataList=data.body.newsTitleList,len=dataList.length;
                    var liList=_createSearchLiEle(dataList,
                        ["newsid","name","newsFlag","publishTime"],"bulletinDetail.html",_type,_offset)
                    eleBox.html(liList);
                    _myScroll.refresh();
                }
                HW.Core.loadPage(options);

            };
        })
    };
    return {
        pageConfig:{
            name : 'Bulletin' ,
            id : "bulletin",
            tag:false
        },
        init:function(){
            HW.Tools.myMenuBottom('1');
            _getType();
            _getData();
            _regEventLoadMore();
            _getCatagroyData();
            _simpleTab2();
            _btnBack();
            _searchPage();

        },
        /**
         * 显示所有项的公告数据
         */
        showTitles:function(data){
            console.log(data);
            //确定容器，无论什么时候进入都需要容器；
            var contBox="",_keyword=$.trim($("#bulletinKey").val());
            //如果第一次进来时
            if(_isFirst){
                switch (_type){
                    case "SUP_NEWS":
                        contBox=$("#bulletinWeb");
                        break;
                    case "SUP_EOX":
                        contBox=$("#bulletinEox");
                        break;
                    case "SUP_PREC":
                        contBox=$("#bulletinYjzg");
                        break;
                    case "SUP_PCN":
                        contBox=$("#bulletinPcn");
                        break;
                    default :
                        contBox=$("#bulletinAll");
                }
                _isFirst=false;
                //没有公告
                if(data.body ==null || data.body==' ' ||  data.body.newsTitleList.length==0){
                    contBox.append("<li><a>"+HW.lang.getLocalString('bulletin_no_news')+"</a></li>");
                    if(_myScroll){
                        _myScroll.refresh();
                    }else{
                        _myScroll=HW.Tools._addiScroll("bulletinDataBoxWrapper","bulletinDataBox",0,0,92,98);
                    }
                    return;
                }
                //有公告 ，更新偏移量，创建li数据；塞入容器内
                var dataList=data.body.newsTitleList;
                var len=dataList.length;
                _offset=_offset*1+ len*1;
                //更新某个类别状态，是否已请求数据的状态；
                switch (_type){
                    case "SUP_NEWS":
                        isGetDataWeb=true;
                        break;
                    case "SUP_EOX":
                        isGetDataEox=true;
                        break;
                    case "SUP_PREC":
                        isGetDataYjzg=true;
                        break;
                    case "SUP_PCN":
                        isGetDaclickcn=true;
                        break;
                    default :
                        isGetDataAll=true;
                }

                var liList= _createLiEle(dataList,["newsid","name","newsFlag","publishTime"],"bulletinDetail.html",_type,_offset);
                contBox.append(liList.join(" "));
            }else{
                var tmp=HW.Bulletin.pageConfig.ajaxOptions.data.newstype;
                switch (tmp){
                    case "SUP_NEWS":
                        contBox=$("#bulletinWeb");
                        break;
                    case "SUP_EOX":
                        contBox=$("#bulletinEox");
                        break;
                    case "SUP_PREC":
                        contBox=$("#bulletinYjzg");
                        break;
                    case "SUP_PCN":
                        contBox=$("#bulletinPcn");
                        break;
                    default :
                        contBox=$("#bulletinAll");
                }
                //更新某个类别状态，是否已请求数据的状态；
                switch (tmp){
                    case "SUP_NEWS":
                        isGetDataWeb=true;
                        break;
                    case "SUP_EOX":
                        isGetDataEox=true;
                        break;
                    case "SUP_PREC":
                        isGetDataYjzg=true;
                        break;
                    case "SUP_PCN":
                        isGetDaclickcn=true;
                        break;
                    default :
                        isGetDataAll=true;
                }
                //再显示对应的容器；
                var ulList=$("#bulletinDataBox").children('ul');
                var navbarLinks=$("#bullType").children("a");
                var index=ulList.index(contBox);
                if(contBox.hasClass("hide")){
                    //显示内容div
                    contBox.removeClass("hide").siblings().addClass("hide");
                    //显示选项卡
                    var curNav=navbarLinks.eq(index);
                    if(!curNav.hasClass("active")){
                        curNav.addClass("active").siblings().removeClass("active");
                    }
                }
                //没有公告
                if(data.body ==null || data.body==' ' ||  data.body.newsTitleList.length==0){
                    contBox.append("<li><a>"+HW.lang.getLocalString('bulletin_no_news')+"</a></li>");
                    if(_myScroll){
                        _myScroll.refresh();
                    }else{
                        _myScroll=HW.Tools._addiScroll("bulletinDataBoxWrapper","bulletinDataBox",0,0,92,98);
                    }
                    return;
                }
                //有公告 ，将内容插入对应的容器，在显示此容器，隐藏其它容器；
                var dataList=data.body.newsTitleList;
                var len=dataList.length;
                _offset=_offset*1+ len*1;
                var liList= _createLiEle(dataList,["newsid","name","newsFlag","publishTime"],"bulletinDetail.html",_type,_offset);
                contBox.append(liList.join(" "));
            }
            //内容加载完后，再添加滑动功能；

            setTimeout(function(){
                _myScroll=HW.Tools._addiScroll("bulletinDataBoxWrapper","bulletinDataBox",0,0,92,98);
            },350);
            _offset=0;
        },
        /**
         * 加载某类下更多的数据；
         */
        loadMoreTitles:function(data){
            console.log(data);
            var contBox="";
            switch (_type){
                case "SUP_NEWS":
                    contBox=$("#bulletinWeb");
                    break;
                case "SUP_EOX":
                    contBox=$("#bulletinEox");
                    break;
                case "SUP_PREC":
                    contBox=$("#bulletinYjzg");
                    break;
                case "SUP_PCN":
                    contBox=$("#bulletinPcn");
                    break;
                default :
                    contBox=$("#bulletinAll");
            }
            //更新某个类别状态，是否已请求数据的状态；
            switch (_type){
                case "SUP_NEWS":
                    isGetDataWeb=true;
                    break;
                case "SUP_EOX":
                    isGetDataEox=true;
                    break;
                case "SUP_PREC":
                    isGetDataYjzg=true;
                    break;
                case "SUP_PCN":
                    isGetDaclickcn=true;
                    break;
                default :
                    isGetDataAll=true;
            }
            //没有公告，提示没有新公告了，移去查看更多
            if(data.body ==null || data.body==' ' ||  data.body.newsTitleList.length==0){
                contBox.find(".loadMore").parent().remove();
                return;
            }
            //有公告 ，更新偏移量，创建li数据；塞入容器内
            var dataList=data.body.newsTitleList;
            var len=dataList.length;
            _offset=_offset*1+ len*1;
            //更新偏移量
            switch (_type){
                case "SUP_NEWS":
                    _offsetWeb+=len;
                    break;
                case "SUP_EOX":
                    _offsetEox+=len;
                    break;
                case "SUP_PREC":
                    _offsetYjzg+=len;
                    break;
                case "SUP_PCN":
                    _offsetPcn+=len;
                    break;
                default :
                    _offsetAll+=len;
            }
            var liList= _createLiEle(dataList,["newsid","name","newsFlag","publishTime"],"bulletinDetail.html",_type,_offset);
            //先移除上一个查看更多，再添加上新的内容；
            contBox.find(".loadMore").parent().remove();
            contBox.append(liList.join(" "));


            //刷新滑动
            _myScroll.refresh();
            _offset=0;

        },
        /**
         * 点击分类时显示数据；
         */
        showCataTitles:function(data){
            console.log("点击分类显示对应的数据");
            console.log(data);
            $("#bulletinKey").val("");
            var contBox="";
            switch (_type){
                case "SUP_NEWS":
                    contBox=$("#bulletinWeb");
                    isGetDataWeb=true;
                    break;
                case "SUP_EOX":
                    contBox=$("#bulletinEox");
                    isGetDataEox=true;
                    break;
                case "SUP_PREC":
                    contBox=$("#bulletinYjzg");
                    isGetDataYjzg=true;
                    break;
                case "SUP_PCN":
                    contBox=$("#bulletinPcn");
                    isGetDaclickcn=true;
                    break;
                default :
                    contBox=$("#bulletinAll");
                    isGetDataAll=true;
            }
            //没有公告
            if(data.body ==null || data.body==' ' ||  data.body.newsTitleList.length==0){
                contBox.empty();
                contBox.append("<li><a>"+HW.lang.getLocalString('bulletin_no_news')+"</a></li>");
                return;
            }
            //有公告 ，更新偏移量，创建li数据；塞入容器内
            var dataList=data.body.newsTitleList;
            var len=dataList.length;
            _offset=_offset*1+ len*1;
            //更新偏移量与某个类别状态，是否已请求数据的状态；
            switch (_type){
                case "SUP_NEWS":
                    _offsetWeb+=len;
                    break;
                case "SUP_EOX":
                    _offsetEox+=len;
                    break;
                case "SUP_PREC":
                    _offsetYjzg+=len;
                    break;
                case "SUP_PCN":
                    _offsetPcn+=len;
                    break;
                default :
                    _offsetAll+=len;
            }

            var liList= _createLiEle(dataList,["newsid","name","newsFlag","publishTime"],"bulletinDetail.html",_type,_offset);
            contBox.append(liList.join(" "));

            //刷新滑动
            _myScroll.refresh();
            _offset=0;
        }

    }
})();
HW.Core.addModule("Bulletin",HW.Bulletin);
HW.Core.loadPage("Bulletin");

