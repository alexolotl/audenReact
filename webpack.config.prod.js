// webpack.config.prod.js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'src', 'app-client.js')
  ],
  output: {
    // path: path.join(__dirname, 'src', 'static', 'bundle'),
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    // publicPath: '/static/bundle/'
    publicPath: '/build/'
  },
  postcss: {},
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['babel-loader', 'babel?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', '!css?modules&localIdentName=[name]---[local]---[hash:base64:5]&camelCase=dashes')
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&localIdentName=[name]--[local]&camelCase=dashes!sass?outputStyle=expanded')
    },
    {
      test: /\.(jpe?g|jpg|png|gif|svg)$/i,
      include : path.join(__dirname, 'src', 'static', 'img'),
      loader  : 'url-loader?limit=30000&name=images/[name].[ext]'
   }, // inline base64 URLs for <=30k images, direct URLs for the rest
   { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
    { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
    {
      test: /react-icons\/(.)*(.js)$/,
      loader: 'babel-loader',
      query: {
          presets: ['es2015', 'react']
      }
    }
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'static/index.html',
      template: 'src/static/views/index-template.ejs'
    }),
    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify( process.env.NODE_ENV )
      }
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
