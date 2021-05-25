import browser from 'get-browser';

const MENU_ID = "Options";

const onMenuCreation = id => () => {
  if (browser.runtime.lastError) {
    console.error(`Error creating menu item ${id}: ${browser.runtime.lastError}`);
  } else {
    console.debug(`Menu item ${id} created successfully.`);
  }
};

const createFirefoxBookmarkMenuItem = () => {
  console.debug('Setting up bookmark menu item')

  const onBookmarkCreation = () => {
    if (browser.runtime.lastError) {
      return console.debug(`Error creating bookmark menu item: ${browser.runtime.lastError}`);
    }

    console.debug('Bookmark menu item created successfully');

    // create listener for this item that launches Options page onClick
    browser.menus.onClicked.addListener((info, _tab) => {
      if (info.menuItemId === MENU_ID)
      if (browser.runtime.openOptionsPage) {
        browser.runtime.openOptionsPage();
      } else {
        window.open(browser.runtime.getURL('options.html'));
      }
    })
  };

  browser.menus.create({
    id: MENU_ID,
    type: 'normal',
    title: 'Options',
    contexts: ['browser_action'],
  }, onBookmarkCreation);
};

export default () => {
  console.debug('Setting up right-click context menu');

  const context = 'selection';

  // firefox does not support parent-child menus
  browser.contextMenus.create({
    title: 'Imageshare standard search',
    contexts: [context],
    id: 'imageshare-standard-search'
  }, onMenuCreation('imageshare-standard-search'));

  browser.contextMenus.create({
    title: 'Imageshare advanced search',
    contexts: [context],
    id: 'imageshare-advanced-search'
  }, onMenuCreation('imageshare-advanced-search'));

  createFirefoxBookmarkMenuItem();
};
