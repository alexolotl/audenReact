import React from 'react';
import ProductPreview from './ProductPreview';
import products from '../data/products';
import styles from './styles/IndexPage.scss';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className={styles.home}>
        <h1>auden norbury</h1>
      </div>
    );
  }
}
