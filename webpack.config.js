const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		'synchronous': './src/synchronous.ts',
		'asynchronous-callbacks': './src/asynchronous-callbacks.ts',
		'callback-hell': './src/callback-hell.ts',
		'promise-example': './src/promise-example.ts',
		'asynchronous-fetch': './src/asynchronous-fetch.ts',
		'async-await-fetch': './src/async-await-fetch.ts',
		'combining-promises': './src/combining-promises.ts'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ]
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	}
};