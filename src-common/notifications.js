const webkit = browser => (title, message) => {
	browser.tabs.query({active: true, currentWindow: true}, tabs => {
    	browser.tabs.sendMessage(tabs[0].id, {
	    	type: 'notification',
				title: title,
                message: message,
                icon: '/screenshot.jpg'
            }, response => {
            	console.debug('response', response);
            }
        );
	});
};

const gecko = browser => (title, message) => {
    chrome.notifications.create('', {
		title: title,
        message: message,
        iconUrl: '/screenshot.jpg',
        type: 'basic'
    });
};

module.exports = {
	chrome: webkit,
	safari: webkit,
	gecko : gecko
};