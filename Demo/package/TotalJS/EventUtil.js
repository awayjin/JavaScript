/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-12-10
 * Time: 下午3:30
 * To change this template use File | Settings | File Templates.
 */
var EventUtil = {

    getEvent: function(event){
        return event ? event : window.event;
    },

    getTarget: function(event){
        return   event.target || event.srcElement;
    },

    /*
     element: 引用元素
     type: 事件类型
     handler: 回调函数
     */
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type, handler);
        }
    }
}