console.log("Content script has loaded via Manifest V3.");

chrome.runtime.sendMessage({ text: "what is my tab_id?" }, tabId => {
  console.log('My tabId is', tabId);
});
