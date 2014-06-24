
alert("loaded done.");
require.config({
	paths: {
		jquery: "jquery-1.8.2"
	}

});

require(['jquery'], function(){
	alert($().jquery);
});