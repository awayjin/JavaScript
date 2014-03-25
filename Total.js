/*1.0 浏览器检测
     1.1
*/
    var isIE = /*@cc_on!@*/!1;
/*
     1.2 var ie678 = !-[1,];

*/

//2.0 字符串检测
var reg = /^([A-Za-z])([a-zA-Z_0-9]{4,19})$/gi;
if( reg.test("abcdef2") ){
    var txt1 = RegExp.$1;
    var txt2 = RegExp.$2;
    console.log(txt1, txt2);
}

var str = "abcdefg"
//str.substring(4);
if( /efg/.test(str) ){
    var t = str.substr(str.indexOf("efg"));
    console.log(t);
}

//3.0
/*
 *焦点图轮播
 */
$(function(){
    var len  = $(".focus-num li").length;
    var index = 0;
    var adTimer;
    $(".focus-num li").mouseover(function(){
        index = $(".focus-num li").index(this);
        showImg(index);
    }).eq(0).mouseover();

    //滑入 停止动画，滑出开始动画.
    $('#focus-ad').hover(function(){
        clearInterval(adTimer);
    },function(){
        adTimer = setInterval(function(){
            showImg(index)
            index++;
            if(index==len){index=0;}
        } , 5000);
    }).trigger("mouseleave");
})
// 通过控制top ，来显示不同的幻灯片
function showImg(index){
    var adWidth = $("#focus-ad").width();
    //alert(adWidth);
    $(".slider").stop(true,false).animate({left : -adWidth*index},1000);
    $(".focus-num li").removeClass("on").eq(index).addClass("on");
}