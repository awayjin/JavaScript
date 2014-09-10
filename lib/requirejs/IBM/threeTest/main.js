/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-22
 * Time: 上午10:46
 * To change this template use File | Settings | File Templates.
 */


require.config({
   paths: {
       jquery: "../../js/jquery-1.8.2"
   }
});

require(["math.js?id=2", "jquery"], function(math, jq){
//    console.log(M.add(5, 6));
    console.log(math.add(5, 6));

    jq("body").append("<h1>requirejs</h1>")
});
