/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-18
 * Time: 下午3:58
 * To change this template use File | Settings | File Templates.
 */

define(function(){
    return {
        createStudent: function(name, gender){
            return {
                name: name,
                gender: gender
            }
        }
    };
});