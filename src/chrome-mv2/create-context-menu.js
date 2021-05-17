import browser from 'get-browser';

const createContextMenu = () => {
  console.debug('Setting up right-click context menu');

  const context = 'selection';
  const title = 'Imageshare Search';
  const menuId = `parent ${context}`;

  // Create a parent item and two children.
  browser.contextMenus.create({
    title: title,
    contexts: [context],
    id: menuId
  });

  browser.contextMenus.create({
    title: 'Standard Search',
    contexts: [context],
    parentId: menuId,
    id: 'imageshare-standard-search'
  });

  browser.contextMenus.create({
    title: 'Advanced Search',
    contexts:[context],
    parentId: menuId,
    id: 'imageshare-advanced-search'
  });
}

export default () => {
  browser.runtime.onInstalled.addListener(createContextMenu);
}