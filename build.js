var build =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	TemplatesStorage = __webpack_require__(1);

	(function(window) {
	  'use strict';

	  // Write npm run watch-js to start coding
	  let storage = TemplatesStorage();

	})(window);


/***/ },
/* 1 */
/***/ function(module, exports) {

	export default class TemplatesStorage {
	  /**
	   * Save templates here.
	   *
	   * @example
	   * storate = TemplatesStorage(defaultContext)
	   * storage.render(templateName, context)
	   */

	  constructor(defaultContext={}, templates={}) {
	    this.context = defaultContext;
	    this.storage = templates;
	  }

	  render(templateName, context) {
	    return this.storage[templateName](context);
	  }
	}


/***/ }
/******/ ]);