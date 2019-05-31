/* 服务器环境配置  环境说明
生产环境  https://vsapp.4009515151.com	
uat环境  https://uat.4009515151.com	
sit环境  https://sit.4009515151.com	
*/
// serverEnvironmentIdentifier 服务器环境标识 1、生产环境 2、UAT环境 3、SIT环境
const serverEnvironmentIdentifier = 0;
const serverUrl = serverFlag ();
//根据标识 返回对应的地址
function serverFlag () {
    let obj = {
        clientId : "183f595244b764ad5a511dfacbbb3849",
        redirectUri : "http%3A%2F%2Felsit.vankeservice.com%2Fapi%2Fapp%2Foauth"      
    }
    switch (serverEnvironmentIdentifier) {   
        case 1:
        //生产环境
        obj.baseUrl = "https://vsapp.4009515151.com/",
        obj.clientId = "",
        obj.redirectUri = ""
        break;
        case 2: 
        //UAT环境 
        obj.baseUrl = "https://uat.4009515151.com/";
        obj.clientId = "",
        obj.redirectUri = ""
        break;
        case 3:
        obj.baseUrl = "https://sit.4009515151.com/",
        obj.clientId = "",
        obj.redirectUri = ""
        break
        default:
        break;
    }
    return obj;
}
export {serverUrl};