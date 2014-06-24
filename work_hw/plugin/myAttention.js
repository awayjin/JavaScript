//我的收藏
HW.myAttention = (function () {
    var _myScroller = null;
    //收藏未登录状态
    function _noLoginDisplay(id){
        var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('common_more_only')+'</a></dd>'
        $("#"+id).html(sHtml);
    };
    //产品收藏URL
    function _getURL(d){
        var newUrl='doc.html?mid=SUP_DOC&termid=' + d.productid + '&productname='+ d.productname;
        return HW.Tools.reEncondeURIComponent(newUrl);
    };
    //产品收藏结构数据
    function _showProductSelect(data,num){
        // num = 1 产品 num = 2 文档
        var sHtml='',i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length,
            querytype=0,_limit;
        if(num == 1){
            for(i=0;i<len;i++){
                sHtml+='<dd><a href="'+_getURL(perferenceProducts[i])+'">'+perferenceProducts[i].productname+'</a></dd>'
            }
            return sHtml;
        }else if(num == 2){
            for(i=0;i<len;i++){
                sHtml+='<dd><a href="'+_myGetDocDocumentUrl(perferenceProducts[i])+'">'+perferenceProducts[i].documentname+'</a></dd>'
            }
            return sHtml;
        }
        _myScroller.refresh();
    };
    //产品收藏查询
    function _myProductFavorite(key){
        $("#myAttentionSet").css("opacity","");
        $("#myAttentionSet").siblings(".covers").remove();
        $(".ahrefMore a").addClass("hide");
        $("#bullSerachBoxHide").show();
        $("#attention_man_data_wapper").removeClass("attention_man_data_wapperSF");
        if(HW.GlobalState.user.isSignIn){
            var option,keywords='';
            option={
                url:HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json",
                data:{
                    limit:20,
                    offset:$("#attentionMan_list dd").length,
                    keywords:key
                }
            };
            option.success=function(data){
                if(data.body==null || data.body.perferenceProducts.length==0){
                    var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('common_no_records')+'</a></dd>';
                    $("#attentionMan_list").html(sHtml);
                    return;
                }
                _showMoreSearchList(data,1);
            }
            HW.Core.loadPage(option);
        }else{
            _noLoginDisplay("attentionMan_list");
            return false;
        }
    };
    //产品收藏搜索
    function _myProductFavoriteSearch(){
        var oText=$("#asearchAtten");
        oText.unbind().bind("keydown",function(e){
            e = e || window.event;
            if(e.keyCode==13){
                oText.blur();
                $("#attentionMan_list").html("");
                var oTextp= $.trim(oText.val());
                if(oTextp.length==0){
                    simpleDialog.alert({content:HW.lang.getLocalString('siteSearchList_search')});
                }else{
                    var oA1=$("#attenType a").eq(0),oA2=$("#attenType a").eq(1),oA3=$("#attenType a").eq(2);
                    if(oA1.hasClass("active")){
                        _myProductFavorite(oTextp);
                    }
                    if(oA2.hasClass("active")){
                        _myDocumentPerferenceQuery(oTextp)
                    }

                }
            }

        })
    };
    //更多处理
    function _showMoreSearchList(data,num){
        var sHtml = _showProductSelect(data,num), total , listSize ,idMore='';
        $("#attentionMan_list").append(sHtml);
        if(num==1){
           $(".ahrefMore a").addClass("hide");
           $("#attenProductMore").removeClass("hide");
            idMore="attenProductMore";
        }else if(num==2){
            $(".ahrefMore a").addClass("hide");
            $("#attenDocMore").removeClass("hide");
            idMore="attenDocMore";
        }
        if(_myScroller != null){
            _myScroller.destroy();
            _myScroller = null;
        }
        _myScroller=HW.Tools._addiScroll('attention_man_data_wapper', 'attention_man_data_outer',0,0,0,0);
        _myScroller.refresh();

        listSize = $("#attentionMan_list dd").length;
        if (!data || !data.body ||data.body.perferenceProducts.length===0) {
            total = 0;
        }else{
            total = data.body.totalCount;
        }

        if (listSize >= total) {
            $('.ahrefMore .more').addClass('hide');
        }else{
            var oText = $.trim($("#asearchAtten").val());
                switch(idMore){
                    case "attenProductMore":
                        _eventAlistMore(oText);
                        break;
                    case "attenDocMore":
                        _eventDocMore(oText);
                        break;
                    default:
                        break;

                }
        }

    };

    //更多处理1
    function _showMoreSearchListmores(data,num) {
        var sHtml = _showProductSelect(data,num), total ,listSize;
        if (!data || !data.body || data.body.perferenceProducts.length===0){
            total = 0;
        }else{
            total = data.body.totalCount;
        };
        $("#attentionMan_list").append(sHtml);
        listSize = $("#attentionMan_list dd").length;
        console.log(listSize)
        console.log(total)
        if(listSize >= total) $(".ahrefMore a").addClass("hide");
        _myScroller.refresh();
    };

    //产品更多事件
    function _eventAlistMore(key){
        $('#attenProductMore').unbind().bind("click",function(e){
            var options = {error: _handleError};
            options.url = HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json";
            options.data = {
                limit:20,
                offset:$('#attentionMan_list dd').length,
                keywords:key
            }
            options.success=function(data){
                _showMoreSearchListmores(data,1);
            }
            HW.Core.loadPage(options);
        });
    }
    //文档更多事件
    function _eventDocMore(key){
        $("#attentionLink").click(function(e){
            var options = {error: _handleError};
            options.url = HW.GlobalState.baseUrl + "/productnode/productnode/getDocFavorites.json";
            options.data = {
                limit:20,
                offset:$('#attentionMan_list dd').not(".more").length,
                keywords:key
            }
            options.success=function(data){
                _showMoreSearchListmores(data,2);
            }
            HW.Core.loadPage(options);
        });
    }

    //文档收藏url
    function _myGetDocDocumentUrl(d){
        var _url='';
        _url = 'docContent.html?documentid=' + d['documentid'] +'&documentname=' + d['documentname'] +
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
    //文档收藏查询
    function _myDocumentPerferenceQuery(key){
        $("#myAttentionSet").css("opacity","");
        $("#myAttentionSet").siblings(".covers").remove();
        $(".ahrefMore a").addClass("hide");
        $("#bullSerachBoxHide").show();
        $("#attention_man_data_wapper").removeClass("attention_man_data_wapperSF");
        var option;
        if(HW.GlobalState.user.isSignIn){
            option={
                url:HW.GlobalState.baseUrl+"/productnode/productnode/getDocFavorites.json",
                data:{
                    "offset":$("#attentionMan_list dd").length,
                    "limit":20,
                    "keywords":key
                }
            };
            option.success=function(data){
                console.log(data);
                var sHtml='', i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length;
                console.log(len)
                if(data.body==null || len==0){
                    var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('common_no_records')+'</a></dd>';
                    $("#attentionMan_list").html(sHtml);
                    return false;
                }
                _showMoreSearchList(data,2)
            }
            HW.Core.loadPage(option);

        }else{
            _noLoginDisplay("attentionMan_list");
            return false;
        }
    };
    //意见收藏查询
    function _myQueryMyFeedbackTion(){
        $(".ahrefMore a").addClass("hide");
        $("#bullSerachBoxHide").hide();
        $("#myAttentionSet").css("opacity","0.4");
        $("#myAttentionSet").after('<span class="covers"></span>');
        if(HW.GlobalState.user.isSignIn){
            var userId=HW.GlobalState.user.userId,optionF;
            optionF={
                url : HW.GlobalState.baseUrl+"/feedback/feedback/queryMyFeedback.json",
                data : {
                    pageSize:'20',
                    pageIndex:'0',
                    userId:userId
                }
            };
            optionF.success=function(data){
                console.log(data)
                if(data.body==null || data.body.feedbackList.length<=0){
                    var sHtml = '<li class="noData"><a>没有意见收藏</a></li>';
                    $("#myOpinion").html(sHtml);
                    return false;
                }else{
                    //feedbackProduct.html?documentid=DOC1000008117&mid=SUP_DOC
                    var feedbackList=data.body.feedbackList, len=feedbackList.length, oHtml='';
                    for(var i=0;i<len;i++){
                        oHtml+='<dd><a href="feedbackProduct.html?documentid='+feedbackList[i].feedbackId+'&mid='+feedbackList[i].mid+'">' +
                            '<span class="c_text">'+feedbackList[i].content+'</span>' +
                            '<span class="t_text">原文:'+feedbackList[i].nodeName+'</span></a></dd>'
                    }
                    $("#attentionMan_list").html(oHtml);
                    if(_myScroller != null){
                        _myScroller.destroy();
                        _myScroller = null;
                    }
                    _myScroller=HW.Tools._addiScroll('attention_man_data_wapper', 'attention_man_data_outer',0,0,0,0);
                    _myScroller.refresh();
                    $("#attention_man_data_wapper").addClass("attention_man_data_wapperSF");
                    if (data.body.total>20){
                        $(".ahrefMore a").addClass("hide");
                        $("#attenFeedMore").removeClass("hide");
                        _eventFeedsMore();
                    }else{
                        $('.ahrefMore .more').addClass('hide');
                    }

                }
            }
            HW.Core.loadPage(optionF);

        }else{
            _noLoginDisplay("attentionMan_list");
            return false;
        }
    };

    //意见更多
    function _myFeedMoreAhrefs(data){
        var  total, listSize, oHtml,  total='', listSize='';
        if (!data || !data.body || data.body.feedbackList.length===0){
            total = 0;
        }else{
            total = data.body.total;
        };

        var feedbackList=data.body.feedbackList, len=feedbackList.length;
        for(var i=0;i<len;i++){
            oHtml+='<dd><a href="feedbackProduct.html?documentid='+feedbackList[i].feedbackId+'&mid='+feedbackList[i].mid+'">' +
                '<span class="c_text">'+feedbackList[i].content+'</span>' +
                '<span class="t_text">原文:'+feedbackList[i].nodeName+'</span></a></dd>'
        }

        $("#attentionMan_list").append(oHtml);
        listSize = $("#attentionMan_list dd").length;
        console.log(listSize)
        console.log(total)
        if(listSize >= total) $(".ahrefMore a").addClass("hide");
        _myScroller.refresh();
    }

    //意见更多事件
    function _eventFeedsMore(){
        $('#attenFeedMore').unbind().bind("click",function(e){
            var options = {error: _handleError};
            options.url = HW.GlobalState.baseUrl+"/feedback/feedback/queryMyFeedback.json";
            options.data = {
                pageSize:'20',
                pageIndex:$('#attentionMan_list dd').length
            }
            options.success=function(data){
                console.log(data);
                _myFeedMoreAhrefs(data);
            }
            HW.Core.loadPage(options);
        });
    }



    //不同切换之间数据处理
    function _myEventChangeData(){
        var oAlist=$("#attenType a"),len=$("#attenType a").length,i;
        for(i=0;i<len;i++){
            var attrVal=oAlist.eq(i).attr("data-val");
        };
        console.log("===========9999=========")
        oAlist.unbind().bind("click",function(){
            HW.GlobalState.proLinkMore=''
            HW.GlobalState.docLinkMore=''
            HW.GlobalState.feedLinkMore=''
            $("#asearchAtten").val('');
            var thisAttr=$(this).attr("data-val");
            $(this).addClass("active").siblings("a").removeClass("active");
            $("#attentionMan_list").html("");
            _myScroller.scrollTo(0,0);
            if(thisAttr==0){
                HW.GlobalState.proLinkMore='ok'
                _myProductFavorite();
                _myProductFavoriteSearch();
            }else if(thisAttr==1){
                HW.GlobalState.docLinkMore='ok'
                _myDocumentPerferenceQuery();
                _myProductFavoriteSearch();
            }else if(thisAttr==2){
                HW.GlobalState.feedLinkMore='ok'
                _myQueryMyFeedbackTion();
            }
        })

    }


    function _showError(id, msg, btnTxt) {
        var str ='<dd><a href="#">' + msg + '</dd></li>';
        $('#' + id).html(str);
    };
    function _handleError (XHR, ts, errorThrown) {
        if (ts == "timeout") {
            _showError('attentionMan_list', HW.lang.getLocalString('abnormal_network_timeout'));
        }
        else {
            _showError('attentionMan_list', HW.lang.getLocalString('abnormal_network_try'));
        }
    };

    return {
        pageConfig: {
            name: 'myAttention',
            id: 'myAttention'
        },
        init:function(){
            HW.Tools.myMenuBottom(1);
            $("#attenType a").removeClass("active");
            if(HW.GlobalState.proLinkMore=='ok'){
                $("#attenType a:nth-child(1)").addClass("active");
                _myProductFavorite();
                _myProductFavoriteSearch();
                _myEventChangeData();
            }else if(HW.GlobalState.docLinkMore=='ok'){
                $("#attenType a:nth-child(2)").addClass("active");
                _myDocumentPerferenceQuery();
                _myProductFavoriteSearch();
                _myEventChangeData();
            }else if(HW.GlobalState.feedLinkMore=='ok'){
                $("#attenType a:nth-child(3)").addClass("active");
                _myQueryMyFeedbackTion();
                _myEventChangeData();

            }else{
                $("#attenType a:nth-child(1)").addClass("active");
                _myProductFavorite();

                _myProductFavoriteSearch();

                _myEventChangeData();

            }


        }
    }
})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("myAttention", HW.myAttention);

//加载Demo页面的数据
HW.Core.loadPage("myAttention");

