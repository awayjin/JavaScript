// Help.html帮助页面

HW.Help=(function(){
    var _myScroll=null;
    var _curContainer=HW.GlobalState.container;
    var _linksNum=0;
    var _isSwipe=false;
    function _IndexSwipe(){
        //添加分屏功能
        _isSwipe=true;
        var mySwipe;
        var points=$(".helpBtn a");
        var curPoint="btn_cur";

        var s=function(){
            console.log("添加分屏");
            mySwipe = new iScroll('indexSwipe1', {
                snap: true,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false,
                lockDirection:true,
                onScrollEnd: function () {
                    var index=this.currPageX;
                    var telmp=points.eq(index);
                    telmp.addClass(curPoint).siblings().removeClass(curPoint);
                }
            });
        }
        setTimeout(s,200);
    };

    function _helpToHome(){
        var helpToHome=$("#helpToHome");
        helpToHome.unbind().bind("click",function(e){
            $.mobile.changePage($("#home"),{reverse:true});
            //$.mobile.back();
            e.preventDefault();
            return false;
        })
    };
    function _helpImgHeight(){
        var dw = $(document).width(),dh = HW.Tools.getStyle($("body")[0],"height").replace(/px/g,"");;
        hOK=(dh-$(".header_page").height());
        $(".indexSwipe_wrap").css("height",hOK+'px');
    };
    $(window).resize(function(){
        _helpImgHeight();
    })
    return{
        pageConfig:{
            name : 'Help' ,
            id : "help"
        },
        init:function(){
            HW.Tools.myMenuBottom("5");
            _helpImgHeight();
            _IndexSwipe();
            _helpToHome();
            _myScroll=HW.Tools._addiScroll("help_myScroll_Wrapper","help_myScroll",0,0,0,0);
            _myScroll.refresh();
        }
    }

})();

HW.Core.addModule("Help",HW.Help);
HW.Core.loadPage("Help");
