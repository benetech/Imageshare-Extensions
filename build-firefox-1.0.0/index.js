!function(){"use strict";var e=browser;const o=["Imageshare Browser Extension","firefox","1.0.0","production"];console.debug("Loading:",o.join(" • ")),e.runtime.onMessage.addListener(((e,o,n)=>{if(console.debug("Index receiving message",e),"content"!==e.target)return!0;if("get-selection"===e.command){const e=(window.getSelection?window.getSelection().toString():"").trim();e.length&&n(e),n(null)}return"working"===e.command&&(document.body.style.cursor="wait"),"reset"===e.command&&(document.body.style.cursor="default"),!0})),window.matchMedia("(prefers-color-scheme: dark)").matches&&(console.debug("Switching to dark theme."),chrome.runtime.sendMessage({target:"background",scheme:"dark"})),console.debug("Content script ready:",o.join(" • "))}();