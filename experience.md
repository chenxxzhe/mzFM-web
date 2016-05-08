##something ready to start programming with react

1. npm scripts: webpack-dev-server --hot --inline [--devtool eval]

2. webpack.config.js:
```js
//something important for use react-hot-loader
module.exports = {
	entry:[
		'webpack-dev-server/client?http://localhost:3000',
	    'webpack/hot/only-dev-server',
	    path.resolve(ROOT_PATH, 'app/main'),
	],

	module:{
	    loaders: [
	      {
	        test: /\.jsx?$/,
	        exclude: /node_modules/,
	        loader:  'react-hot!babel',
	      },
	    ],
  	},

  	plugins: [
	    new webpack.NoErrorsPlugin(),
	    new webpack.HotModuleReplacementPlugin(),
  	],
}
```

3. don't create an index.html by yourself, instead, do it while building.

4. .babelrc: { "presets": ['react', 'es2015']}