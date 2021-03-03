const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
	entry: "./src/index.js",
	mode: "development",
	resolve: {
		extensions: [".js", ".mjs"],
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[chunkhash].js",
	},
	devtool: "source-map",
	devServer: {
		open: true,
		hot: true,
		inline: true,
		contentBase: path.join(__dirname, "src"),
		watchContentBase: true,
		disableHostCheck: true,
		host: "0.0.0.0",
		openPage: "http://localhost:8080",
		stats: {
			colors: true,
			hash: false,
			version: false,
			timings: false,
			assets: false,
			chunks: false,
			modules: false,
			reasons: false,
			children: false,
			source: false,
			errors: true,
			errorDetails: true,
			warnings: true,
			publicPath: false,
		},
	},

	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},

			{
				test: /\.(sass|scss|css)$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},

			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",

							outputPath: "fonts/",
						},
					},
				],
			},

			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
			},
		],
	},

	performance: {
		hints: false,
		maxEntrypointSize: 1024000,
		maxAssetSize: 1024000,
	},

	optimization: {
		minimize: false,
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "style.css",
		}),
		new HtmlWebpackPlugin({
			hash: false,
			template: "./src/index.html",
			filename: "index.html",
		}),
		new CopyPlugin({
			patterns: [{ from: "static", to: "static" }],
		}),
	],
};
