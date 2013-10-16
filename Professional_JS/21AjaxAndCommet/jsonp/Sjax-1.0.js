/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-9-4
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */

//var Pjax = function(win){
//     var isIE = /*@cc_on!@*/!1;
//
//    function request(){
//
//    }
//
//    return  {load: request};
//}(this);

var Sjax = (function(window, undefined){
    "use strict"
    var isIE = /*@cc_on!@*/!1,
        doc = window.document,
        head = doc.getElementsByTagName("head")[0],
        script;

    function request(url, success, timestamp){
        script = doc.createElement("script");

        if(isIE){
            script.onreadystatechange = function(){
                var readyState  = this.readyState;
                console.log(this);
                if(readyState == 'loaded' || readyState  ==  'complete' ){
                    callback();
                }
            };
        }else{
            script.onload = function(){
                callback();
            };

        }

        function callback(){
            if(typeof jsonp !== 'undefined'){
                success(jsonp);
            }else{
                alert("jwWarmming:JSONP did not return.");
            }
            //handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);



        }

        script.src =  url;
        head.appendChild(script);
    }

    return {load: request};


})(window);

