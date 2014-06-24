/**
 * appDown.html应用下载页面
 */


HW.About=(function(){

    function _AboutVer(){

        if (HW.GlobalState.container == "native") {

            $(".about_Txt").html(HW.GlobalState.deviceInfo.nativeVersion);
        } else{
            $(".about_Txt").html(HW.version);
        }
        $(".btn-left")
    }

    return{
        pageConfig:{
            name : 'About' ,
            id : "about"
        },
        init:function(){
            HW.Tools.myMenuBottom('5');
            _AboutVer();
        }
    }
})();

HW.Core.addModule("About",HW.About);
HW.Core.loadPage("About");
