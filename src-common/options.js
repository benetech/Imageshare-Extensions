window.addEventListener('DOMContentLoaded', () => {
	const TWO_WEEKS = 1209600;
	const byId = document.getElementById;

    const getAdvancedSearchCriteriaFromApi = () => {
    	const getJson = endpoint => 
    		fetch(`https://imgsdev.wpengine.com/json-api/${endpoint}`, { method: 'GET' })
    			.then(res => res.json());

    	const subjects 		 = getJson('subjects');
    	const types   		 = getJson('types');
    	const accommodations = getJson('accommodations');
    	const sources 		 = getJson('sources');

    	return Promise.all([subjects, types, accommodations, sources]);
    };

    const storeAdvancedSearchCriteria = criteria => {
		const [subjects, types, accommodations, sources] = criteria;
		const updated = new Date().getTime();

		const payload = { subjects, types, accommodations, sources, updated };

    	console.debug('Storing search criteria.', payload);

        chrome.storage.local.set({
			'criteria': payload
		});

		return payload;
    };

    const renderOptions = criteria => {
    	const doRender = (target, items) => {
    		items.forEach(item => {
				const option = document.createElement('option');
			 	option.innerText = item.attributes.name;
			  	option.value = item.id;
			 	target.prepend(option);
    		})
    	};

    	doRender(byId('subject'), criteria.subjects.data);
    	doRender(byId('type'), criteria.types.data);
    	doRender(byId('accommodations'), criteria.accommodations.data);
    	doRender(byId('source'), criteria.sources.data);
    };

    const getSearchCriteria = () => {
    	chrome.storage.local.get(['criteria'], result => {
    		const noStorage = result === undefined;

    		const staleStorage = (() => {
				const lastUpdated = result.updated;
				const now = new Date().getTime();
				return (now - lastUpdated > TWO_WEEKS);
    		})();

    		return (noStorage || staleStorage)
    			? getAdvancedSearchCriteriaFromApi().then(storeAdvancedSearchCriteria)
    			: getStoredCriteria()
    		;
    	});
    };

    const saveAdvancedSearchSettings = () => {
    	console.debug('Saving default advanced search settings.');

    	const subject 		= byId('subject').value;
        const type 			= byId('type').value;
        const accommodation = byId('accommodation').value;
        const source 		= byId('source').value;

        const timestamp = new Date().getTime();

        const settings = { subject, type, accommodation, source, timestamp };

        chrome.storage.sync.set({ settings }, () => {
        	notification('Success!', 'Advanced search settings saved.')
        });
    };

    byId('advanced-criteria-save').addEventListener('click', saveAdvancedSearchSettings);


    getStorage().then(renderOptions);
});