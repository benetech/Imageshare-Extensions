export const openImageshare = (browser, target) => {
    browser.tabs.create({
        url: target,
        active: false
    });
};

export const getUserSelection = () => {
    const selection = window.getSelection;
    return selection ? selection.toString : null;
};
