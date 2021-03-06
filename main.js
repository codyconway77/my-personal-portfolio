import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import venomImg from './venom.jpg';
import normalImg from './normal-map-curved-lines.webp';
import backgroundImg from './pexels-hristo-fidanov-1252890.jpg';
import backgroundImg2 from './pexels-francesco-ungaro-998641.jpg';
import { AmbientLight } from 'three';

// Loading
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load(normalImg);
const venomTexture = textureLoader.load(venomImg);
const faceTexture = textureLoader.load('.face-map.jpg')
textureLoader.load(backgroundImg2, function(texture) {
  scene.background = texture;
});

// Set up
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: false,
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth , window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

// create geometry

const geometry = new THREE.SphereGeometry( 15, 32, 32);
const material = new THREE.MeshStandardMaterial( {
  color: 0xffffff,
  metalness: 0,
  roughness: 0,
  normalMap: normalTexture,
});
const sphere = new THREE.Mesh( geometry, material);

scene.add( sphere );

// Lights
const pointLight = new THREE.PointLight( 0x69c9d0, 0.75, 47 );
pointLight.position.set( -30, -30, 1);

const pointLight2 = new THREE.PointLight( 0xee1d52, 0.55, 47 );
pointLight2.position.set( 30, 30, 1);

const ambientLight = new THREE.AmbientLight( 0x404040, 0.2 );

scene.add( pointLight, pointLight2, ambientLight );

//Helpers
const lightHelper = new THREE.PointLightHelper(pointLight)

const lightHelper2 = new THREE.PointLightHelper(pointLight2)

const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, lightHelper2, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Generate stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));
  
  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

// Recursive render function
function animate() {
  requestAnimationFrame( animate );

  sphere.rotation.y += 0.01;

  controls.update();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth , window.innerHeight );
  renderer.render( scene, camera );
}

animate();
