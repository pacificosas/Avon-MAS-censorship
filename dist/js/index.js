(()=>{"use strict";var e={757:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.env=void 0,r.env={reader:null,get productsContainer(){return document.querySelector(".ProductList")},get products(){return this.productsContainer.querySelectorAll(".ProductListCell")}}},169:(e,r,t)=>{var o=t(550),n=t(779);window.productCensorship=n.productCensorship,window.inteligenseSearchCensorship=o.inteligenseSearchCensorship,o.inteligenseSearchCensorship("8 en 1")},550:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.inteligenseSearchCensorship=void 0,r.inteligenseSearchCensorship=function(e){new MutationObserver((function(r){var t=document.querySelector("#SearchProductSummary");if(t){console.log("inteligese aparece");try{var o=t.querySelectorAll(".product-panel-item");o.length>0&&o.forEach((function(r){r.querySelector(".cell-name").innerHTML.toLowerCase().match(new RegExp(e.toLowerCase()))&&r.remove()}))}catch(e){}}})).observe(document.body,{childList:!0,subtree:!0})}},719:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.viewReader=void 0;var o=t(757),n=t(946);r.viewReader=function(e){var r=new MutationObserver((function(r){o.env.productsContainer;try{var t=o.env.products;if(t.length>0)try{n.productEraser(t,e)}catch(e){console.error("viewReader: error while erasing products",e)}}catch(e){console.log("viewReader:",e)}}));return r.observe(document.body,{childList:!0,subtree:!0}),r}},779:(e,r,t)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.productCensorship=void 0;var o=t(757),n=t(719),c=t(946);r.productCensorship=function(e){if(window.location.pathname.match(new RegExp(e.pathname)))var r=setInterval((function(){"interactive"!=document.readyState||o.env.reader||(o.env.reader=n.viewReader(e)),"complete"==document.readyState&&(o.env.reader?o.env.reader.disconnect():c.productEraser(o.env.products,e),document.querySelectorAll(".PagingButtons a").forEach((function(r){console.log("click"),r.addEventListener("click",(function(){n.viewReader(e)}))})),clearInterval(r))}),500)}},946:(e,r)=>{Object.defineProperty(r,"__esModule",{value:!0}),r.productEraser=void 0,r.productEraser=function(e,r){e.forEach((function(e){var t=e.querySelector(".ProductName").innerText.toLowerCase();r.productPattern&&t.match(new RegExp(r.productPattern))&&(console.log(e),e.remove()),r.productsNames&&r.productsNames.map((function(e){return e.toLowerCase()})).indexOf(t)>=0&&(console.log(e),e.remove())}))}}},r={};!function t(o){if(r[o])return r[o].exports;var n=r[o]={exports:{}};return e[o](n,n.exports,t),n.exports}(169)})();