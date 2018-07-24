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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/asynchronous-fetch.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/asynchronous-fetch.ts":
/*!***********************************!*\
  !*** ./src/asynchronous-fetch.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var AsynchronousFetch;\r\n(function (AsynchronousFetch) {\r\n    function fetchUser(userId) {\r\n        return new Promise(function (resolve) {\r\n            fetch(\"https://jsonplaceholder.typicode.com/users/\" + userId).then(function (response) {\r\n                resolve(response.json());\r\n            });\r\n        });\r\n    }\r\n    function renderUserInfo(user) {\r\n        console.log(user);\r\n        document.getElementById('user').innerHTML = \"User: \" + user.name;\r\n    }\r\n    function renderTodos(todos) {\r\n        var output = '';\r\n        for (var _i = 0, todos_1 = todos; _i < todos_1.length; _i++) {\r\n            var todo = todos_1[_i];\r\n            output = output.concat(\"#\" + todo.id + \": \" + todo.title + \"\\r\\n\");\r\n        }\r\n        console.log(output);\r\n        document.getElementById('output').innerHTML = output;\r\n    }\r\n    function fetchTodos(user) {\r\n        return new Promise(function (resolve) {\r\n            fetch(\"https://jsonplaceholder.typicode.com/todos/?userId=\" + user.id).then(function (response) {\r\n                resolve(response.json());\r\n            });\r\n        });\r\n    }\r\n    function init() {\r\n        var userId = 5;\r\n        fetchUser(userId).then(function (user) {\r\n            renderUserInfo(user);\r\n            return user;\r\n        }).then(function (user) {\r\n            return fetchTodos(user);\r\n        }).then(function (todos) {\r\n            // (todos as any[]) just keeps the TypeScript compiler from throwing a fit\r\n            todos = todos.slice(0, 10);\r\n            renderTodos(todos);\r\n        });\r\n    }\r\n    AsynchronousFetch.init = init;\r\n})(AsynchronousFetch || (AsynchronousFetch = {}));\r\nAsynchronousFetch.init();\r\n\n\n//# sourceURL=webpack:///./src/asynchronous-fetch.ts?");

/***/ })

/******/ });