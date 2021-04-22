# Imageshare-Extensions

## Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.


### A note on Icons:

Icons will work in MV2 Chrome but not Firefox. This is a known issue caused by a difference in browser requirements for icon color that will be resolved when build targets are complete.




### Developer instructions for viewing current feature progress.
This document will be updated regularly, so be sure to check back accordingly.

As of 4.4.2021
The current feature branch is main. main can be found at the following URL: https://github.com/benetech/Imageshare-Extensions

#### To run main you will need:
* A current download of Chrome Canary. This download can be found at the following URL: https://www.google.com/chrome/canary/
* Experimental Web Platform Features turned on. Go to chrome://flags/. Search Experimental Web Platform Features and move setting to "Enabled". Reload browser for change to take effect.
* A current download of Chome Developer. This download can be found at the following URL: https://www.google.com/chrome/dev/
* Firefox Developer. This download can be found at the following URL: https://www.mozilla.org/en-US/firefox/developer/
* Safari
* Xcode
* Safari Extension Converter

#### Loading main into Canary (or Dev):
1. Clone the branch locally
2. Go to chrome://extensions
3. Click "Load Unpacked"
4. Navigate to the extension's src-chrome-mv3 folder. Load the whole folder.
5. Give your Imageshare extension permissions for "on all sites". You can do this by clicking "details", scroll down to "Site Access" and choosing the "on all sites" radio.
6. Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search. You can also click the Imageshage icon in lue of right click and choose your search there. If you have made no selection or there is an error in selection passing, the Popup diolog will change, a notification announcement is made and the user is asked to manually input their search. In Options, accessed via right licking the Imageshare icon and selecting Options, the user can chose their Advanced Search criteria and choose if Imageshare should open as active of inactive tab. These settings can be saved. You should experience ntofications throughout.
7. Open service-worker for background inspect. Inspect also available on Options and Popup.

NOTE: To test MV2 use Chrome Developer and load src-chrome-firefox.

##### Expected Non-blocking Warnings (MV2):
* Warning: Unrecognized manifest key 'browser_specific_settings'.
* Permission 'menus' is unknown or URL pattern is malformed.
* Error in event handler: ReferenceError: browser is not defined

#### Loading main into Firefox:
1. Clone the branch locally
2. Go to about:debugging
3. Click "Load Temporary Add On"
4. Navigate to the extension's src-chrome-firefox file. For firefox chose manifest.json inside the file and firefox with do the rest.
5. Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search. You can also click the Imageshage icon in lue of right click and choose your search there. If you have made no selection or there is an error in selection passing, the Popup diolog will change, a notification announcement is made and the user is asked to manually input their search. In Options, accessed via right licking the Imageshare icon and selecting Options, the user can chose their Advanced Search criteria and choose if Imageshare should open as active of inactive tab. These settings can be saved.  You should experience ntofications throughout.
6. Open Imageshare "inspect" in about:debugging for background inspect. You may see a number of console.logs here tracking the progress and details of our call. If your selection yeilds search results Imageshare will open to those results. Inspect also available on Options and Popup.

##### Expected Non-blocking Warnings:
Reading manifest: Warning processing background.persistent: Event pages are not currently supported. This will run as a persistent background page.

#### Loading main into Safari:

1. Clone the branch locally
2. Must run converter on src-safari folder. See the following article for details and downloads: https://developer.apple.com/documentation/safariservices/safari_web_extensions/converting_a_web_extension_for_safari
3. App file will open in Xcode.
4. Hit play icon to test in Safari.
5. Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search. You can also click the Imageshage icon in lue of right click and choose your search there. If you have made no selection or there is an error in selection passing, the Popup diolog will change, a notification announcement is made and the user is asked to manually input their search. In Options, accessed via right licking the Imageshare icon and selecting Options, the user can chose their Advanced Search criteria and choose if Imageshare should open as active of inactive tab. These settings can be saved. You should experience ntofications throughout.


