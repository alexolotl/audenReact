import React from 'react';
import TransformControls from './TransformControls.js';
import Experience from './Experience.js';
import styles from './styles/Layout.scss';

export default class ThreeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sphereSize: 1
    }
    this.handleChangeSize = this.handleChangeSize.bind(this);
  }
  componentDidMount() {
    this.experience = new Experience( this.threeRef );
  }
  componentDidUpdate() {
    //this.experience.scene.sphere.scale.set(this.state.sphereSize,this.state.sphereSize,this.state.sphereSize);
  }
  handleChangeSize(e) {
    let oldsize = this.state.sphereSize;

    this.interval = setInterval( () => {
      this.setState({sphereSize: this.state.sphereSize + .005 });
      if (this.state.sphereSize  - oldsize >= 1) {
        clearInterval(this.interval);
      }
    }, 10);
  }
  render() {
    return (
      <div>
        <TransformControls callbackParent={(e) => this.handleChangeSize(e)}></TransformControls>
        <div className={styles.threeContainer} ref={threeRef => this.threeRef = threeRef}></div>
      </div>
    );
  }
}
