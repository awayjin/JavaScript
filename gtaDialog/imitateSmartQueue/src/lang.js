(function () {
// p represents a pointer, prototype...
var p = Array.prototype;

// Mozilla 1.8 has support for indexOf, lastIndexOf, forEach, filter, map, some, every
// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
if (!p.indexOf) {
	p.indexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = 0;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex; i < this.length; i++) {
			if (this[i] === obj)
				return i;
		}
		return -1;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:lastIndexOf
if (!p.lastIndexOf) {
	p.lastIndexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = this.length - 1;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex; i >= 0; i--) {
			if (this[i] === obj)
				return i;
		}
		return -1;
	};
}


// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:forEach
if (!p.forEach) {
	p.forEach = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			f.call(obj, this[i], i, this);
		}
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:filter
if (!p.filter) {
	p.filter = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		var res = [];
		for (var i = 0; i < l; i++) {
			if (f.call(obj, this[i], i, this)) {
				res.push(this[i]);
			}
		}
		return res;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:map
if (!p.map) {
	p.map = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		var res = [];
		for (var i = 0; i < l; i++) {
			res.push(f.call(obj, this[i], i, this));
		}
		return res;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:some
if (!p.some) {
	p.some = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			if (f.call(obj, this[i], i, this)) {
				return true;
			}
		}
		return false;
	};
}

// http://developer-test.mozilla.org/docs/Core_JavaScript_1.5_Reference:Objects:Array:every
if (!p.every) {
	p.every = function (f, obj) {
		var l = this.length;	// must be fixed during loop... see docs
		for (var i = 0; i < l; i++) {
			if (!f.call(obj, this[i], i, this)) {
				return false;
			}
		}
		return true;
	};
}

p.contains = function (obj) {
	return this.indexOf(obj) != -1;
};

p.copy = function (obj) {
	return this.concat();
};

p.insertAt = function (obj, i) {
	this.splice(i, 0, obj);
};

p.insertBefore = function (obj, obj2) {
	var i = this.indexOf(obj2);
	if (i == -1)
		this.push(obj);
	else
		this.splice(i, 0, obj);
};

p.removeAt = function (i) {
	this.splice(i, 1);
};

p.remove = function (obj) {
	var i = this.indexOf(obj);
	if (i != -1)
		this.splice(i, 1);
};
})();
