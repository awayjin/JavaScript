/**
 * 工具
 */
HW.toolsMake=(function(){
    var _myScroller = null;
    //页面处理
    function _myToolsPage(){
       _myScroller = HW.Tools._addiScroll('toolsMakeDataBox_data_wapper','toolsMakeDataBox',0,0,0,0);
    };
    //未登录----跳转到登录页
    function _regEventAttentionClick(){
        var gz=$("#selIcon").add($('#gjxIcon'));
        gz.bind("click",function(e){
            var target= e.target, pageClass,pageName='',$target;
            //$target = target.tagName.toLowerCase() !== 'span' ? $(target).closest('span') : $(target);
            if(target.tagName.toLowerCase() !== 'a'){
                $target=$(target).closest('a')
            }else{
                $target=$(target)
            }
            pageClass = $target.attr("class").split(/\s+/)[0];
            switch(pageClass){
                case "sel-icon":
                    pageName = "orderSearch.html";
                    break;
                case "gjx-icon":
                    pageName = "warningSearch.html";
                    break;
            }
            if(!HW.GlobalState.user.isSignIn){
                HW.GlobalState.signJumpPage=pageName;
                HW.GlobalState.signBackPage="../index.html";
                $.mobile.changePage("signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }else{
                $.mobile.changePage(pageName);
            }
        });
    };
    //侧栏
    function _mySidebarAll($id1,$id2,$id3,elm){
        //$id1 左边ID / $id2 侧栏ID / $id3 按钮ID
        var sidebar_left=$("#"+$id1),sidebar_right=$("#"+$id2),sidebar_btn=$("#"+$id3);
        function _mySwipeleft(){
            HW.Tools.myMenuBottom('5');
            sidebar_left.removeClass("scroller-hide").addClass("scroller");
            sidebar_right.removeClass("hide").addClass("leftAbso left2");
            $("#page_maskT").removeClass("hide");
        }
        function _mySwiperight(){
            HW.Tools.myMenuBottom('1');
            sidebar_left.removeClass("scroller").addClass("scroller-hide");
            sidebar_right.addClass("hide").removeClass("leftAbso left2");
            $("#page_maskT").addClass("hide");
        }
        sidebar_btn.unbind("click").bind("click swiperight",function(oEnt){
            oEnt.stopPropagation();
            if(sidebar_right.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        $("#page_maskT").click(function(){
            _mySwiperight();
            _myScroller.refresh();
        })
        sidebar_left.unbind("click").bind("click",function(oEnt){
            var oE=$(oEnt.target);
            if(oE.attr("class")!=elm && !oE.parent("."+elm).length){
                sidebar_right.addClass("hide").removeClass("leftAbso left2");
                sidebar_left.removeClass("scroller");
            }
        });
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
    function _regEventAttentionClickmy(){
        var gz=$("#attentionLinks");
        gz.bind("click",function(e){
            if(!HW.GlobalState.user.isSignIn){
                HW.GlobalState.signJumpPage="myAttention.html";
                HW.GlobalState.signBackPage="toolsMake.html";
                $.mobile.changePage("signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }else{
                $.mobile.changePage("myAttention.html");
            }
        });
    };
    return{
        pageConfig:{
            name : 'toolsMake' ,
            id : "toolsMake"
        },
        init:function(){
            _myBtnChangeZoom();
            HW.Tools.myMenuBottom('1');
            _myToolsPage();
            _regEventAttentionClick();
            _regEventAttentionClickmy();
            //_mySidebarAll("tool_left_Sidebar","tool_right_Sidebar","tool_bulAAs","cePage");
           HW.Tools.mySidebarAll("tool_left_Sidebar","tool_right_Sidebar","tool_bulAAs",'cePage',"page_maskT");

        }
    }
})();
HW.Core.addModule("toolsMake",HW.toolsMake);
HW.Core.loadPage("toolsMake");
