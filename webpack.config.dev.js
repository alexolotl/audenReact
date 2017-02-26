// webpack.config.js
const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  cache: true,
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'app-client.js')
  ],
  target: 'web',
  output: {
    path: '/',
    publicPath: 'http://localhost:3000/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel-loader', 'babel?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/
      // query: {
      //   cacheDirectory: 'babel_cache',
      //   presets: ['react', 'es2015']
      // }
    },
    {
        test: /react-icons\/(.)*(.js)$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
    },
    {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]&camelCase=dashes'
    },
    {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[name]--[local]&camelCase=dashes',
        'sass?sourceMap'
      ],
      exclude: /node_modules|lib/
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
    { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
  ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
