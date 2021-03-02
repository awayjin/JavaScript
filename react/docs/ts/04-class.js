// primitive values
// Symbol bigInt
// any union-types
// array, tuple元组-元组类型允许表示一个已知元素数量和类型的数组
// 函数和类型推断
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 类
var Animals = /** @class */ (function () {
    function Animals(name) {
        this.name = '3';
        this.name = name;
    }
    Animals.prototype.run = function () {
        return this.name + " is running.";
    };
    return Animals;
}());
var snake = new Animals('snake');
console.log(snake.run());
var Duck = /** @class */ (function (_super) {
    __extends(Duck, _super);
    function Duck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Duck.prototype.bark = function () {
        return this.name + " is barking.";
    };
    return Duck;
}(Animals));
var duck = new Animals('duct');
console.log(duck.run());
