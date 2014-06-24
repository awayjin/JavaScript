/**
 * dataDirect.html 资料直通车
 */
HW.DataDirect=(function(){
    var myScroller, _offset= 0, _limit=20, _docid="001", _mid="SUP_DOC";
    function _createLiEle(arr,num){

        if(arr.body==null || arr.body.flydovelist.length<=0){
            $("#dataDirectContShow").append("<li class='relevanTp'>"+HW.lang.getLocalString('NoRespite')+"</li>");
            return false;
        }

        var dataList=arr.body.flydovelist, box=$("#dataDirectContShow"), total=arr.body.totalcount || '',
            len=dataList.length, html='', i, attrVa = HW.GlobalState.baseUrlimg;
        for(i=0;i<len;i++){
            html+='<li><div class="list_warp"><a href="dataDirectBox.html?id='+dataList[i].flydoveId+'">' +
                '<img src="'+(attrVa+dataList[i].imgUrl)+'"><span><i>'+dataList[i].name+'</i><b></b></span></a></div></li>';
        }

        $("#dataDirectContShow").html(html);
        _dataDirectImg();

        //查看更多
        console.log($('#dataDirectContShow li').length)
        console.log(len)
        if($('#dataDirectContShow li').length < total){
            $('#pullUpDD').css('display','block');
        }else{
            $('#pullUpDD').css('display','none');
        }





        if(myScroller != null){
            myScroller.destroy();
            myScroller = null;
        }
        myScroller=HW.Tools._addiScroll("dataDirectContWrapper","dataDirectCont",{
            isMore:true,
            id:'pullUpDD',
            ajaxCallback:searchMore
        });
        myScroller.refresh();

    };
    //图片处理
    function _dataDirectImg(){
        var imgErr='../skin/default/images/';
        $("img").error(function() {
            $(this).attr("src", imgErr+"mgz_df_icon.png");
        });

    }
    //超时处理
    function err(xhr, textStatus, errorThrown){
        if(textStatus=="timeout" || errorThrown=="timeout") {
            $.mobile.loading("hide");
            simpleDialog.alert({content: HW.lang.getLocalString('abnormal_network_timeout'),ok:function(){
                xhr.abort();
            }});

        }

    };
    //
    function searchMore(){
        var option = {
            url: HW.GlobalState.baseUrl+"/flydove/flydove/getFlydoveList.json",
            error:err,
            data: {
                mid:_mid,
                docid : _docid,
                offset:_offset,
                limit:$('#dataDirectContShow li').length + _limit
            },
            success: _createLiEle
        };
        HW.Core.loadPage(option);


    }


    return{
        pageConfig:{
            name : 'DataDirect',
            id : "dataDirect",
            eventType:"pageshow",
            processData:"showData" ,
            ajaxOptions:{
                url : HW.GlobalState.baseUrl+"/flydove/flydove/getFlydoveList.json",
                data:{
                    mid:_mid,
                    docid : _docid,
                    offset:_offset,
                    limit:_limit
                },
                error:err,
                timeout:15000
            }
        },


        //显示数据
        showData:function(data){
            console.log(data);
            HW.Tools.myMenuBottom('4');
            HW.Tools.mySidebarAll("dataDirect_left_Sidebar","dataDirect_right_Sidebar","tool_bulaDir",'cePage',"page_maskDir");
            _createLiEle(data,_limit);
            _dataDirectImg();




        }
    }
})();

HW.Core.addModule("DataDirect",HW.DataDirect);
HW.Core.loadPage("DataDirect");
