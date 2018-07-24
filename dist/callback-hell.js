/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/callback-hell.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/callback-hell.ts":
/*!******************************!*\
  !*** ./src/callback-hell.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var CallbackHell;\r\n(function (CallbackHell) {\r\n    function getUser(userId, callback) {\r\n        var xhr = new XMLHttpRequest();\r\n        xhr.responseType = 'json';\r\n        xhr.open('GET', \"https://jsonplaceholder.typicode.com/users/\" + userId);\r\n        xhr.onreadystatechange = function () {\r\n            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {\r\n                var user_1 = xhr.response;\r\n                // When we're finished, execute the callback function\r\n                callback(user_1);\r\n            }\r\n        };\r\n        xhr.send();\r\n    }\r\n    function renderUserInfo(user) {\r\n        console.log(user);\r\n        document.getElementById('user').innerHTML = \"User: \" + user.name;\r\n    }\r\n    function getTodos(user, callback) {\r\n        // Make an XHR request\r\n        // The userId parameter doesn't do anything in this request, but let's pretend it does\r\n        var xhr = new XMLHttpRequest();\r\n        xhr.responseType = 'json';\r\n        xhr.open('GET', \"https://jsonplaceholder.typicode.com/todos/?userId=\" + user.id);\r\n        xhr.onreadystatechange = function () {\r\n            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {\r\n                var todos_1 = xhr.response.slice(0, 10);\r\n                // When we're finished, execute the callback function\r\n                callback(todos_1);\r\n            }\r\n        };\r\n        xhr.send();\r\n    }\r\n    function renderTodos(todos) {\r\n        var output = '';\r\n        for (var _i = 0, todos_2 = todos; _i < todos_2.length; _i++) {\r\n            var todo = todos_2[_i];\r\n            output = output.concat(\"#\" + todo.id + \": \" + todo.title + \"\\r\\n\");\r\n        }\r\n        console.log(output);\r\n        document.getElementById('output').innerHTML = output;\r\n    }\r\n    function init() {\r\n        var userId = 5;\r\n        getUser(userId, function (user) {\r\n            renderUserInfo(user);\r\n            getTodos(user, function (todos) {\r\n                renderTodos(todos);\r\n            });\r\n        });\r\n    }\r\n    CallbackHell.init = init;\r\n})(CallbackHell || (CallbackHell = {}));\r\nCallbackHell.init();\r\n\n\n//# sourceURL=webpack:///./src/callback-hell.ts?");

/***/ })

/******/ });