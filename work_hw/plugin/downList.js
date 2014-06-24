/**
 * 产品支持 进入文档目录
 *
 */
HW.DownList = (function () {
    var  docsCache,attsCache,myScroller,
        _showList = function (data) {
            var docs=[],docss=[], len, sDocs = '', doc2 = {}, key,
                sdocstart = '<li id="doc_down">',
                sAttsstart = '<li id="atts_down">',
                atts=[],attss=[], alen, sAtts = '', i, k,
                name, suffix, size;
            if (!data || data.head.errorcode == "500") {
                _showError('down_List', HW.lang.getLocalString('download_no_fail'));
            }
            else {
                try {
                    docss = data.body.documentsuffixdos;
                    for(var k = 0, l = docss.length; k < l; k++){
                       if(docss[k].suffix.toLowerCase() == 'pdf' || docss[k].suffix.toLowerCase() == 'epub'){
                           docs.push(docss[k]);
                       }
                    }
                    len = docs.length >>> 0;
                    attss = data.body.attachmentdos;
                    for(var k = 0, l = attss.length; k < l; k++){
                        var _name = attss[k].name,
                        _suffix = _name.substring(_name.lastIndexOf('.')+1)
                        if(_suffix.toLowerCase() == 'pdf' || _suffix.toLowerCase() == 'epub'){
                            atts.push(attss[k]);
                        }
                    }
                    alen = atts.length >>> 0;
                    // if is a empty array
                    if (!len && !alen) {
//                        console.log("try==0=")
                        $('#down_List').html('<li><div class="info"><h1>'+ HW.lang.getLocalString('no_download_doc_at') +'</h1></div></li>');
                        return;
                    }
                    // 文档下载
                   if(len){
                    sDocs += sdocstart;
                    sDocs += '<div class="info"><h1>'+  HW.lang.getLocalString('case_file')  +':  <span id="doc_name">' + docs[0].title.substring(0,docs[0].title.lastIndexOf('.')) + '</span></h1>';
                    sDocs += '<span>'+  HW.lang.getLocalString('size')  +'：<span id="doc_size">' +
                        (/[km]/gi.test(docs[0].size) ? docs[0].size : ((docs[0].size/1024).toFixed(2) + 'kb'))+'</span></span></div><div class="ctrl"><label>'+  HW.lang.getLocalString('format')  +'：</label>'
                    for(i=0; i< len; i++){ //遍历数组
                        for(key in docs[i]) { //遍历数组中的对象
                            if(key == 'suffix'){
                                sDocs += '<a class="item '+ (i===0 ? 'on': '') +'" json=\''+ JSON.stringify(docs[i]) +'\'><span></span>'+ docs[i][key] +'</a>';
                            }
                        }

                    }
                    sDocs += '<a id="down_a" class="download" href="'+ HW.Tools.reEncondeURIComponent((docs[0].pathurl))  +'">'+ HW.lang.getLocalString('dir_download')+'</a></div></li>';
                   }
                    else{
                       sDocs='';
                   }
                    //附件下载
                   if(alen){
                    for(k=0; k< alen; k++){ //遍历数组
                        sAtts += sAttsstart;
                        name = atts[k].name;
                        suffix = name.substring(name.lastIndexOf('.')+1)
                        name   =  name.substring(0,name.lastIndexOf('.'))
                        sAtts += '<div class="info"><h1>'+  HW.lang.getLocalString('attachment')  +':  <span>' + name + '</span></h1>';
                        sAtts += '<span>'+  HW.lang.getLocalString('size')  +'：<span>' +
                            (/[km]/gi.test(atts[k].size) ? atts[k].size : ((atts[k].size/1024).toFixed(2) + 'kb')) + '</span></span></div><div class="ctrl"><label>'+  HW.lang.getLocalString('format')  +'：</label>';
                        sAtts += '<a class="item on" json=\''+ JSON.stringify(atts[k]) +'\'><span></span>'+ suffix +'</a>';
                        sAtts += '<a class="download" href="'+ HW.Tools.reEncondeURIComponent((atts[k].path))  +'">'+ HW.lang.getLocalString('dir_download')+'</a></div></li>';
                    }
                    sAtts += '';
                   }
                    else{
                       sAtts = '';
                   }
                    $('#down_List').html(sDocs + sAtts);

                } catch (e) {
//                    console.log("catch==0=")
                    $('#down_List').html('<li><div class="info"><h1>'+ HW.lang.getLocalString('no_download_doc_at') +'</h1></div></li>');
                }
            }
        },

        _bindEvent = function(){
            $('#down_List').unbind().bind('click',function(event){
                var target = event.target,
                   $target = $(target),
                    tagName = target.tagName.toLocaleUpperCase(),
                    $parentItem,jsonStr;
                if(tagName === 'A'){
                    $parentItem  = $target.closest('div');
                     if($target.hasClass('item')){ //
                         $('.item',$parentItem ).removeClass('on');
                         $target.addClass('on');
                         try{
                             if($target.parents().is('#doc_down')){
                                 jsonStr = JSON.parse($(target).attr('json'));
                                 $('#doc_name').html(jsonStr.title.substring(0,jsonStr.title.lastIndexOf('.')));
                                 $('#doc_size').html((jsonStr.size/1024).toFixed(2) + 'kb');
                                 $('#down_a').attr('href', jsonStr.pathurl)
                             }
                         } catch(e){

                         }
                     }
                     else if($target.hasClass('download')){
                         var $A=$('.on',$parentItem),
                            list = [],
                            isNoChoiceFormat = false,
                            o;
                         if($A.length){
                             try{
                                 o = {};
                                 jsonStr = JSON.parse($A.attr('json'));
                                 if(jsonStr.hasOwnProperty('name')){  //附件格式转换
                                     o['name'] = jsonStr['name'];
                                     o['size'] = jsonStr['size'];
                                     o['url']  = jsonStr['path'] ;
                                 } else{ //文档格式转换
                                     o['name'] = jsonStr['title'];
                                     o['size'] = jsonStr['size'] ;
                                     o['url']  = jsonStr['pathurl'] ;
                                 }
                                 list.push(o);

                             } catch (e){
                                 isNoChoiceFormat = true;
                             }
                         }
                         else{ //没选择格式，退出
                             isNoChoiceFormat = true;
                         }
                         if(isNoChoiceFormat){
                             // alert("没有选择格式")
                             event.preventDefault();
                             simpleDialog.alert({content:HW.lang.getLocalString('download_no_format')});

                             return;
                         }
                         if(HW.GlobalState.container =='native'){ //处理一个native 下载   &nbsp;
                             event.preventDefault();
                             var jsonData = JSON.stringify({list:list});
                             // console.log("jsonData=0")
                             //console.log(jsonData)
                             //console.log("jsonData=1")
                             simpleDialog.confirm({content:HW.lang.getLocalString('ask_download'),buttons:{ok:function(){
                                 location.href = "addDownload:" + jsonData;

                             }}});

                             return;
                             // setTimeout(function(){$("#dlback").trigger("click");},20);


                         } else{  //处理浏览器下载

                         }

                     }
                }

            });
        } ,
        mk2bFormat = function (size) {
            if ((/k/i).test(size)) {
                size = parseFloat(size) * 1024;
            }
            else if ((/m/i).test(size)) {
                size = parseFloat(size) * 1024 * 1024;
            }
            return size;
        },
        _showError = function (id, msg, btnTxt) {
            var  str = '<li><div class="info"><h1>' + msg + '</h1></div></li>';
            $('#' + id).html(str);
        },
        _handleError = function (XHR, ts, errorThrown) {
            if (ts == "timeout") {
                _showError('down_List', HW.lang.getLocalString('abnormal_network_timeout'));
            }
            else {
                _showError('down_List', HW.lang.getLocalString('abnormal_network_try'));
            }
            //$('#dreload').unbind().bind("click", function () {
           //     HW.Core.loadPage(HW.GlobalState.lastAjaxOptions);
           // })
        };
    return {
        pageConfig: {
            name: 'DownList',
            id: 'DownList',
            //决定何时加载数据；
            eventType: 'pagecreate',
            //数据处理程序
            processData: 'showData',

            tag: false,

            //ajax请求参数设置
            ajaxOptions: {
                url: HW.GlobalState.baseUrl + "/knowledge/knowledge/getDownloadFile.json",
                cache: false,
                initData: function () {
                    var oPageParam =HW.Tools.parseURL($('base').attr('href'));
                    var o = {productid:'',documentid:oPageParam['documentid'],mid:oPageParam['mid']};
                    return o;
                },
                error: _handleError
            }

        },
        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
//            var backURL = $.mobile.urlHistory.getPrev().url;
//            backURL = backURL.substring(backURL.lastIndexOf('/')+1) ;
//            $('#dlback').click(function(){
//                        $.mobile.back();
//                  });
            myScroller = HW.Tools._addiScroll('doc__down__wapper','doc__down__outer',0,0,92,0);
            _showList(data);
            myScroller.refresh();
            _bindEvent();
//            hoverBtn();
        }
    }
})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("DownList", HW.DownList);

//加载Demo页面的数据
HW.Core.loadPage("DownList");





















