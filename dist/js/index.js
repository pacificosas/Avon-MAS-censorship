!function(){"use strict";var e={800:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.cuponsCensorship=void 0;var n=t(757);function o(){document.querySelector(".Cart-NoCoupon").remove()}function c(){return Array.from(document.querySelectorAll(".Cart-Products .Cart-ProductName a")).map((function(e){return e.innerText}))}function i(e,r){c().filter((function(r){return r.match(e)})).length>0&&r()}r.cuponsCensorship=function(e){if(window.location.pathname.match(new RegExp("/cart/?")))var r=setInterval((function(){"interactive"!=document.readyState||n.env.reader||(n.env.reader=i(e,o)),"complete"==document.readyState&&c().length>0&&(n.env.reader||(n.env.reader=i(e,o)),clearInterval(r))}),500)}},933:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.detailCensorship=void 0;var n=t(757),o=t(447),c=t(719),i=t(649),a=null;r.detailCensorship=function(e){if(window.location.pathname.toLowerCase().match(new RegExp(e.toLowerCase()))){console.log("detail");var r=setInterval((function(){"interactive"!=document.readyState||n.env.reader||(a=c.viewReader(new o.IappConfig,i.productEventCleaner)),"complete"==document.readyState&&(a||(a=c.viewReader(new o.IappConfig,i.productEventCleaner)),document.querySelectorAll(".PagingButtons a").forEach((function(e){e.addEventListener("click",(function(){c.viewReader(new o.IappConfig,i.productEventCleaner)}))})),clearInterval(r))}),500)}}},757:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.env=void 0,r.env={reader:null,get productsContainer(){return document.querySelector(".ProductList")},get products(){return Array.from(this.productsContainer.querySelectorAll(".ProductListCell"))}}},169:function(e,r,t){var n=t(933),o=t(550),c=t(779),i=t(800);window.productCensorship=c.productCensorship,window.inteligenseSearchCensorship=o.inteligenseSearchCensorship,window.detailCensorship=n.detailCensorship,window.cuponsCensorship=i.cuponsCensorship},550:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.inteligenseSearchCensorship=void 0,r.inteligenseSearchCensorship=function(e){new MutationObserver((function(r){var t=document.querySelector("#SearchProductSummary");if(t){console.log("inteligese aparece");try{var n=t.querySelectorAll(".product-panel-item");n.length>0&&n.forEach((function(r){r.querySelector(".cell-name").innerHTML.toLowerCase().match(new RegExp(e.toLowerCase()))&&function(e){try{e.remove()}catch(r){e.parentElement.removeChild(e)}}(r)}))}catch(e){}}})).observe(document.body,{childList:!0,subtree:!0})}},447:function(e,r){Object.defineProperty(r,"__esModule",{value:!0}),r.IappConfig=void 0;r.IappConfig=function(){}},719:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.viewReader=void 0;var n=t(757);r.viewReader=function(e,r){var t=new MutationObserver((function(t){n.env.productsContainer;try{var o=n.env.products;if(o.length>0)try{r(o,e)}catch(e){console.error("viewReader: error while erasing products",e)}}catch(e){console.log("viewReader:",e)}}));return t.observe(document.body,{childList:!0,subtree:!0}),t}},779:function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0}),r.productCensorship=void 0;var n=t(757),o=t(719),c=t(946);r.productCensorship=function(e){if(window.location.pathname.match(new RegExp(e.pathname)))var r=setInterval((function(){"interactive"!=document.readyState||n.env.reader||(n.env.reader=o.viewReader(e,c.productEraser)),"complete"==document.readyState&&n.env.products.length>0&&(n.env.reader||(c.productEraser(n.env.products,e),n.env.reader=o.viewReader(e,c.productEraser)),document.querySelectorAll(".PagingButtons a").forEach((function(r){r.addEventListener("click",(function(){o.viewReader(e,c.productEraser)}))})),clearInterval(r))}),500)}},946:function(e,r){function t(e){try{e.remove()}catch(r){e.parentElement.removeChild(e)}}Object.defineProperty(r,"__esModule",{value:!0}),r.productEraser=void 0,r.productEraser=function(e,r){e.forEach((function(e){var n=e.querySelector(".ProductName").innerText.toLowerCase();r.productPattern&&n.match(new RegExp(r.productPattern.toLowerCase()))&&t(e),r.productsNames&&r.productsNames.map((function(e){return e.toLowerCase()})).indexOf(n)>=0&&t(e)}))}},649:function(e,r){function t(e){document.querySelectorAll(e).forEach((function(e){e.removeAttribute("href"),$(e).off("click"),e.onclick=function(){return!1},e.removeAttribute("prevent-click"),e.removeAttribute("ng-click"),e.removeAttribute("ng-bind"),e.classList.remove("ng-binding")}))}Object.defineProperty(r,"__esModule",{value:!0}),r.eventCleaner=r.productEventCleaner=void 0,r.productEventCleaner=function(){t(".ProductName"),t(".ProductImage"),t(".ProductImage img")},r.eventCleaner=t}},r={};!function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{}};return e[n](o,o.exports,t),o.exports}(169)}();