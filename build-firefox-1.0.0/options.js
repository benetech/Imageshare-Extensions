!function(){"use strict";var t={198:function(t,e,n){var i=n(645),o=n.n(i)()((function(t){return t[1]}));o.push([t.id,'::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\nbody {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 100%;\n  color: #222222;\n}\n\np {\n  margin: 0 2 0 2;\n}\n\nbutton {\n  margin: 10px;\n}\n\n.main-heading {\n  margin: 10px;\n}\n\n.popup {\n  margin-left: 10px;\n}\n\n/*Keyboard / Buttons*/\nkbd {\n  padding: 2px 4px;\n\tcolor: #fff;\n\tbackground-color: #333;\n\tborder-radius: 3px;\n\t-webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n\tfont-family: monospace, monospace;\n\tfont-size: 1em;\n\tbox-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n}\n\nkbd kbd { padding: 0;\n\tfont-size: 100%;\n\tfont-weight: bold;\n\t-webkit-box-shadow: none;\n  box-shadow: none;\n}\n\na {\n  color: #0c4471;\n  text-decoration: underline;\n}\n\n.h1 {\n  font-size: 2.125em;\n  color: #0c4471;\n  margin: 0;\n  clear: both;\n  font-weight: bold;\n}\n\n.legend {\n  font-size: 1.625em;\n  color: #0c4471;\n  margin: 0;\n}\n\n.submit-btn {\n  font-size: 22px;\n  color: white;\n  border: 1px solid #737369;\n  border-radius: 10px;\n  background-color: #0c4471;\n  height: 60px;\n  padding: 0 10px;\n  white-space: nowrap;\n  border: 1px solid #00275c;\n}\n\n.submit-btn:focus,\n.submit-btn:hover {\n    outline: 2px solid darkblue;\n}\n\n.submit-btn:focus,\n.submit-btn:active {\n  color: #0c4471;\n  background-color: white;\n}\n\n.submit-btn[disabled] {\n  border: 1px solid #aaa;\n  background-color: #d3d3d3;\n  color: #000;\n}\n\n.submit-btn:focus, .submit-btn:hover, .listbox-button:focus, .listbox-button:hover, #search:focus, #search:hover,\ninput:hover, input:focus {\n  outline: 2px solid darkblue;\n  /* add some space between the outline and the button for clearer focus indication */\n  outline-offset: 2px;\n  /* change the color of the button for added focus indication */\n  /* background-color: red; */\n}\n\n.refinements-wrapper {\n  clear: both;\n  justify-content: space-between;\n  padding: 20px 0 0 0;\n}\n\n.refinement {\n  margin-right: 5%;\n}\n\n/* popup.html views */\n.view-one {\n  display: block;\n}\n\n.view-two {\n  display: none;\n}\n\n.no-entry {\n  border-color: #AA0000;\n}\n\n#required {\n  color: #AA0000;\n  font-size: 12;\n}\n\nform[role="search"] .view-two {\n  display: none;\n}\n\nform[role="search"].no-selection .view-one {\n  display: none;\n}\n\nform[role="search"].no-selection .view-two {\n  display: block;\n}\n\n/* loading spinner */\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\np {\n  max-width:400px;\n}\n\n.spinner {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n\n.spinner div {\n  animation: spinner 2.5s infinite;\n  transform-origin: 40px 40px;\n}\n\n.spinner div:after {\n  content: " ";\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  border: 3px solid #000;\n  background: #000;\n  margin: -4px 0 0 -4px;\n}\n\n.spinner div:nth-child(1):after {\n  top: 63px;\n  left: 63px;\n}\n\n.spinner div:nth-child(2) {\n  animation-delay: -0.025s;\n}\n\n.spinner div:nth-child(2):after {\n  top: 68px;\n  left: 56px;\n}\n\n.spinner div:nth-child(3) {\n  animation-delay: -0.05s;\n}\n\n.spinner div:nth-child(3):after {\n  top: 71px;\n  left: 48px;\n}\n\n.spinner div:nth-child(4) {\n  animation-delay: -0.075s;\n}\n\n.spinner div:nth-child(4):after {\n  top: 72px;\n  left: 40px;\n}\n\n.spinner div:nth-child(5) {\n  animation-delay: -0.1s;\n}\n\n.spinner div:nth-child(5):after {\n  top: 71px;\n  left: 32px;\n}\n\n@keyframes spinner {\n  0% {\n    transform: rotate(0deg);\n    opacity: 0;\n    animation-timing-function: ease-out;\n  }\n  20% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 1;\n  }\n  100% {\n    transform: rotate(670deg);\n    opacity: 0;\n    animation-timing-function: ease-out;\n  }\n}\n\n@media screen and (prefers-reduced-motion: reduce), (update: slow) {\n  .spinner div {\n    display: none;\n  }\n\n  #loading-status {\n    position: relative;\n    width: auto;\n    height: auto;\n    padding: 10px;\n    overflow: hidden;\n    clip: auto;\n    white-space: nowrap;\n    border: 3px solid #0c4471;\n    color:#FFF;\n    font-size: 2rem;\n    background: #0c4471;\n  }\n\n  * {\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n\n/* option styles */\n\n.hidden {\n  display: none !important;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.submit-btn:focus, .submit-btn:hover {\n  outline: 2px solid darkblue;\n}\n\n.submit-btn {\n  font-size: 22px;\n  color: white;\n  border: 1px solid #737369;\n  border-radius: 10px;\n  background-color: #0c4471;\n  height: 60px;\n  padding: 0 10px;\n  white-space: nowrap;\n  border: 1px solid #00275c;\n}\n\nbutton, [type="button"], [type="reset"], [type="submit"] {\n  -webkit-appearance: button;\n}\n\n[role="listbox"] {\n  margin: 1em 0 0;\n  padding: 0;\n  border: 1px solid #aaa;\n  background: white;\n}\n\n[role="option"] {\n  position: relative;\n  display: block;\n  padding: .2em;\n  line-height: 1.8em;\n}\n\n[aria-haspopup="listbox"] img {\n    max-height: 1em;\n}\n\n[role="option"] img {\n  max-width: 2em;\n}\n\n[role="option"].focused {\n  background: #bde4ff;\n}\n\nbutton[aria-haspopup="listbox"] {\n  position: relative;\n  min-width: 10em;\n  max-width: 16em;\n  padding-right: 1.5em;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #000;\n  border-radius: 3px;\n}\n\nbutton[aria-haspopup="listbox"] .glyph {\n    display: none;\n    font-weight: bold;\n    font-size: 1.2em;\n    right: 5px;\n    top: -5px;\n    position: absolute;\n}\n\nbutton[aria-haspopup="listbox"] .glyph.collapse {\n    font-size: 1em;\n    top: 3px;\n}\n\nbutton[aria-haspopup="listbox"] .glyph.expand,\nbutton[aria-haspopup="listbox"][aria-expanded="true"] .glyph.collapse {\n    display: inline;\n}\n\nbutton[aria-haspopup="listbox"][aria-expanded="true"] .glyph.expand {\n    display: none;\n}\n\nbutton[aria-haspopup="listbox"] + [role="listbox"] {\n  position: absolute;\n  margin: 0;\n  max-width: 15em;\n  max-height: 100%;\n  border-top: 0;\n  overflow-y: auto;\n  z-index: 1;\n}\n\n/* options.html user settings*/\n.user-presets {\n  display: none;\n}\n\n#no-advanced-settings {\n  margin-top: 1em;\n  padding: 1em;\n  border: 2px solid red;\n  border-radius: 5px;\n  background-color: pink;\n\n  display: none;\n}\n\n/* May provide alternate styles for dark mode below */\n/* This may not be supported outside of Safari just yet */\n@media (prefers-color-scheme: dark) {\n  img {\n    filter: invert(1);\n  }\n}\n\n#settings-saved {\n  margin-top: 1em;\n  padding: 1em;\n  border: 2px solid green;\n  border-radius: 5px;\n  background-color: lightgreen;\n  display: inline-block;\n}\n\n#settings-saved[hidden] {\n  display: none;\n}\n\n@keyframes loading-spinner {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-spinner:before {\n  content: \'\';\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  margin-right: .2em;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-top-color: #000;\n  animation: loading-spinner 2s linear infinite;\n}\n\n@media screen and (prefers-reduced-motion: reduce), (update: slow) {\n  .loading-spinner {\n    display: none;\n  }\n}\n\n#find-terms + .loading-spinner {\n  display: none;\n}\n\n#find-terms[disabled] + .loading-spinner {\n  display: inline-block;\n}',""]),e.Z=o},645:function(t){t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=t(e);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,i){"string"==typeof t&&(t=[[null,t,""]]);var o={};if(i)for(var s=0;s<this.length;s++){var r=this[s][0];null!=r&&(o[r]=!0)}for(var a=0;a<t.length;a++){var d=[].concat(t[a]);i&&o[d[0]]||(n&&(d[2]?d[2]="".concat(n," and ").concat(d[2]):d[2]=n),e.push(d))}},e}},379:function(t,e,n){var i,o=function(){return void 0===i&&(i=Boolean(window&&document&&document.all&&!window.atob)),i},s=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),r=[];function a(t){for(var e=-1,n=0;n<r.length;n++)if(r[n].identifier===t){e=n;break}return e}function d(t,e){for(var n={},i=[],o=0;o<t.length;o++){var s=t[o],d=e.base?s[0]+e.base:s[0],c=n[d]||0,l="".concat(d," ").concat(c);n[d]=c+1;var u=a(l),h={css:s[1],media:s[2],sourceMap:s[3]};-1!==u?(r[u].references++,r[u].updater(h)):r.push({identifier:l,updater:f(h,e),references:1}),i.push(l)}return i}function c(t){var e=document.createElement("style"),i=t.attributes||{};if(void 0===i.nonce){var o=n.nc;o&&(i.nonce=o)}if(Object.keys(i).forEach((function(t){e.setAttribute(t,i[t])})),"function"==typeof t.insert)t.insert(e);else{var r=s(t.insert||"head");if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(e)}return e}var l,u=(l=[],function(t,e){return l[t]=e,l.filter(Boolean).join("\n")});function h(t,e,n,i){var o=n?"":i.media?"@media ".concat(i.media," {").concat(i.css,"}"):i.css;if(t.styleSheet)t.styleSheet.cssText=u(e,o);else{var s=document.createTextNode(o),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(s,r[e]):t.appendChild(s)}}function p(t,e,n){var i=n.css,o=n.media,s=n.sourceMap;if(o?t.setAttribute("media",o):t.removeAttribute("media"),s&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}var b=null,m=0;function f(t,e){var n,i,o;if(e.singleton){var s=m++;n=b||(b=c(e)),i=h.bind(null,n,s,!1),o=h.bind(null,n,s,!0)}else n=c(e),i=p.bind(null,n,e),o=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else o()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=o());var n=d(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var i=0;i<n.length;i++){var o=a(n[i]);r[o].references--}for(var s=d(t,e),c=0;c<n.length;c++){var l=a(n[c]);0===r[l].references&&(r[l].updater(),r.splice(l,1))}n=s}}}}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={id:i,exports:{}};return t[i](s,s.exports,n),s.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t=browser;const e=t=>document.getElementById(t),i=t=>document.querySelector(t),o=async()=>new Promise((e=>{t.storage.local.get(["settings"],(t=>{if(void 0===t.settings)return e({subject:void 0,type:void 0,accommodation:void 0,source:void 0,setActiveTab:!1,notSet:!0});e(t.settings)}))}));var s=s||{};s.KeyCode={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46},s.Utils=s.Utils||{},s.Utils.matches=function(t,e){return Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(e){for(var n=t.parentNode.querySelectorAll(e),i=n.length;--i>=0&&n.item(i)!==this;);return i>-1}),t.matches(e)},s.Utils.remove=function(t){return t.remove&&"function"==typeof t.remove?t.remove():!(!t.parentNode||!t.parentNode.removeChild||"function"!=typeof t.parentNode.removeChild)&&t.parentNode.removeChild(t)},s.Utils.isFocusable=function(t){if(t.tabIndex>0||0===t.tabIndex&&null!==t.getAttribute("tabIndex"))return!0;if(t.disabled)return!1;switch(t.nodeName){case"A":return!!t.href&&"ignore"!=t.rel;case"INPUT":return"hidden"!=t.type&&"file"!=t.type;case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}},s.Utils.getAncestorBySelector=function(t,e){if(!s.Utils.matches(t,e+" "+t.tagName))return null;for(var n=t,i=null;null===i;)s.Utils.matches(n.parentNode,e)?i=n.parentNode:n=n.parentNode;return i},s.Utils.hasClass=function(t,e){return new RegExp("(\\s|^)"+e+"(\\s|$)").test(t.className)},s.Utils.addClass=function(t,e){s.Utils.hasClass(t,e)||(t.className+=" "+e)},s.Utils.removeClass=function(t,e){var n=new RegExp("(\\s|^)"+e+"(\\s|$)");t.className=t.className.replace(n," ").trim()},s.Utils.bindMethods=function(t){var e=Array.prototype.slice.call(arguments,1);e.forEach((function(e){t[e]=t[e].bind(t)}))};var r=s;r.Listbox=function(t){this.focusFirst=!1,this.listboxNode=t,this.activeDescendant=this.listboxNode.getAttribute("aria-activedescendant"),this.multiselectable=this.listboxNode.hasAttribute("aria-multiselectable"),this.choiceStore=document.getElementById(this.listboxNode.dataset.choiceStore),this.moveUpDownEnabled=!1,this.siblingList=null,this.upButton=null,this.downButton=null,this.moveButton=null,this.keysSoFar="",this.handleFocusChange=function(){},this.handleItemChange=function(t,e){},this.registerEvents()},r.Listbox.prototype.registerEvents=function(){this.listboxNode.addEventListener("focus",this.setupFocus.bind(this)),this.listboxNode.addEventListener("keydown",this.checkKeyPress.bind(this)),this.listboxNode.addEventListener("click",this.checkClickItem.bind(this))},r.Listbox.prototype.setupFocus=function(){this.activeDescendant||this.focusFirst&&this.focusFirstItem()},r.Listbox.prototype.focusFirstItem=function(){var t=this.listboxNode.querySelector('[role="option"]');t&&this.focusItem(t)},r.Listbox.prototype.focusLastItem=function(){var t=this.listboxNode.querySelectorAll('[role="option"]');t.length&&this.focusItem(t[t.length-1])},r.Listbox.prototype.checkKeyPress=function(t){var e=t.which||t.keyCode,n=this.activeDescendant,i=this.listboxNode.querySelector('[role="option"]'),o=document.getElementById(this.activeDescendant)||i;if(o){switch(e){case r.KeyCode.PAGE_UP:case r.KeyCode.PAGE_DOWN:this.moveUpDownEnabled&&(t.preventDefault(),e===r.KeyCode.PAGE_UP?this.moveUpItems():this.moveDownItems());break;case r.KeyCode.UP:case r.KeyCode.DOWN:if(t.preventDefault(),void 0===this.activeDescendant||!this.activeDescendant.length){this.focusFirstItem();break}if(this.moveUpDownEnabled&&t.altKey)return void(e===r.KeyCode.UP?this.moveUpItems():this.moveDownItems());(o=e===r.KeyCode.UP?this.findPreviousOption(o):this.findNextOption(o))&&this.focusItem(o);break;case r.KeyCode.HOME:t.preventDefault(),this.focusFirstItem();break;case r.KeyCode.END:t.preventDefault(),this.focusLastItem();break;case r.KeyCode.SPACE:t.preventDefault(),this.toggleSelectItem(o);break;case r.KeyCode.BACKSPACE:case r.KeyCode.DELETE:case r.KeyCode.RETURN:if(!this.moveButton)return;var s=this.moveButton.getAttribute("aria-keyshortcuts");if(e===r.KeyCode.RETURN&&-1===s.indexOf("Enter"))return;if((e===r.KeyCode.BACKSPACE||e===r.KeyCode.DELETE)&&-1===s.indexOf("Delete"))return;t.preventDefault();for(var a=o.nextElementSibling;a&&"true"==a.getAttribute("aria-selected");)a=a.nextElementSibling;if(!a)for(a=o.previousElementSibling;a&&"true"==a.getAttribute("aria-selected");)a=a.previousElementSibling;this.moveItems(),!this.activeDescendant&&a&&this.focusItem(a);break;default:var d=this.findItemToFocus(e);d&&this.focusItem(d)}this.activeDescendant!==n&&this.updateScroll()}},r.Listbox.prototype.findItemToFocus=function(t){var e=this.listboxNode.querySelectorAll('[role="option"]'),n=String.fromCharCode(t),i=0;if(!this.keysSoFar)for(var o=0;o<e.length;o++)e[o].getAttribute("id")==this.activeDescendant&&(i=o);this.keysSoFar+=n,this.clearKeysSoFarAfterDelay();var s=this.findMatchInRange(e,i+1,e.length);return s||(s=this.findMatchInRange(e,0,i)),s},r.Listbox.prototype.findNextOption=function(t){var e=Array.prototype.slice.call(this.listboxNode.querySelectorAll('[role="option"]')),n=e.indexOf(t),i=null;return n>-1&&n<e.length-1&&(i=e[n+1]),i},r.Listbox.prototype.findPreviousOption=function(t){var e=Array.prototype.slice.call(this.listboxNode.querySelectorAll('[role="option"]')),n=e.indexOf(t),i=null;return n>-1&&n>0&&(i=e[n-1]),i},r.Listbox.prototype.clearKeysSoFarAfterDelay=function(){this.keyClear&&(clearTimeout(this.keyClear),this.keyClear=null),this.keyClear=setTimeout(function(){this.keysSoFar="",this.keyClear=null}.bind(this),300)},r.Listbox.prototype.findMatchInRange=function(t,e,n){for(var i=e;i<n;i++){var o=t[i].innerText.trim();if(o&&0===o.toUpperCase().indexOf(this.keysSoFar))return t[i]}return null},r.Listbox.prototype.checkClickItem=function(t){let e;const n=t=>"option"===t.getAttribute("role");n(t.target)&&(e=t.target),"IMG"===t.target.nodeName&&n(t.target.parentNode)&&(e=t.target.parentNode),e&&(this.focusItem(e),this.toggleSelectItem(e),this.updateScroll())},r.Listbox.prototype.toggleSelectItem=function(t){this.multiselectable&&(t.setAttribute("aria-selected","true"===t.getAttribute("aria-selected")?"false":"true"),this.moveButton&&(this.listboxNode.querySelector('[aria-selected="true"]')?this.moveButton.setAttribute("aria-disabled","false"):this.moveButton.setAttribute("aria-disabled","true")))},r.Listbox.prototype.defocusItem=function(t){t&&(this.multiselectable||t.removeAttribute("aria-selected"),t.classList.remove("focused"))},r.Listbox.prototype.focusItem=function(t){this.defocusItem(document.getElementById(this.activeDescendant)),this.choiceStore.value=t.getAttribute("value"),this.multiselectable||t.setAttribute("aria-selected","true"),t.classList.add("focused"),this.listboxNode.setAttribute("aria-activedescendant",t.id),this.activeDescendant=t.id,!this.multiselectable&&this.moveButton&&this.moveButton.setAttribute("aria-disabled",!1),this.checkUpDownButtons(),this.handleFocusChange(t)},r.Listbox.prototype.updateScroll=function(){var t=document.getElementById(this.activeDescendant);if(t&&this.listboxNode.scrollHeight>this.listboxNode.clientHeight){var e=this.listboxNode.clientHeight+this.listboxNode.scrollTop,n=t.offsetTop+t.offsetHeight;n>e?this.listboxNode.scrollTop=n-this.listboxNode.clientHeight:t.offsetTop<this.listboxNode.scrollTop&&(this.listboxNode.scrollTop=t.offsetTop)}},r.Listbox.prototype.checkUpDownButtons=function(){var t=document.getElementById(this.activeDescendant);return!!this.moveUpDownEnabled&&(t?(this.upButton&&(t.previousElementSibling?this.upButton.setAttribute("aria-disabled",!1):this.upButton.setAttribute("aria-disabled","true")),void(this.downButton&&(t.nextElementSibling?this.downButton.setAttribute("aria-disabled",!1):this.downButton.setAttribute("aria-disabled","true")))):(this.upButton.setAttribute("aria-disabled","true"),void this.downButton.setAttribute("aria-disabled","true")))},r.Listbox.prototype.addItems=function(t){if(!t||!t.length)return!1;t.forEach(function(t){this.defocusItem(t),this.toggleSelectItem(t),this.listboxNode.append(t)}.bind(this)),this.activeDescendant||this.focusItem(t[0]),this.handleItemChange("added",t)},r.Listbox.prototype.deleteItems=function(){var t;return this.multiselectable?t=this.listboxNode.querySelectorAll('[aria-selected="true"]'):this.activeDescendant&&(t=[document.getElementById(this.activeDescendant)]),t&&t.length?(t.forEach(function(t){t.remove(),t.id===this.activeDescendant&&this.clearActiveDescendant()}.bind(this)),this.handleItemChange("removed",t),t):[]},r.Listbox.prototype.clearActiveDescendant=function(){this.activeDescendant=null,this.listboxNode.setAttribute("aria-activedescendant",null),this.moveButton&&this.moveButton.setAttribute("aria-disabled","true"),this.checkUpDownButtons()},r.Listbox.prototype.moveUpItems=function(){if(this.activeDescendant){var t=document.getElementById(this.activeDescendant),e=t.previousElementSibling;e&&(this.listboxNode.insertBefore(t,e),this.handleItemChange("moved_up",[t])),this.checkUpDownButtons()}},r.Listbox.prototype.moveDownItems=function(){if(this.activeDescendant){var t=document.getElementById(this.activeDescendant),e=t.nextElementSibling;e&&(this.listboxNode.insertBefore(e,t),this.handleItemChange("moved_down",[t])),this.checkUpDownButtons()}},r.Listbox.prototype.moveItems=function(){if(this.siblingList){var t=this.deleteItems();this.siblingList.addItems(t)}},r.Listbox.prototype.enableMoveUpDown=function(t,e){this.moveUpDownEnabled=!0,this.upButton=t,this.downButton=e,t.addEventListener("click",this.moveUpItems.bind(this)),e.addEventListener("click",this.moveDownItems.bind(this))},r.Listbox.prototype.setupMove=function(t,e){this.siblingList=e,this.moveButton=t,t.addEventListener("click",this.moveItems.bind(this))},r.Listbox.prototype.setHandleItemChange=function(t){this.handleItemChange=t},r.Listbox.prototype.setHandleFocusChange=function(t){this.handleFocusChange=t};var a=r;a.ListboxButton=function(t,e,n){this.button=t,this.buttonContent=n,this.listbox=e,this.registerEvents()},a.ListboxButton.prototype.registerEvents=function(){this.button.addEventListener("click",this.showListbox.bind(this)),this.button.addEventListener("keyup",this.checkShow.bind(this)),this.listbox.listboxNode.addEventListener("click",this.hideListbox.bind(this)),this.listbox.listboxNode.addEventListener("blur",this.hideListbox.bind(this)),this.listbox.listboxNode.addEventListener("keydown",this.checkHide.bind(this)),this.listbox.setHandleFocusChange(this.onFocusChange.bind(this))},a.ListboxButton.prototype.checkShow=function(t){switch(t.which||t.keyCode){case a.KeyCode.UP:case a.KeyCode.DOWN:t.preventDefault(),this.showListbox(),this.listbox.checkKeyPress(t)}},a.ListboxButton.prototype.checkHide=function(t){switch(t.which||t.keyCode){case a.KeyCode.RETURN:case a.KeyCode.ESC:t.preventDefault(),this.hideListbox(),this.button.focus()}},a.ListboxButton.prototype.showListbox=function(t){a.Utils.removeClass(this.listbox.listboxNode,"hidden"),this.button.setAttribute("aria-expanded","true"),!t||1!=t.which&&t.keyCode||(this.listbox.focusFirst=!0),this.listbox.listboxNode.focus()},a.ListboxButton.prototype.hideListbox=function(){a.Utils.addClass(this.listbox.listboxNode,"hidden"),this.button.removeAttribute("aria-expanded")},a.ListboxButton.prototype.onFocusChange=function(t){this.buttonContent.innerHTML=t.innerHTML};var d=a,c=n(379),l=n.n(c),u=n(198),h={insert:"head",singleton:!1};l()(u.Z,h),u.Z.locals;const p=e("settings-saved"),b=e("no-advanced-settings"),m=t=>fetch(`https://imgsdev.wpengine.com/json-api/${t}/`,{method:"GET",mode:"cors"}).then((t=>t.json())).then((t=>t.data)),f=async()=>(async(e,n,i,o,s)=>{const r=t=>0===t?void 0:t,a={settings:{subject:e?r(e.value):void 0,type:n?r(n.value):void 0,accommodation:i?r(i.value):void 0,source:o?o.id:void 0,setActiveTab:!!s,timestamp:(new Date).getTime()}};return new Promise((e=>{t.storage.local.set(a,e)}))})(i("ul#search-subject-list li[aria-selected='true']"),i("ul#search-type-list li[aria-selected='true']"),i("ul#search-acc-list li[aria-selected='true']"),i("ul#search-source-list li[aria-selected='true']"),e("active-tab").checked),v=(t,n,o,s)=>{const r=e(`search-${t}-button`),a=e(`search-${t}-list`);n.forEach((t=>{const e=document.createElement("li");if(e.setAttribute("role","option"),e.textContent=t.attributes.name,e.value=t.id,e.id=t.id,t.attributes.thumbnail){const n=document.createElement("img");n.src=t.attributes.thumbnail,n.alt="",e.prepend(n)}s(t)&&(a.setAttribute("aria-activedescendant",t.id),e.setAttribute("class","focused"),e.setAttribute("aria-selected","true"),o.removeAttribute("aria-selected"),o.classList.remove("focused")),a.append(e)}));const c=new d.Listbox(a),l=i("#search-"+t+"-button .content");new d.ListboxButton(r,c,l);const u=i("#search-"+t+'-list li[aria-selected="true"]');null!==u&&(l.innerHTML=u.innerHTML)};window.addEventListener("load",(async()=>{const n=(i=e("search-form"),s=e("loading-container"),r=e("loading-status"),a="Loading...",d="Content has loaded.",{loading:()=>{r.textContent=a,s.style.display="block"},finished:()=>{r.textContent=d,s.style.display="none",i.removeAttribute("hidden")}});var i,s,r,a,d;n.loading();const c=await o();let l=await(async()=>new Promise((e=>{t.storage.local.get(["options"],(t=>e(t.options)))})))();(void 0===l||(t=>(new Date).getTime()-t.timeStamp>1209600)(l))&&(l=await(async()=>{const t=[m("subjects"),m("types"),m("accommodations"),m("sources")];return Promise.all(t).then((t=>({subjects:t[0],types:t[1],accommodations:t[2],sources:t[3]})))})(),await(async e=>new Promise((n=>{e.timeStamp=(new Date).getTime(),t.storage.local.set({options:e},n)})))(l)),((t,n)=>{const i=e("search-subject-0"),o=e("search-type-0"),s=e("search-acc-0"),r=e("search-source-"),a=(t=>{const e=t=>!t.hasOwnProperty("relationships")||!t.relationships.hasOwnProperty("parent"),n=t=>(e,n)=>(e=t(e).toUpperCase())<(n=t(n).toUpperCase())?-1:e>n?1:0;var i;return t.filter(e).map((i=t.filter((t=>!e(t))),t=>(t.children=i.filter((e=>e.relationships.parent.data.id===t.id)).sort(n((t=>t.attributes.name))),t))).reduce(((t,e)=>(t.push({id:e.id,attributes:{name:e.attributes.name}}),e.children.forEach((n=>t.push({id:n.id,attributes:{name:[e.attributes.name,n.attributes.name].join(" - ")}}))),t)),[]).sort(n((t=>t.attributes.name)))})(t.subjects);v("subject",a,i,(t=>parseInt(t.id)===n.subject)),v("type",t.types,o,(t=>parseInt(t.id)===n.type)),v("acc",t.accommodations,s,(t=>parseInt(t.id)===n.accommodation)),v("source",t.sources,r,(t=>t.id===n.source))})(l,c),(t=>{const n=e("active-tab"),i=e("save-advanced-settings");n.checked=t.setActiveTab,i.addEventListener("click",(async function(){await f(),p.removeAttribute("hidden"),(t=>{t.style.display="none"})(b)}))})(c),n.finished(),c.notSet&&(t=>{t.style.display="block"})(b)}))}()}();