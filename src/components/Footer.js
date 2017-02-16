import React from 'react';
import products from '../data/products';
import styles from './styles/Footer.scss';
import { Link } from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (
      <header className={styles.footer}>
        <Link to="/"><h2>auden norbury</h2></Link>
        <Link to="/product/lotion"><h2>cocreate</h2></Link>
      </header>
    );
  }
}
