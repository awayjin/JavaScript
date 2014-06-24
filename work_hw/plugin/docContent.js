/**
 * 产品支持 进入文档目录
 *
 */
HW.DocContent = (function (){
    var myScroller,
        sDocumentDetailURL = "/productnode/productnode/getDetailContentNew.json",
        sCaseDetailURL = "/knowledge/knowledge/getKnowledgeDetails.json",
        sDocumentDirURL = '/productnode/productnode/getDirectory.json',
        sHedexDirURL = '/hedex/hedex/getHedexDirList.json',
        oAjaxParam = {}, dirScroller,
        oDirIDs = {},sBrightnessTimeout;

    function _handleError(XHR, ts, errorThrown) {
    }



    function _getRequestPageParams() {
        return HW.Tools.parseURL($('base').attr('href'));
    }

    function _getAjaxReuestParams(mid) {
        var oPageURLParam = _getRequestPageParams(),
            _oAjaxParam = {}, _data = {}, _mid = mid || oPageURLParam['mid'], _url='';
        _oAjaxParam['error'] = _handleError;
        _oAjaxParam['data'] = _data;
        _data['mid'] = _mid;
        if (_mid === 'SUP_DOC') {
            _oAjaxParam['url'] = HW.GlobalState.baseUrl + sDocumentDetailURL;
            _data['documentid'] = oPageURLParam['documentid'] || '';
            _data['directoryid'] = oPageURLParam['directoryid'] || '';
            _data['ishedex'] = oPageURLParam['ishedex'];
            _data['isdirectory'] = oPageURLParam['isdirectory'];
            _data['libid'] = oPageURLParam['libid'] || '';
            _data['libversion'] = oPageURLParam['libversion'] || '';
            _url = (!oPageURLParam['url'] || oPageURLParam['url'] == 'undefined') ? '' :  decodeURIComponent(oPageURLParam['url']);
            _data['url'] = _url ;
        }
        else {
            _oAjaxParam['url'] = HW.GlobalState.baseUrl + sCaseDetailURL;
            _data['documentid'] = oPageURLParam['documentid'];
        }
        return _oAjaxParam;
    }

    function _handleCaseImg() {
        //图片放大与连接处理
        var oHtml = $("#content_detail pre").html();
        $("<div>" + oHtml + "<div>").replaceAll("pre")
        $("<div>" + oHtml + "<div>").replaceAll("pre")
        var oImg = $("#content_detail img");

        var attrVa = HW.GlobalState.baseUrlimg;
        var caseReg = /[^\/]*\//gi;
        oImg.each(function (i, n) {
            var attrVa1 = $(this).attr("data-original");
            var attrSrc = $(this).attr("src");
            var attrSrc = attrSrc.replace(caseReg, "");
            if (attrVa1 == undefined || attrVa1) {
                attrVa1 = attrSrc;
            }
            $(this).attr("src", attrVa + attrVa1);
            var curImg = this;
            var w = curImg.width;

            if (w * 1 > 360) {
                curImg.style.width = "60%";
                var oViewWidth = document.defaultView.getComputedStyle(curImg, null).getPropertyValue('width')
                var oWidthLast = oViewWidth.replace(/px/gi, '');
                if (oWidthLast >= w) {
                    curImg.style.width = "";
                }
                if (HW.GlobalState.container == "native") {//app 调用终端接口图片放大缩小
                    $(curImg).wrap("<a  href='openImage:{\"url\":\"" + curImg.src + "\"}'></a>");
                    console.log($(curImg).get(0));
                } else { //web 在新的页面打开
                    //console.log(oWidthLast);
                    $(curImg).wrap('<a  href="' + curImg.src + '" target="_blank"></a>');
                    console.log($(curImg).get(0));
                }
            }
        });

    }

    function _showCaseDetails(data, oPageRequestParam) {
        var str = '<div class="content_til title" id="case_title"><h3 class="zw_caseH3">',
            knowdetaildos, attachments, key, len,
            titles = {
                phenomenaldesc: HW.lang.getLocalString('case_content_phenomenon'),
                alerminfo: HW.lang.getLocalString('case_content_alarm_info'),
                reasonanalysis: HW.lang.getLocalString('case_content_analysis'),
                treatingprocesses: HW.lang.getLocalString('case_content_process'),
                adviceandsummary: HW.lang.getLocalString('case_content_conclusion')
            },
            _name, _suffix, sdl = '', json, size;
        str += unescape(oPageRequestParam['documentname']) + '</h3><time class="zw_caseTime">';
        str += !!oPageRequestParam['createtime']?oPageRequestParam['createtime']:"" + '</time></div>';
        if (data && data['body']) {
            knowdetaildos = data['body']['knowdetaildos'];
            attachments = data['body']['attachments'];
            len = attachments.length;
            for (key in titles) {
                str += '<div class="zw_container"><div class="zw_case_title">' + titles[key] +
                    '</div><div class="zw_case_content" >' + (knowdetaildos[key] ||
                    HW.lang.getLocalString('doc_list_no_doc')) + '</div></div>';
            }

            for (var k = 0, temp = []; k < len; k++) {
                _name = attachments[k].name,
                    _suffix = _name.substring(_name.lastIndexOf('.') + 1)
                if (_suffix.toLowerCase() == 'pdf' || _suffix.toLowerCase() == 'epub') {
                    temp.push(attachments[k]);
                }
            }
            len = temp.length;
            if (len) {
                for (var i = 0; i < len; i++) {
                    sdl += '<a href=\'';
                    if (HW.GlobalState.container == 'native') {
                        json = JSON.stringify(attachments[i]);
                        sdl += json;
                    }
                    else {
                        sdl += attachments[i].path;
                    }
                    sdl += '\'><span class="zw_case_name">' + attachments[i].name + '</span>'
                    sdl += '<span class="zw_case_size">' + ((size = parseFloat(attachments[i].size)) ? (size / 1024).toFixed(2) + 'KB' : ' ');
                    sdl += '</span><span class="zw_case_download">' + HW.lang.getLocalString('dir_download') + '</span></a>'
                }
                str += '<div data-role="listview" id="case_down">' + sdl + '</div>';
            }

            $('#content_detail').html(str);
            $("#content_detail table").css("width", "100%");
            _handleCaseImg();
            _regCaseEvent();

        }
        else {
            $('#content_detail').html(HW.lang.getLocalString('siteSearchList_tips0'));
        }

        //myScroller && myScroller.refresh();
    }

    function _regCaseEvent() {
        //案例附件下载事件绑定
        $('#case_down').unbind().bind('click', function (event) {
            var target = event.target, $target = $(target), o = {}, list = [];
            if (target.tagName != 'A') {
                $target = $(target).closest('a');
            }
            if (HW.GlobalState.container == 'native') {
                event.preventDefault();
                json = JSON.parse($target.attr('href'));
                if (json.hasOwnProperty('name')) {  //附件格式转换
                    o['name'] = json['name'];
                    o['size'] = json['size'];
                    o['url'] = json['path'];
                }
                list.push(o);
                var jsonData = JSON.stringify({list: list});
                simpleDialog.confirm({content: HW.lang.getLocalString('ask_download'), buttons: {ok: function () {
                    location.href = "addDownload:" + jsonData;
                }}});

                return;
            }
            else {
            }
        });
    }

    /*文档内容详情 start*/
    function _handleDocumentImg() {
        //链接处理
        var oAurl = $("#content_detail a");
        oAurl.each(function () {
            var regNum = /^http\:/i,
                regHedex = /(\/*\.+\/)+/i,
                reg_a = /^#[^#]+/i,
                regMail = /mailto:/,
                oHref = $(this).attr("href"),
                _href,
                burl = '',
                _ourl = HW.Tools.parseURL($('base').attr('href')),
                isHedex = _ourl.ishedex;

            if (regNum.test(oHref)) {
                if (HW.GlobalState.container == "native") {
                    $(this).each(function (i, e) {
                        var curAlink = $(e);
                        curAlink.unbind().bind("click", function (e) {
                            simpleDialog.confirm({content: HW.lang.getLocalString('browserPage'), buttons: {
                                ok: function () {
                                    var href = 'showRegisterPage:{"url":"' + curAlink.attr("href") + '"}';

                                    window.location.href = href;
                                }
                            }
                            });

                            e.preventDefault();
                            return false;

                        });

                    })
                } else {
                    $(this).attr("target", "_blank");
                }


            }
            else if (reg_a.test(oHref)) {
                $(this).click(function () {
                     //处理jquery 查询不到问题#section4.2.14.2.1
                    var id = oHref.replace('#', ''),
                        oDom  = document.getElementById(id),
                        $e =  oDom ? oDom : document.getElementsByName(id)[0];
                    console.log("$e"+$e)
                    $e && myScroller.scrollToElement($e, 100);
                });
            }
            else if (regMail.test(oHref)) {
                $(this).attr("href", '#');
            }
            else {
                _href = $(this).attr("href");
                _href += '';
                if (isHedex == 'true' && (!/\:/g.test(_href))) { //是hedex且非协议链接
                    _href = _href.replace(regHedex, '');
                    burl = decodeURIComponent(HW.Tools.getTrimStringURL());
                    burl = burl.replace(/url=.+/, 'url=' + _href);
                    $(this).attr("href", burl);
                }

            }
        })


        var oImg = $("#content_detail img");
        var attrVa = HW.GlobalState.baseUrlimg;

        oImg.each(function (i, n) {
            var attrVa1 = $(this).attr("data-original"),
                _ourl = HW.Tools.parseURL($('base').attr('href')),
                isHedex = _ourl.ishedex,
                _url = decodeURIComponent(_ourl.url) + '',
                firstDir = _url.match(/[^\/]+\//i);

            firstDir = firstDir ? firstDir[0] : '';
            if (isHedex == 'true') {
                var _src = $(this).attr("src");
                console.log(_src)
                var regGDe = /^(..\/)*(.\/)*/gi;
                var _srcs = _src.replace(regGDe, "");
                var baseUrlimgHedex = HW.GlobalState.baseUrlimgHedex;
                baseUrlimgHedex += _ourl.libid + '/' + _ourl.libversion + '/' + _ourl.libid + '/' + _ourl.libversion + HW.GlobalState.hedexFixedDir + '/';
                var poIss = _src.match(/^(..\/)*/gi);
                if (poIss == '../../') {
                    firstDir = '';
                } else {
                    firstDir = firstDir;
                }
                ;

                baseUrlimgHedex += firstDir + _srcs;
                $(this).attr("src", baseUrlimgHedex);
            }
            else {
                $(this).attr("src", attrVa + attrVa1);
            }

            //图片处理，包装上a标签，给终端用，web中则在新窗口中打开图片。
            var oImg = $("#content_detail img");

            oImg.each(function (i, n) {
                //先去掉 width与height属性
                $(n).attr({height: "", width: ""});
                var curImg = n;
                var imgSrc = n.src;
                var imgW = 0;
                //等待图片加载完成，才开始设置。
                curImg.onload = function () {
                    //图片宽度处理
                    imgW = curImg.width;


                    if (imgW * 1 > 320) {
                        this.style.width = "100%";
                    } else {
                        var isInTable = $(this).closest("table").length;
                        //  var isInTables = $("#docccontent table img");
                        console.log(isInTable);
                        if (isInTable) {
                            if (imgW > 80)
                                this.style.width = "50%";

                        }
                    }
                    //打开方式处理

                    if (HW.GlobalState.container == "native") {
                        $(this).wrap("<a  href='openImage:{\"url\":\"" + imgSrc + "\"}'></a>");
                    } else {
                        $(this).wrap('<a  href="' + imgSrc + '" target="_blank"></a>');
                    }
                }
            });


        });
        //图片处理
        var imgErr='../skin/default/images/';
        $("img").error(function() {
            $(this).attr("src", imgErr+"d_pic_text.png");
        });

    }

    /*检查响应的目录id*/
    function _DirIdNotUse(id){
        return typeof id ==='string' && id !=='' ? false : true;
    }
    /*显示文档详情内容*/
    function _showDocumentDetails(data, oPageRequestParam) {
        var str = '<div class="content_til title">',
            index = -1,
            strHtml = '',
            strDownload ,
            nextdirectoryid,
            updirectoryid, html,
            htmlArr = '';
        str += unescape(oPageRequestParam['documentname']) + '</div>' ;



        if (!data && ( data == "" || !data.head || !data.body)) {
            str += '<ul><li><a>' + HW.lang.getLocalString('records_relative_no_data') + '</a></li></ul>';

        }
        else {
            try {
                oDirIDs['nextdirectoryid'] =nextdirectoryid = data['body']['nextdirectoryid'];
                oDirIDs['updirectoryid'] = updirectoryid= data['body']['updirectoryid'];
                oDirIDs['curdirectoryid'] = data['body']['currentdirectoryid'];
                html = data['body']['html'];
                index = html.indexOf("supportMobileAtt");
            } catch (e) {
                index = -1
            }
            if (index !== -1) {
                strHtml = html.substring(0, index);

                strDownload = HW.Tools.parseURL($('base').attr('href'));
                strDownload = "downList.html?productid=" + strDownload.productid + "&documentid=" + strDownload.documentid
                strDownload = HW.Tools.reEncondeURIComponent(strDownload)

                htmlArr = "<a href='" + strDownload + "' class='zw_downBtn'>" + "</a>";
            }
            else {
                strHtml = html;
            }
            var regBR = /(<br\s*\/?\s*>){2,}/gi,
                regBR1 = /><br\s*(\/)?></gi;
            strHtml = strHtml.replace(regBR, "").replace(regBR1, "><");
            str += strHtml;
//            str += '<ul>' + htmlArr + '</ul>';
            str += '<ul class="content_jump" id="detail_content_jump"><a directoryid="' + nextdirectoryid +'" class="next_btn' +
                (_DirIdNotUse(nextdirectoryid) ? ' hide' : (_DirIdNotUse(updirectoryid) ? ' mld' : '') )
                + '" href="#">'+ HW.lang.getLocalString('doc_detail_next_dir') +' <span></span></a><a directoryid="' + updirectoryid +'" class="pre_btn' +
                (_DirIdNotUse(updirectoryid) ? ' hide' : (_DirIdNotUse(nextdirectoryid) ? ' mld' : '') )
                + '" href="#"><span></span>' + HW.lang.getLocalString('doc_detail_last_dir') + '</a><div style="clear:both;"></div></ul>'

        }
        $("#content_detail").html(str);
        $("#content_detail table").css({width: "100%", marginLeft: "0", marginRight: "0"});
        _handleDocumentImg();
        $("#content_detail table td").css("width", "0%");
        $("#content_detail table td").width("0%");
        if(myScroller){
            //setTimeout(function(){
               // myScroller.refresh();
                myScroller.scrollToElement($('#content_detail .content_til')[0], 30);
           // },800)


        }
        _regDocumentEvent();
    }


    function _regDocumentEvent(){
         $('#content_dir_menu .btn_right_sort').unbind('click').bind('click', function(e){
             $('#content_dir_menu').addClass('hide');
         });
        /*上下一章节跳转*/
        $('#detail_content_jump').unbind('click').bind('click', function(e){
            var target = e.target,
                $a = $(target).closest('a'),  oAjaxParam;
            if($a.length){
                oAjaxParam = _getAjaxReuestParams();
                oAjaxParam['url'] = sDocumentDetailURL;
                oAjaxParam['data']['directoryid'] = $a.attr('directoryid')
                _requestRemoteData(oAjaxParam, function (data) {
                    var  pageParam = _getRequestPageParams();
                    _showDocumentDetails(data, {documentname: unescape(pageParam['documentname'])});
                });
            }

        });

        /*点击目录事件*/
        $('#content_dir_list').unbind('click').bind('click', function(e){
            var target = e.target,
                $dt = $(target).closest('dt'),
                oDirParam, hasSubDir,oAjaxPara = _getAjaxReuestParams(),
                oPageURLParam = oAjaxPara['data'];
            if($dt.length){
                if($dt.attr('hasdata') === 'true') return false;
                oDirParam = $dt.attr('dirparam');
                try {
                    oDirParam = JSON.parse(oDirParam);
                } catch (e) {
                    oDirParam = {};
                }

                oPageURLParam['directoryid']  = oDirParam['directoryid'] || '';
                oPageURLParam['libid']  = oDirParam['directoryid'] || '';
                oPageURLParam['libversion']  = oDirParam['directoryid'] || '';
                oPageURLParam['url']  = HW.Tools.reEncondeURIComponent(oDirParam['directoryid'] ) || '';
                hasSubDir = oDirParam['sub'] == '1';
                if(hasSubDir){ //展示子目录数据
                    oAjaxPara['url'] = sDocumentDirURL;
                }
                else{ //刷新文档详情数据
                   $('a.on',this).removeClass('on');
                   $('a',$dt).addClass('on');
                    $('#content_dir_menu').addClass('hide');
                    oAjaxPara['url'] = sDocumentDetailURL;
                }
                _requestRemoteData(oAjaxPara, function (data) {
                    hasSubDir ? _setDirData(data, $dt) :
                    _showDocumentDetails(data, {documentname:oDirParam['directoryname']});
                });
            }


        });
    }

    /*文档内容详情 end*/

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

    /* 封装目录数据
    *@param target {dt_dom}
    * <dl> <dt><a class="on" href="#">一、文档包信息<span></span></a></dt>  </dl>
    * <dl>
    *   <dt><a class="on" href="#">一、文档包信息<span></span></a></dt>
    *   <dd>
    *        <dl><dt><a class="on" href="#">一、文档信息<span></span></a></dt>  </dl>
    *   </dd>
    * </dl>
    * */
    function _setDirData(data, target){
         var  documentdirectorydos, i, docsLength, oDir,
             wrapper =  target ?  $(target).closest('dl') : $('#content_dir_list'),
             str = target ? '<dt hasdata="true" strdata=\'' + $(target).attr('strdata')  +'\'>' +
                 $(target).html() + '</dt>'  : '';
        if(data && data['body']){
            documentdirectorydos = data['body']['documentdirectorydos'];
            docsLength = documentdirectorydos.length;
            if(docsLength){
                for (i = 0; i < docsLength; i++) {
                    oDir = documentdirectorydos[i];
                    str += target ? '<dd>' : '';
                    str += '<dl><dt dirparam=\'' + JSON.stringify(oDir)  +'\'><a href="#" ' +
                           (oDir['directoryid']  == oDirIDs['curdirectoryid'] ? 'class="on"' : '') +
                           '>' + oDir['directoryname'] + '<span></span></a></dt></dl>';
                    str += target ? '</dd>' : '';
                }
                wrapper.html(str) ;
                setTimeout(function() {
                    dirScroller = HW.Tools._addiScroll('content_dir_list_scroll_wapper','content_dir_list_scroll',0,0,0,0);},100);


            }
            else{ //无数据

            }

        }
        else{//请求异常

        }


    }

    /*工具事件注册*/
    function _regBarEvent() {

        $('#btn_fav').unbind('click').bind('click', function (e) {
            //收藏图标事件
            if(!HW.GlobalState.user.isSignIn){
                $("#btn_fav").attr("href","signIn.html");
                return false;
            }
            var oPageParam = _getRequestPageParams(),
                oAjaxParam = {},
                isFavOn;
            oAjaxParam['data'] = {};
            oAjaxParam['url'] = '/productnode/productnode/addDocFavorite.json';
            if ( isFavOn =!$(this).hasClass('btn_fav_on')) {
                oAjaxParam['data']['addproducts'] =
                    JSON.stringify([
                        {productid: oPageParam['documentid'], productname: oPageParam['documentname'],
                            mid: oPageParam['mid']}
                    ]);
                oAjaxParam['data']['delproductids'] = '';
            }
            else{
                oAjaxParam['data']['delproductids'] = oPageParam['fid'];
                oAjaxParam['data']['addproducts'] = '';
            }
            _requestRemoteData(oAjaxParam, function (data) {
                if (data['head']['errorcode'] === '0') {
                    $('#fav_tip_msg').html((isFavOn ? ''  : HW.lang.getLocalString('myFavorites_cancel'))+HW.lang.getLocalString('doc_added_to_favorites'));
                    $('#btn_fav')[(isFavOn ?'add' : 'remove') +'Class']('btn_fav_on');
                }
                else {
                    $('#fav_tip_msg').html((isFavOn ? ''  : HW.lang.getLocalString('myFavorites_cancel')) + HW.lang.getLocalString('doc_added_to_favorites_fail'));
                }
                $('#content_detail_tip_box').css('display', 'block');
                setTimeout(function () {
                    $('#content_detail_tip_box').css('display', 'none');
                }, 1500);
            });
        });
        /* 目录点击事件 */
        $('#content_detail_header .btn_menu').unbind('click').bind('click', function (e) {
            var oPageURLParam = _getRequestPageParams(), oAjaxPara = {};
            if($('#content_dir_list dl').length){
                $('#content_dir_menu').removeClass('hide');
                dirScroller && dirScroller.refresh();
                return ;
            }
            delete oPageURLParam['documentname'];
            oAjaxPara['data'] = oPageURLParam;
            oAjaxPara['url'] = sDocumentDirURL;
            _requestRemoteData(oAjaxPara, function (data) {
                _setDirData(data)
                $('#content_dir_menu').removeClass('hide');
            });
        });
        $('#content_detail_header .btn_fontsize').unbind('click').bind('click', function (e) {
            var $light_side =$('#light_side');
            $light_side.hasClass('hide') ?  $light_side.removeClass('hide') : $light_side.addClass('hide');
        });

        $('#night_btn').unbind('click').bind('click', function (e){
            //设置夜间模式
             var nightMode = HW.GlobalState.deviceInfo.nightMode;
            if(nightMode=='0'){
                $('#night_btn').addClass('t_on');
                $('#doc_content').addClass('night_modle');
                HW.GlobalState.deviceInfo.nightMode = '1';
            }
            else{
                $('#night_btn').removeClass('t_on');
                $('#doc_content').removeClass('night_modle');
                HW.GlobalState.deviceInfo.nightMode = '0';
            }
           _setMode('setNightMode','nightMode',HW.GlobalState.deviceInfo.nightMode);
        });

        $('#content_detail_header .btn_back').unbind('click').bind('click', function (e){
            //设置回app默认的亮度
           _setMode('setScreenBrightness','screenBrightness');
        });

        $('#cFontSize').unbind('click').bind('click', function (e){
            //设置字体大小
           var  fontSize ,
                $jia = $('#cFontSize .jia'),$jian = $('#cFontSize .jian'),
                target = $(e.target).closest('a');
            if(target.hasClass('op')) return;
            if(target.hasClass('jian')){
                +HW.GlobalState.deviceInfo.fontSize--;
            }
            else if(target.hasClass('jia')){
                +HW.GlobalState.deviceInfo.fontSize++;
            }
            fontSize =  HW.GlobalState.deviceInfo.fontSize;
            switch(fontSize){
                case 0:
                    $jian.addClass('op');
                    $jia.removeClass('op');
                    break;
                case 1:
                    $jia.removeClass('op');
                    $jian.removeClass('op');
                    break;
                case 2:
                    $jia.addClass('op');
                    $jian.removeClass('op');
                    break;
            }
           _setMode('setFontSize','fontSize',fontSize);
        });

        $('#slider_mini').unbind().bind('slidestop',function(e){
            var value = $(this).val();
            HW.GlobalState.deviceInfo.screenBrightness = value;
           _setMode('setScreenBrightness','screenBrightness',value);
        })

        //初始状态值
        _initNightModeBrightFont()


    }
    function _initNightModeBrightFont(){
        var sb = HW.GlobalState.deviceInfo.screenBrightness,
            nightMode = HW.GlobalState.deviceInfo.nightMode,
            fontSize =  HW.GlobalState.deviceInfo.fontSize;
        //设置亮度初始值
        $('#slider_mini').val(sb).slider('refresh');

       _setMode('setScreenBrightness','screenBrightness',sb);
        //设置夜间模式
        if(nightMode=='1'){
            $('#night_btn').addClass('t_on');
            $('#doc_content').addClass('night_modle');
        }
        //设置字体大小
        switch(fontSize){
            case '0':
                $('#cFontSize .jian').addClass('op');
                break;
            case '1':
                break;
            case '2':
                $('#cFontSize .jia').addClass('op');
                break;
        }
    }
    function _setMode(method,key,value){
        if(HW.GlobalState.container == "native"){//只有在手机上才调用
            sBrightnessTimeout = setTimeout(function(){
                clearTimeout(sBrightnessTimeout);
                value = value !=undefined ? '{"'+ key + '":' + value +'}' : '';
                location.href = method + ":"+ value;
            },50);
        }

    }
    //star
    function _regStar(){
        var  stars=$("#feedProStar").find("a");
        var len=stars.length;
        stars.unbind().bind("click",function(e){
            var cur=$(this);
            var index=stars.index(cur);
            // 减少分数
            if(cur.hasClass("on")){
                $.each(stars,function(i,e){
                    if(i>=index){
                        $(e).removeClass("on");
                    }
                });
            }else{
                //增加分数
                $.each(stars,function(i,e){
                    if(i<=index){
                        $(e).addClass("on");
                    }
                });
            }
            e.preventDefault();
            return false;
        });
    }
    /*意见反馈*/
    function _documentDetailsView() {
        var nodeId='',mid='',content='',feedbackId='',solved=0,score='',option='',
            oPageURLParam = _getRequestPageParams(),
            _nodeId = nodeId || oPageURLParam['documentid'],
            _mid    = mid || oPageURLParam['mid'];
        if(!HW.GlobalState.user.isSignIn){
            $("#documentFeedback").attr("href","signIn.html");
            return false;
        }
        if(HW.GlobalState.container=="browser"){
            $("#documentFeedback").unbind("click").bind("click",function(){
                $(".msg_side").removeClass("hide");
                $("#textAreas").focus();
            });
            $(".black_mask,#closeBtn").unbind("click").bind("click",function(){
                $(".msg_side").addClass("hide");
            })
            var textAreas=$("#textAreas");

            $("#goBtns").unbind().bind("click",function(){
               var textAreasVal=textAreas.val(),score=$("#feedProStar").find(".on").length;;
               if(textAreas.val()==''){
                   simpleDialog.alert({
                       content:HW.lang.getLocalString('OpinionNoempty')
                   });
               }else if(score==='0'){
                   simpleDialog.alert({
                       content:HW.lang.getLocalString('PleaseRateArticle')
                   });
               }else{
                   option={
                       url:HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
                       data:{
                           "nodeId":_nodeId,
                           "mid":_mid,
                           "content":textAreasVal,
                           "solved":solved,
                           "score":score
                       }
                   }
                   option.success=function(data){
                       if(data.head.errorcode==='0'){
                           simpleDialog.alert({
                               content:HW.lang.getLocalString('feedback_ThankYous'),
                               ok:function(){
                                   textAreas.val('');
                                   $("#dTals").html('140');
                                   //$(".msg_side").addClass("hide");
                               }
                           });
                       }else if(data.head.errorcode==='500'){
                           simpleDialog.alert({
                               content:HW.lang.getLocalString('abnormal_network_timeout'),
                               ok:function(){}
                           });

                       }else{
                           simpleDialog.alert({
                               content:HW.lang.getLocalString('feedback_failedLater')
                           });
                       }
                   }
                   HW.Core.loadPage(option);
               }
            })
        }else{
            $("#documentFeedback").unbind("click").bind("click",function(){
                    window.location.href='feedback:';
            });
        }

    };

    //用于记录浏览的历史记录
    function setHistory(){
        var _url = $('base').attr('href'),
            json = HW.Tools.parseURL(decodeURIComponent(_url)),
            documentid = json.documentid,
            mid = json.mid,
            documentname = json.documentname;

        if (localStorage) {//缓存产品中的最近浏览
            _url=_url.substring(_url.lastIndexOf('/')+1) ;

            var setName = "";
            switch(mid){
                case "SUP_DOC":
                    setName = HW.GlobalState.setDocListHistory;
                    break;
                case "SUP_KB":
                    setName = HW.GlobalState.setCaseListHistory;
                    break;
            }

            if(!!setName){
                HW.Tools.setLocalStorage(
                    setName,
                    {"url": _url, "documentid":documentid,"documentname": documentname},
                    20,
                    "documentname"
                );
            }
        }
    };

    return {
        init: function () {
            setHistory();
            $.extend(true, oAjaxParam, _getAjaxReuestParams());
        },
        pageConfig: {
            name: 'DocContent',
            id: 'doc_content',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            //ajax请求参数设置
            ajaxOptions: oAjaxParam
        },
        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            var oPageParam = _getRequestPageParams() ,
                isDirectory = oPageParam['isdirectory'] == 'true',
                isHedex = oPageParam['ishedex'] == 'true';
            HW.Tools.myMenuBottom(5);
            myScroller = HW.Tools._addiScroll('content_detail_wapper','content_detail_scroller',{checkDOMChanges: true});
   
            $('#btn_download').attr('href',HW.Tools.reEncondeURIComponent("downList.html?documentid="+oPageParam['documentid']+"&mid="+oPageParam['mid']))

            if (oPageParam['mid'] === 'SUP_DOC') {
                $('#btn_fav')[(oPageParam['iswatchflag'] == 'true' ?'add' : 'remove') +'Class']('btn_fav_on').css('display', 'block');//显示收藏图标
                if (isDirectory || isHedex) {
                    $('#content_detail_header .btn_menu').css('display', 'block'); //显示目录图标
                }
                else {
                    $('#content_detail_header .btn_menu').css('display', 'none'); //隐藏目录图标
                }
                _showDocumentDetails(data, oPageParam);
            }
            else {
                $('#btn_fav').css('display', 'none'); //隐藏收藏图标
                $('#content_detail_header .btn_menu').css('display', 'none'); //隐藏目录图标

                _showCaseDetails(data, oPageParam);
            }
//            HW.Tools._addiScroll('content_detail_wapper', 'content_detail',{checkDOMChanges: true});
            _regBarEvent();
            _regStar();
            _documentDetailsView();
        }
    }
})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("DocContent", HW.DocContent);

//加载Demo页面的数据
HW.Core.loadPage("DocContent");

//意见native
HW.nativeDetailsView={
    nativeDocumentDetailsView:function (){
    var nodeId='',mid='',content='',feedbackId='',solved=0,score='',option='',
        oPageURLParam =HW.Tools.parseURL($('base').attr('href')),
        _nodeId = nodeId || oPageURLParam['documentid'],
        _mid    = mid || oPageURLParam['mid'];

    //意见反馈界面弹出
    if(HW.GlobalState.container=="native"){
        var _json = HW.Tools.conveJson(HW.GlobalState.nativeDocumentContent),content=_json.content,
            score=_json.grade;

        if(!HW.GlobalState.user.isSignIn){
            return false;
        }
        option={
            url:HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
            data:{
                "nodeId":_nodeId,
                "mid":_mid,
                "content":content,
                "solved":solved,
                "score":score
            },
            error: ''
        }
        option.success=function(data){
            console.log(data);
            if(data.head.errorcode==='0'){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('feedback_ThankYous'),
                    ok:function(){
						$("#doc_content").removeClass("zIndexs");
					}
                });
				$("#doc_content").addClass("zIndexs");
            }else if(data.head.errorcode==='500'){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('abnormal_network_timeout'),
                    ok:function(){}
                });

            }else{
                simpleDialog.alert({
                    content:HW.lang.getLocalString('feedback_failedLater'),
                    ok:function(){}
                });
            }
        }
        HW.Core.loadPage(option);

    };

}
}
