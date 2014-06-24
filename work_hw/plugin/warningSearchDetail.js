/*
 * 告警命令详情
 * */
HW.WarningSearchDetail = (function () {
    var _showContent = function (data) {
            var body;
            if (data.head.errorcode == "500") {
                _clear();
                _showError('warning_cmdname', HW.lang.getLocalString('abnormal_network_try'));
                $('#warning_order_sd_content__wrap').css('visibility',"visible");
                $('.dslContainer').css('display','none') ;
            }else{
                try {
                    body =  data.body;
                    if(!body.alarmname){
                        _noData();
                        return;
                    }
                    if(body.dataversion =="0"){
                        $('#warningSearch_des_t').html(HW.lang.getLocalString('warningSearch_des_v8'));
                        $('#warningSearch_attr_t').html(HW.lang.getLocalString('warningSearch_attr_v8'));
                        $('#alarmrelatedinformation_t').html(HW.lang.getLocalString('alarmrelatedinformation_v8'));
                    }
                    else{
                           $('#warningSearch_des_t').html(HW.lang.getLocalString('warningSearch_des'));
                           $('#warningSearch_attr_t').html(HW.lang.getLocalString('warningSearch_attr'))  ;
                           $('#alarmrelatedinformation_t').html(HW.lang.getLocalString('alarmrelatedinformation')) ;
                    }
                    $('#warning_cmdname').html(body.alarmname || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#warning_alarmdesc').html(body.alarmdesc || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#warning_alarmattrs').html(body.alarmattrs || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#warning_impactonsystem').html(body.impactonsystem || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#warning_possiblecauses').html(body.possiblecauses || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#warning_alarmhanding').html(body.alarmhanding || HW.lang.getLocalString('orderSearch_js_null'));
                   // $('#warning_alarmclearing').html(body.alarmclearing || HW.lang.getLocalString('orderSearch_js_null'));
                    $('#alarmrelatedinformation').html(body.alarmparameters || HW.lang.getLocalString('orderSearch_js_null'));

                    $('#warning_sd_content__wrap').css('visibility',"visible");
                }catch (e) {
                    _noData();
                }
            }


        },
        _noData= function(){
            _clear();
            $('#warning_cmdname').html(HW.lang.getLocalString('records_relative_no_data'));
            $('#warning_sd_content__wrap').css('visibility',"visible");
            $('.dslContainer').css('display','none') ;
        },
        _clear = function () {
            $('#warning_cmdname').html(' ');
            $('#warning_alarmdesc').html(' ');
            $('#warning_alarmattrs').html(' ');
            $('#warning_impactonsystem').html(' ');
            $('#warning_possiblecauses').html(' ');
            $('#warning_alarmhanding').html(' ');
            $('#alarmrelatedinformation').html(' ');

          },
        _showError = function (id, msg) {
            str = '<li><a href="#">' + msg + '</a></li>';
            $('#' + id).html(str);
        },
        _handleError = function (XHR, ts, errorThrown) {
            if (ts == "timeout") {
                _showError('warning_cmdname', HW.lang.getLocalString('abnormal_network_timeout'));
            }
            else {
                _showError('warning_cmdname', HW.lang.getLocalString('abnormal_network_try'));
            }

        },_showImg=function(){
            var oPre=$("pre");
            if(oPre.length>0){
                var oHtml = $("pre").html().replace(/\n|\n\r|\r/g,"<br/>");
                oHtml = oHtml.replace(/\s/g,'&nbsp;');
                $('<div style="word-wrap: break-word;">' + oHtml + '<div>').replaceAll('pre') ;
            }


            var oImg = $("#warning_sd_content__wrap img");
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
                        $(curImg).wrap('<a  href="' + curImg.src + '" target="_blank"></a>');
                    }
                }
            });
        };

    return {
        pageConfig: {
            name: 'WarningSearchDetail',
            id: 'warning_search_detail',
            //决定何时加载数据；
            eventType: 'pagecreate',
            //数据处理程序
            processData: 'showData',


            //ajax请求参数设置
            ajaxOptions: {
                url: HW.GlobalState.baseUrl + "/alarm/alarm/queryAlarmDetails.json",
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
            HW.Tools._addiScroll('warning_search_detail_wapper', 'warning_search_detail_outer',{checkDOMChanges: true});
            _showContent(data);
            _showImg();
            $("#warning_sd_content__wrap table").css("width","100%");
            $("#warning_sd_content__wrap table td").attr("width","auto");
        }
    }


})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("WarningSearchDetail", HW.WarningSearchDetail);

//加载Demo页面的数据
HW.Core.loadPage("WarningSearchDetail");






















