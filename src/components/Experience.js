import * as THREE from '../static/js/three.min.js';
import vertex from './shaders/BlobVertex.js';
import fragment from './shaders/BlobFragment.js';
import {TweenMax, Power3, TweenLite, TimelineLite} from "gsap";


let mouse = new THREE.Vector2(0,0);
let dampenedMouse = new THREE.Vector2(0,0);

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

class Blob extends THREE.Mesh {
  constructor(vertices) {
    let loader = new THREE.TextureLoader;
    let texture = loader.load('../static/img/amiga4.jpg');
    texture = null;
    let uniforms = {
  			textureSampler: { type: "t", value: texture},
  			time: {type: "f", value: 0},
  			refSampler: {type: "t", value: texture},
  			mouse: {type: "v2", value: new THREE.Vector2()},
  			pickPoint: {type: "v3", value: new THREE.Vector3()},
  			resolution: {type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
  			gravityScale: {type: "f", value: 0},
  			time1: {type: "f", value: 1},
  			time2: {type: "f", value: 1.5},
  			time3: {type: "f", value: .2},
  			time4: {type: "f", value: .2},
  			displace: {type: "f", value: .19},
  			scale1: {type: "f", value: .75},
  			scale2: {type: "f", value: 1},
  			scale3: {type: "f", value: 1},
  			scale4: {type: "f", value: 0},
  			scale5: {type: "f", value: 1.},
  			scale6: {type: "f", value: 1.},
  			scale7: {type: "f", value: 0},
  			scale8: {type: "f", value: 2},
  			scale9: {type: "f", value: 0.7},
  			size: {type: "f", value: 5},
  			reflection: {type: "f", value: 0},
  			specularLight: {type: "f", value: 0},
  			detail: {type: "f", value: .5},
  			octaves: {type: "f", value: 2},
  			u_bump: {type: "f", value: 1}
  	}
    let paraSphere = function(u, v) {
			return new THREE.Vector3(4.5*Math.sin(u)*Math.cos(v), 4.5*Math.sin(u)*Math.sin(v), 4.5*Math.cos(u));
		};
		const geometry = new THREE.ParametricBufferGeometry( paraSphere, vertices, vertices );
    const material = new THREE.ShaderMaterial( {
  		uniforms: uniforms,
  		vertexShader: vertex,
  		fragmentShader: fragment
  	})
    material.transparent = true;
  	material.backFaceCulling = false;
    super( geometry, material )
    this.uniforms = uniforms
  }

  update() {
    this.uniforms.time.value += 0.02;
    dampenedMouse.x += (mouse.x - dampenedMouse.x)*0.02;
	  dampenedMouse.y += (mouse.y  - dampenedMouse.y)*0.02;
    this.uniforms.mouse.value.copy(dampenedMouse)
  }
}

class Scene extends THREE.Scene {
  constructor() {
    super()
    //this.sphere = new Sphere()
    //this.add( this.sphere )
    this.blob = new Blob(512)
    this.add( this.blob )
  }

  update() {
    //this.sphere.update()
    this.blob.update()
  }
}

export default class Experience {
  constructor( container ) {
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 )
    this.camera.position.set( 0, 0, 12.5 )
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
    window.addEventListener( 'mousemove', this.mousemove.bind( this ), false )
    window.addEventListener( 'click', this.click.bind( this ), false )
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

  mousemove() {
    mouse.x = event.clientX;
  	mouse.y = event.clientY;
    //
  	// var timeout;
  	// var oldmouse = mouse.clone();
    //
  	// var mousevec = mouse.clone();
    //
  	// mousevec.x = mousevec.x / window.innerWidth * 2 - 1;
  	// mousevec.y = (1.- mousevec.y / window.innerHeight) * 2 - 1;
  	// oldmouse.x = oldmouse.x / window.innerWidth * 2 - 1;
  	// oldmouse.y = oldmouse.y / window.innerHeight * 2 - 1;
  }

  click() {
    console.log('hi')
    TweenLite.to(this.scene.blob.uniforms.scale5, 2, {value: 3, ease:Power3.easeIn});
    TweenLite.to(this.scene.blob.uniforms.scale6, 2, {value: 0, ease:Power3.easeInOut});
  }
}
