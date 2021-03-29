/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./typescript/env.ts":
/*!***************************!*\
  !*** ./typescript/env.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.env = void 0;
exports.env = {
    reader: null,
    get productsContainer() {
        return document.querySelector(".ProductList");
    },
    get products() {
        return this.productsContainer.querySelectorAll(".ProductListCell");
    }
};


/***/ }),

/***/ "./typescript/index.ts":
/*!*****************************!*\
  !*** ./typescript/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var productCensorship_1 = __webpack_require__(/*! ./productCensorship */ "./typescript/productCensorship.ts");
console.log("injected");
window.productCensorship = productCensorship_1.productCensorship;
productCensorship_1.productCensorship({ pathname: "^/search.*", productPattern: "color" });


/***/ }),

/***/ "./typescript/modules/viewReader.ts":
/*!******************************************!*\
  !*** ./typescript/modules/viewReader.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewReader = void 0;
var env_1 = __webpack_require__(/*! ../env */ "./typescript/env.ts");
var productEraser_tool_1 = __webpack_require__(/*! ../tools/productEraser.tool */ "./typescript/tools/productEraser.tool.ts");
function viewReader(opts) {
    var observer = new MutationObserver(function (m) {
        var productsContainer = env_1.env.productsContainer;
        try {
            var products = env_1.env.products;
            if (products.length > 0) {
                try {
                    productEraser_tool_1.productEraser(products, opts);
                }
                catch (error) {
                    console.error("viewReader: error while erasing products", error);
                }
            }
        }
        catch (error) {
            console.log("viewReader:", error);
        }
    });
    observer.observe(document.body, {
        childList: true, subtree: true
    });
    return observer;
}
exports.viewReader = viewReader;


/***/ }),

/***/ "./typescript/productCensorship.ts":
/*!*****************************************!*\
  !*** ./typescript/productCensorship.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productCensorship = void 0;
var env_1 = __webpack_require__(/*! ./env */ "./typescript/env.ts");
var viewReader_1 = __webpack_require__(/*! ./modules/viewReader */ "./typescript/modules/viewReader.ts");
var productEraser_tool_1 = __webpack_require__(/*! ./tools/productEraser.tool */ "./typescript/tools/productEraser.tool.ts");
function productCensorship(opts) {
    if (!window.location.pathname.match(new RegExp(opts.pathname))) {
        return;
    }
    var timer = setInterval(function () {
        if (document.readyState == "interactive" && !env_1.env.reader) {
            env_1.env.reader = viewReader_1.viewReader(opts);
        }
        if (document.readyState == "complete") {
            if (!env_1.env.reader) {
                productEraser_tool_1.productEraser(env_1.env.products, opts);
            }
            else {
                env_1.env.reader.disconnect();
            }
            document.querySelectorAll(".PagingButtons a").forEach(function (item) {
                console.log("click");
                item.addEventListener("click", function () {
                    viewReader_1.viewReader(opts);
                });
            });
            clearInterval(timer);
        }
    }, 500);
}
exports.productCensorship = productCensorship;


/***/ }),

/***/ "./typescript/tools/productEraser.tool.ts":
/*!************************************************!*\
  !*** ./typescript/tools/productEraser.tool.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productEraser = void 0;
function productEraser(products, opts) {
    products.forEach(function (prod) {
        var prodName = prod.querySelector(".ProductName").innerText.toLowerCase();
        if (opts.productPattern && prodName.match(new RegExp(opts.productPattern))) {
            console.log(prod);
            prod.remove();
        }
        if (opts.productsNames && opts.productsNames.map(function (item) { return item.toLowerCase(); }).indexOf(prodName) >= 0) {
            console.log(prod);
            prod.remove();
        }
    });
}
exports.productEraser = productEraser;


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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./typescript/index.ts");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2Vudi50cyIsIndlYnBhY2s6Ly9hdm9uLXJ1bGV0YS1jZG4vLi90eXBlc2NyaXB0L2luZGV4LnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvbW9kdWxlcy92aWV3UmVhZGVyLnRzIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi8uL3R5cGVzY3JpcHQvcHJvZHVjdENlbnNvcnNoaXAudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuLy4vdHlwZXNjcmlwdC90b29scy9wcm9kdWN0RXJhc2VyLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1ydWxldGEtY2RuL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2F2b24tcnVsZXRhLWNkbi93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELFdBQVc7QUFDWCxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQ1hhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELDBCQUEwQixtQkFBTyxDQUFDLDhEQUFxQjtBQUN2RDtBQUNBO0FBQ0EsdUNBQXVDLGtEQUFrRDs7Ozs7Ozs7Ozs7QUNMNUU7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLFlBQVksbUJBQU8sQ0FBQyxtQ0FBUTtBQUM1QiwyQkFBMkIsbUJBQU8sQ0FBQyw2RUFBNkI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxrQkFBa0I7Ozs7Ozs7Ozs7O0FDNUJMO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHlCQUF5QjtBQUN6QixZQUFZLG1CQUFPLENBQUMsa0NBQU87QUFDM0IsbUJBQW1CLG1CQUFPLENBQUMsZ0VBQXNCO0FBQ2pELDJCQUEyQixtQkFBTyxDQUFDLDRFQUE0QjtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHlCQUF5Qjs7Ozs7Ozs7Ozs7QUMvQlo7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEVBQTBFLDJCQUEyQixFQUFFO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFCQUFxQjs7Ozs7OztVQ2hCckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZW52ID0gdm9pZCAwO1xyXG5leHBvcnRzLmVudiA9IHtcclxuICAgIHJlYWRlcjogbnVsbCxcclxuICAgIGdldCBwcm9kdWN0c0NvbnRhaW5lcigpIHtcclxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5Qcm9kdWN0TGlzdFwiKTtcclxuICAgIH0sXHJcbiAgICBnZXQgcHJvZHVjdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvZHVjdHNDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5Qcm9kdWN0TGlzdENlbGxcIik7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbnZhciBwcm9kdWN0Q2Vuc29yc2hpcF8xID0gcmVxdWlyZShcIi4vcHJvZHVjdENlbnNvcnNoaXBcIik7XHJcbmNvbnNvbGUubG9nKFwiaW5qZWN0ZWRcIik7XHJcbndpbmRvdy5wcm9kdWN0Q2Vuc29yc2hpcCA9IHByb2R1Y3RDZW5zb3JzaGlwXzEucHJvZHVjdENlbnNvcnNoaXA7XHJcbnByb2R1Y3RDZW5zb3JzaGlwXzEucHJvZHVjdENlbnNvcnNoaXAoeyBwYXRobmFtZTogXCJeL3NlYXJjaC4qXCIsIHByb2R1Y3RQYXR0ZXJuOiBcImNvbG9yXCIgfSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMudmlld1JlYWRlciA9IHZvaWQgMDtcclxudmFyIGVudl8xID0gcmVxdWlyZShcIi4uL2VudlwiKTtcclxudmFyIHByb2R1Y3RFcmFzZXJfdG9vbF8xID0gcmVxdWlyZShcIi4uL3Rvb2xzL3Byb2R1Y3RFcmFzZXIudG9vbFwiKTtcclxuZnVuY3Rpb24gdmlld1JlYWRlcihvcHRzKSB7XHJcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobSkge1xyXG4gICAgICAgIHZhciBwcm9kdWN0c0NvbnRhaW5lciA9IGVudl8xLmVudi5wcm9kdWN0c0NvbnRhaW5lcjtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgcHJvZHVjdHMgPSBlbnZfMS5lbnYucHJvZHVjdHM7XHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RFcmFzZXJfdG9vbF8xLnByb2R1Y3RFcmFzZXIocHJvZHVjdHMsIG9wdHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcInZpZXdSZWFkZXI6IGVycm9yIHdoaWxlIGVyYXNpbmcgcHJvZHVjdHNcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdSZWFkZXI6XCIsIGVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xyXG4gICAgICAgIGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JzZXJ2ZXI7XHJcbn1cclxuZXhwb3J0cy52aWV3UmVhZGVyID0gdmlld1JlYWRlcjtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wcm9kdWN0Q2Vuc29yc2hpcCA9IHZvaWQgMDtcclxudmFyIGVudl8xID0gcmVxdWlyZShcIi4vZW52XCIpO1xyXG52YXIgdmlld1JlYWRlcl8xID0gcmVxdWlyZShcIi4vbW9kdWxlcy92aWV3UmVhZGVyXCIpO1xyXG52YXIgcHJvZHVjdEVyYXNlcl90b29sXzEgPSByZXF1aXJlKFwiLi90b29scy9wcm9kdWN0RXJhc2VyLnRvb2xcIik7XHJcbmZ1bmN0aW9uIHByb2R1Y3RDZW5zb3JzaGlwKG9wdHMpIHtcclxuICAgIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAob3B0cy5wYXRobmFtZSkpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiaW50ZXJhY3RpdmVcIiAmJiAhZW52XzEuZW52LnJlYWRlcikge1xyXG4gICAgICAgICAgICBlbnZfMS5lbnYucmVhZGVyID0gdmlld1JlYWRlcl8xLnZpZXdSZWFkZXIob3B0cyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICBpZiAoIWVudl8xLmVudi5yZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RFcmFzZXJfdG9vbF8xLnByb2R1Y3RFcmFzZXIoZW52XzEuZW52LnByb2R1Y3RzLCBvcHRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGVudl8xLmVudi5yZWFkZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuUGFnaW5nQnV0dG9ucyBhXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmlld1JlYWRlcl8xLnZpZXdSZWFkZXIob3B0cyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDUwMCk7XHJcbn1cclxuZXhwb3J0cy5wcm9kdWN0Q2Vuc29yc2hpcCA9IHByb2R1Y3RDZW5zb3JzaGlwO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnByb2R1Y3RFcmFzZXIgPSB2b2lkIDA7XHJcbmZ1bmN0aW9uIHByb2R1Y3RFcmFzZXIocHJvZHVjdHMsIG9wdHMpIHtcclxuICAgIHByb2R1Y3RzLmZvckVhY2goZnVuY3Rpb24gKHByb2QpIHtcclxuICAgICAgICB2YXIgcHJvZE5hbWUgPSBwcm9kLnF1ZXJ5U2VsZWN0b3IoXCIuUHJvZHVjdE5hbWVcIikuaW5uZXJUZXh0LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKG9wdHMucHJvZHVjdFBhdHRlcm4gJiYgcHJvZE5hbWUubWF0Y2gobmV3IFJlZ0V4cChvcHRzLnByb2R1Y3RQYXR0ZXJuKSkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZCk7XHJcbiAgICAgICAgICAgIHByb2QucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRzLnByb2R1Y3RzTmFtZXMgJiYgb3B0cy5wcm9kdWN0c05hbWVzLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS50b0xvd2VyQ2FzZSgpOyB9KS5pbmRleE9mKHByb2ROYW1lKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByb2QpO1xyXG4gICAgICAgICAgICBwcm9kLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMucHJvZHVjdEVyYXNlciA9IHByb2R1Y3RFcmFzZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3R5cGVzY3JpcHQvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9