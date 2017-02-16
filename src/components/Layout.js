import React from 'react';
import { Link } from 'react-router';
import NavHeader from './NavHeader.js';
import ThreeContainer from './ThreeContainer.js';
import Footer from './Footer.js';
import styles from './styles/Layout.scss';
import './shared/styles/core.scss';

export default class Layout extends React.Component {
  render() {
    return (
      <div className={styles.appContainer}>
        <div className={styles.appContent}>{this.props.children}</div>
        <ThreeContainer />
        <Footer />
      </div>
    );
  }
}
