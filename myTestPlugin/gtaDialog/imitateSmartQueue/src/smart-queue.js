// JavaScript Document

//1.0 创建命名空间，组件的所有代码存放在这个命名空间里
var SmartQueue = window.SmartQueue || {};
SmartQueue.version = "0.1.1";


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
