!function(){var e={994:function(e,n,t){"use strict";var r=t(645),o=t.n(r)()((function(e){return e[1]}));o.push([e.id,'::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n  \nbody {\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 100%;\n  color: #222222;\n  \n  min-width: 22em;\n}\n  \nh1 img {\n  max-height: 1em;\n}\n\n/* Keyboard / Buttons */\nkbd {\n  padding: 2px 4px;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n  font-family: monospace, monospace;\n  font-size: 1em;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n}\n\nkbd kbd { padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n\na {\n  color: #0c4471;\n  text-decoration: underline;\n}\n\n.field-group {\n  margin-bottom: 1em;\n}\n\n.field-group label {\n  display: block;\n  margin-bottom: .5em;\n}\n\n.submit-btn {\n  font-size: 1.2em;\n  color: white;\n  border: 1px solid #737369;\n  border-radius: 10px;\n  background-color: #0c4471;\n  padding: .3em .5em;\n  white-space: nowrap;\n  border: 1px solid #00275c;\n}\n\n.submit-btn:focus,\n.submit-btn:hover {\n  outline: 2px solid darkblue;\n}\n\n.submit-btn:focus,\n.submit-btn:active {\n  color: #0c4471;\n  background-color: white;\n}\n\n.submit-btn[disabled] {\n  border: 1px solid #aaa;\n  background-color: #d3d3d3;\n  color: #000;\n}\n\n.submit-btn:focus, .submit-btn:hover, .listbox-button:focus, .listbox-button:hover, #search:focus, #search:hover,\ninput:hover, input:focus {\n  outline: 2px solid darkblue;\n  /* add some space between the outline and the button for clearer focus indication */\n  outline-offset: 2px;\n  /* change the color of the button for added focus indication */\n  /* background-color: red; */\n}\n\n.validation-hint {\n  display: none;\n  border: 1px solid #aa0000;\n  border-radius: 5px;\n  padding: .2em;\n  margin-bottom: .5em;\n  background: pink;\n}\n\n\n.validation-error .validation-hint {\n  display: inline-block;\n}\n\n.validation-error #search {\n  border-color: #AA0000;\n}\n\n.required {\n  color: #AA0000;\n}\n\n@keyframes loading-spinner {\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n.loading-spinner:before {\n  content: \'\';\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  margin-right: .2em;\n  border-radius: 50%;\n  border: 2px solid #ccc;\n  border-top-color: #000;\n  animation: loading-spinner 2s linear infinite;\n}\n\n@media screen and (prefers-reduced-motion: reduce), (update: slow) {\n  .loading-spinner {\n    display: none;\n  }\n}\n\n#find-terms + .loading-spinner,\n#search-buttons .loading-spinner {\n  display: none;\n}\n\n#find-terms[disabled] + .loading-spinner,\n#search-buttons.searching .loading-spinner {\n  display: inline-block;\n}\n\n#search-buttons.searching .loading-spinner {\n  margin-top: .5em;\n}\n\n/* May provide alternate styles for dark mode below */\n/* This may not be supported outside of Safari just yet */\n/* @media (prefers-color-scheme: dark) {\n  img {\n    filter: invert(1);\n  }\n} */\n\n#search-results > * {\n  display: none;\n}\n\n#search-results[data-results="false"] .without-results,\n#search-results[data-results="true"] .with-results {\n  display: block;\n  margin-top: .5em;\n  border: 1px dashed #999;\n  padding: .5em;\n}\n\n#search-results label {\n  display: inline-block;\n  margin-bottom: .5em;\n}',""]),n.Z=o},645:function(e){"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,r){"string"==typeof e&&(e=[[null,e,""]]);var o={};if(r)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(o[a]=!0)}for(var s=0;s<e.length;s++){var d=[].concat(e[s]);r&&o[d[0]]||(t&&(d[2]?d[2]="".concat(t," and ").concat(d[2]):d[2]=t),n.push(d))}},n}},302:function(e,n,t){var r,o,i;
/**
 * findAndReplaceDOMText v 0.4.6
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */i=function(){var e="first",n=document,t={}.hasOwnProperty;function r(){return o.apply(null,arguments)||i.apply(null,arguments)}function o(e,n,t,o,a){if(n&&!n.nodeType&&arguments.length<=2)return!1;var s,d="function"==typeof t;d&&(s=t,t=function(e,n){return s(e.text,n.startIndex)});var c=i(n,{find:e,wrap:d?null:t,replace:d?t:"$"+(o||"&"),prepMatch:function(e,n){if(!e[0])throw"findAndReplaceDOMText cannot handle zero-length matches";if(o>0){var t=e[o];e.index+=e[0].indexOf(t),e[0]=t}return e.endIndex=e.index+e[0].length,e.startIndex=e.index,e.index=n,e},filterElements:a});return r.revert=function(){return c.revert()},!0}function i(e,n){return new a(e,n)}function a(e,n){var o=n.preset&&r.PRESETS[n.preset];if(n.portionMode=n.portionMode||"retain",o)for(var i in o)t.call(o,i)&&!t.call(n,i)&&(n[i]=o[i]);this.node=e,this.options=n,this.prepMatch=n.prepMatch||this.prepMatch,this.reverts=[],this.matches=this.search(),this.matches.length&&this.processMatches()}return r.NON_PROSE_ELEMENTS={br:1,hr:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1},r.NON_CONTIGUOUS_PROSE_ELEMENTS={address:1,article:1,aside:1,blockquote:1,dd:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,nav:1,noscript:1,ol:1,output:1,p:1,pre:1,section:1,ul:1,br:1,li:1,summary:1,dt:1,details:1,rp:1,rt:1,rtc:1,script:1,style:1,img:1,video:1,audio:1,canvas:1,svg:1,map:1,object:1,input:1,textarea:1,select:1,option:1,optgroup:1,button:1,table:1,tbody:1,thead:1,th:1,tr:1,td:1,caption:1,col:1,tfoot:1,colgroup:1},r.NON_INLINE_PROSE=function(e){return t.call(r.NON_CONTIGUOUS_PROSE_ELEMENTS,e.nodeName.toLowerCase())},r.PRESETS={prose:{forceContext:r.NON_INLINE_PROSE,filterElements:function(e){return!t.call(r.NON_PROSE_ELEMENTS,e.nodeName.toLowerCase())}}},r.Finder=a,a.prototype={search:function(){var e,n=0,t=0,r=this.options.find,o=this.getAggregateText(),i=[],a=this;return r="string"==typeof r?RegExp(String(r).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1"),"g"):r,function o(s){for(var d=0,c=s.length;d<c;++d){var l=s[d];if("string"==typeof l){if(r.global)for(;e=r.exec(l);)i.push(a.prepMatch(e,n++,t));else(e=l.match(r))&&i.push(a.prepMatch(e,0,t));t+=l.length}else o(l)}}(o),i},prepMatch:function(e,n,t){if(!e[0])throw new Error("findAndReplaceDOMText cannot handle zero-length matches");return e.endIndex=t+e.index+e[0].length,e.startIndex=t+e.index,e.index=n,e},getAggregateText:function(){var e=this.options.filterElements,n=this.options.forceContext;return function t(r){if(r.nodeType===Node.TEXT_NODE)return[r.data];if(e&&!e(r))return[];var o=[""],i=0;if(r=r.firstChild)do{if(r.nodeType!==Node.TEXT_NODE){var a=t(r);n&&r.nodeType===Node.ELEMENT_NODE&&(!0===n||n(r))?(o[++i]=a,o[++i]=""):("string"==typeof a[0]&&(o[i]+=a.shift()),a.length&&(o[++i]=a,o[++i]=""))}else o[i]+=r.data}while(r=r.nextSibling);return o}(this.node)},processMatches:function(){var e,n,t,r=this.matches,o=this.node,i=this.options.filterElements,a=[],s=o,d=r.shift(),c=0,l=0,u=[o];e:for(;;){if(s.nodeType===Node.TEXT_NODE&&(!n&&s.length+c>=d.endIndex?n={node:s,index:l++,text:s.data.substring(d.startIndex-c,d.endIndex-c),indexInMatch:0===c?0:c-d.startIndex,indexInNode:d.startIndex-c,endIndexInNode:d.endIndex-c,isEnd:!0}:e&&a.push({node:s,index:l++,text:s.data,indexInMatch:c-d.startIndex,indexInNode:0}),!e&&s.length+c>d.startIndex&&(e={node:s,index:l++,indexInMatch:0,indexInNode:d.startIndex-c,endIndexInNode:d.endIndex-c,text:s.data.substring(d.startIndex-c,d.endIndex-c)}),c+=s.data.length),t=s.nodeType===Node.ELEMENT_NODE&&i&&!i(s),e&&n){if(s=this.replaceMatch(d,e,a,n),c-=n.node.data.length-n.endIndexInNode,e=null,n=null,a=[],l=0,!(d=r.shift()))break}else if(!t&&(s.firstChild||s.nextSibling)){s.firstChild?(u.push(s),s=s.firstChild):s=s.nextSibling;continue}for(;;){if(s.nextSibling){s=s.nextSibling;break}if((s=u.pop())===o)break e}}},revert:function(){for(var e=this.reverts.length;e--;)this.reverts[e]();this.reverts=[]},prepareReplacementString:function(n,t,r){var o=this.options.portionMode;return o===e&&t.indexInMatch>0?"":(n=n.replace(/\$(\d+|&|`|')/g,(function(e,n){var t;switch(n){case"&":t=r[0];break;case"`":t=r.input.substring(0,r.startIndex);break;case"'":t=r.input.substring(r.endIndex);break;default:t=r[+n]||""}return t})),o===e?n:t.isEnd?n.substring(t.indexInMatch):n.substring(t.indexInMatch,t.indexInMatch+t.text.length))},getPortionReplacementNode:function(e,t){var r=this.options.replace||"$&",o=this.options.wrap,i=this.options.wrapClass;if(o&&o.nodeType){var a=n.createElement("div");a.innerHTML=o.outerHTML||(new XMLSerializer).serializeToString(o),o=a.firstChild}if("function"==typeof r)return(r=r(e,t))&&r.nodeType?r:n.createTextNode(String(r));var s="string"==typeof o?n.createElement(o):o;return s&&i&&(s.className=i),(r=n.createTextNode(this.prepareReplacementString(r,e,t))).data&&s?(s.appendChild(r),s):r},replaceMatch:function(e,t,r,o){var i,a,s=t.node,d=o.node;if(s===d){var c=s;t.indexInNode>0&&(i=n.createTextNode(c.data.substring(0,t.indexInNode)),c.parentNode.insertBefore(i,c));var l=this.getPortionReplacementNode(o,e);return c.parentNode.insertBefore(l,c),o.endIndexInNode<c.length&&(a=n.createTextNode(c.data.substring(o.endIndexInNode)),c.parentNode.insertBefore(a,c)),c.parentNode.removeChild(c),this.reverts.push((function(){i===l.previousSibling&&i.parentNode.removeChild(i),a===l.nextSibling&&a.parentNode.removeChild(a),l.parentNode.replaceChild(c,l)})),l}i=n.createTextNode(s.data.substring(0,t.indexInNode)),a=n.createTextNode(d.data.substring(o.endIndexInNode));for(var u=this.getPortionReplacementNode(t,e),p=[],h=0,f=r.length;h<f;++h){var m=r[h],g=this.getPortionReplacementNode(m,e);m.node.parentNode.replaceChild(g,m.node),this.reverts.push(function(e,n){return function(){n.parentNode.replaceChild(e.node,n)}}(m,g)),p.push(g)}var b=this.getPortionReplacementNode(o,e);return s.parentNode.insertBefore(i,s),s.parentNode.insertBefore(u,s),s.parentNode.removeChild(s),d.parentNode.insertBefore(b,d),d.parentNode.insertBefore(a,d),d.parentNode.removeChild(d),this.reverts.push((function(){i.parentNode.removeChild(i),u.parentNode.replaceChild(s,u),a.parentNode.removeChild(a),b.parentNode.replaceChild(d,b)})),b}},r},e.exports?e.exports=i():void 0===(o="function"==typeof(r=i)?r.call(n,t,n,e):r)||(e.exports=o)},379:function(e,n,t){"use strict";var r,o=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),a=[];function s(e){for(var n=-1,t=0;t<a.length;t++)if(a[t].identifier===e){n=t;break}return n}function d(e,n){for(var t={},r=[],o=0;o<e.length;o++){var i=e[o],d=n.base?i[0]+n.base:i[0],c=t[d]||0,l="".concat(d," ").concat(c);t[d]=c+1;var u=s(l),p={css:i[1],media:i[2],sourceMap:i[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:l,updater:g(p,n),references:1}),r.push(l)}return r}function c(e){var n=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var o=t.nc;o&&(r.nonce=o)}if(Object.keys(r).forEach((function(e){n.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(n);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var l,u=(l=[],function(e,n){return l[e]=n,l.filter(Boolean).join("\n")});function p(e,n,t,r){var o=t?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=u(n,o);else{var i=document.createTextNode(o),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(i,a[n]):e.appendChild(i)}}function h(e,n,t){var r=t.css,o=t.media,i=t.sourceMap;if(o?e.setAttribute("media",o):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var f=null,m=0;function g(e,n){var t,r,o;if(n.singleton){var i=m++;t=f||(f=c(n)),r=p.bind(null,t,i,!1),o=p.bind(null,t,i,!0)}else t=c(n),r=h.bind(null,t,n),o=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return r(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;r(e=n)}else o()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=o());var t=d(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<t.length;r++){var o=s(t[r]);a[o].references--}for(var i=d(e,n),c=0;c<t.length;c++){var l=s(t[c]);0===a[l].references&&(a[l].updater(),a.splice(l,1))}t=i}}}}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,{a:n}),n},t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){"use strict";var e=browser;const n=e=>document.getElementById(e),r=e=>document.querySelector(e),o=n=>e.tabs.query({active:!0,currentWindow:!0},(e=>n(e[0])));t(302);const i="search-only",a="get-selection",s="find-terms",d="view-term",c="content",l="background",u="standard",p="advanced",h=n=>new Promise((t=>{e.storage.local.set({terms:n},(()=>t(n)))})),f=()=>fetch("https://imgsdev.wpengine.com/json-api/terms",{method:"GET",mode:"cors"}).then((e=>e.json())).then((e=>e.data)),m=()=>new Promise((n=>{e.storage.local.get(["terms"],(e=>n(e.terms)))})).then((e=>void 0===e?f().then(h):e));var g=(n,t,r)=>e.tabs.sendMessage(n,t,r),b=t(379),v=t.n(b),x=t(994),N={insert:"head",singleton:!1};v()(x.Z,N),x.Z.locals;const y=e=>()=>{const t=n("search").value;if(""===t.trim())return r(".search-term.field-group").classList.add("validation-error"),void n("no-search-keyword").focus();r(".search-term.field-group").classList.remove("validation-error"),e(t)},E=t=>{n("search-buttons").classList.add("searching");const r={command:i,target:l,type:u,selection:t};e.runtime.sendMessage(r,(e=>n("search-buttons").classList.remove("searching")))},w=t=>{n("search-buttons").classList.add("searching");const r={command:i,target:l,type:p,selection:t};e.runtime.sendMessage(r,(e=>n("search-buttons").classList.remove("searching")))},I=function(){const e=this;e.setAttribute("disabled",""),m().then((t=>{const i={command:s,target:c,terms:t};o((t=>g(t.id,i,void 0).then((t=>{(e=>{if(n("search-results").dataset.results=!!e.length,0===e.length)return;const t=r("#search-results label"),i=r("#search-results select"),a=n("view-term");t.textContent=e.length+" keywords found in dpage.",t.focus(),e.sort().forEach((e=>{const n=document.createElement("option");n.value=e,n.textContent=e,i.appendChild(n)})),a.addEventListener("click",(()=>{const e=i.selectedOptions[0],n={command:d,target:c,term:e.value};o((e=>g(e.id,n,void 0)))}))})(t),e.removeAttribute("disabled")}))))}))};window.addEventListener("load",(()=>{n("standard-search").addEventListener("click",y(E)),n("advanced-search").addEventListener("click",y(w)),n("find-terms").addEventListener("click",I),new Promise((n=>{o((t=>{const r={command:a,target:c};e.tabs.sendMessage(t.id,r,n)}))})).then((e=>{var t;null!==e&&(t=e,n("search").value=t)})),console.debug("Popup handler loaded")}))}()}();