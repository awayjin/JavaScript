/**
 * User: fuping
 * Date: 13-6-19
 * Time: 下午5:39
 * To change this template use File | Settings | File Templates.
 */
 var webAppName = "/mobile";
 //var webAppName = "/mobileSupport2";
// var webAppName = "/mobile";
 function checkReflash(){
    if(!window.HW){
        window.location.href =  webAppName+"/index.html?redirect="+encodeURIComponent(window.location.href);
    }
}
