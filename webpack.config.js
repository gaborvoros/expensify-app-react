
var path = require('path');

module.exports = (env) => {
	const isProduction = env === 'production';

	return {
		entry: './src/app.js',
		output: {
			path: path.join(__dirname, 'public'),
			filename: 'bundle.js'
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						cacheDirectory: true,
						presets: ['react', 'es2015', 'env'],
						plugins: ['transform-class-properties']
					}
				},
				{
					test: /\.s?css$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
				}
			]
		},
		devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			contentBase: path.join(__dirname, 'public'),
			historyApiFallback: true
		}
	};
};

