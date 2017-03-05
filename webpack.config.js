var webpack = require('webpack');

module.exports = {
	entry:'./entry.js',
	output:{
		path:__dirname,
		filename:'main.js'
	},
	module:{
		loaders:[
			{test: /\.css$/, loader: 'style-loader!css-loader'}
		]
	}
}