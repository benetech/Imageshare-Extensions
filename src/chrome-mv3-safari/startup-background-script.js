import browser from 'get-browser';
import createContextMenu from 'create-context-menu';

export default (onContextMenuClick, onExtensionMessage) => {
  createContextMenu();

  browser.contextMenus.onClicked.addListener(onContextMenuClick);
  browser.runtime.onMessage.addListener(onExtensionMessage);
    
  console.debug('Background script loaded.');
};