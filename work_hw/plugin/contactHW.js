/**
 * @author liutt
 */
HW.Nativ.ContactHW = (function() {
    var myScroller = null;
    /**
     * 初始化拨打电话列表项
     * @param phoneNumber       --电话号码
     * @returns {StringBuffer}
     * @private
     */
	var _iniTacPhoneItem = function(phoneNumber) {
        var number = 0;
        var isCanCall = true;
        if(typeof phoneNumber == "object") {
            number = phoneNumber.Number;
            isCanCall = phoneNumber.IsCanCall;
        }else{
            number = phoneNumber;
        }
        var itemHtml = new StringBuffer();
        itemHtml.append('<li><div class="f-l">');
        itemHtml.append(number);
        itemHtml.append('</div>');
        if(isCanCall){
            itemHtml.append('<a class="phone_icon" onclick=HW.Nativ.ContactHW.callServiceNumber("');
            itemHtml.append(number.toString());
            itemHtml.append('") >'+ '</a>');
        }
        itemHtml.append('</li>');
        return itemHtml;
	};
    /**
     * 初始化界面元素和绑定事件
     * @private
     */
	var _initPageElm = function() {
        $("#countryInfoDiv").hide();
        //发送邮件按钮，单击事件的绑定
        $("#sendEmailBtn").unbind("click").bind("click",function(e){
            console.log(HW.GlobalState.user.isSignIn);
            e.preventDefault();
            //如果用户未登录，则跳转到登录页面。
            if(!HW.GlobalState.user.isSignIn){
               HW.GlobalState.signJumpPage="sendEmail.html";
                HW.GlobalState.signBackPage="contactHW.html";
                $.mobile.changePage("signIn.html",{changeHash:false});
                e.preventDefault();
                return false;
            }else{
                $.mobile.changePage("sendEmail.html");
                e.preventDefault();
                return false;
            }
        });
		if(window.localStorage.getItem("CurrentCountry") != undefined){
            var currentCountryInfo = $.evalJSON(window.localStorage.getItem("CurrentCountry"));
			$("#countryName").text(currentCountryInfo.Country_Name);
			$("#tacName").text(currentCountryInfo.TAC_Name);
			$("#serverEmail").text(currentCountryInfo.Email);
            if(currentCountryInfo.TAC_Phone.length > 0){
                var contentHtml = new StringBuffer();
                for(var i = 0;i<currentCountryInfo.TAC_Phone.length;i++)  {
                    contentHtml += _iniTacPhoneItem(currentCountryInfo.TAC_Phone[i]);
                }
                $("#tacPhoneList").html(contentHtml.toString());
            }
            console.log("显示国家内容===============" );
            $("#countryInfoDiv").show();
		}
	};
	return {
		//Core中注册对象
		pageConfig : {
			name : "navContactHW",
			id : "navContactHW"
        },
		//初始化
		init : function() {
            HW.Tools.myMenuBottom('1');
            $(document).undelegate("#navContactHW","pageshow").delegate( "#navContactHW", "pageshow",function(){
                console.log("======contactHW=========");


                HW.lang.replaceLocalString();
                myScroller = HW.Tools._addiScroll("contactHWWrapper","contactHW_outter",0,0,0,0);
                myScroller.refresh();
            });
            _initPageElm();
            hoverBtn();
		},
        //拨打服务电话
        callServiceNumber:function(phoneNumber){
            location.href = HW.Contacts.RequestStrings.Other.RQSTR_CALLSERVICEPHONE + phoneNumber;
        }
	}
})();

HW.Core.addModule("navContactHW", HW.Nativ.ContactHW);
HW.Core.loadPage("navContactHW");