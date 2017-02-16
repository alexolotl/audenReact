import React from 'react';
import styles from './styles/ThreeContainer.scss';
import * as THREE from '../static/js/three.min.js';

class Sphere extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry( 20, 30, 30 )
    const material = new THREE.MeshBasicMaterial( { color: 0x292929, wireframe: true } )
    super( geometry, material )
  }

  update() {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}

class Scene extends THREE.Scene {
  constructor() {
    super()
    this.sphere = new Sphere()
    this.add( this.sphere )
  }

  update() {
    this.sphere.update()
  }
}

class Experience {
  constructor( container ) {
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 )
    this.camera.position.set( 0, 0, 100 )
    this.camera.lookAt( 0, 0, 0 )

    this.renderer = new THREE.WebGLRenderer( { antialias: true } )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( this.innerWidth, this.innerHeight )
    this.renderer.setClearColor( 0xdedede )
    container.appendChild( this.renderer.domElement )

    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.scene = new Scene()

    this.resize()
    this.bind()
    this.loop()
  }

  bind() {
    window.addEventListener( 'resize', this.resize.bind( this ), false )
  }

  loop() {
    this.raf = window.requestAnimationFrame( this.loop.bind( this ) )

    const now = Date.now()
    const delta = now - this.then

    if( delta > this.fpsInterval ) {
      this.scene.update()
      this.renderer.render( this.scene, this.camera )
      this.then = now
    }
  }

  resize() {
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight

    this.camera.aspect = this.innerWidth / this.innerHeight
    this.camera.updateProjectionMatrix()

    this.renderer.setSize( this.innerWidth, this.innerHeight )
  }
}



export default class ThreeContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let experience = new Experience( this.threeRef );
  }
  render() {
    return (
      <div className={styles.threeContainer} ref={threeRef => this.threeRef = threeRef}></div>
    );
  }
}
