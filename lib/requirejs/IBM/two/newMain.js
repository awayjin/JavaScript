/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-19
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */

require(["manager"], function(manager){
    manager.addNewStudent("Lucy", "female");
    manager.addNewStudent("Tom", "male");

    console.log(manager.getMyClassSize());
});