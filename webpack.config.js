var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);

module.exports = {
  
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'app/main'),
  ],

  output: {
    path: './build',
    publicPath: "/assets/",
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
        loader:  'react-hot!babel',
      },
      
      // {test: '/\.js$/', loader: 'babel'},

      { test: '/\.css$/', loaders: ['style', 'css']},
    ],
  },


  plugins: [
    new webpack.BannerPlugin('this is created by philoz'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

}
