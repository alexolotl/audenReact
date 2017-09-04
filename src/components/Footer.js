import React from 'react';
import products from '../data/products';
import styles from './styles/Footer.scss';
import { Link } from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <header className={styles.header}>
          <span>GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE</span>
        </header>
        <footer className={styles.footer}>
          {/*<Link to="/"><h2>auden norbury</h2></Link>
          <Link to="/product/lotion"><h2>cocreate</h2></Link>*/}
          <span><span className={styles.yellow}>GROOVYGROOVY</span>    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE</span>
        </footer>
        {/*
          <footer className={styles.footer} style={{bottom: 50, animationDuration: '9s'}}>
            <span>GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE</span>
          </footer>
          <footer className={styles.footer} style={{bottom: 100, animationDuration: '11s'}}>
            <span>GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE</span>
          </footer>
          <footer className={styles.footer} style={{bottom: 150, animationDuration: '13s'}}>
            <span>GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE     GROOVYGROOVY    FRIDAY SEPT 8 2017    RSVP HERE</span>
          </footer>
        */}

      </div>
    );
  }
}
