/*
* 命令详情
* */
HW.OrderSearchDetail = (function () {
    var _showContent = function(data){
            var body="";
            if(data.head.errorcode=="500"){
                _clear();
                _showError('cmdname', HW.lang.getLocalString('abnormal_network_try'));
                $('#order_sd_content__wrap').css('visibility',"visible");
                $('.dslContainer').css('display','none') ;
            }else {
                try {
                    body=data.body;
                    if(!body.cmdname){
                        _noData();
                        return;
                    };
                    if(body.cmdname){
                        $('#cmdname').html(body.cmdname || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#cmdname').parent('div').css('display','block');
                    }else {
                        $('#cmdname').parent('div').css('display','none');
                    };
                    if(body.clifunc){
                        $('#clifunc').html(body.clifunc || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clifunc').parent('div').css('display','block');
                    }else {
                        $('#clifunc').parent('div').css('display','none');
                    };
                    if(body.cliformat){
                        $('#cliformat').html(body.cliformat || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#cliformat').parent('div').css('display','block');
                    }else {
                        $('#cliformat').parent('div').css('display','none');
                    };
                    if(body.cliparam){
                        $('#cliparam').html(body.cliparam || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#cliparam').parent('div').css('display','block');
                    }else {
                        $('#cliparam').parent('div').css('display','none');
                    };
                    if(body.clitasknameandoper){
                        $('#clitasknameandoper').html(body.clitasknameandoper || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clitasknameandoper').parent('div').css('display','block');
                    }else {
                        $('#clitasknameandoper').parent('div').css('display','none');
                    };
                    if(body.clidesc){
                        $('#clidesc').html(body.clidesc || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clidesc').parent('div').css('display','block');
                    }else {
                        $('#clidesc').parent('div').css('display','none') ;
                    };
                    if(body.cliexample){
                        $('#cliexample').html(body.cliexample || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#cliexample').parent('div').css('display','block');
                    }else {
                        $('#cliexample').parent('div').css('display','none');
                    }
                    if(body.cliview){
                        $('#cliview').html(body.cliview || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#cliview').parent('div').css('display','block');
                    }else {
                        $('#cliview').parent('div').css('display','none');
                    };
                    if(body.clidefaultlevel){
                        $('#clidefaultlevel').html(body.clidefaultlevel || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clidefaultlevel').parent('div').css('display','block') ;
                    }else {
                        $('#clidefaultlevel').parent('div').css('display','none') ;
                    };
                    if(body.climode){
                        $('#climode').html(body.climode || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#climode').parent('div').css('display','block') ;
                    }else {
                        $('#climode').parent('div').css('display','none') ;
                    };
                    if(body.clilevel){
                        $('#clilevel').html(body.clilevel || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clilevel').parent('div').css('display','block') ;
                    }else {
                        $('#clilevel').parent('div').css('display','none') ;
                    };
                    if(body.clisysresponse){
                        $('#clisysresponse').html(body.clisysresponse || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clisysresponse').parent('div').css('display','block') ;
                    }else {
                        $('#clisysresponse').parent('div').css('display','none') ;
                    };
                    if(body.clitasknameandoper){
                        $('#clitasknameandoper').html(body.clitasknameandoper || HW.lang.getLocalString('orderSearch_js_null'));
                        $('#clitasknameandoper').parent('div').css('display','block') ;
                    }else {
                        $('#clitasknameandoper').parent('div').css('display','none') ;
                    };
                    $('#order_sd_content__wrap').css('visibility',"visible");
                }
                catch(e){
                    _clear();
                    $('#cmdname').html(HW.lang.getLocalString('records_relative_no_data'));
                    $('#order_sd_content__wrap').css('visibility',"visible");
                    $('.dslContainer').css('display','none') ;
                }
            }
        },
        _noData= function(){
            _clear();
            $('#cmdname').html(HW.lang.getLocalString('records_relative_no_data'));
            $('#order_sd_content__wrap').css('visibility',"visible");
            $('.dslContainer').css('display','none') ;
        },
        _clear = function () {
            $('#cmdname,#clifunc,#cliformat,#cliparam,#climode,#clidefaultlevel,#clilevel,#cliview,#clitasknameandoper,#clidesc,#cliexample,#clisysresponse').html('');
        },
        _showError=function(id, msg) {
            str = '<li><a href="#">' + msg + '</a></li>';
            $('#' + id).html(str);
        },
        _handleError=function (XHR, ts, errorThrown) {
            if (ts == "timeout") {
                _showError('cmdname', HW.lang.getLocalString('abnormal_network_timeout'));
            }
            else {
                _showError('cmdname', HW.lang.getLocalString('abnormal_network_try'));
            }

        },_showImg=function(){
            var oPre=$("pre");
            if(oPre.length>0){
                var oHtml = $("pre").html().replace(/\n|\n\r|\r/g,"<br/>");
                oHtml = oHtml.replace(/\s/g,'&nbsp;');
                $('<div style="word-wrap:break-word;">' + oHtml + '<div>').replaceAll('pre') ;
            }

            var oImg = $("#order_sd_content__wrap img");
            var attrVa=HW.GlobalState.baseUrlimg;
            oImg.each(function (i, n) {
                var attrVa1= $(this).attr("data-original");
                $(this).attr("src",attrVa+attrVa1);
                var curImg = this;
                var w = curImg.width;
                if (w * 1 > 360) {
                    curImg.style.width = "60%";
                    var oViewWidth=document.defaultView.getComputedStyle(curImg,null).getPropertyValue('width')
                    var oWidthLast=oViewWidth.replace(/px/gi, '');
                    if(oWidthLast>=w){
                        curImg.style.width = "";
                    }
                    if (HW.GlobalState.container == "native") {
                        $(curImg).wrap("<a  href='openImage:{\"url\":\"" + curImg.src + "\"}'></a>");
                        console.log($(curImg).get(0));
                    } else {
                        $(curImg).wrap('<a href="' + curImg.src + '" target="_blank"></a>');
                        console.log($(curImg).get(0));
                    }
                }
            });
        };

    return {
        pageConfig: {
            name: 'OrderSearchDetail',
            id: 'order_search_detail',
            //决定何时加载数据；
            eventType: 'pagecreate',
            //数据处理程序
            processData: 'showData',
            //ajax请求参数设置
            ajaxOptions: {
                url: HW.GlobalState.baseUrl + "/command/command/getCommandDetails.json",
                cache: false,
                initData: function () {
                    return HW.Tools.parseURL($('base').attr('href'));
                },
                error: _handleError
            }
        },
        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            HW.Tools.myMenuBottom(1);
            HW.Tools._addiScroll('order_search_detail_wapper', 'order_search_detail_outer',{checkDOMChanges: true});
            _showContent(data);
            $("#order_sd_content__wrap table").css("width","100%");
            $("#order_search_detail_outer table td").attr("width","auto");
            _showImg();
        }
    }

})();
//使用前，需要先注册 Demo对象
HW.Core.addModule("OrderSearchDetail", HW.OrderSearchDetail);
//加载Demo页面的数据
HW.Core.loadPage("OrderSearchDetail");






















