!function(){var n={198:function(n,e,t){"use strict";var o=t(645),r=t.n(o)()((function(n){return n[1]}));r.push([n.id,'::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\nbody {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 100%;\n  color: #222222;\n}\n\np {\n  margin: 0 2 0 2;\n}\n\nbutton {\n  margin: 10px;\n}\n\n.main-heading {\n  margin: 10px;\n}\n\n.popup {\n  margin-left: 10px;\n}\n\n/*Keyboard / Buttons*/\nkbd {\n  padding: 2px 4px;\n\tcolor: #fff;\n\tbackground-color: #333;\n\tborder-radius: 3px;\n\t-webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n\tfont-family: monospace, monospace;\n\tfont-size: 1em;\n\tbox-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n}\n\nkbd kbd { padding: 0;\n\tfont-size: 100%;\n\tfont-weight: bold;\n\t-webkit-box-shadow: none;\n  box-shadow: none;\n}\n\na {\n  color: #0c4471;\n  text-decoration: underline;\n}\n\n.h1 {\n  font-size: 2.125em;\n  color: #0c4471;\n  margin: 0;\n  clear: both;\n  font-weight: bold;\n}\n\n.legend {\n  font-size: 1.625em;\n  color: #0c4471;\n  margin: 0;\n}\n\n.submit-btn {\n  font-size: 22px;\n  color: white;\n  border: 1px solid #737369;\n  border-radius: 10px;\n  background-color: #0c4471;\n  height: 60px;\n  padding: 0 10px;\n  white-space: nowrap;\n  border: 1px solid #00275c;\n}\n\n.submit-btn:focus,\n.submit-btn:hover {\n    outline: 2px solid darkblue;\n}\n\n.submit-btn:focus,\n.submit-btn:active {\n  color: #0c4471;\n  background-color: white;\n}\n\n.submit-btn[disabled] {\n  border: 1px solid #aaa;\n  background-color: #d3d3d3;\n  color: #000;\n}\n\n.submit-btn:focus, .submit-btn:hover, .listbox-button:focus, .listbox-button:hover, #search:focus, #search:hover,\ninput:hover, input:focus {\n  outline: 2px solid darkblue;\n  /* add some space between the outline and the button for clearer focus indication */\n  outline-offset: 2px;\n  /* change the color of the button for added focus indication */\n  /* background-color: red; */\n}\n\n.refinements-wrapper {\n  clear: both;\n  justify-content: space-between;\n  padding: 20px 0 0 0;\n}\n\n.refinement {\n  margin-right: 5%;\n}\n\n/* popup.html views */\n.view-one {\n  display: block;\n}\n\n.view-two {\n  display: none;\n}\n\n.no-entry {\n  border-color: #AA0000;\n}\n\n#required {\n  color: #AA0000;\n  font-size: 12;\n}\n\nform[role="search"] .view-two {\n  display: none;\n}\n\nform[role="search"].no-selection .view-one {\n  display: none;\n}\n\nform[role="search"].no-selection .view-two {\n  display: block;\n}\n\n/* loading spinner */\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\np {\n  max-width:400px;\n}\n\n.spinner {\n  display: inline-block;\n  position: relative;\n  width: 80px;\n  height: 80px;\n}\n\n.spinner div {\n  animation: spinner 2.5s infinite;\n  transform-origin: 40px 40px;\n}\n\n.spinner div:after {\n  content: " ";\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  border: 3px solid #000;\n  background: #000;\n  margin: -4px 0 0 -4px;\n}\n\n.spinner div:nth-child(1):after {\n  top: 63px;\n  left: 63px;\n}\n\n.spinner div:nth-child(2) {\n  animation-delay: -0.025s;\n}\n\n.spinner div:nth-child(2):after {\n  top: 68px;\n  left: 56px;\n}\n\n.spinner div:nth-child(3) {\n  animation-delay: -0.05s;\n}\n\n.spinner div:nth-child(3):after {\n  top: 71px;\n  left: 48px;\n}\n\n.spinner div:nth-child(4) {\n  animation-delay: -0.075s;\n}\n\n.spinner div:nth-child(4):after {\n  top: 72px;\n  left: 40px;\n}\n\n.spinner div:nth-child(5) {\n  animation-delay: -0.1s;\n}\n\n.spinner div:nth-child(5):after {\n  top: 71px;\n  left: 32px;\n}\n\n@keyframes spinner {\n  0% {\n    transform: rotate(0deg);\n    opacity: 0;\n    animation-timing-function: ease-out;\n  }\n  20% {\n    opacity: 1;\n  }\n  80% {\n    opacity: 1;\n  }\n  100% {\n    transform: rotate(670deg);\n    opacity: 0;\n    animation-timing-function: ease-out;\n  }\n}\n\n@media screen and (prefers-reduced-motion: reduce), (update: slow) {\n  .spinner div {\n    display: none;\n  }\n\n  #loading-status {\n    position: relative;\n    width: auto;\n    height: auto;\n    padding: 10px;\n    overflow: hidden;\n    clip: auto;\n    white-space: nowrap;\n    border: 3px solid #0c4471;\n    color:#FFF;\n    font-size: 2rem;\n    background: #0c4471;\n  }\n\n  * {\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n  }\n}\n\n/* option styles */\n\n.hidden {\n  display: none !important;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.submit-btn:focus, .submit-btn:hover {\n  outline: 2px solid darkblue;\n}\n\n.submit-btn {\n  font-size: 22px;\n  color: white;\n  border: 1px solid #737369;\n  border-radius: 10px;\n  background-color: #0c4471;\n  height: 60px;\n  padding: 0 10px;\n  white-space: nowrap;\n  border: 1px solid #00275c;\n}\n\nbutton, [type="button"], [type="reset"], [type="submit"] {\n  -webkit-appearance: button;\n}\n\n[role="listbox"] {\n  margin: 1em 0 0;\n  padding: 0;\n  border: 1px solid #aaa;\n  background: white;\n}\n\n[role="option"] {\n  position: relative;\n  display: block;\n  padding: .2em;\n  line-height: 1.8em;\n}\n\n[aria-haspopup="listbox"] img {\n    max-height: 1em;\n}\n\n[role="option"] img {\n  max-width: 2em;\n}\n\n[role="option"].focused {\n  background: #bde4ff;\n}\n\nbutton[aria-haspopup="listbox"] {\n  position: relative;\n  min-width: 10em;\n  max-width: 16em;\n  padding-right: 1.5em;\n  text-align: left;\n  background-color: #fff;\n  border: 1px solid #000;\n  border-radius: 3px;\n}\n\nbutton[aria-haspopup="listbox"] .glyph {\n    display: none;\n    font-weight: bold;\n    font-size: 1.2em;\n    right: 5px;\n    top: -5px;\n    position: absolute;\n}\n\nbutton[aria-haspopup="listbox"] .glyph.collapse {\n    font-size: 1em;\n    top: 3px;\n}\n\nbutton[aria-haspopup="listbox"] .glyph.expand,\nbutton[aria-haspopup="listbox"][aria-expanded="true"] .glyph.collapse {\n    display: inline;\n}\n\nbutton[aria-haspopup="listbox"][aria-expanded="true"] .glyph.expand {\n    display: none;\n}\n\nbutton[aria-haspopup="listbox"] + [role="listbox"] {\n  position: absolute;\n  margin: 0;\n  max-width: 15em;\n  max-height: 100%;\n  border-top: 0;\n  overflow-y: auto;\n  z-index: 1;\n}\n\n/* options.html user settings*/\n.user-presets {\n  display: none;\n}\n\n#no-advanced-settings {\n  margin-top: 1em;\n  padding: 1em;\n  border: 2px solid red;\n  border-radius: 5px;\n  background-color: pink;\n\n  display: none;\n}\n\n/* May provide alternate styles for dark mode below */\n/* This may not be supported outside of Safari just yet */\n@media (prefers-color-scheme: dark) {\n  img {\n    filter: invert(1);\n  }\n}\n\n#settings-saved {\n  margin-top: 1em;\n  padding: 1em;\n  border: 2px solid green;\n  border-radius: 5px;\n  background-color: lightgreen;\n  display: inline-block;\n}\n\n#settings-saved[hidden] {\n  display: none;\n}\n\n@keyframes loading-spinner {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-spinner:before {\n  content: \'\';\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  margin-right: .2em;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-top-color: #000;\n  animation: loading-spinner 2s linear infinite;\n}\n\n@media screen and (prefers-reduced-motion: reduce), (update: slow) {\n  .loading-spinner {\n    display: none;\n  }\n}\n\n#find-terms + .loading-spinner {\n  display: none;\n}\n\n#find-terms[disabled] + .loading-spinner {\n  display: inline-block;\n}',""]),e.Z=r},645:function(n){"use strict";n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t=n(e);return e[2]?"@media ".concat(e[2]," {").concat(t,"}"):t})).join("")},e.i=function(n,t,o){"string"==typeof n&&(n=[[null,n,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var d=0;d<n.length;d++){var s=[].concat(n[d]);o&&r[s[0]]||(t&&(s[2]?s[2]="".concat(t," and ").concat(s[2]):s[2]=t),e.push(s))}},e}},302:function(n,e,t){var o,r,i;
/**
 * findAndReplaceDOMText v 0.4.6
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */i=function(){var n="first",e=document,t={}.hasOwnProperty;function o(){return r.apply(null,arguments)||i.apply(null,arguments)}function r(n,e,t,r,a){if(e&&!e.nodeType&&arguments.length<=2)return!1;var d,s="function"==typeof t;s&&(d=t,t=function(n,e){return d(n.text,e.startIndex)});var p=i(e,{find:n,wrap:s?null:t,replace:s?t:"$"+(r||"&"),prepMatch:function(n,e){if(!n[0])throw"findAndReplaceDOMText cannot handle zero-length matches";if(r>0){var t=n[r];n.index+=n[0].indexOf(t),n[0]=t}return n.endIndex=n.index+n[0].length,n.startIndex=n.index,n.index=e,n},filterElements:a});return o.revert=function(){return p.revert()},!0}function i(n,e){return new a(n,e)}function a(n,e){var r=e.preset&&o.PRESETS[e.preset];if(e.portionMode=e.portionMode||"retain",r)for(var i in r)t.call(r,i)&&!t.call(e,i)&&(e[i]=r[i]);this.node=n,this.options=e,this.prepMatch=e.prepMatch||this.prepMatch,this.reverts=[],this.matches=this.search(),this.matches.length&&this.processMatches()}return o.NON_PROSE_ELEMENTS={br:1,hr:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1},o.NON_CONTIGUOUS_PROSE_ELEMENTS={address:1,article:1,aside:1,blockquote:1,dd:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,nav:1,noscript:1,ol:1,output:1,p:1,pre:1,section:1,ul:1,br:1,li:1,summary:1,dt:1,details:1,rp:1,rt:1,rtc:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1,table:1,tbody:1,thead:1,th:1,tr:1,td:1,caption:1,col:1,tfoot:1,colgroup:1},o.NON_INLINE_PROSE=function(n){return t.call(o.NON_CONTIGUOUS_PROSE_ELEMENTS,n.nodeName.toLowerCase())},o.PRESETS={prose:{forceContext:o.NON_INLINE_PROSE,filterElements:function(n){return!t.call(o.NON_PROSE_ELEMENTS,n.nodeName.toLowerCase())}}},o.Finder=a,a.prototype={search:function(){var n,e=0,t=0,o=this.options.find,r=this.getAggregateText(),i=[],a=this;return o="string"==typeof o?RegExp(String(o).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"):o,function r(d){for(var s=0,p=d.length;s<p;++s){var l=d[s];if("string"==typeof l){if(o.global)for(;n=o.exec(l);)i.push(a.prepMatch(n,e++,t));else(n=l.match(o))&&i.push(a.prepMatch(n,0,t));t+=l.length}else r(l)}}(r),i},prepMatch:function(n,e,t){if(!n[0])throw new Error("findAndReplaceDOMText cannot handle zero-length matches");return n.endIndex=t+n.index+n[0].length,n.startIndex=t+n.index,n.index=e,n},getAggregateText:function(){var n=this.options.filterElements,e=this.options.forceContext;return function t(o){if(o.nodeType===Node.TEXT_NODE)return[o.data];if(n&&!n(o))return[];var r=[""],i=0;if(o=o.firstChild)do{if(o.nodeType!==Node.TEXT_NODE){var a=t(o);e&&o.nodeType===Node.ELEMENT_NODE&&(!0===e||e(o))?(r[++i]=a,r[++i]=""):("string"==typeof a[0]&&(r[i]+=a.shift()),a.length&&(r[++i]=a,r[++i]=""))}else r[i]+=o.data}while(o=o.nextSibling);return r}(this.node)},processMatches:function(){var n,e,t,o=this.matches,r=this.node,i=this.options.filterElements,a=[],d=r,s=o.shift(),p=0,l=0,c=[r];n:for(;;){if(d.nodeType===Node.TEXT_NODE&&(!e&&d.length+p>=s.endIndex?e={node:d,index:l++,text:d.data.substring(s.startIndex-p,s.endIndex-p),indexInMatch:0===p?0:p-s.startIndex,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,isEnd:!0}:n&&a.push({node:d,index:l++,text:d.data,indexInMatch:p-s.startIndex,indexInNode:0}),!n&&d.length+p>s.startIndex&&(n={node:d,index:l++,indexInMatch:0,indexInNode:s.startIndex-p,endIndexInNode:s.endIndex-p,text:d.data.substring(s.startIndex-p,s.endIndex-p)}),p+=d.data.length),t=d.nodeType===Node.ELEMENT_NODE&&i&&!i(d),n&&e){if(d=this.replaceMatch(s,n,a,e),p-=e.node.data.length-e.endIndexInNode,n=null,e=null,a=[],l=0,!(s=o.shift()))break}else if(!t&&(d.firstChild||d.nextSibling)){d.firstChild?(c.push(d),d=d.firstChild):d=d.nextSibling;continue}for(;;){if(d.nextSibling){d=d.nextSibling;break}if((d=c.pop())===r)break n}}},revert:function(){for(var n=this.reverts.length;n--;)this.reverts[n]();this.reverts=[]},prepareReplacementString:function(e,t,o){var r=this.options.portionMode;return r===n&&t.indexInMatch>0?"":(e=e.replace(/\$(\d+|&|`|')/g,(function(n,e){var t;switch(e){case"&":t=o[0];break;case"`":t=o.input.substring(0,o.startIndex);break;case"'":t=o.input.substring(o.endIndex);break;default:t=o[+e]||""}return t})),r===n?e:t.isEnd?e.substring(t.indexInMatch):e.substring(t.indexInMatch,t.indexInMatch+t.text.length))},getPortionReplacementNode:function(n,t){var o=this.options.replace||"$&",r=this.options.wrap,i=this.options.wrapClass;if(r&&r.nodeType){var a=e.createElement("div");a.innerHTML=r.outerHTML||(new XMLSerializer).serializeToString(r),r=a.firstChild}if("function"==typeof o)return(o=o(n,t))&&o.nodeType?o:e.createTextNode(String(o));var d="string"==typeof r?e.createElement(r):r;return d&&i&&(d.className=i),(o=e.createTextNode(this.prepareReplacementString(o,n,t))).data&&d?(d.appendChild(o),d):o},replaceMatch:function(n,t,o,r){var i,a,d=t.node,s=r.node;if(d===s){var p=d;t.indexInNode>0&&(i=e.createTextNode(p.data.substring(0,t.indexInNode)),p.parentNode.insertBefore(i,p));var l=this.getPortionReplacementNode(r,n);return p.parentNode.insertBefore(l,p),r.endIndexInNode<p.length&&(a=e.createTextNode(p.data.substring(r.endIndexInNode)),p.parentNode.insertBefore(a,p)),p.parentNode.removeChild(p),this.reverts.push((function(){i===l.previousSibling&&i.parentNode.removeChild(i),a===l.nextSibling&&a.parentNode.removeChild(a),l.parentNode.replaceChild(p,l)})),l}i=e.createTextNode(d.data.substring(0,t.indexInNode)),a=e.createTextNode(s.data.substring(r.endIndexInNode));for(var c=this.getPortionReplacementNode(t,n),u=[],h=0,f=o.length;h<f;++h){var m=o[h],b=this.getPortionReplacementNode(m,n);m.node.parentNode.replaceChild(b,m.node),this.reverts.push(function(n,e){return function(){e.parentNode.replaceChild(n.node,e)}}(m,b)),u.push(b)}var g=this.getPortionReplacementNode(r,n);return d.parentNode.insertBefore(i,d),d.parentNode.insertBefore(c,d),d.parentNode.removeChild(d),s.parentNode.insertBefore(g,s),s.parentNode.insertBefore(a,s),s.parentNode.removeChild(s),this.reverts.push((function(){i.parentNode.removeChild(i),c.parentNode.replaceChild(d,c),a.parentNode.removeChild(a),g.parentNode.replaceChild(s,g)})),g}},o},n.exports?n.exports=i():void 0===(r="function"==typeof(o=i)?o.call(e,t,e,n):o)||(n.exports=r)},379:function(n,e,t){"use strict";var o,r=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},i=function(){var n={};return function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}n[e]=t}return n[e]}}(),a=[];function d(n){for(var e=-1,t=0;t<a.length;t++)if(a[t].identifier===n){e=t;break}return e}function s(n,e){for(var t={},o=[],r=0;r<n.length;r++){var i=n[r],s=e.base?i[0]+e.base:i[0],p=t[s]||0,l="".concat(s," ").concat(p);t[s]=p+1;var c=d(l),u={css:i[1],media:i[2],sourceMap:i[3]};-1!==c?(a[c].references++,a[c].updater(u)):a.push({identifier:l,updater:b(u,e),references:1}),o.push(l)}return o}function p(n){var e=document.createElement("style"),o=n.attributes||{};if(void 0===o.nonce){var r=t.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(n){e.setAttribute(n,o[n])})),"function"==typeof n.insert)n.insert(e);else{var a=i(n.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var l,c=(l=[],function(n,e){return l[n]=e,l.filter(Boolean).join("\n")});function u(n,e,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(n.styleSheet)n.styleSheet.cssText=c(e,r);else{var i=document.createTextNode(r),a=n.childNodes;a[e]&&n.removeChild(a[e]),a.length?n.insertBefore(i,a[e]):n.appendChild(i)}}function h(n,e,t){var o=t.css,r=t.media,i=t.sourceMap;if(r?n.setAttribute("media",r):n.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleSheet)n.styleSheet.cssText=o;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(o))}}var f=null,m=0;function b(n,e){var t,o,r;if(e.singleton){var i=m++;t=f||(f=p(e)),o=u.bind(null,t,i,!1),r=u.bind(null,t,i,!0)}else t=p(e),o=h.bind(null,t,e),r=function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(t)};return o(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap)return;o(n=e)}else r()}}n.exports=function(n,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var t=s(n=n||[],e);return function(n){if(n=n||[],"[object Array]"===Object.prototype.toString.call(n)){for(var o=0;o<t.length;o++){var r=d(t[o]);a[r].references--}for(var i=s(n,e),p=0;p<t.length;p++){var l=d(t[p]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}t=i}}}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={id:o,exports:{}};return n[o].call(i.exports,i,i.exports,t),i.exports}t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,{a:e}),e},t.d=function(n,e){for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},function(){"use strict";var n=chrome;const e=n=>document.getElementById(n),o=e=>n.tabs.query({active:!0,currentWindow:!0},(n=>e(n[0])));t(302);const r="search-only",i="get-selection",a="find-terms",d="content",s="background",p="standard",l="advanced",c=e=>new Promise((t=>{n.storage.local.set({terms:e},(()=>t(e)))})),u=()=>fetch("https://imgsdev.wpengine.com/json-api/terms",{method:"GET",mode:"cors"}).then((n=>n.json())).then((n=>n.data)),h=()=>new Promise((e=>{n.storage.local.get(["terms"],(n=>e(n.terms)))})).then((n=>void 0===n?u().then(c):n));var f=t(379),m=t.n(f),b=t(198),g={insert:"head",singleton:!1};m()(b.Z,g),b.Z.locals;const x=()=>e("search").value,v=()=>{var n;(n='form[role="search"]',document.querySelector(n)).classList.add("no-selection")},y=()=>{const e={command:r,target:s,type:p,selection:x()};n.runtime.sendMessage(e,(n=>console.debug("standard search response",n)))},N=()=>{const e={command:r,target:s,type:l,selection:x()};n.runtime.sendMessage(e,(n=>console.debug("advanced search response",n)))},w=function(){const e=this;e.setAttribute("disabled",""),h().then((t=>{const r={command:a,target:d,terms:t};o((t=>((e,t,o)=>new Promise((r=>{n.tabs.sendMessage(e,t,o,r)})))(t.id,r,void 0).then((()=>{e.removeAttribute("disabled")}))))}))};window.addEventListener("load",(()=>{e("standard-search").addEventListener("click",y),e("advanced-search").addEventListener("click",N),e("find-terms").addEventListener("click",w),new Promise((e=>{o((t=>{const o={command:i,target:d};n.tabs.sendMessage(t.id,o,e)}))})).then((n=>{if(null===n)return v();var t;t=n,e("search").value=t})),console.debug("Popup handler loaded")}))}()}();