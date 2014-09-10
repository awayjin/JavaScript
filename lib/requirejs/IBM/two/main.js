/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-19
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */

require(["student", "class"], function(stu, cls){
    cls.addToClass(stu.createStudent("Rose", "female"));
    cls.addToClass( stu.createStudent("Jack", "male"));

    console.log(cls.getClassSize());
});

require(["../../js/jquery-1.8.2"], function(jquery){
    console.log(jquery, $)
});