/**
 * backfeedProduct.html 产品文档意见反馈
 */
HW.BackfeedProduct=(function(){
    var _myScroll=null;
    //文档ID。
    var _nodeId="";

    //文档类别
    var _mid="";

    var _content="";
    var _solved=0;
    var _score=1;

     //登录后，才能提交反馈
    function _isSign(){
        var backfeedProductIsSign=$("#backfeedProductIsSign");
        var a=$("#backfeedProductIsSign a");
        if(HW.GlobalState.user.isSignIn){
            //alert("已登录");
            backfeedProductIsSign.hide();
            $("#backfeedProOk").removeAttr("disabled").removeClass("submited");
        }

        //登录跳转处理
        a.unbind().bind("click", function (e) {
             e.preventDefault();
             // alert("登录");
             HW.GlobalState.signJumpPage= $("base").attr("href");
             HW.GlobalState.signBackPage=$("base").attr("href");
             $.mobile.changePage("signIn.html",{changeHash:false});
             return false;

        });
    }





    //进入最近反馈的链接   同时获取产品ID与产品类别；
    function _getProInfo(){
        var href =  HW.Tools.parseURL($('base').attr('href'));
        _nodeId = href.documentid;
        _mid=href.mid;

        $('#backfeedProList').attr('href','feedbackProduct.html?documentid=' + _nodeId+'&mid='+_mid);
    }

     //星星选项
    function _regStar(){
        var  stars=$("#backfeedProStar").find("span");
        var len=stars.length;
        stars.unbind().bind("click",function(e){
           // alert("你点了星星");

            var cur=$(this);
            var index=stars.index(cur);
            //alert(index);


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

    //解决问题选项
    function _regRadio(){
        var radios=$("#backfeedProRadio").find(".radio-box");
        radios.unbind().bind("click",function(){
            var index=radios.index($(this));
            $.each(radios,function(i,e){
               if(i==index){
                   $(e).addClass("cur");
               }else{
                   $(e).removeClass("cur");
               }
            });

        });
    }

    //剩余字数统计。去除头尾的空格。输入一个统计一次。
    function _regTextCount(){
        var backfeedProCont=$("#backfeedProCont");
        var backfeedProTextCont=$("#backfeedProTextCont");
        var len=0;
        var maxNum=1000;
        backfeedProCont.unbind().bind("keyup",function(e){
             len= backfeedProCont.val().length;
            if(len=maxNum){
                backfeedProTextCont.text(0);
                e.preventDefault();
                return false
            }else if(len<maxNum){
                backfeedProTextCont.text(maxNum-len);
            }else{
                backfeedProTextCont.text(0);
                e.preventDefault();
                return false
            }

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
                        HW.Core.loadPage("BackfeedProduct");
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

        var sendOk=$("#backfeedProOk");
        sendOk.unbind().bind("click",function(e){
            e.preventDefault();

            $("#backfeedProBack").focus();
             //没登录，就不给提交。
            if(!HW.GlobalState.user.isSignIn){
                return false;
            }

            //提交信息前，收集提交内容数据。评分，是否解决问题
            _content= $.trim($("#backfeedProCont").val());
            if(_content.length<=0){
                simpleDialog.alert({content:HW.lang.getLocalString('OpinionNoempty')});
                return false;
            }

            _score=$("#backfeedProStar").find(".on").length;
            if(_score==0){
                simpleDialog.alert({content:HW.lang.getLocalString('PleaseRateArticle')});
                return false;
            }

            //_score= (_score==0) ? 1 : _score;
            //alert(_score);

            var radios=$("#backfeedProRadio").find(".radio-box");
            var cur=$("#backfeedProRadio").find(".cur");
            _solved=radios.index(cur);
            if(_solved==0){
                _solved==1;
            }else{
                _solved==0;
            }




        var config=HW.BackfeedProduct.pageConfig;
        config.tag=true;
        config.processData="showInfo";
        config.ajaxOptions= {
            url : HW.GlobalState.baseUrl+"/feedback/feedback/submitFeedback.json",
            data : {
                nodeId:_nodeId,
                mid:_mid,
                score:_score,
                solved:_solved,
                content:_content
            },
            error:err
        }

        //发送请求
        $.mobile.loading("show");
        HW.Core.loadPage("BackfeedProduct");
        return false;
        });

    }





    return{
        pageConfig:{
            name : 'BackfeedProduct',
            id : "backfeedProduct"
        },
        init:function(){
            //_isSign();
            _getProInfo();
            _regStar();
            _regRadio();
            //_regTextCount();
            _submitCont();
            hoverBtn();
            new TextareaScroll("backfeedProCont");
            //添加滑动
/*            setTimeout(function(){
                _myScroll=HW.Tools._addiScroll3("backfeedProductContWrapper","backfeedProductCont",0,0,0,0);
            },350);*/

            //添加滑动
            $(document).undelegate("#backfeedProduct","pageshow").delegate("#backfeedProduct","pageshow",function(){
                _myScroll=HW.Tools._addiScroll3("backfeedProductContWrapper","backfeedProductCont",0,0,0,0);
            });


        },

        //显示成功信息
        showInfo:function(data){

            console.log(data);
            $.mobile.loading("hide");
            if(data.head.errorcode*1 ==0){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('SubmitSuccess'),
                    ok:function(){
                        //重置意见反馈选项。
                        $("#backfeedProCont").val("");
                        $("#backfeedProTextCont").text("1000");
                        $("#backfeedProStar span").removeClass("on");
                        $('#backfeedProRadio span').eq(0).addClass("cur");
                        $('#backfeedProRadio span').eq(1).removeClass("cur");
                    }
                });
            }else{
                simpleDialog.alert({ content:HW.lang.getLocalString('backfeedProductFail')});
            }
        }

    }

})();

HW.Core.addModule("BackfeedProduct",HW.BackfeedProduct);
HW.Core.loadPage("BackfeedProduct");
