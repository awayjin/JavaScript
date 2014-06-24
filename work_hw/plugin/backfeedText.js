/**
 * backfeedText.html 回复
 */
HW.BackfeedText=(function(){
    var _myScroll=null;
    //文档ID
    var _nodeId="";

    //文档类别
    var _mid="";

    var _content="";
    var _feedbackId="";




    //获取地址栏参数；
    function _getProInfo(){
        var href =  HW.Tools.parseURL($('base').attr('href'));
        _nodeId = href.documentid;
        _feedbackId=href.feedbackId;
        _mid=href.mid;
    }





    //剩余字数统计。去除头尾的空格。输入一个统计一次。
    function _regTextCount(){
        var textarea=$("#backfeedTextContTextarea");
        var textNum=$("#backfeedTextContTextareaNum");
        var len=0;
        var maxNum=1000;
        textarea.unbind().bind("keyup",function(){
            len= textarea.val().length;
            textNum.text(maxNum-len);
        });
    }




    /**
     * 联接超时处理，重新发送。
     */
    function err(xhr, textStatus, errorThrown){
        if(textStatus=="timeout" || errorThrown=="timeout") {
            // "联接超时"，重试;
            $.mobile.loading("hide");
            xhr.abort();
            simpleDialog.confirm({
                content:HW.lang.getLocalString('FailedOKresend'),
                buttons:{
                    ok:function(){
                        $.mobile.loading("show");
                        HW.Core.loadPage("BackfeedText");
                    },

                    cancel:function(){
                        return;
                    }
                }
            });
        }
    };


    //提交反馈内容
    function _submitCont(){

        var sendOk=$("#backfeedTextBtnOk");
        sendOk.unbind().bind("click",function(e){


            _content= $.trim($("#backfeedTextContTextarea").val());
            if(_content.length<=0){
                simpleDialog.alert({content:HW.lang.getLocalString('ReplyNotempty')});
                e.preventDefault();
                return false;
            }


            var config=HW.BackfeedText.pageConfig;
            config.tag=true;
            config.processData="showInfo";
            config.ajaxOptions= {
                url : HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
                data : {
                    nodeId:_nodeId,
                    content:_content,
                    feedbackId:_feedbackId,
                    mid:_mid
                },
                error:err
            }

            //发送请求
            $.mobile.loading("show");
            HW.Core.loadPage("BackfeedText");


            e.preventDefault();
            return false;


        });

    }





    return{
        pageConfig:{
            name : 'BackfeedText',
            id : "backfeedText"
        },
        init:function(){
             _getProInfo();
            //_regTextCount();
            _submitCont();
            hoverBtn();
            new TextareaScroll("backfeedTextContTextarea");
            //添加滑动
            $(document).undelegate("#backfeedText","pageshow").delegate("#backfeedText","pageshow",function(){
                _myScroll=HW.Tools._addiScroll3("backfeedTextContWrapper","backfeedTextCont",0,0,0,0);
            });

        },

        //回复成功返回列表页。
        showInfo:function(data){
            console.log(data);
            $.mobile.loading("hide");
            if(data.head.errorcode*1 ==0){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('ReplyTosuccess'),
                    ok:function(){
                        $("#backfeedTextContTextarea").val("");
                        $.mobile.back();
                    }
                });
            }else{
                 simpleDialog.alert({ content:HW.lang.getLocalString('backfeedProductFail')});
            }
        }

    }

})();

HW.Core.addModule("BackfeedText",HW.BackfeedText);
HW.Core.loadPage("BackfeedText");
