// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'src', 'app-client.js')
  ],
  output: {
    path: path.join(__dirname, 'src', 'static', 'bundle'),
    filename: 'bundle.js',
    publicPath: '/static/bundle/'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel-loader', 'babel?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/
    },
    {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract('style', 'css?postcss!sass'),
    }
  ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  ]
};
