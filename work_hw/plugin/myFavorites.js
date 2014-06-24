/**
 * @author liutt
 */
HW.Nativ.MyFavorites = (function () {
    var _isEdit = false;
    //对话框是否已弹出
    var _isDialogShow = false;
    /**
     * 生成我的收藏列表项
     * */
    var _makeFavoriteItem = function (item) {
        var itemHtml = new StringBuffer();
        var dateTime = HW.Tools.secondDateToString(item.date, "yyyy/MM/dd hh:mm:ss");
        itemHtml.append('<dd id=dd_');
        itemHtml.append(item.id);
        itemHtml.append('><div onClick="HW.Nativ.MyFavorites.delClick(this)" class="f-l f-del m-r20" id=cb_');
        itemHtml.append(item.id);
        itemHtml.append('></div>');
        itemHtml.append('<a onClick="HW.Nativ.MyFavorites.itemClick(this)" url=\"');
        itemHtml.append(item.url);
        itemHtml.append('\" id=dd_a_');
        itemHtml.append(item.id);
        itemHtml.append('>');
        itemHtml.append(item.name);
        itemHtml.append('<p class="font20">');
        itemHtml.append(dateTime);
        itemHtml.append('</p><span></span></a></dd>');
        return itemHtml;
    };
    /**
     * 编辑
     */
    var _editClick = function () {
        _isEdit = true;

        $("div[id*=cb_]").addClass("f-l f-del m-r20");

        $("#editBtn").hide();
        $("#homeBtn").hide();

        $("#backBtn").show();

        if ($("#favoriteList dd:nth-last-child(1)").text().indexOf(HW.lang.getLocalString('download_manager_more')) != -1) {
            $("#favoriteList dd:nth-last-child(1)").remove();
        }
    };
    /**
     * 返回
     **/
    var _backClick = function () {
        _isEdit = false;

        $("div[id*=cb_]").removeClass("f-l f-del m-r20");
        $("#backBtn").hide();

        $("#homeBtn").show();
        $("#editBtn").show();

        _cleanListView("favoriteList");
        _getDataList(0, HW.Contacts.RequestStrings.Favorite.PAGE_SIZE);
    };
    /**
     *    确认删除
     *  */
    var _confirmDelClick = function (param) {
        _isDialogShow = false;
        var tempIds = new Array();
        if (param.isAllFlag) {
            $.each($("div[id*=cb_]"), function (k, v) {
                var delId = parseInt(v.id.substr(3));

                $("#cb_" + delId).attr("isdel", 1);

                tempIds.push({
                    id: delId
                });
            });
        } else {
            $("#cb_" + param.itemId).attr("isdel", 1);
            tempIds.push({
                id: param.itemId
            });
        }

        var idList = {
            idList: tempIds
        };
        location.href = HW.Contacts.RequestStrings.Favorite.RQSTR_DELFAVORITEDATA + $.toJSON(idList);

        _dialogShowOrHide('hide');
    };
    /**
     *更多按钮事件（获取下页数据）
     *
     *  */
    var _getMoreData = function () {
        var itemId;
        if ($("#favoriteList dd:nth-last-child(2)")[0].id) {
            itemId = parseInt($("#favoriteList dd:nth-last-child(2)")[0].id.substr(3));
        }
        _getDataList(itemId, HW.Contacts.RequestStrings.Favorite.PAGE_SIZE);
    };
    /**
     * 清空列表数据
     *
     *  */
    var _cleanListView = function (lvId) {
        $('#' + lvId).find('dd').remove();
    };
    /**
     *  删除选中的数据项
     *  */
    var _delDataItems = function () {
        $.each($("div[id*=cb_]"), function (k, v) {
            var isDelFlag = $("#" + v.id).attr("isdel");
            if (isDelFlag == 1) {
                var itemId = parseInt(v.id.substr(3));
                $("#favoriteList dd[id=dd_" + itemId + "]").remove();
            }
        });
        var count = $("#favoriteList dd").length;
        if (count == 0) {
            $("#favoriteList").html('<div align="center" style="margin-top:3px">' + HW.lang.getLocalString('favorite_empty_records') + '</div>');
        }
    };
    /**
     * 获取数据
     */
    var _getDataList = function (cId, pSize) {
        var json = {
            curIdx: cId,
            pageSize: pSize
        };
        location.href = HW.Contacts.RequestStrings.Favorite.RQSTR_GETFAVORITELIST + $.toJSON(json);

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
            var opt = {
                content: '<p align="center" class="m-t20">' + HW.lang.getLocalString('download_manager_ask_del_opt') + '</p> ',
                buttons: [
                    {text: HW.lang.getLocalString('cancel'), ct: "cancel", callback: function () {
                        _isDialogShow = false;
                    }},
                    {text: HW.lang.getLocalString('myFavorites_delete'), ct: "ok", callback: function () {
                        _delBindClick({isAllFlag: isAll, itemId: id})
                    }}
                ]
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
        //return function () {
        _confirmDelClick(param);
        // };
    };
    /**
     * 初始化界面以及绑定事件
     *  */
    var _initPageElm = function () {
        $("#editBtn").click(_editClick);
        $("#backBtn").click(_backClick);
        $("#backBtn").hide();
        $("#editBtn").hide();

    };

    return {
        //Core中注册对象
        pageConfig: {
            name: "navMyFav",
            id: "navMyFav"
        },
        //初始化
        init: function () {
            $(document).undelegate("#navMyFav", "pageshow").delegate("#navMyFav", "pageshow", function () {
                HW.Tools._addiScroll("myFavoritesWrapper", "myFavorites_outter", {checkDOMChanges: true});
            });
            //_initPageElm();
            hoverBtn();
            _getDataList(0, HW.Contacts.RequestStrings.Favorite.PAGE_SIZE);

        },
        /**
         *    收藏项单击事件
         * */
        itemClick: function (event) {
            var aElm = event;
            if (_isEdit) {
                //如果是编辑状态，点击收藏项，切换选中/未选中状态
                //chBox = $("#" + aElm.id).children()[0];
//                _swapCheckStatus(chBox);
            } else {
                //如果是非编辑状态，点击收藏项，跳转到收藏页面
                var url = $("#" + aElm.id).attr("url");
                //收藏以下页面时，跳转前先判断用户是否已登录，没登录，直接就跳转到登录页
                if(!HW.GlobalState.user.isSignIn &&
                    (
                        url.indexOf("attention.html")!=-1 ||
                        url.indexOf("attentionSet.html")!=-1 ||
                        url.indexOf("backfeedProduct.html")!=-1 ||
                        url.indexOf("backfeedText.html")!=-1 ||
                        url.indexOf("editMyApplyFor.html")!=-1 ||
                        url.indexOf("editMyToDo.html")!=-1 ||
                        url.indexOf("feedbackProduct.html")!=-1 ||
                        url.indexOf("myApplyFor.html")!=-1 ||
                        url.indexOf("myToDo.html")!=-1 ||
                        url.indexOf("myZone.html")!=-1 ||
                        url.indexOf("sendEmail.html")!=-1
                    )){
                    HW.GlobalState.signJumpPage = url;
                    HW.GlobalState.signBackPage = "myFavorites.html";
                    $.mobile.changePage("signIn.html",{changeHash:false});
                } else{
                    $.mobile.changePage(url);
                }

            }
            _isEdit = false;
        },
        /**
         *    单条数据删除事件
         *  */
        delClick: function (event) {
            //对话框已显示，则退出。不可重复显示。
            _isEdit = true;
            if (_isDialogShow) return;
            _isDialogShow = true;
            var chBox = event;
            var itemId = parseInt(chBox.id.substr(3));
            $("#isDelFile").attr("checked", false);
            _dialogShowOrHide('show', false, itemId);
        },
        /**
         * 删除收藏数据成功回调函数
         * @param respData    服务端返回的响应数据
         */
        delFavoriteDataResp: function (respData) {
            var data = $.evalJSON(respData);
            if (data.rcode == -1) {
                $.each($("div[id*=cb_]"), function (k, v) {
                    var itemId = parseInt(v.id.substr(3));
                    for (var i = 0; i < data.errorMsg.length; i++) {
                        if (data.errorMsg[i].id == itemId) {
                            $("#cb_" + itemId).attr("isdel", 0);
                            break;
                        }
                    }
                });
            }
            _delDataItems();
        },
        /**
         * 获取我的收藏数据列表成功回调函数
         *
         * @param respData
         *            获取成功后，服务端返回的响应数据
         */
        getFavoriteListResp: function (respData) {
            var contentHtml = new StringBuffer();
            var data = $.evalJSON(respData);
            if (data.rcode == 0) {
                //返回的数据列表不为空时，组织生成列表页面
                if (data.totalSize > 0) {
                    $("#editBtn").show();
                    for (var i = 0; i < data.dataList.length; i++) {
                        var item = data.dataList[i];
                        contentHtml.append(_makeFavoriteItem(item));
                    }
                } else {
                    contentHtml.append('<div align="center" style="margin-top:3px">' + HW.lang.getLocalString('favorite_empty_records') + '</div>');
                }
                //数据更新处理
                if ($("#favoriteList dd:last-child").length > 0) {
                    $("#favoriteList dd:last-child")[0].outerHTML = contentHtml.toString();
                } else {
                    $("#favoriteList").html(contentHtml.toString());
                }

                //当前页面数据少于总条数时，显示更多按钮
                var count = $("#favoriteList dd").length;
                if (data.totalSize > count) {
                    $("#favoriteList").append('<dd><div class="more moreBtn" id="morefavInfoBtn" ><a>' + HW.lang.getLocalString('download_manager_more') + '</a></div></dd>');
                }
            } else {
                simpleDialog.alert({content: HW.lang.getLocalString('download_manager_load_failed')});
            }
            $("#morefavInfoBtn").click(function () {
                _getMoreData();
            });
        }
    }
})();

HW.Core.addModule("navMyFav", HW.Nativ.MyFavorites);
HW.Core.loadPage("navMyFav");