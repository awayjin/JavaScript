/**
 * 常量存储对象
 * @type {HW.Contacts} 常量存储对象，不改变资源或是ID调设置在此处
 */
HW.Contacts = {};

HW.Contacts.Page = {
    //下载状态标示
    DownloadStatusType: {
        FINISH: {
            code: 0,
            text: 'download_manager_finished',
            iconClass: "",
            statusTextClass: ""
        },
        DOWNLOADING: {
            code: 1,
            text: 'download_manager_loading',
            iconClass: "play_icon_ltt",
            statusTextClass: "sate_ltt red"
        },
        WAITTING: {
            code: 2,
            text: 'download_manager_wait',
            iconClass: "watting_icon_ltt",
            statusTextClass: "sate_ltt gry"
        },
        SUSPEND: {
            code: 3,
            text: 'download_manager_stop',
            iconClass: "pause_icon_ltt",
            statusTextClass: "sate_ltt gre"
        },
        FAILED: {
            code: 4,
            text: 'download_manager_failed',
            iconClass: "loading-off",
            statusTextClass: "sate_ltt red"
        }
    }
};
HW.Contacts.RequestStrings = {
    Download: {
        //下载列表分页数
        PAGE_SIZE: 20,
        //获取下载列表数据接口名
        RQSTR_GETDOWNLOADLIST: "getDownloadList:",
        //改变下载状态接口名
        RQSTR_CHANGEDOWNLOADSTATUS: "changeDownloadStatus:",
        //删除下载数据接口名
        RQSTR_DELDOWNLOADDATA: "delDownloadData:",
        //删除所有下载数据接口名
        RQSTR_DELALLDOWNLOADDATA: "delAllDownloadData:",
        //打开文件接口名
        RQSTR_OPENFILE: "openFile:",
        //检查SD卡是否可用
        RQSTR_CHECKSDCARDISAVAILABLE:"checkSDCardIsAvailable:",
        //已完成下载数据标识
        TYPE_FINISH: 1,
        //正在下载数据标示
        TYPE_DOWNLOADING: 2
    },
    Favorite: {
        //我的收藏列表分页数
        PAGE_SIZE: 20,
        //获取收藏列表数据接口名
        RQSTR_GETFAVORITELIST: "getFavoriteList:",
        //删除收藏列表接口名
        RQSTR_DELFAVORITEDATA: "delFavoriteData:"
    },
    Other: {
        //获取用户信息接口名
        RQSTR_GETUSERINFO: "getUserInfo:",
        //发送邮件接口名
        RQSTR_SENDEMAIL: "sendEmail:",
        //拨打服务电话接口名
        RQSTR_CALLSERVICEPHONE: "tel:"
    }
}

HW.Nativ.DownloadManager = (function () {
    /**
     * 是否是编辑状态
     * @type {boolean}
     * @private
     */
    var _isEdit = false;
    var _isAvailable = true;
    //对话框是否已弹出
    var _isDialogShow = false;
    var downloading_scroll = null, finish_scroll = null;
    /**
     * 生成已完成列表项函数
     *
     * @param item
     *            列表项数据
     */
    var _makeFinishListItem = function (item) {
        var dateTime = HW.Tools.secondDateToString(item.date, "yyyy/MM/dd hh:mm:ss");
        var totalStr = _getTotal(item.total);
        var itemHtml = new StringBuffer();
        //var typeIcon = _getTypeIcon(item.typeId);
        itemHtml.append('<li id="li_01_');
        itemHtml.append(item.id);
        itemHtml.append('">');
        itemHtml.append("<a onClick='HW.Nativ.DownloadManager.openFile(");
        itemHtml.append("\"" + item.name + "\"," + item.typeId);
        itemHtml.append(")' ><div onClick=\"HW.Nativ.DownloadManager.delClick(this)\" id=cb_01_");
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append('</div><div>');
        itemHtml.append(item.name);
        itemHtml.append('<span>(');
        itemHtml.append(totalStr);
        itemHtml.append(')</span></div>')
        itemHtml.append('<div class="time_ltt">');
        itemHtml.append(dateTime);
        itemHtml.append('</div></a></li>');
        return itemHtml;
    };
    /**
     * 生成正在下载列表项函数
     *
     * @param item
     *            列表项数据
     */
    var _makeDownloadingListItem = function (item) {
        var dateTime = HW.Tools.secondDateToString(item.date, "yyyy/MM/dd hh:mm:ss");
        var totalStr = _getTotal(item.total);
        var downloadPercent = _getDownloadPercent(item.total, item.down);
        var statusStr = _getDownloadStatusStr(item.status);
        var statusImg = _getDownloadStatus(item.status);
        var statusStyle = _getDownloadStatusStyle(item.status);
        //var typeIcon = _getTypeIcon(item.typeId);
        //var progressStyle = _getProgressStyle(item.status);
        var itemHtml = new StringBuffer();

        itemHtml.append('<li status=');
        itemHtml.append(item.status);
        itemHtml.append(' id=li_02_');
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append('<a><div onClick="HW.Nativ.DownloadManager.delClick(this)" id=cb_02_');
        itemHtml.append(item.id);
        itemHtml.append('></div><div class="info">');
        itemHtml.append(item.name);
        itemHtml.append('</div>');
        itemHtml.append('<label class="totalSize_ltt" id="totalSize_02_"');
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append(totalStr);
        itemHtml.append('</label>');
        itemHtml.append('<div id="statusStyle_02_');
        itemHtml.append(item.id);
        itemHtml.append('" class="');
        itemHtml.append(statusStyle);
        itemHtml.append('"><label id=statusStr_02_');
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append(statusStr);
        itemHtml.append('</label>&nbsp;');
        itemHtml.append('<label id=dPercent_02_');
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append(downloadPercent);
        itemHtml.append('</label></div>');
        itemHtml.append('<div class="time_ltt">');
        itemHtml.append(dateTime);
        itemHtml.append('</div><div id=img_02_');
        itemHtml.append(item.id);
        itemHtml.append(' onClick="HW.Nativ.DownloadManager.playClick(this)" class="');
        itemHtml.append(statusImg);
        itemHtml.append('"></div>');
        itemHtml.append('</a></li>');
        return itemHtml;
    };
    /**
     *    获取文件类型图标
     *
     * @param type
     *            文件类型标识
     *
    var _getTypeIcon = function (type) {
        var icons = [
            {
                type: 1,
                icon: "pdf-icon"
            },
            {
                type: 2,
                icon: "epub-icon"
            }
        ];
        var typeIcon = "pdf-icon";
        if (type == icons[0].type) {
            typeIcon = icons[0].icon;
        } else {
            typeIcon = icons[1].icon;
        }
        return typeIcon;
    };
    */

    /**
     *    根据下载状态获取相应的下载进度栏风格
     *
     * @param type
     *            文件类型标识
     *
    var _getProgressStyle = function (type) {
        if (type == 1) {
            return "tj-icon";
        } else {
            return "tj-icon-g";
        }
    };
     */

    /**
     * 文件大小转换（B=>KB/MB）函数
     *
     * **/
    var _getTotal = function (total) {
        var returnStr = total / 1024;
        if (returnStr >= 1024) {
            returnStr = total / (1024 * 1024);
            return returnStr.toFixed(2) + "MB";
        }
        return returnStr.toFixed(2) + "KB"
    };
    /**
     * 计算下载百分比取整函数
     *
     */
    var _getDownloadPercent = function (total, down) {
        return down == 0 ? "0%" : parseInt((down / total * 100)).toFixed(0) + "%";
    };
    /**
     * 下载状态转换成文字显示函数
     *
     * @param status
     *            下载状态标识 （0：下载完成1：下载中2：等待下载3：已暂停4: 下载失败）
     * **/
    var _getDownloadStatusStr = function (status) {
        var returnStr;
        switch (status) {
            case HW.Contacts.Page.DownloadStatusType.FINISH.code:
                returnStr = HW.lang.getLocalString(HW.Contacts.Page.DownloadStatusType.FINISH.text);
                break;
            case HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code:
                returnStr = HW.lang.getLocalString(HW.Contacts.Page.DownloadStatusType.DOWNLOADING.text);
                break;
            case HW.Contacts.Page.DownloadStatusType.WAITTING.code:
                returnStr = HW.lang.getLocalString(HW.Contacts.Page.DownloadStatusType.WAITTING.text);
                break;
            case HW.Contacts.Page.DownloadStatusType.SUSPEND.code:
                returnStr = HW.lang.getLocalString(HW.Contacts.Page.DownloadStatusType.SUSPEND.text);
                break;
            case HW.Contacts.Page.DownloadStatusType.FAILED.code:
                returnStr = HW.lang.getLocalString(HW.Contacts.Page.DownloadStatusType.FAILED.text);
                break;
        }
        return returnStr;
    };
    /**
     * 获取下载状态对应的图标函数
     *
     * @param status
     *            下载状态标识 （0：下载完成 1：下载中 2：等待下载 3：已暂停4: 下载失败）
     */
    var _getDownloadStatus = function (status) {
        var returnStr;
        switch (status) {
            case HW.Contacts.Page.DownloadStatusType.FINISH.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.FINISH.iconClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.SUSPEND.iconClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.WAITTING.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.WAITTING.iconClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.SUSPEND.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.iconClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.FAILED.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.iconClass;
                break;
        }
        return returnStr;
    };
    /*
    * 获取下载状态对应的状态样式函数
    *
    * @param status
    *            下载状态标识 （0：下载完成 1：下载中 2：等待下载 3：已暂停4: 下载失败）
    * */
    var _getDownloadStatusStyle = function (status) {
        var returnStr;
        switch (status) {
            case HW.Contacts.Page.DownloadStatusType.FINISH.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.FINISH.statusTextClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.SUSPEND.statusTextClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.WAITTING.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.WAITTING.statusTextClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.SUSPEND.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.statusTextClass;
                break;
            case HW.Contacts.Page.DownloadStatusType.FAILED.code:
                returnStr = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.statusTextClass;
                break;
        }
        return returnStr;
    };
    /**
     * 按关键字搜索已完成列表
     * */
    var _searchChanged = function () {
        if(!_isAvailable) return;
        var key = $("#downloadManagerSearchKey")[0].value;
        if (key.trim() == "") {
            simpleDialog.alert({content: HW.lang.getLocalString('download_search_msg')});
            return false;
        }
        HW.Tools.setLocalStorage("downloadHistoryRecord", {"key": key}, 100, "key");
        _getDataList(HW.Contacts.RequestStrings.Download.TYPE_FINISH, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE, key);
        _cleanListView("finishList");
    };

    /**
     * 显示搜索历史记录-
     */
    var _showSearchRecordList = function () {
        //要搜索的数据，从存储的localStrage中获取；
        var data = [];
        var localData = HW.Tools.getLocalStorage("downloadHistoryRecord");
        if (!$.isArray(localData)) {
            return;
        }
        var len = localData.length;
        if (len == 0) {
            return;
        } else {
            for (var i = 0; i < len; i++) {
                var obj = localData[i];
                data.push(obj["key"]);
            }
            // console.log(data);
            $("#downloadManagerSearchKey").autocomplete(data, {
                max: 5,
                selectFirst: false,
                highlight: false,
                multipleSeparator: "",
                delay: 100
            });
        }

    }


    /**
     * 编辑
     */
    var _editClick = function () {
        _isEdit = true;

        $("#finishWrapper").removeClass().addClass("edit-top");

        $("#downloadingList").addClass("del_model");
        $("div[id*=cb_]").addClass("del");

        $("div[id*=img_02]").hide();
        $(".pro_search_ltt").hide();
        $("#editBtn").hide();
        $("#homeBtn").hide();

        $('#delAllBtn').show();
        $("#backBtn").show();

        if ($("#finishList li:nth-last-child(1)").text().indexOf(HW.lang.getLocalString('download_manager_more')) != -1) {
            $("#finishList li:nth-last-child(1)").remove();
            finish_scroll.refresh();
        }
        if ($("#downloadingList li:nth-last-child(1)").text().indexOf(HW.lang.getLocalString('download_manager_more')) != -1) {
            $("#downloadingList li:nth-last-child(1)").remove();
            downloading_scroll.refresh();
        }
    };
    /**
     * 清空当前页面所以数据
     */
    var _delAllClick = function () {
        //对话框已显示，则退出。不可重复显示。
        if(_isDialogShow) return;
        _isDialogShow = true;
        $("#isDelFile").removeClass("dot_btn").addClass("dot_btn_off");
        _dialogShowOrHide('show', true, -1, HW.lang.getLocalString('download_manager_del_data'));
    };
    /**
     * 返回
     **/
    var _backClick = function () {
        _isEdit = false;
        var index = $('.navbar_ltt li a.on')[0].id.substr(6);
        if (index == "1") {
            $(".pro_search_ltt").show();
        }
        $("#finishWrapper").removeClass().addClass("finishWrapperStyle");

        if(index == "2"){
            $("#downloadingList").removeClass("del_model");
        }
        $("div[id*=cb_]").removeClass("del");

        $('#delAllBtn').hide();
        $("#backBtn").hide();

        $("#homeBtn").show();
        $("div[id*=img_02]").show();
        $("#editBtn").show();
        $.mobile.changePage
        if (index == "1") {
            _cleanListView("finishList");
            var key = $("#downloadManagerSearchKey")[0].value;
            _getDataList(HW.Contacts.RequestStrings.Download.TYPE_FINISH, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE, key);
        } else {
            _cleanListView("downloadingList");
            _getDataList(HW.Contacts.RequestStrings.Download.TYPE_DOWNLOADING, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE);
        }
    };
    /**
     *    确认删除
     *  */
    var _confirmDelClick = function (param) {
        _isDialogShow = false;
        var tempIds = new Array();
        //是否删除本地文件，0：删除；1：不删除
        var delFileFlag = $("#isDelFile div").hasClass("dot_btn") ? 0 : 1;
        var index = $('.navbar_ltt li a.on')[0].id.substr(6);
        if (param.isAllFlag) {
            $.each($("div[id*=cb_0" + index + "]"), function (k, v) {
                var delId = parseInt(v.id.substr(6));

                $("#cb_0" + index + "_" + delId).attr("isdel", 1);

                var reqsJsonStr = {
                    type: index,
                    delFile: delFileFlag
                };
                location.href = HW.Contacts.RequestStrings.Download.RQSTR_DELALLDOWNLOADDATA +  HW.Tools.reEncondeURIComponent($.toJSON(reqsJsonStr));
            });
        } else {
            $("#cb_0" + index + "_" + param.itemId).attr("isdel", 1);
            tempIds.push({
                id: param.itemId,
                delFile: delFileFlag
            });
            var idList = {
                idList: tempIds
            };
            location.href = HW.Contacts.RequestStrings.Download.RQSTR_DELDOWNLOADDATA +  HW.Tools.reEncondeURIComponent($.toJSON(idList));
        }
        _dialogShowOrHide('hide');
    };
    /**
     *  菜单界面切换
     * @param curMenuId     --当前tab菜单Id
     * @param oldMenuId     --旧tab菜单Id
     * @param curIndex      --当前tab菜单编号
     * @param oldIndex      --旧tab菜单编号
     * @private
     */
    var _changeMenu = function (curMenuId, oldMenuId, curIndex, oldIndex) {
        //navBar样式切换
        $("#menu_0" + oldIndex).removeClass("on");
        $("#menu_0" + curIndex).addClass("on");

        $("#" + curMenuId).show();
        $("#" + oldMenuId).hide();
        var count = $("#" + curMenuId + " li").length;
        if (count <= 0) {
            $("#editBtn").hide();
            $("#delAllBtn").hide();
        } else {
            if (_isEdit) {
                $("#delAllBtn").show();
            }
            else {
                $("#editBtn").show();
            }
        }
    };
    /**
     * 菜单切换
     **/
    var _tabMenuClick = function (event) {
        var currentMenu = event;
//        if (currentMenu.id == $('.navbar_ltt li a.on')[0].id)
//            return;

        if (currentMenu.id == "menu_01") {
            _changeMenu("finishPart", "downloadingPart", 1, 2);

            if (_isEdit) {
                if(finish_scroll != null){
                    finish_scroll.refresh();
                }
                return;
            }

            //非编辑状态下，已完成列表显示搜索栏
            $(".pro_search_ltt").show();

            $("#downloadManagerSearchKey").val("");
            $("#downloadManagerSearchKey").next(".close").hide();

            if(!_isAvailable){
                return;
            }
            _cleanListView("finishList");
            _getDataList(HW.Contacts.RequestStrings.Download.TYPE_FINISH, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE, "");


        } else {
            _changeMenu("downloadingPart", "finishPart", 2, 1);

            //正在下载界面，隐藏搜索栏
            $(".pro_search_ltt").hide();

            if (_isEdit) {
                if(downloading_scroll != null){
                    downloading_scroll.refresh();
                }
                return;
            }
            if(!_isAvailable){
                return;
            }
            _cleanListView("downloadingList");
            _getDataList(HW.Contacts.RequestStrings.Download.TYPE_DOWNLOADING, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE);

        }
    };
    /**
     *更多按钮事件（获取下页数据）
     *
     *  */
    var _getMoreData = function () {
        var index = $('.navbar_ltt li a.on')[0].id.substr(6);
        var key = "";
        var itemId = 0;
        var type;
        if (index == "1") {
            if ($("#finishList li:nth-last-child(2)")[0] != undefined) {
                itemId = parseInt($("#finishList li:nth-last-child(2)")[0].id.substr(6));
            }
            type = HW.Contacts.RequestStrings.Download.TYPE_FINISH;
            key = $("#downloadManagerSearchKey")[0].value;
        }
        if (index == "2") {
            if ($("#downloadingList li:nth-last-child(2)")[0] != undefined) {
                itemId = parseInt($("#downloadingList li:nth-last-child(2)")[0].id.substr(6));
            }
            type = HW.Contacts.RequestStrings.Download.TYPE_DOWNLOADING;
        }
        _getDataList(type, itemId, HW.Contacts.RequestStrings.Download.PAGE_SIZE, key);
    };
    /**
     * 清空列表数据
     *
     *  */
    var _cleanListView = function (lvId) {
        $('#' + lvId).empty();
    };
    /**
     *执行删除操作
     */
    var _delExecute = function (data, isAllFlag) {
        var index = $('.navbar_ltt li a.on')[0].id.substr(6);
        if (data.rcode == -1) {
            $.each($("div[id*=cb_0" + index + "]"), function (k, v) {
                var itemId = parseInt(v.id.substr(6));
                for (var i = 0; i < data.errorMsg.length; i++) {
                    if (data.errorMsg[i].id == itemId) {
                        $("#cb_0" + index + "_" + itemId).attr("isdel", 0);
                        break;
                    }
                }
            });
        }
        _delDataItems();
        if (isAllFlag) {
            if (index == "1") {
                $("#finishTotal").text(0);
            } else if (index == "2") {
                $("#downloadingTotal").text(0);
            }
        }
        var count = index == "1" ? $("#finishList li").length : $("#downloadingList li").length ;
        if(count <= 0){
            $("#delAllBtn").hide();
        }
    }
    /**
     *  删除选中的数据项
     *  */
    var _delDataItems = function () {
        var index = $('.navbar_ltt li a.on')[0].id.substr(6);
        $.each($("div[id*=cb_0" + index + "]"), function (k, v) {
            var isdel = $("#" + v.id).attr("isdel");
            if (isdel == 1) {
                var itemId = parseInt(v.id.substr(6));
                if (index == "1") {
                    $("#finishList li[id=li_01_" + itemId + "]").remove();
                    var total = parseInt($("#finishTotal").text());
                    $("#finishTotal").text(total - 1);
                    finish_scroll.refresh();
                }
                if (index == "2") {
                    $("#downloadingList li[id=li_02_" + itemId + "]").remove();
                    var total = parseInt($("#downloadingTotal").text());
                    $("#downloadingTotal").text(total - 1);
                    downloading_scroll.refresh();
                }
            }
        });
    };
    /**
     * 获取数据
     */
    var _getDataList = function (t, cId, pSize, key) {
        $.mobile.loading("show");
        var json = {
            type: t,
            curIdx: cId,
            pageSize: pSize,
            keywords: key
        };
        location.href = HW.Contacts.RequestStrings.Download.RQSTR_GETDOWNLOADLIST +  HW.Tools.reEncondeURIComponent($.toJSON(json));
    };
    /**
     * 是否删除本地文件选项点击事件
     * @private
     */
    var _isDelFileClick = function () {
        if ($("#isDelFile div").hasClass("dot_btn_off")) {
            $("#isDelFile div").removeClass("dot_btn_off").addClass("dot_btn");
        } else {
            $("#isDelFile div").removeClass("dot_btn").addClass("dot_btn_off");
        }
    };
    /**
     * 显示（隐藏）删除确认对话框，并绑定（移除）删除按钮的click事件
     * @param status       --显示状态  （"show"/"hide"）
     * @param isAll                 --是否是清空  （true/false）
     * @param id                    --删除项的ID（如果是清空，此项为-1）
     * @private
     */
    var _dialogShowOrHide = function (status, isAll, id) {
        if (status == "show") {
            var title = HW.lang.getLocalString('download_manager_ask_del_opt');
            if(isAll){
                title = HW.lang.getLocalString('download_manager_ask_clear_opt');
            }
            var opt = {
                content: '<div class="line"><h4>' + title + '</h4>' +
                    '<a id="isDelFile" href="#"><div class="dot_btn_off"></div>' + HW.lang.getLocalString('download_manager_del_local_file') + '</a></div>',
                buttons: [
                    {text: HW.lang.getLocalString('cancel'), ct: "cancel", callback: function () {
                        _isDialogShow = false;
                    }},
                    {text: HW.lang.getLocalString('myFavorites_delete'), ct: "ok", callback: function () {
                        _delBindClick({isAllFlag: isAll, itemId: id})
                    }}
                ],
                showAfter: function () {
                    $('#isDelFile').bind("click", _isDelFileClick);
                }
            }
            simpleDialog(opt);
        }
    };
    /**
     * 删除按钮单击绑定事件
     * @param param   绑定事件的参数
     * @returns {Function}
     * @private
     */
    var _delBindClick = function (param) {
        // return function () {
        _confirmDelClick(param);
        // };
    };
    /**
     * 初始化界面以及绑定事件
     * @private
     */
    var _initPageElm = function () {

        $("#editBtn").hide();
        $("#downloadingPart").hide();
        $("#backBtn").hide();
        $("#delAllBtn").hide();
        HW.lang.replaceLocalString();
    };
    var _initEvent= function(){
        $("#editBtn").click(_editClick);
        $("#backBtn").click(_backClick);
        $("#delAllBtn").click(_delAllClick);
        $("a[id*='menu']").click(function () {
            _tabMenuClick(this);
        });
        //搜索文本框事件触发绑定（按回车键触发事件）
        $("#downloadManagerSearchKey").keydown(function (e) {
            if (e.keyCode == 13) {
                _searchChanged();
                $("#downloadManagerSearchKey").blur(); //让搜索框失去焦点，收起键盘。
            }
        });
    }
    /**
     * 更新当前页面数据
     * @param curListId          --当前列表Id
     * @param contentHtml        --列表数据的dom字符串
     * @param totalCount         --列表总条数
     * @private
     */
    var _updateList = function (curListId, contentHtml, totalCount) {
        if ($("#" + curListId + " li:last-child").length > 0) {
            $("#" + curListId + " li:last-child")[0].outerHTML = contentHtml.toString();
        } else {
            $("#" + curListId).html(contentHtml.toString());
        }
        //当前页面数据少于总条数时，显示更多按钮
        var count = $("#" + curListId + " li").length;
        if (totalCount > count) {
            $("#" + curListId).append("<li><div class=moreBtn ><a data-role='button' data-inline='true'>" + HW.lang.getLocalString('download_manager_more') + "...</a></div></li>")
        }
    };
    /**
     * 检查SD卡或手机存储容量是否可用。
     * @private
     */
    var _checkSDCard = function(){
        location.href = HW.Contacts.RequestStrings.Download.RQSTR_CHECKSDCARDISAVAILABLE;
    }

    return {        //Core中注册对象
        pageConfig: {
            name: "navDownloadMgr",
            id: "navDownloadMgr"
        },
        //初始化
        init: function () {
            /*
            $(document).undelegate("#navDownloadMgr", "pageshow").delegate("#navDownloadMgr", "pageshow", function () {
                finish_scroll = HW.Tools._addiScroll("finishWrapper", "finish_outter", 0, 0, 0, 0);
                downloading_scroll = HW.Tools._addiScroll("downloadingWrapper", "downloading_outter");
                finish_scroll.refresh();
            });
            */
            _initPageElm();
            _initEvent();
            _showSearchRecordList();
            _checkSDCard();
            setTimeout(function(){HW.Tools.myMenuBottom('1')},500);
        },
        /**
         *    单条数据删除事件
         *  */
        delClick: function (event) {
            //对话框已显示，则退出。不可重复显示。
            if (_isDialogShow) return;
            _isDialogShow = true;
            var chBox = event;
            var itemId = parseInt(chBox.id.substr(6));
            $("#isDelFile").removeClass("dot_btn").addClass("dot_btn_off");
            _dialogShowOrHide('show', false, itemId);
        },
        /**
         * 更改下载状态
         **/
        playClick: function (event) {
            var img = event;
            var itemId = parseInt(img.id.substr("img_02_".length));
            var status = parseInt($("#li_02_" + itemId).attr("status"));
            var itemStatus;
            switch (status) {
                case HW.Contacts.Page.DownloadStatusType.FINISH.code:
                    itemStatus = HW.Contacts.Page.DownloadStatusType.FINISH.code;
                    break;
                case HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code:
                case HW.Contacts.Page.DownloadStatusType.WAITTING.code:
                    itemStatus = HW.Contacts.Page.DownloadStatusType.SUSPEND.code;
                    break;
                case HW.Contacts.Page.DownloadStatusType.SUSPEND.code:
                    itemStatus = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code;
                    break;
                case HW.Contacts.Page.DownloadStatusType.FAILED.code:
                    itemStatus = HW.Contacts.Page.DownloadStatusType.DOWNLOADING.code;
                    break;
//                return;
            }
            var json = {
                id: itemId,
                status: itemStatus
            }
            location.href = HW.Contacts.RequestStrings.Download.RQSTR_CHANGEDOWNLOADSTATUS +
                HW.Tools.reEncondeURIComponent($.toJSON(json));

        },
        /**
         *    打开已完成的文件
         *  */
        openFile: function (name, tId) {
            if (_isEdit) return;
            var path = $("#downloadPath").text().substr(HW.lang.getLocalString('download_manager_doc_path').length);
            var aPath = path + "/" + name;
            var json = {
                absolutePath: aPath,
                typeId: tId
            };
            location.href = HW.Contacts.RequestStrings.Download.RQSTR_OPENFILE +
                HW.Tools.reEncondeURIComponent($.toJSON(json));
        },
        /**
         * 检查SD卡是否可用
         * @param respData    服务端返回的响应数据
         */
        checkSDCardIsAvailableResp:function(respData){
            var data = $.evalJSON(respData);
            _isAvailable = data.isAvailable;
            if(data.rcode == 0 && data.isAvailable == 1){
                setTimeout(function(){
                    _getDataList(HW.Contacts.RequestStrings.Download.TYPE_FINISH, 0, HW.Contacts.RequestStrings.Download.PAGE_SIZE);
                },500);
            }else{

                $("#downloadPath").text(data.errorMsg);
                $("#finishList").html('<div align="center" style="margin-top:3px">' + HW.lang.getLocalString('download_manager_empty_records') + '</div>');
                $("#downloadingList").html('<div align="center" style="margin-top:3px">' + HW.lang.getLocalString('download_manager_empty_records') + '</div>');
            }
        },
        /**
         * 下载进度通知函数
         *
         * @param respData
         *            获取成功后，服务端返回的响应数据
         */
        changeDownloadProgress: function (respData) {
            var data = $.evalJSON(respData);
            if (data.id) {
                var downloadPercent = _getDownloadPercent(data.total, data.down);
                var totalSize = _getTotal(data.total);
                $("#totalSize_02_" + data.id).text(totalSize);
                $("#dPercent_02_" + data.id).text(downloadPercent);
                //$("#dPercentIcon_02_" + data.id).attr("style", "width:" + downloadPercent);
                if (data.total <= 0) {
                    return;
                }
                //当下载进度为100%时，从正在下载列表中移除
                if (data.total == data.down) {
                    $("#downloadingList li[id=li_02_" + data.id + "]").remove();
                    var downloadingtotal = parseInt($("#downloadingTotal").text());
                    $("#downloadingTotal").text(downloadingtotal <= 0 ? 0 : downloadingtotal - 1);
                    downloading_scroll && downloading_scroll.refresh();
                    var finishtotal = parseInt($("#finishTotal").text());
                    $("#finishTotal").text(finishtotal + 1);
                }
            }
        },

        /**
         * 下载状态改变通知函数
         *
         * @param respData
         *            获取成功后，服务端返回的响应数据
         */
        changeDownloadStatusResp: function (respData) {
            var data = $.evalJSON(respData);
            if (data.id) {
                var statusStr = _getDownloadStatusStr(data.status);
                var statusImg = _getDownloadStatus(data.status);
                var statusStyle = _getDownloadStatusStyle(data.status);
                //var progressStyle = _getProgressStyle(data.status);
                var oldStatus = parseInt($("#li_02_" + data.id).attr("status"));
                var oldImg = _getDownloadStatus(oldStatus);
                //var oldProgressStyle = _getProgressStyle(oldStatus);
                $("#li_02_" + data.id).attr("status", data.status);
                $("#img_02_" + data.id).removeClass(oldImg);
                $("#img_02_" + data.id).addClass(statusImg);
                //$("#dPercentIcon_02_" + data.id).removeClass(oldProgressStyle);
                //$("#dPercentIcon_02_" + data.id).addClass(progressStyle);
                $("#statusStr_02_" + data.id).text(statusStr);
                $("#statusStyle_02_"+data.id).removeClass().addClass(statusStyle);
            }
        },
        /**
         * 删除下载数据成功回调函数
         *
         * @param respData
         *            删除成功后，服务端返回的响应数据
         */
        delDownloadDataResp: function (respData) {
            var data = $.evalJSON(respData);
            _delExecute(data, false);
        },
        /**
         * 清空下载数据成功回调函数
         *
         * @param respData
         *            删除成功后，服务端返回的响应数据
         */
        delAllDownloadDataResp: function (respData) {
            var data = $.evalJSON(respData);
            _delExecute(data, true);
        },
        /**
         * 获取下载数据列表成功回调函数
         *
         * @param respData
         *            获取成功后，服务端返回的响应数据
         */
        getDownloadListResp: function (respData){
            $.mobile.loading("hide");
            var contentHtml = new StringBuffer();
            var data = $.evalJSON(respData);
            if (data && data.rcode == 0) {
                //更新下载文件存档位置以及已完成和正在下载列表总数
                $("#downloadPath").text(HW.lang.getLocalString('download_manager_doc_path') + data.path);
                $("#finishTotal").text(data.totalFinished);
                $("#downloadingTotal").text(data.totalUnfinished);

                //返回的数据列表不为空时，组织生成列表页面
                if (data.dataList.length > 0) {
                    for (var i = 0; i < data.dataList.length; i++) {
                        var item = data.dataList[i];
                        if (data.type == HW.Contacts.RequestStrings.Download.TYPE_FINISH) {
                            contentHtml.append(_makeFinishListItem(item));
                        } else {
                            contentHtml.append(_makeDownloadingListItem(item));
                        }
                    }
                } else {
                    contentHtml.append('<div align="center" style="margin-top:3px">' + HW.lang.getLocalString('download_manager_empty_records') + '</div>');
                }
                //数据更新处理
                if (data.type == HW.Contacts.RequestStrings.Download.TYPE_FINISH) {
                    if(finish_scroll != null){
                        finish_scroll.destroy();
                        finish_scroll = null;
                    }

                    finish_scroll = HW.Tools._addiScroll("finishWrapper", "finish_outter", 0, 0, 0, 0);

                    _updateList("finishList", contentHtml, data.totalFinished);
                    var count = $("#finishList li").length;
                    if (count <= 0) {
                        finish_scroll.disable();
                        $("#editBtn").hide();
                    } else {
                        $("#editBtn").show();
                        finish_scroll.enable();
                        finish_scroll.refresh();
                        if (count <= HW.Contacts.RequestStrings.Download.PAGE_SIZE) {
                            finish_scroll.scrollTo(0, 0, 1);
                        }
                    }
                } else {
                    if(downloading_scroll != null){
                        downloading_scroll.destroy();
                        downloading_scroll = null;
                    }

                    downloading_scroll = HW.Tools._addiScroll("downloadingWrapper", "downloading_outter", 0, 0, 0, 0);

                    _updateList("downloadingList", contentHtml, data.totalUnfinished);
                    var count = $("#downloadingList li").length;
                    if (count <= 0) {
                        downloading_scroll.disable();
                        $("#editBtn").hide();
                    } else {
                        $("#editBtn").show();
                        downloading_scroll.enable();
                        downloading_scroll.refresh();
                        if (count <= HW.Contacts.RequestStrings.Download.PAGE_SIZE) {
                            downloading_scroll.scrollTo(0, 0, 1);
                        }
                    }
                }
                $("div[data-role=content] ul").listview();
            } else {
                simpleDialog.alert({content: HW.lang.getLocalString('download_manager_load_failed')});
            }
            $("div [class=moreBtn] a").unbind("click");
            $("div [class=moreBtn] a").bind("click", function () {
                _getMoreData();
            });
        }
    }
})();

HW.Core.addModule("navDownloadMgr", HW.Nativ.DownloadManager);
HW.Core.loadPage("navDownloadMgr");