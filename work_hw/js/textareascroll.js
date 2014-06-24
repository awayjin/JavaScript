(function(){
	var 
    // Browser capabilities
    //isAndroid = (/android/gi).test(navigator.appVersion),
    //isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
    //isPlaybook = (/playbook/gi).test(navigator.appVersion),
    isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),

    hasTouch = 'ontouchstart' in window && !isTouchPad,
 // Events
	START_EV = 'touchstart',
	MOVE_EV = 'touchmove',
	END_EV = 'touchend',
	CANCEL_EV = 'touchcancel',
	
	TextareaScroll = function(ele,options){
		var that = this;
		if(!hasTouch){
			return;
		}
		that.textarea = typeof ele == 'object' ? ele : document.getElementById(ele);
		function start(e){
			that.currPageY = e.pageY;
		};
		function move(e){
			var movePos = that.textarea.scrollTop +that.currPageY -  e.pageY;
			if(movePos > that.textarea.scrollHeight){
				movePos = that.textarea.scrollHeight;
			}else if(movePos < 0){
				movePos = 0;
			}
			that.textarea.scrollTop = movePos;
			that.currPageY = e.pageY;
			that.textarea.text = that.textarea.text + movePos;
		};
		function end(e){
			that.currPageY = null;
		};
		that.textarea.addEventListener(START_EV, start, false);
		that.textarea.addEventListener(MOVE_EV, move, false);
		that.textarea.addEventListener(END_EV, end, false);
		that.textarea.addEventListener(CANCEL_EV, end, false);
		
	};
	if (typeof exports !== 'undefined') {
		exports.TextareaScroll = TextareaScroll;
	}else {
		window.TextareaScroll = TextareaScroll;
	}
	
})();