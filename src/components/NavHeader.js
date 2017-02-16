import React from 'react';
import products from '../data/products';
import style from './styles/NavHeader.css';

export default class NavHeader extends React.Component {
  render() {
    return (
      <header className={style.navHeader}>
        <h2>Brand Name</h2>
        <ul className="product-selector">
          {products.map(productData => <li>{productData.name}</li>)}
        </ul>
      </header>
    );
  }
}
