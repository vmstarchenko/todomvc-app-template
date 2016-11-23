'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./js/app.js",
  output: {
    path: __dirname + "/js",
    filename: "result.js",
    library: "result"
  },

  watch: NODE_ENV == 'development',
  watchOptions: {
    aggregateTimeout: 200
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    })
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },

  resolve: {
    root: [
      path.resolve('./js'),
      path.resolve('./js/libs'),
      // path.resolve('./js/templates'),
      // path.resolve('./js/views'),
      // path.resolve('./js/models'),
      // path.resolve('./js/controllers'),
      path.resolve('./node_modules')
    ]
  },
};
