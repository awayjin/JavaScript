
require.config({
    paths: {
        jquery: 'jquery-1.8.2',
        test: "test"
    }
});
require(['jquery', "../test"], function($, test){
    alert($().jquery)
    $("html").click(function(){
        var href = location.href;
        //href = href.substring(0, href.indexOf("?"));
        location.href = href+"?oprtCatNo=101&timeId="+(+new Date());
    });
});








/*
RequireJS API 存在于RequireJS载入时创建的命名空间requirejs下。其主要API主要是下面三个函数:

define - 该函数用户创建模块。每个模块拥有一个唯一的模块ID，它被用于RequireJS的运行时函数，define函数是一个全局函数，
	     不需要使用requirejs命名空间.

require – 该函数用于读取依赖。同样它是一个全局函数，不需要使用requirejs命名空间.

config– 该函数用于配置RequireJS.


var requirejs, require, define;
*/

/*

配置函数config

如果你想改变RequireJS的默认配置来使用自己的配置，你可以使用require.configh函数。config函数需要传入一个可选参数对象，这个可选参数对象包括了许多的配置参数选项。下面是一些你可以使用的配置：
baseUrl——用于加载模块的根路径。

paths——用于映射不存在根路径下面的模块路径。

shims——配置在脚本/模块外面并没有使用RequireJS的函数依赖并且初始化函数。假设underscore并没有使用  RequireJS定义，但是你还是想通过RequireJS来使用它，那么你就需要在配置中把它定义为一个shim。
deps——加载依赖关系数组


*/

//alert("requirejs loaded success.");

/*
require(['moduleA', "moduleB", "moduleC"], function(moduleA, moduleB, moduleC){

});

require(['jQuery', "underscore", "backbone"], function($, _, Backbone){

});
*/





/*require.config({
	//baseUrl——用于加载模块的根路径。
	baseUrl: "./",
	
	//用于映射不存在根路径下面的模块路径。
	//path mapping for modules that don’t exists in under the base URL
	paths: ""

});*/




// require(['jquery'], function(){
	// alert($().jquery);
	// $("body").append("<h1>01202</h1>");
// });

// require(['client']);

