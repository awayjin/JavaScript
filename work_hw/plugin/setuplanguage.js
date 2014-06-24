/**
 * setuplanguage.html语言设置页面
 */
HW.SetupLanguage=(function(){
    var _myScroll=null;



    /**
     * 根据HW.GlobalState.appConifg中的设置，显示最终的结果
     */
    function showResult(){
        var config=HW.GlobalState.appConifg;
        var list=$("#langList li");
        $.each(list,function(i,e){
           console.log(e);
            var li=$(e);
            if(li.attr("data-val")==config.currentLang){
                li.addClass("selected");
                var span=li.find("span");
                span.addClass("ok-icon");
                return;
            }
        });

    }




    /**
     *  更改语言设置。
     */
    function regClick(){
        var setupLanguage=$("#setupLanguage");
        setupLanguage.undelegate("li","click").delegate("li","click",function(e){
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

     /*
     * 中英切换
     * */
    function switchLangE(jq){
        try{
            var sLang = HW.lang.getCurrentLang(),
                $langLink = $('#lang_link'),
                len = $langLink.length,
                $lastLink = $('link').last();
            switch (sLang){
                case 'en': //样式不存，追加最后
                    if(!len)
                        $lastLink.after('<link rel="stylesheet" id="lang_link" href="../skin/default/css/'+
                            sLang+'_styleall.css" />');
                    break;
                case 'zh': //en存在则删除
                    if(len) $langLink.remove();
                    break;
            }
        }
        catch (e){

        }
    };

    /**
     * 完成按钮点击事件，更新全局变量中的语言值。
     */
    function regBtnClick(){
        var setupLanguage=$("#setupLanguage");
        setupLanguage.undelegate("#btnComplete","tap").delegate("#btnComplete","tap",function(e){

            var langVal=$(".selected").attr("data-val");
            var curLang= HW.GlobalState.appConifg.currentLang;

            if(curLang!=langVal){
                //开始切换语言项
                $.mobile.loading("show");
                HW.GlobalState.appConifg.currentLang=langVal;
                switchLangE($);
                HW.lang.replaceLocalString();
                //更新native中的保存项
                 if(HW.GlobalState.container=="native"){
                     window.location.href ='setLanguage:{"locale":"'+langVal+'"}';
                     switchLangE($);
                }
            }

            //alert("返回config.html");
            setTimeout(function(){
                       $.mobile.back();
                       },100);

        });


    }




    return{
        pageConfig:{
            name : 'SetupLanguage' ,
            id : "setupLanguage"
        },
        init:function(){
            HW.Tools.myMenuBottom('1');
            //添加滑动
            $(document).undelegate("#setupLanguage","pageshow").delegate("#setupLanguage","pageshow",function(){
                regClick();
                regBtnClick();
                showResult();
                _myScroll=HW.Tools._addiScroll("setupLanguageContWrapper","setupLanguageCont",0,0,0,0);
            });

        }

    }

})();

HW.Core.addModule("SetupLanguage",HW.SetupLanguage);
HW.Core.loadPage("SetupLanguage");
