import React from 'react';
import styles from './styles/TransformControls.scss';

export default class TransformControls extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button className={styles.button} onClick={this.props.callbackParent}>click me!</button>
      </div>
    );
  }
}
