/**
 * Smart Queue v0.1
 * A Task manager with level-based dependency management.
 * http://janlay.com/
 *
 * Copyright (c) 2009 Janlay Wu.
 * Licensed under the MIT.
 *
 * @author: Janlay Wu
 * @version: v0.1.1
 * @license: MIT
 *
 * History (+added, *changed):
 * v0.1.1	- 2009-09-17
 *			* minor changes
 * v0.1		- 2009-09-06
 *			+ project created.
 * 
 * TODO:
 *		~ Firing queue with particular level.
 *		~ Instances of SmartQueue.
 *		~ Delay and async support.
 *		~ Handling DOMReady handlers of popular JavaScript frameworks.
 */

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
/**
 * Initializes the SmartQueue object.
 */
var SmartQueue = window.SmartQueue || {};
SmartQueue.version = '0.1.1';

(function() {
	/**
	 * const members
	 */
	var FUNCTION = 'function', NUMBER = 'number', STRING = 'string',
		LEVEL_LOW = 0, LEVEL_NORMAL = 1, LEVEL_HIGH = 2;

	/**
	 * private members
	 */
	var _id = 0;

	/**
	 * @member Queue
	 */
	var Q = SmartQueue.Queue = [[], [], []];

	/**
	 * Validates Task level
	 * @param {Int} level to validate.
	 * @return {Boolean} A value indicats weather level is a valid Task level.
	 */
	var _validateLevel = function(level) {
		return typeof level === NUMBER && level >= LEVEL_LOW && level <= LEVEL_HIGH;
	};

	/**
	 * Find Task by name
	 * @param {String} name to find.
	 * @return {Int} index of the Task, -1 if not found.
	 */
	var _findTask = function(queue, name) {
		for(var i = 0, size = queue.length; i < size; i++) {
			if(queue[i].name === name) {
				return i;
			}
		}
		return -1;
	};

	/**
	 * Validates and populates members into a Task reference.
	 * @param {any} Members to populate.
	 * @throws {Error} if type of fn is not a function.
	 */
	var _setupTask = function(fn, level, name, dependencies) {
		if(typeof fn !== FUNCTION) {
			throw new Error('Invalid argument type: fn.');
		}
		this.fn = fn;
		this.level =  _validateLevel(level) ? level : LEVEL_NORMAL;

		// detect type of name
		this.name = typeof name === STRING && name ? name : 't' + _id++;

		// dependencies could be retrieved as an 'Object', so use instanceof instead.
		this.dependencies = dependencies instanceof Array ? dependencies : [];
	};

	/**
	 * @class Task
	 * @constructor
	 * @param {Object|any} an Object to initialize.
	 */
	var T = SmartQueue.Task = function(task) {
		if(arguments.length > 1) {
			_setupTask.apply(this, arguments);
		} else {
			_setupTask.call(this, task.fn, task.level, task.name, task.dependencies);
		}

		// init context/scope and data for the task.
		this.context = task.context || window;
		this.data = task.data || {};
	};
	/**
	 * Provides instance methods for Task class.
	 */
	T.prototype = {
		/**
		 * Current status. It won't be fired if it's false.
		 * @property enabled
		 * @type Boolean
		 */
		enabled: true,

		/**
		 * Registers the Task to Queue.
		 * @method register
		 * @throws {Error} if name of the Task already exists in target Queue.
		 */
		register: function() {
			var queue = Q[this.level];
			if(_findTask(queue, this.name) !== -1) {
				throw new Error('Specified name exists: ' + this.name);
			}
			queue.push(this);
		},

		/**
		 * Changes the level. It do nothing if level is not changed.
		 * @method changeTo
		 * @param {Int} New level to change to.
		 * @throws {Error} if level is invalid.
		 */
		changeTo: function(level) {
			if(!_validateLevel(level)) {
				throw new Error('Invalid argument: level');
			}
			level = parseInt(level, 10);
			if(this.level === level) {
				return;
			}
			Q[this.level].remove(this);
			this.level = level;
			this.register();
		},
		execute: function() {
			if(this.enabled) {
				// pass context and data
				this.fn.call(this.context, this.data);
			}
		},

		/**
		 * Represents Task in String.
		 * @return {String}
		 */
		toString: function() {
			var str = this.name;
			if(this.dependencies.length) {
				str += ' depends on: [' + this.dependencies.join(', ') + ']';
			}
			return str;
		}
	};

	// Provides static methods for Queue object.
	/**
	 * Reset All Queue
	 */
	SmartQueue.init = function() {
		Q.forEach(function(queue) {
			queue.length = 0;
		});
	};

	/**
	 * Execute All functions in the Queue.
	 */
	SmartQueue.fire = function() {
		var _dirty = true, // A flag indicates weather the Queue need to be fired.
			_sorted = [], index;
		// Sort all Queues.
		// ref: http://en.wikipedia.org/wiki/Topological_sorting
		var _visit = function(queue, task) {
				if(task._visited >= 1) {
					task._visited++;
					return;
				}
				task._visited = 1;
				// find out and visit all dependencies.
				var dependencies = [], i;
				task.dependencies.forEach(function(dependency) {
					i = _findTask(queue, dependency);
					if(i != -1) {
						dependencies.push(queue[i]);
					}
				});
				dependencies.forEach(function(t) {
					_visit(queue, t);
				});
				if(task._visited === 1) {
					_sorted[index].push(task);
				}
			},
			_start = function(queue) {
				queue.forEach(function(task) {
					_visit(queue, task);
				});
			},
			_sort = function(suppress) {
				for(index = LEVEL_LOW; index <= LEVEL_HIGH; index++) {
					var queue = Q[index];
					_sorted[index] = [];
					_start(queue);
					// for(var i = queue[index].length - 1; i >= 0; queue[i--].length = 0);
					if(!suppress && queue.length > _sorted[index].length) {
						throw new Error('Cycle found in queue: ' + queue);
					}
				}
			},
			_execute = function(queue) {
				queue.forEach(function(task) {
					task.execute();
				});

				// clean up
				queue.length = 0;
			};

		return function(suppress) {
			if(!_dirty) {
				return;
			}
			_dirty = true;
			_sort(suppress);
			for(var i = LEVEL_HIGH; i >= LEVEL_LOW; i--) {
				// execute all
				_execute(_sorted[i]);
			}
		};
	}();
})();
