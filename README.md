# Imageshare-Extensions

Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.




** Developer instructions for viewing current feature progress.
This document will be updated regularly, so be sure to check back accordingly.


As of 2.9.2021
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





