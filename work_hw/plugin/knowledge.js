/**
 * 产品支持
 */
HW.KnowledgeLibrary = (function () {
    var myScroller;

    function _handleError(){}
    //我的产品-级目录显示
    function _delegateContentShow() {
        var qt,options, stext,idpath =  '';
        options = {
            url: HW.GlobalState.baseUrl + "/productnode/productnode/getPrductNode.json",
            initData: function () {
                var o = {}, result;
                o.nodeid = o.nodeid || '';
                o.idpath = o.idpath || '';
                result = {"nodeid": o.nodeid, "idpath": o.idpath};
                return  result;
            },
            data: {mid: "SUP_KB"},
            error: _handleError
        };
        options.success = function (data) {
            var sHtml = '<dl>',productNodeDos ,len ,i, name;

            if (data && data.body && !!data.body.productnodedos && data.body.productnodedos.length != 0) {
                productNodeDos = data.body.productnodedos;
                //显示产品目录及产品列表
                for (i = 0; i < data.body.productnodedos.length; i++) {
                    name = productNodeDos[i].nodename;
                    //产品列表
                    if (!productNodeDos[i].isproduct) {
                        sHtml += '<dd><a class="lev1_a" href="#" ' +
                            ' nodeid="' + productNodeDos[i].nodeid + '"><span class="pFlgs"></span><b>' + name +
                            '</b><span class="goPage"></span></a>'+  '</dd>';
                    }

                }
                $("#knowledge_library .product").html(sHtml+'</dl><div class="clear"></div>');

            }
            else{
                $("#knowledge_library .product").html('<dd><a class="lev1_a" href="#"><span class="pFlgs"></span><b>' + HW.lang.getLocalString('common_no_records') +
                    '</b><span class="goPage"></span></a></dd></dl><div class="clear"></div>');
            }
            myScroller = HW.Tools._addiScroll('knowledge_library_product_wapper','knowledge_library_scroller',0,0,0,0);
        }
        HW.Core.loadPage(options);
    };

    //注册产品一级目录收藏与展开事件
    function _regProductUnfold(){
        $('#knowledge_library_product').unbind('click').bind('click',function(e){
            var target = e.target,
                tagName = target.tagName.toUpperCase(),
                $target = $(target),
                tempTarget,
                domDownArrow,
                $dd;
            //修正目标对象target
            if(tagName !== "A"){
                tempTarget = $(target).closest('a');
                if(tempTarget.length){
                    $target = tempTarget;
                    target = tempTarget[0];

                }
            }
            $dd = $target.closest('dd');
            if($target.hasClass('lev1_a')){ //二三级目录 收藏展开
                domDownArrow = $('.goPage', $target);
                if(domDownArrow.hasClass('unfoldPage')){//收藏
                    $('.lev_2', $dd).addClass('hide');
                    domDownArrow.removeClass('unfoldPage');
                    myScroller.refresh();
                    myScroller.scrollToElement($('#searchKeys')[0], 30);
                }
                else{//展开
                    if($('.lev_2', $dd).length){
                        $('.lev_2', $dd).removeClass('hide');
                        myScroller.refresh();
                        myScroller.scrollToElement($target[0], 30);
                    }
                    else{ //第一次去取数据
                        _getSecondProductDirs($target.attr('nodeid'), $target);
                    }
                    domDownArrow.addClass('unfoldPage');
                }
            }
            else if($target.hasClass('lev1_b')){ //二三级目录跳到四五级产品目录

            }


        });
    }
    /*取产品二三级目录数据*/
    function _getSecondProductDirs(nodeId, $target){
        var  option={
            url:HW.GlobalState.baseUrl+"/productnode/productnode/getSecondPrductNode.json",
            error: _handleError,
            data:{
                "mid":"SUP_KB",
                "idpath":"",
                nodeid:nodeId
            }
        };
        option.success=function(data){
            var sHtml = '',productNodeDos , parentNodeId, paretIdpath, len ,
                i, odd,  childNodes,   childLen, k, ChildIdpath, ChildNodeId,urls;

            if (data && data.body && !!data.body.parentnodedos &&
                data.body.parentnodedos.length != 0) {
                productNodeDos = data.body.parentnodedos;
                len   = productNodeDos.length;
                //显示产品目录及产品列表
                for (i = 0; i < len; i++) {
                    //产品列表
                    parentNodeId = productNodeDos[i].nodeid;
                    paretIdpath = nodeId +'|' + parentNodeId;
                    sHtml += '<div class="lev_2 "><h3 class="levH3" nodeid="'+ parentNodeId  +
                        ' "idpath="' + paretIdpath + '"><i></i><span>' + productNodeDos[i].nodename +  '</span></h3><ul class="slider_p"> ';
                    childNodes = productNodeDos[i]['childNodes'];
                    childLen = childNodes.length;

                    for(k = 0; k < childLen; k++){
                        ChildNodeId =  childNodes[k]['nodeid'];
                        ChildIdpath =  paretIdpath + '|'  + ChildNodeId;
                        urls=HW.Tools.reEncondeURIComponent('productSupport.html?mid=SUP_KB&nodeid=' + ChildNodeId + '&idpath=' + ChildIdpath);
                        sHtml += '<li><a href="'+urls+'" class="lev1_b" >' + childNodes[k]['nodename'] + '</a></li> ';
                    }
                    if(childLen % 2){
                        sHtml += '<li><a href="#"  ></a></li> ';
                    }
                    sHtml += '</ul></div>';
                }

            }
            $target.after(sHtml);
            myScroller.refresh();
            myScroller.scrollToElement($target[0], 30);
        }
        HW.Core.loadPage(option);
    }

    //产品参数idpath拼装
    function _getProductIDPath(data, idpath){
        if (!data)  return ''; //
        return !!idpath ? idpath + "|" + data.nodeid : data.nodeid ;
    };

    function _myBtnChangeZoom(){
        if (HW.GlobalState.user.isSignIn) {
            var signInBtn = $(".login_go"),signFont=$(".login_font");
            signInBtn.attr("href", "myZone.html?from=index");
            if (!signInBtn.hasClass("myZone")) {
                signInBtn.addClass("myZone");
            }
            signFont.text(HW.lang.getLocalString('myZone_header'));
        } else {
            var signInBtn = $(".login_go"),signFont=$(".login_font");
            signInBtn.attr("href", "signIn.html?from=index");
            if (signInBtn.hasClass("myZone")) {
                signInBtn.removeClass("myZone")
            }
            signFont.text(HW.lang.getLocalString('myZone_js_login'));
        }
    };
    /*
    * 侧栏我的收藏登录跳转
    * */
    function _regEventAttentionClickmy(){
        var gz=$("#attentionLinksk");
        gz.bind("click",function(e){
            if(!HW.GlobalState.user.isSignIn){
                HW.GlobalState.signJumpPage="myAttention.html";
                HW.GlobalState.signBackPage="../page/knowledge.html";
                $.mobile.changePage("signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }else{
                $.mobile.changePage("myAttention.html");
            }
        });
    };
    return {
        pageConfig: {
            name: 'KnowledgeLibrary',
            id: 'knowledge_library',
            //决定何时加载数据；
            eventType: 'pageshow',
            //数据处理程序
            processData: 'showData',
            'onlyExecNotAjax':true
        },
        init: function(){
            HW.Tools.myMenuBottom(1);
            _regEventAttentionClickmy();
        },

        /**
         *显示完列表
         * @param data 由ajax获取到的json数据
         */
        showData: function (data) {
            _myBtnChangeZoom();
            _delegateContentShow();
            _regProductUnfold();
            HW.Tools.mySidebarAll("knowledge_left_Sidebar","knowledge_right_Sidebar","knowledge_rightbtn",'cePage',"page_maskTk")

        }


    }

})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("KnowledgeLibrary", HW.KnowledgeLibrary);

//加载Demo页面的数据
HW.Core.loadPage("KnowledgeLibrary");

















