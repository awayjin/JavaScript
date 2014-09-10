/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-14
 * Time: 上午9:20
 * To change this template use File | Settings | File Templates.
 */


define(["jquery-1.8.2"], function($){
//    var $ = require("jquery-1.8.2");
//    require("jquery-1.8.2");
//    alert($().jquery)
//     $("body").append("<h1>wo qu</h1>");

    var add = function(x, y){
        return x + y;
    };

    return {
        add: add
    };
});