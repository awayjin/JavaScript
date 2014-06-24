/**
 * EditmyToDo.html 我的待办选项
 */
HW.EditmyToDo=(function(){
    var _myScroll=null;
    var _type=1;
    var _showCata="applyForMan";





    function getParam(){
        var href=$("base").attr("href");
        var param=HW.Tools.parseURL(href);
        _type=param["type"];
        _showCata=param["val"];
        //更新完成与返回按钮的链接值
        $("#toDoBtnSetOk").attr("href","myToDo.html?type="+_type+"&val="+_showCata+"&from=edit");
        $("#toDoBtnBack").attr("href","myToDo.html?type="+_type+"&val="+_showCata+"&from=edit");
       // alert(_type+"------"+_showCata);
    }


    /**
     * 显示当前被选中的项
     */
    function showResult(){
        var list=$("#editmyToDoCont li");

            if(_showCata=="applyForMan"){
                list.eq(0).find("span").addClass("cur");
            }
            if(_showCata=="applyForNum"){
                list.eq(1).find("span").addClass("cur");
            }


    }




    /**
     *  更改选项设置。
     */
    function regClick(){
        var list=$("#editmyToDoCont li");
        list.unbind().bind("click",function(e){
               e.preventDefault();
                var cur=$(this);
                var index=list.index(cur);
               _showCata=cur.attr("data-val");

                if(!cur.find("span").hasClass("cur")){
                    cur.find("span").addClass("cur");
                }

             //去除其它li的cur，保证唯一性；
              list.each(function(i,e){
                  var ele=$(e);
                  if(i!=index){
                      if(ele.find("span").hasClass("cur")){
                          ele.find("span").removeClass("cur");
                      }
                  }
              });

               //更新完成按钮的链接值
               $("#toDoBtnSetOk").attr("href","myToDo.html?type="+_type+"&val="+_showCata+"&from=edit");

                return false;
            });
    }


    //由于进入时没有hash历史记录。因此只能通过changePage方法进行返回与完成后的跳转功能。
    function linkJump(){
        //返回
        var back=$("#toDoBtnBack");
        back.unbind().bind("click",function(e){
            var href=$("#toDoBtnBack").attr("href");
            //alert(href);
            $.mobile.changePage(href,{changeHash:false,reverse:true});

            e.preventDefault();
            return false
        });

        //完成
        var ok=$("#toDoBtnSetOk");
        ok.unbind().bind("click",function(e){
            var href=$("#toDoBtnSetOk").attr("href");
            //alert(href);
            $.mobile.changePage(href,{changeHash:false,reverse:true});

            e.preventDefault();
            return false
        });

    }





    return{
        pageConfig:{
            name : 'EditmyToDo' ,
            id : "editMyToDo"
        },
        init:function(){
            getParam();
            regClick();
            linkJump();
            showResult();
            hoverBtn();
            //添加滑动
            setTimeout(function(){
               // _myScroll=HW.Tools._addiScroll("editmyToDoContWrapper","editmyToDoCont",0,0,0,0);
            },350);

        }

    }

})();

HW.Core.addModule("EditmyToDo",HW.EditmyToDo);
HW.Core.loadPage("EditmyToDo");
