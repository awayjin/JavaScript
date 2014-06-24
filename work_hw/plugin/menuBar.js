/*
* 侧边栏菜单，一开始就在，只是它隐藏主要内容的下面。将主要内容移开一点距离。就能将菜单显示出来。
 */
HW.MenuBar=(function(){
    //是否已显菜单；
    var _isShow=false;

    //menu菜单是否已加滑动；
    var _isAdd=false;

    //触摸时的起始水平位置
    var _x=0;

    //触摸结束事件时位移的距离
    var _moveX=0;

    var _myScroll=null;


    //收藏对话框是否已弹出
    var _isDialogShow=false;

    var _isMove=false;


    //产品文档页时记住产品名称，进入产品内容页时，附加在其前面
    var docName="";




    //显示菜单
    function _showMenu(){
        //先隐藏联想下拉列表
        $(".ac_results").hide();

        //收藏页面，移除收藏项
        var lastLi=$("#menuListUl li").last();
        if( /myFavorites.html/.test($("base").attr("href")) ){
            lastLi.hide();
            _myScroll.refresh();
        }else{
            lastLi.show();
        }


        //先更改menu的display状态。
        var menu=$("#menu");

        menu.focus();
        //登录页中的密码框焦点处理

        if($("#signIn").length>0){
            $(":password").blur();
        }




        menu.show();


        //显示menu菜单，将mainBg左移，即可。
        var curPage=$(':jqmData(role="page")');
        curPage.addClass("mainBg").addClass("to-on").removeClass("off");

        //更新样式，动画结束，保持打开状态；
        setTimeout(function(){
            curPage.addClass("on").removeClass("to-on");
            //刷新滑动。
            _myScroll.refresh();
            _isShow=true;
         } ,150);

        //高亮效果
        if (HW.GlobalState.container == "native") {
            $('.left-nav li').bind('tap taphold',function(){
                $(this).addClass("bgHov");
                var oThis= $(this);
                setTimeout(function(){
                    oThis.removeClass("bgHov");
                },300)
            })
        }



    };




    //隐藏菜单
    function _hideMenu(){
        if(_isShow){
            $(".ac_results").hide();
            $("#menu").focus();
            //隐藏menu菜单，将mainBg移回来。
            var curPage=$(':jqmData(role="page")');
            curPage.addClass("to-off").removeClass("on");


            //更新样式，动画结束，保持关闭状态；
            setTimeout(function(){
                //隐藏menu菜单
                curPage.addClass("off").removeClass("to-off");
                var menu=$("#menu");
                menu.css({"z-index":"0"});
                menu.hide();
                _isShow=false;
            } ,200);

        }
    };


    //立即隐藏菜单
    function _hideMenuNow(){
        if(_isShow){
            //alert("隐藏菜单");
            var curPage=$(':jqmData(role="page")');
            curPage.addClass("off").removeClass("on");
            _isShow=false;

            var menu=$("#menu");
            menu.css({"z-index":"0"});
            menu.hide();
        }
    };




    //touchstart事件时，初始化值
    function _start(e){
       if (e.touches.length==0){return; }
        var t= e.touches[0];
        _x=t.pageX;
       // e.preventDefault();
    } ;


    //touchmove事件时，得到移动的水平距离。判断是向左还是向右，如果向右，则显示菜单 ，向左隐藏；
    function _move(e){

        if (e.touches.length==0){return; }



        var t= e.touches[0];
         _moveX= t.pageX;

        //是移动，才起作用。
        if(_moveX!=_x){
            _isMove=true;
        }


        //e.preventDefault();
        //return false;
    };

    //划动结束时
     function _endMenu(e){
         //默认移动80px 即认为是划动。
         if(!_isMove){return false;}
         var xLength=120;
         //ipad 移动180px，才认为是划动

         if($.os.ipad){
             xLength=200;
         }

         //console.log("向右");
         if(_x<_moveX){
             if(Math.abs(_x-_moveX)>=xLength){
                 _showMenu();
             }
         }


         //console.log("向左");
         if(_x> _moveX){
             if(Math.abs(_x-_moveX) >= (xLength-50) ){
                 _hideMenu();
             }
         }
         _isMove=false;

         e.preventDefault();
         return false;
     }




    //添加收藏
    function jumpPageTest(){

        //web中移除收藏功能，改变首页href地址。
        if(HW.GlobalState.container!="native"){
            $("#scLinkPage").remove();
            if(/\/page\//.test($("base").attr("href"))){
                $("#menuListUl li").eq(0).attr("href","../index.html");
            }

        }


        $("#scLinkPage").unbind().bind("click",function(e){
            //先隐藏菜单
            HW.MenuBar.hideLeftBarClick();

           //对话框已显示，则退出。不可重复显示。
            //alert(_isDialogShow);
            if(_isDialogShow){return;}

            _isDialogShow=true;
            //页面地址：app为本地地址
            var href= $("base").attr("href");
            //alert(href);




            //页面名称处理。按页面分情况处理
            var pageName=HW.lang.getLocalString('NoName');

            //产品文档
            //productSupport.html
            if(/productSupport.html/.test(href)){
                pageName=$("#curname").text();
            }

            //doc.html
            if(/doc.html/.test(href)){
                pageName=$("#pro_name").text();
                docName=pageName;
            }

            //docDir.html 目录页的名称应该是这个名称。
            if(/docDir.html/.test(href)){
                //pageName=$("#dir_directory").text();
                pageName=$("#list_dir li").eq(0).text();
            }

            //docContent.html
            if(/docContent.html/.test(href)){
                pageName=docName+$(".header").eq(1).find("h1").text();
            }





            //知识库
            //knowledge.html
            if(/knowledge.html/.test(href)){
                pageName=$("#kcurname").text();
            }

            //caseLibrary.html
            if(/caseLibrary.html/.test(href)){
                pageName=$("#case_name").text();
            }

            //caseContent.html
            if(/caseContent.html/.test(href)){
                pageName=$("#case_name").text();
            }





            //我的关注
            //attention.html
            if(/attention.html/.test(href)){
                pageName=$(".header").eq(1).find("h1").text();
            }

            //attentionSet.html
            if(/attentionSet.html/.test(href)){
                pageName=$("#acurname").text();
            }


            //命令查询
            //orderSearch.html
            if(/orderSearch.html/.test(href)){
                pageName=$("#order_search_title").text();
            }

            //orderSearchDetail.html
            if(/orderSearchDetail.html/.test(href)){
                pageName=$(".header").eq(1).find("h1").text();
            }

            //告警查询
            //warningSearch.html
            if(/warningSearch.html/.test(href)){
                pageName=$("#warning_search_title").text();
            }

            //warningSearchDetail
            if(/warningSearchDetail.html/.test(href)){
                pageName=$(".header").eq(1).find("h1").text();
            }


            //下载管理，我的收藏 ， 联系华为，选择国家  ，发送邮件
            //downloadManager.html
            if(/downloadManager.html/.test(href) ||
                /myFavorites.html/.test(href) ||
                /contactHW.html/.test(href) ||
                /country.html/.test(href) ||
                /sendEmail.html/.test(href)
                ){
                pageName=$(".header").eq(1).find("h1").text();
                //alert(pageName);
            }

            //公告，资料直通车，设置，意见反馈，登录，注册
            if(/bulletin/.test(href)  ||
                /dataDirect.html/.test(href)   ||
                /dataDirectBox.html/.test(href)  ||
                /config.html/.test(href)   ||
                /setuplanguage.html/.test(href)  ||
                /setupPage.html/.test(href)   ||
                /asendEmail.html/.test(href)   ||
                /about.html/.test(href)   ||
                /help.html/.test(href)  ||
                /backfeedProduct.html/.test(href)  ||
                /feedbackProduct.html/.test(href)  ||
                /backfeedText.html/.test(href) ||
                /myZone.html/.test(href) ||
                /myApplyFor.html/.test(href) ||
                /myToDo.html/.test(href) ||
                /signIn.html/.test(href) ||
                /reg.html/.test(href) ||
                /siteSearchList.html/.test(href)
                ){
                pageName=$(".header").eq(1).find("h1").text();
            }



            //alert(href);
            //alert(pageName);
            //simpleDialog.confirm({content:HW.lang.getLocalString('AddMyFavorites'),
            //HW.lang.getLocalString('bookmarkPage')+'<br />'+

            var htmlcont=HW.lang.getLocalString('bookmarkEnterPageName')+'：<input  id="favoritePageName" name="favoritePageName" type="text"  value="'+pageName+'" >'
            //simpleDialog.setCenter($("#dialogBoxWindow"));
            //simpleDialog.destroy();
            simpleDialog.confirm({content:htmlcont,
                buttons:{
                    ok:function(){
                        _isDialogShow=false;
                        var pName="";
                        pName= $.trim($("#favoritePageName").val());
                        if(pName.length<=0){
                            pName=HW.lang.getLocalString('NoName');
                        }
                        //console.log("收藏页面的名称"+pName);
                        window.location.href='addFavoritePage:{"name":"'+pName+'", "url":"'+
                            HW.Tools.reEncondeURIComponent(href)+'"}' ;
                    },
                    cancel:function(){
                        _isDialogShow=false;
                    }
                }
            });

            //pageName="";

            e.preventDefault();
            return false;
        });
    }

    //我的关注处理
    function regEventAttentionClick(){

        var gz=$("#attentionLink2");
        gz.unbind().bind("click",function(e){
            e.preventDefault();

            //发生点击操作时隐藏侧边栏
            HW.MenuBar.hideLeftBarClick();
            if(!HW.GlobalState.user.isSignIn){
                var href=$("base").attr("href");
                //alert(href);
                //alert((/signIn.html/.test(href)));

                //如果当前页为登录页，则直接隐藏侧边栏，提示请先登录。
                if(/signIn.html/.test(href) ){
                    //alert("当前页为登录页");
                    simpleDialog.alert({content:HW.lang.getLocalString('attention2LoginInfo')});
                }else{
                     //提示将跳转到登录页面。
                    simpleDialog.confirm({content:HW.lang.getLocalString('attention2LoginInfo'),
                        buttons:{
                            ok:function(){
                                HW.GlobalState.signJumpPage="attention.html";
                                HW.GlobalState.signBackPage=href;
                                HW.MenuBar.hideLeftBarClick();
                                $.mobile.changePage("signIn.html",{changeHash:false});
                            },
                            cancel:function(){ }
                        }
                    });
                }
            }else{
                $.mobile.changePage("attention.html");
            }

            return false;
        });

    };

    //搜索处理，如果是在搜索页，则只隐藏菜单
    function regGlobalSearch(){
        var globalSearch=$("#globalSearch");
        globalSearch.unbind().bind("click",function(e){
           var href=$("base").attr("href");
           if(/siteSearchList.html/.test(href)){
               HW.MenuBar.hideLeftBarClick();
               e.preventDefault();
               return false;
           }
        });
    }


    return{
        name:"MenuBar",
        regEvent:function(pageId){
            console.log("添加侧边栏菜单---------------------------------------");
            //web版中没有此功能；
            //if(HW.GlobalState.container !="native"){return;}


           //由于页面是动态载入的，因此需要先尝试解绑后，再进行注册事件
            var pageObj=document.getElementById(pageId);
            if(pageObj){

                pageObj.removeEventListener("touchstart",_start);
                pageObj.removeEventListener("touchmove",_move);
                pageObj.removeEventListener("touchend",_endMenu);

                pageObj.addEventListener("touchstart",_start , false);
                pageObj.addEventListener("touchmove",_move , false);
                pageObj.addEventListener("touchend",_endMenu , false);
            }

            //更新收藏页的地址
            jumpPageTest();

            //我的关注处理
            regEventAttentionClick();

            //全站搜索处理
            regGlobalSearch();

        },


       //点击时立即隐藏侧边栏菜单
        hideLeftBarClick:function(){
            //alert("立即隐藏菜单");
            _hideMenuNow();
        },


        //添加滑动，只需，添加一次。
         _addiScroll:function(){
             if(_isAdd) {return;}
             //添加滑动；
             _myScroll=HW.Tools._addiScroll("menuList","menuListUl",{hScrollbar:false, vScrollbar:false});
             _isAdd=true;
         }
    }
})();



$(function(){

    //屏蔽js错误
    //window.onerror=function(){return true;}

    //添加滑动菜单功能；
    HW.MenuBar._addiScroll();

    //隐藏侧边栏菜单
    $(document).bind("click",function(e){
        //发生点击操作时上一页时隐藏菊花
        $.mobile.loading('hide');

        //发生点击操作时隐藏侧边栏
        HW.MenuBar.hideLeftBarClick();

    });

});
