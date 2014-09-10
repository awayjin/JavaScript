//对模块进行自定义

require({
    baseUrl: "libs"
});

require(["jquery-1.8.2", "underscore"], function(jj, underscore){
    $("body").append("<h1>title</h1>")
    console.log($().jquery, underscore());

});


require(["math"], function(math){
    console.log(math.add(11, 22));
});


require(["myLab"], function(myLab){
    console.log("1:", myLab.foo());
});



