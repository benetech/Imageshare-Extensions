// import notifications
// import sendMessage

import './style.css';
import browser from 'get-browser';

window.addEventListener('DOMContentLoaded', () => {
	const byId = document.getElementById;

	// Search buttons
	const standardSearchBtn = byId('standard-search');
	const advancedSearchBtn = byId('advanced-search');
	const standardSearchVal = byId('standard-search-input');
	const advancedSearchVal = byId('advanced-search-input');
	const queryInput		= byId('search');

	const handleSearchResponse = (type, query) => response => {
		// something something view toggling
	};

	const handleSearchError = error => {
		// whoopsie
	};

	const doSearch = (type, subtype, query) => {
		if (query !== undefined && query.length) {
			console.debug(`Running ${type} search for query ${query}.`);
			payload = {type: type, subtype: subtype, selection: query};
		} else {
			console.debug(`Running ${type} search.`);
			payload = {type: type, subtype: subtype};
		}

		sendMessage(payload)
			.then(handleSearchResponse(type, query))
			.catch(handleSearchError);

	};

	standardSearchBtn.addEventListener('click', () => doSearch('search', 'standard'));
	advancedSearchBtn.addEventListener('click', () => doSearch('search', 'advanced'));
	standardSearchVal.addEventListener('click', () => doSearch('input', 'standard', queryInput.value));
	advancedSearchVal.addEventListener('click', () => doSearch('input', 'advanced', queryInput.value));
});
