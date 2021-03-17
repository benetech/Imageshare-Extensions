import { openImageshare } from './util';
import notification from 'show-notification';

background.jsconsole.log("Background has loaded via background.js.");

const doStandardSearch = selection => doSearch(
	'https://imgsdev.wpengine.com/json-api/resources/',
	'https://imageshare.benetech.org/?page=search&q=' + encodeURIComponent(selection)	
);

const doAdvancedSearch = (selection, subject, type, accommodation, source) => doSearch(
	`https://imgsdev.wpengine.com/json-api/resources/filter/?query=${selection}&subject=${subject}&type=${type}&acc=${accommodation}&src=${source}`,
	'https://imageshare.benetech.org/?page=search&q=' + encodeURIComponent(selection)
);

const doSearch = (requestUrl, resultsUrl) => {
	fetch(requestUrl)
		.then(response => response.json())
		.then(json => {
			const results = json.data;
			if (!results.length) {
				notification(`No results found for ${selection}`, 'Please try another selection');
			} else {
				// FIXME via import
				openImageshare($resultsUrl);
				notification(
					`${results.length} results found for ${selection}`, 
					'Imageshare has been opened for you in the next tab. Your results are waiting for you there.'
				);
			}

		})
		.catch(error => {
			console.error('Whoopsie', error);
		});
};

const onSearchCommand = (type, selection) => {
	if (type === 'standard') {
   		return doStandardSearch(selection);
	}

	// get criteria
    chrome.storage.sync.get(['settings'], result => {
    	// TODO can this fail?
		const criteria = result.settings;

        // if criteria present then use, otherwise alert user and redirect to options
        if (criteria === undefined){
			//alert user to go to options and set criteria
          	console.debug(`You have not yet set criteria for advanced searching. Please go to options to enable Advanced Search`);

          	notification(
          		'You have not yet set criteria for advanced searching.',
          		'Please navigate to this extensions "OPTIONS" page to set your Advance Search preferred search criteria. Extensions > Imageshearch - More Actions > Options',
          	);

          	return;
        }
		
		console.debug(criteria);

		doAdvancedSearch(data.selection, criteria.subject, criteria.type, criteria.accommodation, criteria.source);
  	});
};

const onExtensionInstall = () => {
	const context = 'selection';
	const contexts = [context];
	const title = "Imageshare Search";

	// main right-click context menu
	chrome.contextMenus.create({
		title: title,
		contexts: contexts,
		id: `parent ${context}`
	});

	// standard search option
    chrome.contextMenus.create({
    	title: "Search",
    	contexts: contexts,
    	parentId: `parent ${context}`, 
    	id: "standard"
    });

    // advanced search option
    chrome.contextMenus.create({
    	title: "Advanced Search",
    	contexts: contexts,
    	parentId: `parent ${context}`, 
    	id: "advanced"
    });
};

const onContextMenuClick = (info, tab) => {
    //Test receipt selection object
    console.debug('Selection Object', info.selectionText);

    //Extract selection
    let selection = info.selectionText;
    let option = info.menuItemId;

    onSearchCommand(option, selection);
};

const onExtensionMessage = (data, sender, sendResponse) => {
	// User Settings Notification
  	if (data.type === 'notification') {
    	console.debug('Message received: ', data.options);
    	//chrome.notifications.create('', data.options);
  	}

  	// Search innitiated from popup.js
  	if (data.type === 'search') {
    	onSearchCommand(data.subtype, data.selection)
  	}

  	// Search innitiated from popup.js input
  	if (data.type === 'input') {
  		onSearchCommand(data.subtype, data.selection);
  	}

  	sendResponse();
};

chrome.runtime.onInstalled.addListener(onExtensionInstall);
chrome.runtime.onMessage.addListener(onExtensionMessage);
chrome.contextMenus.onClicked.addListener(onContextMenuClick);
