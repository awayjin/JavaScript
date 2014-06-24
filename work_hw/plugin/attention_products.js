/**
 *收藏删除
 */
HW.AttentionProduct = (function () {
    var myScroller = null;
    //收藏未登录状态
    function _noLoginDisplay(id){
        var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('index_no_login')+'</a></dd>'
        $("#"+id).html(sHtml);
    };
    //产品收藏URL
    function _getURL(d){
        var newUrl='doc.html?mid=SUP_DOC&termid=' + d.productid + '&productname='+ d.productname;
        return HW.Tools.reEncondeURIComponent(newUrl);
    };
    //产品收藏结构数据
    function _showProductSelect(data){
        var sHtml='',i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length,
            querytype=0,_limit;
        for(i=0;i<len;i++){
            sHtml+='<dd><span class="sel_btn"></span><a data-id="'+perferenceProducts[i].fid+'" href="#">'+perferenceProducts[i].productname+'</a></dd>'
        }
        if(len>=20){
            sHtml+='<dd class="more"><a href="#" id="attentionMore">'+HW.lang.getLocalString('common_more_only')+'</a></dd>';
        }
        $("#alist_data").html(sHtml);

        if(myScroller != null){
            myScroller.destroy();
            myScroller = null;
        }
        setTimeout(function(){
            myScroller = HW.Tools._addiScroll('attention_list_data_wapper', 'attention_list_data_outer', 0, 0, 0, 0);
        },100);
    };
    //产品收藏查询
    function _myProductFavorite(){
        if(HW.GlobalState.user.isSignIn){
            var option,keywords='';
            option={
                url:HW.GlobalState.baseUrl + "/productnode/productnode/getProductFavorite.json",
                data:{
                    limit:20,
                    offset:$("#alist_data dd").length,
                    keywords:''
                }
            };
            option.success=function(data){
                console.log(data)
                if(data.body==null || data.body.perferenceProducts.length==0){
                    var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('common_no_records')+'</a></dd>'
                    $("#alist_data").html(sHtml);
                    return;
                }
                _showProductSelect(data);
                _selBtnOn();
            }
            HW.Core.loadPage(option);
        }else{
            _noLoginDisplay("alist_data");
            return false;
        }
    };
    //产品编辑
    function _selBtnOn(){
        var  productId="";
        $("#alist_data dd").unbind().bind("click",function(){
            if($(this).find("span").hasClass("sel_btn_on")){
                $(this).find("span").removeClass("sel_btn_on").removeAttr("title");
            }else{
                $(this).find("span").addClass("sel_btn_on").attr("title",$(this).find("a").attr("data-id"));
            }

        })

        var oDelData=$("#doneFav");
        oDelData.unbind().bind("click",function(){

            if(!$("#alist_data dd span").hasClass("sel_btn_on") || $("#alist_data dd").hasClass("noData") || $("#alist_data dd").length <= 0){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('myFavorites_no_product')
                });
                return false;
            }


            simpleDialog.confirm({content: HW.lang.getLocalString('common_confirm_delete'),
                buttons:{
                    ok:function(){

                        var oBtnOn=$("#alist_data dd .sel_btn_on"), i,productIds=[];

                        for(i=0;i<oBtnOn.length;i++){
                            var dataLists=$.trim(oBtnOn[i].title);
                            productIds.push(dataLists)
                        }

                        console.log(productIds)
                        productId=productIds.join();
                        console.log(productId)
                        var option, i;
                        option={
                            url:HW.GlobalState.baseUrl+'/productnode/productnode/productSubmit.json',
                            data:{
                                "addproducts":'',
                                "delproductids":productId
                            }
                        };
                        option.success=function(data){
                            console.log(data);
                            if(data.head.errorcode==="0"){
                                console.log("OK======OK");
                                $("#alist_data dd .sel_btn_on").parents("dd").remove();
                                myScroller.refresh();
                            }else{
                                console.log("NO=====NO")
                            }
                        };
                        HW.Core.loadPage(option);
                    },
                    cancel:function(){

                    }

                }


            });


        })

    }
    //文档收藏url
    function _myGetDocDocumentUrl(d){
        var toURLs="docContent.html",_url='';
        _url +=toURLs;
        _url+='?documentid='+d.documentid+'&documentname='+ d.documentname+'&mid=SUP_DOC'+'&ishedex='+ d.ishedex+'&isdirectory='+ d.isdirectory;
        return HW.Tools.reEncondeURIComponent(_url);
    }
    //文档收藏查询
    function _myDocumentPerferenceQuery(){
        var option;
        if(HW.GlobalState.user.isSignIn){
            option={
                url:HW.GlobalState.baseUrl+"/productnode/productnode/getDocFavorites.json",
                data:{
                    "offset":$("#alist_data dd").length,
                    "limit":20,
                    "keywords":''
                }
            };
            option.success=function(data){
                console.log(data);
                var sHtml='', i,body=data.body,perferenceProducts=body.perferenceProducts,len=perferenceProducts.length;
                console.log(len)
                if(data.body==null || len==0){
                    var sHtml = '<dd class="noData"><a>'+HW.lang.getLocalString('common_no_records')+'</a></dd>';
                    $("#alist_data").html(sHtml);
                    return false;
                }
                for(i=0;i<len;i++){
                    //_myGetDocDocumentUrl(perferenceProducts[i])
                    sHtml+='<dd><span class="sel_btn"></span><a data-id="'+perferenceProducts[i].fid+'" href="#">'+perferenceProducts[i].documentname+'</a></dd>'
                }
                if(len>=20){
                    sHtml+='<dd class="more"><a href="#" id="">'+HW.lang.getLocalString('common_more_only')+'</a></dd>';
                }
                $("#alist_data").html(sHtml);
                _documentSelBtnOn();

                if(myScroller != null){
                    myScroller.destroy();
                    myScroller = null;
                }
                setTimeout(function(){
                    myScroller = HW.Tools._addiScroll('attention_list_data_wapper', 'attention_list_data_outer', 0, 0, 0, 0);
                },100);

                //myScroller.refresh();
            }
            HW.Core.loadPage(option);

        }else{
            _noLoginDisplay("alist_data");
            return false;
        }
    };
    //文档编辑
    function _documentSelBtnOn(){
        var  productId="";
        $("#alist_data dd").unbind().bind("click",function(){
            if($(this).find("span").hasClass("sel_btn_on")){
                $(this).find("span").removeClass("sel_btn_on").removeAttr("title");
            }else{
                $(this).find("span").addClass("sel_btn_on").attr("title",$(this).find("a").attr("data-id"));
            }

        })

        var oDelData=$("#doneFav");
        oDelData.unbind().bind("click",function(){

            if(!$("#alist_data dd span").hasClass("sel_btn_on") || $("#alist_data dd").hasClass("noData")){
                simpleDialog.alert({
                    content:HW.lang.getLocalString('myFavorites_no_doc')
                });
                return false;
            }

            simpleDialog.confirm({content: HW.lang.getLocalString('common_confirm_delete'),
                buttons:{
                    ok:function(){
                        var oBtnOn=$("#alist_data dd .sel_btn_on"), i,productIds=[];

                        for(i=0;i<oBtnOn.length;i++){
                            var dataLists=$.trim(oBtnOn[i].title);
                            productIds.push(dataLists)
                        }

                        console.log(productIds)
                        productId=productIds.join();
                        console.log(productId)
                        var option, i;
                        option={
                            url:HW.GlobalState.baseUrl+'/productnode/productnode/addDocFavorite.json',
                            data:{
                                "addproducts":'',
                                "delproductids":productId
                            }
                        };
                        option.success=function(data){
                            console.log(data);
                            if(data.head.errorcode==="0"){
                                console.log("OK======OK");

                                $("#alist_data dd .sel_btn_on").parents("dd").remove();
                                myScroller.refresh();
                            }else{
                                console.log("NO=====NO")
                            }
                        };
                        HW.Core.loadPage(option);

                    },
                    cancel:function(){

                    }

                }


            });



        })

    }
    //切换
    function _attenTypeDocument(){
        $("#attenType a").unbind().bind("click",function(){
            $(this).addClass("active").siblings("a").removeClass("active");
           var dataVal=$(this).attr("data-val");
            if(dataVal=="0"){
                HW.GlobalState.docLinkMore='';
                HW.GlobalState.proLinkMore='ok';
                _myProductFavorite();
            };
            if(dataVal=="1"){
                HW.GlobalState.proLinkMore='';
                HW.GlobalState.docLinkMore='ok';
                _myDocumentPerferenceQuery();
            }
        })
        $("#allDel").unbind().bind("click",function(){
            if($("#alist_data dd").length <= 0 || $("#alist_data dd").hasClass("noData")){
                return false;
            }

            $("#alist_data dd span").addClass("sel_btn_on");
            simpleDialog.confirm({content: HW.lang.getLocalString('download_manager_del_data'),
                buttons:{
                    ok:function(){
                        var oAs=$("#attenType a.active").attr("data-val"),urls;
                        if(oAs=="0"){
                            console.log("product");
                            urls=HW.GlobalState.baseUrl+'/productnode/productnode/productSubmit.json';
                        }
                        if(oAs=="1"){
                            urls=HW.GlobalState.baseUrl+'/productnode/productnode/addDocFavorite.json';
                        }
                        var option;
                        option={
                            url:urls,
                            data:{
                                "addproducts":'',
                                "delproductids":"all"
                            }
                        };
                        option.success=function(data){
                            console.log(data);
                            if(data.head.errorcode==="0"){
                                $("#alist_data dd .sel_btn_on").parents("dd").remove();
                                myScroller.refresh();
                            }else{

                            }
                        };
                        HW.Core.loadPage(option);

                    },
                    cancel:function(){
                        $("#alist_data dd span").removeClass("sel_btn_on");
                    }

                }


            });
        })


    }

    return {
        pageConfig: {
            name: 'AttentionProduct',
            id: 'apro_support'
        },
        init:function(){
            HW.Tools.myMenuBottom("5");
            $("#attenType a").removeClass("active");
            if(HW.GlobalState.docLinkMore==='ok'){
                $("#attenType a:nth-child(2)").addClass("active");
                _myDocumentPerferenceQuery();
            }else{
                $("#attenType a:nth-child(1)").addClass("active");
                _myProductFavorite();
            }
            _attenTypeDocument();


        }
    }

})();

//使用前，需要先注册 Demo对象
HW.Core.addModule("AttentionProduct", HW.AttentionProduct);

//加载Demo页面的数据
HW.Core.loadPage("AttentionProduct");

















