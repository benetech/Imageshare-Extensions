# Imageshare-Extensions

Imageshare Search

Imageshare Search is a web extension designed to make finding and retreiving resources from Imageshare easier than ever.



...
For Safari Build:

Once converter is run the following must be added to info.plist inside Extension> Resources <key>NSExtension</key><dict>. Note this is one of 2 info.plist files, so makesure you're in the correct folder.

<key>SFSafariContextMenu</key>
        <array>
            <dict>
                    <key>Text</key>
                    <string>Imageshare Search</string>
                    <key>Command</key>
                    <string>Search</string>
            </dict>
        </array>


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
