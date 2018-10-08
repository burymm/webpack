const LiveReloadPlugin = require('webpack-livereload-plugin');
const webpack = require('webpack');
const path = require('path');
const src = path.join(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: path.join(src, 'index.pug'),
    bundle: './index.js',
  },
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    watchContentBase: true,
  },
  watch: true,
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader",
        options: {
          includePaths: []
        }
      }]
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"]
    }, {
      test: /\.(pug|jade)$/,
      use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
    }]
  },
  plugins: [
    new LiveReloadPlugin({}),
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
    require('autoprefixer'),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'index.html',
      template: path.join(src, 'index.pug'),
    }),
  ]
  
};