//使用define定义一个函数类型模块，RequireJS的模块可以是JS对象，函数或其它任何类型（CommonJS/SeaJS则只能是JS对象）。

define(function() {
    var idSeed = 0,
        cache = {},
        id = '_ guid _';

    // @private
    function guid(el) {
        return el[id] || (el[id] = ++idSeed);
    }

    return {
        set: function(el, key, val) {

            if (!el) {
                throw new Error('setting failed, invalid element');
            }

            var id = guid(el),
                c = cache[id] || (cache[id] = {});
            if (key) c[key] = val;

            return c;
        }

        // 略去...
    };
});