/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./typescript/cuponsCensorship.ts":
/*!****************************************!*\
  !*** ./typescript/cuponsCensorship.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cuponsCensorship = void 0;
var env_1 = __webpack_require__(/*! ./env */ "./typescript/env.ts");
function eraseCuponElement() {
    document.querySelector(".Cart-NoCoupon").remove();
}
function getProductsNames() {
    return Array.from(document.querySelectorAll(".Cart-Products .Cart-ProductName a"))
        .map(function (item) { return item.innerText; });
}
function viewReader(patt, cb) {
    var targets = getProductsNames().filter(function (name) {
        return name.match(patt);
    });
    if (targets.length > 0) {
        cb();
    }
}
function cuponsCensorship(patt) {
    if (!window.location.pathname.match(new RegExp('\/cart\/?'))) {
        return;
    }
    var timer = setInterval(function () {
        if (document.readyState == "interactive" && !env_1.env.reader) {
            env_1.env.reader = viewReader(patt, eraseCuponElement);
        }
        if (document.readyState == "complete" && getProductsNames().length > 0) {
            if (!env_1.env.reader) {
                env_1.env.reader = viewReader(patt, eraseCuponElement);
            }
            clearInterval(timer);
        }
    }, 500);
}
exports.cuponsCensorship = cuponsCensorship;


/***/ }),

/***/ "./typescript/detailCensorship.ts":
/*!****************************************!*\
  !*** ./typescript/detailCensorship.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.detailCensorship = void 0;
var env_1 = __webpack_require__(/*! ./env */ "./typescript/env.ts");
var appConfig_1 = __webpack_require__(/*! ./models/appConfig */ "./typescript/models/appConfig.ts");
var viewReader_1 = __webpack_require__(/*! ./modules/viewReader */ "./typescript/modules/viewReader.ts");
var productEventCleaner_1 = __webpack_require__(/*! ./tools/productEventCleaner */ "./typescript/tools/productEventCleaner.ts");
var reader = null;
var currentProducts = [];
function detailCensorship(pathname) {
    if (!window.location.pathname.toLowerCase().match(new RegExp(pathname.toLowerCase()))) {
        return;
    }
    console.log("detail");
    var timer = setInterval(function () {
        if (document.readyState == "interactive" && !env_1.env.reader) {
            reader = viewReader_1.viewReader(new appConfig_1.IappConfig(), productEventCleaner_1.productEventCleaner);
        }
        if (document.readyState == "complete") {
            if (!reader) {
                reader = viewReader_1.viewReader(new appConfig_1.IappConfig(), productEventCleaner_1.productEventCleaner);
            }
            else {
            }
            document.querySelectorAll(".PagingButtons a").forEach(function (item) {
                item.addEventListener("click", function () {
                    viewReader_1.viewReader(new appConfig_1.IappConfig(), productEventCleaner_1.productEventCleaner);
                });
            });
            clearInterval(timer);
        }
    }, 500);
}
exports.detailCensorship = detailCensorship;


/***/ }),

/***/ "./typescript/env.ts":
/*!***************************!*\
  !*** ./typescript/env.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.env = void 0;
exports.env = {
    reader: null,
    get productsContainer() {
        return document.querySelector(".ProductList");
    },
    get products() {
        return Array.from(this.productsContainer.querySelectorAll(".ProductListCell"));
    }
};


/***/ }),

/***/ "./typescript/index.ts":
/*!*****************************!*\
  !*** ./typescript/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var detailCensorship_1 = __webpack_require__(/*! ./detailCensorship */ "./typescript/detailCensorship.ts");
var inteligenseSearchCensorship_1 = __webpack_require__(/*! ./inteligenseSearchCensorship */ "./typescript/inteligenseSearchCensorship.ts");
var productCensorship_1 = __webpack_require__(/*! ./productCensorship */ "./typescript/productCensorship.ts");
var cuponsCensorship_1 = __webpack_require__(/*! ./cuponsCensorship */ "./typescript/cuponsCensorship.ts");
window.productCensorship = productCensorship_1.productCensorship;
window.inteligenseSearchCensorship = inteligenseSearchCensorship_1.inteligenseSearchCensorship;
window.detailCensorship = detailCensorship_1.detailCensorship;
window.cuponsCensorship = cuponsCensorship_1.cuponsCensorship;


/***/ }),

/***/ "./typescript/inteligenseSearchCensorship.ts":
/*!***************************************************!*\
  !*** ./typescript/inteligenseSearchCensorship.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inteligenseSearchCensorship = void 0;
function inteligenseSearchCensorship(pattern) {
    var observer = new MutationObserver(function (m) {
        var products = document.querySelector("#SearchProductSummary");
        if (products) {
            console.log("inteligese aparece");
            try {
                var lines = products.querySelectorAll(".product-panel-item");
                if (lines.length > 0) {
                    // console.log("inteligese: hay productos");
                    lines.forEach(function (item) {
                        var itemName = item.querySelector(".cell-name");
                        if (itemName.innerHTML.toLowerCase().match(new RegExp(pattern.toLowerCase()))) {
                            // console.log("inteligese: se remueve un producto", item);
                            remove(item);
                        }
                        else {
                            // console.log("inteligese: se ignora", item);
                        }
                    });
                }
            }
            catch (error) {
                // console.error("viewReader: error while erasing products", error)
            }
        }
    });
    observer.observe(document.body, {
        childList: true, subtree: true
    });
}
exports.inteligenseSearchCensorship = inteligenseSearchCensorship;
function remove(element) {
    try {
        element.remove();
    }
    catch (_a) {
        element.parentElement.removeChild(element);
    }
}


/***/ }),

/***/ "./typescript/models/appConfig.ts":
/*!****************************************!*\
  !*** ./typescript/models/appConfig.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IappConfig = void 0;
var IappConfig = /** @class */ (function () {
    function IappConfig() {
    }
    return IappConfig;
}());
exports.IappConfig = IappConfig;


/***/ }),

/***/ "./typescript/modules/viewReader.ts":
/*!******************************************!*\
  !*** ./typescript/modules/viewReader.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewReader = void 0;
var env_1 = __webpack_require__(/*! ../env */ "./typescript/env.ts");
function viewReader(opts, action) {
    var observer = new MutationObserver(function (m) {
        var productsContainer = env_1.env.productsContainer;
        try {
            var products = env_1.env.products;
            if (products.length > 0) {
                try {
                    action(products, opts);
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
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
            env_1.env.reader = viewReader_1.viewReader(opts, productEraser_tool_1.productEraser);
        }
        if (document.readyState == "complete" && env_1.env.products.length > 0) {
            if (!env_1.env.reader) {
                productEraser_tool_1.productEraser(env_1.env.products, opts);
                env_1.env.reader = viewReader_1.viewReader(opts, productEraser_tool_1.productEraser);
            }
            document.querySelectorAll(".PagingButtons a").forEach(function (item) {
                item.addEventListener("click", function () {
                    viewReader_1.viewReader(opts, productEraser_tool_1.productEraser);
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
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.productEraser = void 0;
function productEraser(products, opts) {
    products.forEach(function (prod) {
        var prodName = prod.querySelector(".ProductName").innerText.toLowerCase();
        if (opts.productPattern && prodName.match(new RegExp(opts.productPattern.toLowerCase()))) {
            remove(prod);
        }
        if (opts.productsNames && opts.productsNames.map(function (item) { return item.toLowerCase(); }).indexOf(prodName) >= 0) {
            remove(prod);
        }
    });
}
exports.productEraser = productEraser;
function remove(element) {
    try {
        element.remove();
    }
    catch (_a) {
        element.parentElement.removeChild(element);
    }
}


/***/ }),

/***/ "./typescript/tools/productEventCleaner.ts":
/*!*************************************************!*\
  !*** ./typescript/tools/productEventCleaner.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.eventCleaner = exports.productEventCleaner = void 0;
function productEventCleaner() {
    eventCleaner(".ProductName");
    eventCleaner(".ProductImage");
    eventCleaner(".ProductImage img");
}
exports.productEventCleaner = productEventCleaner;
function eventCleaner(target) {
    document.querySelectorAll(target).forEach(function (item) {
        item.removeAttribute("href");
        $(item).off("click");
        item.onclick = function () { return false; };
        item.removeAttribute("prevent-click");
        item.removeAttribute("ng-click");
        item.removeAttribute("ng-bind");
        item.classList.remove("ng-binding");
    });
}
exports.eventCleaner = eventCleaner;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdm9uLW1hcy1jZW5zb3JzaGlwLy4vdHlwZXNjcmlwdC9jdXBvbnNDZW5zb3JzaGlwLnRzIiwid2VicGFjazovL2F2b24tbWFzLWNlbnNvcnNoaXAvLi90eXBlc2NyaXB0L2RldGFpbENlbnNvcnNoaXAudHMiLCJ3ZWJwYWNrOi8vYXZvbi1tYXMtY2Vuc29yc2hpcC8uL3R5cGVzY3JpcHQvZW52LnRzIiwid2VicGFjazovL2F2b24tbWFzLWNlbnNvcnNoaXAvLi90eXBlc2NyaXB0L2luZGV4LnRzIiwid2VicGFjazovL2F2b24tbWFzLWNlbnNvcnNoaXAvLi90eXBlc2NyaXB0L2ludGVsaWdlbnNlU2VhcmNoQ2Vuc29yc2hpcC50cyIsIndlYnBhY2s6Ly9hdm9uLW1hcy1jZW5zb3JzaGlwLy4vdHlwZXNjcmlwdC9tb2RlbHMvYXBwQ29uZmlnLnRzIiwid2VicGFjazovL2F2b24tbWFzLWNlbnNvcnNoaXAvLi90eXBlc2NyaXB0L21vZHVsZXMvdmlld1JlYWRlci50cyIsIndlYnBhY2s6Ly9hdm9uLW1hcy1jZW5zb3JzaGlwLy4vdHlwZXNjcmlwdC9wcm9kdWN0Q2Vuc29yc2hpcC50cyIsIndlYnBhY2s6Ly9hdm9uLW1hcy1jZW5zb3JzaGlwLy4vdHlwZXNjcmlwdC90b29scy9wcm9kdWN0RXJhc2VyLnRvb2wudHMiLCJ3ZWJwYWNrOi8vYXZvbi1tYXMtY2Vuc29yc2hpcC8uL3R5cGVzY3JpcHQvdG9vbHMvcHJvZHVjdEV2ZW50Q2xlYW5lci50cyIsIndlYnBhY2s6Ly9hdm9uLW1hcy1jZW5zb3JzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2F2b24tbWFzLWNlbnNvcnNoaXAvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCx3QkFBd0I7QUFDeEIsWUFBWSxtQkFBTyxDQUFDLGtDQUFPO0FBQzNCO0FBQ0E7QUFD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LDJCQUEyQixFQUFFO0FBQ3ZHO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN0QmE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLEdBQUcsMkJBQTJCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsY0FBYztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG9CQUFvQjs7Ozs7OztVQ3BCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuY3Vwb25zQ2Vuc29yc2hpcCA9IHZvaWQgMDtcclxudmFyIGVudl8xID0gcmVxdWlyZShcIi4vZW52XCIpO1xyXG5mdW5jdGlvbiBlcmFzZUN1cG9uRWxlbWVudCgpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuQ2FydC1Ob0NvdXBvblwiKS5yZW1vdmUoKTtcclxufVxyXG5mdW5jdGlvbiBnZXRQcm9kdWN0c05hbWVzKCkge1xyXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5DYXJ0LVByb2R1Y3RzIC5DYXJ0LVByb2R1Y3ROYW1lIGFcIikpXHJcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5pbm5lclRleHQ7IH0pO1xyXG59XHJcbmZ1bmN0aW9uIHZpZXdSZWFkZXIocGF0dCwgY2IpIHtcclxuICAgIHZhciB0YXJnZXRzID0gZ2V0UHJvZHVjdHNOYW1lcygpLmZpbHRlcihmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHJldHVybiBuYW1lLm1hdGNoKHBhdHQpO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGFyZ2V0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY2IoKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBjdXBvbnNDZW5zb3JzaGlwKHBhdHQpIHtcclxuICAgIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLm1hdGNoKG5ldyBSZWdFeHAoJ1xcL2NhcnRcXC8/JykpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiaW50ZXJhY3RpdmVcIiAmJiAhZW52XzEuZW52LnJlYWRlcikge1xyXG4gICAgICAgICAgICBlbnZfMS5lbnYucmVhZGVyID0gdmlld1JlYWRlcihwYXR0LCBlcmFzZUN1cG9uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIiAmJiBnZXRQcm9kdWN0c05hbWVzKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWVudl8xLmVudi5yZWFkZXIpIHtcclxuICAgICAgICAgICAgICAgIGVudl8xLmVudi5yZWFkZXIgPSB2aWV3UmVhZGVyKHBhdHQsIGVyYXNlQ3Vwb25FbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9LCA1MDApO1xyXG59XHJcbmV4cG9ydHMuY3Vwb25zQ2Vuc29yc2hpcCA9IGN1cG9uc0NlbnNvcnNoaXA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuZGV0YWlsQ2Vuc29yc2hpcCA9IHZvaWQgMDtcclxudmFyIGVudl8xID0gcmVxdWlyZShcIi4vZW52XCIpO1xyXG52YXIgYXBwQ29uZmlnXzEgPSByZXF1aXJlKFwiLi9tb2RlbHMvYXBwQ29uZmlnXCIpO1xyXG52YXIgdmlld1JlYWRlcl8xID0gcmVxdWlyZShcIi4vbW9kdWxlcy92aWV3UmVhZGVyXCIpO1xyXG52YXIgcHJvZHVjdEV2ZW50Q2xlYW5lcl8xID0gcmVxdWlyZShcIi4vdG9vbHMvcHJvZHVjdEV2ZW50Q2xlYW5lclwiKTtcclxudmFyIHJlYWRlciA9IG51bGw7XHJcbnZhciBjdXJyZW50UHJvZHVjdHMgPSBbXTtcclxuZnVuY3Rpb24gZGV0YWlsQ2Vuc29yc2hpcChwYXRobmFtZSkge1xyXG4gICAgaWYgKCF3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUudG9Mb3dlckNhc2UoKS5tYXRjaChuZXcgUmVnRXhwKHBhdGhuYW1lLnRvTG93ZXJDYXNlKCkpKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKFwiZGV0YWlsXCIpO1xyXG4gICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiaW50ZXJhY3RpdmVcIiAmJiAhZW52XzEuZW52LnJlYWRlcikge1xyXG4gICAgICAgICAgICByZWFkZXIgPSB2aWV3UmVhZGVyXzEudmlld1JlYWRlcihuZXcgYXBwQ29uZmlnXzEuSWFwcENvbmZpZygpLCBwcm9kdWN0RXZlbnRDbGVhbmVyXzEucHJvZHVjdEV2ZW50Q2xlYW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xyXG4gICAgICAgICAgICBpZiAoIXJlYWRlcikge1xyXG4gICAgICAgICAgICAgICAgcmVhZGVyID0gdmlld1JlYWRlcl8xLnZpZXdSZWFkZXIobmV3IGFwcENvbmZpZ18xLklhcHBDb25maWcoKSwgcHJvZHVjdEV2ZW50Q2xlYW5lcl8xLnByb2R1Y3RFdmVudENsZWFuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuUGFnaW5nQnV0dG9ucyBhXCIpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2aWV3UmVhZGVyXzEudmlld1JlYWRlcihuZXcgYXBwQ29uZmlnXzEuSWFwcENvbmZpZygpLCBwcm9kdWN0RXZlbnRDbGVhbmVyXzEucHJvZHVjdEV2ZW50Q2xlYW5lcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDUwMCk7XHJcbn1cclxuZXhwb3J0cy5kZXRhaWxDZW5zb3JzaGlwID0gZGV0YWlsQ2Vuc29yc2hpcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5lbnYgPSB2b2lkIDA7XHJcbmV4cG9ydHMuZW52ID0ge1xyXG4gICAgcmVhZGVyOiBudWxsLFxyXG4gICAgZ2V0IHByb2R1Y3RzQ29udGFpbmVyKCkge1xyXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlByb2R1Y3RMaXN0XCIpO1xyXG4gICAgfSxcclxuICAgIGdldCBwcm9kdWN0cygpIHtcclxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLnByb2R1Y3RzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuUHJvZHVjdExpc3RDZWxsXCIpKTtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxudmFyIGRldGFpbENlbnNvcnNoaXBfMSA9IHJlcXVpcmUoXCIuL2RldGFpbENlbnNvcnNoaXBcIik7XHJcbnZhciBpbnRlbGlnZW5zZVNlYXJjaENlbnNvcnNoaXBfMSA9IHJlcXVpcmUoXCIuL2ludGVsaWdlbnNlU2VhcmNoQ2Vuc29yc2hpcFwiKTtcclxudmFyIHByb2R1Y3RDZW5zb3JzaGlwXzEgPSByZXF1aXJlKFwiLi9wcm9kdWN0Q2Vuc29yc2hpcFwiKTtcclxudmFyIGN1cG9uc0NlbnNvcnNoaXBfMSA9IHJlcXVpcmUoXCIuL2N1cG9uc0NlbnNvcnNoaXBcIik7XHJcbndpbmRvdy5wcm9kdWN0Q2Vuc29yc2hpcCA9IHByb2R1Y3RDZW5zb3JzaGlwXzEucHJvZHVjdENlbnNvcnNoaXA7XHJcbndpbmRvdy5pbnRlbGlnZW5zZVNlYXJjaENlbnNvcnNoaXAgPSBpbnRlbGlnZW5zZVNlYXJjaENlbnNvcnNoaXBfMS5pbnRlbGlnZW5zZVNlYXJjaENlbnNvcnNoaXA7XHJcbndpbmRvdy5kZXRhaWxDZW5zb3JzaGlwID0gZGV0YWlsQ2Vuc29yc2hpcF8xLmRldGFpbENlbnNvcnNoaXA7XHJcbndpbmRvdy5jdXBvbnNDZW5zb3JzaGlwID0gY3Vwb25zQ2Vuc29yc2hpcF8xLmN1cG9uc0NlbnNvcnNoaXA7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuaW50ZWxpZ2Vuc2VTZWFyY2hDZW5zb3JzaGlwID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBpbnRlbGlnZW5zZVNlYXJjaENlbnNvcnNoaXAocGF0dGVybikge1xyXG4gICAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG0pIHtcclxuICAgICAgICB2YXIgcHJvZHVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1NlYXJjaFByb2R1Y3RTdW1tYXJ5XCIpO1xyXG4gICAgICAgIGlmIChwcm9kdWN0cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImludGVsaWdlc2UgYXBhcmVjZVwiKTtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZhciBsaW5lcyA9IHByb2R1Y3RzLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvZHVjdC1wYW5lbC1pdGVtXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImludGVsaWdlc2U6IGhheSBwcm9kdWN0b3NcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbGluZXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbU5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIuY2VsbC1uYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbU5hbWUuaW5uZXJIVE1MLnRvTG93ZXJDYXNlKCkubWF0Y2gobmV3IFJlZ0V4cChwYXR0ZXJuLnRvTG93ZXJDYXNlKCkpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbnRlbGlnZXNlOiBzZSByZW11ZXZlIHVuIHByb2R1Y3RvXCIsIGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpbnRlbGlnZXNlOiBzZSBpZ25vcmFcIiwgaXRlbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJ2aWV3UmVhZGVyOiBlcnJvciB3aGlsZSBlcmFzaW5nIHByb2R1Y3RzXCIsIGVycm9yKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWVcclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuaW50ZWxpZ2Vuc2VTZWFyY2hDZW5zb3JzaGlwID0gaW50ZWxpZ2Vuc2VTZWFyY2hDZW5zb3JzaGlwO1xyXG5mdW5jdGlvbiByZW1vdmUoZWxlbWVudCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKF9hKSB7XHJcbiAgICAgICAgZWxlbWVudC5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuSWFwcENvbmZpZyA9IHZvaWQgMDtcclxudmFyIElhcHBDb25maWcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBJYXBwQ29uZmlnKCkge1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIElhcHBDb25maWc7XHJcbn0oKSk7XHJcbmV4cG9ydHMuSWFwcENvbmZpZyA9IElhcHBDb25maWc7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMudmlld1JlYWRlciA9IHZvaWQgMDtcclxudmFyIGVudl8xID0gcmVxdWlyZShcIi4uL2VudlwiKTtcclxuZnVuY3Rpb24gdmlld1JlYWRlcihvcHRzLCBhY3Rpb24pIHtcclxuICAgIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtKSB7XHJcbiAgICAgICAgdmFyIHByb2R1Y3RzQ29udGFpbmVyID0gZW52XzEuZW52LnByb2R1Y3RzQ29udGFpbmVyO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHZhciBwcm9kdWN0cyA9IGVudl8xLmVudi5wcm9kdWN0cztcclxuICAgICAgICAgICAgaWYgKHByb2R1Y3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aW9uKHByb2R1Y3RzLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJ2aWV3UmVhZGVyOiBlcnJvciB3aGlsZSBlcmFzaW5nIHByb2R1Y3RzXCIsIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWV3UmVhZGVyOlwiLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsIHN1YnRyZWU6IHRydWVcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9ic2VydmVyO1xyXG59XHJcbmV4cG9ydHMudmlld1JlYWRlciA9IHZpZXdSZWFkZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMucHJvZHVjdENlbnNvcnNoaXAgPSB2b2lkIDA7XHJcbnZhciBlbnZfMSA9IHJlcXVpcmUoXCIuL2VudlwiKTtcclxudmFyIHZpZXdSZWFkZXJfMSA9IHJlcXVpcmUoXCIuL21vZHVsZXMvdmlld1JlYWRlclwiKTtcclxudmFyIHByb2R1Y3RFcmFzZXJfdG9vbF8xID0gcmVxdWlyZShcIi4vdG9vbHMvcHJvZHVjdEVyYXNlci50b29sXCIpO1xyXG5mdW5jdGlvbiBwcm9kdWN0Q2Vuc29yc2hpcChvcHRzKSB7XHJcbiAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5tYXRjaChuZXcgUmVnRXhwKG9wdHMucGF0aG5hbWUpKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImludGVyYWN0aXZlXCIgJiYgIWVudl8xLmVudi5yZWFkZXIpIHtcclxuICAgICAgICAgICAgZW52XzEuZW52LnJlYWRlciA9IHZpZXdSZWFkZXJfMS52aWV3UmVhZGVyKG9wdHMsIHByb2R1Y3RFcmFzZXJfdG9vbF8xLnByb2R1Y3RFcmFzZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIgJiYgZW52XzEuZW52LnByb2R1Y3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKCFlbnZfMS5lbnYucmVhZGVyKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0RXJhc2VyX3Rvb2xfMS5wcm9kdWN0RXJhc2VyKGVudl8xLmVudi5wcm9kdWN0cywgb3B0cyk7XHJcbiAgICAgICAgICAgICAgICBlbnZfMS5lbnYucmVhZGVyID0gdmlld1JlYWRlcl8xLnZpZXdSZWFkZXIob3B0cywgcHJvZHVjdEVyYXNlcl90b29sXzEucHJvZHVjdEVyYXNlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5QYWdpbmdCdXR0b25zIGFcIikuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZpZXdSZWFkZXJfMS52aWV3UmVhZGVyKG9wdHMsIHByb2R1Y3RFcmFzZXJfdG9vbF8xLnByb2R1Y3RFcmFzZXIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9LCA1MDApO1xyXG59XHJcbmV4cG9ydHMucHJvZHVjdENlbnNvcnNoaXAgPSBwcm9kdWN0Q2Vuc29yc2hpcDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5wcm9kdWN0RXJhc2VyID0gdm9pZCAwO1xyXG5mdW5jdGlvbiBwcm9kdWN0RXJhc2VyKHByb2R1Y3RzLCBvcHRzKSB7XHJcbiAgICBwcm9kdWN0cy5mb3JFYWNoKGZ1bmN0aW9uIChwcm9kKSB7XHJcbiAgICAgICAgdmFyIHByb2ROYW1lID0gcHJvZC5xdWVyeVNlbGVjdG9yKFwiLlByb2R1Y3ROYW1lXCIpLmlubmVyVGV4dC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChvcHRzLnByb2R1Y3RQYXR0ZXJuICYmIHByb2ROYW1lLm1hdGNoKG5ldyBSZWdFeHAob3B0cy5wcm9kdWN0UGF0dGVybi50b0xvd2VyQ2FzZSgpKSkpIHtcclxuICAgICAgICAgICAgcmVtb3ZlKHByb2QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0cy5wcm9kdWN0c05hbWVzICYmIG9wdHMucHJvZHVjdHNOYW1lcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0udG9Mb3dlckNhc2UoKTsgfSkuaW5kZXhPZihwcm9kTmFtZSkgPj0gMCkge1xyXG4gICAgICAgICAgICByZW1vdmUocHJvZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5wcm9kdWN0RXJhc2VyID0gcHJvZHVjdEVyYXNlcjtcclxuZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChfYSkge1xyXG4gICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLmV2ZW50Q2xlYW5lciA9IGV4cG9ydHMucHJvZHVjdEV2ZW50Q2xlYW5lciA9IHZvaWQgMDtcclxuZnVuY3Rpb24gcHJvZHVjdEV2ZW50Q2xlYW5lcigpIHtcclxuICAgIGV2ZW50Q2xlYW5lcihcIi5Qcm9kdWN0TmFtZVwiKTtcclxuICAgIGV2ZW50Q2xlYW5lcihcIi5Qcm9kdWN0SW1hZ2VcIik7XHJcbiAgICBldmVudENsZWFuZXIoXCIuUHJvZHVjdEltYWdlIGltZ1wiKTtcclxufVxyXG5leHBvcnRzLnByb2R1Y3RFdmVudENsZWFuZXIgPSBwcm9kdWN0RXZlbnRDbGVhbmVyO1xyXG5mdW5jdGlvbiBldmVudENsZWFuZXIodGFyZ2V0KSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKFwiaHJlZlwiKTtcclxuICAgICAgICAkKGl0ZW0pLm9mZihcImNsaWNrXCIpO1xyXG4gICAgICAgIGl0ZW0ub25jbGljayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKFwicHJldmVudC1jbGlja1wiKTtcclxuICAgICAgICBpdGVtLnJlbW92ZUF0dHJpYnV0ZShcIm5nLWNsaWNrXCIpO1xyXG4gICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKFwibmctYmluZFwiKTtcclxuICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJuZy1iaW5kaW5nXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5ldmVudENsZWFuZXIgPSBldmVudENsZWFuZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3R5cGVzY3JpcHQvaW5kZXgudHNcIik7XG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdleHBvcnRzJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG4iXSwic291cmNlUm9vdCI6IiJ9