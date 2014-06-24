/**
 * @author liutt
 */
HW.SendEmail = (function(){
    var myScroller = null;
	//获取用户信息
	var _getuserInof = function() {
		location.href = HW.Contacts.RequestStrings.Other.RQSTR_GETUSERINFO;
	}
	//发送
	var _sendBtnClick = function(){
		var content = $("#emailContent").val();
		if(content.length <= 0){
            simpleDialog.alert({content:HW.lang.getLocalString('sendEmail_js_empty_context')});
			return;
		}		
		$.mobile.showPageLoadingMsg();
		var json = {
			mobile:$("#userMobile").text(),
			fromemail:$("#userEmail").text(),
			toemail:$("#serverEmails").text(),
			emailContent:content,
			sender:$("#userName").text()
		};

		location.href = HW.Contacts.RequestStrings.Other.RQSTR_SENDEMAIL +  HW.Tools.reEncondeURIComponent($.toJSON(json));
	}
	//初始化界面元素和绑定事件
	var _initPageElm = function() {
		$("#sendBtn").bind("click",function(){
            _sendBtnClick();
        });

		var currentCountryInfo;
		if(window.localStorage.CurrentCountry){
			currentCountryInfo = $.evalJSON(window.localStorage.CurrentCountry);
			$("#countryText").text(currentCountryInfo.Country_Name);
			$("#serverEmails").text(currentCountryInfo.Email);
		}
	}

   //用户是否已登录；
    var _init=function(){
        _getuserInof();
        _initPageElm();

        new TextareaScroll("emailContent");

        if(myScroller == null){
            myScroller = HW.Tools._addiScroll3("sendEmailWrapper","sendEmail_outter",0,0,0,0);
        }else{
            myScroller.refresh();
        }
    }


	return {
		//Core中注册对象
		pageConfig : {
			name : "navSendEmail",
			id : "navSendEmail"
        },
		//初始化
		init : function() {
            $(document).undelegate("#navSendEmail","pageshow").delegate( "#navSendEmail", "pageshow",function(){


                console.log("======sendEmail=========");
                myScroller = HW.Tools._addiScroll3("sendEmailWrapper","sendEmail_outter",0,0,0,0);
                myScroller.refresh();



            });
            _init();
		},
        /**
         *  获取用户信息回调函数
          * @param respData
         */
  		getUserInfoResp : function(respData) {
            if(myScroller==null){
                myScroller = HW.Tools._addiScroll3("sendEmailWrapper","sendEmail_outter",0,0,0,0);
            }
			var data = $.evalJSON(respData);
			if (data.rcode == 0 ) {
				$("#userName").text(data.name);
				$("#userMobile").text(data.phone);
				$("#userEmail").text(data.email);
                myScroller.refresh();
			}else{
				$.mobile.changePage("signIn.html");
			}
		},
        /**
         * 发送邮件回调函数
         * @param respData  服务器返回数据
         */
		sendEmailResp : function(respData){
			$.mobile.hidePageLoadingMsg();
			var data = $.evalJSON(respData);
            var msg = HW.lang.getLocalString('sendEmail_js_failed');
			if(data.rcode == 0){
                msg =  HW.lang.getLocalString('sendEmail_js_success');
			}else{
                if(data.errorMsg == ""){
                    msg = data.errorMsg;
                }
            }
            simpleDialog.alert({content:msg,ok:function(){
                $.mobile.back();
            }});
		}
	}
		
})();

HW.Core.addModule("navSendEmail", HW.SendEmail);
HW.Core.loadPage("navSendEmail");