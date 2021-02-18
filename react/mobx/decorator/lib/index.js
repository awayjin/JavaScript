/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/decorators.js":
/*!***************************!*\
  !*** ./src/decorators.js ***!
  \***************************/
/***/ (() => {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

(function () {
  var _class;

  console.log(Array(40).fill('-').join(''));

  function log(Class) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log('args', args);
      return _construct(Class, args);
    };
  } // 类装饰器


  var Animal = log(_class = function Animal(name, age) {
    _classCallCheck(this, Animal);

    this.name = name;
    this.age = age;
  }) || _class;

  var cat = new Animal('hello cat', 2);
  console.log(cat);
})();

(function () {
  var _dec, _class2;

  console.log(Array(40).fill('-').join('')); // 传入自定义参数
  // 如果想为装饰器@log传入自定义参数，则需要在log中返回一个本身就是装饰器的函数:

  function log(def) {
    return function (Class) {
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        console.log('args2:', args);
        console.log('def:', def);
        return _construct(Class, args);
      };
    };
  } // 类装饰器


  var Animal = (_dec = log('define param'), _dec(_class2 = function Animal(name, age) {
    _classCallCheck(this, Animal);

    this.name = name;
    this.age = age;
  }) || _class2);
  var dog = new Animal('hello dog', 3);
  console.log(dog);
})(); // function log (Class) {
//   return (...args) => {
//     console.log('args:', args)
//     return new Class(...args)
//   }
// }
//
// function fn(...args) {
//   console.log('fn:', ...args, 333)
//   return function decorator(Class) {
//     return (...args) => {
//       return new Class(...args)
//     }
//   }
// }
// // fn(33, [11, 22])
//
// // @fn('fn-test')
// // @log
// class Animal {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
//
// // const duck = new Animal('hello duck 3', 16)
// // duck.age = 200
// // console.log('animal', duck.age)
// // console.log(duck.age)
//
// // @fn('dd')
// // class Demo {}
//
// function readonly (target, name, descriptor) {
//   console.log('--> 1. readonly target:', target, ', name:', name, ', descriptor:', descriptor)
//   // console.log('descriptor.value', descriptor.value)
//   descriptor.writable = false
//   return descriptor
// }
//
//
// function log2(target, name, descriptor) {
//   const original = descriptor.value
//   console.log('4. descriptor:', descriptor.value)
//   if (typeof original === 'function') {
//     descriptor.value = function(...args) {
//       console.log(`3. log for args: ${args}`)
//       try {
//         return original.apply(this, args)
//       } catch (e) {
//         console.log(`Error: ${e}`)
//
//         throw e
//       }
//     }
//   }
//
//   return descriptor
// }
// class Animal2 {
//   constructor (name) {
//     this.name = name
//   }
//
//   @readonly age = 20
//
//   @log2
//   sayHello(name) {
//     console.log(`2. Hello ${name}, I'm ${this.name}`)
//   }
// }
// const cat = new Animal2('class method');
// // cat.age = 110;
// // console.log('Animal2', cat.age)
// cat.sayHello('Jack')

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decorators */ "./src/decorators.js");
/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_decorators__WEBPACK_IMPORTED_MODULE_0__);
 // function log (Class) {
//   return (...args) => {
//     console.log(args)
//     return new Class(...args)
//   }
// }
//
// @log
// class Animal {
//   constructor (name, age) {
//     this.name = name
//     this.age = age
//   }
// }
//
// const cat = new Animal('hello kitty 111', 16)
// console.log(cat)
//
//
// console.log(111)
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZWNvcmF0b3IvLi9zcmMvZGVjb3JhdG9ycy5qcyIsIndlYnBhY2s6Ly9kZWNvcmF0b3Ivd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2RlY29yYXRvci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZGVjb3JhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZGVjb3JhdG9yLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJBcnJheSIsImZpbGwiLCJqb2luIiwiQ2xhc3MiLCJhcmdzIiwiQW5pbWFsIiwibmFtZSIsImFnZSIsImNhdCIsImRlZiIsImRvZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxDQUFDLFlBQVk7QUFBQTs7QUFDWEEsU0FBTyxDQUFDQyxHQUFSLENBQVlDLEtBQUssQ0FBQyxFQUFELENBQUwsQ0FBVUMsSUFBVixDQUFlLEdBQWYsRUFBb0JDLElBQXBCLENBQXlCLEVBQXpCLENBQVo7O0FBRUEsV0FBU0gsR0FBVCxDQUFhSSxLQUFiLEVBQW9CO0FBQ2xCLFdBQU8sWUFBYTtBQUFBLHdDQUFUQyxJQUFTO0FBQVRBLFlBQVM7QUFBQTs7QUFDbEJOLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0JLLElBQXBCO0FBQ0Esd0JBQVdELEtBQVgsRUFBb0JDLElBQXBCO0FBQ0QsS0FIRDtBQUlELEdBUlUsQ0FVWDs7O0FBVlcsTUFZTEMsTUFaSyxHQVdWTixHQVhVLFVBYVQsZ0JBQWFPLElBQWIsRUFBbUJDLEdBQW5CLEVBQXdCO0FBQUE7O0FBQ3RCLFNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLFNBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNELEdBaEJROztBQWtCWCxNQUFNQyxHQUFHLEdBQUcsSUFBSUgsTUFBSixDQUFXLFdBQVgsRUFBd0IsQ0FBeEIsQ0FBWjtBQUNBUCxTQUFPLENBQUNDLEdBQVIsQ0FBWVMsR0FBWjtBQUdELENBdEJEOztBQXdCQSxDQUFDLFlBQVk7QUFBQTs7QUFDWFYsU0FBTyxDQUFDQyxHQUFSLENBQVlDLEtBQUssQ0FBQyxFQUFELENBQUwsQ0FBVUMsSUFBVixDQUFlLEdBQWYsRUFBb0JDLElBQXBCLENBQXlCLEVBQXpCLENBQVosRUFEVyxDQUdYO0FBQ0E7O0FBQ0EsV0FBU0gsR0FBVCxDQUFhVSxHQUFiLEVBQWtCO0FBQ2hCLFdBQU8sVUFBQ04sS0FBRCxFQUFXO0FBQ2hCLGFBQU8sWUFBYTtBQUFBLDJDQUFUQyxJQUFTO0FBQVRBLGNBQVM7QUFBQTs7QUFDbEJOLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLFFBQVosRUFBc0JLLElBQXRCO0FBQ0FOLGVBQU8sQ0FBQ0MsR0FBUixDQUFZLE1BQVosRUFBb0JVLEdBQXBCO0FBQ0EsMEJBQVdOLEtBQVgsRUFBb0JDLElBQXBCO0FBQ0QsT0FKRDtBQUtELEtBTkQ7QUFPRCxHQWJVLENBZVg7OztBQWZXLE1BaUJMQyxNQWpCSyxXQWdCVk4sR0FBRyxDQUFDLGNBQUQsQ0FoQk8saUJBa0JULGdCQUFhTyxJQUFiLEVBQW1CQyxHQUFuQixFQUF3QjtBQUFBOztBQUN0QixTQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDRCxHQXJCUTtBQXVCWCxNQUFNRyxHQUFHLEdBQUcsSUFBSUwsTUFBSixDQUFXLFdBQVgsRUFBd0IsQ0FBeEIsQ0FBWjtBQUNBUCxTQUFPLENBQUNDLEdBQVIsQ0FBWVcsR0FBWjtBQUNELENBekJELEksQ0EyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUI7Ozs7OztVQzlIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0NyQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGdDQUFnQyxZQUFZO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0NDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKEFycmF5KDQwKS5maWxsKCctJykuam9pbignJykpXG5cbiAgZnVuY3Rpb24gbG9nKENsYXNzKSB7XG4gICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnYXJncycsIGFyZ3MpXG4gICAgICByZXR1cm4gbmV3IENsYXNzKC4uLmFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLy8g57G76KOF6aWw5ZmoXG4gIEBsb2dcbiAgY2xhc3MgQW5pbWFsIHtcbiAgICBjb25zdHJ1Y3RvciAobmFtZSwgYWdlKSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5hZ2UgPSBhZ2U7XG4gICAgfVxuICB9XG4gIGNvbnN0IGNhdCA9IG5ldyBBbmltYWwoJ2hlbGxvIGNhdCcsIDIpO1xuICBjb25zb2xlLmxvZyhjYXQpXG5cblxufSkoKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc29sZS5sb2coQXJyYXkoNDApLmZpbGwoJy0nKS5qb2luKCcnKSlcblxuICAvLyDkvKDlhaXoh6rlrprkuYnlj4LmlbBcbiAgLy8g5aaC5p6c5oOz5Li66KOF6aWw5ZmoQGxvZ+S8oOWFpeiHquWumuS5ieWPguaVsO+8jOWImemcgOimgeWcqGxvZ+S4rei/lOWbnuS4gOS4quacrOi6q+WwseaYr+ijhemlsOWZqOeahOWHveaVsDpcbiAgZnVuY3Rpb24gbG9nKGRlZikge1xuICAgIHJldHVybiAoQ2xhc3MpID0+IHtcbiAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnYXJnczI6JywgYXJncylcbiAgICAgICAgY29uc29sZS5sb2coJ2RlZjonLCBkZWYpXG4gICAgICAgIHJldHVybiBuZXcgQ2xhc3MoLi4uYXJncylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyDnsbvoo4XppbDlmahcbiAgQGxvZygnZGVmaW5lIHBhcmFtJylcbiAgY2xhc3MgQW5pbWFsIHtcbiAgICBjb25zdHJ1Y3RvciAobmFtZSwgYWdlKSB7XG4gICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgdGhpcy5hZ2UgPSBhZ2U7XG4gICAgfVxuICB9XG4gIGNvbnN0IGRvZyA9IG5ldyBBbmltYWwoJ2hlbGxvIGRvZycsIDMpO1xuICBjb25zb2xlLmxvZyhkb2cpXG59KSgpO1xuXG4vLyBmdW5jdGlvbiBsb2cgKENsYXNzKSB7XG4vLyAgIHJldHVybiAoLi4uYXJncykgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKCdhcmdzOicsIGFyZ3MpXG4vLyAgICAgcmV0dXJuIG5ldyBDbGFzcyguLi5hcmdzKVxuLy8gICB9XG4vLyB9XG4vL1xuLy8gZnVuY3Rpb24gZm4oLi4uYXJncykge1xuLy8gICBjb25zb2xlLmxvZygnZm46JywgLi4uYXJncywgMzMzKVxuLy8gICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yKENsYXNzKSB7XG4vLyAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4vLyAgICAgICByZXR1cm4gbmV3IENsYXNzKC4uLmFyZ3MpXG4vLyAgICAgfVxuLy8gICB9XG4vLyB9XG4vLyAvLyBmbigzMywgWzExLCAyMl0pXG4vL1xuLy8gLy8gQGZuKCdmbi10ZXN0Jylcbi8vIC8vIEBsb2dcbi8vIGNsYXNzIEFuaW1hbCB7XG4vLyAgIGNvbnN0cnVjdG9yIChuYW1lLCBhZ2UpIHtcbi8vICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuLy8gICAgIHRoaXMuYWdlID0gYWdlO1xuLy8gICB9XG4vLyB9XG4vL1xuLy8gLy8gY29uc3QgZHVjayA9IG5ldyBBbmltYWwoJ2hlbGxvIGR1Y2sgMycsIDE2KVxuLy8gLy8gZHVjay5hZ2UgPSAyMDBcbi8vIC8vIGNvbnNvbGUubG9nKCdhbmltYWwnLCBkdWNrLmFnZSlcbi8vIC8vIGNvbnNvbGUubG9nKGR1Y2suYWdlKVxuLy9cbi8vIC8vIEBmbignZGQnKVxuLy8gLy8gY2xhc3MgRGVtbyB7fVxuLy9cbi8vIGZ1bmN0aW9uIHJlYWRvbmx5ICh0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbi8vICAgY29uc29sZS5sb2coJy0tPiAxLiByZWFkb25seSB0YXJnZXQ6JywgdGFyZ2V0LCAnLCBuYW1lOicsIG5hbWUsICcsIGRlc2NyaXB0b3I6JywgZGVzY3JpcHRvcilcbi8vICAgLy8gY29uc29sZS5sb2coJ2Rlc2NyaXB0b3IudmFsdWUnLCBkZXNjcmlwdG9yLnZhbHVlKVxuLy8gICBkZXNjcmlwdG9yLndyaXRhYmxlID0gZmFsc2Vcbi8vICAgcmV0dXJuIGRlc2NyaXB0b3Jcbi8vIH1cbi8vXG4vL1xuLy8gZnVuY3Rpb24gbG9nMih0YXJnZXQsIG5hbWUsIGRlc2NyaXB0b3IpIHtcbi8vICAgY29uc3Qgb3JpZ2luYWwgPSBkZXNjcmlwdG9yLnZhbHVlXG4vLyAgIGNvbnNvbGUubG9nKCc0LiBkZXNjcmlwdG9yOicsIGRlc2NyaXB0b3IudmFsdWUpXG4vLyAgIGlmICh0eXBlb2Ygb3JpZ2luYWwgPT09ICdmdW5jdGlvbicpIHtcbi8vICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oLi4uYXJncykge1xuLy8gICAgICAgY29uc29sZS5sb2coYDMuIGxvZyBmb3IgYXJnczogJHthcmdzfWApXG4vLyAgICAgICB0cnkge1xuLy8gICAgICAgICByZXR1cm4gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncylcbi8vICAgICAgIH0gY2F0Y2ggKGUpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coYEVycm9yOiAke2V9YClcbi8vXG4vLyAgICAgICAgIHRocm93IGVcbi8vICAgICAgIH1cbi8vICAgICB9XG4vLyAgIH1cbi8vXG4vLyAgIHJldHVybiBkZXNjcmlwdG9yXG4vLyB9XG4vLyBjbGFzcyBBbmltYWwyIHtcbi8vICAgY29uc3RydWN0b3IgKG5hbWUpIHtcbi8vICAgICB0aGlzLm5hbWUgPSBuYW1lXG4vLyAgIH1cbi8vXG4vLyAgIEByZWFkb25seSBhZ2UgPSAyMFxuLy9cbi8vICAgQGxvZzJcbi8vICAgc2F5SGVsbG8obmFtZSkge1xuLy8gICAgIGNvbnNvbGUubG9nKGAyLiBIZWxsbyAke25hbWV9LCBJJ20gJHt0aGlzLm5hbWV9YClcbi8vICAgfVxuLy8gfVxuLy8gY29uc3QgY2F0ID0gbmV3IEFuaW1hbDIoJ2NsYXNzIG1ldGhvZCcpO1xuLy8gLy8gY2F0LmFnZSA9IDExMDtcbi8vIC8vIGNvbnNvbGUubG9nKCdBbmltYWwyJywgY2F0LmFnZSlcbi8vIGNhdC5zYXlIZWxsbygnSmFjaycpIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vZGVjb3JhdG9ycyc7XG5cbi8vIGZ1bmN0aW9uIGxvZyAoQ2xhc3MpIHtcbi8vICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coYXJncylcbi8vICAgICByZXR1cm4gbmV3IENsYXNzKC4uLmFyZ3MpXG4vLyAgIH1cbi8vIH1cbi8vXG4vLyBAbG9nXG4vLyBjbGFzcyBBbmltYWwge1xuLy8gICBjb25zdHJ1Y3RvciAobmFtZSwgYWdlKSB7XG4vLyAgICAgdGhpcy5uYW1lID0gbmFtZVxuLy8gICAgIHRoaXMuYWdlID0gYWdlXG4vLyAgIH1cbi8vIH1cbi8vXG4vLyBjb25zdCBjYXQgPSBuZXcgQW5pbWFsKCdoZWxsbyBraXR0eSAxMTEnLCAxNilcbi8vIGNvbnNvbGUubG9nKGNhdClcbi8vXG4vL1xuLy8gY29uc29sZS5sb2coMTExKSJdLCJzb3VyY2VSb290IjoiIn0=