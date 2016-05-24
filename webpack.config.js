var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  
  output: {
    path: './public',
    publicPath: "/",
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel',
      },
      

      { test: /\.css$/, loaders: ['style', 'css']},
    ],
  },


  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [],

}
