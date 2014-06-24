/**
 * 登录的实现
 */
HW.SignIn=(function(){
    //用户登录次数统计；
    var _count=0;
    /**
     * 1、web版时，隐藏记住密码与自动登录项
     */
    function _hideCheckBox(cls){
        if(HW.GlobalState.container !="native"){
            $("."+cls).addClass("hide");
            $("."+cls).siblings(".submitBtn").addClass("mt38");
        }
    }
    /**
     * 2、登录表单验证与用户名存储
     */
    function _checkForm(e){
        var result=false, name= $.trim($("#uid").val()),pwd=$.trim(HW.Tools._SpecialSymbols($("#password").val()));
        //错误信息
        var errName=$("#errName"),errPwd=$("#errPwd");
        //登录表单验证 ，账号与密码，验证码(取消了)
        if(name.length<1){
            simpleDialog.alert({content:HW.lang.getLocalString('nameSingd')});
            return result;
        }else if(name.length>=50){
            simpleDialog.alert({content:HW.lang.getLocalString('accountDfill')});
            return result;
        }
        if(pwd.length<1){
            simpleDialog.alert({content:HW.lang.getLocalString('passwordDenter')});
            return result;
        }else if(pwd.length>=50){
            simpleDialog.alert({content:HW.lang.getLocalString('passwordDfill')});
            return result;
        }
        result=true;
        //通过验证，存储用户名与密码，native中，提交给native进行保存；
        //web中将用户名，存储在cookie中，由于登录后会刷新整个页面，因此只能存入cookie中。
        if(result){
            //native中或登录页跳转之前使用；
            var user=HW.GlobalState.user;
            user.userId=name;
            user.userPwd=pwd;
            user.isSavePwd=$("#savepwd").is(":checked")?true:false;
            user.isAutoSignIn=$("#autoSignIn").is(":checked")?true:false;
            HW.GlobalState.user=user;
        }
        _count++;
        return result;
    };
    /**
     * 3、登录按钮，注册点击事件
     *      native中的登录流程
     *      点击登录后或是从其它页面跳转到此登录页，发送请求给native端 postReq:{}，传入url  header  body(请求的用户名与密码)
     *      native接到请求，分析josn，得到url，转发请求到HW服务器进行登录，
     *      登录返回后，再调用HW.NativeJs.postResp(json)方法处理登录情况
     *
     *      web登录
     *      (先设置要跳转的页面)，再直接提交表单登录。如果显示的页面不需要经过首页，那么可以直接进行跳转；
     */
    function _submitEvent(){
        var uGo=$("#submitBtnGo");
        uGo.unbind().bind("click",function(e){
            e.preventDefault();
            uGo.focus();
            if( _checkForm()){
                var user=HW.GlobalState.user;
                if(HW.GlobalState.container=="native"){
                    $.mobile.loading('show',{textVisible:false});
                    user.userId=encodeURIComponent(user.userId);
                    user.userPwd=encodeURIComponent(user.userPwd);
                    var href='postReq:{"url":"'+HW.GlobalState.signInUrl+HW.GlobalState.appConifg.currentLang+'" , "body":{"name":"'+user.userId+'","password":"'+user.userPwd+'","isAutoSignIn":"false"},"header":{"Content-Type":"application/x-www-form-urlencoded","Connection":"keep-alive"} }';

                    if($("#savepwd").is(":checked")){
                       localStorage.setItem("pwdRecord", encodeURIComponent($("#password").val()));
                        localStorage.setItem("idRecord", encodeURIComponent($("#uid").val()));

                    }else{
                        localStorage.setItem("pwdRecord", "");
                        localStorage.setItem("idRecord", "");
                    }

                    //确保处于连网状态。
                    if(HW.GlobalState.isInternet){
                        window.location.href=href;
                    }else{
                        simpleDialog.alert({content: HW.lang.getLocalString('siteSearchList_tips1')});
                    }
                }else{
                    //web登录
                    var actionHref=HW.GlobalState.signInUrl+HW.GlobalState.appConifg.currentLang+"&redirect="+HW.GlobalState.redirectUrl;
                    //alert(actionHref);
                    console.log(actionHref)
                    $("#uGo").attr("action",actionHref);
                    $("#uGo").submit();
                 /*   //模拟登录
                    HW.GlobalState.user.isSignIn=true;
                    //设置首页中登录按钮为我的空间
                    HW.Tools.btnChange();


                    //登录成功跳转处理
                    var toPage=HW.GlobalState.signJumpPage;
                    var backPage=HW.GlobalState.signBackPage;

                    //清空此次的跳转值。
                    HW.GlobalState.signJumpPage="";
                    HW.GlobalState.signBackPage="";

                    //登录成功后，跳转的页面。
                    if(toPage.length>0){
                        $.mobile.changePage(toPage);
                    } else if(backPage.length>0){
                        //不登录直接返回到原来的页面
                       if(/index.html/.test(backPage)){
                           HW.MenuBar.hideLeftBarClick();
                           $.mobile.changePage($("#home"),{reverse:true});
                       }else{
                           $.mobile.changePage(backPage);
                       }

                    }else{
                        HW.MenuBar.hideLeftBarClick();
                        //直接返回首页
                        $.mobile.back();
                        //$.mobile.changePage($("#home"),{reverse:true});
                    }
*/
                }
            }
            return false;
        });
    };
    /**
     *  4、注册地址
     */
    function _setRegLink(){
        var reg=$("#reg");
        reg.attr("href",HW.GlobalState.regUrl+HW.GlobalState.appConifg.currentLang);
        //注册时，提示用户将使用浏览器打开页面进行注册。
        reg.unbind().bind("click",function(e){
           //调用native接口，打开页面。或是用open方法打开一个新页面。
           simpleDialog.confirm({
               content:HW.lang.getLocalString('WillUseRegistration'),
               buttons:{
                   ok:function(){
                       if(HW.GlobalState.container=="native"){
                           var href='showRegisterPage:{"url":"'+reg.attr("href")+'"}';
                           window.location.href=href;
                       }else{
                           window.open(reg.attr("href"));
                       }
                   },
                   cancel:function(){
                       e.preventDefault();
                       return false;
                   }
               }
           });
           e.preventDefault();
           return false;
        });
    };
    //忘记密码
    function _signIn_forget_passwords(){
        var forgetP=$("#signIn_forget_passwords");
        forgetP.attr("href",HW.GlobalState.actionFlagtoGetPassword);
        //点击忘记密码时提示用户
        forgetP.unbind().bind("click",function(e){
            //调用native接口，打开页面。或是用open方法打开一个新页面。
            if(HW.GlobalState.container=="native"){
                var href='showRegisterPage:{"url":"'+forgetP.attr("href")+'"}';
                window.location.href=href;
            }else{
                window.open(forgetP.attr("href"));
            }
            e.preventDefault();
            return false;
            /*simpleDialog.confirm({
                content:HW.lang.getLocalString('WillUseForget'),
                buttons:{
                    ok:function(){
                        if(HW.GlobalState.container=="native"){
                            var href='showRegisterPage:{"url":"'+forgetP.attr("href")+'"}';
                            window.location.href=href;
                        }else{
                            window.open(forgetP.attr("href"));
                        }
                    },
                    cancel:function(){
                        e.preventDefault();
                        return false;
                    }
                }
            });
            e.preventDefault();
            return false;*/
        });
    };
    /**
     * 监控Enter键，点击enter键发送登录请求
     */
    function _regEnterEvent() {
        $('#uid').bind('keyup',function(e){
            $("#password").val('');
        });
        $("#password").unbind().bind('keydown', function(e){
            e = e || window.event;
            if (e.keyCode == 13) {
                $("#signIn_back").focus();
                $("#submitBtnGo").click();
                e.preventDefault();
                return false;
            }
        }) ;
    };
    /**
     * 复选框操作；
     * @private
     */
    function _selectCheckBox(){
        //var boxes=$("input[type='checkbox']");
        var boxes=$(".ui-checkbox label");
        var inputs= $("input[type='checkbox']");
        boxes.eq(0).unbind().bind("click",function(e){
            if(inputs.eq(0).is(":checked") && inputs.eq(1).is(":checked")){
                console.log('aaa')
                inputs.attr("checked",false).checkboxradio("refresh");
                simpleDialog.alert({
                    content:HW.lang.getLocalString('signIn_tip'),
                    ok:function(){}
                });
            }
            if( inputs.eq(0).is(":checked")){
                inputs.attr("checked",false).checkboxradio("refresh");

            } else{
                inputs.eq(0).attr("checked",true).checkboxradio("refresh");
            }

            e.preventDefault();
            return false;
        });

        boxes.eq(1).unbind().bind("click",function(e){
            if( inputs.eq(0).is(":checked")){
                null
            } else{
                inputs.eq(0).attr("checked",true).checkboxradio("refresh") ;
            }
            if( inputs.eq(1).is(":checked")){
                inputs.eq(1).attr("checked",false).checkboxradio("refresh");
                simpleDialog.alert({
                    content:HW.lang.getLocalString('signIn_tip'),
                    ok:function(){}
                });
            } else{
                inputs.eq(1).attr("checked",true).checkboxradio("refresh");
            }
            e.preventDefault();
            return false;
        });



    };
    //从其它页面跳转进来，使用返回跳转地址返回。
    //从首页进来，使用data-rel=back返回
    function _backPage(){
        var back=$("#signIn_back");
        back.unbind().bind("click",function(e){
            var isIndexForm=(HW.Tools.parseURL($("base").attr("href"))["from"]=="index") ? true:false;
            //alert(isIndexForm);
            if(!isIndexForm){

                //如果登录后要跳转的是关注页。那么返回页面则为直接返回首页，且不记入历史记录。
                if(HW.GlobalState.appConifg.jumpPage=="attention.html"){
                    //alert("返回首页");
                    $.mobile.changePage($("#home"),{changeHash:false,reverse:true});
                }else{
                    //alert("返回从跳转进来的页面");
                    if(/index\.html/.test(HW.GlobalState.signBackPage)){
                        $.mobile.changePage($("#home"),{changeHash:false,reverse:true});
                    } else{
                        $.mobile.changePage(HW.GlobalState.signBackPage,{changeHash:false,reverse:true});
                    }

                }
                HW.GlobalState.signJumpPage="";
                HW.GlobalState.signBackPage="";
                e.preventDefault();
            }
        })
    }
    //自动填入用户的密码，如果已记住，
    function writePwd(){
        try{
            var pwd=localStorage.getItem("pwdRecord");
            var id=localStorage.getItem("idRecord");
//           console.log(HW.GlobalState.user.nativeUserid);
//           console.log(HW.GlobalState.user.userId);
//            if($.os.android){
                id=decodeURIComponent(id);
                pwd=decodeURIComponent(pwd);
//            }
//            console.log('writePwd=id='+id);
//           console.log('writePwd=pwd='+pwd);

            if(id && id != 'null' && id!="undefind" && id.length>0){
                $("#uid").val(id);
            }

            if(pwd && pwd != 'null' && pwd!="undefind" && pwd.length>0){
                $("#password").val(pwd);
                $("input[type='checkbox']").eq(0).attr("checked",true).checkboxradio("refresh") ;
            }


        }catch(e){ }

    }

    function returnPageUrl(){
        if(HW.GlobalState.container=="native"){
            if(HW.GlobalState.HomePageUrl.length <= 0){
                $('#signIn_back').attr("data-rel","back");
                $('#signIn_back').attr("href","#");
            }else{
                $('#signIn_back').attr("href",HW.GlobalState.HomePageUrl);
                $('#signIn_back').removeAttr("data-rel");
            }
        }else{
            $('#signIn_back').attr("data-rel","back");
            $('#signIn_back').attr("href","#");
        }
    };

    return{
        pageConfig:{
            name : 'SignIn' ,
            id : "signIn"
        },

        init:function(){
            HW.Tools.myMenuBottom("5");
            console.log(window.location.href)
           // _hideCheckBox("auto_sign");
            returnPageUrl();
            _submitEvent();
            _setRegLink();
            _signIn_forget_passwords();
            _regEnterEvent();
            _selectCheckBox();

            _backPage();
            writePwd();
        }
    };
})();
//登录页面；
HW.Core.addModule("SignIn",HW.SignIn);
HW.Core.loadPage("SignIn");


