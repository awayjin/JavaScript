/**
 *  @type {HW}  全局命名空间，所有内容都将包含在此空间下
 */
var HW = {
    version: "1.0.0"
};


/**
 * 移动客户端命名空间
 * @type {{}}
 */
HW.Nativ = {};


/**
 * 全局状态存储对象，初始化时，会执行一系列表的更新工作，以符合实际需求。
 */
HW.GlobalState = {

    //当前页面容器环境 browser/native;
    container: "browser",

    //设备信息，设备类型。屏幕宽，高，分辨率。默认为1.0  ，调用native提供接口获取
    deviceType: "android",
    deviceInfo: {
        density: 1.0,
        width: 0,
        height: 0,
        deviceId: '',
        token: '',
        imei: '',
        sdkVersion:'14',
        screenBrightness:80,//屏幕亮度
        nightMode:0,//0：否 1：是
        fontSize:1,//0：小   1：中2：大
        nativeVersion:'1.0.0'
    },


    //更多页面中设置，读取应用的本地设置，默认为中文。 native则由naitve中传入进行设置；
    appConifg: {
        currentLang: "zh",
        isSendLog: true,
        isWifiDownloaded: true,
        //默认的登录跳转页面
        jumpPage:"index",
        isCheckUpdate: true
    },

    //natvie页面配置，
    // 链接pageLinkId，
    // 页面载入方法pageLoadMethod。
    // id为链接的id名称
    nativePages: [
        {
            pageName: "联系华为",
            pageLinkId: "contactHW",
            pageHref: 'showPage:{"pageId":1} '
        },
        {
            pageName: "下载管理",
            pageLinkId: "downloadManager",
            pageHref: 'showPage:{"pageId":2} '
        } ,
        {
            pageName: "我的收藏",
            pageLinkId: "myFavorites",
            pageHref: 'showPage:{"pageId":3} '
        } ,
        {
            pageName: "关于",
            pageLinkId: "appConfig",
            pageHref: 'showPage:{"pageId":4} '
        },
        {
            pageName: "帮助",
            pageLinkId: "help",
            pageHref: 'showPage:{"pageId":5} '
        },
        {
            pageName: "使用帮助",
            pageLinkId: "userHelp",
            pageHref: 'showPage:{"pageId":6} '
        }
    ],


    //用户信息。
    //用户名，密码 ，是否记住密码，是否自动登录，web版中从cookie中获取。native版中通过接口获取。
    user: {
        userId: "",
        userPwd: "",
        isSavePwd: false,
        isAutoSignIn: false,
        isSignIn: false
    },

    //意见反馈需要使用的userid
    nativeUserid:'',

    //超时自动登录，使用的密码
    nativeUserPwd:"",


    //是否启用全局菜单
    isOnGlobalMenu: false,

    //产品支持浏览历史记录缓存，加载产品页面时行初始化；
    browserProductHistory: [],

    //知识库浏览历史记录缓存，加载知识库页面时行初始化；
    browserKnowledgeHistory: [],

    //搜索历史关键字记录
    searchHistoryRecord: [],


    //网络连接状态，启一个ajax请求，测试网络连接是否正常。
    isConnectInternet: false,

    //基础域名，本地测试使用localhost;



    //baseUrl:'http://10.36.16.41:38080/ms/mvc',
    //     baseUrl:'http://10.36.64.54:8080/ms/mvc',
    //baseUrl:'http://10.36.16.72:8001/ms/mvc',
    //baseUrl:'http://10.36.64.58:8888/ms/mvc',
    //baseUrl: 'http://219.134.186.19:8119/ms/mvc',
   //     baseUrl: 'http://10.36.64.190:38080/ms/mvc',
    //baseUrl:'http://10.36.16.41:9080/ms/mvc',
      baseUrl:'http://support-trial.huawei.com/ms/mvc',
    // baseUrl:'http://support-trial.huawei.com/ms/mvc',
    //  baseUrl:'http://weblink-sit.huawei.com/ms/mvc',
    //样式地址
    baseURLCSS:'http://dsdp-beta.huawei.com/carrier/contentview!getCssStream.action?uuid=',
    //图片地址;
    baseUrlimg:'http://support-trial.huawei.com/carrier/contentview!getImgFileStream.action?uuid=',
   //baseUrlimg:'http://dsdp-beta.huawei.com/carrier/contentview!getImgFileStream.action?uuid=',
    //hedex 图片地址;
    baseUrlimgHedex:'http://support-trial.huawei.com/hdx/pages/',
    //baseUrlimgHedex:'http://dsdp-beta.huawei.com/hdx/pages/',

    // hedex 固定图片目录字段
    hedexFixedDir: '/resources',

    //登录地址
     signInUrl:"https://uniportal.huawei.com/uniportal/login.do?actionFlag=loginAuthenticate&nls=",
    // signInUrl:"https://uniportal-beta.huawei.com/uniportal/login.do?actionFlag=loginAuthenticate&nls=",

    //web版本中登录成功与注解后的跳转地址
    //redirectUrl:"http://localhost.huawei.com/myworkspace/publiv_ver1.0.0.9/",

    // redirectUrl:"http://support-trial.huawei.com/mobile/",
    redirectUrl:"http://weblink-sit.huawei.com/mobile",


    //注销地址
    logoutUrl:"https://uniportal.huawei.com/uniportal/logout.do",
    //logoutUrl:"https://uniportal-beta.huawei.com/uniportal/logout.do",

    //权限提升地址中文
    privilegeZhUrl:"http://support.huawei.com/support/pages/workplace/myAccount.do?actionFlag=toupgradeAccount&toAppType=E_SB",
    //privilegeZhUrl:"http://uniportal-beta.huawei.com/support/pages/workplace/myAccount.do?actionFlag=toupgradeAccount&toAppType=E_SB",


    //权限提升地址英文
    privilegeEnUrl:"http://support.huawei.com/support/pages/workplace/myAccount.do?actionFlag=toupgradeAccount&toAppType=E_SB",
    //privilegeEnUrl:"http://uniportal-beta.huawei.com/support/pages/workplace/myAccount.do?actionFlag=toupgradeAccount&toAppType=E_SB",


    //注册地址
    regUrl:"http://uniportal.huawei.com/accounts/register.do?method=toRegister&nls=",
    //regUrl:"http://uniportal-beta.huawei.com/accounts/register.do?method=toRegister&nls=",
    //regUrl:"https://uniportal.huawei.com/accounts/register.do?method=toRegister&appurl=http://support.huawei.com/carrier/&nls=zh",

    //忘记密码
    actionFlagtoGetPassword:"https://uniportal.huawei.com/uniportal/modifyInfo.do?actionFlag=toGetPassword&redirect=%2Funiportal%3Fredirect%3Dhttp%25253A%25252F%25252Fsupport.huawei.com%25252Fcarrier%25252F",
    //app下载地址
    ios_AppUrl:"itms-services://?action=download-manifest&url=http://support-trial.huawei.com/ms/HWIOS.plist",
    //android下载地址
    android_AppUrl:"http://support-trial.huawei.com/ms/app/download?version=V1.1.0",
    // 最近浏览local storage 的key
    recentProductList: "recentProductList",

    // 最近浏览local storage 的key
    recentKnowledgeList: "recentKnowledgeList",

    //最近产品搜索的key
    lastProSearch: "lastProSearch",

    //产品最近关注搜索的key
    lastFocusSearch: "lastFocusSearch",

    //知识库最近产品搜索的key
    lastKnowledgeProSearch: "lastKnowledgeProSearch",

    //知识库产品最近关注搜索的key
    lastKnowledgeFocusSearch: "lastKnowledgeFocusSearch",

    //加载框时钟 id
    timeoutId: -1,

    //登录后要跳转的页面
    signJumpPage: '',

    //未登录时要返回的页面
    signBackPage: '',

    //登录超时时间设置
    timeLength:30,
    //登录超时检测定时器
    signTimeOutid:null,
    //滑动选择框，针对android物理返回键，缓存对象
//    mobiscroller:null,


    //是否为返回请求
    isBack: false,

    //存储访问过的历史页面，用于给native的后退按钮调用
    histroyUrl: [],

    currentXHRTimeout: -1,

    //网络状态 默认为true ,即假定为连通状态。(注： 需要native端在启动应用的时候，初始化此状态值。得到真实状态)
    isInternet:true,

    //用于记录首页面的地址
    HomePageUrl:""

}


/**
 * @type {HW.Core} 核心对象，核心方法loadPage()，实现功能如下
 * 页面载入事件注册，页面载入由jquery.mobile通过ajax载入实现。这里只作了绑定操作
 * ajax请求发送，获取页面数据；有两种可能，一种是在页面显示之后pageshow后，再开始加载数据，一种是页面pagecreate()创建时加载数据；
 * 页面业务处理，由传入对象的指定的函数来实现具体的数据业务处理。
 */
HW.Core = (function (doc, $, undefined) {

    /**
     * 请求发送统一入口；从服务端获取数据。
     * @param url  请求地址
     * @param data   发送的数据
     * @param callBack    得到数据后的处理函数
     * @private
     */
    var _pageDataRequest = function (option, callback) {
        console.log("_pageDataRequest()开始请求数据") ;
        /*function jsonpResult(result){
         return result;
         }*/
        //请求前的参数设置
        var defParam = {
                type: "POST",
                dataType: "jsonp",
                data: {
                    deviceid: "1234",
                    imeiid: "12345",
                    lang: HW.GlobalState.appConifg.currentLang,
                    userid:HW.GlobalState.user.userId
                },

                success: callback,
                //jsonpCallback:'jsonpResult',
                beforeSend: function (XHR) {//显示法loading
                    // $.mobile.loading("hide");
                    //发送请求前，先检测网络是否为连接。无连接不发请求。
                    if(!HW.GlobalState.isInternet){
                        //保证在页面转换动画结束后，显示提示。
                        if(HW.GlobalState.currentXHRTimeout !== -1){
                            console.log("zw==core=data=1=")
                            clearTimeout(HW.GlobalState.currentXHRTimeout);
                            HW.GlobalState.currentXHRTimeout = -1;
                            currentXHR.abort();
                        }
                        setTimeout(function(){
                            simpleDialog.alert({content: HW.lang.getLocalString('siteSearchList_tips1')});
                        },400);

                        return false;
                    }
                    var theme = this["loadingTheme"] || $.mobile.loader.prototype.options.theme,                     //显示主题a,b,c,d,e
                        msgText = this["loadingMsgText"] || $.mobile.loader.prototype.options.text,                 //显示文本内容
                        textVisible = (this["loadingTextVisible"] === undefined ? true : this["loadingTextVisible"]),//是否显示文本,true显示，false不显示
                        iconVisible = (this["loadingIconVisible"] === undefined ? true : this["loadingIconVisible"]),//是否显示图标，true显示图片
                        html = this["loadingHtml"] || "";                                                             //往loading结构中增加html内容

                    $.mobile.loading("hide");
                    clearTimeout(HW.GlobalState.timeoutId);

                    HW.GlobalState.timeoutId = setTimeout(function () {
                        $.mobile.loading("show", {
                            text: msgText,
                            textVisible: textVisible,
                            theme: theme,
                            textonly: !iconVisible,
                            html: html
                        })

                    }, 900);
                },
                complete: function (XHR, TS) {//隐藏loading
                    console.log('complete=0=')
                    $.mobile.loading("hide");
                    clearTimeout(HW.GlobalState.timeoutId);
                    clearTimeout(HW.GlobalState.currentXHRTimeout);
                    HW.GlobalState.currentXHRTimeout = -1;



                    //访问服务器之后，更新超时的起点时间
                    //HW.SignInTimeOut.saveSignInTime();
                    HW.Cookie.setCookie("signInTime" , new Date() , new Date().setMonth(new Date().getDay()+1));


                }
            },
            FunInitData = {},
            argInitData = {},
            key, optionEx = {},
            currentXHR={};


        //处理通过data:"name=John&location=Boston" 及data:{a:1,b:"ss"}函数返回的参数数据，如为 name=John&location=Boston，转成对象统一处理
        if (option.data) {
            if (typeof option.data == "string") {
                option.data = HW.Tools.parseURL(option.data);
            }
        }
        else {
            option.data = {};
        }

        //处理通过initData函数返回的参数数据，如为 name=John&location=Boston，转成对象统一处理
        if (option.initData && option.initData.constructor === Function) {
            FunInitData = option.initData();

            if (typeof FunInitData == "string") {
                FunInitData = HW.Tools.parseURL(FunInitData)
            }
            for (key in option) {
                if (key != 'initData') optionEx[key] = option[key];
            }
            // delete option.initData;
        }
        else {
            optionEx = option;
        }
        $.extend(optionEx.data, FunInitData);

        var settings = $.extend(true, defParam, optionEx);
        if(HW.GlobalState.currentXHRTimeout !== -1){
            clearTimeout(HW.GlobalState.currentXHRTimeout);
            HW.GlobalState.currentXHRTimeout = -1;
            currentXHR.abort && (typeof currentXHR.abort =='function') && currentXHR.abort();
        }
        var successEx =  settings.success || function(){};
        settings.success = function(data,ts,xhr){
            if(data && data.head && HW.GlobalState.user.isSignIn && data.head.msg == '102' ){
                HW.GlobalState.user.isSignIn = false;
                HW.Tools.btnChange();
                var href=$("base").attr("href");
                if(/index\.html/.test(href)){
                    $.mobile.changePage("signIn.html?from=index",{changeHash:false});
                }else{
                    HW.GlobalState.signJumpPage=href;
                    HW.GlobalState.signBackPage="../index.html";
                    $.mobile.changePage("page/signIn.html",{changeHash:false});
                }

                return false;
            }
            successEx.apply(null,[].slice.call(arguments,0))
        };
        currentXHR = $.ajax(settings);


        HW.GlobalState.currentXHRTimeout =  setTimeout(function(){

            $.mobile.loading("hide");
            clearTimeout(HW.GlobalState.timeoutId);
            simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout'),ok:function(){
                currentXHR.abort();
            }});
        }, 30000);


    };


    //对象缓存，用于存储所有注册进来的模块，以模块名称存储 如  {"Demo":HW.Deom, "Product":HW.Product }
    var _moduleList = {};

    /**
     * 检测对象是否为已注册的合法对象。即 _moduleList.Demo是否存在；
     * @param objName   模块名称，
     * @private
     */
    var _checkPageObj = function (objName) {
        var result = false;
        if (_moduleList.hasOwnProperty(objName)) {
            if (typeof _moduleList[objName] != "object") {
                result = false;
            } else {
                result = true;
            }
        }
        ;
        return result;
    }


    //私有类，所有公开的内容，都依赖于此类，起到保护Core公开成员的作用，
    var _F = function () {
    };
    _F.prototype = {
        constructor: _F,

        /**
         * 注册模块对象， 将需要使用的所有模块，添加入 _moduleList集合中， 如 {"Demo":HW.Deom, "Product":HW.Product }
         * @param obj     模块实际对象，
         * @param objName  存入模块对象的实际名称
         */
        addModule: function (objName, obj) {
            if (typeof obj != 'object') {
                throw new Error("Core.addModule()中   " + obj + " 不是一个对象，不能注册");
            }
            if (_moduleList.hasOwnProperty(objName)) {
                throw new Error("Core.addModule()中   " + objName + " 对象，已注册，不能重复注册");
            }
            _moduleList[objName] = obj;
        },

        /**
         * 获取已注册的模块对象，使用前从这里提取，非强制性；
         * @param name，使用名称从 _moduleList中取出对象，如果对象存在时。
         */
        getModule: function (objName) {
            if (_checkPageObj(objName)) {
                return _moduleList[objName];
            } else {
                throw new Error("Core.getModule()中   _moduleList." + objName + " 不存在，或不是一个对象，使用前请先用addModule()进行注册");
            }
        },

        /**
         * 返回所有已注册的对象
         * @returns {{}}
         */
        getAllPageObj: function () {
            return  _moduleList;
        },


        /**
         * loadPage()功能：给jqm事件绑定回调函数，发送请求，提取数据 ，初始化页面
         * @param objName   模块名称，使用的对象，必须是注册过的对象，只能从_moduleList中提取到，否则不能直接使用loadPage。
         */
        loadPage: function (objName) {
            //直接调用ajax，没必要返回pageConfig
            if (typeof objName == "object" && typeof objName.url == "string") {
                _pageDataRequest(objName, objName.success);
                return;
            }


            //从 _moduleList中提取对象
            var pageObj = this.getModule(objName);

            /**
             * pageConfig参数处理
             * pageId:页面上的容器ID名，默认使用第一个page窗器；用于注册页面加载事件。
             * pageEventType：获取数据的事件类型名称，默认使用 pagecreate      jqm载入一个页面后加触发此事件，执行回调函数
             * pageDataProccess：取得数据后的处理函数名称 ,必须有，没有则抛出异常
             * pageName:模块对象名称，从pageConfig中取，或是从容器元素中的属性名中取，或是直接使用传入的名称。
             * ajaxOptions：ajax设置参数，url地址，data传参。
             * tag:是否在当前页，直接发ajax请求。
             * 示例： { name:"Demo",id:"element id ",eventType:"pageinit",processData,"showData",ajaxOptions:{url:"page.php",data:""} }
             */
            var pageConfig = pageObj.pageConfig;
            if (typeof pageConfig != 'object') {
                throw new Error("[ error function： core.loadPage() ]   ---------  pageConfig 参数必须为 object");
            }
            var pageId = $.trim(pageConfig.id) || $(':jqmData(role=page):first').attr("id");
            var pageEventType = pageConfig.eventType;


            var pageDataProcessName = pageConfig.processData;
            var pageName = pageConfig.name || $(pageObj.element).attr("module") || objName;
            var ajaxOptions = pageConfig.ajaxOptions;
            var tag = pageConfig.tag || false;
            simpleDialog.destroy();
            if(HW.GlobalState.currentXHRTimeout !== -1){
                clearTimeout(HW.GlobalState.currentXHRTimeout);
                HW.GlobalState.currentXHRTimeout = -1;
            }

            //页面初始化
            $(document).undelegate(("#" + pageId), "pagebeforeshow").delegate(("#" + pageId), "pagebeforeshow", function (e) {

                console.log(ajaxOptions);

                //载入页面添加侧边栏菜单。帮助页不加此菜单
//                if(pageId!="help"){
//                    HW.MenuBar.regEvent(pageId);
//                }
                //载入页面要显示的语言
                HW.lang.replaceLocalString();


                //初始化载入页面
                if (pageObj.init) {
                    console.log("初始化" + objName + "对象");
                    pageObj.init();
                }

                e.preventDefault();
                return false;
            });








            //在当前页，直接发请求，取数据；
            if (tag) {
                console.log(objName + "  在当前页面，直接请求数据   数据请求参数如下：--------------------" );
                _pageDataRequest(ajaxOptions, pageObj[pageDataProcessName]);
            }else{

                //jqm  pageEvent事件后，发送请求
                if (typeof pageEventType == "string") {
                    //注册事件后添加一个标识，表示此对象已添加了此事件，不需要再添加该事件了
                    if (!pageObj._isHasThisEvent) {
                        $(document).delegate(("#" + pageId), pageEventType, function () {

                            //载入页面添加侧边栏菜单。
//                            HW.MenuBar.regEvent(pageId);


                            if (typeof pageDataProcessName != 'string' || pageDataProcessName == '') {
                                throw new Error("错误： pageConfig对象的processData字段不能为空");
                            }
                            pageObj._isHasThisEvent = true;
                            if (ajaxOptions) {
                                // console.log(pageEventType+"事件时，请求数据") ;
                                if (typeof ajaxOptions.url != "string") {
                                    throw new Error("错误： pageConfig对象的ajaxOptions.url字段不能为空");
                                }
                                _pageDataRequest(ajaxOptions, pageObj[pageDataProcessName]);
                            }
                            else{
                                if(pageConfig.onlyExecNotAjax){   //只执行注册事件方法不发送请求
                                    pageObj[pageDataProcessName]();
                                }
                            }
                        });
                    }
                }

            }










            //有isM属性的对象，重新绑定事件，用于ajaxOptions状态的更新。
            if(pageConfig.isM){
                $(document).undelegate(("#" + pageId), pageEventType).delegate(("#" + pageId), pageEventType, function () {
                    console.log("isM========");
                    console.log(ajaxOptions);
                    _pageDataRequest(ajaxOptions, pageObj[pageDataProcessName]);
                });
            }


        }


    };


    //返回核心对象
    return new _F();
})(document, jQuery);


HW.Tools = {
     changeJQMBackParam:function(opts,compare){
        //不是object param 不做处理
        if(!opts  || typeof opts !== 'object') return;
        var jqmUrlHistory = $.mobile.urlHistory,historyEntry,historyEntryParams;

        //支持index与url匹配
        compare = compare || {index:jqmUrlHistory.activeIndex};

        //找到要处理的对象
        if(compare.hasOwnProperty('index')){
            historyEntry = jqmUrlHistory.stack[compare['index']];
        }
        else if(compare.hasOwnProperty('url')){
            $.each( jqmUrlHistory.stack, function( i, entry ) {
                if ( compare.url === decodeURIComponent( entry.url ) ) {
                    historyEntry = entry;
                    compare['index'] = i;
                    return false;
                }
            });
        }

        //处理返回时的参数
        if(historyEntry){//屏蔽找不到实体出错
            historyEntryParams = HW.Tools.parseURL(historyEntry['url']);
            for(key in opts){
                historyEntryParams[key] = opts[key];
            }
            //屏蔽请求是目录情况"/myworkspace/publiv_ver1.0.0.9/
            if(historyEntry['url'].substring(historyEntry['url'].length-1) !== '/'){
                historyEntry['pageUrl'] = historyEntry['url'] = historyEntry['url'].split('?')[0] + '?' + $.param( historyEntryParams);
                console.log('==historyEntry=0=')
                console.log( historyEntry)
                console.log( $.mobile.urlHistory)

                console.log('==historyEntry=1=')
            }

        }
    },
    //R21-“仅wifi网络下载图片”模式下可以单个下载图片
    wifiNODownLoadImage:function(isWifi,defaultImgURL, content){
        // isWifi true表示wifi开启
        var regImg = /<img\s+[^>]*src\s*=\s*['\"]([^'\"]+)['\"][^>]*>/gi;
        if(!isWifi){ //没开启wifi
            content +='';
            return content.replace(regImg,function(strImg){
                var regSrc = /src\s*=\s*['\"]([^'\"]+)['\"]/gi;
                return strImg.replace(regSrc,function(baseSrc,c){
                    return 'baseSrc="'+ c + '" src="' +defaultImgURL+ '"';;
                });
            });

        }
    },
    //  非wifi网络下载图片”模式下可以单个下载图片
    wifiDownLoadImage:function(){
        $('img[baseSrc]').click(function(e){
            var $this = $(this);
            $this.attr("src",$this.attr('baseSrc'));
        });
    },
    //是手机设备(android,)true否则是pc
    isTablet:function(){
        var ua = navigator.userAgent,
            android = /Android/i.test( ua ),
            ios = /iP[ao]d|iPhone/i.test( ua ),
            webos = ua.match(/(webOS|hpwOS)[\s\/]([\d.]+)/i),
            touchpad = webos && ua.match(/TouchPad/i),
            playbook = ua.match(/PlayBook/i),
            tablet = ua.match(/Tablet/i)
        return !!(android || ios || touchpad || playbook || tablet);
    },
    /**
     * 首页登录按钮状态更改；
     */
    btnChange: function () {
        if (HW.GlobalState.user.isSignIn) {
            var signInBtn = $(".login_go"),signFont=$(".login_font");
            signInBtn.attr("href", "page/myZone.html?from=index");
            if (!signInBtn.hasClass("myZone")) {
                signInBtn.addClass("myZone");
            }
            signFont.attr("localString","myZone_header");
        }else{
            var signInBtn = $(".login_go"),signFont=$(".login_font");
            signInBtn.attr("href", "page/signIn.html?from=index");
            if (signInBtn.hasClass("myZone")) {
                signInBtn.removeClass("myZone")
            }
            signFont.attr("localString","signIn_header");
        }

    },
    //encodeURIComponent替换操作
    reEncondeURIComponent:function(url){
        var regSearch = /\?/gi;
        url+='';
        return regSearch.test(url) ?
            RegExp.leftContext +'?' + encodeURIComponent(RegExp.rightContext):
            url;

    },
    //替换查询内容中的&字符成__^__
    replaceAMP : function(name){
        return (name+'').replace(/\&/g,'____');
    },
    //替换查询内容中__^__成&字符
    replaceToAMP : function(name){
        return (name+'').replace(/____/g,'\&');
    },
    //返回当前页面中截取的字符串
    getTrimStringURL : function(){
        var _url = $('base').attr('href'),index = _url.indexOf('?');
        return $.trim(_url.substring(_url.lastIndexOf('\/',index) +1));
    },
    /**
     *  把url后面的请求参数转化成对象http://localhost?a=3&b=4 变成{a:"3",b:"4"}
     */
    parseURL: function (url) {
        var param = {};
        if (typeof url == "string") {
            url = decodeURIComponent(url);
            url.replace(/([^?&]+)=([^?&]*)/g, function (a, b, c) {
                param[b] = c;
            });
            return param;
        }
    },


    /**
     * 将字符串转换为json对象
     * @param str    str = '{"name":"jack"}';注意json字符串中，属性必须带上引号；
     */
    conveJson: function (str) {
        var result = -1;
        if (JSON.parse) {
            result = JSON.parse(str);
        } else {
            result = eval('(' + str + ')');
        }
        return result;
    },


    /**
     * 添加滑动-----前提条件 log-box必须是绝对定位，且高度自适应；----注： 后面的4个参数，已由css通过适配来控制，因此不需要传入；
     * @param wrapBoxId  包含容器，通常是login-box;
     * @param contBoxId   全部内容容器，
     * @param top    wrapBox的top位置；头部的总高度
     * @param bottom  wrapBox bottom位置，底部的总高度；
     * @param top2    login-box的top位置；
     * @param bottom2  login-box的 bottom位置；
     * @returns {iScroll}
     * @private
     */
    _addiScroll: function (wrapBoxId, contBoxId) {
        //每次进入页面，都需要在加，在加载更多内容时，需要调用滑动对象的刷新方法添加；
        // web版不需添加滑动；如果要则去掉这句；
        //if(HW.GlobalState.container !="native"){return;}
        // console.log("开始添加滑动效果=============");

        //找不到内容容器，直接退出；
        var contBox = $("#" + contBoxId);
        if (contBox.length <= 0) {
            return;
        }


        //尝试查找wrapBox容器；没有则创建；并用wrapper包含住contBox
        var wrapBox = $("#" + wrapBoxId);
        var isCreate = false;
        if (wrapBox.length <= 0) {
            wrapBox = $("<div id='" + wrapBoxId + "'></div>");
            isCreate = true;
        }

        //设置wrapBox的样式：绝对定位；宽度100%，top值通常是0; bottom值为传入的bottom值
        wrapBox.css({"position": "absolute", "left": "0px", "width": "100%", "overflow": "hidden"});
        //如果需要设置login-box的位置

        //login-box由css来进行适配，js端不作控制，因此下面这句话，可以注释掉；
        //$(".login-box").css({"top":top2,"bottom":bottom2});


        if (isCreate) {
            contBox.wrap(wrapBox)

        };

        //添加滑动；
        var myScroll,opts = typeof arguments[2] =='object' ? arguments[2] : {};
        //隐藏垂直滚动条。
        if(opts['isMore']){
           // wrapBox.append('<div class="" id="pullUp"><span class="pullUpIcon"></span><span class="pullUpLabel">Pull up to load more...</span></div>');
            var pullUpEl = $('#'+ opts['id']),pullUpOffset = pullUpEl && pullUpEl.outerHeight();
            $.extend(opts,{
                useTransition: true,
                onRefresh: function () {


                     if (pullUpEl.hasClass('loading')  && pullUpEl.css('display') !== 'none' ) {
                         pullUpEl.removeClass();
                        $('.pullUpLabel', pullUpEl).html(HW.lang.getLocalString('gs_load_more')) ;
                    }
                 },
                 onScrollMove: function (e) {
                    if( pullUpEl.css('display') !== 'none' ){
                        if (this.y < (this.maxScrollY - 5) && !pullUpEl.hasClass('flip')) {
                            pullUpEl.addClass('flip');
                            $('.pullUpLabel', pullUpEl).html(HW.lang.getLocalString('gs_Release_refresh')) ;
                            this.maxScrollY = this.maxScrollY;
                        } else if (this.y > (this.maxScrollY + 5) && pullUpEl.hasClass('flip')) {
                            pullUpEl.removeClass();
                            $('.pullUpLabel', pullUpEl).html(HW.lang.getLocalString('gs_load_more')) ;
                            this.maxScrollY = pullUpOffset;
                        }
                    }
                 },
                onScrollEnd: function () {
                   if (pullUpEl.hasClass('flip')  && pullUpEl.css('display') !== 'none' ) {
                       pullUpEl.addClass('loading');
                       $('.pullUpLabel', pullUpEl).html(HW.lang.getLocalString('gs_loading_more')) ;
                       opts['ajaxCallback'] && opts['ajaxCallback']();	// Execute custom function (ajax call?)
                    }
                }
             });
        }


        myScroll = new iScroll(wrapBoxId,opts);
        return myScroll;
    },


    /**
     * 添加能够适应内容包含输入框的滑动-----前提条件 log-box必须是绝对定位，且高度自适应；
     * @param wrapBoxId  包含容器，通常是login-box;
     * @param contBoxId   全部内容容器，
     * @param top    wrapBox的top位置；头部的总高度
     * @param bottom  wrapBox bottom位置，底部的总高度；
     * @param top2    login-box的top位置；
     * @param bottom2  login-box的 bottom位置；
     * @returns {iScroll}
     * @private
     */
    _addiScroll3: function (wrapBoxId, contBoxId, top, bottom, top2, bottom2) {
        //每次进入页面，都需要在加，在加载更多内容时，需要调用滑动对象的刷新方法添加；
        // web版不需添加滑动；如果要则去掉这句；
        //if(HW.GlobalState.container !="native"){return;}
        console.log("开始添加滑动效果=============");

        //找不到内容容器，直接退出；
        var contBox = $("#" + contBoxId);
        if (contBox.length <= 0) {
            return;
        }


        //尝试查找wrapBox容器；没有则创建；并用wrapper包含住contBox
        var wrapBox = $("#" + wrapBoxId);
        var isCreate = false;
        if (wrapBox.length <= 0) {
            wrapBox = $("<div id='" + wrapBoxId + "'></div>");
            isCreate = true;
        }

        //设置wrapBox的样式：绝对定位；宽度100%，top值通常是0; bottom值为传入的bottom值
        wrapBox.css({"position": "absolute", "left": "0px", "width": "100%", "overflow": "hidden"});
        //如果需要设置login-box的位置

        //login-box由css来进行适配，js端不作控制，因此下面这句话，可以注释掉；
        //$(".login-box").css({"top":top2,"bottom":bottom2});


        if (isCreate) {
            contBox.wrap(wrapBox)
        }
        ;

        //添加滑动；
        var myScroll;
        myScroll = new iScroll(wrapBoxId, {
            onBeforeScrollMove: function (e) {
                var target = e.target;
                while (target.nodeType != 1)
                    target = target.parentNode;
                if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
                    e.preventDefault();
            }
        });
        return myScroll;
    },

    /**
     * 搜索中的删除小图标功能与按backspace键删内容时事件，用于清空搜索框内的文字；
     * inputId：表单ID名称      如：searchKeys
     */
    _clearSearchInput: function (inputId) {
        if (typeof inputId != "string") {
            return;
        }
        //input焦点
        var input_Focus = $("#" + inputId);
        //console.log(input_Focus);

        var closeIcon = input_Focus.next(".close");
        var input_timer;

        //搜索框处理；
        input_Focus.bind("blur", function (e) {
            if (input_timer) {
                clearInterval(input_timer);
            }
        }).bind("focus",function (e) {
                //alert("a");
                var that = this;
                input_timer = setInterval(function () {
                    if (that.value == "") {
                        closeIcon.hide();
                    }else{
                        closeIcon.show();
                    }
                }, 200);
            }).bind("keypress", function (e) {
                e = e || window.event;
                if (e.keyCode == 8) {
                    if (this.value == "") {
                        closeIcon.hide();
                    }
                } else {
                    closeIcon.show();
                }

            });


        //小图标处理；
        closeIcon.bind('tap', function (e) {
            input_Focus.val("");
            $(this).hide();
        });

        if($.trim(input_Focus.val()).length>0){
            closeIcon.removeClass("hide");
        }
    },


    /**
     * native中给html内容中的img标签添加 openImage功能 <a href='openImage:{"url":"/mnt/sdcard/xx.png"}'>  <img />  </a>
     * @param html
     * @private
     */
    _addOpenImage: function (html) {
        if (HW.GlobalState.container == "native") {
            if (html.length <= 0) {
                return;
            }
            //var re=/<\s*img\s+[^>]*?src\s*=\s*(\'|\")(.*?)\\1[^>]*?\/?\s*>/i
        }

    },


    /*
     *存指定名长度的数组对象到localstorage，且去重复数据
     * name localstorage 对应的key
     * o 要存的数据对象
     * [size] 最大限制长度
     * [compareKey] 要比较o对应的key
     */
    setLocalStorage: function (name, o, size, compareKey) {
        var aLocalStorage = [], strLocalStorage, len, i;
        if (localStorage) {
            strLocalStorage = localStorage.getItem(name); //取已有的
            if (strLocalStorage !== null) {
                try {   //非json格式，无法转换成数组
                    aLocalStorage = JSON.parse(strLocalStorage);
                }
                catch (e) { //置回最初状态重新存储
                    aLocalStorage = [];
                }
            }
            len = aLocalStorage.length;
            //去重
            if (compareKey && typeof compareKey == "string") {
                for (i = 0; i < len; i++) {
                    if (aLocalStorage[i][compareKey] == o[compareKey]) {
                        aLocalStorage.splice(i, 1);
                        break;
                    }
                }
            }

            //限制最大存储
            if (size && aLocalStorage.length === size) {
                aLocalStorage.shift();
            }

            aLocalStorage.push(o);
            localStorage.setItem(name, JSON.stringify(aLocalStorage))
        }
    },


    /*
     *获取存取的数组对象
     */
    getLocalStorage: function (name) {
        if (localStorage) {
            var strLocalStorage = localStorage.getItem(name); //取已有的
            try {
                strLocalStorage = JSON.parse(strLocalStorage)
            }
            catch (e) {
                strLocalStorage = null
            }
            return strLocalStorage;
        }
        else {
            return null;
        }
    },
    /*
     * 底部导航显示隐藏
     * 0:首页
     * 1:知识库
     * 2:视频
     * 3:工具
     * 4:期刊
     * 5：隐藏导航栏
     * 6：空显示
     * */
    myMenuBottom:function(type){
        if(HW.GlobalState.container=="native"){
            location.href = "navigationBar:" + '{"type":'+ ( type || '') +'}';
        }else{
            $(".fixedMenu")[(type == '5' ? 'add' : 'remove') + 'Class']("hide");
        }
    },
    /*
     * 弹窗底部导航显示隐藏
     * type:0 隐藏
     * type:1 显示
     * HW.Tools.navigationBarReqDisplay('1'||'0')
     * */
    navigationBarReqDisplay:function(type){
        if(HW.GlobalState.container=="native"){
            location.href = "navigationBarReqDisplay:" + '{"type":'+ ( type || '') +'}';
        }
    },
    /**
     * 由时间毫秒数直接转换成日期字符 secondDate 毫秒数日期 formatStr 格式化字符串
     */
    secondDateToString: function (secondDate, formatStr) {
        if (secondDate) {
            if (!formatStr) {
                formatStr = "yyyy-MM-dd";
            }
            var date = new Date(secondDate);
            return date.FormatToString(formatStr);
        }
        return "";
    },
    getStyle: function(elem,name){
        if(elem.style[name]){
            return elem.style[name];
        }else if(elem.currentStyle){
            return elem.currentStyle[name];
        }else if(document.defaultView && document.defaultView.getComputedStyle){
            name = name.replace(/([A-Z])/g,"-$1");
            name = name.toLowerCase();
            var s = document.defaultView.getComputedStyle(elem,"");
            return s && s.getPropertyValue(name);
        }else{
            return null;
        }
    },
    /*
     * 1. leftID  左边ID
     * 2. sideID  侧栏ID
     * 3. btnID   按钮ID
     * 4. elem    侧栏class
     * 5. maskID  遮罩ID
     * */
    mySidebarAll:function(leftID,sideID,btnID,elem,maskID){
        var leftID=$("#"+leftID),sideID=$("#"+sideID),btnID=$("#"+btnID),maskID=$("#"+maskID),elems;
        console.log(typeof(elem))
        if (typeof elem != "string") {
            console.log(elem)
            elems=''
        }else{
            elems=$("."+elem)
        }
        console.log(elem);

        //显示侧栏
        function _mySwipeleft(){
            HW.Tools.myMenuBottom('5');
            leftID.removeClass("scroller-hide").addClass("scroller shadow");
            sideID.removeClass("hide").addClass("leftAbso left2");
            maskID.removeClass("hide");
        }
        //隐藏侧栏
        function _mySwiperight(){
            HW.Tools.myMenuBottom('1');
            leftID.removeClass("scroller shadow").addClass("scroller-hide");
            sideID.addClass("hide").removeClass("leftAbso left2");
            maskID.addClass("hide");
        }
        //btn事件
        btnID.unbind("click").bind("click",function(oEnt){
            oEnt.stopPropagation();
            if(sideID.hasClass("hide")){
                _mySwipeleft();
            }else{
                _mySwiperight();
            }
        });
        //遮罩事件
        maskID.unbind("click").bind("click",function(){
            _mySwiperight();
        })
        //swipeleft左滑  swiperight右滑
        maskID.unbind("swiperight").bind("swiperight",function(){
            _mySwiperight();
        })

    },
    /*
     *搜索框处理
     * 1.inID    文本框ID
     * */
    _searchInputChanges:function(inID){
        var input_timer,inFocus=$("#"+inID);
        inFocus.focus(function(){
            inFocus.siblings("div").addClass("focusDel");
            /*var that = this;
             input_timer = setInterval(function () {
             if (that.value == "") {
             $(".placeHolderV").show();
             }else{
             $(".placeHolderV").hide();
             }
             }, 200);*/

        }).blur(function(){
                if(inFocus.val()==""){
                    $(".placeHolderV").show();
                }
            }).keypress(function(){
                $(".placeHolderV").hide();
            });
        $(".focusDis").unbind().bind("click",function(){
            inFocus.focus();
        })
    },
    //特殊符号处理
    _SpecialSymbols:function(str){
        str = str.replace(/\\/g,"\\\\");
        str = str.replace(/\"/g,"\\\"");
        return str;
    }
}


/**
 *  Cookie操作，设置，获取，删除；
 *  HW.Cookie.setCookie(   "c1","非URI字符#;还有特殊字符"  );
 *  HW.Cookie.setCookie(   "c1","非URI字符#;还有特殊字符",  new Date().setMonth(new Date().getMonth()+1)    );
 *  var c1=HW.Cookie.getCookie("c1");
 *  console.log(c1);
 */

HW.Cookie = (function () {
    return{
        setCookie: function (name, value, expires, path, domain, secure) {
            var tmp = name + "=" +  HW.Tools.reEncondeURIComponent(value);
            if (expires) {
                tmp += ";expires=" + expires;
            }
            if (path) {
                tmp += ";path=" + path;
            }
            if (domain) {
                tmp += ";domain=" + domain;
            }
            if (secure) {
                tmp += ";secure";
            }
            document.cookie = tmp;
        },

        getCookie: function (str, cookieName) {
            var value = '';
            // alert(str);
            var tmp = str;

            // alert(tmp);
            var cookieArr = tmp.split("; ");
            var len = cookieArr.length;

            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var str = cookieArr[i];
                    if (str.search(/, /)) {
                        //console.log(str);
                        var str2 = str.split(", ");
                        for (var j = 0; j < str2.length; j++) {
                            var strArr = str2[j].split("=");
                            if (strArr[0] == cookieName) {
                                value = decodeURIComponent(strArr[1]);
                                break;
                            }
                        }

                    } else {
                        var strArr = str.split("=");
                        if (strArr[0] == cookieName) {
                            value = decodeURIComponent(strArr[1]);
                            break;
                        }
                    }


                }
            }
            return value;
        },

        delCookie: function (cookieName) {
            var d = new Date();
            d.setMonth(d.getMonth() - 1);
            document.cookie = cookieName + "=;  expires=" + d.toGMTString();
        }
    }
})();


/**
 * web端与 native端的交互的方法，
 * native需要传递给web数据，就调用web中事先准备好的js方法，如:HW.NativeJs.getDeviceInfo(data);
 * web调用native的就通过特定的url请求，如：<a href="showPage:{'typeId':1}">下载管理</a>
 */
HW.NativeJs = (function () {
    return {
        /**
         * 初始化设备信息   通过native获取设备数据，屏幕大小，设备分辨率
         * @param json  数据 ，格式如下
         * {
         *     "density":1.5,
         *     "width":480,
         *     "height":854,
         *     "deviceId":"SH24RW101994",
         *     "token":"abc123",
         *     "imei":"123456789012345"
         *     }
         *
         */
        setNativeInfo: function (json) {

            var tmp= HW.Tools.conveJson(json);
            HW.GlobalState.deviceInfo = $.extend(HW.GlobalState.deviceInfo,tmp);
            //alert(HW.GlobalState.deviceInfo.sdkVersion);
            //andorid 转场处理，android4.0以上设备才会有转场功能。
            if(HW.GlobalState.deviceInfo.sdkVersion*1>=14){
                $.mobile.defaultPageTransition  = 'slide';
            }
            //alert($.mobile.defaultPageTransition);
        },

        /**
         *native对话框接口
         **/
        showNativeAlert: function (json) {
            var tmp = HW.Tools.conveJson(json),
                type = tmp.type, message = tmp.message, status = tmp.status;
            if (type == 0) {
                simpleDialog.alert({content:message});
                if(status == 0) {
                    $.mobile.loading("hide");
                    clearTimeout(HW.GlobalState.timeoutId);
                    clearTimeout(HW.GlobalState.currentXHRTimeout);
                    HW.GlobalState.currentXHRTimeout = -1;
                }
            }else {
                simpleDialog.confirm({content:message});
            }
        },
        getStringDate:function(json){
            var _dom  =  HW.NativeJs.getStringDate['dom'];
            if(_dom){
                $(_dom).html(json)
            }
            return json;
        },

        /**
         * 初始化本地配置，首页加载后，native调用此方法，更新本地配置信息到全局变量中；
         */
        getSettingsResp:function(json){
            json = HW.Tools.conveJson(json);
            console.log(json);
            HW.GlobalState.appConifg.currentLang=json.locale;
            HW.GlobalState.appConifg.isWifiDownloaded=(json.wifi==0)?true:false;
            HW.GlobalState.appConifg.isSendLog=(json.errorLog==0)?true:false;
            HW.GlobalState.appConifg.jumpPage=(json.pageAfterLogin==0)?"index":"attention.html";


            console.log(HW.GlobalState.appConifg.currentLang+"  _-------------------------------------");
            console.log(HW.GlobalState.appConifg.jumpPage+"  _-------------------------------------");
            console.log(HW.GlobalState.appConifg.isWifiDownloaded+"  _-------------------------------------");
            console.log(HW.GlobalState.appConifg.isSendLog+"  _-------------------------------------");



            //native传入本地配置值后，调用一次语言切换；
            //alert("native 开始切换语言");
            switchLang($);
            HW.lang.replaceLocalString();
        },


        /**
         * 正常登录返回处理
         * 成功：保存用户信息；
         * 失败：提示登录失败；
         */
        postResp: function (json) {
//          console.log('zw=postResp=json='+json)
            json = HW.Tools.conveJson(json);

            //登录失败；
            if (json.statusCode != 200) {
                $.mobile.loading('hide');
                simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout')});
                return false;
            }

            // 更新cookie值；  ios可能使用  android无法设置cookie值。
            var str = json["header"]["Set-Cookie"];
            document.cookie = escape(str);

            //登录成功
            if (HW.Cookie.getCookie(str, "logFlag") == "in") {

                //存储用户名与ID给native使用。
                HW.GlobalState.user.nativeUserid=HW.GlobalState.user.userId;
                HW.GlobalState.nativeUserid=HW.GlobalState.user.userId;
                var nativeUserPwd=HW.GlobalState.user.userPwd;


                //更新用户ID与状态
                HW.GlobalState.user.userId=HW.Cookie.getCookie(str, "uid");
                HW.GlobalState.user.userPwd = '';
                HW.GlobalState.user.isSignIn = true;

                console.log("开始发送ajax请求，获取用户信息。用户名："+HW.GlobalState.user.userId);
                //发送ajax请求，请求用户数据，取到数据后，在回调函数中，交给native来保存内容
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: HW.GlobalState.baseUrl + "/userinfo/userinfo/submitUserInfo.json",
                    cache: false,
                    timeout:20000,
                    data: {
                        deviceid: "1234",
                        imeiid: "12345",
                        lang: HW.GlobalState.appConifg.currentLang,
                        userid: HW.GlobalState.user.userId
                    },
                    success: function (data) {
                        var p, e;
                        p = "10086";
                        e = "10000@qq.com";
                        //返回的用户结果为空时
                        if (data.body != null && data.body.user != null) {
                            p = data.body.user.telephone;
                            e = data.body.user.email;
                        }

                        if(HW.GlobalState.user.isAutoSignIn){
                            oSignTimes=setTimeout(function(){
                                clearTimeout(oSignTimes);
                                window.location.href ="autoLogin:";

                            },1500000)
                        }
                        //保存在全局变量中，给设置项的意见反馈使用；
                        HW.GlobalState.user.userPhone=p;
                        HW.GlobalState.user.userEmail=e;


                        var user = HW.GlobalState.user;
                        var href = 'saveUserInfo:{"name":"' + HW.GlobalState.user.nativeUserid + '","password":"' + nativeUserPwd + '","isSavePwd":' + user.isSavePwd + ',"isAutoSignIn":' + user.isAutoSignIn + ',"phone":"' + p + '","email":"' + e + '"}';

                        window.location.href = href;
                        //alert("登录成功") ;


                        //设置首页中登录按钮为我的空间
                        HW.Tools.btnChange();


                        //跳转回登录前的页面  signJumpPage页或首页；
                        setTimeout(function () {
                            $.mobile.loading('hide');

                            if (HW.GlobalState.signJumpPage.length > 0) {
                                $.mobile.changePage(HW.GlobalState.signJumpPage);

                                HW.GlobalState.signJumpPage="";
                                HW.GlobalState.signBackPage="";

                            } else if( HW.GlobalState.appConifg.jumpPage!="index") {
                                //跳转到关注页
                                HW.GlobalState.signJumpPage="";
                                HW.GlobalState.signBackPage="";
                                $.mobile.changePage(HW.GlobalState.appConifg.jumpPage);
                            }else{
                                //默认：登录后跳转到首页。
//                                HW.MenuBar.hideLeftBarClick();
                                $.mobile.back();
				        setTimeout(function(){
                                    HW.Index.init();
                                },100)

                            }
                        }, 500);

                    },

                    //超时处理
                    error:function(xhr, textStatus, errorThrown){
                        if(textStatus=="timeout" || errorThrown=="timeout") {
                            $.mobile.loading("hide");
                            simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout'),ok:function(){
                                xhr.abort();
                            }
                            });
                        }
                    }
                });


            } else {
                $.mobile.loading('hide');
                simpleDialog.alert({content:HW.lang.getLocalString('core_login_failed')});
            }
        },


        /**
         * 自动登录
         * 启动app时，native检查自动登录标识，如果要登录，则调用login进行自动登录；
         * 登录完成后，再回调 postResp2方法，处理登录状态，
         */
        login: function (json) {
            console.log(json)
            json = HW.Tools.conveJson(json);
            var uid=json.name;
            var pwd=encodeURIComponent(HW.Tools._SpecialSymbols(json.password));

            var href='postReq:{"url":"'+HW.GlobalState.signInUrl+HW.GlobalState.appConifg.currentLang+'" , "body":{"name":"'+uid+'","password":"'+pwd+'","isAutoSignIn":"true"},"header":{"Content-Type":"application/x-www-form-urlencoded","Connection":"keep-alive"} }';
            window.location.href = href;
        },


        /**
         * 自动登录完成后处理；
         */
        postResp2: function (json) {
            console.log(json)
            json = HW.Tools.conveJson(json);

            //更新cookie值；android不可用。ios可能使用。
            var str = json["header"]["Set-Cookie"];
            document.cookie = escape(str);


            //检测是否登录成功；
            try {
                if (HW.Cookie.getCookie(str, "logFlag") == "in") {
                    HW.GlobalState.user.isSignIn = true;
                    HW.GlobalState.user.userId=HW.Cookie.getCookie(str, "uid");
                    HW.GlobalState.user.nativeUserid=HW.GlobalState.user.userId;
                    oSignTimes=setTimeout(function(){
                        clearTimeout(oSignTimes);
                        window.location.href ="autoLogin:";

                    },1500000)
                    //更新首页中的我的空间按键
                    setTimeout(function(){
                        HW.Tools.btnChange();
                        HW.Index.init();
                    },100)

                    //跳转到关注页
                    if( HW.GlobalState.appConifg.jumpPage!="index") {
                        $.mobile.changePage("page/"+HW.GlobalState.appConifg.jumpPage);
                    }

                } else {
                    //alert("登录失败。。。") ;
                    simpleDialog.alert({
                        content:HW.lang.getLocalString('core_auto_login_failed'),
                        ok:function(){
                            $.mobile.changePage("page/signIn.html?from=index");
                        }
                    });

                }
            } catch (e) {

                $.mobile.changePage("page/signIn.html?from=index");
            }

        },


        /**
         * 手机上的物理返回按键功能
         * 去除对话框或回退
         */
        pageBack: function () {
            //去除对话框或回退

            if(simpleDialog.show()){
                simpleDialog.destroy();
            }
//            else if(HW.GlobalState.mobiscroller &&  HW.GlobalState.mobiscroller.scroller('isVisible')){
//                HW.GlobalState.mobiscroller.scroller('destroy');
//                $.mobile.back();
//                $.mobile.urlHistory.clearForward();
//            }
            else{
//                HW.MenuBar.hideLeftBarClick();
                $.mobile.back();
                $.mobile.urlHistory.clearForward();
            }
        },


        /**
         * 注销回调接口
         */
        logoutResp: function (json) {
            console.log(json);
            json = HW.Tools.conveJson(json);
            $.mobile.loading('hide');
            //注销失败
            if (json.statusCode != 200) {
                simpleDialog.alert({content:HW.lang.getLocalString('core_login_out_failed')});
                return;
            }

            var str = json["header"]["Set-Cookie"];
            document.cookie = escape(str);

            //注销成功，跳转回注册页---首页。
            if (HW.Cookie.getCookie(str, "logFlag") == "out") {


                HW.GlobalState.user.isSignIn = false;
                HW.GlobalState.user.userId="";

                //更新首页中的我的空间按键
                HW.Tools.btnChange();

                $.mobile.changePage($("#home"),{reverse:true});

                var href = 'clearUserInfo:{"name":"' + HW.GlobalState.user.userId + '"}';
                window.location.href = href;

                //注销成功，清除登录时间。
                HW.SignInTimeOut.clearSignInTime();


            } else {
                //alert("注销失败");
                simpleDialog.alert({content:HW.lang.getLocalString('core_login_out_failed')});
            }

        },
        //底部导航0:首页  1:知识库 2:视频 3:工具 4:期刊
        navigationBarReq:function(url,type){
            switch(type){
                case 0:
                    $.mobile.changePage($('#home'), {
                        transition: "none"
                    });
                    HW.GlobalState.HomePageUrl = url +"index.html";
                    break;
                case 1:
                    $.mobile.changePage(url +"page/knowledge.html",{
                        transition:"none"

                    });
                    HW.GlobalState.HomePageUrl = url +"page/knowledge.html";
                    break;
                case 2:
                    $.mobile.changePage(url +"page/video.html",{
                        transition:"none"

                    });
                    HW.GlobalState.HomePageUrl = url +"page/video.html";
                    break;
                case 3:
                    $.mobile.changePage(url +"page/toolsMake.html",{
                        transition:"none"
                    });
                    HW.GlobalState.HomePageUrl = url +"page/toolsMake.html";
                    break;
                case 4:
                    $.mobile.changePage(url +"page/dataDirect.html",{
                        transition:"none"
                    });
                    HW.GlobalState.HomePageUrl = url +"page/dataDirect.html";
                    break;
                default:
                    $.mobile.changePage(url +"index.html",{
                        transition:"none"
                    });
                    HW.GlobalState.HomePageUrl = url +"index.html";
                    break;
            }
        },


        //推送消自回调接口。
        jumpFocusPage:function(){
            var href=$("base").attr("href");
//            HW.MenuBar.hideLeftBarClick();

            //未登录进入，直接跳转到登录页，并设置登录成功后跳转页，
            if( !HW.GlobalState.user.isSignIn){

                //在首页的跳转路径不同一些。
                if( /index.html/.test(href) ){
                    $.mobile.changePage("page/signIn.html?from=index");
                } else{
                    HW.GlobalState.signJumpPage="attention.html";
                    HW.GlobalState.signBackPage=$("base").attr("href");
                    $.mobile.changePage("signIn.html");
                }

            }else{

                //登录则直接跳到关注页
                if( /index.html/.test(href) ){
                    $.mobile.changePage("page/attention.html");
                } else{
                    $.mobile.changePage("attention.html");
                }

            }
        },



        //网终状态检测，当native端检测到网络发生变化时，调用此方法，实时更新网络状态。
        netWorkChanged:function(json) {
            json = HW.Tools.conveJson(json);
            if(json.status==1 || json.status==2){
                HW.GlobalState.isInternet=true;
            }else{
                HW.GlobalState.isInternet=false;
            }
        },
        //文档内容详情意见
        feedbackReq:function(json){
            console.log(json);
            HW.GlobalState.nativeDocumentContent=json;
            HW.nativeDetailsView.nativeDocumentDetailsView();

        },
        //意见详情回复
        feedbackReqId:function(json){
            console.log(json);
            HW.GlobalState.nativeDocumentContentId=json;
            HW.nativeDetailsView.nativeFeedbackIds();

        }
    };
})();




//登录超时处理
HW.SignInTimeOut={

    //登录超时时间
    timeLength:HW.GlobalState.timeLength,

    /*
     获data1与data2的时间差值。
     interval ：D表示查询精确到天数的之差
     interval ：H表示查询精确到小时之差
     interval ：M表示查询精确到分钟之差
     interval ：S表示查询精确到秒之差
     interval ：T表示查询精确到毫秒之差
     使用方法:alert(dateDiff('D', new Date('2007/04/19'), new Date('2007/04/19')))；
     */
    dateDiff:function(interval, date1, date2){
        var objInterval = {'D' : 1000 * 60 * 60 * 24, 'H' : 1000 * 60 * 60, 'M' : 1000 * 60, 'S' : 1000, 'T' : 1};
        interval = interval.toUpperCase();
        try {
            return (date1.getTime()-date2.getTime())/(objInterval[interval]);
        }catch (e) {
            return e.message;
        }
    },


    //存储登录成功时间
    saveSignInTime:function(){
        if( ! HW.Cookie.getCookie(document.cookie, "signInTime")){
            HW.Cookie.setCookie("signInTime" , new Date() , new Date().setMonth(new Date().getDay()+1));
            console.log("存储登录成功时间");
        }
    },

    //清空登录成功时间
    clearSignInTime:function(){
        if( HW.Cookie.getCookie(document.cookie, "signInTime")){
            HW.Cookie.delCookie("signInTime");
            console.log("清空登录成功时间");
        }
    },








    //检测登录是否超时
    //通过时间差来检测，用户登录是否已超时。

    checkTimeOut:function(){
        //未登录不需要检测
        if(!HW.GlobalState.user.isSignIn){return false;}

        var isOut=false;
        var signInTime=HW.Cookie.getCookie(document.cookie,"signInTime");
        if(signInTime){
            var sTime=this.dateDiff('M', new Date(), new Date(signInTime));
            console.log("已登录时间: "+sTime+"   超时时间："+this.timeLength);

            //超时，提示用户登录超时，重新登录。清除登录时间。
            if(sTime>=this.timeLength){
                isOut=true;
                console.log("登录超时:"+(sTime-this.timeLength));
            }
        }
        return isOut;
    },



    //登录超时处理   切换登录按钮，登录状态改为未登录。
    //web:直接跳转到用户登录页，强制用户重新登录。注：web登录统一都跳转到首页
    //native:如果用户已勾选了记住密码，则调用原来的自动登录接口，进行自动登录  (即走一遍自动登录流程)
    timeOutHandle:function(){

        if(this.checkTimeOut()){

            HW.GlobalState.user.isSignIn=false;
            HW.Tools.btnChange();

            //web中
            if(HW.GlobalState.container=="browser"){
                var href=$("base").attr("href");
                if(/index.html/.test(href)  || !(/\.html/.test(href))){
                    console.log("登录超时，自动跳转到登录页");
                    $.mobile.changePage("page/signIn.html?from=index");
                }else{
                    HW.GlobalState.signBackPage=href;
                    $.mobile.changePage("signIn.html",{changeHash:false});
                }
            }

            //native中
            if(HW.GlobalState.container=="native"){
                try{
                    var pwd= localStorage.getItem("pwdRecord");
                    var id=localStorage.getItem("idRecord");
                    console.log("用户名:"+id);
                    console.log("密码:"+pwd);

                    /*        if( typeof id =="string" ){
                     //alert("有记住密码，则发送自动登录的请求  HW.NativeJs.login");
                     //var strObj='{"name":"'+id+'","password":"'+pwd+'"}';
                     //HW.NativeJs.login(strObj);
                     }else{*/
                    //没有记住密码，则直接跳转到登录页

                    var href=$("base").attr("href");
                    //alert(href);

                    if(/index\.html/.test(href)  || !(/\.html/.test(href))){
                        console.log("在首页时---登录超时，自动跳转到登录页");
                        $.mobile.changePage("page/signIn.html?from=index");
                    }else{
                        console.log("不在首页时---登录超时，自动跳转到登录页");
                        HW.GlobalState.signBackPage=href;
                        HW.GlobalState.signJumpPage=href;
                        $.mobile.changePage("signIn.html",{changeHash:false});
                    }
                    // }



                }catch(e){
                    console.log(e.message);
                }
            }

            //清除定时器，用户重登录后则又会重新开启，不登录也已经处于注销状态了(至少界面上是未登录状态，实际上是否真的已注销，并不能保证)。
            if(HW.GlobalState.signTimeOutid){
                console.log("登录超时，js端已为未登录状态，跳转到登录页后，清除定时器");
                clearInterval(HW.GlobalState.signTimeOutid);
            }

            //native中注销用户
            setTimeout(function(){
                window.location.href ='clearUserInfo:{"name":"' + HW.GlobalState.nativeUserid + '"}';
            },100);

        }



    }

}






/**
 *  native/browser环境初始化，用户登录状态，用户ID。
 */
HW.Init = (function () {
    /**
     * 页面所处的环境判断  native/browser
     */
    function getContainer() {
        var str = window.navigator.userAgent;
        if (str.search(/native/) > 0) {
            HW.GlobalState.container = "native";
        }else if($.os.ios && str.search(/safari/ig) <= 0) {
            HW.GlobalState.container = "native";
        }
    };


    /**
     * 加载首页时，检测用户是否已登录，更新用户信息
     */
    function checkIsSign() {
        try {
            if (HW.Cookie.getCookie(document.cookie, "logFlag") == "in") {
                HW.GlobalState.user.isSignIn = true;
                updateUser();


                /*                //登录成功 存储登录时间
                 HW.SignInTimeOut.saveSignInTime();

                 //立即检测一次
                 HW.SignInTimeOut.timeOutHandle();

                 //开始定时检测是否超时，10分钟检测一次
                 HW.GlobalState.signTimeOutid=setInterval(function(){
                 HW.SignInTimeOut.timeOutHandle();
                 },1000*1*10);*/

            }else{
                //未登录，清除登录时间。
                HW.SignInTimeOut.clearSignInTime();
            }
        }catch (e) { }
    }


    /**
     * 更新用户ID
     */
    function updateUser() {
        try {
            var uid = HW.Cookie.getCookie(document.cookie, "uid");
            HW.GlobalState.user.userId = uid ? uid : HW.GlobalState.user.userId;
            //alert(HW.GlobalState.user.userId);
        } catch (e) { }
    };


    //全局状态存储对象 初始化操作；
    getContainer();
    checkIsSign();

})();


/**
 * 字符串的连接处理
 */
function StringBuffer() {
    this._strings = new Array();
};
StringBuffer.prototype.append = function (str) {
    this._strings.push(str);
};
StringBuffer.prototype.toString = function () {
    return this._strings.join("");
};
/**
 * 日期转换为指定格式的字符串<br>
 * 格式:<br>
 * YYYY/yyyy/YY/yy 表示年份<br>
 * MM/M 月份 <br>
 * W/w 星期 <br>
 * dd/DD/d/D 日期 <br>
 * hh/HH/h/H 时间 <br>
 * mm/m 分钟<br>
 * ss/SS/s/S 秒<br>
 *
 * @param formatStr
 *            格式化模板
 * @returns 返回格式化后的字符串
 */
Date.prototype.FormatToString = function (formatStr) {
    var str = formatStr;
    var Week = [ '日', '一', '二', '三', '四', '五', '六' ];

    str = str.replace(/yyyy|YYYY/, this.getFullYear());
    str = str.replace(/yy|YY/,
        (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString()
            : '0' + (this.getYear() % 100));

    str = str.replace(/MM/, this.getMonth() > 8 ? (this.getMonth() + 1).toString()
        : '0' + (this.getMonth() + 1));
    str = str.replace(/M/g, (this.getMonth() + 1));

    str = str.replace(/w|W/g, Week[this.getDay()]);

    str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString()
        : '0' + this.getDate());
    str = str.replace(/d|D/g, this.getDate());

    str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString()
        : '0' + this.getHours());
    str = str.replace(/h|H/g, this.getHours());
    str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes()
        .toString() : '0' + this.getMinutes());
    str = str.replace(/m/g, this.getMinutes());

    str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds()
        .toString() : '0' + this.getSeconds());
    str = str.replace(/s|S/g, this.getSeconds());

    return str;
};

var simpleDialog = (function ($) {
    function Dialog() {

        if(Dialog.show()) return false;

        /*
         *@param {Object} {title:‘提示信息’，content:'信息'，buttons:[{text:"确定“，callback:fun}]|{text:"确定“，callback:fun}}
         */
        var options = arguments[0] && typeof arguments[0] == "object" ? arguments[0] : {},
            $buttons, $button, $btext, $temp, i, len, strDiv = '', text,
            nbrdTimeout0,
            nbrdTimeout1;
        options['title'] || (options['title'] = HW.lang.getLocalString('core_alert_tips'));
        options['content'] || (options['content'] = '  ');
        options['modal'] || (options['modal'] = true);
        options['buttons'] || ( options['buttons'] = [
            {text: HW.lang.getLocalString('core_alert_confirm'), callback: function () {
            }}
        ])

        if ({}.toString.call(options['buttons']) === '[object Object]') {
            options['buttons'] = [options['buttons'] ];
        }

        $buttons = $('<div></div>', {'class': 'dialog-buttons'});
        for (var i = 0, len = options['buttons'].length; i < len; i++) {
            (function (i) {
                $btext = $('<div class="dialog-button-text"></div>').html(options['buttons'][i].text);
                if(len===1){var oClass="dialog-button dialogBtna"}else{oClass="dialog-button"}
                $button = $('<div class="'+oClass+'"></div>').addClass(options['buttons'][i].ct || '')
                    .append($btext).click(function () {
                        if (typeof options['buttons'][i].callback == "function")
                            options['buttons'][i].callback(this, options['buttons'][i].text);
                        nbrdTimeout0 =  setTimeout(function(){
                            HW.Tools.navigationBarReqDisplay('1');
                            clearTimeout(nbrdTimeout0);
                        },500);
                        $('#dialogLockScreen').remove();
                        $('#dialogBoxWindow').remove();
                    })
            })(i)

            $buttons.append($button);
        }
        strDiv += '<div id="dialogBoxWindow" class="dialog"><div class="dialog-title hide">' + options['title'];
        strDiv += '</div><div class="dialog-content">' + options['content'];
        strDiv += '</div> </div>';
        $temp = $(strDiv).append($buttons);
        if (options['showBefore'] && typeof options['showBefore'] == 'function')
            options['showBefore']($temp);
        options['modal'] && $('body').append('<div id="dialogLockScreen"></div>');
        nbrdTimeout1 = setTimeout(function(){
            HW.Tools.navigationBarReqDisplay('0');
            clearTimeout(nbrdTimeout1);
        },500);
        $('body').append($temp);
        if (options['showAfter'] && typeof options['showAfter'] == 'function')
            options['showAfter']($temp);
        Dialog.setCenter($temp);
    }

    $(window).resize(function () {
        var $dialogBoxWindow = $("#dialogBoxWindow");
        if ($dialogBoxWindow.length) {
            Dialog.setCenter($dialogBoxWindow);
        }

    });
    Dialog.setCenter = function (w) {
        var dh = HW.Tools.getStyle($("body")[0],"height").replace(/px/g,"");
        var dw = $(document).width();
        //dh = $(document).innerHeight()
        w.css("left", (dw / 2 - (w.width()) / 2) + "px");
        w.css("top", (dh / 2 - (w.height()) / 2) + "px");


    }
    Dialog.destroy = function(){
        if($('#dialogLockScreen').length){
            $('#dialogLockScreen').remove();
            $('#dialogBoxWindow').remove();
        }
    }
    Dialog.show = function(){
        return !!$('#dialogBoxWindow').length;
    }
    Dialog.alert = function (opts) {
        //{content:"",ok:callback}

        var emptyFn = function () {
            },
            settings = {title: HW.lang.getLocalString('core_alert_tips'), modal: true, buttons: [
                {text: HW.lang.getLocalString('core_alert_confirm'), callback: emptyFn}
            ]};
        if (opts.ok && typeof opts.ok == 'function') {
            settings.buttons[0].callback = opts.ok;
            delete opts.ok;
        }

        settings = $.extend(settings, opts || {});
        Dialog(settings);

    };
    Dialog.confirm = function (opts) {
        //{content:"",buttons:{ok:callback,cancel:callback}}
        var emptyFn = function () {
            },
            settings = {title: HW.lang.getLocalString('core_alert_tips'), modal: true, buttons: [
                {text: HW.lang.getLocalString('core_alert_cancel'), callback: emptyFn, ct: 'cancel'},
                {text: HW.lang.getLocalString('core_alert_confirm'), callback: emptyFn, ct: 'ok'}
            ]};
        if (opts.buttons && typeof opts.buttons == 'object') {
            if (opts.buttons.ok && typeof opts.buttons.ok == 'function') {
                settings.buttons[1].callback = opts.buttons.ok;
            }
            if (opts.buttons.cancel && typeof opts.buttons.cancel == 'function') {
                settings.buttons[0].callback = opts.buttons.cancel;
            }
            delete opts.buttons;
        }
        $.extend(settings, opts || {});
        Dialog(settings);
    };
    return Dialog;

})(jQuery);


var hoverBtn=function(){
    if (HW.GlobalState.container == "native") {
        $(".btn-left").bind("tap taphold",function(){
            $(this).addClass("btn-leftH");
            var oThisa=$(this);
            setTimeout(function(){
                oThisa.removeClass("btn-leftH");
            },200)
        });
        $(".btn-right").bind("tap taphold",function(){
            $(this).addClass("btn-rightH");
            var oThisr=$(this);
            setTimeout(function(){
                oThisr.removeClass("btn-rightH");
            },400)
        });
        $(".btns-log").bind("tap taphold",function(){
            $(this).addClass("btns-logH");
            var oThisb=$(this);
            setTimeout(function(){
                oThisb.removeClass("btns-logH");
            },200)
        });
        $(".btn-back").bind("tap taphold",function(){
            $(this).addClass("btn-backH");
            var oThisc=$(this);
            setTimeout(function(){
                oThisc.removeClass("btn-backH");
            },200)
        });
    }


}







