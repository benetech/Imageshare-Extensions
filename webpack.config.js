// Safari and Firefox both imply MV2
const VALID_BUILD_TARGETS = ['chrome-mv2', 'chrome-mv3', 'safari', 'firefox'];

const package = require('./package.json');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isWebkitOrBlink = target => target !== 'firefox';
const supportsManifestV3 = target => target === 'chrome-mv3';
const supportsExtensionNotifications = target => !supportsManifestV3(target);

const getResolveConfig = target => { return {
	alias: {
		'get-browser$': isWebkitOrBlink(target)
			? path.resolve(__dirname, './src-common/get-browser-chrome.js')
			: path.resolve(__dirname, './src-common/get-browser-browser.js'),
		'display-notification$': supportsExtensionNotifications(target)
			? path.resolve(__dirname, './src-common/extension-notifications.js')
			: path.resolve(__dirname, './src-common/browser-notifications.js')
	}
} };

const getManifestPath = target => {
	return supportsManifestV3(target)
		? './src-common/manifest-v3.json'
		: './src-common/manifest-v2.json'
	;
}

module.exports = env => {
	if (!env.build_target || !VALID_BUILD_TARGETS.includes(env.build_target)) {
		throw new Error(`Invalid or no build target given. Expected one of: ${VALID_BUILD_TARGETS.join(', ')} - --env build_target=...`);
	}

	const generateExtensionManifest = content => {
		const manifest = JSON.parse(content);

		manifest.name = package.name;
		manifest.version = package.version;
		manifest.description = package.description;

		if (env.build_target === 'firefox') {
			manifest.permissions.push('menus');
		} else {
      delete manifest.browser_specific_settings;
    }

	   return JSON.stringify(manifest, null, 2);
	};

	return {
		mode: 'production',
    optimization: {
      minimize: false
    },
		resolve: getResolveConfig(env.build_target),
		entry: {
			index: './src-common/index.js',
			popup: './src-common/popup.js',
			options: './src-common/options.js',
			background: './src-common/background.js',
		},
		output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true
    },
		plugins: [
      new HtmlWebpackPlugin({
        filename: 'options.html',
        minify: false,
        chunks: ['options'],
        template: './src-common/options.html'
      }),
      new HtmlWebpackPlugin({
        filename: 'popup.html',
        minify: false,
        chunks: ['popup'],
        template: './src-common/popup.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: getManifestPath(env.build_target),
            to:   "./manifest.json",
            transform(content, _path) {
              return generateExtensionManifest(content.toString());
            }
          },
          {
            from: './icons/*'
          }
        ]
      }),
    ],
		module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
	}
};