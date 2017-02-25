import path from 'path';
import { Server } from 'http';
import Express from 'express';
const webpack = require('webpack');
// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { match, RouterContext } from 'react-router';
// import routes from './routes';
// import NotFoundPage from './components/NotFoundPage';

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV !== 'production' ) {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.dev');

  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
else {
  const config = require('../webpack.config.prod');

  const compiler = webpack(config);

  app.use(Express.static(path.join(__dirname, 'static')));
}
// app.use(Express.static(path.join(__dirname, 'static')));




// universal routing and rendering
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
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
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
