const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/main.ts',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	devServer: {
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, 'public'),
		},
		open: true,
		compress: true,
		hot: true,
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './public/template.html'),
			filename: 'index.html',
		}),
	],
};
