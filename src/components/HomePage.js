import React from 'react';
import styles from './styles/HomePage.scss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }
  render() {
    return (
        <div className={styles.home}>
            <h1 key={"title"}><a href="#" onClick={this.props.nextPage}>audenorbury</a></h1>
        </div>
    );
  }
}
