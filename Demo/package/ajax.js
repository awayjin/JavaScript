/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-3-18
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */
;(function(window, undefined){
    if(typeof A){}

    var $ = window.AJAX = function (params){
        var config = {
            url: "",
            success: function(){},
            data: null,
            method: "get",
            abort: function(msg){
                alert("请求失败:" +msg);
            }
        };

        //合并配置
        for(var i in params){
            if(params[i] != "undefined"){
                config[i] = params[i];
            }
        }


        return new $.prototype._create(config)
    };
    $.prototype = $.fn = {
        _create: function(config, bool){
            var xhr  = this.createXHR();
            this.readyChange(xhr, config);

        },

        readyChange: function(xhr, config){
            xhr.onreadystatechange = function(){

                if(xhr.readyState == 3){
                    var status = xhr.status;
                    if(status >=200 && status<300 || status == 304 ){
                        var header = xhr.getAllResponseHeaders();
                        console.log('1.0:', header);
                        var date = xhr.getResponseHeader('date');
                        var yearMonth = new Date(date).toLocaleDateString();
                        var time = new Date(date).toLocaleTimeString();
                        console.log(yearMonth, time);
                    }else{
                        config.abort(status);
                    }
                }

                if(xhr.readyState == 4){
                    var status = xhr.status;
                    if(status >=200 && status<300 || status == 304 ){
                        var header = xhr.getAllResponseHeaders();
                        console.log('1.0:', header);
                        var date = xhr.getResponseHeader('date');
                        var yearMonth = new Date(date).toLocaleDateString();
                        var time = new Date(date).toLocaleTimeString();
                        console.log(yearMonth, time);
                        config.success(xhr.responseText);
                    }else{
                        config.abort(status);
                    }
                }
            }
            xhr.open(config.method, config.url, true);
            xhr.setRequestHeader("aa", "11")
            xhr.send(config.data);

        },



        createXHR: function(){
            var xhr;
            if(typeof XMLHttpRequest  !== "undefined"){
                xhr = new XMLHttpRequest()
            }else{
                xhr = new ActiveXObject("MSXML2.XMLHTTP")
            }
            return xhr;
        }
    }
    $.fn._create.prototype = $.fn;


})(window);



/*
var xhr
        if(typeof XMLHttpRequest  !== "undefined"){
            xhr = new XMLHttpRequest()
        }else{
            xhr = new ActiveXObject("MSXML2.XMLHTTP")
        }
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var status = xhr.status;
                console.log("status:", status)
                if(status >=200 && status<300 || status == 304 ){
                    console.log(status, " ",  xhr.responseText);
                }else{
                    console.log("请求失败:" + status);
                }
            }
        }
        xhr.open("get", "06Ajax.htm", true);
        xhr.send(null);


    ;(function(window, undefined){
        var $ = window.AJAX = function (params){
            var config = {
                url: "",
                success: function(){},
                data: null,
                method: "get",
                abort: function(msg){
                    alert("请求失败:" +msg);
                }
            };

            //合并配置
            for(var i in params){
                if(params[i] != "undefined"){
                    config[i] = params[i];
                }
            }


            return new $.prototype._create(config)
        };
        $.prototype = $.fn = {
            _create: function(config, bool){
                var xhr  = this.createXHR();
                this.readyChange(xhr, config);

            },

            readyChange: function(xhr, config){
                xhr.onreadystatechange = function(){

                    if(xhr.readyState == 3){
                        var status = xhr.status;
                        if(status >=200 && status<300 || status == 304 ){
                            var header = xhr.getAllResponseHeaders();
                            var date = xhr.getResponseHeader('date');
                            var yearMonth = new Date(date).toLocaleDateString();
                            var time = new Date(date).toLocaleTimeString();
                        }else{
                            config.abort(status);
                        }
                    }

                    if(xhr.readyState == 4){
                        var status = xhr.status;
                        if(status >=200 && status<300 || status == 304 ){
                            var header = xhr.getAllResponseHeaders();

                            var date = xhr.getResponseHeader('date');
                            var yearMonth = new Date(date).toLocaleDateString();
                            var time = new Date(date).toLocaleTimeString();

                            config.success(xhr.responseText);
                        }else{
                            config.abort(status);
                        }
                    }
                }
                xhr.open(config.method, config.url, true);
                xhr.setRequestHeader("aa", "11")
                xhr.send(config.data);

            },



            createXHR: function(){
                var xhr;
                if(typeof XMLHttpRequest  !== "undefined"){
                    xhr = new XMLHttpRequest()
                }else{
                    xhr = new ActiveXObject("MSXML2.XMLHTTP")
                }
                return xhr;
            }
        }
        $.fn._create.prototype = $.fn;


    })(window);
AJAX({
    url: "06AJAX.php",
    success: function(msg){
        console.log(msg)
    }
})*/
