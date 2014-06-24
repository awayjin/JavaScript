/**
 * appDown.html应用下载页面
 */


HW.AppDown=(function(){
    var ios_AppUrl = HW.GlobalState.ios_AppUrl;
    var android_AppUrl = HW.GlobalState.android_AppUrl;

    function _appUrlAll(){
          $('.appDown_Ios a').attr("href",ios_AppUrl).unbind().bind('click',function(e){
                   var isDownLoad = true;
                   if($.os.android){
                       isDownLoad = false;
                       simpleDialog.confirm({content: HW.lang.getLocalString('appDown_Ios_tip'),ok:function(){
                           isDownLoad = true
                       }});
                   }
                  if(!isDownLoad){
                      e.preventDefault();
                      return false;
                  }

          });
          $('.appDown_Android a').attr("href",android_AppUrl).unbind().bind('click',function(e){
              var isDownLoad = true;
              if($.os.ios){
                  isDownLoad = false;
                  simpleDialog.confirm({content: HW.lang.getLocalString('appDown_android_tip'),ok:function(){
                      isDownLoad = true
                  }});
              }
              if(!isDownLoad){
                  e.preventDefault();
                  return false;
              }
          });
    }

    return{
        pageConfig:{
            name : 'AppDown' ,
            id : "AppDown"
        },
        init:function(){
            _appUrlAll();
            hoverBtn();
        }
    }
})();

HW.Core.addModule("AppDown",HW.AppDown);
HW.Core.loadPage("AppDown");
