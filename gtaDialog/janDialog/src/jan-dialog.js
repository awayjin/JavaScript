/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-7-30
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */

;(function(window, undefined){
    var J = window.J  = window.Jan = window.jan;

    //默认参数
    var parameter = {
        width: "220px",
        height: "150px",
        janContainer: "",
        janTitle: "",
        janContent: ""

    }

    var janDialog = function(options){
           return new J.prototype.init(options)
    };
    janDialog.protype = {
        init: function(){
            var html = '';
        }
    }


    J.dialog = Jan.dialog = jan.dialog = janDialog;
})(window);