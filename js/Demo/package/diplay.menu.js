/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-3-11
 * Time: 下午5:03
 * To change this template use File | Settings | File Templates.
 */

/**
 author: jinwei
 */
//显示子菜单(解决鼠标移动过快而不停显示的问题)
var displayMenu = function(window, undefined){
    var openTimer = 0
    closeTimer = 0;

    function clearCloseTimer(){
        if(closeTimer){
            window.clearTimeout(closeTimer);
            closeTimer = null;
        }
    };

    function clearOpenTimer(){
        if(openTimer){
            window.clearTimeout(openTimer);
            openTimer = null;
        }
    }

    function showChild(displayEle){
        $(".nav_child").slideDown('fast');
    }

    function hiddeChild(displayEle){
        $(".nav_child").slideUp('fast');
    }

    return {
        start: function(){
            $(".nav").mouseenter(function(){
                clearCloseTimer();
                openTimer = window.setTimeout(showChild, 200);
            }).mouseleave(function(){
                    clearOpenTimer();
                    closeTimer = window.setTimeout(hiddeChild, 500)
                });
        }
    };

}(window);
displayMenu.start();