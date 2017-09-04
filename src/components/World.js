import * as THREE from '../static/js/three.min.js';
import dat from '../static/js/dat.gui.min.js';
import vertex from './shaders/MorphSphereVertex.js';
import textFragment from './shaders/TextFragment.js';
import textVertex from './shaders/TextVertex.js';
import fragment from './shaders/MorphSphereFragment.js';
import {TweenMax, Power3, TweenLite, TimelineLite} from "gsap";
import reflectImage from '../static/img/amiga4.jpg'

let mouse = new THREE.Vector2(0,0);
let dampenedMouse = new THREE.Vector2(0,0);

class BackgroundSphere extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry( 30, 30, 30 )
    const material = new THREE.MeshStandardMaterial( { color: 0x333333, side: THREE.DoubleSide } )
    super(geometry,material)
  }
}

class Sphere extends THREE.Mesh {
  constructor() {
    const geometry = new THREE.SphereGeometry( 2.5, 30, 30 )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } )
    super( geometry, material )
  }

  update() {
    this.rotation.x += 0.01
    this.rotation.y += 0.01
  }
}

class TextCanvas extends THREE.Mesh {
  constructor() {
    const text = "GROOVYGROOVY"

    const canvas = document.createElement("canvas")
		const context = canvas.getContext("2d")
    const metrics = context.measureText(text)
    const textWidth = 2048
		canvas.width = textWidth
    canvas.height = 240
    context.font = "Bold 140px Helvetica"
    context.textAlign = "center"
		context.textBaseline = "middle"
		context.fillStyle = "rgba(255,255,255,1)"

		context.fillText(text, canvas.width / 2, canvas.height / 2);
    const texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

    const uniforms = {
  			textureSampler: { type: "t", value: texture},
  			time: {type: "f", value: 0},
        mouse: {type: "v2", value: new THREE.Vector2()},
        resolution: {type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)}
  	}

    // const material = new THREE.MeshBasicMaterial({
		// 	map : texture,
    //   // side: THREE.DoubleSide
		// })
    // material.transparent = true
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: textVertex,
      fragmentShader: textFragment,
      transparent: true
    })
    // const geometry = new THREE.PlaneGeometry(canvas.width, canvas.height)
    const geometry = new THREE.SphereGeometry(16, 32, 32, 0, Math.PI * 2, Math.PI/2 - .4, .8)

    super(geometry, material)

    // this.position.z = 4
    // this.scale.set(.007,.007,.007)
    this.scale.set(.2,.2,.2)
    this.rotateX = Math.PI/2
    this.uniforms = uniforms;
  }

  update() {
    this.uniforms.time.value += 0.02;
    this.uniforms.mouse.value = new THREE.Vector2(Math.abs(mouse.x - dampenedMouse.x), Math.abs(mouse.y - dampenedMouse.y)).multiplyScalar(0.005);
  }
}

class TextObject extends THREE.Object3D {
  constructor() {
    super()
    this.textcanvas = new TextCanvas()
    this.add(this.textcanvas)
    this.rad = 0
  }

  update() {
    this.rotation.y -= .01
    this.textcanvas.update();
  }
}

class MorphSphere extends THREE.Mesh {
  constructor(vertices) {
    let loader = new THREE.TextureLoader;
    let texture = loader.load(reflectImage);
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
  			scale3: {type: "f", value: 0},
  			scale4: {type: "f", value: 0},
  			scale5: {type: "f", value: 1.},
  			scale6: {type: "f", value: 1.},
  			scale7: {type: "f", value: 0},
  			scale8: {type: "f", value: 1.5},
  			scale9: {type: "f", value: 0.7},
  			size: {type: "f", value: 5},
  			reflection: {type: "f", value: 0},
  			specularLight: {type: "f", value: 0},
  			detail: {type: "f", value: .9},
  			octaves: {type: "f", value: 2},
  			u_bump: {type: "f", value: 1.5}
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
    this.uniforms.mouse.value.copy(dampenedMouse)
  }
}

// class MorphSphere2 extends THREE.Mesh {
//   constructor(vertices) {
//     let loader = new THREE.TextureLoader;
//     let texture = loader.load(reflectImage);
//     texture = null;
//     let uniforms = {
//   			textureSampler: { type: "t", value: texture},
//   			time: {type: "f", value: 0},
//   			refSampler: {type: "t", value: texture},
//   			mouse: {type: "v2", value: new THREE.Vector2()},
//   			pickPoint: {type: "v3", value: new THREE.Vector3()},
//   			resolution: {type: "v2", value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
//   			gravityScale: {type: "f", value: 0},
//   			time1: {type: "f", value: 1},
//   			time2: {type: "f", value: 1.5},
//   			time3: {type: "f", value: .2},
//   			time4: {type: "f", value: .2},
//   			displace: {type: "f", value: .9},
//   			scale1: {type: "f", value: .75},
//   			scale2: {type: "f", value: 1},
//   			scale3: {type: "f", value: 0},
//   			scale4: {type: "f", value: 0},
//   			scale5: {type: "f", value: 1.},
//   			scale6: {type: "f", value: 1.},
//   			scale7: {type: "f", value: 0},
//   			scale8: {type: "f", value: 4},
//   			scale9: {type: "f", value: 12},
//   			size: {type: "f", value: 2.5},
//   			reflection: {type: "f", value: 0},
//   			specularLight: {type: "f", value: 0},
//   			detail: {type: "f", value: 1},
//   			octaves: {type: "f", value: 2},
//   			u_bump: {type: "f", value: 1.5}
//   	}
//     let paraSphere = function(u, v) {
// 			return new THREE.Vector3(4.5*Math.sin(u)*Math.cos(v), 4.5*Math.sin(u)*Math.sin(v), 4.5*Math.cos(u));
// 		};
// 		const geometry = new THREE.ParametricBufferGeometry( paraSphere, vertices, vertices );
//     const material = new THREE.ShaderMaterial( {
//   		uniforms: uniforms,
//   		vertexShader: vertex,
//   		fragmentShader: fragment
//   	})
//     material.transparent = true;
//   	material.backFaceCulling = false;
//     super( geometry, material )
//     this.uniforms = uniforms
//   }
//
//   update() {
//     this.uniforms.time.value += 0.02;
//     dampenedMouse.x += (mouse.x - dampenedMouse.x)*0.02;
// 	  dampenedMouse.y += (mouse.y  - dampenedMouse.y)*0.02;
//     this.uniforms.mouse.value.copy(dampenedMouse)
//   }
// }

class Scene extends THREE.Scene {
  constructor() {
    super()
    // this.sphere = new Sphere()
    // this.add( this.sphere )

    this.morphsphere = new MorphSphere(512)
    this.add( this.morphsphere )

    // this.morphsphere2 = new MorphSphere2(512)
    // this.add( this.morphsphere2 )

    this.textobject = new TextObject()

    // this.textcanvas.position.y = 55;
    this.add( this.textobject )

    this.background = new BackgroundSphere()
    this.add( this.background)

    const bluePoint = new THREE.PointLight(0x001199, 3, 150);
    bluePoint.position.set( 70, 5, 70 );
    this.add(bluePoint);
  }

  update() {
    dampenedMouse.x += (mouse.x - dampenedMouse.x)*0.02;
	  dampenedMouse.y += (mouse.y  - dampenedMouse.y)*0.02;

    //this.sphere.update()
    this.morphsphere.update()
    // this.morphsphere2.update()
    this.textobject.update()
  }
}

export default class World {
  constructor( container ) {
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 )
    this.camera.position.set( 0, 0, 12.5 )
    this.camera.lookAt( 0, 0, 0 )

    this.renderer = new THREE.WebGLRenderer( { antialias: true } )
    this.renderer.setPixelRatio( window.devicePixelRatio )
    this.renderer.setSize( this.innerWidth, this.innerHeight )
    this.renderer.setClearColor( 0x252525 )
    container.appendChild( this.renderer.domElement )

    const fps = 120
    this.fpsInterval = 1000 / fps
    this.then = Date.now()

    this.scene = new Scene()

    this.resize()
    this.bind()
    this.loop()

    this.gui = new dat.GUI();
		this.gui.add(this.scene.morphsphere.uniforms.reflection, 'value', 0, 1.5).name('reflection').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.time1, 'value', 0, 3).name('time1').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.scale3, 'value', 0, 1).name('toon vs real').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.scale9, 'value', 0, 5).name('B_displace').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.scale8, 'value', 0, 5).name('B_scale').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.detail, 'value', 0, 1).name('B_sharpness').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.size, 'value', 4, 6).name('size').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.scale2, 'value', 0, 3).name('mouseover roll amount').step(.02);
		this.gui.add(this.scene.morphsphere.uniforms.u_bump, 'value', 0, 6).name('accentuation of shading').step(.02);
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
  	var timeout;
  	var oldmouse = mouse.clone();

  	var mousevec = mouse.clone();

  	mousevec.x = mousevec.x / window.innerWidth * 2 - 1;
  	mousevec.y = (1.- mousevec.y / window.innerHeight) * 2 - 1;
  	oldmouse.x = oldmouse.x / window.innerWidth * 2 - 1;
  	oldmouse.y = oldmouse.y / window.innerHeight * 2 - 1;
  }

  click() {
    // console.log('hi')
    // TweenLite.to(this.scene.morphsphere.uniforms.scale5, 2, {value: 3, ease:Power3.easeIn});
    // TweenLite.to(this.scene.morphsphere.uniforms.scale6, 2, {value: 0, ease:Power3.easeInOut});
  }
}
