/**
 * 产品支持 进入文档
 *
 */
HW.DocIndex = (function () {
    var sDocUrl = "/productnode/productnode/getDocumentListOnly.json",
        sCaseUrl = "/knowledge/knowledge/getKnowledgeListOnly.json",
        myScroller,
        VersionScroller,
        oAjaxParam ={};
    /* 错误处理*/
    function _handleError(){}

    function isArray(a){
        return Object.prototype.toString.call(a) === '[object Array]';
    };

    /*封装产品及知识库文档数据*/

    function _showProductCaseDocument(data, mid){
          var body = data['body'],
              isProduct = mid === 'SUP_DOC',
              docs, i, len, str= '',sHref ='',
              documentName,documentId;
          if(body){
               docs = isProduct ? body['productdocumentdos']  : body['knowledgedos'];
               if(docs && isArray(docs)){
                   len = docs.length;
                   if(len <= 0){
                       $('#docs_list').html('<li><a href="#">'+HW.lang.getLocalString('doc_list_no_doc')+'</a></li>');
                   }else{
                       for(i = 0; i < len; i++){
                           documentName = docs[i]['documentname'];
                           documentId = docs[i]['documentid'];
                           sHref = 'docContent.html?documentid=' + documentId +'&documentname=' + documentName +
                               '&mid=' + mid;
                           if(isProduct){//产品文档
                               sHref +='&ishedex=' + docs[i]['ishedex'];
                               sHref +='&isdirectory=' + docs[i]['isdirectory'];
                               sHref +='&directoryid=' + (docs[i]['directoryid'] || '');
                               sHref +='&iswatchflag=' + (docs[i]['iswatchflag'] || 'false');
                               sHref +='&fid=' + (docs[i]['fid'] || '');
                               sHref +='&libid=' + (docs[i]['libid'] || '');
                               sHref +='&libversion=' + (docs[i]['libversion'] || '');
                               sHref +='&url=' + (docs[i]['url'] || '');
                           }
                           else{//知识库文档
                               sHref += '&createtime=' + docs[i]['createtime'];
                           }
                           str += '<li><a href="' + HW.Tools.reEncondeURIComponent(sHref) +'">' + documentName +'</a></li>'
                       }

                       $('#docs_list').html(str);
                   }
                   //处理更多
                   if($('#docs_list li').length < body['totalcount']){
                       $('#pullUpDoc').css('display','block');
                   }
                   else{
                       $('#pullUpDoc').css('display','none');
                   }
                   myScroller && myScroller.refresh();
                    $('#document_title a').removeClass('active').
                           filter('[mid="' + mid + '"]').addClass('active');


               }
          }
    }

    /* ajax请求远程数据 */
    function _requestRemoteData(oParam, fSuccess){
           var  option={
                url:HW.GlobalState.baseUrl + oParam['url'],
                error: _handleError,
                data:oParam['data'],
                success:fSuccess
            };
        HW.Core.loadPage(option);
    };

    /*封装产品及知识库 文档类型 数据*/
    function showProductOrCaseDocumentType(data,mid){
        var str = '<dt><a href="#">'+HW.lang.getLocalString('doc_type')+'：<b id="version_type_name" typeid="">'+HW.lang.getLocalString('entire')+'</b><span></span></a></dt>',
            aDocsTypes, i , len ,
            isProduct = mid === "SUP_DOC",
            sTypeNameKey ,
            sTypeIdKey ;
        if(data && data['body']){
            aDocsTypes = data['body'][isProduct ? 'documenttypedos' : 'knowtypedos'];
            if(aDocsTypes && isArray(aDocsTypes)){
                sTypeNameKey = isProduct ? 'documenttype' : 'knowledgetypename';
                sTypeIdKey = isProduct ? 'documenttypeid' : 'knowledgetypeid';
                str += '<dd class="on"><a href="#"><b>'+HW.lang.getLocalString('entire')+'</b><span></span></a></dd>';
                for(i = 0, len = aDocsTypes.length; i < len; i++){
                  str += '<dd  typeid="'+ aDocsTypes[i][sTypeIdKey]  +
                       '"><a href="#"><b>' + aDocsTypes[i][sTypeNameKey] +'</b><span></span></a></dd>';
                }
                $('#version_type').html(str);
            }

        }
    } ;

    /*封装产品文档版本号 数据*/
    function _showProductVersions(data,curVersionId){
         var str = '<a href="#" class="all_sort">'+HW.lang.getLocalString('entire')+'<span versiondid="'+ oAjaxParam['data']['termid'] +'"  class="btn',
             documentversiondos, i, len, secondVersionDos, k, secondLen ;
         if(data && data['body']){
             documentversiondos = data['body']['documentversiondos'];
             len = documentversiondos.length;
              str+= (curVersionId === oAjaxParam['data']['termid']  ? ' on' :'') +'"></span></a>'
             for(i = 0, len = documentversiondos.length; i < len; i++){
               str += '<dl><dt><a href="#" >' + documentversiondos[i]['version'] + '<span class="hArrow vArrow"></span></a></dt>';
               str += '<dd><a href="#">'+HW.lang.getLocalString('entire')+'<span class="btn'+ (curVersionId === documentversiondos[i]['versionid']  ? ' on' :'') +
                   '" versionid="'+ documentversiondos[i]['versionid'] +'" versionname="' + documentversiondos[i]['version'] +
                   '"></span></a></dd>';
               secondVersionDos = documentversiondos[i]['versiondos'];
               for(k = 0, secondLen = secondVersionDos.length; k < secondLen; k++){
                   str += '<dd><a href="#">' + secondVersionDos[k]['version']  +
                       '<span class="btn' + (curVersionId === secondVersionDos[k]['versionid']  ? ' on' :'') +
                       '" versionid="'+ secondVersionDos[k]['versionid'] + '" versionname="' + secondVersionDos[k]['version'] +
                       '"></span></a></dd>';
               }
               str += '</dl>';
             }
             $('#versions .sort_page').html(str);
             VersionScroller =  HW.Tools._addiScroll('version_sort_page_wapper','version_sort_page');
         }
    };

    function searchMore(){
        var  _oAjaxParam = {}, mid,termid;
        $.extend(true, _oAjaxParam, oAjaxParam);
        mid = $('#document_title a.active').attr('mid');
        _oAjaxParam['url'] =  (mid=== 'SUP_KB' ? sCaseUrl : sDocUrl);
        _oAjaxParam['data']['mid'] = mid;
        termid = (mid=== 'SUP_KB' ? oAjaxParam['data']['termid'] : ($('#version_name').attr('versionid') || oAjaxParam['data']['termid']));
        _oAjaxParam['data']['termid'] = termid;

        _oAjaxParam['data']['typeid'] = $('#version_type_name').attr('typeid');
        _oAjaxParam['data']['limit'] = $('#docs_list li').length + 10;
        _requestRemoteData(_oAjaxParam, function(data){
            _showProductCaseDocument(data, mid);
        });
    }

    /*注册事件处理*/
    function _regEvent(){
      /* 产品 知识库文档互相切换 */
      $('#document_title').unbind('click').bind('click', function(e){
            var target = e.target,
                $target = $(target),
                tagName = target.tagName.toUpperCase(),
                mid,_oAjaxParam = {};
            if(tagName === 'A'){
                mid = target.getAttribute('mid');
                $.extend(true, _oAjaxParam, oAjaxParam);
                _oAjaxParam['url'] =  (mid=== 'SUP_KB' ? sCaseUrl : sDocUrl);
                _oAjaxParam['data']['mid'] = mid;
                _requestRemoteData(_oAjaxParam, function(data){
                    _showProductCaseDocument(data, mid);
                    $target.siblings().removeClass('active').end().addClass('active');
                });
            }
      });
      /*清除条件及确定*/
      $('#version_menu .ctrl_box').unbind('click').bind('click', function(e){
          var target = e.target,tagName = target.tagName.toUpperCase(),
              $target, _oAjaxParam = {}, mid;
          if(tagName === 'A'){
              $target = $(target);
              if($target.hasClass('btn_left_sort')){ //清除条件
                  _initFilter();
              }
              else if($target.hasClass('btn_right_sort')) {//确定
                  $.extend(true, _oAjaxParam, oAjaxParam);
                  mid = $('#document_title a.active').attr('mid');
                  _oAjaxParam['url'] =  (mid=== 'SUP_KB' ? sCaseUrl : sDocUrl);
                  _oAjaxParam['data']['mid'] = mid;
                  _oAjaxParam['data']['termid'] = $('#version_name').attr('versionid');

                  _oAjaxParam['data']['typeid'] = $('#version_type_name').attr('typeid');
                  _requestRemoteData(_oAjaxParam, function(data){
                      _showProductCaseDocument(data, mid);
                      $('#docment_content_screenings').trigger('click');
                  });
              }
          }
      });
     /* 切换到版本号选择 页面*/
      $('#version_title').unbind('click').bind('click', function(e){
          var _oAjaxParam = {}, versionid = $('#version_name').attr('versionid');
          _oAjaxParam['url'] = '/productnode/productnode/getProductVersion.json';
          _oAjaxParam['data'] = {};
          _oAjaxParam['data']['mid'] = 'SUP_DOC';
          _oAjaxParam['data']['termid'] =  oAjaxParam['data']['termid'];
          _requestRemoteData(_oAjaxParam, function(data){
              $('#versions').removeClass('hide');
              $('#doc_index_left_Sidebar').addClass('hide');
              $('#doc_index_right_Sidebar').addClass('hide');
              _showProductVersions(data, versionid);
              HW.Tools.myMenuBottom(5);


          });


      });

      /*版本号 返回，确定按钮*/
      $('#versions .header_page').unbind('click').bind('click', function(e){
          var target = e.target, tagName = target.tagName.toUpperCase(),
              $target = $(target), $span, oRequestParam = {}, termid;
          if(tagName === "A" ){
              if($target.hasClass('btn_right')){
                  $span  = $('span.on',  $('#versions .sort_page'));
                  termid =  $span.attr('versionid');
                  $('#version_name').attr('versionid', termid).html($span.attr('versionname'));
                  oRequestParam['url']  ='/productnode/productnode/getProductDocType.json';
                  oRequestParam['data'] = {};
                  oRequestParam['data']['termid'] = termid || oAjaxParam['data']['termid'];
                  oRequestParam['data']['mid'] ='SUP_DOC';

                  _requestRemoteData(oRequestParam, function(data){
                      showProductOrCaseDocumentType(data, 'SUP_DOC');
                  });
              }
              $('#doc_index_left_Sidebar').removeClass('hide');
              $('#doc_index_right_Sidebar').removeClass('hide');
              $('#versions').addClass('hide');
              HW.Tools.myMenuBottom();
              return false;

          }
      });

        /* 版本号选择状态改变*/
        $('#versions .sort_page').unbind('click').bind('click', function(e){
             var $activeSpan = $('span.on',  this),
                 target = e.target,
                 $target = $(target),
                 $a = $target.closest('a'),
                 $dd = $a.closest('dd'),
                 $dt = $a.closest('dt'),
                 $curSpan = $('span', $a),
                 $dl;
                 if($a.hasClass('all_sort') || $dd.length){//全新版本
                     if(!$curSpan.hasClass('on')){
                         $activeSpan.removeClass('on');
                         $curSpan.addClass('on');
                     }
                 }
                 else if($dt.length){
                     $dl = $dt.closest('dl');
                     if($curSpan.hasClass('vArrow')){
                         $curSpan.removeClass('vArrow');
                         $('dd', $dl).addClass('hide');
                     }
                     else{
                         $curSpan.addClass('vArrow');
                         $('dd', $dl).removeClass('hide');
                     }
                 }

        });

      /* 文档类型的拆展 及 选择取消*/
      $('#version_type').unbind('click').bind('click', function(e){
          var target = e.target, $target= $(target),
              $dt = $target.closest('dt'),
              $dd = $target.closest('dd');
          if($dt.length){
              if($(this).hasClass('sort_open')){//已展开
                   $(this).removeClass('sort_open');
              }
              else{
                  $(this).addClass('sort_open');
              }

          }
          else if($dd.length){
               $('.on', this).removeClass('on');
               $dd.addClass('on');

               $('#version_type_name', this).attr('typeid', $dd.attr('typeid'))
                   .html($('b', $dd).text());
          }

      });
    } ;
    //侧栏_动画效果
    function _mySidebarAll($id1,$id2,$id3, fn){
        /*
         * $id1 左边ID / $id2 侧栏ID / $id3 按钮ID
         * */
        var sidebar_left=$("#"+$id2),sidebar_right=$("#"+$id1),sidebar_btn=$("#"+$id3);
        function _mySwipeleft(){
            HW.Tools.myMenuBottom('5');
            sidebar_right.removeClass("scroller-hide").addClass("scroller");
            sidebar_left.removeClass("hide").addClass("leftAbso left2");
            $("#page_maskdoc").removeClass("hide");
        }
        function _mySwiperight(){
            HW.Tools.myMenuBottom('1');
            sidebar_right.removeClass("scroller").addClass("scroller-hide");
            sidebar_left.addClass("hide").removeClass("leftAbso left2");
            $("#page_maskdoc").addClass("hide");
        }
        sidebar_btn.unbind("click").bind("click swiperight",function(oEnt){
            oEnt.stopPropagation();
            if(fn && typeof fn === 'function')fn.apply(this, arguments);
            if(sidebar_left.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        $("#page_maskdoc").unbind('click').bind('click',function(e){
            _mySwiperight();
            myScroller.refresh();
        })
    };
    //侧栏_动画效果

    function _initFilter(){  //写文档类型数据
        var sMid = $('#document_title a.active').attr('mid'),
            $version_title = $('#version_title'),
            oRequestParam ={},
            _oURLParam =  HW.Tools.parseURL($('base').attr('href')),
            sRequestURL = '' ;
        if(sMid==='SUP_DOC'){ //产品文档
            $version_title.hasClass('hide') &&
            $version_title.removeClass('hide');

            sRequestURL =  '/productnode/productnode/getProductDocType.json';

        }
        else{//知识库
            !$version_title.hasClass('hide') &&
            $version_title.addClass('hide');

            sRequestURL =  '/knowledge/knowledge/getKnowledgeType.json';
        }
        $('#version_title').html('<dt><a href="#">'+HW.lang.getLocalString('doc_version')+'：<b id="version_name"  versionid="'+ _oURLParam['termid'] +'" >'+HW.lang.getLocalString('entire')+'</b><span></span></a></dt>');
        oRequestParam['url']  = sRequestURL;
        oRequestParam['data'] = {};
        oRequestParam['data']['termid'] = _oURLParam['termid'];
        oRequestParam['data']['mid'] =sMid;

        _requestRemoteData(oRequestParam, function(data){
            showProductOrCaseDocumentType(data, sMid);
        });
    }
    return {
        init:function(){
           var  oUrlParam = HW.Tools.parseURL($('base').attr('href')),
                 _data = {};
            oAjaxParam['url'] =  HW.GlobalState.baseUrl +
                (oUrlParam['mid'] === 'SUP_KB' ? sCaseUrl : sDocUrl);
            _data.termid  = oUrlParam.termid;
            _data.typeid  = oUrlParam.typeid || '';
            _data.limit   = oUrlParam.limit  ||10;
            _data.offset  = oUrlParam.offset || 0;
            _data.mid = oUrlParam['mid'];

            oAjaxParam['error'] = _handleError;
            oAjaxParam['data'] = _data;


        },

        pageConfig: {
            name: 'DocIndex',
            id: 'doc_index',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            //ajax请求参数设置
            ajaxOptions:oAjaxParam


        },
        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            HW.Tools.myMenuBottom('1');
            var _oURLParam =  HW.Tools.parseURL($('base').attr('href'));
           // myScroller = HW.Tools._addiScroll('docs_list_wapper','doc_list_scroll',0,0,0,0);
            myScroller = HW.Tools._addiScroll('docs_list_wapper','doc_list_scroll',{isMore:true,
                id:'pullUpDoc',ajaxCallback:searchMore});

            $('#docment_content_title').html(_oURLParam['productname']);
            _showProductCaseDocument(data, _oURLParam['mid']);
            _regEvent();
            _mySidebarAll("doc_index_left_Sidebar","doc_index_right_Sidebar",
                "docment_content_screenings",_initFilter);

        }
    }
})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("DocIndex", HW.DocIndex);

//加载Demo页面的数据
HW.Core.loadPage("DocIndex");





















