/*
* func： 跟随客户端宽度变化调整div宽度
*
* */

var throttle = {
    start: function(){
        window.onresize = function(){
            this.resize(this.resizeDiv)
        };
    },

    resizeDiv: function(){
        var width = document.documentElement.clientWidth;
        if( width < 539){
            $(".product").width(width/2 -20);
        }else{
            $(".product").width(220);
        }
    },

    resize: function(method, context){
        clearTimeout(method.tId);
        method.tId= setTimeout(function(){
            method.call(context);
        }, 100);
    }

}
throttle.start();


function throttle(ele, gap){

    window.onresize = function(){
        resize(resizeDiv);
    }

    function resizeDiv(ele, gap){
        var width = document.documentElement.clientWidth;
        $(ele).width(width/2 - gap);
    }

    function resize(method, content){
        clearTimeout(method.tId);
        method.tId= setTimeout(function(){
            method.call(context);
        }, 100);
    }

    return {

    }

}