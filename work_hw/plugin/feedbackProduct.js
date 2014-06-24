/**
 * feedbackProduct.html 产品文档最近反馈列表
 */
HW.FeedbackProduct=(function(){
    var _myScroll=null;
    //未登录，根据进不到此页面。收藏跳转中已处理跳转。
    function _isSign(){
        var feedbackProductCont=$("#feedbackProductCont");
        //点击回复操作
        feedbackProductCont.undelegate(".feed-reply-link","click").delegate(".feed-reply-link","click",function(e){
            if(!HW.GlobalState.user.isSignIn){
                 //未登录，先登录。
                HW.GlobalState.signJumpPage=window.location.href;
                HW.GlobalState.signBackPage=$("base").attr("href");
                $.mobile.changePage("signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }
        });
    }

    function _myGetDocDocumentUrl(d){
        var _url='';
        _url = 'docContent.html?documentid=' + d.body.feedbackList[0]['nodeId'] +'&documentname=' + d.body.feedbackList[0]['nodeName'] +
            '&mid=' + d.body.feedbackList[0]['mid'];
        _url +='&ishedex=' + d.body.feedbackList[0]['ishedex'] || '';
        _url +='&isdirectory=' + d.body.feedbackList[0]['isdirectory'] || '';
        _url +='&directoryid=' + (d.body.feedbackList[0]['directoryid'] || '');
        _url +='&libid=' + (d.body.feedbackList[0]['libid'] || '');
        _url +='&libversion=' + (d.body.feedbackList[0]['libversion'] || '');
        _url +='&url=' + (d.body.feedbackList[0]['url'] || '');
        _url +='&iswatchflag='+(d.body.feedbackList[0]['iswatchflag'] || '');
        _url +='&fid='+(d.body.feedbackList[0]['fid'] || '');

        return HW.Tools.reEncondeURIComponent(_url);
    }
    //意见详情查询
    function _createHtmlShowData(){
       var sHtml='' ,options, _limit=20, _offset= 0, _nodeId='', _mid='', feedbackId='', href =  HW.Tools.parseURL($('base').attr('href')),
           _nodeId = href.documentid,
           _mid    = href.mid,
           userId  = HW.GlobalState.user.userId,
           relID = $("#replaceID");
       options={
            url:HW.GlobalState.baseUrl+"/feedback/feedback/queryMyFeedback.json",
            data:{
                nodeId:_nodeId,
                mid:_mid,
                pageSize :_limit,
                pageIndex :_offset,
                userId:userId
            }
       };
       options.success=function(data){
           console.log(data);
            if(!data || data.body.feedbackList.length===0){
                $("#feedbackProductCont").html("意见详情为空");
            }else{
                for(var i=0;i<data.body.feedbackList.length;i++){
                    var url=_myGetDocDocumentUrl(data);
                    var curObj=data.body.feedbackList[i];
                    HW.dongFeedbackId=data.body.feedbackList[i].feedbackId
                    var replyLen=curObj.feedbackreplys.length;
                    var names=data.body.feedbackList[i].zhName || "我";
                    sHtml+='<div class="msg_dital_warp"><ul class="msg_dital_list"><li><label>'+names+'：</label><p>';
                    sHtml+=data.body.feedbackList[i].content+'</p></li>';

                    for(var j=0;j<replyLen;j++){
                        var replyObj=curObj.feedbackreplys[j];
                        sHtml+='<li><span class="mng_rp">'+replyObj.replyuser+'：'+replyObj.replycontent+'</span></li>';
                    }

                    sHtml+='</ul><div class="msg_dital_til"><a href="'+url+'"><span><label>查看原文：</label>'
                        +data.body.feedbackList[i].nodeName+'</span><i></i></a></div></div>';
                }

                $("#feedbackProductCont").html(sHtml);
                _myScroll.refresh();
             }


            console.log(HW.dongFeedbackId)


       }
       HW.Core.loadPage(options);

        //意见回复  feedbackId为空即为添加意见反馈，不为空则是添加回复
        if(HW.GlobalState.container=="native"){
            relID.unbind('click').bind('click',function(){
                window.location.href='feedbackId:';
            })
        }else{
            relID.unbind('click').bind('click',function(){
                $("#replaceMsgSide").removeClass("hide");
            })

            $("#feedSubmitGoBtn").unbind('click').bind('click',function(){
                var option='', textAreasVal=$("#feedTextareaId").val();
                option={
                    url:HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
                    data:{
                        "nodeId":_nodeId,
                        "mid":_mid,
                        "feedbackId":HW.dongFeedbackId,
                        "content":textAreasVal
                    }
                }
                option.success=function(data){
                    console.log(data)
                    if(data.head.errorcode==='0'){
                        simpleDialog.alert({
                            content:HW.lang.getLocalString('feedback_ThankYous'),
                            ok:function(){
                                $("#replaceMsgSide").addClass("hide");
                            }
                        });
                    }else if(data.head.errorcode==='500'){
                        simpleDialog.alert({
                            content:HW.lang.getLocalString('abnormal_network_timeout'),
                            ok:function(){
                                $("#replaceMsgSide").addClass("hide");
                            }
                        });

                    }else{
                        simpleDialog.alert({
                            content:HW.lang.getLocalString('feedback_failedLater')
                        });
                    }
                }
                HW.Core.loadPage(option);
            })

            //hide
            $("#replaceMask,#feedReplaceClose").unbind('click').bind('click',function(){
                $("#replaceMsgSide").addClass("hide");
            })

        }






    };


    return{
        pageConfig:{
            name : 'FeedbackProduct',
            id : "feedbackProduct"
        },
        init:function(){
            _createHtmlShowData();
            _myScroll=HW.Tools._addiScroll("feedbackProductContWrapper","feedbackProductCont",0,0,0,0);
        }


    }

})();

HW.Core.addModule("FeedbackProduct",HW.FeedbackProduct);
HW.Core.loadPage("FeedbackProduct");

HW.nativeFeedbackProductId={
    nativeFeedbackIds:function(){

        var nodeId='', mid='', oPageURLParam =HW.Tools.parseURL($('base').attr('href')),
            _nodeId = nodeId || oPageURLParam['documentid'],
            _mid    = mid || oPageURLParam['mid'],
            _json   = HW.Tools.conveJson(HW.GlobalState.nativeDocumentContentId),
            content = _json.content,
            score   = _json.grade,
            option='';

        option={
            url:HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
            data:{
                "nodeId":_nodeId,
                "mid":_mid,
                "feedbackId":HW.dongFeedbackId,
                "content":content
            },
            error: ''
        }
        option.success=function(data){
            console.log(data);
            if(data.head.errorcode==='0'){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('feedback_ThankYous'),
                    ok:function(){ }
                });
            }else if(data.head.errorcode==='500'){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('abnormal_network_timeout'),
                    ok:function(){ }
                });

            }else{
                simpleDialog.alert({
                    content:HW.lang.getLocalString('feedback_failedLater'),
                    ok:function(){ }
                });
            }
        }
        HW.Core.loadPage(option);
    }
}
