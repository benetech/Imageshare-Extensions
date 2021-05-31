!function(){"use strict";var e={531:function(e,t,n){e.exports=n.p+"1bf7a6f4dd2582166c07.png"}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var s=t[o]={exports:{}};return e[o](s,s.exports,n),s.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}(),function(){const e={SEARCH:"search-only",WORKING:"working",READY:"reset",NOTIFICATION:"notification",GET_SELECTION:"get-selection"},t="content",o="standard",r="advanced",s={16:"./icons/Imageshare-logo-no-text-white-16x16.jpg",48:"./icons/Imageshare-logo-no-text-white-48x48.jpg",128:"./icons/Imageshare-logo-no-text-white-128x128.jpg",1024:"./icons/Imageshare-logo-no-text-white-1024x1024.jpg"},a="https://imgsdev.wpengine.com/json-api/resources/";var c=chrome;const i=async()=>new Promise((e=>{c.storage.local.get(["settings"],(t=>{if(void 0===t.settings)return e({subject:void 0,type:void 0,accommodation:void 0,source:void 0,setActiveTab:!1,notSet:!0});e(t.settings)}))})),d=e=>c.tabs.query({active:!0,currentWindow:!0},(t=>e(t[0]))),g=e=>fetch(e,{method:"GET"}).then((e=>e.json())).then((e=>e.data));var h=n(531);const u=(e,t)=>c.notifications.create("",{title:e,message:t,iconUrl:h,type:"basic"}),l=()=>{console.debug("Setting up right-click context menu");const e="selection",t="parent selection";c.contextMenus.create({title:"Imageshare Search",contexts:[e],id:t}),c.contextMenus.create({title:"Standard Search",contexts:[e],parentId:t,id:"imageshare-standard-search"}),c.contextMenus.create({title:"Advanced Search",contexts:[e],parentId:t,id:"imageshare-advanced-search"})};var m=c.browserAction;const p=e=>void 0===e||"0"==e?"":encodeURIComponent(e),f=e=>new Promise((e=>{i().then((t=>e(!!t.setActiveTab)))})).then((t=>c.tabs.create({url:e,active:t}))),b=e=>{return e.type===o?(e=>g(`${a}filter/?query=${e}`))(t=e.selection).then((e=>(m.setBadgeText({text:e.length.toString()}),0===e.length?(console.debug(`No results found for "${t}"`),u("No results",`"${t}" yielded no Imageshare entries.`)):1===e.length?(console.debug(`One result found for ${t}`),f(e[0].permalink),u("One match found","It has been opened in a new tab.")):(console.debug(`${e.length} results found for "${t}"`),f("https://imageshare.benetech.org/?page=search&q="+t),void u(`${e.length} matches for ${t}`,"These matches have been opened in a new tab."))))).catch((e=>console.error("Unable to fetch standard search query results from API",e))):e.type===r?i().then((t=>{(e=>e.notSet)(t)?(console.debug("No pre-existing criteria, notifying user."),u("No advanced search criteria set.","Configure advanced search criteria on options page."),c.runtime.openOptionsPage?c.runtime.openOptionsPage():window.open(c.runtime.getURL("options.html"))):((e,t,n,o,r)=>{const s=p(t),c=p(n),i=p(o),d=p(r);((e,t,n,o,r)=>g(`${a}filter/?query=${e}&subject=${t}&type=${n}&acc=${o}&src=${r}`))(e=encodeURIComponent(e),s,c,i,d).then((t=>{if(m.setBadgeText({text:t.length.toString()}),0===t.length)return console.debug(`No results found for "${e}"`),u(`No results found for ${e}`,"Try another selection or adjust your search criteria.");if(1===t.length){console.debug(`One result found for ${e}`);const n=t[0].permalink;return f(n),u("One match found","It has been opened in a new tab.")}console.debug(`${t.length} results found for "${e}"`),f("https://imageshare.benetech.org/?page=search&q="+e+"&subject="+s+"&type="+c+"&acc="+i+"&src="+d),u(`${t.length} matches for ${e}`,"These matches have been opened in a new tab.")})).catch((e=>console.error("Unable to fetch advanced search query results from API",e)))})(e.selection,t.subject,t.type,t.accommodation,t.source)})):void 0;var t},v=()=>{d((n=>{c.tabs.sendMessage(n.id,{command:e.WORKING,target:t})}))},w=()=>{d((n=>{c.tabs.sendMessage(n.id,{command:e.READY,target:t})}))};var x,I;x=(t,n)=>{const s=t.selectionText,a=t.menuItemId,c={"imageshare-standard-search":o,"imageshare-advanced-search":r};console.debug(`Menu item ${a} clicked with selection "${s}"`),v(),b({command:e.BACKGROUND_SEARCH,type:c[a],selection:s}).then(w)},I=(t,n,o)=>(console.debug("Background receiving message",t),"background"!==t.target&&o(),t.command&&t.command===e.NOTIFICATION&&u(t.title,t.message),t.command&&t.command===e.SEARCH&&(v(),b(t).then(w)),t.scheme&&"dark"===t.scheme&&(console.debug("Setting dark color scheme icons"),m.setIcon({path:s})),o(),!0),window.addEventListener("load",(()=>{c.runtime.onInstalled.addListener(l),c.contextMenus.onClicked.addListener(x),c.runtime.onMessage.addListener(I),console.debug("Background script loaded.")}))}()}();