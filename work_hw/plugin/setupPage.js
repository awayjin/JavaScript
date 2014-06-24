/**
 * SetupPage.html语言设置页面
 */
HW.SetupPage=(function(){
    var _myScroll=null;



    /**
     * 根据HW.GlobalState.appConifg中的设置，显示最终的结果
     */
    function showResult(){
        var config=HW.GlobalState.appConifg;
        var list=$("#setupPageList li");
        list.each(function(i,e){
            var li=$(e);
            if(li.attr("data-val")==config.jumpPage){
                li.addClass("selected");
                var span=li.find("span");
                span.addClass("ok-icon");
                return;
            }
        });
    }




    /**
     *  注册点击事件。更改登录后跳转页面的设置。
     */
    function regClick(){
        var SetupPage=$("#setupPage");
        SetupPage.undelegate("li","click").delegate("li","click",function(e){
            var cur=$(this);
            if(!cur.hasClass("selected")){
                cur.addClass("selected").siblings().removeClass("selected");
            }

            var span=cur.find("span");
            if(span.hasClass("ok-icon")){
                e.preventDefault();
                return false;
            }else{
                span.addClass("ok-icon");
                cur.siblings().find("span").removeClass("ok-icon");
            }
            e.preventDefault();
            return false;
        });
    }




    /**
     * 完成按钮点击事件，更新全局变量中的语言值。
     */
    function regBtnClick(){
        var SetupPage=$("#setupPage");
        SetupPage.undelegate("#btnComplete2","tap").delegate("#btnComplete2","tap",function(e){
            var pageVal=$(".selected").attr("data-val");
            //设置登录后跳转的页面
            HW.GlobalState.appConifg.jumpPage=pageVal;

            //更新native中的保存项
            var n= pageVal=="index"?0:1;
            if(HW.GlobalState.container=="native"){
                    var href='setOption:{"type":3,"status":'+n+'}';
                    window.location.href=href;
            }
             setTimeout(function(){
                     $.mobile.back();    
                        },100);
           

        });


    }




    return{
        pageConfig:{
            name : 'SetupPage' ,
            id : "setupPage"
        },
        init:function(){
            //添加滑动
            $(document).undelegate("#setupPage","pageshow").delegate("#setupPage","pageshow",function(){
                //alert("setupPage");
                showResult();
                regClick();
                regBtnClick();
                hoverBtn();
                _myScroll=HW.Tools._addiScroll("setupPageContWrapper","setupPageCont",0,0,0,0);
            });
        }


    }

})();

HW.Core.addModule("SetupPage",HW.SetupPage);
HW.Core.loadPage("SetupPage");
