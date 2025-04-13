import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* == Camera, Renderer, Scene == */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4110);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

/* == Window Resize Event == */

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

/* == Loading GLTF Models (Sun, Mercury, Venus) == */

let sun;
const loader = new GLTFLoader();

loader.load(
  './sun.glb',
  function (gltf) {
    sun = gltf.scene;
    sun.scale.set(1.5, 1.5, 1.5);
    scene.add(sun);
  },
  function (progress) {
    console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred:', error);
  }
);

let mercury, venus, mars, earth, jupiter, saturn, uranus, neptune;

loader.load(
  './mercury.glb',
  function (gltf) {
    mercury = gltf.scene;
    mercury.position.set(20, 0, 0);
    mercury.scale.set(0.5, 0.5, 0.5);
    scene.add(mercury);
  },
  function (progress) {
    console.log('Loading mercury progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading mercury:', error);
  }
);

loader.load(
  './venus_v1.1.glb',
  function (gltf) {
    venus = gltf.scene;
    venus.position.set(40, 0, 0);
    venus.scale.set(0.6, 0.6, 0.6);
    scene.add(venus);
  },
  function (progress) {
    console.log('Loading venus progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading venus:', error);
  }
);

loader.load(
  './earth.glb',
  function (gltf) {
    earth = gltf.scene;
    earth.position.set(40, 0, 0);
    earth.scale.set(1.4, 1.4, 1.4);
    scene.add(earth);
  },
  function (progress) {
    console.log('Loading earth progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading earth:', error);
  }
)

loader.load(
  './mars.glb',
  function (gltf) {
    mars = gltf.scene;
    mars.position.set(60, 0, 0);
    mars.scale.set(0.1, 0.1, 0.1);
    scene.add(mars);
  },
  function (progress) {
    console.log('Loading mars progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading mars:', error);
  }
)

loader.load(
  './jupiter.glb',
  function (gltf) {
    jupiter = gltf.scene;
    jupiter.position.set(80, 0, 0);
    jupiter.scale.set(0.05, 0.05, 0.05);
    scene.add(jupiter);
  },
  function (progress) {
    console.log('Loading jupiter progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading jupiter:', error);
  }
)

loader.load(
  './saturn_planet.glb',
  function (gltf) {
    saturn = gltf.scene;
    saturn.position.set(100, 0, 0);
    saturn.scale.set(3, 3, 3);
    scene.add(saturn);
  },
  function (progress) {
    console.log('Loading saturn progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading saturn:', error);
  }
)

loader.load(
  './urambus.glb',
  function (gltf) {
    uranus = gltf.scene;
    uranus.position.set(120, 0, 0);
    uranus.scale.set(0.03, 0.03, 0.03);
    scene.add(uranus);
  },
  function (progress) {
    console.log('Loading uranus progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading uranus:', error);
  }
)

loader.load(
  './neptune.glb',
  function (gltf) {
    neptune = gltf.scene;
    neptune.position.set(140, 0, 0);
    neptune.scale.set(1.2, 1.2, 1.2);
    scene.add(neptune);
  },
  function (progress) {
    console.log('Loading neptune progress:', (progress.loaded / progress.total * 100) + '%');
  },
  function (error) {
    console.error('An error occurred while loading neptune:', error);
  }
)

/* == Lighting Setup == */

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 0, 0);

const ambientLight = new THREE.AmbientLight(0x888a89, 2);
scene.add(pointLight, ambientLight);

/* == Starfield Creation == */

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 64, 64);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => Math.random() * 200 - 100);
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

/* == Planet Circumferences == */

const createCircumference = (radius) => {
  const geometry = new THREE.RingGeometry(radius, radius + 0.1, 64);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  ring.scale.set(1, 1, 1);
  return ring;
};

const mercuryCircumference = createCircumference(20);
scene.add(mercuryCircumference);

const venusCircumference = createCircumference(25);
scene.add(venusCircumference);

const earthCircumference = createCircumference(30);
scene.add(earthCircumference);

const marsCircumference = createCircumference(35);
scene.add(marsCircumference);

const jupiterCircumference = createCircumference(45);
scene.add(jupiterCircumference);

const saturnCircumference = createCircumference(60);
scene.add(saturnCircumference);

const uranusCircumference = createCircumference(75);
scene.add(uranusCircumference);

const neptuneCircumference = createCircumference(85);
scene.add(neptuneCircumference);

/* == Orbit Controls with Damping == */

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

/* == Animation Helpers for Orbits and Rotation == */

function updateOrbit(planet, radius, speed, timeOffset = 0) {
  const time = Date.now() * 0.001 + timeOffset;
  planet.position.x = Math.cos(time * speed) * radius;
  planet.position.z = Math.sin(time * speed) * radius;
}

function Rotation(planet, x, y, z) {
  planet.rotation.set(x, y, z)
}

/* == Animation Loop == */

function animate() {
  requestAnimationFrame(animate);

  if (mercury) {
    updateOrbit(mercury, 20, 0.05);
    Rotation(mercury, 0, 0.0003, 0)
  }
  if (venus) {
    updateOrbit(venus, 25, 0.03);
    Rotation(venus, 0, -0.0001, 0.0001)
  }
  if (earth) {
    updateOrbit(earth, 30, 0.02)
    Rotation(earth, 0.02, 0.05, 0)
  }
  if (mars) {
    updateOrbit(mars, 35, 0.01)
    Rotation(mars, 0.02, 0.05, 0.01)
  }
  if (jupiter) {
    updateOrbit(jupiter, 45, 0.01);
    Rotation(jupiter, 0.01, 0.2, 0)
  }

  if (saturn) {
    updateOrbit(saturn, 60, 0.01);
    Rotation(saturn, 0.02, 0.2, 0.01)
  }

  if (uranus) {
    updateOrbit(uranus, 75, 0.01);
    Rotation(uranus, 0.02, 0.2, 0.01)
  }

  if (neptune) {
    updateOrbit(neptune, 83, 0.01);
    Rotation(neptune, 0.02, 0.2, 0.01)
  }

  Rotation(sun, 5, 5, 5)

  controls.update();
  renderer.render(scene, camera);
}

animate();