/**
 * DataDirectBox.html语言设置页面
 */

HW.DataDirectBox=(function(){
    var _myScroll=null,_id="";

    //获取ID值
    function _getId(){
         var href=window.location.href;
        _id=HW.Tools.parseURL(href)["id"];
        HW.DataDirectBox.pageConfig.ajaxOptions.data.flydoveId=_id;
    }



    return{
        pageConfig:{
            name : 'DataDirectBox' ,
            id : "dataDirectBox",
            eventType:"pageshow",
            processData:"showData" ,
            ajaxOptions:{
                url : HW.GlobalState.baseUrl+"/flydove/flydove/getFlydoveContent.json",
                data:{
                    flydoveId:""
                }
            }
        },
        init:function(){
            HW.Tools.myMenuBottom('5');
            _getId();
            //添加滑动
            _myScroll=HW.Tools._addiScroll("dataDirectBoxContWrapper","dataDirectBoxCont", {checkDOMChanges: true});
        },



        showData:function(data){
            console.log(data);
            var box=$("#dataDirectBoxCont");
            box.append(data);

        }
    }
})();

HW.Core.addModule("DataDirectBox",HW.DataDirectBox);

HW.Core.loadPage("DataDirectBox");


