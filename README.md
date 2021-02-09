# Imageshare-Extensions

Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.


This branch imageshare-call is home to our primary function, sending our
selection query to Imageshare.






***
Code for later
// import { registerMessageHandler } from 'axios-chrome-messaging-adapter';

// // register the adapter message handler
// registerMessageHandler();

// creating and managing cache
// const version = 1;const assetCacheName = `assets-${version}`;self.addEventListener("install", event => {  caches.open(assetCacheName).then(cache => {    // confidently do stuff with your very own cache  });});
// const version = 2;const assetCacheName = `assets-${version}`;self.addEventListener("activate", event => {  event.waitUntil(    caches.keys().then(cacheNames => {      return Promise.all(        cacheNames.map(cacheName => {          if (cacheName !== assetCacheName){            return caches.delete(cacheName);          }        });      );    });  );});

// chrome.scripting.executeScript({
//   function: showAlert(`No results found for ${selection}`)
// });
// chrome.scripting.executeScript({
//   function: showAlert(`${results.length} found for ${selection}`)
// });
