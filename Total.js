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
}2d