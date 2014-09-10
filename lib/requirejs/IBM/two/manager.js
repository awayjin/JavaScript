/**
 * Created with JetBrains PhpStorm.
 * User: jinwei
 * Date: 14-8-19
 * Time: 下午3:15
 * To change this template use File | Settings | File Templates.
 */

require(["student", "class"], function(stu, cla){
    return {
        addNewStudent: function(name, gender){
           cla.addToClass(stu.createStudent(name, gender));
        },

        getMyClassSize: function(){
            return cla.getClassSize();
        }
    }
});