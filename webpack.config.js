var path = require('path');
var webpack = require('webpack');
//var babel-polyfill = require("babel-polyfill");

module.exports = {
  devServer: {
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
  },
  devtool: 'eval',
  extensions: [".js",".jsx"],
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  babel: {
    presets: [
      'es2015',
      'stage-0',
      'react'
    ]
  },
  externals: {
  // help enable enzyme to work properly.
  'cheerio': 'window',
  'react/lib/ExecutionEnvironment': true,
  'react/lib/ReactContext': true,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  watch: true,
  devServer: {
    historyApiFallback:true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|svg)$/, //Load img/svg
        loader: 'url-loader',
        options: {
          limit: 25000
        }
      },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader' }
    ]
  }
}
