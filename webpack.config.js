const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, 'public'), 
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  // devtool: 'source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
