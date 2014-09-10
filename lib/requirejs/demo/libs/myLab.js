/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-14
 * Time: 上午9:20
 * To change this template use File | Settings | File Templates.
 */


/*
define(function(){
   var plus = function(a, b){
        return a-b;
   };

   return {plus: plus}
});
*/


define(["math"], function(math){
    function foo(){
       return  math.add(3, 2)+1;
    }
    return {foo: foo}

});