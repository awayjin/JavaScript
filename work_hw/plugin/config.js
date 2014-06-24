/**
 * config.html设置页面
 */
HW.Config=(function(){
     var _myScroll=null;

    //根据HW.GlobalState.appConifg中的内容，显示最终的结果
    function showResult(){
        var config=HW.GlobalState.appConifg;
        if(config.currentLang=="zh"){
            $("#config_lang").text(HW.lang.getLocalString("config_header_lang_zh"));
        }else{
            $("#config_lang").text(HW.lang.getLocalString("config_header_lang_en"));
        }

        if(config.isWifiDownloaded){
            $("#config_wifi").addClass("onActive");
        }else{
            $("#config_wifi").removeClass("onActive");
        }

        //发送日志设置
        if(config.isSendLog){
            $("#config_sendLog").addClass("onActive");
        }else{
            $("#config_sendLog").removeClass("onActive");
        }
    }

    //web  隐藏native项
    function hideCont(){
      if(HW.GlobalState.container!="native"){
         //$(".config_H,.isUpdateNav").remove();
         $(".config_H").remove();
      }
    }

    //语言设置
    function regLangSet(){
        var langLink=$("#config_lang_link");
        langLink.unbind().bind("tap",function(e){
            e.preventDefault();
            $.mobile.changePage("setuplanguage.html",{changeHash:false});
            return false;
        });
    }

    // native 发送日志与wifi 点击事件
    function regClick(){
       // if(HW.GlobalState.container!=="native"){
            var configBox=$("#configBox");
            //日志设置
            configBox.undelegate("#config_sendLog","tap").delegate("#config_sendLog","tap",function(e){
                var log=$("#config_sendLog");
                var logVal=false;
                if(!log.hasClass("onActive")){
                    log.addClass("onActive");
                    logVal=true;
                }else{
                    log.removeClass("onActive");
                }
                //状态发生变化，发送请求到native中更新设置；
                //ios使用此内容。
                if(HW.GlobalState.appConifg.isSendLog!=logVal){
                    HW.GlobalState.appConifg.isSendLog=logVal;
                    var n=logVal?0:1;
                    var href= 'setOption:{"type":1,"status":'+n+'}';
                    console.log(href);
                    window.location.href =href;
                }

                e.preventDefault();
                return false;
            });

            //wifi设置
            configBox.undelegate("#config_wifi","tap").delegate("#config_wifi","tap",function(e){
                var wifi=$("#config_wifi");
                var wifiVal=false;
                if(!wifi.hasClass("onActive")){
                    wifi.addClass("onActive");
                    wifiVal=true;
                }else{
                    wifi.removeClass("onActive");
                }

                //状态发生变化，发送请求到native中更新设置；
                //ios使用此内容。
                if(HW.GlobalState.appConifg.isWifiDownloaded!=wifiVal){
                    HW.GlobalState.appConifg.isWifiDownloaded=wifiVal;
                    var n=wifiVal?0:1;
                    var href='setOption:{"type":2,"status":'+n+'}';
                    //console.log(href);
                    window.location.href =href;
                }

                e.preventDefault();
                return false;
            });
       // }
    }


    //native 检测更新
    function checkUpdate(){
        if(HW.GlobalState.container=="native"){
            var configBox=$("#configBox");
            configBox.undelegate("#isUpdate","tap").delegate("#isUpdate","tap",function(e){
                //alert("checkUpdate");
                var href="checkUpdate:";
                window.location.href=href;
                e.preventDefault();
                return false;
            });
        }
    }
    //IOS隐藏更新选项
    function iosUpdate(){
        if($.os.ios){
            $("#isUpdate").parents("li").remove();
        };
    }


    //进入帮助页
    function goHelpPage(){
        var helpPage=$("#goHelpPage");
        helpPage.unbind().bind("click",function(e){
            $.mobile.changePage("help.html",{changeHash:false});
            e.preventDefault();
            return false;
        });
    }

    function returnPageUrl(){
        if(HW.GlobalState.container=="native"){
            if(HW.GlobalState.HomePageUrl.length <= 0){
                $('#configBox .btn_left').attr("data-rel","back");
                $('#configBox .btn_left').attr("href","#");
            }else{
                $('#configBox .btn_left').attr("href",HW.GlobalState.HomePageUrl);
                $('#configBox .btn_left').removeAttr("data-rel");
            }
        }else{
            $('#configBox .btn_left').attr("data-rel","back");
            $('#configBox .btn_left').attr("href","#");
        }


    };


    return{
        pageConfig:{
            name : 'Config' ,
            id : "configBox"
        },
        init:function(){
            HW.Tools.myMenuBottom(1);
            returnPageUrl();
            showResult();
            hideCont();
            regClick();
            checkUpdate();
            iosUpdate();
            _myScroll=HW.Tools._addiScroll("configBoxContWrapper","configBoxCont",0,0,0,0);
            _myScroll.refresh();

        }


    }

})();

HW.Core.addModule("Config",HW.Config);
HW.Core.loadPage("Config");
