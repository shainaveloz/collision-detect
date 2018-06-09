var world;
var mass;
var body;
var shape;
var timeStep = 1/60;
var camera;
var scene;
var renderer;
var geometry;
var material;
var mesh;

initCannon();
initThree();

function initCannon(){
  world = new CANNON.World();
  world.gravity.set(0,0,0);
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 10;

  shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
  mass = 1;
  body = new CANNON.Body({
   mass: 1
  });
  body.addShape(shape);
  body.angularVelocity.set(0,10,0);
  body.angularDamping = 0.5;
  world.addBody(body);
}

function initThree(){
  let sceneWidth = window.innerWidth;
  let sceneHeight = window.innerHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 1, 100 );
  camera.position.z = 5;
  scene.add(camera);

  geometry = new THREE.BoxGeometry( 2, 2, 2 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  let container = document.getElementById( 'container' );
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( sceneWidth, sceneHeight );
  container.appendChild( renderer.domElement );
}

function animate() {
    requestAnimationFrame( animate );
    updatePhysics();
    render();
}

function updatePhysics() {
    // Step the physics world
    world.step(timeStep);
    // Copy coordinates from Cannon.js to Three.js
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
}
function render() {
    renderer.render( scene, camera );
}
animate();
