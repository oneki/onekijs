module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js":
/*!***************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/arrayWithHoles.js":
/*!*************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js":
/*!****************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!********************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!***************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!*************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/construct.js":
/*!********************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/construct.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct */ "../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js");

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/createClass.js":
/*!**********************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/createClass.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/defineProperty.js":
/*!*************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/extends.js":
/*!******************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/extends.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!*************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/inherits.js":
/*!*******************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/inherits.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/isNativeFunction.js":
/*!***************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/isNativeFunction.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

module.exports = _isNativeFunction;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js":
/*!***********************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = _isNativeReflectConstruct;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/iterableToArray.js":
/*!**************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

module.exports = _iterableToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js":
/*!*******************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/nonIterableRest.js":
/*!**************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js":
/*!****************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js":
/*!**********************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/objectWithoutProperties.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var objectWithoutPropertiesLoose = __webpack_require__(/*! ./objectWithoutPropertiesLoose */ "../../node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js":
/*!***************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/objectWithoutPropertiesLoose.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!*************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/slicedToArray.js":
/*!************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles */ "../../node_modules/@babel/runtime/helpers/arrayWithHoles.js");

var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit */ "../../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableRest = __webpack_require__(/*! ./nonIterableRest */ "../../node_modules/@babel/runtime/helpers/nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js":
/*!****************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles */ "../../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js");

var iterableToArray = __webpack_require__(/*! ./iterableToArray */ "../../node_modules/@babel/runtime/helpers/iterableToArray.js");

var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray */ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js");

var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread */ "../../node_modules/@babel/runtime/helpers/nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/typeof.js":
/*!*****************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/typeof.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js":
/*!*************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray */ "../../node_modules/@babel/runtime/helpers/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;

/***/ }),

/***/ "../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js":
/*!**************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/helpers/wrapNativeSuper.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "../../node_modules/@babel/runtime/helpers/setPrototypeOf.js");

var isNativeFunction = __webpack_require__(/*! ./isNativeFunction */ "../../node_modules/@babel/runtime/helpers/isNativeFunction.js");

var construct = __webpack_require__(/*! ./construct */ "../../node_modules/@babel/runtime/helpers/construct.js");

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return construct(Class, arguments, getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

module.exports = _wrapNativeSuper;

/***/ }),

/***/ "../../node_modules/@babel/runtime/regenerator/index.js":
/*!********************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/@babel/runtime/regenerator/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "regenerator-runtime");


/***/ }),

/***/ "../../node_modules/next/dist/client/link.js":
/*!*********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/client/link.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "react"));

var _url = __webpack_require__(/*! url */ "url");

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

var _router = _interopRequireDefault(__webpack_require__(/*! ./router */ "../../node_modules/next/dist/client/router.js"));

var _router2 = __webpack_require__(/*! ../next-server/lib/router/router */ "../../node_modules/next/dist/next-server/lib/router/router.js");

function isLocal(href) {
  var url = (0, _url.parse)(href, false, true);
  var origin = (0, _url.parse)((0, _utils.getLocationOrigin)(), false, true);
  return !url.host || url.protocol === origin.protocol && url.host === origin.host;
}

function memoizedFormatUrl(formatFunc) {
  var lastHref = null;
  var lastAs = null;
  var lastResult = null;
  return (href, as) => {
    if (lastResult && href === lastHref && as === lastAs) {
      return lastResult;
    }

    var result = formatFunc(href, as);
    lastHref = href;
    lastAs = as;
    lastResult = result;
    return result;
  };
}

function formatUrl(url) {
  return url && typeof url === 'object' ? (0, _utils.formatWithValidation)(url) : url;
}

var observer;
var listeners = new Map();
var IntersectionObserver = false ? undefined : null;
var prefetched = {};

function getObserver() {
  // Return shared instance of IntersectionObserver if already created
  if (observer) {
    return observer;
  } // Only create shared IntersectionObserver if supported in browser


  if (!IntersectionObserver) {
    return undefined;
  }

  return observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!listeners.has(entry.target)) {
        return;
      }

      var cb = listeners.get(entry.target);

      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listeners.delete(entry.target);
        cb();
      }
    });
  }, {
    rootMargin: '200px'
  });
}

var listenToIntersections = (el, cb) => {
  var observer = getObserver();

  if (!observer) {
    return () => {};
  }

  observer.observe(el);
  listeners.set(el, cb);
  return () => {
    try {
      observer.unobserve(el);
    } catch (err) {
      console.error(err);
    }

    listeners.delete(el);
  };
};

class Link extends _react.Component {
  constructor(props) {
    super(props);
    this.p = void 0;

    this.cleanUpListeners = () => {};

    this.formatUrls = memoizedFormatUrl((href, asHref) => {
      return {
        href: (0, _router2.addBasePath)(formatUrl(href)),
        as: asHref ? (0, _router2.addBasePath)(formatUrl(asHref)) : asHref
      };
    });

    this.linkClicked = e => {
      var {
        nodeName,
        target
      } = e.currentTarget;

      if (nodeName === 'A' && (target && target !== '_self' || e.metaKey || e.ctrlKey || e.shiftKey || e.nativeEvent && e.nativeEvent.which === 2)) {
        // ignore click for new tab / new window behavior
        return;
      }

      var {
        href,
        as
      } = this.formatUrls(this.props.href, this.props.as);

      if (!isLocal(href)) {
        // ignore click if it's outside our scope (e.g. https://google.com)
        return;
      }

      var {
        pathname
      } = window.location;
      href = (0, _url.resolve)(pathname, href);
      as = as ? (0, _url.resolve)(pathname, as) : href;
      e.preventDefault(); //  avoid scroll for urls with anchor refs

      var {
        scroll
      } = this.props;

      if (scroll == null) {
        scroll = as.indexOf('#') < 0;
      } // replace state instead of push if prop is present


      _router.default[this.props.replace ? 'replace' : 'push'](href, as, {
        shallow: this.props.shallow
      }).then(success => {
        if (!success) return;

        if (scroll) {
          window.scrollTo(0, 0);
          document.body.focus();
        }
      });
    };

    if (true) {
      if (props.prefetch) {
        console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/zeit/next.js/prefetch-true-deprecated');
      }
    }

    this.p = props.prefetch !== false;
  }

  componentWillUnmount() {
    this.cleanUpListeners();
  }

  getPaths() {
    var {
      pathname
    } = window.location;
    var {
      href: parsedHref,
      as: parsedAs
    } = this.formatUrls(this.props.href, this.props.as);
    var resolvedHref = (0, _url.resolve)(pathname, parsedHref);
    return [resolvedHref, parsedAs ? (0, _url.resolve)(pathname, parsedAs) : resolvedHref];
  }

  handleRef(ref) {
    if (this.p && IntersectionObserver && ref && ref.tagName) {
      this.cleanUpListeners();
      var isPrefetched = prefetched[this.getPaths().join( // Join on an invalid URI character
      '%')];

      if (!isPrefetched) {
        this.cleanUpListeners = listenToIntersections(ref, () => {
          this.prefetch();
        });
      }
    }
  } // The function is memoized so that no extra lifecycles are needed
  // as per https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html


  prefetch(options) {
    if (!this.p || true) return; // Prefetch the JSON page if asked (only in the client)

    var paths = this.getPaths(); // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch

    _router.default.prefetch(paths[
    /* href */
    0], paths[
    /* asPath */
    1], options).catch(err => {
      if (true) {
        // rethrow to show invalid URL errors
        throw err;
      }
    });

    prefetched[paths.join( // Join on an invalid URI character
    '%')] = true;
  }

  render() {
    var {
      children
    } = this.props;
    var {
      href,
      as
    } = this.formatUrls(this.props.href, this.props.as); // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

    if (typeof children === 'string') {
      children = _react.default.createElement("a", null, children);
    } // This will return the first child, if multiple are provided it will throw an error


    var child = _react.Children.only(children);

    var props = {
      ref: el => {
        this.handleRef(el);

        if (child && typeof child === 'object' && child.ref) {
          if (typeof child.ref === 'function') child.ref(el);else if (typeof child.ref === 'object') {
            child.ref.current = el;
          }
        }
      },
      onMouseEnter: e => {
        if (child.props && typeof child.props.onMouseEnter === 'function') {
          child.props.onMouseEnter(e);
        }

        this.prefetch({
          priority: true
        });
      },
      onClick: e => {
        if (child.props && typeof child.props.onClick === 'function') {
          child.props.onClick(e);
        }

        if (!e.defaultPrevented) {
          this.linkClicked(e);
        }
      }
    }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user

    if (this.props.passHref || child.type === 'a' && !('href' in child.props)) {
      props.href = as || href;
    } // Add the ending slash to the paths. So, we can serve the
    // "<page>/index.html" directly.


    if (false) { var rewriteUrlForNextExport; }

    return _react.default.cloneElement(child, props);
  }

}

if (true) {
  var warn = (0, _utils.execOnce)(console.error); // This module gets removed by webpack.IgnorePlugin

  var PropTypes = __webpack_require__(/*! prop-types */ "prop-types");

  var exact = __webpack_require__(/*! prop-types-exact */ "prop-types-exact"); // @ts-ignore the property is supported, when declaring it on the class it outputs an extra bit of code which is not needed.


  Link.propTypes = exact({
    href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    prefetch: PropTypes.bool,
    replace: PropTypes.bool,
    shallow: PropTypes.bool,
    passHref: PropTypes.bool,
    scroll: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, (props, propName) => {
      var value = props[propName];

      if (typeof value === 'string') {
        warn("Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>");
      }

      return null;
    }]).isRequired
  });
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "../../node_modules/next/dist/client/router.js":
/*!***********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/client/router.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.useRouter = useRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.createRouter = exports.withRouter = exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router2 = _interopRequireWildcard(__webpack_require__(/*! ../next-server/lib/router/router */ "../../node_modules/next/dist/next-server/lib/router/router.js"));

exports.Router = _router2.default;
exports.NextRouter = _router2.NextRouter;

var _routerContext = __webpack_require__(/*! ../next-server/lib/router-context */ "../next-server/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "../../node_modules/next/dist/client/with-router.js"));

exports.withRouter = _withRouter.default;
/* global window */

var singletonRouter = {
  router: null,
  // holds the actual router instance
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router2.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      var router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  // We don't really know the types here, so we add them later instead
  ;

  singletonRouter[field] = function () {
    var router = getRouter();
    return router[field](...arguments);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router2.default.events.on(event, function () {
      var eventField = "on" + event.charAt(0).toUpperCase() + event.substring(1);
      var _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...arguments);
        } catch (err) {
          // tslint:disable-next-line:no-console
          console.error("Error when running the Router event: " + eventField); // tslint:disable-next-line:no-console

          console.error(err.message + "\n" + err.stack);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
} // Export the singletonRouter and this is the public API.


var _default = singletonRouter; // Reexport the withRoute HOC

exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
} // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.


var createRouter = function createRouter() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  singletonRouter.router = new _router2.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}; // This function is used to create the `withRouter` router instance


exports.createRouter = createRouter;

function makePublicRouterInstance(router) {
  var _router = router;
  var instance = {};

  for (var property of urlPropertyFields) {
    if (typeof _router[property] === 'object') {
      instance[property] = Object.assign({}, _router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = _router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router2.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = function () {
      return _router[field](...arguments);
    };
  });
  return instance;
}

/***/ }),

/***/ "../../node_modules/next/dist/client/with-router.js":
/*!****************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/client/with-router.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "../../node_modules/next/dist/client/router.js");

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return _react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router.useRouter)()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps // This is needed to allow checking for custom getInitialProps in _app
  ;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    var name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = "withRouter(" + name + ")";
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/mitt.js":
/*!******************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/mitt.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
MIT License

Copyright (c) Jason Miller (https://jasonformat.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

Object.defineProperty(exports, "__esModule", {
  value: true
});

function mitt() {
  const all = Object.create(null);
  return {
    on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    },

    off(type, handler) {
      if (all[type]) {
        // tslint:disable-next-line:no-bitwise
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    },

    emit(type, ...evts) {
      // eslint-disable-next-line array-callback-return
      ;
      (all[type] || []).slice().map(handler => {
        handler(...evts);
      });
    }

  };
}

exports.default = mitt;

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/router/router.js":
/*!***************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/router/router.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");

const mitt_1 = __importDefault(__webpack_require__(/*! ../mitt */ "../../node_modules/next/dist/next-server/lib/mitt.js"));

const utils_1 = __webpack_require__(/*! ../utils */ "../../node_modules/next/dist/next-server/lib/utils.js");

const is_dynamic_1 = __webpack_require__(/*! ./utils/is-dynamic */ "../../node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js");

const route_matcher_1 = __webpack_require__(/*! ./utils/route-matcher */ "../../node_modules/next/dist/next-server/lib/router/utils/route-matcher.js");

const route_regex_1 = __webpack_require__(/*! ./utils/route-regex */ "../../node_modules/next/dist/next-server/lib/router/utils/route-regex.js");

const basePath =  false || '';

function addBasePath(path) {
  return path.indexOf(basePath) !== 0 ? basePath + path : path;
}

exports.addBasePath = addBasePath;

function delBasePath(path) {
  return path.indexOf(basePath) === 0 ? path.substr(basePath.length) || '/' : path;
}

exports.delBasePath = delBasePath;

function toRoute(path) {
  return path.replace(/\/$/, '') || '/';
}

const prepareRoute = path => toRoute(!path || path === '/' ? '/index' : path);

function fetchNextData(pathname, query, isServerRender, cb) {
  let attempts = isServerRender ? 3 : 1;

  function getResponse() {
    return fetch(utils_1.formatWithValidation({
      pathname: addBasePath( // @ts-ignore __NEXT_DATA__
      `/_next/data/${__NEXT_DATA__.buildId}${delBasePath(pathname)}.json`),
      query
    }), {
      // Cookies are required to be present for Next.js' SSG "Preview Mode".
      // Cookies may also be required for `getServerSideProps`.
      //
      // > `fetch` won’t send cookies, unless you set the credentials init
      // > option.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      //
      // > For maximum browser compatibility when it comes to sending &
      // > receiving cookies, always supply the `credentials: 'same-origin'`
      // > option instead of relying on the default.
      // https://github.com/github/fetch#caveats
      credentials: 'same-origin'
    }).then(res => {
      if (!res.ok) {
        if (--attempts > 0 && res.status >= 500) {
          return getResponse();
        }

        throw new Error(`Failed to load static props`);
      }

      return res.json();
    });
  }

  return getResponse().then(data => {
    return cb ? cb(data) : data;
  }).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      ;
      err.code = 'PAGE_LOAD_ERROR';
    }

    throw err;
  });
}

class Router {
  constructor(pathname, query, as, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component,
    err,
    subscription,
    isFallback
  }) {
    // Static Data Cache
    this.sdc = {};

    this.onPopState = e => {
      if (!e.state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname,
          query
        } = this;
        this.changeState('replaceState', utils_1.formatWithValidation({
          pathname,
          query
        }), utils_1.getURL());
        return;
      } // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site


      if (e.state && this.isSsr && e.state.as === this.asPath && url_1.parse(e.state.url).pathname === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(e.state)) {
        return;
      }

      const {
        url,
        as,
        options
      } = e.state;

      if (true) {
        if (typeof url === 'undefined' || typeof as === 'undefined') {
          console.warn('`popstate` event triggered but `event.state` did not have `url` or `as` https://err.sh/zeit/next.js/popstate-state-empty');
        }
      }

      this.replace(url, as, options);
    };

    this._getStaticData = asPath => {
      const pathname = prepareRoute(url_1.parse(asPath).pathname);
      return  false ? undefined : fetchNextData(pathname, null, this.isSsr, data => this.sdc[pathname] = data);
    };

    this._getServerData = asPath => {
      let {
        pathname,
        query
      } = url_1.parse(asPath, true);
      pathname = prepareRoute(pathname);
      return fetchNextData(pathname, query, this.isSsr);
    }; // represents the current component key


    this.route = toRoute(pathname); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname !== '/_error') {
      this.components[this.route] = {
        Component,
        props: initialProps,
        err,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname;
    this.query = query; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    this.asPath = // @ts-ignore this is temporarily global (attached to window)
    is_dynamic_1.isDynamicRoute(pathname) && __NEXT_DATA__.autoExport ? pathname : as;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;

    if (false) {}
  } // @deprecated backwards compatibility even though it's a private method.


  static _rewriteUrlForNextExport(url) {
    if (false) {} else {
      return url;
    }
  }

  update(route, mod) {
    const Component = mod.default || mod;
    const data = this.components[route];

    if (!data) {
      throw new Error(`Cannot update unavailable route: ${route}`);
    }

    const newData = Object.assign(Object.assign({}, data), {
      Component,
      __N_SSG: mod.__N_SSG,
      __N_SSP: mod.__N_SSP
    });
    this.components[route] = newData; // pages/_app.js updated

    if (route === '/_app') {
      this.notify(this.components[this.route]);
      return;
    }

    if (route === this.route) {
      this.notify(newData);
    }
  }

  reload() {
    window.location.reload();
  }
  /**
   * Go back in history
   */


  back() {
    window.history.back();
  }
  /**
   * Performs a `pushState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  push(url, as = url, options = {}) {
    return this.change('pushState', url, as, options);
  }
  /**
   * Performs a `replaceState` with arguments
   * @param url of the route
   * @param as masks `url` for the browser
   * @param options object you can define `shallow` and other options
   */


  replace(url, as = url, options = {}) {
    return this.change('replaceState', url, as, options);
  }

  change(method, _url, _as, options) {
    return new Promise((resolve, reject) => {
      if (!options._h) {
        this.isSsr = false;
      } // marking route changes as a navigation start entry


      if (utils_1.ST) {
        performance.mark('routeChange');
      } // If url and as provided as an object representation,
      // we'll format them into the string version here.


      let url = typeof _url === 'object' ? utils_1.formatWithValidation(_url) : _url;
      let as = typeof _as === 'object' ? utils_1.formatWithValidation(_as) : _as;
      url = addBasePath(url);
      as = addBasePath(as); // Add the ending slash to the paths. So, we can serve the
      // "<page>/index.html" directly for the SSR page.

      if (false) {}

      this.abortComponentLoad(as); // If the url change is only related to a hash change
      // We should not proceed. We should only change the state.
      // WARNING: `_h` is an internal option for handing Next.js client-side
      // hydration. Your app should _never_ use this property. It may change at
      // any time without notice.

      if (!options._h && this.onlyAHashChange(as)) {
        this.asPath = as;
        Router.events.emit('hashChangeStart', as);
        this.changeState(method, url, as, options);
        this.scrollToHash(as);
        Router.events.emit('hashChangeComplete', as);
        return resolve(true);
      }

      const {
        pathname,
        query,
        protocol
      } = url_1.parse(url, true);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return resolve(false);
      } // If asked to change the current URL we should reload the current page
      // (not location.reload() but reload getInitialProps and other Next.js stuffs)
      // We also need to set the method = replaceState always
      // as this should not go into the history (That's how browsers work)
      // We should compare the new asPath to the current asPath, not the url


      if (!this.urlIsNew(as)) {
        method = 'replaceState';
      }

      const route = toRoute(pathname);
      const {
        shallow = false
      } = options;

      if (is_dynamic_1.isDynamicRoute(route)) {
        const {
          pathname: asPathname
        } = url_1.parse(as);
        const routeRegex = route_regex_1.getRouteRegex(route);
        const routeMatch = route_matcher_1.getRouteMatcher(routeRegex)(asPathname);

        if (!routeMatch) {
          const missingParams = Object.keys(routeRegex.groups).filter(param => !query[param]);

          if (missingParams.length > 0) {
            if (true) {
              console.warn(`Mismatching \`as\` and \`href\` failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
            }

            return reject(new Error(`The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). ` + `Read more: https://err.sh/zeit/next.js/incompatible-href-as`));
          }
        } else {
          // Merge params into `query`, overwriting any specified in search
          Object.assign(query, routeMatch);
        }
      }

      Router.events.emit('routeChangeStart', as); // If shallow is true and the route exists in the router cache we reuse the previous result

      this.getRouteInfo(route, pathname, query, as, shallow).then(routeInfo => {
        const {
          error
        } = routeInfo;

        if (error && error.cancelled) {
          return resolve(false);
        }

        Router.events.emit('beforeHistoryChange', as);
        this.changeState(method, url, as, options);

        if (true) {
          const appComp = this.components['/_app'].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }

        this.set(route, pathname, query, as, routeInfo);

        if (error) {
          Router.events.emit('routeChangeError', error, as);
          throw error;
        }

        Router.events.emit('routeChangeComplete', as);
        return resolve(true);
      }, reject);
    });
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || utils_1.getURL() !== as) {
      window.history[method]({
        url,
        as,
        options
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  getRouteInfo(route, pathname, query, as, shallow = false) {
    const cachedRouteInfo = this.components[route]; // If there is a shallow route transition possible
    // If the route is already rendered on the screen.

    if (shallow && cachedRouteInfo && this.route === route) {
      return Promise.resolve(cachedRouteInfo);
    }

    const handleError = (err, loadErrorFail) => {
      return new Promise(resolve => {
        if (err.code === 'PAGE_LOAD_ERROR' || loadErrorFail) {
          // If we can't load the page it could be one of following reasons
          //  1. Page doesn't exists
          //  2. Page does exist in a different zone
          //  3. Internal error while loading the page
          // So, doing a hard reload is the proper way to deal with this.
          window.location.href = as; // Changing the URL doesn't block executing the current code path.
          // So, we need to mark it as a cancelled error and stop the routing logic.

          err.cancelled = true; // @ts-ignore TODO: fix the control flow here

          return resolve({
            error: err
          });
        }

        if (err.cancelled) {
          // @ts-ignore TODO: fix the control flow here
          return resolve({
            error: err
          });
        }

        resolve(this.fetchComponent('/_error').then(res => {
          const {
            page: Component
          } = res;
          const routeInfo = {
            Component,
            err
          };
          return new Promise(resolve => {
            this.getInitialProps(Component, {
              err,
              pathname,
              query
            }).then(props => {
              routeInfo.props = props;
              routeInfo.error = err;
              resolve(routeInfo);
            }, gipErr => {
              console.error('Error in error page `getInitialProps`: ', gipErr);
              routeInfo.error = err;
              routeInfo.props = {};
              resolve(routeInfo);
            });
          });
        }).catch(err => handleError(err, true)));
      });
    };

    return new Promise((resolve, reject) => {
      if (cachedRouteInfo) {
        return resolve(cachedRouteInfo);
      }

      this.fetchComponent(route).then(res => resolve({
        Component: res.page,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }), reject);
    }).then(routeInfo => {
      const {
        Component,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "../../node_modules/next/node_modules/react-is/index.js");

        if (!isValidElementType(Component)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      return this._getData(() => __N_SSG ? this._getStaticData(as) : __N_SSP ? this._getServerData(as) : this.getInitialProps(Component, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as
      })).then(props => {
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      });
    }).catch(handleError);
  }

  set(route, pathname, query, as, data) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    this.notify(data);
  }
  /**
   * Callback to execute before replacing router state
   * @param cb callback to be executed
   */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value

    if (hash === '') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
   * Prefetch page code, you may wait for the data during page rendering.
   * This feature only works in production!
   * @param url the href of prefetched page
   * @param asPath the as path of the prefetched page
   */


  prefetch(url, asPath = url, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        pathname,
        protocol
      } = url_1.parse(url);

      if (!pathname || protocol) {
        if (true) {
          throw new Error(`Invalid href passed to router: ${url} https://err.sh/zeit/next.js/invalid-href-passed`);
        }

        return;
      } // Prefetch is not supported in development mode because it would trigger on-demand-entries


      if (true) {
        return;
      }

      const route = delBasePath(toRoute(pathname));
      Promise.all([this.pageLoader.prefetchData(url, delBasePath(asPath)), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]).then(() => resolve(), reject);
    });
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    route = delBasePath(route);
    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err = new Error('Loading initial props cancelled');
        err.cancelled = true;
        throw err;
      }

      return data;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App);

    ctx.AppTree = AppTree;
    return utils_1.loadGetInitialProps(App, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as) {
    if (this.clc) {
      const e = new Error('Route Cancelled');
      e.cancelled = true;
      Router.events.emit('routeChangeError', e, as);
      this.clc();
      this.clc = null;
    }
  }

  notify(data) {
    this.sub(data, this.components['/_app'].Component);
  }

}

exports.default = Router;
Router.events = mitt_1.default();

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js":
/*!*************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Identify /[param]/ in route string

const TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;

function isDynamicRoute(route) {
  return TEST_ROUTE.test(route);
}

exports.isDynamicRoute = isDynamicRoute;

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/router/utils/route-matcher.js":
/*!****************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/router/utils/route-matcher.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function getRouteMatcher(routeRegex) {
  const {
    re,
    groups
  } = routeRegex;
  return pathname => {
    const routeMatch = re.exec(pathname);

    if (!routeMatch) {
      return false;
    }

    const decode = param => {
      try {
        return decodeURIComponent(param);
      } catch (_) {
        const err = new Error('failed to decode param');
        err.code = 'DECODE_FAILED';
        throw err;
      }
    };

    const params = {};
    Object.keys(groups).forEach(slugName => {
      const g = groups[slugName];
      const m = routeMatch[g.pos];

      if (m !== undefined) {
        params[slugName] = ~m.indexOf('/') ? m.split('/').map(entry => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
      }
    });
    return params;
  };
}

exports.getRouteMatcher = getRouteMatcher;

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/router/utils/route-regex.js":
/*!**************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/router/utils/route-regex.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // this isn't importing the escape-string-regex module
// to reduce bytes

function escapeRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&');
}

function getRouteRegex(normalizedRoute) {
  // Escape all characters that could be considered RegEx
  const escapedRoute = escapeRegex(normalizedRoute.replace(/\/$/, '') || '/');
  const groups = {};
  let groupIndex = 1;
  const parameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
    const isCatchAll = /^(\\\.){3}/.test($1);
    groups[$1 // Un-escape key
    .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '') // eslint-disable-next-line no-sequences
    ] = {
      pos: groupIndex++,
      repeat: isCatchAll
    };
    return isCatchAll ? '/(.+?)' : '/([^/]+?)';
  });
  let namedParameterizedRoute; // dead code eliminate for browser since it's only needed
  // while generating routes-manifest

  if (true) {
    namedParameterizedRoute = escapedRoute.replace(/\/\\\[([^/]+?)\\\](?=\/|$)/g, (_, $1) => {
      const isCatchAll = /^(\\\.){3}/.test($1);
      const key = $1 // Un-escape key
      .replace(/\\([|\\{}()[\]^$+*?.-])/g, '$1').replace(/^\.{3}/, '');
      return isCatchAll ? `/(?<${escapeRegex(key)}>.+?)` : `/(?<${escapeRegex(key)}>[^/]+?)`;
    });
  }

  return Object.assign({
    re: new RegExp('^' + parameterizedRoute + '(?:/)?$', 'i'),
    groups
  }, namedParameterizedRoute ? {
    namedRegex: `^${namedParameterizedRoute}(?:/)?$`
  } : {});
}

exports.getRouteRegex = getRouteRegex;

/***/ }),

/***/ "../../node_modules/next/dist/next-server/lib/utils.js":
/*!*******************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/next-server/lib/utils.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const url_1 = __webpack_require__(/*! url */ "url");
/**
 * Utils
 */


function execOnce(fn) {
  let used = false;
  let result;
  return (...args) => {
    if (!used) {
      used = true;
      result = fn(...args);
    }

    return result;
  };
}

exports.execOnce = execOnce;

function getLocationOrigin() {
  const {
    protocol,
    hostname,
    port
  } = window.location;
  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
}

exports.getLocationOrigin = getLocationOrigin;

function getURL() {
  const {
    href
  } = window.location;
  const origin = getLocationOrigin();
  return href.substring(origin.length);
}

exports.getURL = getURL;

function getDisplayName(Component) {
  return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}

exports.getDisplayName = getDisplayName;

function isResSent(res) {
  return res.finished || res.headersSent;
}

exports.isResSent = isResSent;

async function loadGetInitialProps(App, ctx) {
  var _a;

  if (true) {
    if ((_a = App.prototype) === null || _a === void 0 ? void 0 : _a.getInitialProps) {
      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/zeit/next.js/get-initial-props-as-an-instance-method for more information.`;
      throw new Error(message);
    }
  } // when called from _app `ctx` is nested in `ctx`


  const res = ctx.res || ctx.ctx && ctx.ctx.res;

  if (!App.getInitialProps) {
    if (ctx.ctx && ctx.Component) {
      // @ts-ignore pageProps default
      return {
        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
      };
    }

    return {};
  }

  const props = await App.getInitialProps(ctx);

  if (res && isResSent(res)) {
    return props;
  }

  if (!props) {
    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
    throw new Error(message);
  }

  if (true) {
    if (Object.keys(props).length === 0 && !ctx.ctx) {
      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/zeit/next.js/empty-object-getInitialProps`);
    }
  }

  return props;
}

exports.loadGetInitialProps = loadGetInitialProps;
exports.urlObjectKeys = ['auth', 'hash', 'host', 'hostname', 'href', 'path', 'pathname', 'port', 'protocol', 'query', 'search', 'slashes'];

function formatWithValidation(url, options) {
  if (true) {
    if (url !== null && typeof url === 'object') {
      Object.keys(url).forEach(key => {
        if (exports.urlObjectKeys.indexOf(key) === -1) {
          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
        }
      });
    }
  }

  return url_1.format(url, options);
}

exports.formatWithValidation = formatWithValidation;
exports.SP = typeof performance !== 'undefined';
exports.ST = exports.SP && typeof performance.mark === 'function' && typeof performance.measure === 'function';

/***/ }),

/***/ "../../node_modules/next/dist/pages/_error.js":
/*!**********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/dist/pages/_error.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../next-server/lib/head */ "../next-server/lib/head"));

var statusCodes = {
  400: 'Bad Request',
  404: 'This page could not be found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error'
};

function _getInitialProps(_ref) {
  var {
    res,
    err
  } = _ref;
  var statusCode = res && res.statusCode ? res.statusCode : err ? err.statusCode : 404;
  return {
    statusCode
  };
}
/**
* `Error` component used for handling errors.
*/


class Error extends _react.default.Component {
  render() {
    var {
      statusCode
    } = this.props;
    var title = this.props.title || statusCodes[statusCode] || 'An unexpected error has occurred';
    return _react.default.createElement("div", {
      style: styles.error
    }, _react.default.createElement(_head.default, null, _react.default.createElement("title", null, statusCode, ": ", title)), _react.default.createElement("div", null, _react.default.createElement("style", {
      dangerouslySetInnerHTML: {
        __html: 'body { margin: 0 }'
      }
    }), statusCode ? _react.default.createElement("h1", {
      style: styles.h1
    }, statusCode) : null, _react.default.createElement("div", {
      style: styles.desc
    }, _react.default.createElement("h2", {
      style: styles.h2
    }, title, "."))));
  }

}

exports.default = Error;
Error.displayName = 'ErrorPage';
Error.getInitialProps = _getInitialProps;
Error.origGetInitialProps = _getInitialProps;
var styles = {
  error: {
    color: '#000',
    background: '#fff',
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
    height: '100vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  desc: {
    display: 'inline-block',
    textAlign: 'left',
    lineHeight: '49px',
    height: '49px',
    verticalAlign: 'middle'
  },
  h1: {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0,.3)',
    margin: 0,
    marginRight: '20px',
    padding: '10px 23px 10px 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top'
  },
  h2: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: 'inherit',
    margin: 0,
    padding: 0
  }
};

/***/ }),

/***/ "../../node_modules/next/error.js":
/*!**********************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/error.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_error */ "../../node_modules/next/dist/pages/_error.js")


/***/ }),

/***/ "../../node_modules/next/link.js":
/*!*********************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/link.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/link */ "../../node_modules/next/dist/client/link.js")


/***/ }),

/***/ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!**************************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "../../node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js":
/*!***************************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/node_modules/@babel/runtime/helpers/interopRequireWildcard.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "../../node_modules/next/node_modules/@babel/runtime/helpers/typeof.js");

function _getRequireWildcardCache() {
  if (typeof WeakMap !== "function") return null;
  var cache = new WeakMap();

  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };

  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }

  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
    return {
      "default": obj
    };
  }

  var cache = _getRequireWildcardCache();

  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }

  var newObj = {};
  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }

  newObj["default"] = obj;

  if (cache) {
    cache.set(obj, newObj);
  }

  return newObj;
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "../../node_modules/next/node_modules/@babel/runtime/helpers/typeof.js":
/*!***********************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/node_modules/@babel/runtime/helpers/typeof.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "../../node_modules/next/node_modules/react-is/cjs/react-is.development.js":
/*!***************************************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/node_modules/react-is/cjs/react-is.development.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.8.6
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),

/***/ "../../node_modules/next/node_modules/react-is/index.js":
/*!********************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/node_modules/next/node_modules/react-is/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "../../node_modules/next/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "../../packages/core/dist/esm/index.js":
/*!***************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: asyncDelete, asyncGet, asyncHttp, asyncPatch, asyncPost, asyncPut, xhr, SimpleError, HTTPError, notificationService, useNotificationService, useNotifications, append, del, find, get, isNull, isNullOrEmpty, set, shallowEqual, useShallowEqual, update, generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getIdp, parseJwt, validateToken, generateRandomString, encrypt, decrypt, sha256, verify, urlBuilder, isAbsoluteUrl, absoluteUrl, toUrl, toRelativeUrl, toLocation, crudService, useDelete, useGet, usePatch, usePost, usePostPutPatch, usePut, useSecureDelete, useSecureGet, useSecurePatch, useSecurePost, useSecurePostPutPatch, useSecurePut, every, latest, leading, debounce, throttle, secure, SecureRoute, useLocalService, createReduxService, useReduxService, useGlobalService, useGenericReducer, genericService, useReduxSelector, createReduxStore, loginService, useLoginService, useLoginCallbackService, useLoginError, logoutService, useLogoutService, useLogoutCallbackService, useLogoutError, authService, useAuthService, useSecurityContext, useOnekiRouter, useLocation, useHistory, useParams, useSetting, useSettings, AppContext, layout, withLayout, useI18nService, i18nService, useTranslation, useLocale, useI18n, I18nLink, flattenTranslations, useGlobalState, useGlobalProp, useLocalState, useGlobalStateModifier, formService, useForm, FormContext, useFormContext, useField, Input, required, regex, email, extractValidators, BaseRouter, AppProvider, DefaultLoadingComponent, formatSettings, detectLocale, toI18nLocation, isAsyncFunction, isAsyncOrPromise, isFalse, isFunction, isFunctionOrPromise, isPromise, isTrue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/xhr */ "../../packages/core/dist/esm/lib/xhr.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncDelete", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncGet", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncHttp", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncHttp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPatch", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPost", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncPost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPut", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["asyncPut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xhr", function() { return _lib_xhr__WEBPACK_IMPORTED_MODULE_0__["xhr"]; });

/* harmony import */ var _lib_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/error */ "../../packages/core/dist/esm/lib/error.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleError", function() { return _lib_error__WEBPACK_IMPORTED_MODULE_1__["SimpleError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return _lib_error__WEBPACK_IMPORTED_MODULE_1__["HTTPError"]; });

/* harmony import */ var _lib_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/notification */ "../../packages/core/dist/esm/lib/notification.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationService", function() { return _lib_notification__WEBPACK_IMPORTED_MODULE_2__["notificationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useNotificationService", function() { return _lib_notification__WEBPACK_IMPORTED_MODULE_2__["useNotificationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useNotifications", function() { return _lib_notification__WEBPACK_IMPORTED_MODULE_2__["useNotifications"]; });

/* harmony import */ var _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "append", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["append"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "del", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["del"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["find"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["get"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["isNull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNullOrEmpty", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["isNullOrEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["set"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["shallowEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useShallowEqual", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["useShallowEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return _lib_utils_object__WEBPACK_IMPORTED_MODULE_3__["update"]; });

/* harmony import */ var _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/utils/auth */ "../../packages/core/dist/esm/lib/utils/auth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateCodeChallenge", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["generateCodeChallenge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateCodeVerifier", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["generateCodeVerifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateNonce", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["generateNonce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateState", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["generateState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIdp", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["getIdp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJwt", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["parseJwt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateToken", function() { return _lib_utils_auth__WEBPACK_IMPORTED_MODULE_4__["validateToken"]; });

/* harmony import */ var _lib_utils_string__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/utils/string */ "../../packages/core/dist/esm/lib/utils/string.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateRandomString", function() { return _lib_utils_string__WEBPACK_IMPORTED_MODULE_5__["generateRandomString"]; });

/* harmony import */ var _lib_utils_crypt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/utils/crypt */ "../../packages/core/dist/esm/lib/utils/crypt.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encrypt", function() { return _lib_utils_crypt__WEBPACK_IMPORTED_MODULE_6__["encrypt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return _lib_utils_crypt__WEBPACK_IMPORTED_MODULE_6__["decrypt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return _lib_utils_crypt__WEBPACK_IMPORTED_MODULE_6__["sha256"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "verify", function() { return _lib_utils_crypt__WEBPACK_IMPORTED_MODULE_6__["verify"]; });

/* harmony import */ var _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/utils/url */ "../../packages/core/dist/esm/lib/utils/url.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlBuilder", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["urlBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAbsoluteUrl", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["isAbsoluteUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "absoluteUrl", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["absoluteUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUrl", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["toUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRelativeUrl", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["toRelativeUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toLocation", function() { return _lib_utils_url__WEBPACK_IMPORTED_MODULE_7__["toLocation"]; });

/* harmony import */ var _lib_crud__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/crud */ "../../packages/core/dist/esm/lib/crud.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "crudService", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["crudService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDelete", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGet", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePatch", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["usePatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePost", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["usePost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePostPutPatch", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["usePostPutPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePut", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["usePut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecureDelete", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecureDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecureGet", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecureGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePatch", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecurePatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePost", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecurePost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePostPutPatch", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecurePostPutPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePut", function() { return _lib_crud__WEBPACK_IMPORTED_MODULE_8__["useSecurePut"]; });

/* harmony import */ var _lib_saga__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "every", function() { return _lib_saga__WEBPACK_IMPORTED_MODULE_9__["every"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "latest", function() { return _lib_saga__WEBPACK_IMPORTED_MODULE_9__["latest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "leading", function() { return _lib_saga__WEBPACK_IMPORTED_MODULE_9__["leading"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return _lib_saga__WEBPACK_IMPORTED_MODULE_9__["debounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return _lib_saga__WEBPACK_IMPORTED_MODULE_9__["throttle"]; });

/* harmony import */ var _lib_secure__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./lib/secure */ "../../packages/core/dist/esm/lib/secure.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "secure", function() { return _lib_secure__WEBPACK_IMPORTED_MODULE_10__["secure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureRoute", function() { return _lib_secure__WEBPACK_IMPORTED_MODULE_10__["SecureRoute"]; });

/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./lib/service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocalService", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["useLocalService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxService", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["createReduxService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReduxService", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["useReduxService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalService", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["useGlobalService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGenericReducer", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["useGenericReducer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "genericService", function() { return _lib_service__WEBPACK_IMPORTED_MODULE_11__["genericService"]; });

/* harmony import */ var _lib_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/store */ "../../packages/core/dist/esm/lib/store.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReduxSelector", function() { return _lib_store__WEBPACK_IMPORTED_MODULE_12__["useReduxSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxStore", function() { return _lib_store__WEBPACK_IMPORTED_MODULE_12__["createReduxStore"]; });

/* harmony import */ var _lib_login__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/login */ "../../packages/core/dist/esm/lib/login.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loginService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["loginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLoginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginCallbackService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLoginCallbackService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginError", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLoginError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logoutService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["logoutService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLogoutService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutCallbackService", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLogoutCallbackService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutError", function() { return _lib_login__WEBPACK_IMPORTED_MODULE_13__["useLogoutError"]; });

/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./lib/auth */ "../../packages/core/dist/esm/lib/auth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "authService", function() { return _lib_auth__WEBPACK_IMPORTED_MODULE_14__["authService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAuthService", function() { return _lib_auth__WEBPACK_IMPORTED_MODULE_14__["useAuthService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurityContext", function() { return _lib_auth__WEBPACK_IMPORTED_MODULE_14__["useSecurityContext"]; });

/* harmony import */ var _lib_context__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./lib/context */ "../../packages/core/dist/esm/lib/context.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOnekiRouter", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useOnekiRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useHistory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSetting", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useSetting"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSettings", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["useSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return _lib_context__WEBPACK_IMPORTED_MODULE_15__["AppContext"]; });

/* harmony import */ var _lib_layout__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./lib/layout */ "../../packages/core/dist/esm/lib/layout.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "layout", function() { return _lib_layout__WEBPACK_IMPORTED_MODULE_16__["layout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withLayout", function() { return _lib_layout__WEBPACK_IMPORTED_MODULE_16__["withLayout"]; });

/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./lib/i18n */ "../../packages/core/dist/esm/lib/i18n.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useI18nService", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["useI18nService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i18nService", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["i18nService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTranslation", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["useTranslation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocale", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["useLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useI18n", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["useI18n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "I18nLink", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["I18nLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "flattenTranslations", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_17__["flattenTranslations"]; });

/* harmony import */ var _lib_state__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./lib/state */ "../../packages/core/dist/esm/lib/state.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalState", function() { return _lib_state__WEBPACK_IMPORTED_MODULE_18__["useGlobalState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalProp", function() { return _lib_state__WEBPACK_IMPORTED_MODULE_18__["useGlobalProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocalState", function() { return _lib_state__WEBPACK_IMPORTED_MODULE_18__["useLocalState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalStateModifier", function() { return _lib_state__WEBPACK_IMPORTED_MODULE_18__["useGlobalStateModifier"]; });

/* harmony import */ var _lib_form__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./lib/form */ "../../packages/core/dist/esm/lib/form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return _lib_form__WEBPACK_IMPORTED_MODULE_19__["formService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useForm", function() { return _lib_form__WEBPACK_IMPORTED_MODULE_19__["useForm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormContext", function() { return _lib_form__WEBPACK_IMPORTED_MODULE_19__["FormContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFormContext", function() { return _lib_form__WEBPACK_IMPORTED_MODULE_19__["useFormContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useField", function() { return _lib_form__WEBPACK_IMPORTED_MODULE_19__["useField"]; });

/* harmony import */ var _lib_form_input__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./lib/form/input */ "../../packages/core/dist/esm/lib/form/input.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return _lib_form_input__WEBPACK_IMPORTED_MODULE_20__["Input"]; });

/* harmony import */ var _lib_validation__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./lib/validation */ "../../packages/core/dist/esm/lib/validation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "required", function() { return _lib_validation__WEBPACK_IMPORTED_MODULE_21__["required"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return _lib_validation__WEBPACK_IMPORTED_MODULE_21__["regex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "email", function() { return _lib_validation__WEBPACK_IMPORTED_MODULE_21__["email"]; });

/* harmony import */ var _lib_utils_form__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./lib/utils/form */ "../../packages/core/dist/esm/lib/utils/form.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractValidators", function() { return _lib_utils_form__WEBPACK_IMPORTED_MODULE_22__["extractValidators"]; });

/* harmony import */ var _lib_router_base__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./lib/router/base */ "../../packages/core/dist/esm/lib/router/base.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseRouter", function() { return _lib_router_base__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _lib_app_app_provider__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./lib/app/app-provider */ "../../packages/core/dist/esm/lib/app/app-provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppProvider", function() { return _lib_app_app_provider__WEBPACK_IMPORTED_MODULE_24__["AppProvider"]; });

/* harmony import */ var _lib_utils_app__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lib/utils/app */ "../../packages/core/dist/esm/lib/utils/app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DefaultLoadingComponent", function() { return _lib_utils_app__WEBPACK_IMPORTED_MODULE_25__["DefaultLoadingComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formatSettings", function() { return _lib_utils_app__WEBPACK_IMPORTED_MODULE_25__["formatSettings"]; });

/* harmony import */ var _lib_utils_i18n__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./lib/utils/i18n */ "../../packages/core/dist/esm/lib/utils/i18n.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "detectLocale", function() { return _lib_utils_i18n__WEBPACK_IMPORTED_MODULE_26__["detectLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toI18nLocation", function() { return _lib_utils_i18n__WEBPACK_IMPORTED_MODULE_26__["toI18nLocation"]; });

/* harmony import */ var _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./lib/utils/type */ "../../packages/core/dist/esm/lib/utils/type.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAsyncFunction", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isAsyncFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAsyncOrPromise", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isAsyncOrPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFalse", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isFalse"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isFunction"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isFunctionOrPromise", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isFunctionOrPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isPromise"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isTrue", function() { return _lib_utils_type__WEBPACK_IMPORTED_MODULE_27__["isTrue"]; });

















 // export { default as Dashboard } from './components/dashboard';
// export { default as DashboardHeader } from './components/dashboard/header';
// export { default as DashboardFooter } from './components/dashboard/footer';
// export { Left as DashboardLeft } from './components/dashboard/sidebar';
// export { Right as DashboardRight } from './components/dashboard/sidebar';
// export { default as DashboardBody } from './components/dashboard/body';
// export { default as DashboardToggler } from './components/dashboard/toggler';
// export { dashboardService, useDashboardService, useDashboard } from './components/dashboard/service';
// export { Dropdown, DropdownMenu, DropdownAnchor } from './components/dropdown';
// export { Me, MeContainer } from './components/me';
// export { Search, SearchContainer } from './components/search';












//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/app/app-provider.js":
/*!******************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/app/app-provider.js ***!
  \******************************************************************************************/
/*! exports provided: AppProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppProvider", function() { return AppProvider; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _utils_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/i18n */ "../../packages/core/dist/esm/lib/utils/i18n.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../context */ "../../packages/core/dist/esm/lib/context.js");






var AppProvider = function AppProvider(_ref) {
  var router = _ref.router,
      settings = _ref.settings,
      initialLocale = _ref.initialLocale,
      translations = _ref.translations,
      i18nNs = _ref.i18nNs,
      services = _ref.services,
      children = _ref.children;
  var reduxLocale = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useSelector"])(function (state) {
    return Object(_utils_object__WEBPACK_IMPORTED_MODULE_2__["get"])(state, 'i18n.locale');
  });
  var store = Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["useStore"])();
  var locale = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return Object(_utils_i18n__WEBPACK_IMPORTED_MODULE_3__["detectLocale"])(router.location, reduxLocale, settings, initialLocale);
  }, [router.location, reduxLocale, settings, initialLocale]);
  var appContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    return {
      router: router,
      settings: settings,
      i18n: {
        translations: translations,
        ns: i18nNs,
        locale: locale
      }
    };
  }, [router, settings, translations, i18nNs, locale]);
  router.i18n = {
    translations: translations,
    ns: i18nNs,
    locale: locale
  };
  var contextRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])({});
  Object.assign(contextRef.current, appContext, {
    store: store
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(function () {
    services.forEach(function (service) {
      Object(_service__WEBPACK_IMPORTED_MODULE_4__["createReduxService"])(service, contextRef.current);
    });
  }, [services]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_context__WEBPACK_IMPORTED_MODULE_5__["AppContext"].Provider, {
    value: appContext
  }, children);
};
//# sourceMappingURL=app-provider.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/auth.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/auth.js ***!
  \******************************************************************************/
/*! exports provided: authService, useAuthService, useSecurityContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authService", function() { return authService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAuthService", function() { return useAuthService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecurityContext", function() { return useSecurityContext; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error */ "../../packages/core/dist/esm/lib/error.js");
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./store */ "../../packages/core/dist/esm/lib/store.js");
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/auth */ "../../packages/core/dist/esm/lib/utils/auth.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/storage */ "../../packages/core/dist/esm/lib/utils/storage.js");
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/url */ "../../packages/core/dist/esm/lib/utils/url.js");
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./xhr */ "../../packages/core/dist/esm/lib/xhr.js");



function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }












var authService = {
  name: "auth",
  reducers: {
    /**
     * Save the security context in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {object} securityContext : the security context to save
     */
    setSecurityContext: function setSecurityContext(state, securityContext) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, "auth.securityContext", securityContext);
    },

    /**
     * Save the token in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {string|object} token : the token to save
     * @param {object} context :
     *    - settings: the full settings object passed to the application
     */
    setToken: function setToken(state, token, _ref) {
      var settings = _ref.settings;
      var idpName = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdpName"])(state);
      var idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdp"])(settings, idpName);
      var persist = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(idp, "persist", null);
      var toCookie = null; // we only persist in the cookie the refresh token and if not specified, the access token

      if (persist === "cookie") {
        for (var _i = 0, _arr = ["refresh_token", "access_token", "token"]; _i < _arr.length; _i++) {
          var type = _arr[_i];

          if (token && token[type]) {
            toCookie = type;
            break;
          }
        }
      } // any other key will not be saved in the cookie but in the sessionStorage


      var storage = function storage(k) {
        if (!token || persist === null || persist === "memory") return persist;
        if (k === toCookie) return "cookie";
        return persist === "localStorage" ? "localStorage" : "sessionStorage";
      };

      if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["isNull"])(token) || persist === null) {
        // if the token is null or the config specifies to persist nothing, 
        // we remove to token from the persistent storage
        _utils_auth__WEBPACK_IMPORTED_MODULE_8__["oauth2Keys"].forEach(function (k) {
          Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["removeItem"])("onekijs.".concat(k), storage(k));
        });
        Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["removeItem"])('onekijs.token', storage("token")); // remove the token from the redux state.

        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["del"])(state, 'auth.token');
      } else if (persist === "memory") {
        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, 'auth.token', token);
      } else if (typeof token === "string") {
        // it's not a oauth2 token but a simple "string" token. Persist as it is
        Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["setItem"])("onekijs.token", token, storage("token")); // persist the token in the redux state. It can be added as a bearer to any ajax request.

        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, 'auth.token', token);
      } else {
        // it's an oauth2 token, persist all keys
        _utils_auth__WEBPACK_IMPORTED_MODULE_8__["oauth2Keys"].forEach(function (k) {
          if (token[k]) {
            Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["setItem"])("onekijs.".concat(k), "".concat(token[k]), storage(k));
          }
        }); // create a expirtes_at key for convenience

        if (token.expires_in && !token.expires_at) {
          token.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
          Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["setItem"])('onekijs.expires_at', "".concat(token.expires_at), storage('expires_at'));
        } // persist the token in the redux state. It can be added as a bearer to any ajax request.


        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, 'auth.token', token);
      }
    },

    /**
     * Save the idp name in the redux store
     * 
     * @param {object} state : state of the redux store
     * @param {object} idp : the IDP to save (full object). Can be null for removal
     * @param {object} context :
     *    - router: the OnekiJS router of the application
     *    - settings: the full settings object passed to the application
     */
    setIdp: function setIdp(state, idp, _ref2) {
      var router = _ref2.router,
          settings = _ref2.settings;
      var nextIdp = idp;

      if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["isNull"])(idp)) {
        // if it's a removal, we need to check in which storage the idp name was saved
        // get the current idpName from the redux store
        var idpName = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdpName"])(state); // if not found, the idp was already removed

        if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["isNull"])(idpName)) return; // build the full IDP object from the settings

        idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdp"])(settings, idpName);
      } // get the persistence storage specified by the IDP (null means that 
      // nothing related to authentication is persisted on the client side)


      var persist = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(idp, 'persist', null); // the idpName is always persisted (in the localStorage except if persist is sessionStorage)
      // This allows a user to refresh the tab (always) and open a new tab (if persist is not sessionStorage) 

      var storage = persist === 'sessionStorage' ? 'sessionStorage' : 'localStorage';

      if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["isNull"])(nextIdp)) {
        // it's a removal, just remove from the redux store
        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, 'auth.idpName', null); // and the persistence storage

        Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["removeItem"])('onekijs.idpName', storage);
      } else {
        // save the idp name in the redux store
        Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["set"])(state, 'auth.idpName', nextIdp.name); // and in the persistence storage

        Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["setItem"])('onekijs.idpName', nextIdp.name, storage);

        if (storage === "localStorage") {
          // listen to change on the idpName key and logout every other tab
          Object(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["onStorageChange"])("onekijs.idpName", function (value) {
            if (value !== nextIdp.name) {
              router.push(Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(settings, 'routes.logout') || '/logout');
            }
          });
        }
      }
    }
  },
  sagas: {
    /**
     * Clear all authentication data from the redux store 
     * and the persistence storage
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     */
    clear: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(_ref3) {
      var onError, onSuccess;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onError = _ref3.onError, onSuccess = _ref3.onSuccess;
              _context.prev = 1;
              _context.next = 4;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setSecurityContext, null);

            case 4:
              _context.next = 6;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setToken, null);

            case 6:
              _context.next = 8;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setIdp, null);

            case 8:
              if (!onSuccess) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onSuccess);

            case 11:
              _context.next = 21;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](1);

              if (!onError) {
                _context.next = 20;
                break;
              }

              _context.next = 18;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onError, _context.t0);

            case 18:
              _context.next = 21;
              break;

            case 20:
              throw _context.t0;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[1, 13]]);
    })),

    /**
     * Get the security context from the server and save it
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     * @param {object} context : 
     *    - store: the redux store
     *    - router: the OnekiJS router of the application
     *    - settings: the full settings object passed to the application
     */
    fetchSecurityContext: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2(_ref4, _ref5) {
      var onSuccess, onError, store, router, settings, idpName, idp, userinfoEndpoint, securityContext, token, token_prop;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onSuccess = _ref4.onSuccess, onError = _ref4.onError;
              store = _ref5.store, router = _ref5.router, settings = _ref5.settings;
              _context2.prev = 2;
              idpName = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdpName"])(store.getState());

              if (!(!idpName || idpName === "null")) {
                _context2.next = 6;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](401);

            case 6:
              idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdp"])(settings, idpName);

              if (idp) {
                _context2.next = 9;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](500, "Could not find the configuration for IDP ".concat(idpName, " in the settings"));

            case 9:
              userinfoEndpoint = idp.userinfoEndpoint;

              if (userinfoEndpoint) {
                _context2.next = 12;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](500, "Could not find a valid userinfo endpoint for idp ".concat(idpName));

            case 12:
              securityContext = null; // we fetch the token from the redux store 

              token = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(store.getState(), "auth.token"); // or from the persistence storage

              if (token) {
                _context2.next = 18;
                break;
              }

              _context2.next = 17;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.loadToken);

            case 17:
              token = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(store.getState(), "auth.token");

            case 18:
              if (!(typeof userinfoEndpoint === "function")) {
                _context2.next = 24;
                break;
              }

              _context2.next = 21;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(userinfoEndpoint, idp, {
                store: store,
                router: router,
                settings: settings
              });

            case 21:
              securityContext = _context2.sent;
              _context2.next = 34;
              break;

            case 24:
              if (!userinfoEndpoint.startsWith("token://")) {
                _context2.next = 31;
                break;
              }

              // from the userinfo endpoint, we check which property of the token 
              // contains the security context (usually the id_token)
              // if no property was specified, the full token is the security context
              token_prop = userinfoEndpoint.split("/")[2];

              if (token) {
                _context2.next = 28;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](401);

            case 28:
              securityContext = token_prop ? Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["parseJwt"])(token[token_prop]) : Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["parseJwt"])(token);
              _context2.next = 34;
              break;

            case 31:
              _context2.next = 33;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_12__["asyncGet"], Object(_utils_url__WEBPACK_IMPORTED_MODULE_11__["absoluteUrl"])(userinfoEndpoint, Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(settings, "server.baseUrl")), {
                // we add a bearer auth if a token was saved in the redux store
                auth: Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(store.getState(), "auth")
              });

            case 33:
              securityContext = _context2.sent;

            case 34:
              _context2.next = 36;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setSecurityContext, securityContext);

            case 36:
              if (!onSuccess) {
                _context2.next = 39;
                break;
              }

              _context2.next = 39;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onSuccess, securityContext);

            case 39:
              return _context2.abrupt("return", securityContext);

            case 42:
              _context2.prev = 42;
              _context2.t0 = _context2["catch"](2);

              if (!onError) {
                _context2.next = 49;
                break;
              }

              _context2.next = 47;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onError, _context2.t0);

            case 47:
              _context2.next = 50;
              break;

            case 49:
              throw _context2.t0;

            case 50:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 42]]);
    })),

    /**
     * Load the token from the persistence storage to the redux store
     * 
     * @param {object} action :
     *    - onError: callback for any error
     *    - onSuccess: callback for any success
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    loadToken: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee3(_ref6, _ref7) {
      var onError, onSuccess, store, settings, result, idpName, idp, persist, storage, expires_at, clockSkew, access_token, refresh_token, token, _iterator, _step, k, _token;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              onError = _ref6.onError, onSuccess = _ref6.onSuccess;
              store = _ref7.store, settings = _ref7.settings;
              _context3.prev = 2;
              result = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(store.getState(), "auth.token", null);

              if (!Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["isNull"])(result)) {
                _context3.next = 64;
                break;
              }

              idpName = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdpName"])(store.getState());

              if (!(!idpName || idpName === "null")) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", null);

            case 8:
              idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["getIdp"])(settings, idpName);
              persist = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(idp, "persist");

              if (persist) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", null);

            case 12:
              // TODO: manage cookie storage
              storage = persist === "localStorage" ? "localStorage" : "sessionStorage";
              _context3.t0 = parseInt;
              _context3.next = 16;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["getItem"], "onekijs.expires_at", storage);

            case 16:
              _context3.t1 = _context3.sent;
              expires_at = (0, _context3.t0)(_context3.t1);
              clockSkew = idp.clockSkew || 60;
              _context3.next = 21;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["getItem"], "onekijs.access_token", persist);

            case 21:
              access_token = _context3.sent;
              _context3.next = 24;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["getItem"], "onekijs.refresh_token", persist);

            case 24:
              refresh_token = _context3.sent;

              if (!(access_token && expires_at >= Date.now() + parseInt(clockSkew) * 1000)) {
                _context3.next = 51;
                break;
              }

              // the token is still valid
              token = {
                access_token: access_token,
                refresh_token: refresh_token
              }; // build the token

              _iterator = _createForOfIteratorHelper(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["oauth2Keys"]);
              _context3.prev = 28;

              _iterator.s();

            case 30:
              if ((_step = _iterator.n()).done) {
                _context3.next = 38;
                break;
              }

              k = _step.value;

              if (token[k]) {
                _context3.next = 36;
                break;
              }

              _context3.next = 35;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["getItem"], "onekijs.".concat(k), storage);

            case 35:
              token[k] = _context3.sent;

            case 36:
              _context3.next = 30;
              break;

            case 38:
              _context3.next = 43;
              break;

            case 40:
              _context3.prev = 40;
              _context3.t2 = _context3["catch"](28);

              _iterator.e(_context3.t2);

            case 43:
              _context3.prev = 43;

              _iterator.f();

              return _context3.finish(43);

            case 46:
              _context3.next = 48;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.saveToken, {
                token: token,
                idp: idp
              });

            case 48:
              result = _context3.sent;
              _context3.next = 64;
              break;

            case 51:
              if (!refresh_token) {
                _context3.next = 57;
                break;
              }

              _context3.next = 54;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.refreshToken, {
                token: {
                  refresh_token: refresh_token
                },
                idp: idp,
                force: true
              });

            case 54:
              result = _context3.sent;
              _context3.next = 64;
              break;

            case 57:
              _context3.next = 59;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_storage__WEBPACK_IMPORTED_MODULE_10__["getItem"], 'onekijs.token', persist);

            case 59:
              _token = _context3.sent;

              if (!_token) {
                _context3.next = 64;
                break;
              }

              _context3.next = 63;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.saveToken, {
                token: _token,
                idp: idp
              });

            case 63:
              result = _context3.sent;

            case 64:
              if (!onSuccess) {
                _context3.next = 67;
                break;
              }

              _context3.next = 67;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onSuccess, result);

            case 67:
              return _context3.abrupt("return", result);

            case 70:
              _context3.prev = 70;
              _context3.t3 = _context3["catch"](2);

              if (!onError) {
                _context3.next = 77;
                break;
              }

              _context3.next = 75;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onError, _context3.t3);

            case 75:
              _context3.next = 78;
              break;

            case 77:
              throw _context3.t3;

            case 78:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[2, 70], [28, 40, 43, 46]]);
    })),

    /**
     * Refresh the token against an IDP
     * 
     * @param {object} action :
     *    - token: the current oauth token
     *    - idp: the IDP used to refresh the token
     *    - force: refresh the token even the current one is not expired
     *    - onError: callback for any error
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    refreshToken: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["every"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee4(_ref8, _ref9) {
      var token, idp, force, onError, store, router, settings, clockSkew, expires_at, to_delay, actualToken, nextToken, body, headers;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              token = _ref8.token, idp = _ref8.idp, force = _ref8.force, onError = _ref8.onError;
              store = _ref9.store, router = _ref9.router, settings = _ref9.settings;
              _context4.prev = 2;

              if (!(!force && !token.expires_at)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return", token);

            case 5:
              if (force) {
                _context4.next = 15;
                break;
              }

              // clockSkew is the delay before the end of token validity triggering 
              // the refreshing of the token
              clockSkew = idp.clockSkew || 60;
              expires_at = parseInt(token.expires_at);
              to_delay = expires_at - clockSkew * 1000 - Date.now();

              if (!(to_delay > 0)) {
                _context4.next = 12;
                break;
              }

              _context4.next = 12;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["delay"])(to_delay);

            case 12:
              // check that the token has not been revoked or changed
              actualToken = Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(store.getState(), "auth.token");

              if (!(token !== actualToken)) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", actualToken);

            case 15:
              if (!(typeof idp.tokenEndpoint === "function")) {
                _context4.next = 21;
                break;
              }

              _context4.next = 18;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(idp.tokenEndpoint, "refreshToken", idp, {
                store: store,
                router: router,
                settings: settings
              });

            case 18:
              nextToken = _context4.sent;
              _context4.next = 27;
              break;

            case 21:
              // build the request for refreshing the token
              body = {
                grant_type: "refresh_token",
                client_id: idp.clientId,
                refresh_token: token.refresh_token
              };
              headers = {
                "Content-Type": "application/x-www-form-urlencoded"
              };

              if (idp.clientSecret) {
                if (idp.clientAuth === "body") {
                  body.client_secret = idp.clientSecret;
                } else {
                  headers.auth = {
                    basic: {
                      user: idp.clientId,
                      password: idp.clientSecret
                    }
                  };
                }
              }

              _context4.next = 26;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_12__["asyncPost"], idp.tokenEndpoint, body, {
                headers: headers
              });

            case 26:
              nextToken = _context4.sent;

            case 27:
              // add to the result the refresh token (when refreshing a token, 
              // the result don't have the refresh token)
              nextToken.refresh_token = token.refresh_token; // add a expires_at property to the token for convenience

              if (nextToken.expires_in && !nextToken.expires_at) {
                nextToken.expires_at = Date.now() + parseInt(token.expires_in) * 1000;
              }

              _context4.next = 31;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.saveToken, {
                token: nextToken,
                idp: idp
              });

            case 31:
              return _context4.abrupt("return", _context4.sent);

            case 34:
              _context4.prev = 34;
              _context4.t0 = _context4["catch"](2);

              if (!onError) {
                _context4.next = 41;
                break;
              }

              _context4.next = 39;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onError, _context4.t0);

            case 39:
              _context4.next = 42;
              break;

            case 41:
              throw _context4.t0;

            case 42:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[2, 34]]);
    })),

    /**
     * Validate the token and save it in the store and persistence storage and  
     * trigger the refreshing of the token if applicable
     * 
     * @param {object} action :
     *    - token: the current oauth token
     *    - idp: the IDP used to refresh the token
     *    - onError: callback for any error
     * @param {object} context : 
     *    - store: the redux store
     *    - settings: the full settings object passed to the application
     */
    saveToken: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee5(_ref10, _ref11) {
      var token, idp, onError, store, router, settings, isValidIdToken, isValidAccessToken;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              token = _ref10.token, idp = _ref10.idp, onError = _ref10.onError;
              store = _ref11.store, router = _ref11.router, settings = _ref11.settings;
              _context5.prev = 2;

              if (!idp.validate) {
                _context5.next = 20;
                break;
              }

              if (idp.jwksEndpoint) {
                _context5.next = 6;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](500, "A jwksEndpoint is required to validate tokens");

            case 6:
              if (!token.id_token) {
                _context5.next = 14;
                break;
              }

              _context5.next = 9;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["validateToken"], token.id_token, idp.jwksEndpoint, idp, {
                store: store,
                router: router,
                settings: settings
              });

            case 9:
              isValidIdToken = _context5.sent;

              if (isValidIdToken) {
                _context5.next = 12;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](400, "Invalid id token");

            case 12:
              _context5.next = 20;
              break;

            case 14:
              if (!token.access_token) {
                _context5.next = 20;
                break;
              }

              _context5.next = 17;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(_utils_auth__WEBPACK_IMPORTED_MODULE_8__["validateToken"], token.access_token, idp.jwksEndpoint, idp, {
                store: store,
                router: router,
                settings: settings
              });

            case 17:
              isValidAccessToken = _context5.sent;

              if (isValidAccessToken) {
                _context5.next = 20;
                break;
              }

              throw new _error__WEBPACK_IMPORTED_MODULE_4__["default"](400, "Invalid access token");

            case 20:
              _context5.next = 22;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setIdp, idp);

            case 22:
              _context5.next = 24;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(this.setToken, token);

            case 24:
              if (!token.refresh_token) {
                _context5.next = 27;
                break;
              }

              _context5.next = 27;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["spawn"])(this.refreshToken, {
                token: token,
                idp: idp,
                onError: onError
              });

            case 27:
              return _context5.abrupt("return", token);

            case 30:
              _context5.prev = 30;
              _context5.t0 = _context5["catch"](2);

              if (!onError) {
                _context5.next = 37;
                break;
              }

              _context5.next = 35;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__["call"])(onError, _context5.t0);

            case 35:
              _context5.next = 38;
              break;

            case 37:
              throw _context5.t0;

            case 38:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[2, 30]]);
    }))
  }
};
var useAuthService = function useAuthService() {
  return Object(_service__WEBPACK_IMPORTED_MODULE_6__["useReduxService"])(authService);
};
var useSecurityContext = function useSecurityContext(selector, defaultValue) {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(false),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var securityContext = Object(_store__WEBPACK_IMPORTED_MODULE_7__["useReduxSelector"])('auth.securityContext');
  var authService = useAuthService();
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (securityContext !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
      authService.fetchSecurityContext({
        onError: function onError(e) {
          return authService.setSecurityContext(null);
        }
      });
    }
  }, [authService, securityContext]);
  return [Object(_utils_object__WEBPACK_IMPORTED_MODULE_9__["get"])(securityContext, selector, defaultValue), loading];
};
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/context.js":
/*!*********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/context.js ***!
  \*********************************************************************************/
/*! exports provided: AppContext, I18nContext, useOnekiRouter, useHistory, useLocation, useParams, useSetting, useSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return AppContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18nContext", function() { return I18nContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useOnekiRouter", function() { return useOnekiRouter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return useHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return useLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return useParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSetting", function() { return useSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSettings", function() { return useSettings; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");



var AppContext = react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext();
var I18nContext = react__WEBPACK_IMPORTED_MODULE_1___default.a.createContext(); // never change the state => no refresh

var useOnekiRouter = function useOnekiRouter() {
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).router;
}; // change the state every time it changes

var useHistory = function useHistory() {
  var router = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).router;

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(router.history),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      history = _useState2[0],
      setHistory = _useState2[1];

  var listener = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function () {
    setHistory(router.history);
  }, [setHistory, router.history]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    router.listen(listener);
    return function () {
      router.unlisten(listener);
    };
  }, [router, listener]);
  return history;
}; // change the state every time it changes

var useLocation = function useLocation() {
  var router = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).router;

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(router.location),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      location = _useState4[0],
      setLocation = _useState4[1];

  var listener = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (location) {
    setLocation(location);
  }, [setLocation]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    router.listen(listener);
    return function () {
      router.unlisten(listener);
    };
  }, [router, listener]);
  return location;
}; // change the state every time it changes

var useParams = function useParams() {
  var router = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).router;

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(Object(_utils_object__WEBPACK_IMPORTED_MODULE_2__["get"])(router, 'location.params', {})),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      params = _useState6[0],
      setParams = _useState6[1];

  var listener = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (location) {
    setParams(location.params);
  }, [setParams]);
  Object(react__WEBPACK_IMPORTED_MODULE_1__["useEffect"])(function () {
    router.listen(listener);
    return function () {
      router.unlisten(listener);
    };
  }, [router, listener]);
  return params;
};
var useSetting = function useSetting(selector, defaultValue) {
  var settings = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).settings;

  if (selector) {
    return Object(_utils_object__WEBPACK_IMPORTED_MODULE_2__["get"])(settings, selector, defaultValue);
  }

  return settings;
};
var useSettings = function useSettings() {
  return Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(AppContext).settings;
};
//# sourceMappingURL=context.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/crud.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/crud.js ***!
  \******************************************************************************/
/*! exports provided: crudService, useGet, useSecureGet, useDelete, useSecureDelete, usePostPutPatch, useSecurePostPutPatch, usePost, useSecurePost, usePut, useSecurePut, usePatch, useSecurePatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "crudService", function() { return crudService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGet", function() { return useGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecureGet", function() { return useSecureGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useDelete", function() { return useDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecureDelete", function() { return useSecureDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePostPutPatch", function() { return usePostPutPatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecurePostPutPatch", function() { return useSecurePostPutPatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePost", function() { return usePost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecurePost", function() { return useSecurePost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePut", function() { return usePut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecurePut", function() { return useSecurePut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "usePatch", function() { return usePatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSecurePatch", function() { return useSecurePatch; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notification */ "../../packages/core/dist/esm/lib/notification.js");
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./store */ "../../packages/core/dist/esm/lib/store.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./xhr */ "../../packages/core/dist/esm/lib/xhr.js");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__);



var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(delayLoading);










function delayLoading(delay_ms) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function delayLoading$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["delay"])(delay_ms);

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(this.setLoading, true);

        case 5:
          _context.prev = 5;
          return _context.finish(5);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0,, 5, 7]]);
}

var crudService = {
  reducers: {
    setLoading: function setLoading(state, isLoading) {
      state.loading = isLoading;
    },
    fetchSuccess: function fetchSuccess(state, result) {
      state.result = result;
      state.loading = false;
    }
  },
  sagas: {
    fetch: Object(_saga__WEBPACK_IMPORTED_MODULE_4__["every"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(_ref, _ref2) {
      var url, method, _ref$body, body, _ref$options, options, router, loadingTask, result, onSuccess, onError;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = _ref.url, method = _ref.method, _ref$body = _ref.body, body = _ref$body === void 0 ? null : _ref$body, _ref$options = _ref.options, options = _ref$options === void 0 ? {} : _ref$options;
              router = _ref2.router;
              _context2.prev = 2;
              _context2.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["fork"])([this, delayLoading], options.delayLoading || 200);

            case 5:
              loadingTask = _context2.sent;
              _context2.next = 8;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_8__["asyncHttp"], url, method, body, options);

            case 8:
              result = _context2.sent;
              _context2.next = 11;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["cancel"])(loadingTask);

            case 11:
              _context2.next = 13;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(this.fetchSuccess, result);

            case 13:
              // to update the store and trigger a re-render.
              onSuccess = options.onSuccess;

              if (!onSuccess) {
                _context2.next = 22;
                break;
              }

              if (!(typeof onSuccess === "string")) {
                _context2.next = 20;
                break;
              }

              _context2.next = 18;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])([router, router.push], onSuccess);

            case 18:
              _context2.next = 22;
              break;

            case 20:
              _context2.next = 22;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(options.onSuccess, result);

            case 22:
              _context2.next = 41;
              break;

            case 24:
              _context2.prev = 24;
              _context2.t0 = _context2["catch"](2);
              _context2.next = 28;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(this.setLoading, false);

            case 28:
              onError = options.onError;

              if (!onError) {
                _context2.next = 39;
                break;
              }

              if (!(typeof onError === "string")) {
                _context2.next = 35;
                break;
              }

              _context2.next = 33;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])([router, router.push], onError);

            case 33:
              _context2.next = 37;
              break;

            case 35:
              _context2.next = 37;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(onError, _context2.t0);

            case 37:
              _context2.next = 41;
              break;

            case 39:
              _context2.next = 41;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_9__["call"])(this.notificationService.error, _context2.t0);

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee, this, [[2, 24]]);
    }))
  },
  inject: {
    notificationService: _notification__WEBPACK_IMPORTED_MODULE_3__["notificationService"]
  }
};
var useGet = function useGet(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(options);

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }

  var _useLocalService = Object(_service__WEBPACK_IMPORTED_MODULE_5__["useLocalService"])(crudService, {
    loading: false
  }),
      _useLocalService2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService, 2),
      state = _useLocalService2[0],
      service = _useLocalService2[1];

  var refresh = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    if (url) {
      service.fetch({
        url: url,
        method: "GET",
        options: options
      });
    }
  }, [url, service, options]);
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    refresh();
  }, [refresh]);
  return [state.result, state.loading, refresh];
};
var useSecureGet = function useSecureGet(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var authKey = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])("settings.auth.key", "auth");
  var auth = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])(authKey);
  options.auth = auth;
  return useGet(url, options);
};
var useDelete = function useDelete(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(options);

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }

  var _useLocalService3 = Object(_service__WEBPACK_IMPORTED_MODULE_5__["useLocalService"])(crudService, {
    loading: false
  }),
      _useLocalService4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService3, 2),
      state = _useLocalService4[0],
      service = _useLocalService4[1];

  var executor = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function () {
    var extraOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    extraOptions = Object.assign({}, options, extraOptions);
    service.fetch({
      url: extraOptions.url || url,
      method: "DELETE",
      options: extraOptions
    });
  }, [service, url, options]);
  return [executor, state.loading];
};
var useSecureDelete = function useSecureDelete(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var authKey = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])("settings.auth.key", "auth");
  var auth = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])(authKey);
  options.auth = auth;
  return useDelete(url, options);
};
var usePostPutPatch = function usePostPutPatch(url, method) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(options);

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["shallowEqual"])(ref.current, options)) {
    options = ref.current;
  } else {
    ref.current = options;
  }

  var _useLocalService5 = Object(_service__WEBPACK_IMPORTED_MODULE_5__["useLocalService"])(crudService, {
    loading: false
  }),
      _useLocalService6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService5, 2),
      state = _useLocalService6[0],
      service = _useLocalService6[1];

  var executor = Object(react__WEBPACK_IMPORTED_MODULE_2__["useCallback"])(function (body) {
    var extraOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    extraOptions = Object.assign({}, options, extraOptions);
    service.fetch({
      url: extraOptions.url || url,
      method: method,
      body: body,
      options: extraOptions
    });
  }, [service, url, method, options]);
  return [executor, state.loading];
};
var useSecurePostPutPatch = function useSecurePostPutPatch(url, method) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var authKey = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])("settings.auth.key", "auth");
  var auth = Object(_store__WEBPACK_IMPORTED_MODULE_6__["useReduxSelector"])(authKey);
  options.auth = auth;
  return usePostPutPatch(url, method, options);
};
var usePost = function usePost(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return usePostPutPatch(url, "POST", options);
};
var useSecurePost = function useSecurePost(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return useSecurePostPutPatch(url, "POST", options);
};
var usePut = function usePut(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return usePostPutPatch(url, "PUT", options);
};
var useSecurePut = function useSecurePut(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return useSecurePostPutPatch(url, "PUT", options);
};
var usePatch = function usePatch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return usePostPutPatch(url, "PATCH", options);
};
var useSecurePatch = function useSecurePatch(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return useSecurePostPutPatch(url, "PATCH", options);
};
//# sourceMappingURL=crud.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/error.js":
/*!*******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/error.js ***!
  \*******************************************************************************/
/*! exports provided: SimpleError, HTTPError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleError", function() { return SimpleError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return HTTPError; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "../../node_modules/@babel/runtime/helpers/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notification */ "../../packages/core/dist/esm/lib/notification.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


 // https://en.wikipedia.org/wiki/List_of_HTTP_status_codes

var httpCodes = {
  "100": "Continue",
  "101": "Switching Protocol",
  "102": "Processing",
  "103": "Early Hints",
  "200": "OK",
  "201": " Created",
  "202": "Accepted",
  "203": "Non-Authoritative Information",
  "204": "No Content",
  "205": "Reset Content",
  "206": "Partial Content",
  "207": "Multi-Status",
  "208": "Already Reported",
  "226": "IM Used",
  "300": "Multiple Choices",
  "301": "Moved Permanently",
  "302": "Moved Temporarily",
  "303": "See Other",
  "304": "Not Modified",
  "305": "Use Proxy",
  "306": "Switch Proxy",
  "307": "Temporary Redirect",
  "308": "Permanent Redirect",
  "400": "Bad Request",
  "401": "Unauthorized",
  "402": "Payment Required",
  "403": "Forbidden",
  "404": "Not Found",
  "405": "Method Not Allowed",
  "406": "Not Acceptable",
  "407": "Proxy Authentication Required",
  "408": "Request Timeout",
  "409": "Conflict",
  "410": "Gone",
  "411": "Length Required",
  "412": "Precondition Failed",
  "413": "Payload Too Large",
  "414": "URI Too Long",
  "415": "Unsupported Media Type",
  "416": "Range Not Satisfiable",
  "417": "Expectation Failed",
  "418": "I'm a teapot",
  "421": "Misdirected Request",
  "422": "Unprocessable Entity",
  "423": "Locked",
  "424": "Failed Dependency",
  "425": "Too Early",
  "426": "Upgrade Required",
  "428": "Precondition Required",
  "429": "Too Many Requests",
  "431": "Request Header Fields Too Large",
  "451": "Unavailable For Legal Reasons",
  "500": "Internal Server Error",
  "501": "Not Implemented",
  "502": "Bad Gateway",
  "503": "Service Unavailable",
  "504": "Gateway Timeout",
  "505": "HTTP Version Not Supported",
  "506": "Variant Also Negotiates",
  "507": "Insufficient Storage",
  "508": "Loop Detected",
  "510": "Not Extended",
  "511": "Network Authentication Required"
};
var SimpleError = /*#__PURE__*/function (_Error) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(SimpleError, _Error);

  var _super = _createSuper(SimpleError);

  function SimpleError(message) {
    var _this;

    var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SimpleError);

    _this = _super.call(this, message);
    _this.code = code;
    _this.payload = payload;
    return _this;
  }

  return SimpleError;
}( /*#__PURE__*/_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_4___default()(Error));
var HTTPError = /*#__PURE__*/function (_SimpleError) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(HTTPError, _SimpleError);

  var _super2 = _createSuper(HTTPError);

  function HTTPError(code) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, HTTPError);

    return _super2.call(this, message || httpCodes[code.toString()], code, payload);
  }

  return HTTPError;
}(SimpleError);
/* harmony default export */ __webpack_exports__["default"] = (HTTPError);
//# sourceMappingURL=error.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/form.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/form.js ***!
  \******************************************************************************/
/*! exports provided: FormContext, useFormContext, FieldContext, useFieldContext, formService, useForm, useField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormContext", function() { return FormContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFormContext", function() { return useFormContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldContext", function() { return FieldContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFieldContext", function() { return useFieldContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return formService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useForm", function() { return useForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useField", function() { return useField; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./validation */ "../../packages/core/dist/esm/lib/validation.js");




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var FormContext = react__WEBPACK_IMPORTED_MODULE_3___default.a.createContext();
var useFormContext = function useFormContext() {
  return Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(FormContext);
};
var FieldContext = react__WEBPACK_IMPORTED_MODULE_3___default.a.createContext();
var useFieldContext = function useFieldContext() {
  return Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(FieldContext);
};

var serializeLevel = function serializeLevel(level) {
  switch (parseInt(level)) {
    case _validation__WEBPACK_IMPORTED_MODULE_8__["LOADING"]:
      return 'loading';

    case _validation__WEBPACK_IMPORTED_MODULE_8__["ERROR"]:
      return 'error';

    case _validation__WEBPACK_IMPORTED_MODULE_8__["WARNING"]:
      return 'warning';

    case _validation__WEBPACK_IMPORTED_MODULE_8__["OK"]:
      return 'ok';

    default:
      return null;
  }
};

var _compileValidations = function compileValidations(state, field) {
  if (field) {
    for (var level in field.validations) {
      for (var id in field.validations[level]) {
        Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["set"])(state, "validations.".concat(field.name), {
          status: serializeLevel(level),
          message: field.validations[level][id]
        });
        return;
      }
    }

    Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["set"])(state, "validations.".concat(field.name), {
      status: 'ok',
      message: null
    });
  }
};

var setValidation = function setValidation(field, id, level) {
  var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  // clean first
  if (field) {
    var validations = field['validations'] || [];

    for (var i in validations) {
      delete validations[i][id];
    } // set the message


    Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["set"])(field, "validations.".concat(level, ".").concat(id), message);
  }
};

var clearValidation = function clearValidation(field, id, level) {
  if (field) {
    Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["del"])(field.validations, "".concat(level, ".").concat(id));
  }
};

var validate = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function validate(field, validatorName, validator, value) {
  var result;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function validate$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(validator, value);

        case 2:
          result = _context.sent;

          if (!result.valid) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(setValidation, field, validatorName, _validation__WEBPACK_IMPORTED_MODULE_8__["OK"]);

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(setValidation, field, validatorName, _validation__WEBPACK_IMPORTED_MODULE_8__["ERROR"], result.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, validate);
});

var validateAll = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function validateAll(field, value, values) {
  var _this = this;

  var validators, tasks, i, validatorName, validator, hasAsync, _i, _Object$keys, key, _iterator, _step, rule, watchers;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function validateAll$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          validators = field.validators; // do all validations

          tasks = [];
          _context2.t0 = _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.keys(validators);

        case 3:
          if ((_context2.t1 = _context2.t0()).done) {
            _context2.next = 14;
            break;
          }

          i = _context2.t1.value;
          validatorName = "__validator_".concat(i);
          validator = validators[i];
          _context2.t2 = tasks;
          _context2.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["fork"])(validate, field, validatorName, validator, value);

        case 10:
          _context2.t3 = _context2.sent;

          _context2.t2.push.call(_context2.t2, _context2.t3);

          _context2.next = 3;
          break;

        case 14:
          hasAsync = tasks.find(function (t) {
            return t.isRunning();
          });
          _context2.next = 17;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this._setValue, {
            name: field.name,
            value: value,
            loading: hasAsync !== undefined
          });

        case 17:
          _i = 0, _Object$keys = Object.keys(this._listeners);

        case 18:
          if (!(_i < _Object$keys.length)) {
            _context2.next = 43;
            break;
          }

          key = _Object$keys[_i];

          if (!key.startsWith(field.name)) {
            _context2.next = 40;
            break;
          }

          _iterator = _createForOfIteratorHelper(this._listeners[key]);
          _context2.prev = 22;

          _iterator.s();

        case 24:
          if ((_step = _iterator.n()).done) {
            _context2.next = 32;
            break;
          }

          rule = _step.value;
          console.log(this._state);
          watchers = rule.watchers.map(function (w) {
            return Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(_this._state, "values.".concat(w));
          });
          _context2.next = 30;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["apply"])(this, rule.listener, watchers);

        case 30:
          _context2.next = 24;
          break;

        case 32:
          _context2.next = 37;
          break;

        case 34:
          _context2.prev = 34;
          _context2.t4 = _context2["catch"](22);

          _iterator.e(_context2.t4);

        case 37:
          _context2.prev = 37;

          _iterator.f();

          return _context2.finish(37);

        case 40:
          _i++;
          _context2.next = 18;
          break;

        case 43:
          return _context2.abrupt("return", hasAsync);

        case 44:
        case "end":
          return _context2.stop();
      }
    }
  }, validateAll, this, [[22, 34, 37, 40]]);
});

var formService = {
  init: function init() {
    var _this2 = this;

    this._fields = {};
    this._listeners = {};

    this.listen = function (listener, watchers) {
      var _iterator2 = _createForOfIteratorHelper(watchers),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var watcher = _step2.value;
          _this2._listeners[watcher] = _this2._listeners[watcher] || [];

          _this2._listeners[watcher].push({
            listener: listener,
            watchers: watchers
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    };

    this.unlisten = function (listener, watchers) {
      var _iterator3 = _createForOfIteratorHelper(watchers),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var watcher = _step3.value;
          _this2._listeners[watcher] = _this2._listeners[watcher] || [];
          _this2._listeners[watcher] = _this2._listeners[watcher].filter(function (x) {
            return x.listener !== listener;
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    };

    this.initField = function (name, validators, options) {
      if (!_this2._fields[name]) {
        _this2._fields[name] = {
          name: name,
          validators: validators,
          validations: {},
          options: options,
          onChange: function onChange(value) {
            if (value && value.nativeEvent && value.nativeEvent instanceof Event) {
              value = value.target.value;
            }

            _this2.setValue({
              name: name,
              value: value
            });
          },
          onBlur: function onBlur() {// mark the field as touched
          }
        };
      }

      return _this2._fields[name];
    };
  },
  reducers: {
    _setValue: function _setValue(state, _ref) {
      var name = _ref.name,
          value = _ref.value,
          _ref$loading = _ref.loading,
          loading = _ref$loading === void 0 ? false : _ref$loading;
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["set"])(state, "values.".concat(name), value);
      this._values = state.values;

      if (loading) {
        setValidation(this._fields[name], '__loading', _validation__WEBPACK_IMPORTED_MODULE_8__["LOADING"], null);
      } else {
        clearValidation(this._fields[name], '__loading', _validation__WEBPACK_IMPORTED_MODULE_8__["LOADING"]);
      }

      _compileValidations(state, this._fields[name]);
    },
    setError: function setError(state, _ref2) {
      var id = _ref2.id,
          name = _ref2.name,
          message = _ref2.message;
      setValidation(this._fields[name], id, _validation__WEBPACK_IMPORTED_MODULE_8__["ERROR"], message);

      _compileValidations(state, this._fields[name]);
    },
    setWarning: function setWarning(state, _ref3) {
      var id = _ref3.id,
          name = _ref3.name,
          message = _ref3.message;
      setValidation(this._fields[name], id, _validation__WEBPACK_IMPORTED_MODULE_8__["WARNING"], message);

      _compileValidations(state, this._fields[name]);
    },
    setOK: function setOK(state, _ref4) {
      var id = _ref4.id,
          name = _ref4.name,
          message = _ref4.message;
      setValidation(this._fields[name], id, _validation__WEBPACK_IMPORTED_MODULE_8__["OK"], message);

      _compileValidations(state, this._fields[name]);
    },
    compileValidations: function compileValidations(state, name) {
      _compileValidations(state, this._fields[name]);
    },
    setPendingValidation: function setPendingValidation(state, _ref5) {
      var name = _ref5.name,
          pending = _ref5.pending;

      if (pending) {
        setValidation(this._fields[name], '__loading', _validation__WEBPACK_IMPORTED_MODULE_8__["LOADING"], null);
      } else {
        clearValidation(this._fields[name], '__loading', _validation__WEBPACK_IMPORTED_MODULE_8__["LOADING"]);
      }

      _compileValidations(state, this._fields[name]);
    },
    triggerRule: function triggerRule(state, rule) {
      var watchers = rule.watchers.map(function (w) {
        return Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(state, "values.".concat(w));
      });
      rule.listener.apply(undefined, watchers);
    }
  },
  sagas: {
    setValue: Object(_saga__WEBPACK_IMPORTED_MODULE_5__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(_ref6, _ref7) {
      var name, value, store, field, hasAsync;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              name = _ref6.name, value = _ref6.value;
              store = _ref7.store;
              field = this._fields[name];

              if (!field) {
                _context3.next = 10;
                break;
              }

              _context3.next = 6;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])([this, validateAll], field, value, store.getState().values);

            case 6:
              hasAsync = _context3.sent;

              if (!hasAsync) {
                _context3.next = 10;
                break;
              }

              _context3.next = 10;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setPendingValidation, {
                name: name,
                pending: false
              });

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee, this);
    }))
  }
};
/**
 * This callback is used when the user press the submit button
 *
 * @callback submitCallback
 * @param {Object} data - values from the form
 */

/**
 * @param {string|submitCallback} onSubmit - an url or a submit callback
 * @param {Object} options 
 */

var useForm = function useForm(onSubmit) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // options cannot be changed afterwards. Used as initialState for the service
  // we copy initialValues to values to be able to reset the form to its initial state
  // immer will not kept a reference between to two objects. So changing values will not change initialValues
  options.initialValues = options.initialValues || {};
  options.validations = options.validations || {};
  options.values = options.initialValues;

  var _useLocalService = Object(_service__WEBPACK_IMPORTED_MODULE_6__["useLocalService"])(formService, options),
      _useLocalService2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useLocalService, 2),
      state = _useLocalService2[0],
      service = _useLocalService2[1];

  var values = state.values,
      validations = state.validations; // we put values in a ref object. For some features, we don't need to force a rerender if a value is changed
  // but we need the last value during the render

  var valuesRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();
  valuesRef.current = values;
  /**
   *  this method will register a field and return some two listeners
   *   - onChange
   *   - onBlur
   * 
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   * 
   * @return {Object} a list of listeners for the field and its name
   *                    - name
   *                    - onChange
   *                    - onBlur
   */

  var init = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name) {
    var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var field = service.initField(name, validators, options);
    return {
      onChange: field.onChange,
      onBlur: field.onBlur,
      name: name
    };
  }, [service]);
  /**
   *  this method is an helper to quickly register a field from a component. It will return
   *   - name
   *   - value
   *   - onChange
   *   - onBlur
   * 
   * @param {string} name - the name of the field. Must be related to a key in values
   * @param {Object} validators - a object of validators
   * 
   * @return {Object} a list of props for the field
   *                    - name
   *                    - value
   *                    - onChange
   *                    - onBlur
   */

  var field = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name) {
    var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var field = init(name, validators, options);
    field.value = Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(values, name, options.defaultValue === undefined ? '' : options.defaultValue);
    return field;
  }, [init, values]);
  /**
   * this method will just call the submit function passed to useForm with the whole value object
   */

  var submit = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (e) {
    console.log(values); //onSubmit(values);

    e.preventDefault();
  }, [onSubmit, values]);
  var defaultValidation = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      message: null,
      status: null
    };
  }, []);
  var validation = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name) {
    return Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(validations, name, defaultValidation);
  }, [validations, defaultValidation]);
  var value = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name, defaultValue) {
    return Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(values, name, defaultValue);
  }, [values]);
  var setError = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (fieldName, validatorName, message, matcher) {
    if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["isNull"])(matcher) || matcher) {
      return service.setError({
        id: validatorName,
        name: fieldName,
        message: message
      });
    } else {
      return service.setOK({
        id: validatorName,
        name: fieldName
      });
    }
  }, [service]);
  var setOK = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (fieldName, validatorName) {
    service.setOK({
      id: validatorName,
      name: fieldName
    });
  }, [service]);
  var setWarning = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (fieldName, validatorName, message, matcher) {
    if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["isNull"])(matcher) || matcher) {
      return service.setWarning({
        id: validatorName,
        name: fieldName,
        message: message
      });
    } else {
      return service.setWarning({
        id: validatorName,
        name: fieldName
      });
    }
  }, [service]);
  var setValue = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name, value) {
    return service.setValue({
      name: name,
      value: value
    });
  }, [service]);
  var setPendingValidation = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (name, pending) {
    return service.setPendingValidation({
      name: name,
      pending: pending
    });
  }, [service]);
  var contextRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])({});
  contextRef.current.state = state;
  contextRef.current.service = service;
  var useRuleRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(useRule.bind(contextRef.current));
  var useBindRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(useBind.bind(contextRef.current));
  var formContextRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();
  var formContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      listen: service.listen,
      field: field,
      setError: setError,
      setValue: setValue,
      setOK: setOK,
      setWarning: setWarning,
      setPendingValidation: setPendingValidation,
      submit: submit,
      unlisten: service.unlisten,
      useBind: useBindRef.current,
      useRule: useRuleRef.current,
      validation: validation,
      validations: validations,
      value: value,
      values: values
    };
  }, [field, service.listen, setError, setValue, setOK, setWarning, setPendingValidation, submit, service.unlisten, validation, validations, value, values]);
  formContextRef.current = formContext; // The field context should never force a rerender of a component.
  // The field itself will use the listen method to get notified when its value is changed

  var fieldContextRef = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])();
  var fieldContext = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return {
      init: init,
      listen: service.listen,
      unlisten: service.unlisten,
      values: valuesRef.current // use for the initial value of the field

    };
  }, [init, service.listen, service.unlisten]);
  fieldContextRef.current = fieldContext;
  var Form = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return function (props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(FormContext.Provider, {
        value: formContextRef.current
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(FieldContext.Provider, {
        value: fieldContextRef.current
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("form", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        onSubmit: fieldContextRef.current.submit
      }))));
    };
  }, [formContextRef, fieldContextRef]);
  var result = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return Object.assign({}, {
      Form: Form
    }, formContext);
  }, [formContext, Form]);
  return result;
};
var useField = function useField(name) {
  var validators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _useFieldContext = useFieldContext(),
      init = _useFieldContext.init,
      listen = _useFieldContext.listen,
      unlisten = _useFieldContext.unlisten,
      values = _useFieldContext.values;

  var field = init(name, validators, options);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(values, name, options.defaultValue === undefined ? '' : options.defaultValue)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  field.value = value;
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var listener = function listener() {
      setValue(value);
    };

    listen(listener, [name]);
    return function () {
      unlisten(listener, [name]);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return field;
};

var useRule = function useRule(rule) {
  var _this3 = this;

  var watchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var listener = function listener() {
      rule.apply(this, arguments);
    };

    _this3.service.listen(listener, watchers);

    return function () {
      _this3.service.unlisten(listener, watchers);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

var useBind = function useBind(rule) {
  var _this4 = this;

  var watchers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // initial call
  var initialValue = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    var values = _this4.state.values;
    return rule.apply(_this4, watchers.map(function (w) {
      return Object(_utils_object__WEBPACK_IMPORTED_MODULE_7__["get"])(values, w);
    })); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(initialValue),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    var listener = function listener() {
      var value = rule.apply(this, arguments);
      setValue(value);
    };

    _this4.service.listen(listener, watchers);

    return function () {
      _this4.service.unlisten(listener, watchers);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return value;
};
//# sourceMappingURL=form.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/form/input.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/form/input.js ***!
  \************************************************************************************/
/*! exports provided: Input */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../form */ "../../packages/core/dist/esm/lib/form.js");
/* harmony import */ var _utils_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/form */ "../../packages/core/dist/esm/lib/utils/form.js");





var Input = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.memo(function (props) {
  console.log('render', props.name);

  var _extractValidators = Object(_utils_form__WEBPACK_IMPORTED_MODULE_4__["extractValidators"])(props),
      _extractValidators2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_extractValidators, 2),
      validators = _extractValidators2[0],
      extraProps = _extractValidators2[1]; //const field = useField(props.name, validators);


  var context = Object(_form__WEBPACK_IMPORTED_MODULE_3__["useFormContext"])();
  var firstname = context.useBind(function (firstname) {
    return firstname;
  }, ['firstName']);
  console.log(firstname);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("input", _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, extraProps, context.field(props.name, validators)));
});
//# sourceMappingURL=input.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/i18n.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/i18n.js ***!
  \******************************************************************************/
/*! exports provided: flattenTranslations, useLocale, i18nService, useI18nService, useTranslation, useI18n, I18nLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenTranslations", function() { return flattenTranslations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocale", function() { return useLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i18nService", function() { return i18nService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useI18nService", function() { return useI18nService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTranslation", function() { return useTranslation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useI18n", function() { return useI18n; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "I18nLink", function() { return I18nLink; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "../../packages/core/dist/esm/lib/context.js");
/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification */ "../../packages/core/dist/esm/lib/notification.js");
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./store */ "../../packages/core/dist/esm/lib/store.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/type */ "../../packages/core/dist/esm/lib/utils/type.js");
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./xhr */ "../../packages/core/dist/esm/lib/xhr.js");




var _this = undefined;










 // export const url2locale = (pathname, contextPath, candidates) => {
//   const length = contextPath.endsWith("/")
//     ? contextPath.length
//     : contextPath.length + 1;
//   const locale = pathname.substring(length).split("/")[0];
//   if (candidates.includes(locale)) return locale;
//   return null;
// };

var flattenTranslations = function flattenTranslations(translations) {
  /* Example:
  Input:
  {
    "product": {
      "key": "value" 
    },
    "common": {
      "key1": "value1"
    }
  }
   Output:
  { 
    "product:key": "value", 
    "common:key1": "value1" 
  }
  */
  var result = {};
  Object.keys(translations).forEach(function (ns) {
    Object.keys(translations[ns]).reduce(function (accumulator, key) {
      accumulator["".concat(ns, ":").concat(key)] = translations[ns][key];
      return accumulator;
    }, result);
  });
  return result;
};
var useLocale = function useLocale() {
  return Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["get"])(Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_5__["AppContext"]), "i18n.locale");
};

var getLocaleUrl = function getLocaleUrl(locale, ns, settings) {
  if (Object(_utils_type__WEBPACK_IMPORTED_MODULE_11__["isFunction"])(settings.i18n.url)) {
    return settings.i18n.url(locale, ns);
  }

  return "".concat(settings.i18n.url, "/").concat(locale, "/").concat(ns, ".json");
};

var i18nService = {
  name: "i18n",
  init: function init(_ref) {
    var i18n = _ref.i18n,
        settings = _ref.settings;
    this["modifiers"] = {
      locale: function locale(value, _locale) {
        return value ? value.toLocaleString(_locale) : value;
      }
    };

    if (settings.i18n && settings.i18n.modifiers) {
      Object.assign(this["modifiers"], settings.i18n.modifiers);
    }
  },
  reducers: {
    setLocale: function setLocale(state, locale) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["set"])(state, "i18n.locale", locale);
    },
    setTranslations: function setTranslations(state, _ref2) {
      var translations = _ref2.translations,
          locale = _ref2.locale;
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["set"])(state, "i18n.translations.".concat(locale), Object.assign(Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["get"])(state, "i18n.translations.".concat(locale), {}), flattenTranslations(translations)));
      Object.keys(translations).forEach(function (ns) {
        return Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["append"])(state, "i18n.ns.".concat(locale), ns);
      });
    },
    setFetchingTranslations: function setFetchingTranslations(state, fetching) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["set"])(state, "i18n.fetching", fetching);
    }
  },
  sagas: {
    changeLocale: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee(locale, context) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setLocale, locale);

            case 2:
              _context.next = 4;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(context.settings.i18n.changeLocale, locale, context);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    })),
    fetchTranslations: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(function _callee2(_ref3, _ref4) {
      var locale, namespaces, _ref3$options, options, settings, results, translations, onError;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              locale = _ref3.locale, namespaces = _ref3.namespaces, _ref3$options = _ref3.options, options = _ref3$options === void 0 ? {} : _ref3$options;
              settings = _ref4.settings;
              _context2.prev = 2;
              _context2.next = 5;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setFetchingTranslations, true);

            case 5:
              _context2.next = 7;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["all"])(namespaces.map(function (ns) {
                return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_12__["asyncGet"], getLocaleUrl(locale, ns, settings), options);
              }));

            case 7:
              results = _context2.sent;
              translations = {};
              namespaces.forEach(function (ns, i) {
                return translations[ns] = results[i];
              });
              _context2.next = 12;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setTranslations, {
                translations: translations,
                locale: locale
              });

            case 12:
              _context2.next = 14;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setFetchingTranslations, false);

            case 14:
              _context2.next = 28;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](2);
              _context2.next = 20;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setFetchingTranslations, false);

            case 20:
              onError = options.onError;

              if (!onError) {
                _context2.next = 26;
                break;
              }

              _context2.next = 24;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context2.t0);

            case 24:
              _context2.next = 28;
              break;

            case 26:
              _context2.next = 28;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.notificationService.error, _context2.t0);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 16]]);
    }))
  },
  inject: {
    notificationService: _notification__WEBPACK_IMPORTED_MODULE_6__["notificationService"]
  }
};
var useI18nService = function useI18nService() {
  return Object(_service__WEBPACK_IMPORTED_MODULE_8__["useReduxService"])(i18nService);
};

var stringifyJsx = function stringifyJsx(reactElement) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var idx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var children = [].concat(reactElement.props.children);
  var str = children.reduce(function (accumulator, child) {
    if (typeof child === "string") return "".concat(accumulator).concat(child);

    if ( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.isValidElement(child)) {
      var _stringifyJsx = stringifyJsx(child, ctx, idx + 1),
          _stringifyJsx2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_stringifyJsx, 2),
          childStr = _stringifyJsx2[0],
          nextIdx = _stringifyJsx2[1];

      var _str = "".concat(accumulator, "<").concat(idx, ">").concat(childStr, "</").concat(idx, ">");

      ctx["el-".concat(idx)] = child;
      idx = nextIdx;
      return _str;
    } else {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["set"])(ctx, "vars.".concat(Object.keys(child)[0]), Object.values(child)[0]);
      return "".concat(accumulator, "{{").concat(Object.keys(child)[0], "}}");
    }
  }, "");
  return [str, idx];
};

var regexIndexOf = function regexIndexOf(str, regex) {
  var startpos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var indexOf = str.substring(startpos).search(regex);
  return indexOf >= 0 ? indexOf + startpos : indexOf;
};

var parseJsx = function parseJsx(str) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var startPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var result = [];
  var count = 0;

  do {
    var _extractTag = extractTag(str, startPos),
        _extractTag2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_extractTag, 4),
        content = _extractTag2[0],
        idx = _extractTag2[1],
        start = _extractTag2[2],
        end = _extractTag2[3];

    if (content === undefined) {
      var element = str.substring(startPos);

      if (element.length > 0) {
        result.push(element);
      }

      break;
    }

    if (start > startPos) {
      result.push(str.substring(startPos, start));
    }

    var childJsx = parseJsx(content, ctx);
    var el = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(ctx["el-".concat(idx)], {
      key: "el-".concat(idx)
    }, childJsx);
    result.push(el);
    startPos = end;
    if (startPos >= str.length) break;
    if (++count > 10) break;
  } while (true);

  return result;
};

var extractTag = function extractTag(str, startPos) {
  var openingStart = regexIndexOf(str, /<[1-9][0-9]*>/, startPos);

  if (openingStart > -1) {
    var openingEnd = str.indexOf(">", openingStart);
    var idx = str.substring(openingStart + 1, openingEnd);
    var closingStart = str.indexOf("</".concat(idx, ">"), openingEnd);
    var content = str.substring(openingEnd + 1, closingStart);
    return [content, idx, openingStart, closingStart + "</".concat(idx, ">").length];
  }

  return [];
};

var useTranslation = function useTranslation(namespaces, options) {
  var locale = useLocale();
  var appContextTranslations = Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["get"])(Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_5__["AppContext"]), "i18n.translations");
  var reduxTranslations = Object(_store__WEBPACK_IMPORTED_MODULE_9__["useReduxSelector"])("i18n.translations.".concat(locale));
  var translations = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return Object.assign({}, appContextTranslations, reduxTranslations);
  }, [appContextTranslations, reduxTranslations]);
  var appContextNs = Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["get"])(Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_5__["AppContext"]), "i18n.ns");
  var reduxNs = Object(_store__WEBPACK_IMPORTED_MODULE_9__["useReduxSelector"])("i18n.ns.".concat(locale));
  var nsLoaded = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(new Set([].concat(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(appContextNs || []), _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(reduxNs || []))));
  }, [appContextNs, reduxNs]);
  var i18nService = useI18nService();
  var nsRequired = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    var nsRequired = namespaces || [];

    if (typeof namespaces === "string") {
      nsRequired = [namespaces];
    }

    if (!nsRequired.includes("common")) {
      nsRequired.push("common");
    }

    return nsRequired;
  }, []);
  var nsNotLoaded = Object(react__WEBPACK_IMPORTED_MODULE_3__["useMemo"])(function () {
    return nsRequired.filter(function (ns) {
      return !nsLoaded.includes(ns);
    });
  }, [nsRequired, nsLoaded]);
  var fetching = Object(_store__WEBPACK_IMPORTED_MODULE_9__["useReduxSelector"])("i18.fetching", false);
  var t = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (content, alias, count) {
    if (fetching) return null;
    var key = alias ? alias : content;
    var ctx = {};
    var jsx = null;
    var candidateKeys = [];

    if (typeof content !== "string") {
      jsx = content;

      var _stringifyJsx3 = stringifyJsx(content, ctx),
          _stringifyJsx4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_stringifyJsx3, 1),
          jsxKey = _stringifyJsx4[0];

      if (!alias) {
        key = jsxKey;
      }
    }

    if (count >= 1) {
      var prefix = count > 1 ? "plural" : "singular";
      candidateKeys.push("".concat(prefix, "::").concat(key));
      nsRequired.forEach(function (ns) {
        return candidateKeys.push("".concat(ns, ":").concat(prefix, "::").concat(key));
      });
    }

    candidateKeys.push(key);
    nsRequired.forEach(function (ns) {
      return candidateKeys.push("".concat(ns, ":").concat(key));
    });

    for (var _i = 0, _candidateKeys = candidateKeys; _i < _candidateKeys.length; _i++) {
      var candidateKey = _candidateKeys[_i];
      if (translations[candidateKey] !== undefined) return buildJsx(translations[candidateKey], ctx, jsx, i18nService, locale);
    }

    return null;
  }, [fetching, translations, nsRequired, i18nService, locale]);
  var T = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (_ref5) {
    var alias = _ref5.alias,
        count = _ref5.count,
        children = _ref5.children;
    return t( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_3___default.a.Fragment, null, children), alias, count);
  }, [t]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (nsNotLoaded.length > 0 && !fetching) {
      i18nService.fetchTranslations({
        locale: locale,
        namespaces: nsNotLoaded
      });
    }
  }, [nsNotLoaded, i18nService, locale, fetching]);
  return [T, t, locale, fetching || nsNotLoaded.length > 0];
};

var buildJsx = function buildJsx(str, ctx, wrapperReactElement, i18nService, locale) {
  var result = {
    str: str
  };

  if (ctx.vars) {
    Object.keys(ctx.vars).forEach(function (key) {
      var regex = new RegExp("{{\\s*".concat(key, "[^}]*}}"), "g");
      var m;

      while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        m.forEach(function (match) {
          result.str = result.str.replace(match, handlemodifiers(match.slice(0, -2), ctx.vars[key], locale, i18nService));
        });
      }
    });
  }

  str = result.str;
  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_10__["isNull"])(wrapperReactElement)) return str;
  var children = parseJsx(str, ctx);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.cloneElement(wrapperReactElement, {}, children);
};

var handlemodifiers = function handlemodifiers(input, value, locale, i18nService) {
  var modifiers = input.split("|");
  var args = [value, locale];

  if (modifiers.length > 1) {
    for (var i = 1; i < modifiers.length; i++) {
      var filter = modifiers[i].trim();
      var modifierNoArgs = filter;
      var pos = filter.indexOf("(");

      if (pos > -1) {
        modifierNoArgs = modifierNoArgs.substring(0, pos);
      }

      handleFilterArgs(filter, args);

      if (i18nService.modifiers[modifierNoArgs]) {
        return i18nService.modifiers[modifierNoArgs].apply(_this, args);
      } else {
        console.error("filter " + modifierNoArgs + " not found in settings");
      }
    }
  }

  return value;
};

var handleFilterArgs = function handleFilterArgs(filter, result) {
  var regexArgs = /\(.*\)/gm;
  var filterArgs;

  while ((filterArgs = regexArgs.exec(filter)) !== null) {
    if (filterArgs.index === regexArgs.lastIndex) {
      regexArgs.lastIndex++;
    }

    filterArgs.forEach(function (filterArg) {
      var args = filterArg.slice(1, -1).split(",");
      args.forEach(function (arg) {
        arg = arg.trim();
        if (arg.indexOf("'") === 0) arg = "\"".concat(arg.slice(1, -1), "\"");
        result.push(JSON.parse(arg));
      });
    });
  }
};

var useI18n = function useI18n() {
  return Object(react__WEBPACK_IMPORTED_MODULE_3__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_5__["AppContext"]).i18n;
};
var I18nLink = function I18nLink(props) {
  // const { href, as } = props;
  var settings = Object(_context__WEBPACK_IMPORTED_MODULE_5__["useSettings"])();
  var i18n = useI18n();
  var router = Object(_context__WEBPACK_IMPORTED_MODULE_5__["useOnekiRouter"])();
  return router.i18nLink(props, i18n, settings);
};
//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/layout.js":
/*!********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/layout.js ***!
  \********************************************************************************/
/*! exports provided: layout, withLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layout", function() { return layout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withLayout", function() { return withLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Inspired by this excellent article:
 * https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
 * 
 */

var layout = function layout(Layout, ParentLayout) {
  var getLayout = function getLayout(page) {
    if (ParentLayout) {
      return ParentLayout.getLayout( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Layout, null, page));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Layout, null, page);
    }
  };

  Layout.getLayout = getLayout;
  return Layout;
};
var withLayout = function withLayout(Page, Layout) {
  if (Page && Layout) {
    Page.getLayout = Layout.getLayout;
  }

  return Page;
};
//# sourceMappingURL=layout.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/login.js":
/*!*******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/login.js ***!
  \*******************************************************************************/
/*! exports provided: loginService, logoutService, useLoginService, useLoginCallbackService, useLoginError, useLogoutService, useLogoutCallbackService, useLogoutError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loginService", function() { return loginService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logoutService", function() { return logoutService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLoginService", function() { return useLoginService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLoginCallbackService", function() { return useLoginCallbackService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLoginError", function() { return useLoginError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLogoutService", function() { return useLogoutService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLogoutCallbackService", function() { return useLogoutCallbackService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLogoutError", function() { return useLogoutError; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth */ "../../packages/core/dist/esm/lib/auth.js");
/* harmony import */ var _notification__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./notification */ "../../packages/core/dist/esm/lib/notification.js");
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/auth */ "../../packages/core/dist/esm/lib/utils/auth.js");
/* harmony import */ var _utils_crypt__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/crypt */ "../../packages/core/dist/esm/lib/utils/crypt.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/url */ "../../packages/core/dist/esm/lib/utils/url.js");
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./xhr */ "../../packages/core/dist/esm/lib/xhr.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./error */ "../../packages/core/dist/esm/lib/error.js");




var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(login),
    _marked2 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(externalLogin),
    _marked3 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(externalLoginCallback),
    _marked4 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(formLogin),
    _marked5 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(successLogin),
    _marked6 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(logout),
    _marked7 = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.mark(successLogout);














var isOauth = function isOauth(idp) {
  return idp.oauth2 === true || idp.oidc === true;
};

var isExternal = function isExternal(idp) {
  return idp.external === true;
};
/**
 * Parse the token from the location hash
 * 
 * @param {object} hash : the location hash (anything after the # in the URL)
 */


var parseHashToken = function parseHashToken(hash) {
  var token = {};
  ["access_token", "id_token", "refresh_token", "expires_in", "expires_at", "token_type"].forEach(function (k) {
    if (hash[k]) {
      token[k] = hash[k];
    }
  });
  return token;
};

var storage = function storage(idp) {
  if (idp.persist && idp.persist === 'sessionStorage') {
    return sessionStorage;
  }

  return localStorage;
};
/**
 * Check if a login is necessary.
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function login(_ref, context) {
  var idpName, onError, onSuccess, router, settings, idp, token, securityContext;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          idpName = _ref.idpName, onError = _ref.onError, onSuccess = _ref.onSuccess;
          router = context.router, settings = context.settings;
          _context.prev = 2;
          router.saveOrigin(false); // build the IDP configuration from the settings and some default values

          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);

          if (!isOauth(idp)) {
            _context.next = 13;
            break;
          }

          _context.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.loadToken);

        case 8:
          token = _context.sent;

          if (!(token && parseInt(token.expires_at) >= Date.now())) {
            _context.next = 13;
            break;
          }

          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogin, {
            idpName: idpName,
            token: token,
            onError: onError,
            onSuccess: onSuccess
          });

        case 12:
          return _context.abrupt("return", _context.sent);

        case 13:
          _context.prev = 13;
          _context.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.fetchSecurityContext);

        case 16:
          securityContext = _context.sent;
          _context.next = 19;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogin, {
            idpName: idpName,
            securityContext: securityContext,
            onError: onError,
            onSuccess: onSuccess
          });

        case 19:
          return _context.abrupt("return", _context.sent);

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](13);

          if (!(_context.t0.code >= 500)) {
            _context.next = 26;
            break;
          }

          throw _context.t0;

        case 26:
          if (!isExternal(idp)) {
            _context.next = 29;
            break;
          }

          _context.next = 29;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.externalLogin, {
            idpName: idpName,
            onError: onError,
            onSuccess: onSuccess
          });

        case 29:
          _context.next = 41;
          break;

        case 31:
          _context.prev = 31;
          _context.t1 = _context["catch"](2);
          _context.next = 35;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context.t1);

        case 35:
          if (!onError) {
            _context.next = 40;
            break;
          }

          _context.next = 38;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context.t1, context);

        case 38:
          _context.next = 41;
          break;

        case 40:
          throw _context.t1;

        case 41:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[2, 31], [13, 22]]);
}
/**
 * Redirect the user to an external login page
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - store: the Redux store
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function externalLogin(_ref2, context) {
  var idpName, onError, router, settings, idp, idpContext, redirectUri, params, nonce, hash, state, _hash, verifier, challenge, url, search, _url, _search;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function externalLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          idpName = _ref2.idpName, onError = _ref2.onError;
          router = context.router, settings = context.settings;
          _context2.prev = 2;
          // build the IDP configuration from the settings and some default values
          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);
          idpContext = Object.assign({}, context, {
            idp: idp
          }); // get the loginCallback route the settings

          redirectUri = Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.loginCallbackRoute || "".concat(router.pathname, "/callback"));

          if (isExternal(idp)) {
            _context2.next = 8;
            break;
          }

          throw Error("IDP type ".concat(idp.type, " is not valid for an external authentication"));

        case 8:
          if (!isOauth(idp)) {
            _context2.next = 53;
            break;
          }

          params = _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({
            client_id: idp.clientId,
            response_type: idp.responseType
          }, idp.postLoginRedirectKey, redirectUri);

          if (idp.scope) {
            params.scope = idp.scope;
          }

          if (!(idp.nonce || idp.responseType.includes("id_token"))) {
            _context2.next = 20;
            break;
          }

          nonce = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["generateNonce"])();
          storage(idp).setItem("onekijs.nonce", nonce);
          _context2.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_utils_crypt__WEBPACK_IMPORTED_MODULE_10__["sha256"], nonce);

        case 16:
          hash = _context2.sent;
          params.nonce = hash;
          _context2.next = 21;
          break;

        case 20:
          storage(idp).removeItem("onekijs.nonce");

        case 21:
          if (!idp.state) {
            _context2.next = 30;
            break;
          }

          state = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["generateState"])();
          storage(idp).setItem("onekijs.state", state);
          _context2.next = 26;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_utils_crypt__WEBPACK_IMPORTED_MODULE_10__["sha256"], state);

        case 26:
          _hash = _context2.sent;
          params.state = _hash;
          _context2.next = 31;
          break;

        case 30:
          storage(idp).removeItem("onekijs.state");

        case 31:
          if (!(idp.responseType === "code" && idp.pkce)) {
            _context2.next = 41;
            break;
          }

          verifier = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["generateCodeVerifier"])();
          storage(idp).setItem("onekijs.verifier", verifier);
          _context2.next = 36;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["generateCodeChallenge"], verifier);

        case 36:
          challenge = _context2.sent;
          params.code_challenge = challenge;
          params.code_challenge_method = idp.codeChallengeMethod;
          _context2.next = 42;
          break;

        case 41:
          storage(idp).removeItem("onekijs.verifier");

        case 42:
          if (!(typeof idp.authorizeEndpoint === "function")) {
            _context2.next = 49;
            break;
          }

          _context2.next = 45;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.authorizeEndpoint, params, idpContext);

        case 45:
          url = _context2.sent;
          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(url, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl")));
          _context2.next = 51;
          break;

        case 49:
          // build the URL based on the spec
          // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
          // const responseType = idp.responseType;
          // const redirectKey = idp.postLoginRedirectKey;
          // const scope = idp.scope;
          search = Object.keys(params).reduce(function (accumulator, key) {
            accumulator += accumulator.length > 1 ? '&' : '';
            return "".concat(accumulator).concat(key, "=").concat(params[key]);
          }, "?");
          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.authorizeEndpoint, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl"))).concat(search);

        case 51:
          _context2.next = 62;
          break;

        case 53:
          if (!(typeof idp.externalLoginEndpoint === "function")) {
            _context2.next = 60;
            break;
          }

          _context2.next = 56;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.externalLoginEndpoint, idpContext);

        case 56:
          _url = _context2.sent;
          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(_url, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl")));
          _context2.next = 62;
          break;

        case 60:
          // we don't actually have a spec to follow. Just use the externalLoginEndpoint
          // and add the callback URL       
          _search = idp.postLoginRedirectKey ? "?".concat(idp.postLoginRedirectKey, "=").concat(redirectUri) : "";
          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.externalLoginEndpoint, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl"))).concat(_search);

        case 62:
          _context2.next = 74;
          break;

        case 64:
          _context2.prev = 64;
          _context2.t0 = _context2["catch"](2);
          _context2.next = 68;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context2.t0);

        case 68:
          if (!onError) {
            _context2.next = 73;
            break;
          }

          _context2.next = 71;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context2.t0, context);

        case 71:
          _context2.next = 74;
          break;

        case 73:
          throw _context2.t0;

        case 74:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[2, 64]]);
}
/**
 * Parse the token and the security context from the response of the 
 * external login
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - store: the Redux store
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function externalLoginCallback(_ref3, context) {
  var idpName, onError, onSuccess, router, settings, idp, idpContext, response, callback, token, securityContext, responseType, params, state, hash, headers, body, _yield$call, _yield$call2, id_token, nonce, _hash2;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function externalLoginCallback$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          idpName = _ref3.idpName, onError = _ref3.onError, onSuccess = _ref3.onSuccess;
          router = context.router, settings = context.settings;
          _context3.prev = 2;
          // build the IDP configuration from the settings and some default values
          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);
          idpContext = Object.assign({}, context, {
            idp: idp
          }); // by default, the response is the current location containing all 
          // parameters found in the URL

          response = router.location; // the callback found in the IDP configuration is a custom function
          // for parsing the reponse of the exernal login

          callback = idp.callback; // Will contain the token from the response (if found)

          token = null; // Will contain the security context found in the response (if found)

          securityContext = null;

          if (!isOauth(idp)) {
            _context3.next = 41;
            break;
          }

          responseType = idp.responseType || "code";

          if (!(responseType === "code")) {
            _context3.next = 40;
            break;
          }

          if (!(typeof idp.tokenEndpoint === "function")) {
            _context3.next = 18;
            break;
          }

          _context3.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.tokenEndpoint, "authorization_code", idpContext);

        case 15:
          token = _context3.sent;
          _context3.next = 37;
          break;

        case 18:
          // validating the authorizeEndpoint response based on spec
          // https://openid.net/specs/openid-connect-core-1_0.html#AuthResponseValidation
          params = router.query;
          state = storage(idp).getItem("onekijs.state");
          storage(idp).removeItem("onekijs.state");

          if (!params.error) {
            _context3.next = 23;
            break;
          }

          throw new _error__WEBPACK_IMPORTED_MODULE_14__["SimpleError"](params.error_description, params.error);

        case 23:
          if (params.code) {
            _context3.next = 25;
            break;
          }

          throw new _error__WEBPACK_IMPORTED_MODULE_14__["SimpleError"]("No authorization code received from Identity Provider", "missing_authorization_code");

        case 25:
          _context3.next = 27;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_utils_crypt__WEBPACK_IMPORTED_MODULE_10__["sha256"], state);

        case 27:
          hash = _context3.sent;

          if (!(idp.state && hash !== params.state)) {
            _context3.next = 30;
            break;
          }

          throw new _error__WEBPACK_IMPORTED_MODULE_14__["SimpleError"]("Invalid oauth2 state", "invalid_state");

        case 30:
          // build the token request based on spec
          // https://openid.net/specs/openid-connect-core-1_0.html#TokenRequest
          headers = {
            "Content-Type": "application/x-www-form-urlencoded"
          };
          body = {
            grant_type: "authorization_code",
            client_id: idp.clientId,
            redirect_uri: Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])("".concat(router.pathname)),
            code: params.code
          };

          if (idp.clientSecret) {
            if (idp.clientAuth === "body") {
              body.client_secret = idp.clientSecret;
            } else {
              headers.auth = {
                basic: {
                  user: idp.clientId,
                  password: idp.clientSecret
                }
              };
            }
          }

          if (idp.pkce) {
            body.code_verifier = storage(idp).getItem("onekijs.verifier");
            storage(idp).removeItem("onekijs.verifier");
          } // get the token from the tokenEndpoint


          _context3.next = 36;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_13__["asyncPost"], idp.tokenEndpoint, body, {
            headers: headers
          });

        case 36:
          token = _context3.sent;

        case 37:
          // use the token instead of the location as the response
          response = token;
          _context3.next = 41;
          break;

        case 40:
          if (!callback || callback === "token") {
            // create a default callback assuming that the response is a location
            // and parsing the token from the URL hash
            callback = function callback(location) {
              return [parseHashToken(location.hash), null];
            };
          }

        case 41:
          if (!(typeof callback === "function")) {
            _context3.next = 48;
            break;
          }

          _context3.next = 44;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(callback, response, idpContext);

        case 44:
          _yield$call = _context3.sent;
          _yield$call2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_yield$call, 2);
          token = _yield$call2[0];
          securityContext = _yield$call2[1];

        case 48:
          if (!(isOauth(idp) && idp.nonce && Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(token, "id_token"))) {
            _context3.next = 57;
            break;
          }

          // validates the nonce found in the id_token
          // https://openid.net/specs/openid-connect-core-1_0.html#TokenResponseValidation
          id_token = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["parseJwt"])(token.id_token);
          nonce = storage(idp).getItem("onekijs.nonce");
          _context3.next = 53;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_utils_crypt__WEBPACK_IMPORTED_MODULE_10__["sha256"], nonce);

        case 53:
          _hash2 = _context3.sent;
          storage(idp).removeItem("onekijs.nonce");

          if (!(_hash2 !== id_token.nonce)) {
            _context3.next = 57;
            break;
          }

          throw Error("Invalid oauth2 nonce");

        case 57:
          this.successLogin({
            token: token,
            securityContext: securityContext,
            idpName: idpName,
            onError: onError,
            onSuccess: onSuccess
          });
          _context3.next = 70;
          break;

        case 60:
          _context3.prev = 60;
          _context3.t0 = _context3["catch"](2);
          _context3.next = 64;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context3.t0);

        case 64:
          if (!onError) {
            _context3.next = 69;
            break;
          }

          _context3.next = 67;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context3.t0, context);

        case 67:
          _context3.next = 70;
          break;

        case 69:
          throw _context3.t0;

        case 70:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[2, 60]]);
}
/**
 * Submit the login form
 *
 * @param action:
 *    - username: the value from the username field
 *    - password: the value from the password field
 *    - rememberMe: the value from the rememberMe checkbox
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function formLogin(_ref4, context) {
  var idpName, onError, onSuccess, username, password, rememberMe, settings, idp, idpContext, response, method, usernameKey, passwordKey, rememberMeKey, contentType, url, body, _body, token, securityContext, _yield$call3, _yield$call4;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function formLogin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          idpName = _ref4.idpName, onError = _ref4.onError, onSuccess = _ref4.onSuccess, username = _ref4.username, password = _ref4.password, rememberMe = _ref4.rememberMe;
          settings = context.settings;
          _context4.prev = 2;
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.setLoading, true);

        case 5:
          // build the IDP configuration from the settings and some default values
          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);
          idpContext = Object.assign({}, context, {
            idp: idp
          }); // will contain the result of the submit

          if (!(typeof idp.loginEndpoint === "function")) {
            _context4.next = 13;
            break;
          }

          _context4.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.loginEndpoint, {
            username: username,
            password: password,
            rememberMe: rememberMe
          }, idpContext);

        case 10:
          response = _context4.sent;
          _context4.next = 24;
          break;

        case 13:
          // create the submit request 
          method = idp.loginMethod || "POST";
          usernameKey = idp.usernameKey || "username";
          passwordKey = idp.passwordKey || "password";
          rememberMeKey = idp.rememberMeKey || "rememberMe";
          contentType = idp.loginContentType || "application/json";
          url = idp.loginEndpoint;
          body = null;

          if (method === "GET") {
            url += "?".concat(usernameKey, "=").concat(username, "&").concat(passwordKey, "=").concat(password, "&").concat(rememberMeKey, "=").concat(rememberMe);
          } else {
            body = (_body = {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_body, usernameKey, username), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_body, passwordKey, password), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(_body, rememberMeKey, rememberMe), _body);
          }

          _context4.next = 23;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_13__["asyncHttp"], Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(url, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl")), method, body, {
            headers: {
              "Content-Type": contentType
            }
          });

        case 23:
          response = _context4.sent;

        case 24:
          // try to parse the token and the security context from the response
          token = null, securityContext = null;

          if (!(typeof idp.callback === "function")) {
            _context4.next = 34;
            break;
          }

          _context4.next = 28;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.callback, response, idpContext);

        case 28:
          _yield$call3 = _context4.sent;
          _yield$call4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_yield$call3, 2);
          token = _yield$call4[0];
          securityContext = _yield$call4[1];
          _context4.next = 35;
          break;

        case 34:
          if (idp.callback === "token") {
            // when the callback is set to "token", the response is the token
            token = response;
          } else if (idp.callback === "securityContext") {
            // when the callback is set to "securityContext", the response is the 
            // security context
            securityContext = response;
          }

        case 35:
          _context4.next = 37;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogin, {
            token: token,
            securityContext: securityContext,
            idpName: idpName,
            onError: onError,
            onSuccess: onSuccess
          });

        case 37:
          _context4.next = 49;
          break;

        case 39:
          _context4.prev = 39;
          _context4.t0 = _context4["catch"](2);
          _context4.next = 43;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context4.t0);

        case 43:
          if (!onError) {
            _context4.next = 48;
            break;
          }

          _context4.next = 46;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context4.t0, context);

        case 46:
          _context4.next = 49;
          break;

        case 48:
          throw _context4.t0;

        case 49:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[2, 39]]);
}
/**
 * Save the token and the security context
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function successLogin(_ref5, context) {
  var token, securityContext, idpName, onError, onSuccess, settings, router, idp, _router$getOrigin, from, fromRoute;

  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function successLogin$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = _ref5.token, securityContext = _ref5.securityContext, idpName = _ref5.idpName, onError = _ref5.onError, onSuccess = _ref5.onSuccess;
          settings = context.settings, router = context.router;
          _context5.prev = 2;
          // build the IDP configuration from the settings and some default values
          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);

          if (!token) {
            _context5.next = 9;
            break;
          }

          _context5.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.saveToken, {
            token: token,
            idp: idp
          });

        case 7:
          _context5.next = 11;
          break;

        case 9:
          _context5.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.setIdp, idp);

        case 11:
          if (!securityContext) {
            _context5.next = 16;
            break;
          }

          _context5.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.setSecurityContext, securityContext);

        case 14:
          _context5.next = 18;
          break;

        case 16:
          _context5.next = 18;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.fetchSecurityContext);

        case 18:
          _context5.next = 20;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onSuccess);

        case 20:
          _context5.next = 22;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.notificationService.clearTopic, 'login-error');

        case 22:
          // get the original route
          _router$getOrigin = router.getOrigin(), from = _router$getOrigin.from, fromRoute = _router$getOrigin.fromRoute;
          router.deleteOrigin();

          if (!onSuccess) {
            _context5.next = 29;
            break;
          }

          _context5.next = 27;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onSuccess, [token, securityContext], Object.assign({}, context, {
            from: from
          }));

        case 27:
          _context5.next = 31;
          break;

        case 29:
          _context5.next = 31;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])([router, router.push], from, fromRoute);

        case 31:
          _context5.next = 43;
          break;

        case 33:
          _context5.prev = 33;
          _context5.t0 = _context5["catch"](2);
          _context5.next = 37;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context5.t0);

        case 37:
          if (!onError) {
            _context5.next = 42;
            break;
          }

          _context5.next = 40;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context5.t0, context);

        case 40:
          _context5.next = 43;
          break;

        case 42:
          throw _context5.t0;

        case 43:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[2, 33]]);
}
/**
 * Logout the user or redirect to an external logout page
 *
 * @param action:
 *    - idpName: name of the IDP (as found in the settings)
 *    - onError: callback for catching possible errors
 * @param context:
 *    - router: an OnekiJS router
 *    - settings: the full settings object passed to the application
 */


function logout(_ref6, context) {
  var onError, onSuccess, router, settings, store, idpName, idp, idpContext, url, redirectUri, search, redirectKey, method;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function logout$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          onError = _ref6.onError, onSuccess = _ref6.onSuccess;
          router = context.router, settings = context.settings, store = context.store;
          _context6.prev = 2;
          idpName = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdpName"])(store.getState());

          if (idpName) {
            _context6.next = 8;
            break;
          }

          _context6.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogout, {
            onError: onError,
            onSuccess: onSuccess
          });

        case 7:
          return _context6.abrupt("return", _context6.sent);

        case 8:
          _context6.next = 10;
          return this.setLoading(true);

        case 10:
          // build the IDP configuration from the settings and some default values
          idp = Object(_utils_auth__WEBPACK_IMPORTED_MODULE_9__["getIdp"])(settings, idpName);
          idpContext = Object.assign({}, context, {
            idp: idp
          });

          if (!isExternal(idp)) {
            _context6.next = 31;
            break;
          }

          if (!(typeof idp.externalLogoutEndpoint === "function")) {
            _context6.next = 20;
            break;
          }

          _context6.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.externalLogoutEndpoint, idpContext);

        case 16:
          url = _context6.sent;
          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(url, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl")));
          _context6.next = 29;
          break;

        case 20:
          if (!idp.externalLogoutEndpoint) {
            _context6.next = 27;
            break;
          }

          // Build the logout URL
          redirectUri = Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.logoutCallbackRoute || "".concat(router.pathname, "/callback"));
          search = "";

          if (isOauth(idp)) {
            // Build the logout URL based on specs
            // https://openid.net/specs/openid-connect-frontchannel-1_0.html
            redirectKey = idp.postLogoutRedirectKey || "post_logout_redirect_uri";
            search = "?".concat(redirectKey, "=").concat(redirectUri, "&client_id=").concat(idp.clientId);
          } else if (idp.postLogoutRedirectKey) {
            search = "?".concat(idp.postLogoutRedirectKey, "=").concat(redirectUri);
          }

          window.location.href = "".concat(Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.externalLogoutEndpoint, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl"))).concat(search);
          _context6.next = 29;
          break;

        case 27:
          _context6.next = 29;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogout, {
            idpName: idpName,
            onError: onError,
            onSuccess: onSuccess
          });

        case 29:
          _context6.next = 42;
          break;

        case 31:
          if (!(typeof idp.logoutEndpoint === "function")) {
            _context6.next = 36;
            break;
          }

          _context6.next = 34;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(idp.logoutEndpoint, idpContext);

        case 34:
          _context6.next = 40;
          break;

        case 36:
          if (!idp.logoutEndpoint) {
            _context6.next = 40;
            break;
          }

          // call the server
          method = idp.logoutMethod || "GET";
          _context6.next = 40;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(_xhr__WEBPACK_IMPORTED_MODULE_13__["asyncHttp"], Object(_utils_url__WEBPACK_IMPORTED_MODULE_12__["absoluteUrl"])(idp.logoutEndpoint, Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "server.baseUrl")), method, null, {
            auth: store.getState().auth
          });

        case 40:
          _context6.next = 42;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.successLogout, {
            onError: onError,
            onSuccess: onSuccess
          });

        case 42:
          _context6.next = 54;
          break;

        case 44:
          _context6.prev = 44;
          _context6.t0 = _context6["catch"](2);
          _context6.next = 48;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context6.t0);

        case 48:
          if (!onError) {
            _context6.next = 53;
            break;
          }

          _context6.next = 51;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context6.t0, context);

        case 51:
          _context6.next = 54;
          break;

        case 53:
          throw _context6.t0;

        case 54:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this, [[2, 44]]);
}

function successLogout(_ref7, context) {
  var onError, onSuccess, router, settings;
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_2___default.a.wrap(function successLogout$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          onError = _ref7.onError, onSuccess = _ref7.onSuccess;
          router = context.router, settings = context.settings;
          _context7.prev = 2;
          _context7.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.authService.clear);

        case 5:
          _context7.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onSuccess);

        case 7:
          _context7.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.notificationService.clearTopic, 'logout-error');

        case 9:
          if (!onSuccess) {
            _context7.next = 14;
            break;
          }

          _context7.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onSuccess);

        case 12:
          _context7.next = 16;
          break;

        case 14:
          _context7.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])([router, router.push], Object(_utils_object__WEBPACK_IMPORTED_MODULE_11__["get"])(settings, "routes.home", "/"));

        case 16:
          _context7.next = 28;
          break;

        case 18:
          _context7.prev = 18;
          _context7.t0 = _context7["catch"](2);
          _context7.next = 22;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(this.onError, _context7.t0);

        case 22:
          if (!onError) {
            _context7.next = 27;
            break;
          }

          _context7.next = 25;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_4__["call"])(onError, _context7.t0, context);

        case 25:
          _context7.next = 28;
          break;

        case 27:
          throw _context7.t0;

        case 28:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, this, [[2, 18]]);
}

var loginService = {
  name: "login",
  reducers: {
    /**
     * Inform the user if there is a loading task
     * 
     * @param {object} state: the redux state 
     * @param {boolean} loading
     */
    setLoading: function setLoading(state, loading) {
      state.loading = loading;
    },

    /**
     * Inform the user if there is an error
     * 
     * @param {object} state: the redux state 
     * @param {object} error 
     */
    onError: function onError(state, error) {
      state.error = error;
      state.loading = false;
    },

    /**
     * Reset the loading and error message after a successful operation
     * 
     * @param {object} state: the redux state 
     */
    onSuccess: function onSuccess(state) {
      state.loading = false;
      state.error = null;
    }
  },
  sagas: {
    formLogin: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(formLogin),
    userLogout: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(logout),
    externalLogin: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(externalLogin),
    externalLoginCallback: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(externalLoginCallback),
    successLogin: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(successLogin),
    login: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(login)
  },
  inject: {
    notificationService: _notification__WEBPACK_IMPORTED_MODULE_6__["notificationService"],
    authService: _auth__WEBPACK_IMPORTED_MODULE_5__["authService"]
  }
};
var logoutService = {
  name: "logout",
  reducers: {
    /**
     * Inform the user if there is a loading task
     * 
     * @param {object} state: the redux state 
     * @param {boolean} loading
     */
    setLoading: function setLoading(state, loading) {
      state.loading = loading;
    },

    /**
     * Inform the user if there is an error
     * 
     * @param {object} state: the redux state 
     * @param {object} error 
     */
    onError: function onError(state, error) {
      state.error = error;
      state.loading = false;
    },

    /**
     * Reset the loading and error message after a successful operation
     * 
     * @param {object} state: the redux state 
     */
    onSuccess: function onSuccess(state) {
      state.loading = false;
      state.error = null;
    }
  },
  sagas: {
    logout: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(logout),
    successLogout: Object(_saga__WEBPACK_IMPORTED_MODULE_7__["latest"])(successLogout)
  },
  inject: {
    authService: _auth__WEBPACK_IMPORTED_MODULE_5__["authService"],
    notificationService: _notification__WEBPACK_IMPORTED_MODULE_6__["notificationService"]
  }
}; // manage the login

var useLoginService = function useLoginService(idpName) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // create the local login service
  var _useLocalService = Object(_service__WEBPACK_IMPORTED_MODULE_8__["useLocalService"])(loginService, {
    loading: false,
    error: null
  }),
      _useLocalService2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService, 2),
      state = _useLocalService2[0],
      service = _useLocalService2[1]; // inject the global notificationService


  var notificationService = Object(_notification__WEBPACK_IMPORTED_MODULE_6__["useNotificationService"])(); // we send errors to the notification service

  var defaultOnError = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (error) {
    notificationService.send({
      topic: 'login-error',
      payload: error
    });
  }, [notificationService]);
  var onError = options.onError || defaultOnError;
  var onSuccess = options.onSuccess;
  var callback = options.callback; // build the submit method in case of a form login

  var submit = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (action) {
    return service.formLogin(Object.assign({
      idpName: idpName,
      onError: onError,
      onSuccess: onSuccess
    }, action));
  }, [service, idpName, onError, onSuccess]);
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (callback) {
      // call the external login callback saga
      service.externalLoginCallback({
        idpName: idpName,
        onError: onError,
        onSuccess: onSuccess
      });
    } else {
      // call the login saga
      service.login({
        idpName: idpName,
        onError: onError,
        onSuccess: onSuccess
      });
    }
  }, [service, idpName, onError, onSuccess, callback]);
  return [state.error, state.loading, submit];
}; // manage the result of a external login

var useLoginCallbackService = function useLoginCallbackService(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  options.callback = true;

  var _useLoginService = useLoginService(name, options),
      _useLoginService2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLoginService, 2),
      error = _useLoginService2[0],
      loading = _useLoginService2[1];

  return [error, loading];
};
var useLoginError = function useLoginError() {
  var errors = Object(_notification__WEBPACK_IMPORTED_MODULE_6__["useNotifications"])('login-error');
  return errors[0];
};
var useLogoutService = function useLogoutService() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useLocalService3 = Object(_service__WEBPACK_IMPORTED_MODULE_8__["useLocalService"])(logoutService, {
    loading: true
  }),
      _useLocalService4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService3, 2),
      state = _useLocalService4[0],
      service = _useLocalService4[1];

  var notificationService = Object(_notification__WEBPACK_IMPORTED_MODULE_6__["useNotificationService"])(); // we send errors to the notification service

  var defaultOnError = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (error) {
    notificationService.send({
      topic: 'logout-error',
      payload: error
    });
  }, [notificationService]);
  var onError = options.onError || defaultOnError;
  var onSuccess = options.onSuccess;
  var callback = options.callback;
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (callback) {
      service.successLogout({
        onError: onError,
        onSuccess: onSuccess
      });
    } else {
      service.logout({
        onError: onError,
        onSuccess: onSuccess
      });
    }
  }, [service, onError, onSuccess, callback]);
  return state;
};
var useLogoutCallbackService = function useLogoutCallbackService() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  options.callback = true;
  return useLogoutService(options);
};
var useLogoutError = function useLogoutError() {
  var errors = Object(_notification__WEBPACK_IMPORTED_MODULE_6__["useNotifications"])('logout-error');
  return errors[0];
};
//# sourceMappingURL=login.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/notification.js":
/*!**************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/notification.js ***!
  \**************************************************************************************/
/*! exports provided: notificationService, useNotificationService, useNotifications */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationService", function() { return notificationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNotificationService", function() { return useNotificationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNotifications", function() { return useNotifications; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store */ "../../packages/core/dist/esm/lib/store.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");





var nextId = 1;

var formatNotification = function formatNotification(notification, settings, notificationService) {
  if (typeof notification === "string") {
    notification = {
      payload: notification
    };
  }

  if (notification.constructor === Object) {
    notification = Object.assign({}, notification);
  }

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["isNull"])(notification.id)) {
    notification.id = "oneki-id-".concat(++nextId);
  }

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["isNull"])(notification.topic)) {
    notification.topic = "default";
  }

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["isNull"])(notification.timestamp)) {
    var date = new Date();
    notification.timestamp = date.getTime();
  }

  if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["isNull"])(notification.persist)) {
    var persist = Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.".concat(notification.topic, ".persist"), Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.default.persist", true));
    notification.persist = persist;
  }

  notification.remove = function () {
    notificationService.remove(notification.id);
  };

  return notification;
};

var formatLevelNotification = function formatLevelNotification(level, notification) {
  if (typeof notification === "string") {
    notification = {
      topic: level,
      payload: {
        message: notification
      }
    };
  } else {
    notification = {
      topic: level,
      payload: notification
    };
  }

  return notification;
};

var notificationService = {
  name: "notification",
  init: function init(_ref) {
    var router = _ref.router;
    router.listen(this.onRouteChange);
  },
  reducers: {
    add: function add(state, notification, _ref2) {
      var settings = _ref2.settings;
      var max = Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.".concat(notification.topic, ".max"), Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.default.max", 0));
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["append"])(state, "notifications.".concat(notification.topic), notification);

      if (max > 0 && state.notifications[notification.topic].length > max) {
        state.notifications[notification.topic].unshift();
      }
    },
    clearTopic: function clearTopic(state, topic) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["set"])(state, "notifications.".concat(topic), []);
    },
    remove: function remove(state, notificationId) {
      Object.keys(state.notifications || {}).forEach(function (topic) {
        for (var i = 0; i < state.notifications[topic].length; i++) {
          if (state.notifications[topic][i].id === notificationId) {
            state.notifications[topic].splice(i, 1);
            break;
          }
        }
      });
    },
    onRouteChange: function onRouteChange(state) {
      Object.keys(state.notifications || {}).forEach(function (topic) {
        for (var i = state.notifications[topic].length - 1; i >= 0; i--) {
          if (!state.notifications[topic][i].persist) {
            state.notifications[topic].splice(i, 1);
          }
        }
      });
    }
  },
  sagas: {
    send: /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function send(notification, _ref3) {
      var store, settings, topic, notifications;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              store = _ref3.store, settings = _ref3.settings;
              _context.prev = 1;

              if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["isNull"])(notification.id)) {
                _context.next = 7;
                break;
              }

              // check if this notification is already present
              topic = notification.topic || "default";
              notifications = Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(store.getState(), "notifications.".concat(topic), []);

              if (!notifications.find(function (n) {
                return n.id === notification.id;
              })) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              notification = formatNotification(notification, settings, this);

              if (notification.ttl === undefined) {
                notification.ttl = Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.".concat(notification.topic, ".ttl"), Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(settings, "notification.default.ttl"));
              }

              _context.next = 11;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(this.add, notification);

            case 11:
              if (!notification.ttl) {
                _context.next = 16;
                break;
              }

              _context.next = 14;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["delay"])(notification.ttl);

            case 14:
              _context.next = 16;
              return this.remove(notification.id);

            case 16:
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](1);
              throw _context.t0;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, send, this, [[1, 18]]);
    }),
    error: /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function error(_error) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function error$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              console.error(_error);
              _context2.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(this.send, formatLevelNotification("error", _error));

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, error, this);
    }),
    success: /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function success(_success) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function success$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(this.send, formatLevelNotification("success", _success));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, success, this);
    }),
    info: /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function info(_info) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function info$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(this.send, formatLevelNotification("info", _info));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, info, this);
    }),
    warning: /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function warning(_warning) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function warning$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(this.send, formatLevelNotification("warning", _warning));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, warning, this);
    })
  }
};
var useNotificationService = function useNotificationService() {
  return Object(_service__WEBPACK_IMPORTED_MODULE_2__["useReduxService"])(notificationService);
};
var useNotifications = function useNotifications(topic) {
  var defaultValue;

  if (topic) {
    topic = "notifications.".concat(topic);
    defaultValue = [];
  } else {
    topic = "notifications";
    defaultValue = {};
  }

  return Object(_store__WEBPACK_IMPORTED_MODULE_3__["useReduxSelector"])(topic, defaultValue);
};
//# sourceMappingURL=notification.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/router/base.js":
/*!*************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/router/base.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseRouter; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");




var BaseRouter = /*#__PURE__*/function () {
  function BaseRouter() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, BaseRouter);

    this.history = [];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(BaseRouter, [{
    key: "deleteOrigin",
    value: function deleteOrigin() {
      localStorage.removeItem("onekijs.from");
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      var from = localStorage.getItem("onekijs.from") || Object(_utils_object__WEBPACK_IMPORTED_MODULE_2__["get"])(this.settings, "routes.home", "/");
      return {
        from: from
      };
    }
    /**
     * url can be a string or a location.
     * If location, the format is the following
     * {
     *   url: string, // example: /users/1?test=1&test2#h=3&h2
     *   route: string, // example: /users/[id]
     *   pathname: string, // example: /users/1
     *   query: obj, // example: {test:1,test2:null}
     *   hash: obj // example: {h:3, h2:null}
     *   state: obj // example: {key1: 'value1'}
     * }
     */

  }, {
    key: "push",
    value: function push(url_or_location) {
      throw Error("method push of class ".concat(this.constructor.name, "  must be redefined"));
    }
  }, {
    key: "replace",
    value: function replace(url_or_location) {
      throw Error("method replace of class ".concat(this.constructor.name, "  must be redefined"));
    }
  }, {
    key: "saveOrigin",
    value: function saveOrigin() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var currentValue = localStorage.getItem("onekijs.from");
      if (!force && currentValue) return;
      var from = Object(_utils_object__WEBPACK_IMPORTED_MODULE_2__["get"])(this.settings, "routes.home", "/");
      var previous = this.previousLocation;

      if (previous) {
        from = previous.relativeurl;
      }

      localStorage.setItem("onekijs.from", from);
    }
    /**
     * callback(url) where url is:
     * {
     *   url: string, // example: /users/1?test=1&test2#h=3&h2
     *   route: string, // example: /users/[id]
     *   pathname: string, // example: /users/1
     *   query: obj, // example: {test:1,test2:null}
     *   hash: obj // example: {h:3, h2:null}
     *   state: obj // example: {key1: 'value1'}
     * }
     */

  }, {
    key: "listen",
    value: function listen(callback) {
      throw Error("method listen of class ".concat(this.constructor.name, "  must be redefined"));
    }
  }, {
    key: "unlisten",
    value: function unlisten(handler) {
      throw Error("method unlisten of class ".concat(this.constructor.name, "  must be redefined"));
    }
  }, {
    key: "location",
    get: function get() {
      return this.history[0];
    }
  }, {
    key: "previousLocation",
    get: function get() {
      return this.history[1];
    }
  }, {
    key: "hash",
    get: function get() {
      return this.location ? this.location.hash : null;
    }
  }, {
    key: "query",
    get: function get() {
      return this.location ? this.location.query : null;
    }
  }, {
    key: "href",
    get: function get() {
      return this.location ? this.location.href : null;
    }
  }, {
    key: "pathname",
    get: function get() {
      return this.location ? this.location.pathname : null;
    }
  }, {
    key: "state",
    get: function get() {
      return this.location ? this.location.state : null;
    }
  }]);

  return BaseRouter;
}();


//# sourceMappingURL=base.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/saga.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/saga.js ***!
  \******************************************************************************/
/*! exports provided: every, latest, leading, debounce, throttle, delayLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "every", function() { return every; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "latest", function() { return latest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leading", function() { return leading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delayLoading", function() { return delayLoading; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);


var _marked = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(delayLoading);


var every = function every(saga) {
  return {
    effect: redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"],
    saga: saga
  };
};
var latest = function latest(saga) {
  return {
    effect: redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeLatest"],
    saga: saga
  };
};
var leading = function leading(saga) {
  return {
    effect: redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeLeading"],
    saga: saga
  };
};
var debounce = function debounce(delay, saga) {
  return {
    effect: redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["debounce"],
    saga: saga,
    delay: delay
  };
};
var throttle = function throttle(delay, saga) {
  return {
    effect: redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["throttle"],
    saga: saga,
    delay: delay
  };
};
function delayLoading(delay_ms, reducer) {
  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function delayLoading$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["delay"])(delay_ms);

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(reducer, true);

        case 5:
          _context.prev = 5;
          return _context.finish(5);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0,, 5, 7]]);
}
//# sourceMappingURL=saga.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/secure.js":
/*!********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/secure.js ***!
  \********************************************************************************/
/*! exports provided: secure, SecureRoute */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "secure", function() { return secure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SecureRoute", function() { return SecureRoute; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./auth */ "../../packages/core/dist/esm/lib/auth.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./context */ "../../packages/core/dist/esm/lib/context.js");
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./error */ "../../packages/core/dist/esm/lib/error.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./store */ "../../packages/core/dist/esm/lib/store.js");










var DefaultErrorComponent = function DefaultErrorComponent(_ref) {
  var error = _ref.error;
  var router = Object(_context__WEBPACK_IMPORTED_MODULE_6__["useOnekiRouter"])();
  var loginRoute = Object(_context__WEBPACK_IMPORTED_MODULE_6__["useSetting"])('routes.login', '/login');
  Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
    if (error.code === 401) {
      router.push(loginRoute);
    }
  }, [error.code, router, loginRoute]);

  if (error.code === 401) {
    return null;
  }

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "ERROR COMPONENT HERE ", error.code);
};

var secure = function secure(Component, validator) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var SecureComponent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.memo(function (props) {
    var authService = Object(_auth__WEBPACK_IMPORTED_MODULE_5__["useAuthService"])();
    var securityContext = Object(_store__WEBPACK_IMPORTED_MODULE_8__["useReduxSelector"])("auth.securityContext", null);
    var token = Object(_store__WEBPACK_IMPORTED_MODULE_8__["useReduxSelector"])("auth.token", null);

    var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(false),
        _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
        loading = _useState2[0],
        setLoading = _useState2[1];

    var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(null),
        _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
        error = _useState4[0],
        setError = _useState4[1];

    var ErrorComponent = options.ErrorComponent || DefaultErrorComponent;
    var onError = Object(react__WEBPACK_IMPORTED_MODULE_3__["useCallback"])(function (e) {
      setError(e);
      setLoading(false);
    }, [setLoading, setError]);
    Object(react__WEBPACK_IMPORTED_MODULE_3__["useEffect"])(function () {
      if (!loading && !securityContext && !error) {
        setLoading(true);
        authService.fetchSecurityContext().then(function () {
          setLoading(false);
        })["catch"](function (e) {
          onError(e);
        });
      }
    }, [authService, onError, error, loading, securityContext]);

    if (!loading && !error) {
      if (token && token.expires_at && parseInt(token.expires_at) < Date.now()) {
        onError(new _error__WEBPACK_IMPORTED_MODULE_7__["default"](401));
      } else if (securityContext) {
        if (validator && !validator(securityContext)) {
          // Example: user doesn't have the required role
          onError(new _error__WEBPACK_IMPORTED_MODULE_7__["default"](403));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, props);
        }
      } else {
        return null;
      }
    } else if (loading) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, "Loading...");
    } else if (error) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(ErrorComponent, {
        error: error
      });
    }
  });
  SecureComponent.getLayout = Component.getLayout;
  return SecureComponent;
};
var SecureRoute = function SecureRoute(_ref2) {
  var Component = _ref2.component,
      args = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1___default()(_ref2, ["component"]);

  var token = Object(_store__WEBPACK_IMPORTED_MODULE_8__["useReduxSelector"])("auth.token", null);
  var securityContext = Object(_store__WEBPACK_IMPORTED_MODULE_8__["useReduxSelector"])("auth.securityContext", null);
  var loginRoute = Object(_context__WEBPACK_IMPORTED_MODULE_6__["useSetting"])("routes.login", "/login");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, args, {
    render: function render(props) {
      return !securityContext || token && token.expires_at <= Date.now() ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
        to: {
          pathname: loginRoute,
          state: {
            from: props.location
          }
        }
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(Component, props);
    }
  }));
};
//# sourceMappingURL=secure.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/service.js":
/*!*********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/service.js ***!
  \*********************************************************************************/
/*! exports provided: createReduxService, useGlobalService, useReduxService, useLocalService, genericService, useGenericReducer, useGenericSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReduxService", function() { return createReduxService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGlobalService", function() { return useGlobalService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReduxService", function() { return useReduxService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalService", function() { return useLocalService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genericService", function() { return genericService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGenericReducer", function() { return useGenericReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGenericSaga", function() { return useGenericSaga; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "../../node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _redux_saga_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @redux-saga/core */ "@redux-saga/core");
/* harmony import */ var _redux_saga_core__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_redux_saga_core__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! events */ "events");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./context */ "../../packages/core/dist/esm/lib/context.js");
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./saga */ "../../packages/core/dist/esm/lib/saga.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");









function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }










var services = {};

var ReduxService = /*#__PURE__*/function () {
  function ReduxService(schema, context) {
    var _this = this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, ReduxService);

    this._reducers = {};
    this._sagas = {};
    this._name = schema.name;
    this._context = context;
    Object.keys(schema.inject || {}).forEach(function (serviceName) {
      _this._injectService(serviceName, schema.inject[serviceName]);
    });
    Object.keys(schema.reducers || {}).forEach(function (type) {
      _this._createReducer(type, schema.reducers[type], context.store.dispatch);
    });
    Object.keys(schema.sagas || {}).forEach(function (type) {
      var effect = typeof schema.sagas[type] === 'function' ? null : schema.sagas[type]["effect"];
      var fn = typeof schema.sagas[type] === 'function' ? schema.sagas[type] : schema.sagas[type]["saga"];

      _this._createSaga(type, effect, fn, schema.sagas.delay);
    });

    if (schema.init) {
      schema.init.call(this, this._context);
    }
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(ReduxService, [{
    key: "_createReducer",
    value: function _createReducer(type, reducer, dispatch) {
      var _this2 = this;

      var _type$split = type.split(" as "),
          _type$split2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_type$split, 2),
          actionType = _type$split2[0],
          alias = _type$split2[1];

      alias = alias ? alias : actionType;
      actionType = actionType.includes(".") || !this._name ? actionType : "".concat(this._name, ".").concat(actionType);

      if (reducer) {
        this._reducers[actionType] = reducer;
      }

      this[alias] = function (payload) {
        _this2._dispatch({
          type: actionType,
          payload: payload
        });
      };
    }
  }, {
    key: "_createSaga",
    value: function _createSaga(type, effect, saga, delay) {
      var _this3 = this;

      var self = this;
      var context = this._context;

      var _type$split3 = type.split(" as "),
          _type$split4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_type$split3, 2),
          actionType = _type$split4[0],
          alias = _type$split4[1];

      alias = alias ? alias : actionType;
      actionType = actionType.includes(".") || !this._name ? actionType : "".concat(this._name, ".").concat(actionType);

      var wrapper = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function wrapper(action) {
        var payload, result;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function wrapper$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                payload = action.payload === undefined ? {} : action.payload;
                _context.next = 4;
                return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__["call"])([self, saga], payload, context);

              case 4:
                result = _context.sent;

                if (action.resolve) {
                  action.resolve(result);
                }

                return _context.abrupt("return", result);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);

                if (!action.reject) {
                  _context.next = 15;
                  break;
                }

                action.reject(_context.t0);
                _context.next = 16;
                break;

              case 15:
                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, wrapper, null, [[0, 9]]);
      });

      if (effect) {
        if (delay) {
          this._sagas[actionType] = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee() {
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return effect(delay, actionType, wrapper);

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee);
          });
        } else {
          this._sagas[actionType] = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee2() {
            return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return effect(actionType, wrapper);

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee2);
          });
        }
      } else {
        this._sagas[actionType] = /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee3() {
          var action;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee3$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (false) {}

                  _context4.next = 3;
                  return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__["take"])(actionType, wrapper);

                case 3:
                  action = _context4.sent;
                  _context4.next = 6;
                  return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__["call"])(wrapper, action);

                case 6:
                  _context4.next = 0;
                  break;

                case 8:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee3);
        });
      }

      this[alias] = function (payload) {
        return new Promise(function (resolve, reject) {
          _this3._dispatch({
            type: actionType,
            payload: payload,
            resolve: resolve,
            reject: reject
          });
        });
      };
    }
  }, {
    key: "_injectService",
    value: function _injectService(name, defaultSchema) {
      var _this4 = this;

      // create service with the default schema if not already present in the context
      var store = this._context.store;
      createReduxService(defaultSchema, this._context);
      this[name] = {};
      Object.keys(defaultSchema.reducers || {}).forEach(function (type) {
        _this4[name][type] = function (payload) {
          return store.dispatch({
            type: "".concat(defaultSchema.name, ".").concat(type),
            payload: payload
          });
        };
      });
      Object.keys(defaultSchema.sagas || {}).forEach(function (type) {
        _this4[name][type] = function (payload) {
          return new Promise(function (resolve, reject) {
            store.dispatch({
              type: "".concat(defaultSchema.name, ".").concat(type),
              payload: payload,
              resolve: resolve,
              reject: reject
            });
          });
        };
      });
    }
  }, {
    key: "_run",
    value: function _run() {
      var _this5 = this;

      var store = this._context.store;
      this._dispatch = store.dispatch;
      store.injectReducers(this, this._name, this._reducers, this._context);
      Object.keys(this._sagas).forEach(function (type) {
        store.runSaga(_this5._name, _this5._sagas[type], type);
      });
    }
  }, {
    key: "_stop",
    value: function _stop() {
      var _this6 = this;

      var store = this._context.store;
      this._dispatch = null;
      store.removeReducers(this._name, this._reducers);
      Object.keys(this._sagas).forEach(function (type) {
        store.cancelSaga(_this6._name, type);
      });
    }
  }]);

  return ReduxService;
}();

var Service = /*#__PURE__*/function (_ReduxService) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_1___default()(Service, _ReduxService);

  var _super = _createSuper(Service);

  function Service(schema, context) {
    var _this7;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, Service);

    _this7 = _super.call(this, schema, context);

    _this7._reducer = function (state, action) {
      var nextState = immer__WEBPACK_IMPORTED_MODULE_10___default()(state, function (draftState) {
        if (_this7._reducers[action.type]) {
          var payload = action.payload === undefined ? {} : action.payload;

          _this7._reducers[action.type].call(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this7), draftState, payload, _this7._context);
        }
      });
      console.log('nextState', action.type, nextState);
      _this7._state = nextState;
      return nextState;
    };

    return _this7;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(Service, [{
    key: "_run",
    value: function _run() {}
  }, {
    key: "_stop",
    value: function _stop() {}
  }]);

  return Service;
}(ReduxService); // singleton


var createReduxService = function createReduxService(schema, context) {
  if (!services[schema.name]) {
    var service = new ReduxService(schema, context);

    service._run();

    services[schema.name] = service;
  }

  return services[schema.name];
};
var useGlobalService = function useGlobalService(schema) {
  // definition and store should be immutable.
  var store = Object(react_redux__WEBPACK_IMPORTED_MODULE_12__["useStore"])();
  var appContext = Object(react__WEBPACK_IMPORTED_MODULE_11__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_14__["AppContext"]);
  var context = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    return {};
  }, []);
  Object.assign(context, appContext, {
    store: store
  });
  var service = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    return createReduxService(schema, context); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store]);
  return service;
};
var useReduxService = useGlobalService; // alias

var useLocalService = function useLocalService(schema) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var reduxContext = Object(react__WEBPACK_IMPORTED_MODULE_11__["useContext"])(react_redux__WEBPACK_IMPORTED_MODULE_12__["ReactReduxContext"]) || {};
  var appContext = Object(react__WEBPACK_IMPORTED_MODULE_11__["useContext"])(_context__WEBPACK_IMPORTED_MODULE_14__["AppContext"]);
  var context = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    return {};
  }, []);
  Object.assign(context, appContext, {
    store: reduxContext.store
  });
  var service = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    return new Service(schema, context);
  }, [schema, context]);

  var _useReducer = Object(react__WEBPACK_IMPORTED_MODULE_11__["useReducer"])(service._reducer, initialState),
      _useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_5___default()(_useReducer, 2),
      state = _useReducer2[0],
      reactDispatch = _useReducer2[1];

  var env = Object(react__WEBPACK_IMPORTED_MODULE_11__["useRef"])(state);
  env.current = state;
  var channel = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    return Object(_redux_saga_core__WEBPACK_IMPORTED_MODULE_8__["stdChannel"])();
  }, []);
  var emitter = Object(react__WEBPACK_IMPORTED_MODULE_11__["useMemo"])(function () {
    var emitter = new events__WEBPACK_IMPORTED_MODULE_9__["EventEmitter"]();
    emitter.on("action", channel.put);
    return emitter;
  }, [channel.put]);
  var dispatch = Object(react__WEBPACK_IMPORTED_MODULE_11__["useCallback"])(function (a) {
    //setTimeout(channel.put, 0, a);
    emitter.emit("action", a);
    reactDispatch(a);
  }, [emitter]);
  service._dispatch = dispatch;
  var getState = Object(react__WEBPACK_IMPORTED_MODULE_11__["useCallback"])(function () {
    return env.current;
  }, []);
  Object(react__WEBPACK_IMPORTED_MODULE_11__["useEffect"])(function () {
    var tasks = [];
    Object.keys(service._sagas).forEach(function (type) {
      tasks.push(Object(_redux_saga_core__WEBPACK_IMPORTED_MODULE_8__["runSaga"])({
        channel: channel,
        dispatch: dispatch,
        getState: getState
      }, service._sagas[type]));
    });
    return function () {
      var _iterator = _createForOfIteratorHelper(tasks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var task = _step.value;
          task.cancel();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    };
  }, [channel, service._sagas, dispatch, getState]);
  return [state, service];
};
var genericService = {
  name: "generic",
  reducers: {
    executeReducer: function executeReducer(state, _ref) {
      var reducer = _ref.reducer,
          key = _ref.key,
          payload = _ref.payload,
          context = _ref.context;

      if (reducer) {
        reducer(state, context);
      } else {
        Object(_utils_object__WEBPACK_IMPORTED_MODULE_16__["set"])(state, key, payload);
      }
    }
  },
  sagas: {
    executeSaga: Object(_saga__WEBPACK_IMPORTED_MODULE_15__["every"])( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.mark(function _callee4(_ref2, context) {
      var saga;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default.a.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              saga = _ref2.saga;
              _context5.next = 3;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_13__["call"])(saga, context);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }))
  }
};
var useGenericReducer = function useGenericReducer(reducer, payload) {
  var service = useReduxService(genericService);
  payload = Object(_utils_object__WEBPACK_IMPORTED_MODULE_16__["useShallowEqual"])(payload);
  Object(react__WEBPACK_IMPORTED_MODULE_11__["useEffect"])(function () {
    if (typeof reducer === 'string') {
      service.executeReducer({
        key: reducer,
        payload: payload
      });
    } else {
      service.executeReducer({
        reducer: reducer
      });
    }
  }, [reducer, payload, service]);
};
var useGenericSaga = function useGenericSaga() {};
//# sourceMappingURL=service.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/settings.js":
/*!**********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/settings.js ***!
  \**********************************************************************************/
/*! exports provided: defaultSettings, defaultIdpSettings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultSettings", function() { return defaultSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultIdpSettings", function() { return defaultIdpSettings; });
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/url */ "../../packages/core/dist/esm/lib/utils/url.js");

var defaultSettings = {
  contextPath: "/",
  i18n: {
    locales: [],
    defaultLocale: null,
    url: "/locales",
    slug: '[lang]',
    localeFromLocation: function localeFromLocation(location, settings) {
      var contextPath = settings.contextPath,
          i18n = settings.i18n;
      var length = contextPath.endsWith("/") ? contextPath.length : contextPath.length + 1;
      var locale = location.pathname.substring(length).split("/")[0];
      if (i18n.locales.includes(locale)) return locale;
      return null;
    },
    addLocaleToLocation: function addLocaleToLocation(locale, location, settings) {
      var pathname = location.pathname;
      var relativeUrl = Object(_utils_url__WEBPACK_IMPORTED_MODULE_0__["toRelativeUrl"])(location);
      var hasLocale = settings.i18n.locales.find(function (l) {
        return pathname.startsWith("/".concat(l));
      });

      if (!hasLocale) {
        location.pathname = "/".concat(locale).concat(pathname);
        if (location.pathname.endsWith('/')) location.pathname = location.pathname.slice(0, -1);
      }

      if (Object.keys(location).includes('route')) {
        var route = location.route || relativeUrl;

        if (!route.startsWith("/".concat(settings.i18n.slug))) {
          location.route = "/".concat(settings.i18n.slug).concat(route);
          if (location.route.endsWith('/')) location.route = location.route.slice(0, -1);
        }
      }

      return location;
    },
    changeLocale: function changeLocale(locale, _ref) {
      var router = _ref.router,
          settings = _ref.settings,
          i18n = _ref.i18n;
      var contextPath = settings.contextPath;
      var length = contextPath.endsWith("/") ? contextPath.length : contextPath.length + 1;
      var currentLocale = i18n.locale;
      var pathTokens = router.pathname.substring(length).split("/");

      if (pathTokens[0] === currentLocale) {
        pathTokens[0] = locale;
        router.push(Object.assign({}, router.location, {
          pathname: "".concat(router.pathname.substring(0, length)).concat(pathTokens.join('/'))
        }));
      }
    }
  },
  idp: {},
  notification: {
    "default": {
      ttl: 5000,
      max: 5
    },
    error: {
      ttl: 0,
      max: 0
    },
    "login-error": {
      ttl: 0,
      max: 1
    },
    "logout-error": {
      ttl: 0,
      max: 1
    }
  },
  router: {
    type: 'browser'
  },
  routes: {
    login: '/login',
    loginCallback: '/login/callback',
    logout: '/logout',
    logoutCallback: '/logout/callback',
    home: '/'
  }
};
var defaultIdpSettings = {
  external: {
    callback: null,
    external: true,
    oauth2: false,
    oidc: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'redirect_uri'
  },
  form: {
    callback: null,
    external: false,
    loginContentType: 'application/json',
    loginMethod: 'POST',
    logoutMethod: 'GET',
    oauth2: false,
    oidc: false,
    passwordKey: 'password',
    rememberMeKey: 'rememberMe',
    usernameKey: 'username'
  },
  oauth2_browser: {
    callback: null,
    clientAuth: 'basic',
    clockSkew: 60,
    codeChallengeMethod: 'S256',
    cookieTTL: null,
    external: true,
    oauth2: true,
    oidc: false,
    pkce: true,
    nonce: false,
    persist: 'localStorage',
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    pubKeyAlgorithm: 'RS256',
    responseType: 'code',
    scope: null,
    state: true,
    validate: true
  },
  oauth2_server: {
    callback: null,
    codeChallengeMethod: 'S256',
    external: true,
    oauth2: true,
    oidc: false,
    pkce: true,
    nonce: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    responseType: 'code',
    scope: null,
    state: true,
    validate: false
  },
  oidc_browser: {
    callback: null,
    clientAuth: 'basic',
    clockSkew: 60,
    codeChallengeMethod: 'S256',
    cookieTTL: null,
    external: true,
    oauth2: true,
    oidc: true,
    pkce: true,
    nonce: true,
    persist: 'localStorage',
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    pubKeyAlgorithm: 'RS256',
    responseType: 'code',
    scope: 'openid',
    state: true,
    validate: true
  },
  oidc_server: {
    callback: null,
    codeChallengeMethod: 'S256',
    external: true,
    oauth2: true,
    oidc: true,
    pkce: true,
    nonce: false,
    postLoginRedirectKey: 'redirect_uri',
    postLogoutRedirectKey: 'post_logout_redirect_uri',
    responseType: 'code',
    scope: 'openid',
    state: true,
    validate: false
  }
};
//# sourceMappingURL=settings.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/state.js":
/*!*******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/state.js ***!
  \*******************************************************************************/
/*! exports provided: useGlobalState, useGlobalStateModifier, useGlobalProp, useLocalState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGlobalState", function() { return useGlobalState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGlobalStateModifier", function() { return useGlobalStateModifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGlobalProp", function() { return useGlobalProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocalState", function() { return useLocalState; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./service */ "../../packages/core/dist/esm/lib/service.js");
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");





var globalService = {
  name: "state",
  reducers: {
    setState: function setState(state, payload) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["set"])(state, payload.key, payload.value);
    }
  }
};

var defaultSelector = function defaultSelector(state) {
  return state;
};

var useGlobalState = function useGlobalState(selector, defaultValue) {
  var state = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(selector || defaultSelector);
  state = state === undefined ? defaultValue : state;
  var service = Object(_service__WEBPACK_IMPORTED_MODULE_3__["useReduxService"])(globalService);
  var setState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (key, value) {
    service.setState({
      key: key,
      value: value
    });
  }, [service]);
  return [state, setState];
};
var useGlobalStateModifier = function useGlobalStateModifier() {
  var service = Object(_service__WEBPACK_IMPORTED_MODULE_3__["useReduxService"])(globalService);
  var setState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (key, value) {
    service.setState({
      key: key,
      value: value
    });
  }, [service]);
  return setState;
};
var useGlobalProp = function useGlobalProp(key, defaultValue) {
  var value = Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["useSelector"])(function (state) {
    return Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(state, key);
  });
  value = value === undefined ? defaultValue : value;
  var service = Object(_service__WEBPACK_IMPORTED_MODULE_3__["useReduxService"])(globalService);
  var setValue = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (value) {
    service.setState({
      key: key,
      value: value
    });
  }, [service, key]);
  return [value, setValue];
};
var localService = {
  reducers: {
    setState: function setState(state, payload) {
      Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["set"])(state, payload.key, payload.value);
    }
  }
};
var useLocalState = function useLocalState(initialState) {
  var _useLocalService = Object(_service__WEBPACK_IMPORTED_MODULE_3__["useLocalService"])(localService, initialState),
      _useLocalService2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useLocalService, 2),
      state = _useLocalService2[0],
      service = _useLocalService2[1];

  var setState = Object(react__WEBPACK_IMPORTED_MODULE_1__["useCallback"])(function (key, value) {
    service.setState({
      key: key,
      value: value
    });
  }, [service]);
  return [state, setState];
};
//# sourceMappingURL=state.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/store.js":
/*!*******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/store.js ***!
  \*******************************************************************************/
/*! exports provided: createReduxStore, useReduxSelector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createReduxStore", function() { return createReduxStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReduxSelector", function() { return useReduxSelector; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "../../node_modules/@babel/runtime/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga */ "redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);







var createReduxStore = function createReduxStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var sagaMiddleware = middlewares.find(function (middleware) {
    return middleware.name === "sagaMiddleware";
  });

  if (!sagaMiddleware) {
    sagaMiddleware = redux_saga__WEBPACK_IMPORTED_MODULE_2___default()();
    middlewares.push(sagaMiddleware);
  }

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_1__["createStore"])(function () {
    return initialState;
  }, redux__WEBPACK_IMPORTED_MODULE_1__["applyMiddleware"].apply(void 0, _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(middlewares)));

  var buildReducer = function buildReducer(store) {
    return function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : store.getState();
      var action = arguments.length > 1 ? arguments[1] : undefined;
      var reducers = store._reducers[action.type];

      if (reducers) {
        var nextState = immer__WEBPACK_IMPORTED_MODULE_3___default()(state, function (draftState) {
          Object.keys(reducers).forEach(function (k) {
            var payload = action.payload === undefined ? {} : action.payload;
            reducers[k].func.call(reducers[k].bind, draftState, payload, reducers[k].context);
          });
        });
        return nextState;
      }

      return state;
    };
  };

  store._reducers = {};
  store._sagas = {};

  store.runSaga = function (namespace, saga) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "root";
    store._sagas["".concat(namespace, ".").concat(name)] = sagaMiddleware.run(saga);
  };

  store.cancelSaga = function (namespace) {
    var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "root";

    var task = store._sagas["".concat(namespace, ".").concat(name)];

    if (task) {
      task.cancel();
    }
  };

  store.injectReducers = function (bind, namespace, reducers, context) {
    Object.keys(reducers).forEach(function (actionType) {
      store._reducers[actionType] = store._reducers[actionType] || {};
      store._reducers[actionType]["".concat(namespace, ".").concat(actionType)] = {
        func: reducers[actionType],
        bind: bind,
        context: context
      };
    });
    store.replaceReducer(buildReducer(store));
  };

  store.removeReducers = function (namespace) {
    var reducers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Object.keys(reducers).forEach(function (actionType) {
      store._reducers[actionType] = store._reducers[actionType] || {};
      delete store._reducers[actionType]["".concat(namespace, ".").concat(actionType)];
    });
    store.replaceReducer(buildReducer(store));
  };

  return store;
};
var useReduxSelector = function useReduxSelector(selector, defaultValue) {
  var selectorFunction = Object(react__WEBPACK_IMPORTED_MODULE_6__["useCallback"])(function () {
    return typeof selector === "string" ? function (state) {
      return Object(_utils_object__WEBPACK_IMPORTED_MODULE_4__["get"])(state, selector);
    } : selector;
  }, [selector]);
  var value = Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["useSelector"])(selectorFunction());
  return value === undefined ? defaultValue : value;
};
//# sourceMappingURL=store.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/app.js":
/*!***********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/app.js ***!
  \***********************************************************************************/
/*! exports provided: formatSettings, DefaultLoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatSettings", function() { return formatSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultLoadingComponent", function() { return DefaultLoadingComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings */ "../../packages/core/dist/esm/lib/settings.js");



var formatSettings = function formatSettings(settings) {
  var result = settings;

  if (Array.isArray(settings)) {
    result = Object.assign({}, settings[0]);

    for (var i = 1; i < settings.length; i++) {
      result = Object(_object__WEBPACK_IMPORTED_MODULE_1__["simpleMergeDeep"])(result, settings[i]);
    }
  }

  return Object(_object__WEBPACK_IMPORTED_MODULE_1__["simpleMergeDeep"])(_settings__WEBPACK_IMPORTED_MODULE_2__["defaultSettings"], result);
};
var DefaultLoadingComponent = function DefaultLoadingComponent() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "LOADING ...");
};
//# sourceMappingURL=app.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/auth.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/auth.js ***!
  \************************************************************************************/
/*! exports provided: oauth2Keys, generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getIdp, getIdpName, parseJwt, validateToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "oauth2Keys", function() { return oauth2Keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCodeChallenge", function() { return generateCodeChallenge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateCodeVerifier", function() { return generateCodeVerifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateNonce", function() { return generateNonce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateState", function() { return generateState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdp", function() { return getIdp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdpName", function() { return getIdpName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseJwt", function() { return parseJwt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateToken", function() { return validateToken; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../xhr */ "../../packages/core/dist/esm/lib/xhr.js");
/* harmony import */ var _crypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crypt */ "../../packages/core/dist/esm/lib/utils/crypt.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string */ "../../packages/core/dist/esm/lib/utils/string.js");
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../settings */ "../../packages/core/dist/esm/lib/settings.js");







var oauth2Keys = ["access_token", "id_token", "refresh_token", "expires_in", "expires_at", "token_type"];
function generateCodeChallenge(_x) {
  return _generateCodeChallenge.apply(this, arguments);
}

function _generateCodeChallenge() {
  _generateCodeChallenge = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(codeVerifier) {
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = _string__WEBPACK_IMPORTED_MODULE_4__["hex2b64"];
            _context.next = 3;
            return Object(_crypt__WEBPACK_IMPORTED_MODULE_3__["sha256"])(codeVerifier);

          case 3:
            _context.t1 = _context.sent;
            return _context.abrupt("return", (0, _context.t0)(_context.t1).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _generateCodeChallenge.apply(this, arguments);
}

function generateCodeVerifier() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  var length = Math.floor(Math.random() * (128 - 43 + 1)) + 43;
  return Object(_string__WEBPACK_IMPORTED_MODULE_4__["generateRandomString"])(length, characters);
}
function generateNonce() {
  var length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return Object(_string__WEBPACK_IMPORTED_MODULE_4__["generateRandomString"])(length);
}
function generateState() {
  var length = Math.floor(Math.random() * (32 - 16 + 1)) + 16;
  return Object(_string__WEBPACK_IMPORTED_MODULE_4__["generateRandomString"])(length);
}
function getIdp(settings, name) {
  var idps = settings.idp;
  name = name || "default";
  var idp = idps[name];

  if (!idp) {
    return null;
  }

  return Object.assign({
    name: name
  }, _settings__WEBPACK_IMPORTED_MODULE_6__["defaultIdpSettings"][idp.type], idp);
}
function getIdpName(state) {
  return Object(_object__WEBPACK_IMPORTED_MODULE_5__["get"])(state, "auth.idpName") || sessionStorage.getItem("onekijs.idpName") || localStorage.getItem("onekijs.idpName");
}
function parseJwt(token) {
  var section = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "payload";
  var index = section === "header" ? 0 : 1;
  var base64Url = token.split(".")[index];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(atob(base64).split("").map(function (c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
  return JSON.parse(jsonPayload);
}
function validateToken(_x2, _x3, _x4, _x5) {
  return _validateToken.apply(this, arguments);
}

function _validateToken() {
  _validateToken = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(token, jwksEndpoint, idp, context) {
    var pubKey, header, jwks, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pubKey = null;
            header = parseJwt(token, "header");

            if (!(typeof jwksEndpoint === "function")) {
              _context2.next = 8;
              break;
            }

            _context2.next = 5;
            return jwksEndpoint(token, idp, context);

          case 5:
            pubKey = _context2.sent;
            _context2.next = 12;
            break;

          case 8:
            _context2.next = 10;
            return Object(_xhr__WEBPACK_IMPORTED_MODULE_2__["asyncGet"])(jwksEndpoint);

          case 10:
            jwks = _context2.sent;
            pubKey = jwks.keys.find(function (key) {
              return key.kid === header.kid;
            });

          case 12:
            if (pubKey) {
              _context2.next = 14;
              break;
            }

            throw Error("Could not find a valid public key for token validation");

          case 14:
            _context2.next = 16;
            return Object(_crypt__WEBPACK_IMPORTED_MODULE_3__["verify"])(token, pubKey, header.alg || idp.jwksAlgorithm);

          case 16:
            result = _context2.sent;
            return _context2.abrupt("return", result);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _validateToken.apply(this, arguments);
}
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/browser.js":
/*!***************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/browser.js ***!
  \***************************************************************************************/
/*! exports provided: isMobile, isBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return isBrowser; });
function isMobile() {
  return navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i);
}
function isBrowser() {
  return typeof window !== 'undefined';
}
//# sourceMappingURL=browser.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/crypt.js":
/*!*************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/crypt.js ***!
  \*************************************************************************************/
/*! exports provided: encrypt, decrypt, sha256, verify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "encrypt", function() { return encrypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return decrypt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return sha256; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verify", function() { return verify; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rfc4648__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rfc4648 */ "rfc4648");
/* harmony import */ var rfc4648__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rfc4648__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./string */ "../../packages/core/dist/esm/lib/utils/string.js");
/* harmony import */ var text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! text-encoding-shim */ "text-encoding-shim");
/* harmony import */ var text_encoding_shim__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__);





 // https://medium.com/@fsjohnny/fun-times-with-webcrypto-part-2-encrypting-decrypting-dfb9fadba5bc

var hash = "SHA-256";
var salt = "salt@onekijs";
var iterations = 1000;
var keyLength = 48;
var password = null;

function getDerivation(_x, _x2, _x3, _x4, _x5) {
  return _getDerivation.apply(this, arguments);
}

function _getDerivation() {
  _getDerivation = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(hash, salt, password, iterations, keyLength) {
    var textEncoder, passwordBuffer, importedKey, saltBuffer, params, derivation;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            textEncoder = new text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__["TextEncoder"]("utf-8");
            passwordBuffer = textEncoder.encode(password);
            _context.next = 4;
            return crypto.subtle.importKey("raw", passwordBuffer, "PBKDF2", false, ["deriveBits"]);

          case 4:
            importedKey = _context.sent;
            saltBuffer = textEncoder.encode(salt);
            params = {
              name: "PBKDF2",
              hash: hash,
              salt: saltBuffer,
              iterations: iterations
            };
            _context.next = 9;
            return crypto.subtle.deriveBits(params, importedKey, keyLength * 8);

          case 9:
            derivation = _context.sent;
            return _context.abrupt("return", derivation);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getDerivation.apply(this, arguments);
}

function getKey(_x6) {
  return _getKey.apply(this, arguments);
}

function _getKey() {
  _getKey = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(derivation) {
    var keylen, derivedKey, iv, importedEncryptionKey;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            keylen = 32;
            derivedKey = derivation.slice(0, keylen);
            iv = derivation.slice(keylen);
            _context2.next = 5;
            return crypto.subtle.importKey("raw", derivedKey, {
              name: "AES-CBC"
            }, false, ["encrypt", "decrypt"]);

          case 5:
            importedEncryptionKey = _context2.sent;
            return _context2.abrupt("return", {
              key: importedEncryptionKey,
              iv: iv
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getKey.apply(this, arguments);
}

function encryptText(_x7, _x8) {
  return _encryptText.apply(this, arguments);
}

function _encryptText() {
  _encryptText = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(text, keyObject) {
    var textEncoder, textBuffer, encryptedText;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            textEncoder = new text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__["TextEncoder"]("utf-8");
            textBuffer = textEncoder.encode(text);
            _context3.next = 4;
            return crypto.subtle.encrypt({
              name: "AES-CBC",
              iv: keyObject.iv
            }, keyObject.key, textBuffer);

          case 4:
            encryptedText = _context3.sent;
            return _context3.abrupt("return", encryptedText);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _encryptText.apply(this, arguments);
}

function decryptText(_x9, _x10) {
  return _decryptText.apply(this, arguments);
}

function _decryptText() {
  _decryptText = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(encryptedText, keyObject) {
    var textDecoder, decryptedText;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            textDecoder = new text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__["TextDecoder"]("utf-8");
            _context4.next = 3;
            return crypto.subtle.decrypt({
              name: "AES-CBC",
              iv: keyObject.iv
            }, keyObject.key, encryptedText);

          case 3:
            decryptedText = _context4.sent;
            return _context4.abrupt("return", textDecoder.decode(decryptedText));

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _decryptText.apply(this, arguments);
}

function encrypt(_x11, _x12) {
  return _encrypt.apply(this, arguments);
}

function _encrypt() {
  _encrypt = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(text, pwd) {
    var derivation, keyObject, encryptedObject, encryptedByteArray, encryptedString;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!Object(_object__WEBPACK_IMPORTED_MODULE_3__["isNull"])(text)) {
              _context5.next = 2;
              break;
            }

            return _context5.abrupt("return", null);

          case 2:
            if (!pwd) {
              pwd = password || localStorage.getItem("onekijs.crypter");
            }

            if (!pwd) {
              password = Object(_string__WEBPACK_IMPORTED_MODULE_4__["generateRandomString"])(32);
              localStorage.setItem("onekijs.crypter", password);
              pwd = password;
            }

            _context5.next = 6;
            return getDerivation(hash, salt, pwd, iterations, keyLength);

          case 6:
            derivation = _context5.sent;
            _context5.next = 9;
            return getKey(derivation);

          case 9:
            keyObject = _context5.sent;
            _context5.next = 12;
            return encryptText(JSON.stringify(text), keyObject);

          case 12:
            encryptedObject = _context5.sent;
            encryptedByteArray = Array.from(new Uint8Array(encryptedObject));
            encryptedString = encryptedByteArray.map(function (_byte) {
              return String.fromCharCode(_byte);
            }).join("");
            return _context5.abrupt("return", btoa(encryptedString));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _encrypt.apply(this, arguments);
}

function decrypt(_x13, _x14) {
  return _decrypt.apply(this, arguments);
} // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest

function _decrypt() {
  _decrypt = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(encryptedB64, pwd) {
    var encryptedString, encryptedByteArray, derivation, keyObject, decryptedText;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!Object(_object__WEBPACK_IMPORTED_MODULE_3__["isNull"])(encryptedB64)) {
              _context6.next = 2;
              break;
            }

            return _context6.abrupt("return", null);

          case 2:
            if (!pwd) {
              pwd = password || localStorage.getItem("onekijs.crypter");
            }

            encryptedString = atob(encryptedB64);
            encryptedByteArray = new Uint8Array(encryptedString.match(/[\s\S]/g).map(function (ch) {
              return ch.charCodeAt(0);
            }));
            _context6.next = 7;
            return getDerivation(hash, salt, pwd, iterations, keyLength);

          case 7:
            derivation = _context6.sent;
            _context6.next = 10;
            return getKey(derivation);

          case 10:
            keyObject = _context6.sent;
            _context6.next = 13;
            return decryptText(encryptedByteArray, keyObject);

          case 13:
            decryptedText = _context6.sent;
            return _context6.abrupt("return", JSON.parse(decryptedText));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _decrypt.apply(this, arguments);
}

function sha256(_x15) {
  return _sha.apply(this, arguments);
}

function _sha() {
  _sha = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(message) {
    var msgUint8, hashBuffer, hashArray, hashHex;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            msgUint8 = new text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__["TextEncoder"]().encode(message); // encode as (utf-8) Uint8Array

            _context7.next = 3;
            return window.crypto.subtle.digest("SHA-256", msgUint8);

          case 3:
            hashBuffer = _context7.sent;
            // hash the message
            hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array

            hashHex = hashArray.map(function (b) {
              return b.toString(16).padStart(2, "0");
            }).join(""); // convert bytes to hex string

            return _context7.abrupt("return", hashHex);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _sha.apply(this, arguments);
}

function verify(_x16, _x17, _x18) {
  return _verify.apply(this, arguments);
}

function _verify() {
  _verify = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(token, jwKey, alg) {
    var jwsSigningInput, jwsSignature, key;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.t0 = alg;
            _context8.next = _context8.t0 === "HS256" ? 4 : _context8.t0 === "HS384" ? 6 : _context8.t0 === "HS512" ? 8 : _context8.t0 === "RS384" ? 10 : _context8.t0 === "RS512" ? 12 : _context8.t0 === "PS256" ? 14 : _context8.t0 === "PS384" ? 16 : _context8.t0 === "PS512" ? 18 : _context8.t0 === "ES256" ? 20 : _context8.t0 === "ES384" ? 22 : _context8.t0 === "ES512" ? 24 : _context8.t0 === "A256CMAC" ? 26 : _context8.t0 === "A384CMAC" ? 28 : _context8.t0 === "A512CMAC" ? 30 : 32;
            break;

          case 4:
            alg = {
              name: "HMAC",
              hash: {
                name: "SHA-256"
              }
            };
            return _context8.abrupt("break", 34);

          case 6:
            alg = {
              name: "HMAC",
              hash: {
                name: "SHA-384"
              }
            };
            return _context8.abrupt("break", 34);

          case 8:
            alg = {
              name: "HMAC",
              hash: {
                name: "SHA-384"
              }
            };
            return _context8.abrupt("break", 34);

          case 10:
            alg = {
              name: "RSASSA-PKCS1-v1_5",
              hash: {
                name: "SHA-384"
              }
            };
            return _context8.abrupt("break", 34);

          case 12:
            alg = {
              name: "RSASSA-PKCS1-v1_5",
              hash: {
                name: "SHA-512"
              }
            };
            return _context8.abrupt("break", 34);

          case 14:
            alg = {
              name: "RSA-PSS",
              hash: {
                name: "SHA-256"
              }
            };
            return _context8.abrupt("break", 34);

          case 16:
            alg = {
              name: "RSA-PSS",
              hash: {
                name: "SHA-384"
              }
            };
            return _context8.abrupt("break", 34);

          case 18:
            alg = {
              name: "RSA-PSS",
              hash: {
                name: "SHA-512"
              }
            };
            return _context8.abrupt("break", 34);

          case 20:
            alg = {
              name: "ECDSA",
              hash: {
                name: "SHA-256"
              },
              namedCurve: "P-256"
            };
            return _context8.abrupt("break", 34);

          case 22:
            alg = {
              name: "ECDSA",
              hash: {
                name: "SHA-384"
              },
              namedCurve: "P-384"
            };
            return _context8.abrupt("break", 34);

          case 24:
            alg = {
              name: "ECDSA",
              hash: {
                name: "SHA-512"
              },
              namedCurve: "P-512"
            };
            return _context8.abrupt("break", 34);

          case 26:
            alg = {
              name: "AES-CMAC",
              length: 256
            };
            return _context8.abrupt("break", 34);

          case 28:
            alg = {
              name: "AES-CMAC",
              length: 384
            };
            return _context8.abrupt("break", 34);

          case 30:
            alg = {
              name: "AES-CMAC",
              length: 512
            };
            return _context8.abrupt("break", 34);

          case 32:
            alg = {
              name: "RSASSA-PKCS1-v1_5",
              hash: {
                name: "SHA-256"
              }
            };
            return _context8.abrupt("break", 34);

          case 34:
            jwsSigningInput = token.split(".").slice(0, 2).join(".");
            jwsSignature = token.split(".")[2];
            _context8.next = 38;
            return window.crypto.subtle.importKey("jwk", jwKey, alg, false, ["verify"]);

          case 38:
            key = _context8.sent;
            _context8.next = 41;
            return window.crypto.subtle.verify(alg, key, rfc4648__WEBPACK_IMPORTED_MODULE_2__["base64url"].parse(jwsSignature, {
              loose: true
            }), new text_encoding_shim__WEBPACK_IMPORTED_MODULE_5__["TextEncoder"]().encode(jwsSigningInput));

          case 41:
            return _context8.abrupt("return", _context8.sent);

          case 44:
            _context8.prev = 44;
            _context8.t1 = _context8["catch"](0);
            throw _context8.t1;

          case 47:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 44]]);
  }));
  return _verify.apply(this, arguments);
}
//# sourceMappingURL=crypt.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/form.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/form.js ***!
  \************************************************************************************/
/*! exports provided: extractValidators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractValidators", function() { return extractValidators; });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "../../node_modules/@babel/runtime/helpers/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validation */ "../../packages/core/dist/esm/lib/validation.js");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./type */ "../../packages/core/dist/esm/lib/utils/type.js");


 // extract validators from props

var extractValidators = function extractValidators(props) {
  var validators = [];

  var requiredValidator = props.required,
      requiredMessage = props.requiredMessage,
      regexValidator = props.regex,
      regexMessage = props.regexMessage,
      extraValidators = props.validators,
      extraProps = _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0___default()(props, ["required", "requiredMessage", "regex", "regexMessage", "validators"]);

  if (requiredValidator && !Object(_type__WEBPACK_IMPORTED_MODULE_2__["isFalse"])(requiredValidator)) {
    validators.push(Object(_validation__WEBPACK_IMPORTED_MODULE_1__["required"])(requiredMessage));
  }

  if (regexValidator) {
    validators.push(Object(_validation__WEBPACK_IMPORTED_MODULE_1__["regex"])(regexValidator, regexMessage));
  }

  if (extraValidators) {
    validators = validators.concat(extraValidators);
  }

  return [validators, extraProps];
};
//# sourceMappingURL=form.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/i18n.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/i18n.js ***!
  \************************************************************************************/
/*! exports provided: detectLocale, toI18nLocation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectLocale", function() { return detectLocale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toI18nLocation", function() { return toI18nLocation; });
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./browser */ "../../packages/core/dist/esm/lib/utils/browser.js");
/* harmony import */ var _url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./url */ "../../packages/core/dist/esm/lib/utils/url.js");



function detectLocale(location, reduxLocale, settings, initialLocale) {
  var locale = initialLocale;

  if (!locale && location) {
    locale = settings.i18n.localeFromLocation(location, settings);
  }

  if (!locale) {
    locale = reduxLocale;
  }

  if (!locale && Object(_browser__WEBPACK_IMPORTED_MODULE_1__["isBrowser"])()) {
    locale = localStorage.getItem('onekijs.locale');

    if (!locale) {
      var languages = navigator.languages;

      if (languages && languages.length > 0) {
        locale = languages.find(function (language) {
          return settings.i18n.locales.includes(language.slice(0, 2));
        });
        if (locale) return locale.slice(0, 2);
      } else if (navigator.language) locale = navigator.language.slice(0, 2);else if (navigator.userLanguage) locale = navigator.userLanguage.slice(0, 2);
    }
  }

  if (locale && settings.i18n.locales.includes(locale)) {
    return locale;
  }

  return Object(_object__WEBPACK_IMPORTED_MODULE_0__["get"])(settings, 'i18n.defaultLocale');
}
var toI18nLocation = function toI18nLocation(urlOrLocation, _ref, route) {
  var i18n = _ref.i18n,
      settings = _ref.settings;
  var location = urlOrLocation;

  if (typeof urlOrLocation === "string") {
    location = Object(_url__WEBPACK_IMPORTED_MODULE_2__["toLocation"])(urlOrLocation);
    location.route = route;
  }

  if (settings && i18n.locale) {
    location = settings.i18n.addLocaleToLocation(i18n.locale, location, settings);
  }

  return location;
};
//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/object.js":
/*!**************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/object.js ***!
  \**************************************************************************************/
/*! exports provided: isNull, isNullOrEmpty, or, deepFreeze, isObject, simpleMergeDeep, del, find, get, append, set, update, shallowEqual, useShallowEqual */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return isNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNullOrEmpty", function() { return isNullOrEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "or", function() { return or; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepFreeze", function() { return deepFreeze; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleMergeDeep", function() { return simpleMergeDeep; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "del", function() { return del; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "update", function() { return update; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return shallowEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useShallowEqual", function() { return useShallowEqual; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "../../node_modules/@babel/runtime/helpers/typeof.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);




function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function isNull(value) {
  return value === undefined || value === null;
}
function isNullOrEmpty(value) {
  return value === undefined || value === null || value === "";
}
function or(value, defaultValue) {
  return isNull(value) ? defaultValue : value;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

function deepFreeze(object) {
  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object); // Freeze properties before freezing self

  var _iterator = _createForOfIteratorHelper(propNames),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var name = _step.value;
      var value = object[name];
      object[name] = value && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(value) === "object" ? deepFreeze(value) : value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return Object.freeze(object);
} // https://gist.github.com/Salakar/1d7137de9cb8b704e48a

function isObject(item) {
  return item && _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(item) === "object" && !Array.isArray(item) && item !== null;
} // https://gist.github.com/Salakar/1d7137de9cb8b704e48a

function simpleMergeDeep(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!target[key] || !isObject(target[key])) {
          target[key] = source[key];
        }

        simpleMergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, key, source[key]));
      }
    });
  }

  return target;
}
function del(content, property) {
  var _find = find(content, property),
      _find2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_find, 2),
      subContent = _find2[0],
      index = _find2[1];

  if (!isNull(subContent)) {
    if (Array.isArray(subContent)) {
      subContent.splice(index, 1);
    } else {
      delete subContent[index];
    }
  }

  return content;
}
function find(content, property) {
  var populate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (typeof property !== "string") {
    property = "".concat(property);
  }

  if (isNull(content)) {
    return [undefined, undefined];
  }

  if (property === "") {
    return [content, undefined];
  }

  var parts = property.split(".");

  for (var i = 0; i < parts.length - 1; i++) {
    var part = parts[i];

    var _index = !isNaN(part) ? parseInt(part) : part;

    try {
      if (!(_index in content)) {
        if (populate) {
          if (!isNaN(parts[i + 1])) {
            content[_index] = [];
          } else {
            content[_index] = {};
          }
        } else {
          return [undefined, undefined];
        }
      }
    } catch (e) {
      return [undefined, undefined];
    }

    content = content[_index];

    if (isNull(content)) {
      return [undefined, undefined];
    }
  }

  var index = !isNaN(parts[parts.length - 1]) ? parseInt(parts[parts.length - 1]) : parts[parts.length - 1];
  return [content, index];
}
function get(content, property, defaultValue) {
  if (isNull(property) || property === "") {
    return content;
  }

  var _find3 = find(content, property),
      _find4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_find3, 2),
      subContent = _find4[0],
      index = _find4[1];

  try {
    if (isNull(subContent) || !(index in subContent)) {
      return defaultValue;
    }

    return subContent[index];
  } catch (e) {
    return defaultValue;
  }
}
function append(content, property, value) {
  return update(content, property, function (arr) {
    if (isNull(arr)) {
      return [value];
    }

    if (!arr.includes(value)) {
      arr.push(value);
    }

    return arr;
  });
}
function set(content, property, value) {
  if (property === "") {
    return value;
  }

  var _find5 = find(content, property, true),
      _find6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_find5, 2),
      subContent = _find6[0],
      index = _find6[1];

  subContent[index] = value;
  return content;
}
function update(content, property, fn) {
  var _find7 = find(content, property, true),
      _find8 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_find7, 2),
      subContent = _find8[0],
      index = _find8[1];

  var value = fn(subContent[index]);
  subContent[index] = value;
  return content;
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    // eslint-disable-next-line no-self-compare
    return x !== x && y !== y;
  }
}
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */


function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(objA) !== "object" || objA === null || _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2___default()(objB) !== "object" || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  } // Test for A's keys different from B.


  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
var useShallowEqual = function useShallowEqual(obj) {
  var ref = Object(react__WEBPACK_IMPORTED_MODULE_3__["useRef"])(obj);

  if (shallowEqual(ref.current, obj)) {
    obj = ref.current;
  } else {
    ref.current = obj;
  }

  return obj;
};
//# sourceMappingURL=object.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/storage.js":
/*!***************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/storage.js ***!
  \***************************************************************************************/
/*! exports provided: getItem, onStorageChange, removeItem, setItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItem", function() { return getItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStorageChange", function() { return onStorageChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeItem", function() { return removeItem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setItem", function() { return setItem; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _crypt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crypt */ "../../packages/core/dist/esm/lib/utils/crypt.js");




/**
 * Add a browser cookie (created on the browser side)
 * 
 * @param {string} name : name of the cookie
 * @param {string} value : value of the cookie
 * @param {boolean} secure : encrypt the cookie (not usable by the server)
 * @param {integer} ttl : time to live of the cookie (in seconds)
 * @param {string} path : scope of the cookie
 */

function addCookie(_x, _x2) {
  return _addCookie.apply(this, arguments);
}
/**
 * Get a cookie by name. Decrypt it if necessary
 * check https://stackoverflow.com/questions/10730362/get-cookie-by-name
 * 
 * @param {string} name : name of the cookie
 * @param {boolean} secure : decrypt the cookie
 */


function _addCookie() {
  _addCookie = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(name, value) {
    var secure,
        ttl,
        path,
        cookie,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            secure = _args.length > 2 && _args[2] !== undefined ? _args[2] : true;
            ttl = _args.length > 3 && _args[3] !== undefined ? _args[3] : null;
            path = _args.length > 4 && _args[4] !== undefined ? _args[4] : "/";

            if (!secure) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return Object(_crypt__WEBPACK_IMPORTED_MODULE_3__["encrypt"])(value);

          case 6:
            value = _context.sent;

          case 7:
            cookie = "onekijs.".concat(name, "=").concat(value, ";path=").concat(path, ";SameSite=Strict;Secure;");

            if (ttl) {
              cookie += "expires=".concat(getCookieExpireTime(ttl), ";");
            }

            document.cookie = cookie;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addCookie.apply(this, arguments);
}

function getCookie(_x3) {
  return _getCookie.apply(this, arguments);
}
/**
 * convert a TTL (time to live) to an expire date
 * 
 * @param {int} ttl : time to live in seconds
 */


function _getCookie() {
  _getCookie = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(name) {
    var secure,
        escape,
        match,
        result,
        _args2 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            escape = function _escape(s) {
              return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, "\\$1");
            };

            secure = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
            name = "onekijs.".concat(name);
            match = document.cookie.match(RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)"));
            result = match ? match[1] : null;

            if (!secure) {
              _context2.next = 11;
              break;
            }

            _context2.next = 8;
            return Object(_crypt__WEBPACK_IMPORTED_MODULE_3__["decrypt"])(result);

          case 8:
            _context2.t0 = _context2.sent;
            _context2.next = 12;
            break;

          case 11:
            _context2.t0 = result;

          case 12:
            return _context2.abrupt("return", _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getCookie.apply(this, arguments);
}

var getCookieExpireTime = function getCookieExpireTime(ttl) {
  var date = new Date();
  var time = date.getTime();
  var expireTime = time + 1000 * parseInt(ttl);
  date.setTime(expireTime);
  return date.toGMTString();
};
/**
 * get a value of a key from the specified storage
 * if the storage is set to any, try all storage
 * 
 * @param {string} key : name of the key to get the value from
 * @param {string} storage : localStorage, sessionStorage, cookie, any (defaults to any)
 * @param {boolean} secure : decrypt the cookie (defaults to true)
 */


function getItem(_x4) {
  return _getItem.apply(this, arguments);
}
/**
 * Listen to a change in the localstorage
 * 
 * @param {string} key : key of the local storage entry
 * @param {function} listener : a function receiving the old value an the new value
 */

function _getItem() {
  _getItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(key) {
    var storage,
        secure,
        _args3 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            storage = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : 'any';
            secure = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : true;
            if (!storage) storage = 'any';

            if (!['localStorage', 'any'].includes(storage)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", localStorage.getItem(key));

          case 5:
            if (!['sessionStorage', 'any'].includes(storage)) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", sessionStorage.getItem(key));

          case 7:
            if (!['cookie', 'any'].includes(storage)) {
              _context3.next = 15;
              break;
            }

            if (Object(_object__WEBPACK_IMPORTED_MODULE_2__["isNull"])(sessionStorage.getItem(key))) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", sessionStorage.getItem(key));

          case 12:
            _context3.next = 14;
            return getCookie(key, secure);

          case 14:
            return _context3.abrupt("return", _context3.sent);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getItem.apply(this, arguments);
}

function onStorageChange(key, listener) {
  var wrapper = function wrapper(event) {
    if (!event) {
      event = window.event;
    } // ie


    if (event.key === key) {
      listener(event.newValue, event.oldValue);
    }
  };

  if (window.addEventListener) {
    window.addEventListener("storage", wrapper, false);
  } else {
    window.attachEvent("onstorage", wrapper);
  }
}
/**
 * Remove a browser cookie (created on the browser side)
 * 
 * @param {string} name : name of the cookie 
 * @param {string} path : scope of the cookie
 */

var removeCookie = function removeCookie(name) {
  var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
  document.cookie = "onekijs.".concat(name, "= ;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=").concat(path, ";");
};
/**
 * remove a key from the specified storage
 * if the storage is set to 'any', try all storage
 * 
 * @param {string} key : name of the key to get the value from
 * @param {string} storage : localStorage, sessionStorage, cookie, any (defaults to any) 
 */


function removeItem(key) {
  var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'any';
  if (!storage) storage = 'any';

  if (['localStorage', 'any'].includes(storage)) {
    localStorage.removeItem(key);
  }

  if (['sessionStorage', 'any'].includes(storage)) {
    sessionStorage.removeItem(key);
  }

  if (['cookie', 'any'].includes(storage)) {
    sessionStorage.removeItem(key);
    removeCookie(key);
  }
}
/**
 * Add a key/value in the specified storage
 * 
 * @param {*} key : key of the item
 * @param {*} value : value of the item
 * @param {*} storage : localStorage, sessionStorage or cookie
 * @param {*} secure : encrypt the value (only if cookie). Defaults to true
 * @param {*} ttl : time to live of the cookie (in seconds). If null, the cookie is removed when the browser is closed
 * @param {*} path : scope of the cookie. Defaults to /
 */

function setItem(_x5, _x6, _x7) {
  return _setItem.apply(this, arguments);
}

function _setItem() {
  _setItem = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(key, value, storage) {
    var secure,
        ttl,
        path,
        _args4 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            secure = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : true;
            ttl = _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
            path = _args4.length > 5 && _args4[5] !== undefined ? _args4[5] : "/";

            if (!(storage === "localStorage")) {
              _context4.next = 7;
              break;
            }

            localStorage.setItem(key, value);
            _context4.next = 14;
            break;

          case 7:
            if (!(storage === "sessionStorage")) {
              _context4.next = 11;
              break;
            }

            sessionStorage.setItem(key, value);
            _context4.next = 14;
            break;

          case 11:
            if (!(storage === "cookie")) {
              _context4.next = 14;
              break;
            }

            _context4.next = 14;
            return addCookie(key, value, secure, ttl, path);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setItem.apply(this, arguments);
}
//# sourceMappingURL=storage.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/string.js":
/*!**************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/string.js ***!
  \**************************************************************************************/
/*! exports provided: hex2b64, generateRandomString, trimStart, trimEnd, trim */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hex2b64", function() { return hex2b64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateRandomString", function() { return generateRandomString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimStart", function() { return trimStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trimEnd", function() { return trimEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trim", function() { return trim; });
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad = "="; // Copyright (c) 2010-2018 Kenji Urushima - jsrsasign

function hex2b64(h) {
  var i;
  var c;
  var ret = "";

  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }

  if (i + 1 === h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 === h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }

  while ((ret.length & 3) > 0) {
    ret += b64pad;
  }

  return ret;
}
function generateRandomString(length) {
  var characters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
  var result = [];
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }

  return result.join("");
}
function trimStart(string, charToRemove) {
  while (string.charAt(0) === charToRemove) {
    string = string.substring(1);
  }

  return string;
}
function trimEnd(string, charToRemove) {
  while (string.charAt(string.length - 1) === charToRemove) {
    string = string.substring(0, string.length - 1);
  }

  return string;
}
function trim(string, charToRemove) {
  string = trimStart(string, charToRemove);
  return trimEnd(string, charToRemove);
}
//# sourceMappingURL=string.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/type.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/type.js ***!
  \************************************************************************************/
/*! exports provided: isTrue, isFalse, isFunction, isPromise, isAsyncFunction, isFunctionOrPromise, isAsyncOrPromise */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTrue", function() { return isTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFalse", function() { return isFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPromise", function() { return isPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAsyncFunction", function() { return isAsyncFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunctionOrPromise", function() { return isFunctionOrPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAsyncOrPromise", function() { return isAsyncOrPromise; });
function isTrue(value) {
  return value === "true" || value === true;
}
function isFalse(value) {
  return value === "false" || value === false;
}
function isFunction(value) {
  return typeof value === "function";
}
function isPromise(value) {
  if (!value) return false;
  return typeof value.then == 'function';
}
function isAsyncFunction(value) {
  if (!value || !value.constructor) return false;
  return value.constructor.name === "AsyncFunction";
}
function isFunctionOrPromise(value) {
  return isFunction(value) || isPromise(value);
}
function isAsyncOrPromise(value) {
  return isAsyncFunction(value) || isPromise(value);
}
//# sourceMappingURL=type.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/utils/url.js":
/*!***********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/utils/url.js ***!
  \***********************************************************************************/
/*! exports provided: urlBuilder, isAbsoluteUrl, absoluteUrl, URL_STATE, toLocation, toUrl, toRelativeUrl, extractState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlBuilder", function() { return urlBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAbsoluteUrl", function() { return isAbsoluteUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "absoluteUrl", function() { return absoluteUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL_STATE", function() { return URL_STATE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toLocation", function() { return toLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toUrl", function() { return toUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toRelativeUrl", function() { return toRelativeUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractState", function() { return extractState; });
/* harmony import */ var _string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./string */ "../../packages/core/dist/esm/lib/utils/string.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! query-string */ "query-string");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object */ "../../packages/core/dist/esm/lib/utils/object.js");



function urlBuilder(path) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var esc = encodeURIComponent;
  Object.keys(params).sort(function (a, b) {
    return b.length - a.length;
  }).forEach(function (k) {
    path = path.replace(":".concat(k), params[k]);
  });
  var queryKeys = Object.keys(query);
  var separator = queryKeys.length > 0 ? "?" : "";
  query = queryKeys.map(function (k) {
    return esc(k) + "=" + esc(params[k]);
  }).join("&");
  return "".concat(path).concat(separator).concat(query);
}
function isAbsoluteUrl(url) {
  var pattern = new RegExp("^(?:[a-z]+:)?//", "i");
  return pattern.test(url);
}
function absoluteUrl(url, baseUrl) {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  if (!baseUrl) {
    baseUrl = "".concat(window.location.protocol, "//").concat(window.location.host);
  }

  return [Object(_string__WEBPACK_IMPORTED_MODULE_0__["trimEnd"])(baseUrl, "/"), Object(_string__WEBPACK_IMPORTED_MODULE_0__["trimStart"])(url, "/")].join("/");
}
var URL_STATE = '__STATE__'; // export function toLocation(url) {
//   const parser = document.createElement('a');
//   parser.href = url;
//   const location = {
//     protocol: parser.protocol ? parser.protocol.slice(0,-1) : null,
//     hostname: parser.hostname,
//     port: parser.port,
//     pathname: parser.pathname,
//     query: qs.parse(parser.search),
//     hash: qs.parse(parser.hash),
//     host: parser.host, 
//     href: parser.href,
//     relativeurl: `${parser.pathname}${parser.search}${parser.hash}`,
//     baseurl: `${parser.protocol}//${parser.host}`
//   }
//   if(location.query && location.query[URL_STATE]) {
//     location.state = JSON.parse(atob(location.query[URL_STATE]));
//     delete location.query[URL_STATE];
//   }
//   return location;
// }

function toLocation(url) {
  var base = typeof window !== 'undefined' ? window.origin : 'http://localhost';
  var parser = new URL(url, base);
  var location = {
    protocol: parser.protocol ? parser.protocol.slice(0, -1) : null,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    query: query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(parser.search),
    hash: query_string__WEBPACK_IMPORTED_MODULE_1___default.a.parse(parser.hash),
    host: parser.host,
    href: parser.href,
    relativeurl: "".concat(parser.pathname).concat(parser.search).concat(parser.hash),
    baseurl: "".concat(parser.protocol, "//").concat(parser.host)
  };

  if (location.query && location.query[URL_STATE]) {
    location.state = JSON.parse(atob(location.query[URL_STATE]));
    delete location.query[URL_STATE];
  }

  return location;
}
function toUrl(location) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!location) return null;
  if (typeof location === 'string') return location;
  var url = "";

  if (location.baseurl) {
    url += location.baseurl;
  } else if (location.protocol) {
    if (location.hostname) {
      url += "".concat(location.protocol, "://").concat(location.hostname);
      if (location.port) url += ":".concat(location.port);
    } else if (location.host) {
      url += "".concat(location.protocol, "://").concat(location.host);
    } else {
      throw new Error("URL protocol is defined but no host/hostname");
    }
  }

  url += toRelativeUrl(location, options);
  return url;
}
function toRelativeUrl(location) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  if (!location) return null;
  if (typeof location === 'string') return location;
  var url = "";

  if (location.pathname) {
    url += location.pathname;
  }

  var query = location.query || {};

  if (location.state) {
    query[URL_STATE] = atob(JSON.stringify(location.state));
  }

  if (query && Object.keys(query).length > 0 && options.query !== false) {
    url += "?".concat(query_string__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(location.query));
  }

  if (!Object(_object__WEBPACK_IMPORTED_MODULE_2__["isNull"])(location.hash) && Object.keys(location.hash).length > 0 && options.hash !== false) {
    url += "#".concat(query_string__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(location.hash));
  }

  return url;
}
function extractState(query) {
  if (!query || !query[URL_STATE]) return null;
  return atob(JSON.stringify(query[URL_STATE]));
}
//# sourceMappingURL=url.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/validation.js":
/*!************************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/validation.js ***!
  \************************************************************************************/
/*! exports provided: LOADING, ERROR, WARNING, OK, required, regex, email */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOADING", function() { return LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ERROR", function() { return ERROR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WARNING", function() { return WARNING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OK", function() { return OK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "required", function() { return required; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return regex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "email", function() { return email; });
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");
/* harmony import */ var _utils_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/type */ "../../packages/core/dist/esm/lib/utils/type.js");


var LOADING = 0;
var ERROR = 1;
var WARNING = 2;
var OK = 3;
var required = function required(message) {
  return function (value) {
    var valid;

    if (message === false) {
      valid = true;
    } else if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_0__["isNull"])(value)) {
      valid = false;
    } else if (Array.isArray(value)) {
      valid = value.length > 0;
    } else if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_0__["isObject"])(value)) {
      valid = Object.keys(value).length > 0;
    } else if (typeof value === 'string') {
      valid = value.trim().length > 0;
    } else {
      valid = value !== '';
    }

    if (!message || Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isTrue"])(message) || Object(_utils_type__WEBPACK_IMPORTED_MODULE_1__["isFalse"])(message)) {
      message = 'This field is required';
    }

    return {
      valid: valid,
      message: message
    };
  };
};
var regex = function regex(_regex, message) {
  return function (value) {
    if (typeof _regex === 'string') {
      _regex = new RegExp(_regex);
    }

    if (!message) {
      message = "Invalid value. Should match the regular expression ".concat(_regex);
    }

    return {
      valid: _regex.test(value),
      message: message
    };
  };
};
var email = function email(message) {
  // eslint-disable-next-line
  return regex(new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i'), message);
};
//# sourceMappingURL=validation.js.map

/***/ }),

/***/ "../../packages/core/dist/esm/lib/xhr.js":
/*!*****************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/core/dist/esm/lib/xhr.js ***!
  \*****************************************************************************/
/*! exports provided: xhr, formatAsyncResponse, asyncHttp, asyncGet, asyncDelete, asyncPost, asyncPut, asyncPatch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "xhr", function() { return xhr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatAsyncResponse", function() { return formatAsyncResponse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncHttp", function() { return asyncHttp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncGet", function() { return asyncGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncDelete", function() { return asyncDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncPost", function() { return asyncPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncPut", function() { return asyncPut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncPatch", function() { return asyncPatch; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./error */ "../../packages/core/dist/esm/lib/error.js");
/* harmony import */ var _utils_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/url */ "../../packages/core/dist/esm/lib/utils/url.js");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_object__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/object */ "../../packages/core/dist/esm/lib/utils/object.js");







var encodeFormData = function encodeFormData(data) {
  return Object.keys(data).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
  }).join("&");
};

function xhr(_x, _x2) {
  return _xhr.apply(this, arguments);
}

function _xhr() {
  _xhr = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(url, method) {
    var body,
        options,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = _args.length > 2 && _args[2] !== undefined ? _args[2] : null;
            options = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            url = Object(_utils_url__WEBPACK_IMPORTED_MODULE_3__["urlBuilder"])(url, options.params || {}, options.query || {});
            options = immer__WEBPACK_IMPORTED_MODULE_4___default()(options, function (o) {
              o.headers = o.headers || {};
              o.headers["Accept"] = o.headers["Accept"] || "application/json";
              o.method = method;

              if (["POST", "PUT", "PATCH"].includes(method)) {
                o.headers["Content-Type"] = o.headers["Content-Type"] || "application/json";

                if (body) {
                  if (o.headers["Content-Type"] === "application/json") {
                    o.body = JSON.stringify(body);
                  } else if (o.headers["Content-Type"] === "application/x-www-form-urlencoded") {
                    o.body = encodeFormData(body);
                  } else {
                    throw Error("Unsupported content-type ".concat(o.headers["Content-Type"]));
                  }
                }
              }

              if (o.auth) {
                if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_5__["get"])(o, "auth.token.access_token")) {
                  o.headers.Authorization = "Bearer ".concat(o.auth.token.access_token);
                } else if (Object(_utils_object__WEBPACK_IMPORTED_MODULE_5__["get"])(o, "auth.token")) {
                  o.headers.Authorization = "Bearer ".concat(o.auth.token);
                } else if (o.auth.basic) {
                  o.headers.Authorization = "Basic ".concat(btoa(o.auth.basic.user + ":" + o.auth.basic.password));
                }
              } // sanitize options


              var validOptions = ["method", "headers", "body", "mode", "credentials", "cache", "redirect", "referrer", "referrerPolicy", "integrity", "keepalive", "signal"];
              Object.keys(o).forEach(function (k) {
                if (!validOptions.includes(k)) {
                  delete o[k];
                }
              });
            });
            _context.next = 6;
            return fetch(url, options);

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _xhr.apply(this, arguments);
}

function formatAsyncResponse(_x3) {
  return _formatAsyncResponse.apply(this, arguments);
}

function _formatAsyncResponse() {
  _formatAsyncResponse = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(response) {
    var clone, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            clone = response.clone();

            if (!response.ok) {
              _context2.next = 11;
              break;
            }

            _context2.prev = 2;
            _context2.next = 5;
            return response.json();

          case 5:
            return _context2.abrupt("return", _context2.sent);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", clone.text());

          case 11:
            _context2.prev = 11;
            _context2.next = 14;
            return response.json();

          case 14:
            result = _context2.sent;
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t1 = _context2["catch"](11);
            throw new _error__WEBPACK_IMPORTED_MODULE_2__["default"](response.status, null, _context2.t1);

          case 20:
            throw new _error__WEBPACK_IMPORTED_MODULE_2__["default"](response.status, result.message, result);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8], [11, 17]]);
  }));
  return _formatAsyncResponse.apply(this, arguments);
}

function asyncHttp(_x4, _x5) {
  return _asyncHttp.apply(this, arguments);
}

function _asyncHttp() {
  _asyncHttp = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(url, method) {
    var body,
        options,
        _args3 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
            options = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
            _context3.t0 = formatAsyncResponse;
            _context3.next = 5;
            return xhr(url, method, body, options);

          case 5:
            _context3.t1 = _context3.sent;
            return _context3.abrupt("return", (0, _context3.t0)(_context3.t1));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _asyncHttp.apply(this, arguments);
}

function asyncGet(_x6) {
  return _asyncGet.apply(this, arguments);
}

function _asyncGet() {
  _asyncGet = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(url) {
    var options,
        _args4 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            _context4.next = 3;
            return asyncHttp(url, "GET", null, options);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _asyncGet.apply(this, arguments);
}

function asyncDelete(_x7) {
  return _asyncDelete.apply(this, arguments);
}

function _asyncDelete() {
  _asyncDelete = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(url) {
    var options,
        _args5 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
            _context5.next = 3;
            return asyncHttp(url, "DELETE", null, options);

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _asyncDelete.apply(this, arguments);
}

function asyncPost(_x8, _x9) {
  return _asyncPost.apply(this, arguments);
}

function _asyncPost() {
  _asyncPost = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(url, body) {
    var options,
        _args6 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            options = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            _context6.next = 3;
            return asyncHttp(url, "POST", body, options);

          case 3:
            return _context6.abrupt("return", _context6.sent);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _asyncPost.apply(this, arguments);
}

function asyncPut(_x10, _x11) {
  return _asyncPut.apply(this, arguments);
}

function _asyncPut() {
  _asyncPut = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(url, body) {
    var options,
        _args7 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
            _context7.next = 3;
            return asyncHttp(url, "PUT", body, options);

          case 3:
            return _context7.abrupt("return", _context7.sent);

          case 4:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _asyncPut.apply(this, arguments);
}

function asyncPatch(_x12, _x13) {
  return _asyncPatch.apply(this, arguments);
}

function _asyncPatch() {
  _asyncPatch = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(url, body) {
    var options,
        _args8 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            options = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
            _context8.next = 3;
            return asyncHttp(url, "PATCH", body, options);

          case 3:
            return _context8.abrupt("return", _context8.sent);

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _asyncPatch.apply(this, arguments);
}
//# sourceMappingURL=xhr.js.map

/***/ }),

/***/ "../../packages/next/dist/esm/index.js":
/*!***************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/next/dist/esm/index.js ***!
  \***************************************************************************/
/*! exports provided: asyncDelete, asyncGet, asyncHttp, asyncPatch, asyncPost, asyncPut, xhr, SimpleError, HTTPError, notificationService, useNotificationService, useNotifications, append, del, find, get, isNull, isNullOrEmpty, set, shallowEqual, useShallowEqual, update, generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getIdp, parseJwt, validateToken, generateRandomString, encrypt, decrypt, sha256, verify, urlBuilder, isAbsoluteUrl, absoluteUrl, toUrl, toRelativeUrl, toLocation, crudService, useDelete, useGet, usePatch, usePost, usePostPutPatch, usePut, useSecureDelete, useSecureGet, useSecurePatch, useSecurePost, useSecurePostPutPatch, useSecurePut, every, latest, leading, debounce, throttle, secure, SecureRoute, useLocalService, createReduxService, useReduxService, useGlobalService, useGenericReducer, genericService, useReduxSelector, createReduxStore, loginService, useLoginService, useLoginCallbackService, useLoginError, logoutService, useLogoutService, useLogoutCallbackService, useLogoutError, authService, useAuthService, useSecurityContext, useOnekiRouter, useLocation, useHistory, useParams, useSetting, useSettings, AppContext, layout, withLayout, useI18nService, i18nService, useTranslation, useLocale, useI18n, I18nLink, useGlobalState, useGlobalProp, useLocalState, useGlobalStateModifier, formService, useForm, FormContext, useFormContext, useField, Input, required, regex, email, extractValidators, BaseRouter, App, NextRouter, get404StaticProps, getI18nStaticProps, getI18nTranslations, withI18nPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var onekijs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! onekijs-core */ "../../packages/core/dist/esm/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncDelete", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncGet", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncHttp", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncHttp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPatch", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPost", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncPost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "asyncPut", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["asyncPut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "xhr", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["xhr"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleError", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["SimpleError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HTTPError", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["HTTPError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "notificationService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["notificationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useNotificationService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useNotificationService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useNotifications", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useNotifications"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "append", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["append"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "del", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["del"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "find", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["find"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["get"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNull", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["isNull"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isNullOrEmpty", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["isNullOrEmpty"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "set", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["set"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shallowEqual", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["shallowEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useShallowEqual", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useShallowEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "update", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["update"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateCodeChallenge", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["generateCodeChallenge"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateCodeVerifier", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["generateCodeVerifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateNonce", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["generateNonce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateState", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["generateState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getIdp", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["getIdp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseJwt", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["parseJwt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "validateToken", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["validateToken"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "generateRandomString", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["generateRandomString"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "encrypt", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["encrypt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "decrypt", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["decrypt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sha256", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["sha256"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "verify", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["verify"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "urlBuilder", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["urlBuilder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAbsoluteUrl", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["isAbsoluteUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "absoluteUrl", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["absoluteUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toUrl", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["toUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRelativeUrl", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["toRelativeUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toLocation", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["toLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "crudService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["crudService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDelete", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGet", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePatch", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["usePatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePost", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["usePost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePostPutPatch", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["usePostPutPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "usePut", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["usePut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecureDelete", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecureDelete"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecureGet", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecureGet"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePatch", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecurePatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePost", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecurePost"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePostPutPatch", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecurePostPutPatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurePut", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecurePut"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "every", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["every"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "latest", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["latest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "leading", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["leading"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["debounce"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["throttle"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "secure", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["secure"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SecureRoute", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["SecureRoute"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocalService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLocalService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["createReduxService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReduxService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useReduxService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGlobalService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGenericReducer", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGenericReducer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "genericService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["genericService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useReduxSelector", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useReduxSelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxStore", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["createReduxStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loginService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["loginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLoginService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginCallbackService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLoginCallbackService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLoginError", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLoginError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "logoutService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["logoutService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLogoutService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutCallbackService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLogoutCallbackService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLogoutError", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLogoutError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "authService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["authService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useAuthService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useAuthService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSecurityContext", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSecurityContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useOnekiRouter", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useOnekiRouter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLocation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useHistory", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useHistory"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useParams"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSetting", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSetting"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSettings", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useSettings"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AppContext", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["AppContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "layout", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["layout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withLayout", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["withLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useI18nService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useI18nService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "i18nService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["i18nService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useTranslation", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useTranslation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocale", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLocale"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useI18n", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useI18n"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "I18nLink", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["I18nLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalState", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGlobalState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalProp", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGlobalProp"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useLocalState", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useLocalState"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useGlobalStateModifier", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useGlobalStateModifier"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "formService", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["formService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useForm", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useForm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormContext", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["FormContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useFormContext", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useFormContext"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useField", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["useField"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["Input"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "required", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["required"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "regex", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["regex"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "email", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["email"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extractValidators", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["extractValidators"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseRouter", function() { return onekijs_core__WEBPACK_IMPORTED_MODULE_0__["BaseRouter"]; });

/* harmony import */ var _lib_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/app */ "../../packages/next/dist/esm/lib/app.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "App", function() { return _lib_app__WEBPACK_IMPORTED_MODULE_1__["App"]; });

/* harmony import */ var _lib_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/router */ "../../packages/next/dist/esm/lib/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NextRouter", function() { return _lib_router__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _lib_404__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/404 */ "../../packages/next/dist/esm/lib/404.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "get404StaticProps", function() { return _lib_404__WEBPACK_IMPORTED_MODULE_3__["get404StaticProps"]; });

/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/i18n */ "../../packages/next/dist/esm/lib/i18n.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getI18nStaticProps", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_4__["getI18nStaticProps"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getI18nTranslations", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_4__["getI18nTranslations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withI18nPaths", function() { return _lib_i18n__WEBPACK_IMPORTED_MODULE_4__["withI18nPaths"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../packages/next/dist/esm/lib/404.js":
/*!*****************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/next/dist/esm/lib/404.js ***!
  \*****************************************************************************/
/*! exports provided: getAllFiles, get404StaticProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllFiles", function() { return getAllFiles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get404StaticProps", function() { return get404StaticProps; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "../../node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function getAllFiles(_x, _x2, _x3, _x4) {
  return _getAllFiles.apply(this, arguments);
}

function _getAllFiles() {
  _getAllFiles = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(fs, path, basePath, relativePath) {
    var arrayOfFiles,
        dirPath,
        files,
        _iterator,
        _step,
        file,
        data,
        _args = arguments;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            arrayOfFiles = _args.length > 4 && _args[4] !== undefined ? _args[4] : [];
            dirPath = path.join(basePath, relativePath);
            files = fs.readdirSync(dirPath);
            _iterator = _createForOfIteratorHelper(files);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                file = _step.value;

                if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                  arrayOfFiles = getAllFiles(fs, path, basePath, relativePath + "/" + file, arrayOfFiles);
                } else {
                  if (file !== '_app.js' && file !== '_document.js' && file !== '404.js' && file !== '_error.js') {
                    data = fs.readFileSync(dirPath + "/" + file, 'utf8');

                    if (!data.includes("getStaticProps")) {
                      file = file.slice(0, -3);

                      if (file === 'index') {
                        arrayOfFiles.push(relativePath);
                        arrayOfFiles.push(relativePath + "/");
                      } else {
                        arrayOfFiles.push(relativePath + "/" + file);
                      }
                    }
                  }
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            return _context.abrupt("return", arrayOfFiles);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAllFiles.apply(this, arguments);
}

function get404StaticProps(_x5, _x6) {
  return _get404StaticProps.apply(this, arguments);
}

function _get404StaticProps() {
  _get404StaticProps = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(fs, path) {
    var routes;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getAllFiles(fs, path, path.join(process.cwd(), '/src/pages'), '');

          case 2:
            routes = _context2.sent;
            return _context2.abrupt("return", {
              props: {
                routes: routes
              }
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _get404StaticProps.apply(this, arguments);
}
//# sourceMappingURL=404.js.map

/***/ }),

/***/ "../../packages/next/dist/esm/lib/app.js":
/*!*****************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/next/dist/esm/lib/app.js ***!
  \*****************************************************************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "../../node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_next_server_lib_router_utils_route_matcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/next-server/lib/router/utils/route-matcher */ "next/dist/next-server/lib/router/utils/route-matcher");
/* harmony import */ var next_dist_next_server_lib_router_utils_route_matcher__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_lib_router_utils_route_matcher__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_dist_next_server_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/next-server/lib/router/utils/route-regex */ "next/dist/next-server/lib/router/utils/route-regex");
/* harmony import */ var next_dist_next_server_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_next_server_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/error */ "../../node_modules/next/error.js");
/* harmony import */ var next_error__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_error__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var onekijs_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! onekijs-core */ "../../packages/core/dist/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./router */ "../../packages/next/dist/esm/lib/router.js");











var useNextRouter = next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"] || function () {
  return null;
};

var useRouterSync = function useRouterSync(onekiRouter) {
  var nextRouter = useNextRouter();

  if (typeof window !== "undefined") {
    onekiRouter.sync(nextRouter);
  }

  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    onekiRouter.onLocationChange();
  }, [nextRouter, onekiRouter]);
};

var init = false;
var App = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.memo(function (_ref) {
  var _ref$settings = _ref.settings,
      settings = _ref$settings === void 0 ? {} : _ref$settings,
      store = _ref.store,
      _ref$initialState = _ref.initialState,
      initialState = _ref$initialState === void 0 ? {} : _ref$initialState,
      _ref$services = _ref.services,
      services = _ref$services === void 0 ? [] : _ref$services,
      _ref$LoadingComponent = _ref.LoadingComponent,
      LoadingComponent = _ref$LoadingComponent === void 0 ? onekijs_core__WEBPACK_IMPORTED_MODULE_5__["DefaultLoadingComponent"] : _ref$LoadingComponent,
      Component = _ref.Component,
      pageProps = _ref.pageProps,
      nextRouter = _ref.router,
      initialLocale = _ref.initialLocale,
      translations = _ref.translations,
      i18nNs = _ref.i18nNs;
  var router = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    return new _router__WEBPACK_IMPORTED_MODULE_9__["default"]();
  }, []);
  useRouterSync(router);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])(Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(initialState) || Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(settings)),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])(Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(settings) ? null : settings),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState3, 2),
      appSettings = _useState4[0],
      setAppSettings = _useState4[1];

  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_7__["useState"])(Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(initialState) ? null : initialState),
      _useState6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState5, 2),
      appInitialState = _useState6[0],
      setAppInitialState = _useState6[1];

  var appStore = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    if (!loading) {
      return store ? store : Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["createReduxStore"])(appInitialState);
    }
  }, [loading, store, appInitialState]);
  var formattedSettings = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    return Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["formatSettings"])(appSettings);
  }, [appSettings]);
  router.settings = formattedSettings;
  var route = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    if (pageProps.routes && nextRouter.route === "/404") {
      return pageProps.routes.find(function (route) {
        var routeRegex = Object(next_dist_next_server_lib_router_utils_route_regex__WEBPACK_IMPORTED_MODULE_2__["getRouteRegex"])(route);
        return Object(next_dist_next_server_lib_router_utils_route_matcher__WEBPACK_IMPORTED_MODULE_1__["getRouteMatcher"])(routeRegex)(nextRouter.asPath);
      });
    }
  }, [pageProps.routes, nextRouter.route, nextRouter.asPath]);
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    if (!init) {
      init = true; // TODO call initialState and/or settings

      var promises = [{
        set: setAppSettings,
        promise: settings
      }, {
        set: setAppInitialState,
        promise: initialState
      }].filter(function (entry) {
        return Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["isPromise"])(entry.promise);
      });

      if (promises.length > 0) {
        Promise.all(promises.map(function (entry) {
          return entry.promise;
        })).then(function (values) {
          values.forEach(function (v, i) {
            return promises[i].set(v);
          });
          setLoading(false);
        });
      }
    }
  }, [settings, initialState]);
  Object(react__WEBPACK_IMPORTED_MODULE_7__["useEffect"])(function () {
    if (route) {
      next_router__WEBPACK_IMPORTED_MODULE_4___default.a.replace(route, Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["toRelativeUrl"])(router.location, {
        hash: false
      }), {
        shallow: true
      });
    }
  }, [router, route]);
  translations = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    var result = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["flattenTranslations"])(pageProps.translations || {});
    if (translations) Object.assign(result, Object(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["flattenTranslations"])(translations));
    return result;
  }, [pageProps.translations, translations]);
  i18nNs = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    var ns = Object.keys(pageProps.translations || {});
    if (i18nNs) ns.push(i18nNs);
    return ns;
  }, [pageProps.translations, i18nNs]);
  initialLocale = Object(react__WEBPACK_IMPORTED_MODULE_7__["useMemo"])(function () {
    if (pageProps.locale) return pageProps.locale;
    return initialLocale;
  }, [pageProps.locale, initialLocale]);

  if (loading) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(LoadingComponent, null);
  }

  if (nextRouter.route === "/404") {
    if (route || !router.location) return null;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(next_error__WEBPACK_IMPORTED_MODULE_3___default.a, {
      code: 404
    });
  }

  init = true;

  var getLayout = Component && Component.getLayout || function (page) {
    return page;
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_8__["Provider"], {
    store: appStore
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(onekijs_core__WEBPACK_IMPORTED_MODULE_5__["AppProvider"], {
    router: router,
    settings: formattedSettings,
    initialLocale: initialLocale,
    translations: translations,
    i18nNs: i18nNs,
    services: services
  }, getLayout( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(Component, pageProps))));
});
App.displayName = "App";
App.propTypes = {
  settings: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  store: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  initialState: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  services: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object),
  theme: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  LoadingComponent: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.elementType,
  history: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  children: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.element,
  initialLocale: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string,
  translations: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  i18nNs: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.string),
  Component: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.elementType,
  pageProps: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object,
  router: prop_types__WEBPACK_IMPORTED_MODULE_6___default.a.object
};
//# sourceMappingURL=app.js.map

/***/ }),

/***/ "../../packages/next/dist/esm/lib/i18n.js":
/*!******************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/next/dist/esm/lib/i18n.js ***!
  \******************************************************************************/
/*! exports provided: getI18nStaticProps, getI18nTranslations, withI18nPaths */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getI18nStaticProps", function() { return getI18nStaticProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getI18nTranslations", function() { return getI18nTranslations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withI18nPaths", function() { return withI18nPaths; });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "../../node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);

function getI18nStaticProps(fs, path, lang) {
  var namespaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  return {
    props: {
      translations: getI18nTranslations(fs, path, lang, namespaces),
      locale: lang
    }
  };
}
function getI18nTranslations(fs, path, lang) {
  var namespaces = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  if (!namespaces.includes("common")) namespaces.push("common"); // eslint-disable-next-line

  var localeDirectory = path.join(process.cwd(), "public/locales/".concat(lang));
  var translations = {};
  namespaces.forEach(function (ns) {
    var filePath = path.join(localeDirectory, "".concat(ns, ".json"));
    translations[ns] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });
  return translations;
}
function withI18nPaths(fs, path) {
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var attribute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "lang";
  // eslint-disable-next-line
  var localeDirectory = path.join(process.cwd(), 'public/locales');
  var files = fs.readdirSync(localeDirectory);
  var locales = [];
  files.forEach(function (file) {
    if (fs.statSync(localeDirectory + "/" + file).isDirectory()) {
      locales.push(file);
    }
  });

  if (paths.length === 0) {
    return locales.map(function (locale) {
      return {
        params: _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, attribute, locale)
      };
    });
  }

  var nextPaths = [];
  paths.forEach(function (p) {
    locales.forEach(function (locale) {
      nextPaths.push({
        params: Object.assign({}, p.params, {
          lang: locale
        })
      });
    });
  });
  return nextPaths;
}
//# sourceMappingURL=i18n.js.map

/***/ }),

/***/ "../../packages/next/dist/esm/lib/router.js":
/*!********************************************************************************!*\
  !*** /home/onurb/workspace/oneki/onekijs/packages/next/dist/esm/lib/router.js ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NextRouter; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "../../node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "../../node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "../../node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "../../node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "../../node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "../../node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ "../../node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var onekijs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! onekijs-core */ "../../packages/core/dist/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }







var NextRouter = /*#__PURE__*/function (_BaseRouter) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(NextRouter, _BaseRouter);

  var _super = _createSuper(NextRouter);

  function NextRouter() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, NextRouter);

    _this = _super.call(this);
    _this._listeners = [];
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(NextRouter, [{
    key: "deleteOrigin",
    value: function deleteOrigin() {
      localStorage.removeItem("onekijs.from");
      localStorage.removeItem("onekijs.from_route");
    }
  }, {
    key: "getOrigin",
    value: function getOrigin() {
      var from = localStorage.getItem("onekijs.from") || Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["get"])(this.settings, "routes.home", "/");
      var fromRoute = localStorage.getItem("onekijs.from_route") || Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["get"])(this.settings, "routes.home_route", from);
      return {
        from: from,
        fromRoute: fromRoute
      };
    }
    /**
     * url can be a string or an object.
     * If object, the format is the following
     * {
     *   url: string, // example: /users/1?test=1&test2#h=3&h2
     *   route: string, // example: /users/[id]
     *   pathname: string, // example: /users/1
     *   query: obj, // example: {test:1,test2:null}
     *   hash: obj // example: {h:3, h2:null}
     *   state: obj // example: {key1: 'value1'}
     * }
     */

  }, {
    key: "push",
    value: function push(urlOrLocation, route, options) {
      return this._goto("push", urlOrLocation, route, options);
    }
  }, {
    key: "replace",
    value: function replace(urlOrLocation, route, options) {
      return this._goto("replace", urlOrLocation, route, options);
    }
    /**
     * callback(url) where url is:
     * {
     *   url: string, // example: /users/1?test=1&test2#h=3&h2
     *   route: string, // example: /users/[id]
     *   pathname: string, // example: /users/1
     *   query: obj, // example: {test:1,test2:null}
     *   hash: obj // example: {h:3, h2:null}
     *   state: obj // example: {key1: 'value1'}
     * }
     */
    // listen(callback) {
    //   const handler = (url) => {
    //     callback(this._toLocation(url));
    //   };
    //   Router.events.on('routeChangeComplete', handler);
    //   Router.events.on('hashChangeComplete', handler);
    //   return handler;
    // }

  }, {
    key: "listen",
    value: function listen(callback) {
      this._listeners.push(callback);
    }
  }, {
    key: "onLocationChange",
    value: function onLocationChange() {
      var _this2 = this;

      this._listeners.forEach(function (listener) {
        listener(_this2.location);
      });
    }
  }, {
    key: "saveOrigin",
    value: function saveOrigin() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var currentValue = localStorage.getItem("onekijs.from");
      if (!force && currentValue) return;
      var from = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["get"])(this.settings, "routes.home", "/");
      var fromRoute = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["get"])(this.settings, "routes.home_route", from);
      var previous = this.previousLocation;

      if (previous) {
        from = previous.relativeurl;
        fromRoute = previous.route || from;
      }

      localStorage.setItem("onekijs.from", from);
      localStorage.setItem("onekijs.from_route", fromRoute);
    }
  }, {
    key: "sync",
    value: function sync(nextRouter) {
      var pathname = nextRouter.pathname;
      var asPath = nextRouter.asPath;

      if (!pathname.includes("[") || pathname !== asPath) {
        var location = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toLocation"])(asPath);
        location.route = next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router.route;
        location.params = next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router.query;

        this._pushLocation(location);
      }
    }
  }, {
    key: "unlisten",
    value: function unlisten(callback) {
      this._listeners.splice(this._listeners.indexOf(callback), 1);
    }
  }, {
    key: "i18nLink",
    value: function i18nLink(props, i18n, settings) {
      var href = props.href,
          as = props.as;
      var location;

      if (as) {
        location = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toI18nLocation"])(as, {
          i18n: i18n,
          settings: settings
        }, href);
      } else {
        location = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toI18nLocation"])(href, {
          i18n: i18n,
          settings: settings
        });
      }

      var i18nAs = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toRelativeUrl"])(location);
      var i18nHref = location.route || Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toRelativeUrl"])(location);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_10___default.a.createElement(next_link__WEBPACK_IMPORTED_MODULE_7___default.a, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, props, {
        as: i18nAs,
        href: i18nHref
      }));
    }
  }, {
    key: "_goto",
    value: function _goto(type, urlOrLocation, route, options) {
      if (!urlOrLocation) throw new Error("URL is undefined in router.push");
      var location = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toI18nLocation"])(urlOrLocation, {
        settings: this.settings,
        i18n: this.i18n
      }, route);
      var relativeUrl = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toRelativeUrl"])(location);

      if (location.route) {
        return next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router[type](location.route, relativeUrl, options);
      } else {
        return next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router[type](relativeUrl, relativeUrl, options);
      }
    }
  }, {
    key: "_toLocation",
    value: function _toLocation(url) {
      var location = Object(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["toLocation"])(url);
      location.route = next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router.route;
      location.params = next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router.query;
      return location;
    }
  }, {
    key: "_pushLocation",
    value: function _pushLocation(location) {
      this._location = location;
      this.history = immer__WEBPACK_IMPORTED_MODULE_6___default()(this.history, function (draft) {
        draft.unshift(location); // keep max 20 items

        draft.splice(20, draft.length);
      });
    }
  }, {
    key: "native",
    get: function get() {
      return next_router__WEBPACK_IMPORTED_MODULE_8___default.a.router;
    }
  }]);

  return NextRouter;
}(onekijs_core__WEBPACK_IMPORTED_MODULE_9__["BaseRouter"]);


//# sourceMappingURL=router.js.map

/***/ }),

/***/ "../next-server/lib/head":
/*!****************************************************!*\
  !*** external "next/dist/next-server/lib/head.js" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/head.js");

/***/ }),

/***/ "../next-server/lib/router-context":
/*!**************************************************************!*\
  !*** external "next/dist/next-server/lib/router-context.js" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router-context.js");

/***/ }),

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./src/pages/_app.js":
/*!***************************!*\
  !*** ./src/pages/_app.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var onekijs_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! onekijs-next */ "../../packages/next/dist/esm/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "/home/onurb/workspace/oneki/onekijs/examples/next-app-basic/src/pages/_app.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




const MyApp = props => {
  return __jsx(onekijs_next__WEBPACK_IMPORTED_MODULE_0__["App"], _extends({}, props, {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6,
      columnNumber: 5
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./src/pages/_app.js");


/***/ }),

/***/ "@redux-saga/core":
/*!***********************************!*\
  !*** external "@redux-saga/core" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@redux-saga/core");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "immer":
/*!************************!*\
  !*** external "immer" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("immer");

/***/ }),

/***/ "next/dist/next-server/lib/router/utils/route-matcher":
/*!***********************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/route-matcher" ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/route-matcher");

/***/ }),

/***/ "next/dist/next-server/lib/router/utils/route-regex":
/*!*********************************************************************!*\
  !*** external "next/dist/next-server/lib/router/utils/route-regex" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/router/utils/route-regex");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "prop-types-exact":
/*!***********************************!*\
  !*** external "prop-types-exact" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types-exact");

/***/ }),

/***/ "query-string":
/*!*******************************!*\
  !*** external "query-string" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("query-string");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/*!*************************************!*\
  !*** external "redux-saga/effects" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),

/***/ "rfc4648":
/*!**************************!*\
  !*** external "rfc4648" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rfc4648");

/***/ }),

/***/ "text-encoding-shim":
/*!*************************************!*\
  !*** external "text-encoding-shim" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("text-encoding-shim");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map