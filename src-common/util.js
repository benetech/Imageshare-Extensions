module.exports = {
	getBrowser: () => {
		if (chrome !== undefined) {
    		return chrome;
  		}
  
  		if (browser !== undefined) {
    		return browser;
  		}
  
  		throw new ReferenceError('Unable to obtain browser object');
	},

	openImageshare: (browser, target) => {
    	browser.tabs.create({
      		url: target,
         	active: false
      	});
	},

	getUserSelection: () => {
		const selection = window.getSelection;
		return selection ? selection.toString : null;
	}
}
