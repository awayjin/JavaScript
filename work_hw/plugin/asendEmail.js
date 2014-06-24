/**
 * 设置内的意见反馈功能；即通过终端发送email功能    asendEmail.html语言设置页面
 */
HW.AsendEmail = (function () {
    var _myScroll = null,_textScroll = null,_name = "",_phone = "", _mail = "",_content = "";
    //填充用户信息
    function showUserInfo() {
        if (HW.GlobalState.user.isSignIn) {
            if (!HW.GlobalState.user.userPhone || !HW.GlobalState.user.userEmail) {
                var ajaxOptions = {
                    url: HW.GlobalState.baseUrl + "/userinfo/userinfo/submitUserInfo.json",
                    cache: false,
                    data: {
                        "userid": HW.GlobalState.user.userId
                    },
                    success: function(data){
                        var user = data.body.user;
                        $("#c_UserName:hidden").val(user.name);
                        $("#c_UserPhone:hidden").val(user.telephone);
                        $("#c_UserEmail").val(user.email);
                    }
                }
                HW.Core.loadPage(ajaxOptions);
            }
            else {
                $("#c_UserName:hidden").val(HW.GlobalState.user.nativeUserid);
                $("#c_UserPhone:hidden").val(HW.GlobalState.user.userPhone);
                $("#c_UserEmail").val(HW.GlobalState.user.userEmail);
            }

        }
    }
    //表单检测，非空检测
    function checkForm(){
        var isCheck = true;
        showUserInfo();
        _content = $.trim($("#c_EmailCont").val());
        if (_content.length <= 0) {
            simpleDialog.alert({content: HW.lang.getLocalString("asendEmail_form_check")});
            isCheck = false;
            return;
        }
        return isCheck;
    }
    function err(xhr, textStatus, errorThrown){
        if (textStatus == "timeout" || errorThrown == "timeout"){
            $.mobile.loading("hide");
            xhr.abort();
            simpleDialog.confirm({
                content: HW.lang.getLocalString("asendEmail_send_fail"),
                buttons: {
                    ok: function () {
                        $.mobile.loading("show", {text: HW.lang.getLocalString("asendEmail_sendInfo"), textVisible: true });
                        HW.Core.loadPage("AsendEmail");
                    },
                    cancel: function () {
                        return;
                    }
                }
            });
        }
    };
    //提交按钮点击事件，发送邮件 将内容发送到服务端。
    function regBtnClick(){
        var sendOk = $("#sendOk");
        sendOk.unbind().bind("click", function (e) {
            if (checkForm()) {
                _mail=$("#c_UserEmail").val();
                var config = HW.AsendEmail.pageConfig;
                config.processData = "showInfo";
                config.tag = true;
                config.ajaxOptions = {
                    url: HW.GlobalState.baseUrl + "/appfeedbck/appfeedback/submitAppFeedback.json",
                    data: {
                        name: _name,
                        phone: _phone,
                        mailFrom: _mail,
                        appcontent: _content,
                        userid: ""
                    },
                    error: err
                }
                //发送请求
                $.mobile.loading("show", {text: HW.lang.getLocalString("asendEmail_sendInfo"), textVisible: true });
                HW.Core.loadPage("AsendEmail");
            }
            e.preventDefault();
            return false;
        });
    }

    function returnPageUrl(){
        if(HW.GlobalState.container=="native"){
            if(HW.GlobalState.HomePageUrl.length <= 0){
                $('#asendEmail .btn_left').attr("data-rel","back");
                $('#asendEmail .btn_left').attr("href","#");
            }else{
                $('#asendEmail .btn_left').attr("href",HW.GlobalState.HomePageUrl);
                $('#asendEmail .btn_left').removeAttr("data-rel");
            }
        }else{
            $('#asendEmail .btn_left').attr("data-rel","back");
            $('#asendEmail .btn_left').attr("href","#");
        }


    };

    return{
        pageConfig: {
            name: 'AsendEmail',
            id: "asendEmail"
        },
        init: function () {
            HW.Tools.myMenuBottom("5");
            returnPageUrl();
            showUserInfo();
            regBtnClick();
            _textScroll = new TextareaScroll("c_EmailCont");
            $(document).delegate("#asendEmail", "pageshow", function () {
                _myScroll = HW.Tools._addiScroll3("asendEmailContWrapper", "asendEmailCont", 0, 0, 0, 0);
                _myScroll.refresh();
            });
        },
        showInfo: function (data) {
            console.log(data);
            $.mobile.loading("hide");
            if (data.head.errorcode * 1 == 0) {
                simpleDialog.alert({
                    content: HW.lang.getLocalString("asendEmail_send_ok"),
                    ok: function () {
                        $.mobile.back();
                    }
                });
            } else {
                simpleDialog.alert({ content: HW.lang.getLocalString("asendEmail_send_fail") });
            }
        }
    }
})();
HW.Core.addModule("AsendEmail", HW.AsendEmail);
HW.Core.loadPage("AsendEmail");


