
HW.GlobalSiteSearchList=(function(){
    var myScroller, gCacheAjaxData = [],
        conditionScroller;
    /* 请求html页面传递的参数转化成对象 */
    function _getRequestPageParams() {
        return HW.Tools.parseURL($('base').attr('href'));
    }

    /*错误处理*/
    function _handleError(XHR, ts, errorThrown) {}

    /* ajax请求远程数据 */
    function _requestRemoteData(oParam, fSuccess) {
        var option = {
            url: HW.GlobalState.baseUrl + oParam['url'],
            error: _handleError,
            data: oParam['data'],
            success: fSuccess
        };
        HW.Core.loadPage(option);
    }


    /*搜索结果*/
    function _searchResults(oPageParam){
            var _data = {
                productcatid:oPageParam['productcatid'] || '',
                contenttype:oPageParam['contenttype'] || 'SUP_DOC',
                lang:oPageParam['lang'] || HW.GlobalState.appConifg.currentLang,
                keywords:encodeURIComponent( oPageParam['keywords']) || '',
                doctypeid:oPageParam['doctypeid'] || '',
                ordertype:oPageParam['ordertype'] || 'desc',
                resouceType:oPageParam['resouceType'] || '',
                startDate:oPageParam['startDate'] || '',
                endDate:oPageParam['endDate'] || '',
                timeType:oPageParam['timeType'] || '',
                limit:oPageParam['limit'] || 20,
                offset:oPageParam['offset'] || 0
            },
            oAjaxParam={url:'/search/allsitesearch/searchTitles.json',data:_data};
            if(oPageParam['keywords'] == '') {
                simpleDialog.alert({content:  HW.lang.getLocalString('siteSearchList_search') });
                return false;
            }
          HW.Tools.setLocalStorage(HW.GlobalState["lastProSearch"], {"name": oPageParam['keywords']}, 10, "name");
            $('#global_search_filter_btn').html(HW.lang.getLocalString('common_filter')).attr('isfilter','true');//处理边栏标志
            $('#global_search_clear_history').addClass('hide');

            $('#global_search_input').val( oPageParam['keywords']);
            $('#gs_back').removeClass('hide');
           _autoComplete(HW.GlobalState.lastProSearch);
           $('#gsearch_cmh').removeClass('search_box_hty');
             _requestRemoteData(oAjaxParam,  _showResults);


        }

     /*显示搜索结果*/
     function _showResults(data){
         if(_checkData(data)){
            //显示搜索记录数
             var total = data['body']['totalcount'] || 0;
              $('#global_search_total').html(HW.lang.getLocalString('foundDs')+'<span class="clr_red">' +
                  (total) +'</span>'+HW.lang.getLocalString('articleDs')+
                  (!HW.GlobalState.user.isSignIn ? '<span class="mf_login"><a class="clr99" href="signIn.html">'+
                       HW.lang.getLocalString('gs_Set_search_tips0') +'</a>' + HW.lang.getLocalString('gs_Set_search_tips1')+'</span>' : ''));
             gCacheAjaxData[2] = [{name:HW.lang.getLocalString('entire'), id:''}];
             gCacheAjaxData[0] = [{name:HW.lang.getLocalString('entire'), id:''}];
             gCacheAjaxData[2] = gCacheAjaxData[2].concat(data['body']['docTypeCategories'] || []) ;
             gCacheAjaxData[0]  = gCacheAjaxData[0].concat(data['body']['typeCategories'] || []);
            //展示搜索结果
             $('#global_search_content').html(_getResultDataHtml(data['body']['allSiteSearchTitles']));

              //处理更多
             if($('#global_search_content li').length < total){
                $('#pullUp').css('display','block');
             }
             else{
                 $('#pullUp').css('display','none');
             }
             myScroller.refresh();
         }
         else{ //数据不正确
             gCacheAjaxData[2] = [{name:HW.lang.getLocalString('entire'), id:''}]
             gCacheAjaxData[0] = [{name:HW.lang.getLocalString('entire'), id:''}]
             $('#global_search_content').html('<li><a class="text_ellipsis" href="#">' +
                 HW.lang.getLocalString( 'abnormal_network') + '</a></li>');
         }
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
            $("#global_search_input").autocomplete(data.reverse(), {
                max: 5,
                selectFirst: false,
                highlight: false,
                multipleSeparator: "",
                delay: 100
            });
        }
    }

     function _getResultDataHtml(allSiteSearchTitles){
         var i,  len =  allSiteSearchTitles.length , str = '', sHref = '',
             pageParam = {libid:'', libversion:'', url:'', directoryid:''},
             key = $('#global_search_input').val(),
             re= new RegExp(key,'gi'),
             titles ;
         if(!len){
             return '<li><a class="text_ellipsis" href="#">' +
             HW.lang.getLocalString('siteSearchList_tips0' ) + '</a></li>';
         }
         for(i = 0; i < len; i++){
             titles = allSiteSearchTitles[i]['title'];
             titles = titles.replace(re,function(r){
                 return '<span class="clr99">'+ r +'</span> '
             });
             pageParam['documentid']  = allSiteSearchTitles[i]['docid'] || '';
             pageParam['mid']  = allSiteSearchTitles[i]['type'] || 'SUP_DOC';
             pageParam['documentname']  = escape(titles)|| '';
             pageParam['isdirectory']  = allSiteSearchTitles[i]['hasDir'] || false;
             pageParam['ishedex']  = allSiteSearchTitles[i]['ishedex'] || false;
             sHref = 'docContent.html?' + $.param(pageParam);

            str += '<li><a class="text_ellipsis" href="' + HW.Tools.reEncondeURIComponent(sHref) + '">' + titles + '</a></li>';
         }
         return str;
     }

    /*检查返回的数据*/
    function _checkData(data,key){
        if(data && data['body']){
           return data;
        }
        return false

    }
     /*特殊处理自定义时间*/
    function _handleCustomTime(){
        var $gsc = $('#global_search_filter_content');
        if($('span[sid="scope"]', $gsc).hasClass('on')){ //显示自定义时间
            $('#gs_ul_time').removeClass('hide');
            $("dd:last-child", $gsc).css('borderBottom','none');
        }
        else{             //不显示自定义时间
            $('#gs_ul_time').addClass('hide');
            $("dd:last-child", $gsc).css('borderBottom','1px solid #BDBDBD');
        }
    }

    /*筛选数据*/
    function _setFilterDataHtml(index, value){
        var aTitles =[HW.lang.getLocalString('search_type'), HW.lang.getLocalString('search_language'),HW.lang.getLocalString('search_format'),HW.lang.getLocalString('search_product'),HW.lang.getLocalString('search_release_date')],
            i, len, str='', id, k, _len,name;
        // gCacheAjaxData[2] 格式  docTypeCategories
        //gCacheAjaxData[0]  类型    typeCategories
        gCacheAjaxData[1]=[{name:HW.lang.getLocalString('entire'), id:'all'},{name:HW.lang.getLocalString('siteSearchList_zh' ), id:'zh'},{name:HW.lang.getLocalString('siteSearchList_en' ), id:'en'}];
        gCacheAjaxData[3]=[{name:HW.lang.getLocalString('index_favorites_doc'), id:'SUP_DOC'},{name:HW.lang.getLocalString('index_cases'), id:'SUP_KB'},{name:HW.lang.getLocalString('bulletin_new'), id:'SUP_NEWS'}];
        gCacheAjaxData[4]= [
            {name:HW.lang.getLocalString('gs_all_time'), id:''},
            {name:HW.lang.getLocalString('gs_Last_week'), id:'week'},
            {name:HW.lang.getLocalString('gs_Last_month'), id:'month'} ,
            {name:HW.lang.getLocalString('gs_Last_six_months'), id:'half'},
            {name:HW.lang.getLocalString('gs_Last_year'), id:'year'},
            {name:HW.lang.getLocalString('gs_Set_search_time'), id:'scope'}
        ];
        $('#gs_con_title').html(aTitles[index]);

        if(index == 0 || index ==2){
            value = value.split(',');
            _len = value.length;
        }
        len =gCacheAjaxData[index].length;
        for(i = 0; i < len; i++){
            id = gCacheAjaxData[index][i]['id'];
            name = gCacheAjaxData[index][i]['name'];
            str += '<dd><a href="#">'+ name  +'<span class="btn ';
            if(index == 0 || index ==2){
                for(k=0; k < _len; k++){
                    if(value[k] == id) {
                        str +=   'on';
                        break;
                    }
                }
            }
            else{
                str +=  value == id ? 'on' :'';
            }
            str += '" sid="' + id + '" name="' + name + '"></span></a></dd>';
        }
        $('#global_search_filter_content').html(str);
        if(index == 4){
            _handleCustomTime();
        }
        else{
            $('#gs_ul_time').addClass('hide');
            $("#global_search_filter_content dd:last-child").css('borderBottom','1px solid #BDBDBD');
        }

        conditionScroller.refresh();
        _showFilterConditions(); //显示页面

    }

    /* 显示筛选条件子页面 */
    function _showFilterConditions(){
       $('#global_search_filter_condition').removeClass('hide');
       $('#global_search_right_Sidebar').addClass('hide');
       $('#global_search_left_Sidebar').addClass('hide');
       $("#page_mask_global_search").addClass("hide");
    }

    /* 隐藏筛选条件子页面 */
    function  _hideFilterConditions(){
        $('#global_search_filter_condition').addClass('hide');
        $('#global_search_right_Sidebar').removeClass('hide');
        $('#global_search_left_Sidebar').removeClass('hide');
        $("#page_mask_global_search").removeClass("hide");
    }

    /*初始筛选数据*/
    function _initFilterData(){
//        var curLang = HW.GlobalState.appConifg.currentLang;
//        $('#gs_lang').html(curLang == "zh" ? HW.lang.getLocalString('siteSearchList_zh') :HW.lang.getLocalString('siteSearchList_en')).attr('sdata', curLang);
    }

    /*注册事件*/
    function _regEvent(){
        /*回车搜索*/
        $('#global_search_input').keydown(function (event) {
            var re =/^[\`\~!@#\$%\^&\*\(\)\+=\|\{\}'\:;",\\\[\]\.\<\>\/\?~\！\@#\￥\%\……\&\*\（\）\-\-\+\|\{\}\【\】\‘\；\：\”\“\’\。\，\、\？]+$/gi
            if (event.which === 13) {
                var  stext = $.trim($(this).val()), isAlert = false, tips='';

                $(this).blur();
                $(this).prev().focus();

                if (!!!stext && stext.length == 0) {
                    tips = HW.lang.getLocalString('pro_search');
                    isAlert = true;
                }
                else if(stext.length === 1){
                    tips = HW.lang.getLocalString('search_key_one');
                    isAlert = true;
                }
                else if(re.test(stext)){
                    tips = HW.lang.getLocalString('gs_keywords_invalid');
                    isAlert = true;
                }
                if(isAlert){
                    simpleDialog.show() && simpleDialog.destroy();
                    simpleDialog.alert({content:tips});
                    return;
                }
                _searchResults({keywords:stext});
            }
        });
        /*搜索历史 点击去重新搜索*/
        $('#global_search_content').unbind('click').bind('click', function(e){
            var isFilter = $('#global_search_filter_btn').attr('isfilter') == 'true',
                hasSearchHistory = !$('#global_search_clear_history').hasClass('hide') ;
            if(!isFilter && hasSearchHistory){
                _searchResults({keywords: $.trim($(e.target).text())});
                return false;
            }

        }) ;
        /*确定筛选条件 确定*/
        $('#global_search_confirm').unbind('click').bind('click',function(e){
            var scope = $('#gs_doc_time').attr('sdata');
            console.log('gs_doc_type='+($('#gs_doc_type').attr('sdata')))
            _searchResults({
                contenttype:$('#gs_doc').attr('sdata') || '',
                lang:$('#gs_lang').attr('sdata') || 'all',
                keywords:$('#global_search_input').val() || '',
                doctypeid:$('#gs_doc_format').attr('sdata') || '',
                resouceType:$('#gs_doc_type').attr('sdata') || '',
                startDate:(scope === 'scope' ? $('#gs_start_time').text() : ''),
                endDate:(scope === 'scope' ? $('#gs_end_time').text() : ''),
                timeType:(scope === 'scope' ? '' : scope)

            });
           $('#page_mask_global_search').trigger('click');
        });
        /*清楚搜索历史*/
        $('#global_search_clear_history').unbind('click').bind('click',function(e){
              $('#global_search_content').html('');
              $('#global_search_clear_history').addClass('hide');
              localStorage.removeItem('lastProSearch');
        })
        /*单个筛选 子内容展示*/
        $('#global_search_conditions').unbind('click').bind('click',function(e){
             var $curDl = $(e.target).closest('dl'),
                 $dls = $('dl', this),
                 index = $dls.index($curDl),
                 sData = $('b', $curDl).attr('sdata');
              $(this).attr('index', index);
             _setFilterDataHtml(index, sData);
        })
        /*筛选 取消 确定*/
        $('#global_search_con_header').unbind('click').bind('click',function(e){
             var target = e.target,
                 tagName = target.tagName.toUpperCase(),
                 index = $('#global_search_conditions').attr('index'),
                 $curFilterDL, $curFilterB, id, name, $Temp,
                 sGs_start_time,sGs_end_time,
                 regDate = /^(0?[1-9]|[1-2]\d|3[0-1])\/(0?[1-9]|1[0-2])\/\d{4}$/;

             if(tagName === 'A'){
                 if($(target).hasClass('btn_right')){ //确定
                     $curFilterDL = $('#global_search_conditions dl').eq(index);
                     $curFilterB = $('b', $curFilterDL) ;
                    if(index == 0 ||index == 2){//处理多选择 类型  格式
                        id = [];
                        name = []
                        $('#global_search_filter_content span.on').each(function(i){
                              id.push($(this).attr('sid'));
                              name.push($(this).attr('name'))
                        });
                        id = id.join();
                        name = name.join();
                    }
                     else{//单选
                        if(index == 4  && $('#global_search_filter_content [sid="scope"]').hasClass('on')){ //处理时间中自定义输入时间检证
                            sGs_start_time = $('#gs_start_time').val();
                            sGs_end_time  =  $('#gs_end_time').val();

                        }
                        $Temp = $('#global_search_filter_content span.on');
                        id = $Temp.attr('sid');
                        name = $Temp.attr('name')
                    }
                     $curFilterB.attr('sdata', id).html(name);
                 }
                 _hideFilterConditions();
             }

        });
        /*筛选选择事件*/
        $('#global_search_filter_content').unbind('click').bind('click',function(e){
             var target = e.target,
                 $dd = $(target).closest('dd'),
                 index = $('#global_search_conditions').attr('index'),
                 $dds = $('dd',this),
                 curDDIndex = $dds.index($dd[0]),
                 isAll = true;
            console.log("zw==curDDIndex ="+ curDDIndex)
            if (index == 0 || index == 2) {//处理多选择 类型  格式
                if(curDDIndex === 0){
                    $('span.on', this).removeClass('on');
                    $('span', $dd).addClass('on');
                }
                else{
                    $('span', $dd).addClass('on');
                    $dds.each(function(i){
                        if(i!==0 && !$('span', this).hasClass('on')){
                            isAll = false;

                        }
                    })
                    if(isAll){
                        $('span.on', this).removeClass('on');
                        $('span',$dds[0]).addClass('on');
                    }
                    else{
                        $('span',$dds[0]).removeClass('on');
                    }
                }
            }
            else {//单选
               $('span.on', this).removeClass('on');
                $('span', $dd).addClass('on');
            }

            if(index == 4){
                $('span', $dd).addClass('on');
                _handleCustomTime();
            }
        });


        //日期
        $('#gs_start_time').unbind('click').bind('click',function(e){
            var re =/DD\/MM\/YYYY|日\/月\/年/i,sDate =  $('#gs_start_time').text();
             sDate = re.test(sDate) ? '' : sDate;//空的代表当前时期
            HW.NativeJs.getStringDate['dom'] = this;
            location.href ="showDateDialog:" + sDate;
        });
        $('#gs_end_time').unbind('click').bind('click',function(e){
            var re =/DD\/MM\/YYYY|日\/月\/年/i,sDate =  $('#gs_end_time').text();
            sDate = re.test(sDate) ? '' : sDate;//空的代表当前时期
            HW.NativeJs.getStringDate['dom'] = this;
            location.href ="showDateDialog:"+ sDate;
        });
    }
    /*搜索历史记录*/
    function _searchHistory(oPageParam){
        $('#global_search_filter_btn').html(HW.lang.getLocalString('common_cancel')).attr('isfilter','false');//处理边栏标志
        $('#global_search_total').html(HW.lang.getLocalString('search_history'));
        $('#gs_back').addClass('hide');
        $('#gsearch_cmh').addClass('search_box_hty');
        var i, len, sHtml='', data = HW.Tools.getLocalStorage(HW.GlobalState.lastProSearch);
        if (data != null) {
            len = data.length;
            for (i = len - 1; i >= 0; i--) {
                if(data[i].name !== undefined){
                    sHtml +='<li><a class="text_ellipsis" href="#">' + data[i].name + '</a></li>';
                }
            }
            $('#global_search_clear_history').removeClass('hide');
        }
        else {
            sHtml += '<li><a href="#">' + HW.lang.getLocalString('pro_history_no_data') + '</a></li>'
        }
        $('#global_search_content').html(sHtml);
        myScroller.refresh();
    }



     /*用来控制分发第一次请求跳转*/
    function _controller(oPageParam){
        var isSearch = oPageParam['isSearch'] == 'true';

        if(isSearch) { //跳到搜索结果页面

            _searchResults(oPageParam);
        }
        else{ //跳到搜索历史页面
            _searchHistory(oPageParam);
        }
        HW.Tools.myMenuBottom(5);
        _regEvent();
    }

    function searchMore(){
        var scope = $('#gs_doc_time').attr('sdata');
        _searchResults({
            contenttype:$('#gs_doc').attr('sdata') || '',
            lang:$('#gs_lang').attr('sdata') || 'all',
            keywords:$('#global_search_input').val() || '',
            doctypeid:$('#gs_doc_format').attr('sdata') || '',
           resouceType:$('#gs_doc_type').attr('sdata') || '',
            startDate:(scope === 'scope' ? $('#gs_start_time').val() : ''),
            endDate:(scope === 'scope' ? $('#gs_end_time').val() : ''),
            timeType:(scope === 'scope' ? '' : scope),
            limit:$('#global_search_content li').length + 20
        });
    }

    //侧栏_动画效果
    function _mySidebarAll($id1,$id2,$id3, fn){
        /*
         * $id1 左边ID / $id2 侧栏ID / $id3 按钮ID
         * */
        var sidebar_left=$("#"+$id2),sidebar_right=$("#"+$id1),sidebar_btn=$("#"+$id3);
        function _mySwipeleft(){
            sidebar_right.removeClass("scroller-hide").addClass("scroller");
            sidebar_left.removeClass("hide").addClass("leftAbso left2");
            $("#page_mask_global_search").removeClass("hide");
        }
        function _mySwiperight(){
            sidebar_right.removeClass("scroller").addClass("scroller-hide");
            sidebar_left.addClass("hide").removeClass("leftAbso left2");
            $("#page_mask_global_search").addClass("hide");
        }
        sidebar_btn.unbind("click").bind("click swiperight",function(oEnt){
            oEnt.stopPropagation();
            if($(this).attr('isfilter') == 'true'){
                 if(fn && typeof fn === 'function')fn.apply(this, arguments);
                if(sidebar_left.hasClass("hide")){
                    _mySwipeleft();
                }else{
                    _mySwiperight();
                }

            }
            else{
                $('#gs_back').trigger('click');
            }
            return false;

        });
        sidebar_right.unbind("click").bind("click",function(oEnt){
            var oE=$(oEnt.target);
            if(oE.attr("class")!="cePage" && !oE.parent(".cePage").length){
                sidebar_left.addClass("hide").removeClass("leftAbso left2");
                sidebar_right.removeClass("scroller");
            }
        });
        $("#page_mask_global_search").unbind('click').bind('click',function(e){
            _mySwiperight();
            myScroller.refresh();
        })
        sidebar_left.swipeleft(function(){
            _mySwipeleft();
        })
        sidebar_left.swiperight(function(){
            _mySwiperight();
        })
    }



    return {
        pageConfig: {
            name: 'GlobalSiteSearchList',
            id: 'globalSiteSearchList',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            'onlyExecNotAjax':true
        },

        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            console.log('showData===0=')
            console.log($.mobile.urlHistory)
            console.log('showData===1=')
            myScroller = HW.Tools._addiScroll('global_search_content_scroll_wapper','global_search_content_scroll',{isMore:true,
                id:'pullUp',ajaxCallback:searchMore});
            conditionScroller =  HW.Tools._addiScroll('gs_filter_content_scroll_wapper','gs_filter_content_scroll',0,0,0,0);
            _controller(_getRequestPageParams());
            $('#gs_lang').attr('sdata',HW.GlobalState.appConifg.currentLang).html(
                HW.lang.getLocalString('siteSearchList_'+HW.GlobalState.appConifg.currentLang))
            _mySidebarAll("global_search_left_Sidebar","global_search_right_Sidebar",
                "global_search_filter_btn",_initFilterData);
        }
    }

})();
//全站搜索
HW.Core.addModule("GlobalSiteSearchList",HW.GlobalSiteSearchList);
HW.Core.loadPage("GlobalSiteSearchList");
