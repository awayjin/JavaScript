//命令查询
HW.OrderSearch = (function () {
var GlobaliScroll,_myScroller=null;

//最近搜索
function _lastSearch(){
    $("#odrderMore").css("display","none");
    $("#orderlist").css("display","none").attr("id","");
    $("#orderlist").siblings("a").css("display","none");
    $('#order_search_wapper').removeAttr("class");
    var pname, sHtml = '', i, len, data, localData;
    try{
        data=[];
        //取历史数据10条
        localData = HW.Tools.getLocalStorage('order_search');
        console.log("localData======111"+localData)
        if(localData==null || !localData){
            $('#order_search_tip_warpsW').html('<div id="order_search_tipW" class="tip_bar">'+HW.lang.getLocalString('nhistoryDs')+'</div>');
            $('#orderlistHisW').html('');
        }else{
            //最近搜索==没有搜索记录的时候显示什么
            $('#order_search_tip_warpsW').html('<div id="order_search_tipW" class="tip_bar">'+HW.lang.getLocalString('last_search_oa')+'</div>');
        }
        len = localData.length;
        localData.reverse();
        len = len >= 10 ? 10 :len;
        console.log("localData===="+localData)
        for (i=0;i<len;i++){
            pname = localData[i].cmdname;
            sHtml += '<dd><a href="'+ _getStringHref(localData[i]) + '"><span class="load-icon"></span><span class="orderListTi">' + pname +'</span></a></dd>';
        };
        //添加清除历史按钮
        sHtml+='<dd id="clearHisData" class="clear_btn"><span>'+ HW.lang.getLocalString('commnon_clear_search') +'</span></dd>';
        $("#orderlistHisW").html(sHtml);
        setTimeout(function(){
            _myScroller = HW.Tools._addiScroll('order_search_wapperW','order_search_outerW',0,0,0,0);
        },50)
        //取筛选存储记录
        var editData = HW.Tools.getLocalStorage('editorData');

        if(editData==null || !editData){
            return false;
        }
        if(editData[0].qureytype==1 || editData[0].qureytype==2){
            $("#order_search_tipW").append('<span class="tipTi">'+HW.lang.getLocalString('orderSearch_js_focus_pro')+'</span>')
        }
    }catch(e){
        $('#orderlistHisW').html('');
    }
};

//清除历史记录
function _clearHisData(){
    $("#clearHisData").unbind().bind("click",function(){
        simpleDialog.confirm({
            content:HW.lang.getLocalString('common_confirm_delete'),
            buttons:{
                 ok:function(){window.localStorage.removeItem('order_search');_lastSearch();}
            }
        });
    })
};

//数据封装
function _handData(data){
    if(!data || !data.body){
        return '<dd class="noproduct"><a href="">'+HW.lang.getLocalString('records_relative_no_data')+'</a></dd>';
    };
    var sHtml='',commandDos= data.body.commandlist,len=commandDos.length,i,pname,str;

    for(i=0;i<len;i++){
        pname=commandDos[i].cmdname;
        sHtml+='<dd class="resultList"><a href="'+(commandDos[i].dataversion =="1" ? 'orderSearchDetail_tl.html' : 'orderSearchDetail.html')+'?cmdid=' + commandDos[i].cmdid + '">'+'<span class="orderListTi">'+pname+'</span>'+(commandDos[i].proversionname!=='' ? commandDos[i].proversionname :commandDos[i].productname)+ '</a></dd>';
    }
    return sHtml;
};

//搜索结果列表具体页面显示
function _showSearchList(data){
    var sHtml=_handData(data), total,listSize, moreHref;
    if (!data || !data.body || data.body.commandlist.length===0){
        total=0;
    }else{
        total=data.body.total;
    }
    $('#order_search_tip_warps').html('<div id="order_search_tipW" class="tip_bar">'+HW.lang.getLocalString('foundDs')+'<span class="red">'+(total>>>0)+'</span>'+HW.lang.getLocalString('articleDs')+'</div>');
    $('.orderTips').css('display','block');

    $("#orderlist").removeClass("orderlist search-tools list90").addClass("search-re list120").html(sHtml);


    listSize=$("#orderlist dd").length;
    if(total>listSize && total!=0){
        console.log($('#odrderMore').attr("cmdname"))
        $('#odrderMore').css('display','block').attr('cmdname',$.trim($('#order_search_text').val()));
        console.log($('#odrderMore').attr("cmdname"))
    }
    _myScroller = HW.Tools._addiScroll('order_search_wapper','order_search_outer',0,0,0,0);
    _myScroller.refresh();
    $('#order_search_wapper').addClass("order_search_wapperTS");

};

//更多处理
function _showMoreSearchList(data) {
    var sHtml = _handData(data), total ,listSize;
    if (!data || !data.body ||data.body.commandlist.length===0){
        total = 0;
    }else{
        total = data.body.total;
    };
    $("#orderlist").append(sHtml);
    listSize = $("#orderlist dd").length;
    if(listSize >= total) $('#odrderMore').css('display','none');
    _myScroller.refresh();
};

//url封装
function _getStringHref(data){
    var _shref = 'orderSearch.html?',cmdname,qureytype, products,editData = HW.Tools.getLocalStorage('editorData');
    if(!!data){
        cmdname = data.cmdname || '';
        if(!editData==null || editData){
            qureytype = editData[0].qureytype;
            products = editData[0].products;
        }else{
            qureytype=0;
            products='';
        }
        _shref+='cmdname=' + cmdname + '&qureytype=' + qureytype + '&products=' + products;
        return HW.Tools.reEncondeURIComponent(_shref);
    }else{
        return '#';
    }
};


//enter事件搜索及加载更多
function _bindEvent(){
    var editData = HW.Tools.getLocalStorage('editorData'),qureytype,products;
    console.log("editData====22"+editData);
    if(editData || !editData==null){
        qureytype = editData[0].qureytype;
        products = editData[0].products;
    }else{
        qureytype=0;
        products='';
    }

    $('#order_search_text').unbind("keydown").keydown(function (event){
        if(event.which === 13) {
            $(this).blur();
            var stext, qureytype='0', products='', callback, url, stext=$.trim($('#order_search_text').val());
            if(!!!stext && stext!==0){
                simpleDialog.show() && simpleDialog.destroy();
                simpleDialog.alert({content: HW.lang.getLocalString('orderSearch_key')});
                return;
            }
            url = _getStringHref({cmdname:stext,qureytype:qureytype,products:products});
            //最近搜索
            HW.Tools.setLocalStorage("order_search", {"cmdname": stext, "qureytype": qureytype,"products":products}, 100, "cmdname");
            $('#order_search_button').attr('href', url).trigger('click');
        }
    });

    //more
    $('#odrderMore').unbind().bind('click',function (e) {
        var options = {error: _handleError};
        options.url = HW.GlobalState.baseUrl + "/command/command/getCommandlist.json";
        options.data = {
            "products": products,
            "cmdname": $('#odrderMore').attr('cmdname'),
            "qureytype": qureytype,
            "limit": 20,
            "offset": $('#orderlist dd').length
            }
        options.success=function(data){
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
            data.push(obj["cmdname"]);
        }
        $("#order_search_text").autocomplete(data.reverse(), {
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
    var _ourl = HW.Tools.parseURL($('base').attr('href')),woptions, stext, qureytype, products, limit,_limit,len,el,iScrollB,
        hasURLArg = 'qureytype' in _ourl,signStatus;
    if(hasURLArg){

        $("#orderTitle").html('<span>'+HW.lang.getLocalString('common_filter')+'</span>');
        $("#search_Box1_wraper").hide();
        console.log($('#order_search_wapper'))

        $("#search_Box_wrap").find("#order_search_title").hide();
        $("#search_Box_wrap").html('<div class="top_search"><div data-role="fieldcontain" class="kuang" id="order_search"><a href="#" class="icon" id="order_search_button" data-inline="true"></a><input name="order_search_text" id="order_search_text" value="" type="text" class=""></div></div>');

        var editData = HW.Tools.getLocalStorage('editorData'),myQureytype,myProducts;
        if(!editData==null || editData){
            myQureytype = editData[0].qureytype;
            myProducts = editData[0].products;
        }else{
            myQureytype=0;
            myProducts='';
        }
        stext      =  _ourl.cmdname || '';
        qureytype  =  myQureytype;
        products   =  myProducts;
        limit      =  _ourl.limit || 20;

        $('#order_search_text').val(stext);
        woptions={
            url:HW.GlobalState.baseUrl + "/command/command/getCommandlist.json",
            data:{
                "products": products,
                "cmdname": stext,
                "qureytype": qureytype,
                "limit": limit,
                "offset": 0
            }
        }
        woptions.success = function(data){
            _showSearchList(data);
            _autoComplete("order_search");
        };
        HW.Core.loadPage(woptions);

    }else{
        _lastSearch();
        _clearHisData();

    }
    _bindEvent();


};

function _showError(id, msg){
    var str='<dd class="noproduct"><a href="#">' +msg+'</a></dd>';
    $('#' + id).html(str);
    if(_myScroller){
        _myScroller.refresh();
    }else{
        _myScroller=  HW.Tools._addiScroll('order_search_wapper', 'order_search_outer');
    }
};
function _handleError(XHR, ts, errorThrown){
    if(ts == "timeout"){
        _showError('orderlist', HW.lang.getLocalString('abnormal_network_timeout'));
    }else{
        _showError('orderlist', HW.lang.getLocalString('abnormal_network_try'));
    }
};


//筛选 显示我关注产品及数据封装
function _myshowContent(data){
    var sHtml='<li><span class="radio-box" id="editor_pro_focus"></span>'+ HW.lang.getLocalString('applyforall')+'</li>',
        perferenceProducts,len, i;
    try{
        perferenceProducts = data.body.perferenceProducts;
        len = perferenceProducts.length;
        if(!len){
            sHtml = '<li>' + HW.lang.getLocalString('product_attention_no_data') + '</li>';
        }else{
            for(i=0;i<len;i++)
                sHtml += '<li><span class="radio-box4" productid="'+perferenceProducts[i].productid +'"></span>'+perferenceProducts[i].productname+'</li>';
        }
    }catch(e){
        sHtml = '<li>' + HW.lang.getLocalString('product_attention_no_data') + '</li>';
    }

    HW.GlobalState.user.isSignIn ? $('#editor_focus_list_ul').html(sHtml) : $('#editor_focus_list_ul').html('<li>'+ HW.lang.getLocalString('orderSearch_js_login_focus')+' <a id="editor_login" class="btn-right" style="display:block;" href="#">'+ HW.lang.getLocalString('index_login') +'</a></li>');
    //折叠添加
    $("#editor_focus_list_ul").before('<div class="dtSlow" id="dtSlow">'+HW.lang.getLocalString('orderSearch_js_focus_pro')+'<span></span></div>');

    _mydisplayStatus();
    $('.item-box').css("visibility","visible");
};

//筛选状态
function _mydisplayStatus(){
    if(HW.GlobalState.user.isSignIn){
        var editData = HW.Tools.getLocalStorage('editorData'),qt="0";
        if(!editData || editData==null){
            qt="0";
        }else{
            var qt=editData[0].qureytype;
        }
        console.log("qt======"+qt)
        var $editor_pro_all = $('#editor_pro_all'),
            $editor_pro_focus = $('#editor_pro_focus'),
            $SPANS = $('#editor_focus_list_ul span'),
            $LIS = $('#editor_focus_list_ul  li'),
            products,len;
        //选择全部产品
        if(!qt || qt=='0'){
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
                for(i=0;i<len;i++){
                    if(pid == products[i]){
                        $(this).addClass('cur');
                        $(this).parents("li").addClass("redS1");
                        break;
                    }
                }
            });
            if($('#editor_focus_list_ul .cur').length == $SPANS.length-1){
                $editor_pro_focus.addClass('cur');
                $editor_pro_focus.parents("li").addClass("redS1");
            }else{
                $editor_pro_focus.removeClass('cur');
                $editor_pro_focus.parents("li").removeClass("redS1");
            }
        }
        //清空
        $("#clear_sort").unbind("click").bind("click",function(){
            $editor_pro_all.addClass('cur');
            $SPANS.removeClass('cur');
            $LIS.removeClass('redS1');
        });
        //收缩
        $("#dtSlow").toggle(function(){
            $(this).addClass("slowRotate");
            $("#editor_focus_list_ul").hide();
        },function(){
            $(this).removeClass("slowRotate");
            $("#editor_focus_list_ul").show();
        })
    }
};

//筛选产品状态切换
function _mybindEvent(){
    //登录跳转
    if(!HW.GlobalState.user.isSignIn){
        $('#editor_login').click(function(event){
            var _url = $('base').attr('href');
            HW.GlobalState.signJumpPage =_url;
            HW.GlobalState.signBackPage=_url;
            $.mobile.changePage("signIn.html",{changeHash:false});
            event.preventDefault();
            return false;
        });
    }

    $('#editor_order_outer').undelegate().delegate('li','click',function(e){
        var target     = e.target, id,
            $target    = $(target),
            isAllCur   = true,
            $li,
            $fSPAN     = $('#editor_pro_focus'),
            $SPANS     = $('#editor_focus_list_ul span'),$editor_pro_all  = $('#editor_pro_all');
        if(target.tagName !== "SPAN"){
            $li = $target.closest('li');
            $target =$('span',$li);
        }

        id = $target.attr('id');
        $target.toggleClass('cur');
        $target.parents("li").toggleClass('redS1');
        //所有产品
        if(id && id ==="editor_pro_all"){
            if($target.hasClass('cur')){
                $('#editor_pro_all').addClass('cur');
                $('#editor_pro_all').parents("li").addClass("redS1");
                $SPANS.removeClass('cur');
                $SPANS.parents("li").removeClass("redS1");
            }
        }else if(id && id ==="editor_pro_focus" ){
            //我关注的产品
            if($target.hasClass('cur')){
                $('#editor_pro_all').removeClass('cur');
                $('#editor_pro_all').parents("li").removeClass("redS1");
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
            $('#editor_pro_all').removeClass('cur');
            $('#editor_pro_all').parents("li").removeClass("redS1");
        }
        var myLen=$(".cur").length, i,products=[],_shref ='orderSearch.html?',urlOk,
            stext=$.trim($('#order_search_text').val()),cmdname;
        //筛选随机取值
        if($("#editor_pro_all").hasClass("cur")){
            var qureytype= 0,products='';
        }else if($("#editor_pro_focus").hasClass("cur")){
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

        //sureBtn url
        /*cmdname = stext || '',_shref += 'cmdname=' + cmdname + '&qureytype=' + qureytype + '&products=' + products;
        urlOk=HW.Tools.reEncondeURIComponent(_shref);
        $("#editor_set").attr("href",urlOk);*/
    });

    _editSearchData();
};
function _myshowError(id, msg){
    str = '<li><a href="#">' + msg + '</a></li>';
    $('#' + id).html(str);
};
function _myhandleError(XHR, ts, errorThrown){
    if(ts == "timeout"){
        _myshowError('editor_focus_list_ul', HW.lang.getLocalString('abnormal_network_timeout'));
    }else{
        _myshowError('editor_focus_list_ul', HW.lang.getLocalString('abnormal_network_try'));
    }
};

//查询类型确定存储
function _editSearchData(){
    $('#editor_set').unbind().bind('click',function(e){
        if(!$("#editor_order_outer span").hasClass("cur")){
            simpleDialog.alert({content:HW.lang.getLocalString('PleaseProduct')});
            return;
        }

        HW.Tools.myMenuBottom('1');
        $("#order_left_Sidebar").removeClass("scroller").addClass("scroller-hide");
        $("#order_right_Sidebar").addClass("hide").removeClass("leftAbso left2");
        $("#odrderMore").css("display","none");

        $("#order_search_outer").siblings("div").remove();

        var $editor_pro_all  = $('#editor_pro_all'),
            $editor_pro_focus= $('#editor_pro_focus'),
            $SPANS =$('#editor_focus_list_ul span').not($editor_pro_focus[0]),
            products = [],myQureytype,myProducts;
        if($editor_pro_all.hasClass('cur')){
            myQureytype= "0";
            myProducts='';
        }else if($editor_pro_focus.hasClass('cur')){
            myQureytype= "1";
            myProducts='';
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
        console.log(myProducts);
        var stext=$.trim($('#order_search_text').val()),myoptions;
        HW.Tools.setLocalStorage("editorData", {"dataName":"dataName","qureytype":myQureytype,"products": myProducts},100,"dataName");



        var editData = HW.Tools.getLocalStorage('editorData');
        myoptions={
            url:HW.GlobalState.baseUrl + "/command/command/getCommandlist.json",
            data:{
                "products": editData[0].products,
                "cmdname": stext,
                "qureytype": editData[0].qureytype,
                "limit": 20,
                "offset": 0
            }
        }
        myoptions.success = function(data){
            _showSearchList(data);
        };
        HW.Core.loadPage(myoptions);

        console.log("asdadclick");
    });


};


//筛选数据请求
function _myeditorOrderSearch(){
    option={
        url:HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json",
        data:{
            "limit":100000,
            "offset":0,
            "keywords":""
        },
        error: _myhandleError
    }
    option.success=function(data){
        _myshowContent(data);
        _mybindEvent();
        _myScroller = HW.Tools._addiScroll('editor_order_wapper','editor_order_outer',0,0,0,0);
        _myScroller.refresh();

    }
    HW.Core.loadPage(option);
};

//侧栏
    function _mySidebarAllorder(leftID,sideID,btnID,elem,maskID){
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
            $("#editor_focus_list_ul").html('');
            $("#editor_order_outer").siblings("div:not('.ctrl_box')").remove();
            $("#dtSlow").remove();
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
            name: 'OrderSearch',
            id: 'orderSearch',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            'onlyExecNotAjax':true
        },
        showData:function(){
            HW.Tools.myMenuBottom(1);
            _delegateContentShow();
            _autoComplete("order_search");
            $("#order_right_Sidebar").addClass("hide");
            setTimeout(function(){
                _mySidebarAllorder("order_left_Sidebar","order_right_Sidebar","orderTitle",'ctrl_box',"page_maskOs");
            },100);

        }
    }
})();
//使用前，需要先注册 Demo对象
HW.Core.addModule("OrderSearch", HW.OrderSearch);
//加载Demo页面的数据
HW.Core.loadPage("OrderSearch");
