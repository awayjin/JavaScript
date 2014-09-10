/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-18
 * Time: 下午4:01
 * To change this template use File | Settings | File Templates.
 */


define(function(){
    var allStudents = [];
    return {
        classId: "001",
        department: "computer",
        addToClass: function(student){
            allStudents.push(student);
        },
        getClassSize: function(){
            return allStudents.length;
        }
    }
});