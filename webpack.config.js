'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

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

  devtool: NODE_ENV == 'development' ? "source-map" : null,

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
  }
};
