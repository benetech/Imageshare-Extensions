import browser from 'get-browser';
import setupMessageHandling from 'setup-message-handling';

console.debug(`Loading Imageshare extension in ${environment.name} mode`);

if (environment.isDevelopment) {
  browser.storage.local.clear();
}

setupMessageHandling();

console.debug('Loaded extension - MV2');