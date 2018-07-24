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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/combining-promises.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/combining-promises.ts":
/*!***********************************!*\
  !*** ./src/combining-promises.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var CombiningPromises;\r\n(function (CombiningPromises) {\r\n    function fetchImages() {\r\n        return new Promise(function (resolve) {\r\n            fetch('https://jsonplaceholder.typicode.com/photos/').then(function (response) {\r\n                resolve(response.json());\r\n            });\r\n        });\r\n    }\r\n    function preloadImages(images) {\r\n        var promises = [];\r\n        var startTime = new Date().getTime();\r\n        document.getElementById('start').hidden = false;\r\n        images = images.slice(0, 200);\r\n        var _loop_1 = function (nextImage) {\r\n            var promise = new Promise(function (resolve) {\r\n                var tmpImg = new Image();\r\n                tmpImg.addEventListener('load', function () {\r\n                    resolve();\r\n                });\r\n                tmpImg.src = nextImage.thumbnailUrl;\r\n            });\r\n            promises.push(promise);\r\n        };\r\n        for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {\r\n            var nextImage = images_1[_i];\r\n            _loop_1(nextImage);\r\n        }\r\n        Promise.all(promises).then(function () {\r\n            document.getElementById('start').hidden = true;\r\n            document.getElementById('finish').hidden = false;\r\n            var endTime = new Date().getTime();\r\n            var elapsedTime = endTime - startTime;\r\n            document.getElementById('info').innerHTML = \"Preload took \" + elapsedTime + \" ms.\";\r\n        });\r\n    }\r\n    document.getElementById('start').hidden = true;\r\n    document.getElementById('finish').hidden = true;\r\n    fetchImages().then(function (images) { preloadImages(images); });\r\n})(CombiningPromises || (CombiningPromises = {}));\r\n\n\n//# sourceURL=webpack:///./src/combining-promises.ts?");

/***/ })

/******/ });