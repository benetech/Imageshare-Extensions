# Imageshare-Extensions

Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.



A note on Icons:

Icons will work in Firefox but not MV2 Chrome. This is a known issue caused by a difference in browser requirements for icons that will be resolved when build targets are complete.

For Safari Build:

Must run converter on src-safari folder. App file will open in Xcode. Hit play icon to test in Safari.



=======
** Developer instructions for viewing current feature progress.
This document will be updated regularly, so be sure to check back accordingly.


As of 2.9.2021
The current feature branch is user-settings. user-settingsl can be found at the following URL: https://github.com/benetech/Imageshare-Extensions/tree/user-settings

To run user-settings you will need:
1) A current download of Chrome Canary. This download can be found at the following URL: https://www.google.com/chrome/canary/
2) Experimental Web Platform Features turned on. Go to chrome://flags/. Search Experimental Web Platform Features and move setting to "Enabled". Reload browser for change to take effect.
3) A current download of Chome Developer. This download can be found at the following URL: https://www.chromium.org/getting-involved/dev-channel
4) Firefox Developer. This download can be found at the following URL: https://www.mozilla.org/en-US/firefox/developer/

Running Dev
To test chrome - npm run dev-ch3
To test firefox - npm run dev-f


Loading user-settings into Canary:
1) Clone the branch locally
2) Go to chrome://extensions
3) Click "Load Unpacked"
4) Navigate to the extension's /dist file. For Chrome load the whole file.
5) Give your Imageshare extension permissions for "on all sites". You can do this by clicking "details", scroll down to "Site Access" and choosing the "on all sites" radio.
6) Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search.
7) Open serive-worker for background inspect - You will see a number of console.logs here tracking the progress and details of our call. If your selection yeilds search results Imageshare will open to those results.

NOTE: To test MV2 use Chrome Developer and load src-chrome itself instead of ./dist.

Loading user-settings into Firefox:
, for firefox chose manifest.json inside the file and firefox with do the rest.
1) Clone the branch locally
2) Go to about:debugging
3) Click "Load Temporary Add On"
4) Navigate to the extension's /dist file. For firefox chose manifest.json inside the file and firefox with do the rest.
5) Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search.
6) Open Imageshare "inspect" in about:debugging for background inspect. You will see a number of console.logs here tracking the progress and details of our call. If your selection yeilds search results Imageshare will open to those results.


***


As of 2.8.2021
The current feature branch is firefox-api-call. firefox-api-call can be found at the following URL: https://github.com/benetech/Imageshare-Extensions/tree/firefox-api-call

To run firefox-api-call you will need:
1) A current download of Chrome Canary. This download can be found at the following URL: https://www.google.com/chrome/canary/
2) Experimental Web Platform Features turned on. Go to chrome://flags/. Search Experimental Web Platform Features and move setting to "Enabled". Reload browser for change to take effect.
3) Firefox Developer.

Running Dev
To test chrome - npm run dev-ch3
To test firefox - npm run dev-f

Loading firefox-api-call into Canary:
1) Clone the branch locally
2) Go to chrome://extensions
3) Click "Load Unpacked"
4) Navigate to the extension's /dist file. For Chrome load the whole file.
5) Give your Imageshare extension permissions for "on all sites". You can do this by clicking "details", scroll down to "Site Access" and choosing the "on all sites" radio.
6) Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search.
7) Open serive-worker for background inspect - You will see a number of console.logs here tracking the progress and details of our call. If your selection yeilds search results Imageshare will open to those results.

Loading into Firefox:
, for firefox chose manifest.json inside the file and firefox with do the rest.
1) Clone the branch locally
2) Go to about:debugging
3) Click "Load Temporary Add On"
4) Navigate to the extension's /dist file. For firefox chose manifest.json inside the file and firefox with do the rest.
5) Once loaded you should be able to go to any other page, right click a selection and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search.
6) Open Imageshare "inspect" in about:debugging for background inspect. You will see a number of console.logs here tracking the progress and details of our call. If your selection yeilds search results Imageshare will open to those results.


***


As of 1.20.2021
The current feature branch is context-menu. context-menu can be found at the following URL: https://github.com/benetech/Imageshare-Extensions/tree/context-menu

To run context-menu you will need:
1) A current download of Chrome Canary. This download can be found at the following URL: https://www.google.com/chrome/canary/
2) Experimental Web Platform Features turned on. Go to chrome://flags/. Search Experimental Web Platform Features and move setting to "Enabled". Reload browser for change to take effect.

Loading context-menu into Canary:
1) Clone the branch locally
2) Go to chrome://extensions
3) Click "Load Unpacked"
4) For now load only /src
5) Give your Imageshare extension permissions for "on all sites". You can do this by clicking "details", scroll down to "Site Access" and choosing the "on all sites" radio.
6) Once loaded you should be able to go to any other page, right click a selection, link, video, image or audio item, and find an Imageshare Search entry with 2 children, Run Standard Search and Run Advanced Search.


=====
Code for later use:
Opening Options Progamatically:
runtime.openOptionsPage()

Build targets package.json
  // "chrome": ["dist/src-chrome/index.js", "dist/src-chrome/background.js"],
  // "chrome-modern": ["dist/src-chrome-mv3/index.js", "dist/src-chrome-mv3/background.js"],
  // "firefox": ["dist/src-firefox/index.js", "dist/src-firefox/background.js"],
  // "safari": ["dist/src-safari/index.js", "dist/src-safari/background.js"],
  // "targets": {
  //   "main": false,
  //   "chrome": {
  //     "distDir": "./dist/src-chrome",
  //     "engines": {
  //       "browsers": "Chrome 70"
  //     },
  //     "optimize": true,
  //     "sourceMap": {
  //       "inline": true,
  //       "inlineSources": true
  //       }
  //   },
  //   "chrome-modern": {
  //     "distDir": "./dist/src-chrome-mv3",
  //     "engines": {
  //       "browsers": "Chrome 90"
  //     },
  //     "optimize": true,
  //     "sourceMap": {
  //       "inline": true,
  //       "inlineSources": true
  //       }
  //   },
  //   "firefox": {
  //     "distDir": "./dist/src-firefox",
  //     "engines": {
  //       "browsers": "Firefox 70"
  //     },
  //     "optimize": true,
  //     "sourceMap": {
  //       "inline": true,
  //       "inlineSources": true
  //       }
  //   },
  //   "safari": {
  //     "distDir": "./dist/src-safari",
  //     "engines": {
  //       "browsers": "Safari 70"
  //     },
  //     "optimize": true,
  //     "sourceMap": {
  //       "inline": true,
  //       "inlineSources": true
  //       }
  //    }
  // },


