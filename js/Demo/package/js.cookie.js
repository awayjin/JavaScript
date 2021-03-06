var cookieUtil = {
    getValue: function(cName){
        "use strict";

        var cookieName = decodeURIComponent(cName),
            cookieStr = decodeURIComponent(document.cookie),
            cookieStart = cookieStr.indexOf(cookieName),
            cookieValue,
            cookieEnd;

        if(cookieStart != "-1"){
            cookieEnd = cookieStr.indexOf(";", cookieStart);
            if(cookieEnd == "-1"){
                cookieValue = cookieStr.substring(cookieStart + cookieName.length +1);
            }else{
                cookieValue = cookieStr.substring(cookieStart + cookieName.length +1, cookieEnd);
            }
        }
        return cookieValue;
    },

    set: function(name, value, expires, path, domain, secure){
        var cookieStr = encodeURIComponent(name) + "="
            + encodeURIComponent(value);



        if(expires instanceof Date){
            cookieStr += "; expires="+expires;
        }

        if(path){
            cookieStr += "; expires="+path;
        }

        if(domain){
            cookieStr += "; domain="+ domain;
        }

        if(secure){
            cookieStr += + "; secure";
        }

        document.cookie = cookieStr;
    },

    remove: function(name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure)
    }

}



var curDate = new Date().getTime();
//cookieUtil.set("cookieName2", "co value", +new Date()+60*60*24*1000, "/JavaScript/Demo/", "http://localhost:81", "secure");
cookieUtil.set("cookieName4", "co value2", new Date(2014, 1, 28, 10, 7));