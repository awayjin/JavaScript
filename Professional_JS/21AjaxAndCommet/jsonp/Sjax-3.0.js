/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-9-4
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */

/**
 * JavaScript JSONP Library v0.2
 * Copyright (c) 2011 snandy
 * Blog: http://www.cnblogs.com/snandy
 * QQ群: 34580561
 * Date: 2011-04-26
 *
 * 增加data属性，请求参数
 * 增加scope属性，可以让回调函数在指定的上下文中执行
 *
 * 接口
 * Sjax.load(url, {
 * 	  data		// 请求参数 (键值对字符串或js对象)
 * 	  success 	// 成功后回调函数
 *    scope 	// 回调函数执行上下文
 *    timestamp // 是否加时间戳
 * });
 *
 * 示例
 * Sjax.load('servlet/json', {
 *    success : function(){alert('request succ.');},
 *    scope : {},
 *    timestamp : true
 * });
 *
 */
/**
 * JavaScript JSONP Library v0.3
 * Copyright (c) 2011 snandy
 * Blog: http://www.cnblogs.com/snandy
 * QQ群: 34580561
 * Date: 2011-04-26
 *
 * 增加对请求失败的处理，虽然这个功能用处不太大，但研究了各个浏览器下script的差异性
 * 1, IE6/7/8 支持script的onreadystatechange事件
 * 2, IE9/10 支持script的onload和onreadystatechange事件
 * 3, Firefox/Safari/Chrome/Opera支持script的onload事件
 * 4, IE6/7/8/Opera 不支持script的onerror事件; IE9/10/Firefox/Safari/Chrome支持
 * 5, Opera虽然不支持onreadystatechange事件,但其具有readyState属性.这点甚是神奇
 * 6, 用IE9和IETester测试IE6/7/8，其readyState总为loading,loaded。没出现过complete。
 *
 * 最后的实现思路：
 * 1, IE9/Firefox/Safari/Chrome 成功回调使用onload事件，错误回调使用onerror事件
 * 2, Opera 成功回调也使用onload事件（它压根不支持onreadystatechange），由于其不支持onerror，这里使用了延迟处理。
 *    即等待与成功回调success，success后标志位done置为true。failure则不会执行，否则执行。
 *    这里延迟的时间取值很有技巧，之前取2秒，在公司测试没问题。但回家用3G无线网络后发现即使所引用的js文件存在，但由于
 *    网速过慢，failure还是先执行了，后执行了success。所以这里取5秒是比较合理的。当然也不是绝对的。
 * 3, IE6/7/8 成功回调使用onreadystatechange事件，错误回调几乎是很难实现的。也是最有技术含量的。
 *    参考了http://stackoverflow.com/questions/3483919/script-onload-onerror-with-iefor-lazy-loading-problems
 *    使用nextSibling，发现不能实现。
 *    令人恶心的是，即使请求的资源文件不存在。它的readyState也会经历“loaded”状态。这样你就没法区分请求成功或失败。
 *    怕它了，最后使用前后台一起协调的机制解决最后的这个难题。无论请求成功或失败都让其调用callback(true)。
 *    此时已经将区别成功与失败的逻辑放到了callback中，如果后台没有返回jsonp则调用failure，否则调用success。
 *
 *
 * 接口
 * Sjax.load(url, {
 *    data      // 请求参数 (键值对字符串或js对象)
 *    success   // 请求成功回调函数
 *    failure   // 请求失败回调函数
 *    scope     // 回调函数执行上下文
 *    timestamp // 是否加时间戳
 * });
 *
 */


var Sjax = function(win){
    "use strict";
    var doc = window.document,
        script,
        head = doc.head || doc.getElementsByTagName("head")[0];

    function request(url, params){
        script = doc.createElement('script');

        script.src = url;
        head.insertBefore(script, head.lastChild);
    }
    return {load: request};
}(window);






/*
 *2.0
 */
var Sjax2 = (function(win, undefined){
    "use strict"
    var isIE = /*@cc_on!@*/!1,
        doc = win.document,
        head = doc.getElementsByTagName('head')[0];

    function request(url, params){
        var data = params.data || {},
            scope = params.scope || win,
            success = params.success || function(){},
            timestamp = params.timestamp,
            script,
            readyState;

        function callback(){
            if(typeof jsonp !== 'undefined'){
                success(jsonp)
            }else{
                alert("warming: JSONP did not return~!")
            }

            script.onload = script.onreadystatechange = null;
            if(head && head.parentNode){
                head.removeChild(script);
            }

        }
        if(data && typeof data == 'object'){
            data = _serialize(data)
        }

        script = doc.createElement("script");
        if(/*@cc_on!@*/!2){
            script.onreadystatechange = function(){
                readyState = this.readyState;
                if(readyState == 'loaded' || readyState == 'complete'){
                    callback();
                }
            }
        }else{
            script.onload = function(){
                callback();
            }
        }

        if(data){
            data += "?" + url;
        }


        script.src = url;
        doc.head.insertBefore(script, doc.head.lastChild);


        function _serialize(obj){
            var arr = [],
                key,
                val;
            for(key in obj){
                val = obj[key];
                if(val.constructor === Array){
                    for(var i=0, len=val.length; i<len; i++){
                        arr.push(key +"="+val[i]);
                    }
                }else{
                    arr.push(key +"="+val);
                }
            }
            return arr.join("&");
        }

    }

    return {load: request}
})(window);


/*
*1.0
*/
//var Sjax = (function(window, undefined){
//    "use strict"
//    var isIE = /*@cc_on!@*/!1,
//        doc = window.document,
//        head = doc.getElementsByTagName("head")[0],
//        script;
//
//    function request(url, success, timestamp){
//        script = doc.createElement("script");
//
//        if(isIE){
//            script.onreadystatechange = function(){
//                var readyState  = this.readyState;
//                console.log(this);
//                if(readyState == 'loaded' || readyState  ==  'complete' ){
//                    callback();
//                }
//            };
//        }else{
//            script.onload = function(){
//                callback();
//            };
//
//        }
//
//        function callback(){
//            if(typeof jsonp !== 'undefined'){
//                success(jsonp);
//            }else{
//                alert("jwWarmming:JSONP did not return.");
//            }
//            //handle memory leak in IE
//            script.onload = script.onreadystatechange = null;
//            head.removeChild(script);
//
//
//
//        }
//
//        script.src =  url;
//        head.appendChild(script);
//    }
//
//    return {load: request};
//
//
//})(window);

