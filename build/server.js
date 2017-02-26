'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Express = require('express');
var webpack = require('webpack');
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs templates
var app = new _express2.default();
var server = new _http.Server(app);
app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, 'views'));

if (process.env.NODE_ENV != 'production') {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('../webpack.config.dev');

  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use(_express2.default.static(_path2.default.join(__dirname, 'static')));
} else {
  // const config = require('../webpack.config.prod');
  //
  // const compiler = webpack(config);

  // app.use(Express.static(path.join(__dirname, 'static')));
  console.log('hi');
  // app.use(Express.static('../build'));  //should i add both of these?
  app.use('/build', _express2.default.static(_path2.default.join(__dirname, '../build')));
}
// app.use(Express.static('../build'));
console.log('hello');
app.use('/build', _express2.default.static(_path2.default.join(__dirname, '../build')));
// app.use(Express.static(path.join(__dirname, 'static')));


// universal routing and rendering
app.get('/', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, 'static', 'index.html'));
  // match(
  //   { routes, location: req.url },
  //   (err, redirectLocation, renderProps) => {
  //
  //     // in case of error display the error message
  //     if (err) {
  //       return res.status(500).send(err.message);
  //     }
  //
  //     // in case of redirect propagate the redirect to the browser
  //     if (redirectLocation) {
  //       return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
  //     }
  //
  //     // generate the React markup for the current route
  //     let markup;
  //     if (renderProps) {
  //       // if the current route matched we have renderProps
  //       markup = renderToString(<RouterContext {...renderProps}/>);
  //     } else {
  //       // otherwise we can render a 404 page
  //       markup = renderToString(<NotFoundPage/>);
  //       res.status(404);
  //     }
  //
  //     // render the index template with the embedded React markup
  //     return res.render('index', { markup });
  //   }
  // );
});

// start the server
var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'production';
server.listen(port, function (err) {
  if (err) {
    return console.error(err);
  }
  console.info('Server running on http://localhost:' + port + ' [' + env + ']');
});
