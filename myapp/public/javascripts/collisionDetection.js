//Example 2 with Physijs
'use strict';
Physijs.scripts.worker = './javascripts/physijs_worker.js';
Physijs.scripts.ammo = 'ammo.js';

//init
let sceneWidth = window.innerWidth;
let sceneHeight = window.innerHeight;
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(sceneWidth, sceneHeight);

let container = document.getElementById( 'container' );
container.appendChild( renderer.domElement );

let scene = new Physijs.Scene();
let viewSize = 300;
let width = container.width();
let height = container.height();
let aspectRatio = width/height;
//scene.setGravity(new THREE.Vector3( 0, 0, 0 ));
let v3 = new THREE.Vector3;
let blockOffset = new THREE.Vector3;
let camera = new THREE.OrthographicCamera(
  -aspectRatio * viewSize / 2,
  aspectRatio * viewSize / 2,
  viewSize / 2,
  -viewSize / 2,
  0, 3000
);
scene.add(camera);
camera.position.set(0,0,15);
camera.lookAt(scene.position);
//camera.position.z = 5;

//Array for all of the meshes the moving cube will collide with
let collidableMeshList = [];

let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

let movingCube = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);
let movingMaterial = new THREE.MeshBasicMaterial({color: '#D88373', wireframe: true})

let cube = new Physijs.BoxMesh(geometry, material);
let cube2 = new Physijs.BoxMesh(geometry, material);
let cube3 = new Physijs.BoxMesh(movingCube, movingMaterial);

//let floorMaterial = new THREE.MeshBasicMaterial( {color:'#585563', side:THREE.DoubleSide} );
//let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
//let floor = new Physijs.BoxMesh(floorGeometry, floorMaterial);
// floor.position.y = -0.5;
// floor.rotation.x = Math.PI / 2;
// scene.add(floor)

//collidableMeshList.push(cube, cube2);

scene.add(cube);
scene.add(cube2);
scene.add(cube3);

//Create an update function that will clone the origin of the moving cube
//then make a for loop to iterate over all of the vertices of the moving cube
//in the for loop create a set of rays that start at the coordinates of the moving cube's mesh
//and extends to each vertex of the mesh.
//have the ray use intersectsObjects to return the array of objects it has intersected and also the distance
//of the objects from the origin of the ray.
function update (){

  cube.position.set(-2, 0, 0);
  cube2.position.set(2, 0, 0);
  cube3.position.set(0, 0, 0);
  cube3._dirtyPosition = true;

  cube.setAngularFactor(v3);
  cube.setLinearFactor(v3);

  cube2.setAngularFactor(v3);
  cube2.setLinearFactor(v3);

  cube3.setAngularFactor(v3);
  cube3.setLinearFactor(v3);

  //Event listener for keydown events on keyboard
  //Make an action for the up, down, left and right arrows
  document.addEventListener("keydown", onKeyDown, false);

  function onKeyDown(event){
    let key = event.keyCode;
    let vf = new THREE.Vector3(2,0,0);

    switch(key){
      //right
      case 39:
        cube3.setLinearFactor(vf);
        cube3.setLinearVelocity(vf);
        cube3.setAngularFactor(vf);
        cube3.setAngularVelocity(vf);
        cube3.applyCentralImpulse(vf);
        blockOffset.copy(cube2.position);

        cube3.position.add(blockOffset);


        // cube3.setLinearVelocity(v3);
        //cube3.position.multiplyScalar(5);
        //cube3.setLinearVelocity(v3);
      //  v3.copy(cube3.position).add(blockOffset).multiplyScalar(5);
        // v3.copy(cube3.position);
        // cube3.getLinearVelocity();
        //
        // console.log(cube3._physijs.position);
        //v3.copy(cube3.position).add(blockOffset).sub(cube2.position).multiplyScalar(5);
        //cube3.position.x = v3;
        //cube3.position.x -= 1;

        //console.log(cube3.getLinearVelocity())
        //cube3.applyCentralImpulse(v3);
        //cube3.position.x = blockOffset - sceneWidth ;
        //cube3.position.x = blockOffset - cube2.position.x;
        break;

      //left
      case 37:
        cube3.position.x -= 1;
        break;

      //up
      case 38:
        cube3.position.y += 1;
        break;

       //down
      case 40:
        cube3.position.y -= 1;
        break;

    }
  }


  // function handleCollision(collided_with,linearVeloctiy, AngularVelocity){
  //   switch(++this.collisions){
  //     case 1:
  //       this.setLinearVelocity(1, 0, 0);
  //       break;
  //   }
  // }
  //
  // cube3.addEventListener('collision', handleCollision)
  // let originPoint = cube3.position.clone();
  //
  //  for(let i = 0; i < cube3.geometry.vertices.length; i++){
  //    let localVertex = cube3.geometry.vertices[i].clone();
  //    let globalVertex = localVertex.applyMatrix4(cube3.matrix);
  //    let directionVector = globalVertex.sub(cube3.position);
  //
  //    let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
  //    let results =  ray.intersectObjects( collidableMeshList );
  //
  //    //if the distance is to an intersection is less than the distance between
  //    //the cube's position and the geometry's vertex, collision has occurred
  //    //console log Hit
  //    if(results.length > 0 && results[0].distance < directionVector.length()){
  //      console.log("hit")
  //    }
  //  }
}

//render the scene
let render = () =>{
  scene.simulate(undefined, 2);
  renderer.render(scene, camera);
};

//set the animation function
let animate = () => {
  update();
  requestAnimationFrame(animate);
  render();
};

animate();
