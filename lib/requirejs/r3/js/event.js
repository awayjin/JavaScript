//使用define定义一个函数类型模块，RequireJS的模块可以是JS对象，函数或其它任何类型（CommonJS/SeaJS则只能是JS对象）。

define(['cache'], function(cache) {
    var doc = window.document,
        w3c = !!doc.addEventListener,
        expando = 'snandy' + (''+Math.random()).replace(/\D/g, ''),
        triggered,
        addListener = w3c ?
            function(el, type, fn) { el.addEventListener(type, fn, false); } :
            function(el, type, fn) { el.attachEvent('on' + type, fn); },
        removeListener = w3c ?
            function(el, type, fn) { el.removeEventListener(type, fn, false); } :
            function(el, type, fn) { el.detachEvent('on' + type, fn); };

    // 略去...

    return {
        bind : bind,
        unbind : unbind,
        trigger : trigger
    };
});