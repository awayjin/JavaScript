/**
 * 产品支持
 */
HW.ProductSupport = (function () {
    var productScroller, catalogueScroller ,oTouchSlider;

    function _handleError() {}
    function _setThirdCatalogue(data, oURLParam){
        var len = data.length , i, currentNodeId = oURLParam['nodeid'],
            secondCatalogueIdPath = _getParentIdPath(oURLParam['idpath']),
            str = '', nodeId, nodeName, thirdCatalogueIdPath;
        if(data && len){
            for(i = 0; i < len; i++){
                nodeId = data[i]['nodeid'];
                nodeName = data[i]['nodename'];
                thirdCatalogueIdPath = secondCatalogueIdPath + '|' +nodeId;
                if(nodeId === currentNodeId){
                  $('#third_catalogue_title').attr('idpath', thirdCatalogueIdPath).html(nodeName);
                  str+= '<li class="hide"><a href="#" nodeid="'+ nodeId + '" idpath="' + thirdCatalogueIdPath
                      +'" > '+ nodeName +'</a></li>';
                }
                else{
                    str+= '<li><a href="#" nodeid="'+ nodeId + '" idpath="' + thirdCatalogueIdPath
                        +'"> '+ nodeName +'</a></li>';
                }
            }
            if(len > 1){
                $('#third_catalogue_title').siblings('img').removeClass('hide');
            }
            else{
                $('#third_catalogue_title').siblings('img').addClass('hide');
            }

            $('#third_catalogue_list').html(str);
            _cancelFavoritesStatus();
        }
    };
    function _regEventThirdCatalogue(){
       $('#pro_support .commonH1').unbind('click').bind('click',function(e){
             var $img = $('.arr_down', this),
                 $li =$('#third_catalogue_list li');
             if($li.length===1 && $li.hasClass('hide')) return;
           if( $('.pop_btn').hasClass('arr_up')){
               $('.pop_btn').trigger('click');
           }
             if($img.hasClass('arr_up')){
                $img.removeClass('arr_up');
                $('.sort_select').addClass('hide');
             }
             else{
                 $img.addClass('arr_up');
                 $('.sort_select').removeClass('hide');
             }

       });
       $('#third_catalogue_list').unbind('click').bind('click', function(e){
          var target = e.target, tagName = target.tagName.toUpperCase(),
              $target = $(target), oParam = {};

           if(tagName === "A"){
               oParam['productparentids'] = '' ;
               oParam['nodeid'] = $target.attr('nodeid');
               oParam['idpath'] = $target.attr('idpath');
               requestRemoteData(oParam, function(data){
                   showThirdCatalogue(data, oParam);
                   $('.commonH1').trigger('click');
               });
           }

       });
    };
    function showThirdCatalogue(data, oURLParam){
        var dataBody = data['body'],
            thirdCatalogue, fourCatalogue, products;
        if(data && dataBody){
            thirdCatalogue = dataBody['parentnodedos'];
            fourCatalogue = dataBody['childnodedos'];
            products = dataBody['productnodedos'];
            if(isArray(thirdCatalogue)) {_setThirdCatalogue(thirdCatalogue, oURLParam);}
            if(isArray(fourCatalogue)) {_setFourCatalogue(fourCatalogue);}
            if(isArray(products)) {_setProductLists(products);}
        }
    };
    function requestRemoteData(oParam, fSuccess){
        var  oURLParam = HW.Tools.parseURL($('base').attr('href')),
             option={
                url:HW.GlobalState.baseUrl+"/productnode/productnode/getThirdProductNode.json",
                error: _handleError,
                data:{
                    "mid":oURLParam['mid'],
                    "idpath":oParam['idpath'],
                    nodeid:oParam['nodeid'],
                    productparentids:  oParam['productparentids'] || '',
                    productkeywords:  oParam['productkeywords'] || ''
                },
                success:fSuccess
        };
        HW.Core.loadPage(option);
    }

    function _setFourCatalogue(data){
        var fourLength = data.length, i, k, fiveLength,
            fiveCatalogue, fourStr = '<a href="#" class="all on"  >'+HW.lang.getLocalString('entire')+'</a>', fiveStr = '',
            fourNodeId,fourNodeName;
           if(data && fourLength){
               for(i = 0; i < fourLength; i++){

                   fourNodeId  = data[i]['nodeid'];
                   fourNodeName = data[i]['nodename'];
                   fourStr += '<a href="#" nodeid="'+ fourNodeId + '">'+ fourNodeName +'</a>';

                   fiveCatalogue = data[i]['childNodes'];
                   fiveLength = fiveCatalogue.length;
                   fiveStr += '<div class="filter_til"><span>'+ fourNodeName + '</span></div><ul class="list_sort">';
                   fiveStr +=  ' <li><a href="#" class="all" nodeid="'+ fourNodeId + '" nodename="'+ fourNodeName +'">'+HW.lang.getLocalString('entire')+'</a></li>';
                   for(k = 0 ; k < fiveLength; k++){
                       if(fiveCatalogue[k]['isproduct']) continue;
                       fiveStr += '<li><a href="#" nodeid="'+ fiveCatalogue[k]['nodeid']  +'">' +
                       fiveCatalogue[k]['nodename']   +'</a></li>';
                   }
                   fiveStr +=' </ul>';
                }

               $('#four_catalogue_list').html(fiveStr);
               $('#four_catalogue_bar').html(fourStr);
               _cancelFavoritesStatus();
               catalogueScroller = HW.Tools._addiScroll('four_catalogue_list_wapper','four_catalogue_list',0,0,0,0);
               oTouchSlider =  new TouchSlider({id:'four_catalogue_bar', speed:600,auto:false,fixWidth:false,align:'left'});

           }
    };
    function _regEventFourCatalogue(){
        //四五级箭头点击事件
        $('.pop_btn').toggle(function(){
            $('#four_catalogue_list').closest('.sort_filter ').css('visibility', 'visible').slideDown('fast');
            $(this).addClass('arr_up');
            _cancelFavoritesStatus();
        }, function(){
            $('#four_catalogue_list').closest('.sort_filter ').css('visibility', 'hidden').slideUp('fast');
            $(this).removeClass('arr_up');
        });
        //四五级目录页面选择点击事件
        $('#four_catalogue_list').unbind('click').bind('click', function(e){
            var target = e.target, tagName = target.tagName.toUpperCase(),
                $target = $(target), oParam = {}, str ='',
                _idpath =$('#third_catalogue_title').attr('idpath') ;
            if(tagName === "A"){
                oParam['productparentids'] = $target.attr('nodeid');
                oParam['nodeid'] = _idpath.split('|').pop();
                oParam['idpath'] = _idpath;
                requestRemoteData(oParam, function(data){
                    var dataBody = data['body'], products, fourCatalogue;
                    if(data && dataBody){
                        products = dataBody['productnodedos'];
                        if(isArray(products)) {_setProductLists(products);}
                    }
                    if($target.hasClass('all')) { //为全部执行滑动，否则，替换标题头部
                        str += '<a href="#" class="all" >'+HW.lang.getLocalString('entire')+'</a><a class="on"  nodeid="'+
                            $target.attr('nodeid') + '" href="#">' +  $target.attr('nodename') +'</a>';
                    }
                    else{
                        str +=  '<a href="#" class="all" >'+HW.lang.getLocalString('entire')+'</a><a class="on"  nodeid="'+
                           $target.attr('nodeid') + '" href="#">' +  $target.text() +'</a>';
                    }
                    $('#four_catalogue_bar').html(str);
                    $('.pop_btn').trigger('click');
                    oTouchSlider =  new TouchSlider({id:'four_catalogue_bar', speed:600,auto:false,fixWidth:false,align:'left'});

                });
            }

        });
        // 四级目录菜单条点击事件
        $('#four_catalogue_bar').unbind('click').bind('click', function(e){
            var target = e.target, tagName = target.tagName.toUpperCase(),
                $target = $(target), oParam = {}, str ='', nodeId, idPath,
                isAll= false;
            if(tagName === "A"){
                nodeId = $target.attr('nodeid');
                idPath = $('#third_catalogue_title').attr('idpath');
                isAll =  $target.hasClass('all');
                oParam['nodeid'] = idPath.split('|').pop() ;
                if(!nodeId && isAll){
                    oParam['productparentids'] = '';
                }
                else{
                    oParam['productparentids'] =nodeId;
                }

                oParam['idpath'] = idPath;
                requestRemoteData(oParam, function(data){
                    var dataBody = data['body'], products, fourCatalogue;
                    if(data && dataBody){
                        products = dataBody['productnodedos'];
                        if(isArray(products)) {_setProductLists(products);}
                        $target.siblings().removeClass('on').end().addClass('on');
                        if(isAll){
                            fourCatalogue = dataBody['childnodedos'];
                            if(isArray(fourCatalogue)) {_setFourCatalogue(fourCatalogue);};
                        }

                    }



                });
            }

        });

    };
    function _setProductLists(data){
        var oURLParam = HW.Tools.parseURL($('base').attr('href')),
            productLength = data.length, str = '', i, sHref;
        if(data && productLength){
            for(i = 0; i < productLength; i++){
                sHref =  HW.Tools.reEncondeURIComponent('doc.html?mid='+ oURLParam['mid'] +'&termid=' + data[i]['nodeid'] + '&productname='+ data[i]['nodename']);
                str += '<li><a href="' + sHref + '"><span iswatchflag="false" class="' +
                    (data[i]['iswatchflag'] === false ?'mutl_btn' : 'mutl_btn_on') +
                    ' hide" nodeid="'+ data[i]['nodeid'] +'"></span><strong>'+ data[i]['nodename'] +'</strong></a></li>';
            }
            if(productLength % 2){
                str +='<li><a href="#"></a></li>';
            }
            $('#product_list').html(str);
            _cancelFavoritesStatus();

        }
        else{
            $('#product_list').html('<li><a href="#">'+ HW.lang.getLocalString('common_no_records') +'</a></li><li><a href="#"></a></li>');
        }
        productScroller && productScroller.refresh();
    };
    function _regEventProducts(){
        var $pro_support = $('#pro_support'),
            $cancel = $('#cacel', $pro_support);
        $('#product_list').unbind().bind('taphold', function(e){
            //标识首先显示收藏的页面
            this.isFirstTapHOld = $('#cacel').hasClass('hide') ? true : false;
            //标识是否执行了 taphold
            this.isCalled = true;
            _setFavoritesStatus();

            return false;
        }).bind('click', function(e){
                var isNoFavorite = $('#cacel').hasClass('hide'),
                    $li, $span, iswatchflag;
                $li = $(e.target).closest('li');
                $span = $('span', $li);
                if(this.isFirstTapHOld && this.isCalled){
                    this.isCalled = false;
                    return false
                }
                this.isCalled = false;
                if(!isNoFavorite ){ //收藏状态改变

                    if($span.length){ //处理奇数多增加的标签引起的问题
                        if($span.hasClass('mutl_btn')){
                            $span.removeClass('mutl_btn').addClass('mutl_btn_on');
                        }
                        else{
                            $span.removeClass('mutl_btn_on').addClass('mutl_btn');
                        }
                        iswatchflag = $span.attr('iswatchflag');
                        if(iswatchflag === "false"){
                            $span.attr('iswatchflag', 'true');
                        }
                        else{
                            $span.attr('iswatchflag', 'false');
                        }
                    }

                    return false;
                }
                else{

                }

        });
      /*  //模拟长按

        var isIphone = (/iphone/gi).test(navigator.appVersion),
            isIpad = (/ipad/gi).test(navigator.appVersion),
            isAndroid = (/android/gi).test(navigator.appVersion),
            isTouch = isIphone || isIpad || isAndroid,
            //设置触发事件
            START_EVENT = isTouch ? 'touchstart' : 'mousedown',	//点击
            MOVE_EVENT = isTouch ? 'touchmove' : 'mousemove',	//移动
            END_EVENT = isTouch ? 'touchend' : 'mouseup';	//释放点击事件

        var $pro_support = $('#pro_support'),
            $cancel = $('#cacel', $pro_support);

        var setTime = true,startEventX = 0,startEventY = 0,movestartEventX = 0,movestartEventY = 0;
        $('#product_list').unbind().bind(START_EVENT,function(e){
            setTime = true;
            startEventX = e.clientX;
            startEventY = e.clientY;
            window.setTimeout(function(){
                var isNoFavorite = $cancel.hasClass('hide');
                if(setTime && isNoFavorite){
                    if($(e.target).attr("href") != "#"){
                        var $li = $(e.target).closest('li');
                        var $span = $('span', $li);
                        $span.removeClass('mutl_btn_on').addClass('mutl_btn');
                        $span.attr('iswatchflag', 'false');
                        setTime = false;
                        _setFavoritesStatus();
                    }
                    $('#product_list').unbind('click').click(function(e){
                        e.preventDefault();
                        return false;
                    });
                    return false;
                }
            },1000);

            $('#product_list').bind(MOVE_EVENT,function(e){
                movestartEventX = e.clientX;
                movestartEventY = e.clientY;
                var durationX = Math.abs(movestartEventX - startEventX);
                var durationY = Math.abs(movestartEventY - startEventY);
                if(durationX > 10 || durationY > 10){
                    setTime = false;
                    e.preventDefault();
                    return false;
                }
            });
        }).bind(END_EVENT,function(e){
                window.setTimeout(function(){
                    startEventX = 0;
                    startEventY = 0;
                    movestartEventX = 0;
                    movestartEventY = 0;
                    $('#product_list').unbind(MOVE_EVENT);
                },100);
                var isNoFavorite = $cancel.hasClass('hide'),
                    $li, $span, iswatchflag;
                var $li = $(e.target).closest('li');
                var $span = $('span', $li);
                if(!isNoFavorite ){ //收藏状态改变
                    if(setTime && $span.length){ //处理奇数多增加的标签引起的问题
                        if($span.hasClass('mutl_btn')){
                            $span.removeClass('mutl_btn').addClass('mutl_btn_on');
                           // $span.attr('iswatchflag', 'true');
                        }
                        else{
                            $span.removeClass('mutl_btn_on').addClass('mutl_btn');
                           // $span.attr('iswatchflag', 'false');
                        }

                         iswatchflag = $span.attr('iswatchflag');
                         if(iswatchflag === "false"){
                         $span.attr('iswatchflag', 'true');
                         }
                         else{
                         $span.attr('iswatchflag', 'false');
                         }

                    }
                    return false;
                }
                else{  //默认的页面跳转
                    $('#product_list').unbind("click");
                    setTime = false;
                }
            });
*/
        //取消收藏
        $cancel.click(function(e){
            _cancelFavoritesStatus();
            _unsetFavoriteProductStatus(true);
        });
        //添加收藏
        $('.fav_btn_go', $pro_support).click(function(e){
            _addAndDelFocus();
        });

        /*回车搜索*/
        $('#productsKey').keydown(function (event) {
            var re =/^[\`\~!@#\$%\^&\*\(\)\+=\|\{\}'\:;",\\\[\]\.\<\>\/\?~\！\@#\￥\%\……\&\*\（\）\-\-\+\|\{\}\【\】\‘\；\：\”\“\’\。\，\、\？]+$/gi
            if (event.which === 13) {
                var  stext = $.trim($(this).val()), isAlert = false, tips='';

                $(this).blur();
                $(this).prev().focus();

                if (!!!stext && stext.length == 0) {
                    tips = HW.lang.getLocalString('bulletin_search_search');
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
    };

     function _searchResults(oParam){
         var  oURLParam = HW.Tools.parseURL($('base').attr('href')),
             option={
                 url:HW.GlobalState.baseUrl+"/productnode/productnode/selectProductList.json",
                 error: _handleError,
                 data:{
                     "mid":oURLParam['mid'],
                      "keywords":oParam['keywords'],
                      "isattention":oParam['isattention'] || false,
                      "limit":oParam['limit'] || 20,
                      "offset":oParam['offset'] || 0
                 },
                 success:oParam['success'] || _setProductLists
             };
         HW.Core.loadPage(option);
     }
    function _setFavoritesStatus(){
        var $pro_support = $('#pro_support'),
            $product_list = $('#product_list');
        $(".btn_left",$pro_support).addClass('hide');
        $('#cacel',$pro_support).removeClass('hide');
        $('span', $product_list).removeClass('hide');
        $('.fav_btn_go', $pro_support).removeClass('hide');
        HW.Tools.myMenuBottom(5);
    }
    function _cancelFavoritesStatus(){
        var $pro_support = $('#pro_support'),
            $product_list = $('#product_list');
        $(".btn_left",$pro_support).removeClass('hide');
        $('#cacel',$pro_support).addClass('hide');
        $('span', $product_list).addClass('hide');
        $('.fav_btn_go', $pro_support).addClass('hide');

        HW.Tools.myMenuBottom(1);
    }

    function _unsetFavoriteProductStatus(isNotSuccess){
        $('span', $('#product_list')).each(function(i){
            var iswatchflag = this.getAttribute("iswatchflag");
            if (iswatchflag === "true" ) {
                $(this).attr('iswatchflag', 'false');
                //还原之前的状态
               if(isNotSuccess){
                if($(this).hasClass('mutl_btn')){
                    $(this).removeClass('mutl_btn').addClass('mutl_btn_on');
                }
                else{
                    $(this).removeClass('mutl_btn_on').addClass('mutl_btn');
                }
               }
            }

        });
    };

    function _addAndDelFocus () {
        var oURLParam = HW.Tools.parseURL($('base').attr('href')),
            d = { addproducts: [], delproductids: "", mid: oURLParam['mid']},
            a = [], delProductsId= [], isChangeState = false;

        $('span', $('#product_list')).each(function(i){
           var  iswatchflag = this.getAttribute("iswatchflag"), o = {};
            if (iswatchflag === "true" ) {
                if($(this).hasClass('mutl_btn_on')){ //增加
                    o.productid = this.getAttribute("nodeid");
                    o.productname = $.trim($(this).next('strong').text());
                    a.push(o)

                }
                else{//删除
                    delProductsId.push(this.getAttribute("nodeid"));
                }
                isChangeState = true;
            }

        });

        if(!isChangeState){
            simpleDialog.alert({content: HW.lang.getLocalString('PleaseProduct'),ok:function(){
                _unsetFavoriteProductStatus(false);
            }});
            return false;
        }

        d.addproducts = JSON.stringify(a);
        d.delproductids = delProductsId.join();
        HW.Core.loadPage({url: HW.GlobalState.baseUrl + "/productnode/productnode/productSubmit.json",
            data: d, success: function (data) {
                if(data['head']['errorcode'] === '0'){
                    simpleDialog.alert({content: HW.lang.getLocalString('doc_added_to_favorites'),ok:function(){
                        _cancelFavoritesStatus();
                        _unsetFavoriteProductStatus(false);
                    }});
                }
                else{
                    simpleDialog.alert({content: HW.lang.getLocalString('doc_added_to_favorites_fail'),ok:function(){
                        _unsetFavoriteProductStatus(true);
                        _cancelFavoritesStatus();
                    }});
                }

            },
            error: function () {
                simpleDialog.alert({content: HW.lang.getLocalString('doc_added_to_favorites_fail'),ok:function(){
                    _unsetFavoriteProductStatus(true);
                    _cancelFavoritesStatus();
                }});
            }
        });
    };
    function _getParentIdPath(idPath){
        return typeof idPath == 'string' ?
                    idPath.split('|').slice(0, -1).join('|') : '';
    } ;
    function isArray(a){ return Object.prototype.toString.call(a) === '[object Array]'; };

    function returnPageUrl(){
        if(HW.GlobalState.container=="native"){
            if(HW.GlobalState.HomePageUrl.length <= 0){
                $('#pro_support .btn_left').attr("data-rel","back");
                $('#pro_support .btn_left').attr("href","#");
            }else{
                $('#pro_support .btn_left').attr("href",HW.GlobalState.HomePageUrl);
                $('#pro_support .btn_left').removeAttr("data-rel");
            }
        }else{
            $('#pro_support .btn_left').attr("data-rel","back");
            $('#pro_support .btn_left').attr("href","#");
        }


    };
    return {
        pageConfig: {
            name: 'ProductSupport',
            id: 'pro_support',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            tag: false,

            //ajax请求参数设置
            ajaxOptions: {
                url: HW.GlobalState.baseUrl + "/productnode/productnode/getThirdProductNode.json",
                cache: false,
                initData: function () {
                    var o = HW.Tools.parseURL($('base').attr('href'));
                    o.productparentids = o['nodeid'];
                    return o;
                },
                data:{
                    productkeywords:''
                },
                error: _handleError
            }

        },

        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            HW.Tools.myMenuBottom('1');
            var  oURLParam = HW.Tools.parseURL($('base').attr('href'));
            productScroller = HW.Tools._addiScroll('productDataBox_wapper','productDataBox',0,0,0,0);
            returnPageUrl();
            showThirdCatalogue(data, oURLParam);
            _regEventThirdCatalogue();
            _regEventFourCatalogue();
            _regEventProducts();
        }


    }

})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("ProductSupport", HW.ProductSupport);

//加载Demo页面的数据
HW.Core.loadPage("ProductSupport");

















