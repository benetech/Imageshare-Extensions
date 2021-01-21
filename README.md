# Imageshare-Extensions

Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.




** Developer instructions for viewing current feature progress.
This document will be updated regularly, so be sure to check back accordingly.

As of 1.20.2020
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
6) Once loaded you should be able to go to any other page, right click anywhere, and see that either a type specific test entry in the menu, or a general Imageshare test entry with children or similar.

WARNING: This branch is still a working branch, so changes may be pushed up at any time.




