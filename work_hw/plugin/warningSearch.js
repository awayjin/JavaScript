//告警查询
HW.WarningSearch = (function () {
var GlobaliScroll,_myScroller=null;
function _lastSearch(){
    $("#warningMore").css("display","none");
    $("#warninglist").css("display","none").attr("id","");
    $("#warninglist").siblings("a").css("display","none");
    $('#warning_search_outer').removeAttr("class");
    var pname, sHtml = '', i, len, data, localDataWarn;
    try{
        data = [];
        //取历史数据10条
        localDataWarn = HW.Tools.getLocalStorage('warning_search_storage');
        if(localDataWarn==null || !localDataWarn){
            $('#warning_search_tip_wrapsW').html('<div id="warning_search_tipW" class="tip_bar">'+HW.lang.getLocalString('nhistoryDs')+'</div>')
            $('#warninglistW').html('');

        }else{
            //最近搜索==没有搜索记录的时候显示什么
            $('#warning_search_tip_wrapsW').html('<div id="warning_search_tipW" class="tip_bar">'+HW.lang.getLocalString('last_search_oa')+'</div>');

        };
        len = localDataWarn.length;
        localDataWarn.reverse();
        len = len >= 10 ? 10 : len;
        for(i =0; i < len ; i++) {
            pname = localDataWarn[i].alarmname;
            sHtml += '<dd><a  href="'+ _getStringHref(localDataWarn[i]) + '"><span class="load-icon"></span><span class="orderListTi">'+pname+'</span></a></dd>';
        }
        //清除历史按钮
        sHtml+='<dd id="clearHisData_warning" class="clear_btn"><span>'+ HW.lang.getLocalString('commnon_clear_search') +'</span></dd>';
        $("#warninglistW").html(sHtml);
        _myScroller = HW.Tools._addiScroll('warning_search_wapperW', 'warning_search_outerW',0,0,0,0);
        //取筛选存储记录
        var editData=HW.Tools.getLocalStorage('editorData_warning');
        console.log(editData)
        if(editData==null || !editData){
            return false;
        }
        if(editData[0].qureytype==1 || editData[0].qureytype==2){
            $("#warning_search_tipW").append('<span class="tipTi">'+HW.lang.getLocalString('orderSearch_js_focus_pro')+'</span>')
        }

    }catch(e){
        $('#warninglistW').html('');
    }

};

//清除历史记录
function _clearHisData(){
    $("#clearHisData_warning").unbind().bind("click",function(){
        simpleDialog.confirm({
            content:HW.lang.getLocalString('common_confirm_delete'),
            buttons:{
                ok:function(){window.localStorage.removeItem('warning_search_storage');_lastSearch();},
                cancel:function(){return;}
            }
        });
    });
};

//数据封装
function _handData(data){
    console.log(data)
    if (!data || !data.body){
        return '<dd class="noproduct"><a href="">'+ HW.lang.getLocalString('records_relative_no_data') + '</a></dd>';
    };
    var sHtml = '',commandDos = data.body.alarmList,len = commandDos.length,i,pname,str;
    for (i = 0; i < len; i++){
        pname = commandDos[i].alarmname;
        sHtml += '<dd class="resultList"><a href="warningSearchDetail.html?alarmid=' + commandDos[i].alarmid + '">' + ' <span class="orderListTi">' + pname + '</span>'+ (commandDos[i].proversionname !='' ? commandDos[i].proversionname :commandDos[i].productname)+'</a></dd>';
    }
    return sHtml;
};

//搜索结果列表具体页面显示
function _showSearchList(data, sname){
    var sHtml = _handData(data), total, listSize,moreHref;
    if (!data || !data.body ||data.body.alarmList.length ===0){
        total = 0;
    }else{
        total = data.body.total;
    };

    $('#warning_search_tip_wraps').html('<div id="warning_search_tipW" class="tip_bar">'+HW.lang.getLocalString('foundDs')+'<span class="red">'+(total >>>0)+"</span>"+HW.lang.getLocalString('articleDs')+'</div>');
    $('.orderTips').css('display','block');
    $("#warninglist").removeClass("orderlist search-tools list90").addClass("search-re list120").html(sHtml);
    listSize = $("#warninglist dd").length;
    if (total > listSize){
        $('#warningMore').css('display', 'block').attr('alarmname', $.trim($('#warning_search_text').val()));
    }
    _myScroller = HW.Tools._addiScroll('warning_search_wapper', 'warning_search_outer',0,0,0,0);
    $('#warning_search_wapper').addClass("order_search_wapperTS");
    _myScroller.refresh();

};

//更多处理
function _showMoreSearchList(data){
    var sHtml = _handData(data), total ,listSize;
    if (!data || !data.body ||data.body.alarmList.length===0) {
        total = 0;
    }else{
        total = data.body.total;
    }

    $("#warninglist").append(sHtml);
    listSize = $("#warninglist dd").length;
    if (listSize >= total) $('#warningMore').css('display', 'none');

    _myScroller.refresh();
};

//url封装
function _getStringHref(data){
    var _shref='warningSearch.html?',alarmname,qureytype, products,editData = HW.Tools.getLocalStorage('editorData_warning');
    if(!!data){
        alarmname = data.alarmname || '';
        if(!editData==null || editData){
            qureytype = editData[0].qureytype;
            products = editData[0].products;
        }else{
            qureytype=0;
            products='';
        }
        _shref += 'alarmname=' + alarmname + '&qureytype=' + qureytype + '&products=' + products;
        return HW.Tools.reEncondeURIComponent(_shref);
    }else{
        return '#';
    }
};

//enter事件搜索及加载更多
function _bindEvent(){
    var editData = HW.Tools.getLocalStorage('editorData_warning'),qureytype,products;
    if(editData || !editData==null){
        qureytype = editData[0].qureytype;
        products = editData[0].products;
    }else{
        qureytype=0;
        products='';
    };
    $('#warning_search_text').unbind("keydown").keydown(function(event){
        if (event.which === 13){
            //关键字搜索及关键字相关存储
            $(this).blur();
            var stext, qureytype='0', products='', callback, url,stext =  $.trim($('#warning_search_text').val());
            if(!!!stext && stext!==0){
                simpleDialog.show() && simpleDialog.destroy();
                simpleDialog.alert({content: HW.lang.getLocalString('warningSearch_key')});
                return;
            }
            url = _getStringHref({alarmname:stext,qureytype:qureytype,products:products});
            HW.Tools.setLocalStorage("warning_search_storage", {"alarmname": stext, "qureytype": qureytype,"products":products}, 100, "alarmname");
            $('#warning_search_button').attr('href', url).trigger('click');
        }
    });
    //more
    $('#warningMore').unbind().bind('click',function(e){
        var options = {error: _handleError};
        options.url = HW.GlobalState.baseUrl + "/alarm/alarm/queryAlarmList.json";
        options.data = {
            "products":products,
            "alarmname":$('#warningMore').attr('alarmname'),
            "qureytype":qureytype,
            "limit":20,
            "offset":$('#warninglist dd').length
        }
        options.success = function (data) {
            _showMoreSearchList(data);
        }
        HW.Core.loadPage(options);
    });
};
//自动匹配
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
            data.push(obj["alarmname"]);
        }
        $("#warning_search_text").autocomplete(data.reverse(), {
            max: 5,
            selectFirst: false,
            highlight: false,
            multipleSeparator: "",
            delay: 100
        });
    }
}
//第一次进入及搜索结果展示页
function _delegateContentShow(){
    var _ourl=HW.Tools.parseURL($('base').attr('href')),options, stext, qureytype, products, limit,iScrollB,_limit,signStatus,
        hasURLArg = 'qureytype' in _ourl;
    if(hasURLArg){
        $("#orderTitlew").html('<span>'+HW.lang.getLocalString('common_filter')+'</span>');
        $("#warning_Box1_wraper").hide();
        $("#search_Box_wraps").find("#order_search_titles").hide();
        $("#search_Box_wraps").html('<div class="top_search"><div data-role="fieldcontain" class="kuang" id="warning_search"><a href="#" class="icon" id="warning_search_button" data-inline="true"></a><input name="warning_search_text" id="warning_search_text" type="text" /></div></div>');

        var editData = HW.Tools.getLocalStorage('editorData_warning'),myQureytype,myProducts;
        if(!editData==null || editData){
            myQureytype = editData[0].qureytype;
            myProducts = editData[0].products;
        }else{
            myQureytype=0;
            myProducts='';
        }
        options    =  {error: _handleError};
        stext      =  _ourl.alarmname || '';
        qureytype  =  myQureytype;
        products   =  myProducts;
        limit     =  _ourl.limit || 20;
        $('#warning_search_text').val(stext);

        options.url = HW.GlobalState.baseUrl + "/alarm/alarm/queryAlarmList.json";
        options.data = {
            "products": products,
            "alarmname": stext,
            "qureytype": qureytype,
            "limit": limit,
            "offset": 0
        }
        options.success = function(data){
            _showSearchList(data);
            _autoComplete("warning_search_storage")
        };
        HW.Core.loadPage(options);
    }else{
        _lastSearch();
        _clearHisData();
    }
    _bindEvent();

};
function _showError(id, msg){
    var str = '<dd class="noproduct"><a href="#" >' + msg + '</a></dd>';
    $('#' + id).html(str);
    if(_myScroller){
        _myScroller.refresh();
    }else{
        _myScroller =   HW.Tools._addiScroll('warning_search_wapper', 'warning_search_outer');
    }
};
function _handleError(XHR, ts, errorThrown){
    if (ts=="timeout"){
        _showError('warninglist', HW.lang.getLocalString('abnormal_network_timeout'));
    }else{
        _showError('warninglist', HW.lang.getLocalString('abnormal_network_try'));
    }
};


//筛选 显示我关注产品及数据封装
function _myshowContent(data){
    var sHtml='<li><span class="radio-box" id="warning_editor_pro_focus"></span>'+ HW.lang.getLocalString('entire') +'</li>',
        perferenceProducts,len,i;
    try{
        perferenceProducts = data.body.perferenceProducts;
        len = perferenceProducts.length;
        if(!len){
            sHtml = '<li>' + HW.lang.getLocalString('product_attention_no_data') + '</li>';
        }else{
            for(i=0;i<len;i++)
                sHtml += '<li><span class="radio-box4" productid="'+perferenceProducts[i].productid +'"></span>'+perferenceProducts[i].productname+'</li>';
        }
    }
    catch(e){
        sHtml = '<li>' + HW.lang.getLocalString('product_attention_no_data') + '</li>';
    }
    HW.GlobalState.user.isSignIn ? $('#warning_editor_focus_list_ul').html(sHtml) : $('#warning_editor_focus_list_ul').html('<li>'+ HW.lang.getLocalString('orderSearch_js_login_focus') +'<a id="editorwaring_login" class="btn-right" style="display:block;" href="#">'+HW.lang.getLocalString('index_login')+'</a></li>');
    //折叠添加
    $("#warning_editor_focus_list_ul").before('<div class="dtSlow" id="dtSlows">'+HW.lang.getLocalString('orderSearch_js_focus_pro')+'<span></span></div>');

    _mydisplayStatus();
    $('.item-box').css("visibility","visible");
};

//筛选状态
function _mydisplayStatus(){
    if(HW.GlobalState.user.isSignIn){
        var editData = HW.Tools.getLocalStorage('editorData_warning'),qt="0";
        if(!editData || editData==null){
            qt="0";
        }else{
            var qt=editData[0].qureytype;
        }

        var $editor_pro_all = $('#warning_editor_pro_all'), //全部产品
            $editor_pro_focus = $('#warning_editor_pro_focus'), //我收藏的产品
            $SPANS     = $('#warning_editor_focus_list_ul span'), //子类span产品
            $LIS = $('#warning_editor_focus_list_ul li'),
            products,len;
        //选择全部产品
        if(!qt ||qt =='0'){
            $editor_pro_all.addClass('cur');
            $editor_pro_all.parents("li").addClass("redS1");
            $SPANS.removeClass('cur');
            $SPANS.parents("li").removeClass("redS1");
        }else if(qt =='1'){
            $editor_pro_all.removeClass('cur');
            $editor_pro_all.parents("li").removeClass("redS1");
            $SPANS.addClass('cur');
            $SPANS.parents("li").addClass("redS1");
        }else if(qt == '2'){
            $editor_pro_all.removeClass('cur');
            $editor_pro_all.parents("li").removeClass("redS1");
            $SPANS.removeClass('cur');
            $SPANS.parents("li").removeClass("redS1");
            products = editData[0].products.split(',');
            len = products.length;
            if(!len) return;
            $SPANS.each(function(){
                var pid = this.getAttribute('productid'),i;
                if(pid == null) return true;
                for(i=0; i < len; i++){
                    if(pid == products[i]){
                        $(this).addClass('cur');
                        $(this).parents("li").addClass("redS1");
                        break;
                    }
                }
            });
            if($('#warning_editor_focus_list_ul .cur').length == $SPANS.length-1){
                $editor_pro_focus.addClass('cur');
                $editor_pro_focus.parents("li").addClass("redS1");
            }else{
                $editor_pro_focus.removeClass('cur');
                $editor_pro_focus.parents("li").removeClass("redS1");
            }
        }
        //清空
        $("#warning_clear_sort").unbind("click").bind("click",function(){
            $editor_pro_all.addClass('cur');
            $SPANS.removeClass('cur');
            $LIS.removeClass('redS1');
        });
        //收缩
        $("#dtSlows").unbind().toggle(function(){
            console.log("aaa")
            $(this).addClass("slowRotate");
            $("#warning_editor_focus_list_ul").hide();
        },function(){
            $(this).removeClass("slowRotate");
            $("#warning_editor_focus_list_ul").show();
        })
    }
};

//筛选产品状态切换
function _mybindEvent(){
    //登录跳转
    if(!HW.GlobalState.user.isSignIn){
        $('#editorwaring_login').click(function(event){
            var _url = $('base').attr('href');
            HW.GlobalState.signJumpPage =  _url;
            HW.GlobalState.signBackPage=_url;
            $.mobile.changePage("signIn.html",{changeHash:false});
            event.preventDefault();
            return false;
        });
    }

    $('#warning_editor_order_outer').undelegate().delegate('li','click',function(e){
        var target     = e.target, id,
            $target    = $(target),
            isAllCur   = true,
            $li,
            $fSPAN     = $('#warning_editor_pro_focus'),
            $SPANS     = $('#warning_editor_focus_list_ul span'),$warning_editor_pro_all  = $('#warning_editor_pro_all');
        if(target.tagName !== "SPAN"){
            $li = $target.closest('li');
            $target =$('span',$li);
        }
        id = $target.attr('id');
        $target.toggleClass('cur');
        $target.parents("li").toggleClass('redS1');
        //所有产品
        if(id && id ==="warning_editor_pro_all"){
            if($target.hasClass('cur')){
                $('#warning_editor_pro_all').addClass('cur');
                $('#warning_editor_pro_all').parents("li").addClass("redS1");
                $SPANS.removeClass('cur');
                $SPANS.parents("li").removeClass("redS1");
            }
        }else if(id && id ==="warning_editor_pro_focus" ){
            if($target.hasClass('cur')){
                //我关注的产品
                $('#warning_editor_pro_all').removeClass('cur');
                $('#warning_editor_pro_all').parents("li").removeClass("redS1");
                $SPANS.addClass('cur');
                $SPANS.parents("li").addClass("redS1");
            }else{
                $SPANS.removeClass('cur');
                $SPANS.parents("li").removeClass("redS1");
            }
        }else{
            //子关注产品
            $SPANS.not($fSPAN[0]).each(function(i){
                if(!$(this).hasClass('cur')){
                    return (isAllCur = false);
                }
            });
            if(isAllCur){
                $fSPAN.addClass('cur');
                $fSPAN.parents("li").addClass("redS1");
            }else{
                $fSPAN.removeClass('cur');
                $fSPAN.parents("li").removeClass("redS1");
            }
            $('#warning_editor_pro_all').removeClass('cur');
            $('#warning_editor_pro_all').parents("li").removeClass("redS1");
        }
        var myLen=$(".cur").length, i,products=[],_shref ='warningSearch.html?',urlOk,
            sstext=$.trim($('#warning_search_text').val()),cmdname;

        //筛选随机取值
        if($("#warning_editor_pro_all").hasClass("cur")){
            var qureytype= 0,products='';
        }else if($("#warning_editor_pro_focus").hasClass("cur")){
            var qureytype= 1,products='';
        }else{
            $SPANS.each(function(idx){
                $(this).hasClass('cur') && products.push($.trim($(this).attr('productid')));
            });
            if(products.length){
                var qureytype  = "2";
                var products = products.join(",");
            }else{
                var qureytype  = "0";
                var products = "";
            }
        }

    });
    _myeditSearchData();
};
//筛选请求
function _myeditSearchData(){
    $('#warning_editor_set').unbind().bind('click',function(e){

        if(!$("#warning_editor_order_outer span").hasClass("cur")){
            simpleDialog.alert({content:HW.lang.getLocalString('PleaseProduct')});
            return;
        }
        HW.Tools.myMenuBottom('1');
        $("#warning_left_Sidebar").removeClass("scroller").addClass("scroller-hide");
        $("#warning_right_Sidebar").addClass("hide").removeClass("leftAbso left2");
        $("#warningMore").css("display","none");
        $("#warning_search_outer").siblings("div").remove();




        var $editor_pro_all  = $('#warning_editor_pro_all'),
            $editor_pro_focus= $('#warning_editor_pro_focus'),
            $SPANS =$('#warning_editor_focus_list_ul span').not($editor_pro_focus[0]),
            products = [],myQureytype,myProducts;
        if($editor_pro_all.hasClass('cur')){
            myQureytype  = "0";
            myProducts ='';
        }
        else if($editor_pro_focus.hasClass('cur')){
            myQureytype  = "1";
            myProducts ='';
        }else{
            $SPANS.each(function(idx){
                $(this).hasClass('cur') && products.push($.trim($(this).attr('productid')));
            });
            if(products.length){
                myQureytype  = "2";
                myProducts = products.join(",");
            }else{
                myQureytype  = "0";
                myProducts ='';
            }
        }

        var stextQ=$.trim($('#warning_search_text').val()),myoptions;
        $("#warning_search_text").val(stextQ);
        console.log(stextQ)
        HW.Tools.setLocalStorage("editorData_warning", {"dataName":"dataNames","qureytype":myQureytype,"products": myProducts},100,"dataNames");

        var editData = HW.Tools.getLocalStorage('editorData_warning');
            myoptions={
                url:HW.GlobalState.baseUrl + "/alarm/alarm/queryAlarmList.json",
                data:{
                    "products": editData[0].products,
                    "alarmname": stextQ,
                    "qureytype": editData[0].qureytype,
                    "limit": 20,
                    "offset": 0
                }
            }
            myoptions.success = function(data){
                console.log(data);
                _showSearchList(data);
            };
            HW.Core.loadPage(myoptions);
        console.log("myoptionsdclick");
    });
};


//筛选数据请求
function _myeditorOrderSearch(){
    option={
        url:HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json",
        cache: false,
        data:{
            "limit":10000,
            "offset":0,
            "keywords":""
        },
        error: _handleError
    }
    option.success=function(data){
        _myshowContent(data);
        _mybindEvent();
        _myScroller = HW.Tools._addiScroll('warning_editor_order_wapper','warning_editor_order_outer',0,0,0,0);
        _myScroller.refresh();

    }
    HW.Core.loadPage(option);
};

function _myshowError(id, msg){
    str = '<li><a href="#">' + msg + '</a></li>';
    $('#' + id).html(str);
};
function _myhandleError(XHR, ts, errorThrown){
    if (ts == "timeout") {
        _showError('warning_editor_focus_list_ul', HW.lang.getLocalString('abnormal_network_timeout'));
    }else{
        _showError('warning_editor_focus_list_ul', HW.lang.getLocalString('abnormal_network_try'));
    }
};
    function _mySidebarAllwarning(leftID,sideID,btnID,elem,maskID){
        var leftID=$("#"+leftID),sideID=$("#"+sideID),btnID=$("#"+btnID),maskID=$("#"+maskID),elems;
        console.log(typeof(elem))
        if (typeof elem != "string") {
            console.log(elem)
            elems=''
        }else{
            elems=$("."+elem)
        }
        console.log(elem);

        //显示侧栏
        function _mySwipeleft(){
            HW.Tools.myMenuBottom('5');
            leftID.removeClass("scroller-hide").addClass("scroller shadow");
            sideID.removeClass("hide").addClass("leftAbso left2");
            maskID.removeClass("hide");
        }
        //隐藏侧栏
        function _mySwiperight(){
            HW.Tools.myMenuBottom('1');
            leftID.removeClass("scroller shadow").addClass("scroller-hide");
            sideID.addClass("hide").removeClass("leftAbso left2");
            maskID.addClass("hide");
        }
        //btn事件
        btnID.unbind("click").bind("click",function(oEnt){
            $("#warning_editor_focus_list_ul").html('');
            $("#warning_editor_order_outer").siblings("div:not('.ctrl_box')").remove();
            $("#dtSlows").remove();
            _myeditorOrderSearch();
            oEnt.stopPropagation();
            if(sideID.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        //遮罩事件
        maskID.unbind("click").bind("click",function(){
            _mySwiperight();
        })
        //swipeleft左滑  swiperight右滑
        maskID.unbind("swiperight").bind("swiperight",function(){
            _mySwiperight();
        })

    }

    return {
        pageConfig: {
            name: 'WarningSearch',
            id: 'warningSearch',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            'onlyExecNotAjax':true
        },
        showData: function () {
            HW.Tools.myMenuBottom(1);
            _delegateContentShow();
            _autoComplete("warning_search_storage")
            $("#warning_right_Sidebar").addClass("hide");
            setTimeout(function(){
                _mySidebarAllwarning("warning_left_Sidebar","warning_right_Sidebar","orderTitlew",'ctrl_box',"page_maskWs");
            },100)

        }
    }
})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("WarningSearch", HW.WarningSearch);

//加载Demo页面的数据
HW.Core.loadPage("WarningSearch");






















