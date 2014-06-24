/**
 * 我的空间，注销
 */
HW.MyZone=(function(){
    var _myScroll=null;
    var _isok=false;
    var _logoutUrl ='';
    //未登录进入空间页，直接跳转到登录页，并设置登录成功后跳转页为空间页，
    function goBack(){
        if( !HW.GlobalState.user.isSignIn){
//            HW.MenuBar.hideLeftBarClick();
            HW.GlobalState.signJumpPage="myZone.html";
            $.mobile.changePage("signIn.html",{changeHash:false});
        }
    }
    //1、设置userId值；
    function _isSignIn(){
        if(HW.GlobalState.user.isSignIn){
            HW.MyZone.pageConfig.ajaxOptions.data.userid=HW.GlobalState.user.userId;
        }
    }
    //2、注销操作，环境不同，链接不一样；
    function _setLogoutBtn(){
        var logout=$('#logout');
        if(HW.GlobalState.container=="native"){
            logout.attr('href','logout:{"url":"'+HW.GlobalState.logoutUrl+'"}');
        }else{
            logout.attr('href',HW.GlobalState.logoutUrl+'?redirect='+HW.GlobalState.redirectUrl);
        }
        logout.unbind().bind("tap",function(e){
           if(HW.GlobalState.user.isSignIn)
            simpleDialog.confirm({
                    content:HW.lang.getLocalString('myZone_js_logout'),
                    buttons:{
                        ok:function(){
                        //web环境注销
                        if(HW.GlobalState.container!="native"){
                            //真实注销
                            //alert($('#logout').attr("href"));
                            $('#logout').length && (_logoutUrl = $('#logout').attr("href"));
                            window.location.href=_logoutUrl;
                            //假注销
                            //$.mobile.loading( 'show');
                            /*HW.GlobalState.user.isSignIn=false;
                            //清除cookie中的userid
                            HW.Cookie.delCookie("uid");
                            HW.GlobalState.user.userId="";
                            HW.Tools.btnChange();
                            HW.MenuBar.hideLeftBarClick();
                            $.mobile.changePage($("#home"),{reverse:true});*/
                            }else{
                                //native注销
                                $('#logout').length && (_logoutUrl = $('#logout').attr("href"));//防止延迟双击后重定向错误
                                if(HW.GlobalState.user.isSignIn) window.location.href=_logoutUrl;
                                return false;
                            }
                        },

                        cancel:function(){
                            return false;
                        }
                    }
            });
            e.preventDefault();
            return false;
        });

    }
    //权限提升操作
    function goPrivilege(){
        var privilege=$("#privilege");
        var lang=HW.GlobalState.appConifg.currentLang;
        if(lang=="zh"){
            privilege.attr("href",HW.GlobalState.privilegeZhUrl);
        }else{
            privilege.attr("href",HW.GlobalState.privilegeEnUrl);
        }
        //与注册处理的方式一样。
        privilege.unbind().bind("click",function(e){
            //调用native接口，打开页面。或是用open方法打开一个新页面。
            simpleDialog.confirm({
                content:HW.lang.getLocalString('browserumpyou'),
                buttons:{
                    ok:function(){
                        if(HW.GlobalState.container=="native"){
                            var href=' showRegisterPage:{"url":"'+privilege.attr("href")+'"}';
                            window.location.href=href;
                        }else{
                            window.open(privilege.attr("href"));
                        }
                    },
                    cancel:function(){
                        e.preventDefault();
                        return false;
                    }
                }
            });
            //$.mobile.changePage("myPrivilege.html",{changeHash:false});
            e.preventDefault();
            return false;
        });
    }
    //我的空间返回按钮
    function _myZoneBack(){
        var myZoneBack=$("#myZone_back");
        myZoneBack.unbind().bind("click",function(e){
            $.mobile.changePage($("#home"),{reverse:true});
            e.preventDefault();
            return false;
        });
    }
    /**
     * 联接超时处理 ---不推荐使用
     * 终止请求-----显示连接超时-----显示重试按钮；
     */
    function timeout(){
        setTimeout(function(){
            if(!_isok) {
                $.mobile.loading("hide");
                simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout'),ok:function(){
                    //添加滑动
                    _myScroll=HW.Tools._addiScroll("myZoneBoxWrapper","myZoneBox",0,0,0,0);
                }});
            }
        },10000);

    };
    //超时处理
    function err(xhr, textStatus, errorThrown){
        if(textStatus=="timeout" || errorThrown=="timeout") {
            $.mobile.loading("hide");
            simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout'),ok:function(){
                // alert("联接超时");
                xhr.abort();
                //添加滑动
                _myScroll=HW.Tools._addiScroll("myZoneBoxWrapper","myZoneBox",0,0,0,0);
            }});
        }

    };


    return {
        pageConfig:{
            name:"MyZone",
            id:"myZone",
            eventType:"pageshow",
            processData:"showMyInfo" ,
            ajaxOptions:{
                url : HW.GlobalState.baseUrl+"/userinfo/userinfo/submitUserInfo.json",
                cache:false,
                data:{
                    "userid":HW.GlobalState.user.userId
                },
                error:err,
                timeout:15000
            }
        },
        init:function(){
            HW.Tools.myMenuBottom('5');
            _isSignIn();
            _setLogoutBtn();
            goPrivilege();
        },
        //显示我的信息
        showMyInfo:function(data){
            console.log(data);
            _isok=true;
            //添加滑动
            _myScroll=HW.Tools._addiScroll("myZoneBoxWrapper","myZoneBox",0,0,0,0);
            //搜索结果为空时
            if(data.body==null){
                _myScroll.refresh();
                return;
            }
            //开始显示结果
            var user=data.body.user;
            $("#myZoneName,#myZoneSex,#myZonePhone,#myZoneMail").text('');
            $("#myZoneName").text(user.name);
            $("#myZoneSex").text(user.sex);
            $("#myZonePhone").text(user.telephone);
            $("#myZoneMail").text(user.email);

        }
    };



})();
//MyZone页面；我的空间
HW.Core.addModule("MyZone",HW.MyZone);
HW.Core.loadPage("MyZone");