/**
 * Created with JetBrains WebStorm.
 * User: issuser
 * Date: 14-3-27
 * Time: 下午4:07
 * To change this template use File | Settings | File Templates.
 */

HW.His = (function(){
    var myScroller = null;

    function _delegateContentShow(num){
        var oLocalStorage = "";
        //0是产品，1是案例
        switch(num){
            case 0:
                oLocalStorage = HW.Tools.getLocalStorage(HW.GlobalState.setDocListHistory);
                break;
            case 1:
                oLocalStorage = HW.Tools.getLocalStorage(HW.GlobalState.setCaseListHistory);
                break;
        }

        $("#list-history").removeClass("hide");
        $(".no-history").addClass("hide");
        $("#reg").removeClass("hide");

        if(!!oLocalStorage){
            var str = "";
            oLocalStorage = oLocalStorage.reverse();
            for(var i = 0,l = oLocalStorage.length; i < l; i++){
                str += '<li>';
                str += '<a href='+oLocalStorage[i].url+'>';
                str += oLocalStorage[i].documentname;
                str += '</a>';
                str += '</li>';
            }

            $("#hisBoxContWrapper .list-history").html(str);

            if(myScroller != null){
                myScroller.destroy();
                myScroller = null;
            }
            setTimeout(function(){
                myScroller = HW.Tools._addiScroll('hisBoxContWrapper','list-history',0,0,0,0);
            },1);

        }else{
            noDataMessage();
        }
    };

    function noDataMessage(){
        $("#list-history").addClass("hide");
        $(".no-history").removeClass("hide");
        $("#reg").addClass("hide");

        var divHeighe = Math.floor(HW.Tools.getStyle($("body")[0],"height").replace(/px/g,""));
        var topHeight = Math.ceil(HW.Tools.getStyle($("#hisBoxContWrapper")[0],"top").replace(/px/g,""));
        var bottomHeight = Math.ceil(HW.Tools.getStyle($("#hisBoxContWrapper")[0],"bottom").replace(/px/g,""));

        var height = divHeighe - topHeight - bottomHeight;
        $(".no-history").css("height",height + "px");

        if(myScroller != null){
            myScroller.destroy();
            myScroller = null;
        }
    };

    function _myEventChangeData(){
        $("#historyType a").unbind().bind("click",function(){
            var thisAttr=$(this).attr("data-val");
            $(this).addClass("active").siblings("a").removeClass("active")
            $("#hisBoxContWrapper .list-history").html("");
            if(thisAttr==0){
                _delegateContentShow(0);
            }else if(thisAttr==1){
                _delegateContentShow(1);
            }
            /*if(HW.GlobalState.user.isSignIn){
                if(thisAttr==0){
                    _delegateContentShow(0);
                }else if(thisAttr==1){
                    _delegateContentShow(1);
                }
            }else{
                noDataMessage();
            }*/
        })
    }

    function cleanBtn(){
        $("#reg").unbind().bind("click",function(){
            $("#historyType").find("a").each(function(){
                if($(this).hasClass("active")){
                    var num = parseInt($(this).attr("data-val"),10);
                    var setName = "";
                    switch(num){
                        case 0:
                            setName = HW.GlobalState.setDocListHistory
                            break;
                        case 1:
                            setName = HW.GlobalState.setCaseListHistory
                            break;
                    }
                    if(!!setName){
                        var obj = HW.Tools.getLocalStorage(setName);

                        if(!!obj){
                            simpleDialog.confirm({
                                content: HW.lang.getLocalString('history_del_record'),
                                buttons:{
                                    ok: function(){
                                        localStorage.removeItem(setName);
                                        noDataMessage();
                                    },
                                    cancel: function(){

                                    }
                                }
                            });
                        }else{
                            return false;
                        }

                    }
                    return false;
                }
            });
        });
    };

    return {
        pageConfig:{
            name : 'His' ,
            id : "his"
        },
        init:function(){
            HW.Tools.myMenuBottom("1");
            _myEventChangeData();
            cleanBtn();
            _delegateContentShow(0);
            /*if(HW.GlobalState.user.isSignIn){
                _delegateContentShow(0);
            }else{
                noDataMessage();
            }*/
        }
    }
})();


HW.Core.addModule("His",HW.His);
HW.Core.loadPage("His");

