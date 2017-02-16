import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import ProductPage from './components/ProductPage';
import NotFoundPage from './components/NotFoundPage';
import IndexPage from './components/IndexPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="product/:id" component={ProductPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;

// <Route path="athlete/:id" component={AthletePage}/>
// <Route path="*" component={NotFoundPage}/>
