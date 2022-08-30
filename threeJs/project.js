var scene, camera, renderer, meshFloor;

var ambientLight, light;

var keyboard = {};
var degree = 0;
var click = 1;

var socket = {
  //camera lookAt height and movement speed
  height: 0.7,
  speed: 0.1,
};

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//responsive canvas
const canv = document.querySelector("#parent");

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.render(scene, camera); // -> Also needed
});

//init function
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    90,
    sizes.width / sizes.height,
    0.1,
    1000
  );

  //texture loader
  var texture_5 = new THREE.TextureLoader().load(
    "textures/Wood085A_1K-JPG/Wood085A_1K_Color.jpg"
  );
  var keyboard_tex = new THREE.TextureLoader().load("textures/Keyboard.png");
  var black = new THREE.TextureLoader().load("textures/black.jpg");
  var black = new THREE.TextureLoader().load("textures/black.jpg");
  var cpu_side_tex = new THREE.TextureLoader().load("textures/pc_inside.jpg");
  var cpu_front_tex = new THREE.TextureLoader().load("textures/pcfront.jpg");

  texture_5.wrapS = THREE.RepeatWrapping;
  texture_5.wrapT = THREE.RepeatWrapping;
  texture_5.repeat.set(5, 5);
  //texture loader

  // Create video and play
  let textureVid = document.createElement("video");
  textureVid.src = "textures/f.mp4"; // transform gif to mp4
  textureVid.loop = true;
  textureVid.play();

  // Load video texture
  let videoTexture = new THREE.VideoTexture(textureVid);
  videoTexture.format = THREE.RGBFormat;
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.maxFilter = THREE.NearestFilter;
  videoTexture.generateMipmaps = false;

  //keyboard
  keyboard = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.2, 0.1),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: keyboard_tex,
    })
  );
  scene.add(keyboard);
  keyboard.position.set(0, 0, -0.45);
  keyboard.rotation.x -= Math.PI / 2;
  keyboard.receiveShadow = true;
  keyboard.castShadow = true;
  //keyboard

  //monitor_panel
  monitor_panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.2, 0.1),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(monitor_panel);
  monitor_panel.position.set(0, 0, 0.0);
  monitor_panel.rotation.x -= Math.PI / 2;
  monitor_panel.receiveShadow = true;
  monitor_panel.castShadow = true;
  //monitor_panel

  //monitor_stand
  monitor_stand = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.8, 0.02),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(monitor_stand);
  monitor_stand.position.set(0, 0, 0);
  monitor_stand.receiveShadow = true;
  monitor_stand.castShadow = true;
  //monitor_stand

  //monitor
  monitor = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.8, 0.02),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(monitor);
  monitor.position.set(0, 0.6, 0);
  monitor.rotation.x += Math.PI / 24;
  monitor.receiveShadow = true;
  monitor.castShadow = true;
  //monitor

  //monitor_stand_joint
  monitor_stand_joint = new THREE.Mesh(
    new THREE.BoxGeometry(0.1, 0.05, 0.02),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(monitor_stand_joint);
  monitor_stand_joint.position.set(0, 0.35, 0);
  monitor_stand_joint.rotation.x += Math.PI / 2;
  monitor_stand_joint.receiveShadow = true;
  monitor_stand_joint.castShadow = true;
  //monitor_stand_joint

  //monitor_screen
  monitor_screen = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.76, 0.001),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(monitor_screen);
  monitor_screen.position.set(0, 0.6, -0.01);
  monitor_screen.rotation.x += Math.PI / 24;

  //monitor_screen

  //CPU
  cpu_front = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 1, 0.01), //w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: cpu_front_tex,
    })
  );
  scene.add(cpu_front);
  cpu_front.position.set(-1.9, 0.5, 0);
  //monitor.rotation.y += Math.PI / 30;

  //sideface
  cpu_side = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 2, 0.5), //w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: black,
    })
  );
  scene.add(cpu_side);

  cpu_side.position.set(-1.9, 0.0, 0.25);
  //monitor.rotation.y += Math.PI / 27;

  //cpu_sideGlass
  cpu_sideGlass = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.95, 0.47), //w,h,d
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: cpu_side_tex,
    })
  );
  scene.add(cpu_sideGlass);
  cpu_sideGlass.position.set(-1.749, 0.5, 0.25);
  //cpu_sideGlass.rotation.y += Math.PI / 50;
  cpu_sideGlass.receiveShadow = true;
  cpu_sideGlass.castShadow = true;

  //CPU

  //meshFloor
  meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 100, 100),
    new THREE.MeshPhongMaterial({
      color: 0xffffff,
      wireframe: false,
      map: texture_5,
    })
  );
  meshFloor.rotation.x -= Math.PI / 2;
  meshFloor.receiveShadow = true;
  scene.add(meshFloor);
  //meshFloor

  //light
  //AmbientLight
  ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  //pointLight
  light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.5;
  light.shadow.camera.far = 15;
  scene.add(light);
  //light

  //camera
  camera.position.set(0, socket.height, -1.5);
  camera.lookAt(new THREE.Vector3(0, socket.height, 0));
  //camera

  //renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);
  renderer.physicallyCorrectLights = false;
  //renderer

  resizeRendererToDisplaySize(renderer);

  {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  animate(); //call functionForAnimation
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

//functionForAnimation
function animate() {
  requestAnimationFrame(animate);

  //Up(w)
  if (keyboard[87]) {
    camera.position.x -= Math.sin(camera.rotation.y) * socket.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * socket.speed;
  }
  //Down(s)
  if (keyboard[83]) {
    camera.position.x += Math.sin(camera.rotation.y) * socket.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * socket.speed;
  }
  //left(a)
  if (keyboard[65]) {
    camera.position.x +=
      Math.sin(camera.rotation.y + Math.PI / 2) * socket.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y + Math.PI / 2) * socket.speed;
  }
  //Right(d)
  if (keyboard[68]) {
    camera.position.x +=
      Math.sin(camera.rotation.y - Math.PI / 2) * socket.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y - Math.PI / 2) * socket.speed;
  }

  //Left turn(q)
  if (keyboard[81]) {
    camera.rotation.y -= Math.PI * 0.01;
  }
  //Right turn(e)
  if (keyboard[69]) {
    camera.rotation.y += Math.PI * 0.01;
  }

  //lightAnimation
  if (degree < 360) {
    degree += 0.5;
  } else {
    degree = 0;
  }

  light.position.x = Math.sin((degree * Math.PI) / 180) * 3;
  light.position.z = Math.cos((degree * Math.PI) / 180) * 3;
  //lightAnimation

  renderer.render(scene, camera);
}
//functionForAnimation

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

//function for table texture change on mouse click
function onClick(event) {
  if (click <= 3) {
    click += 1;
  } else {
    click = 1;
  }
  //texture loader
  var texture_1 = new THREE.TextureLoader().load("textures/texture_1.jpg");
  var texture_2 = new THREE.TextureLoader().load("textures/texture_2.jpg");
  var texture_3 = new THREE.TextureLoader().load("textures/texture_3.jpg");
  var texture_4 = new THREE.TextureLoader().load("textures/texture_4.jpg");

  // Create video and play
  let textureVid = document.createElement("video");
  textureVid.src = "textures/f.mp4"; // transform gif to mp4
  textureVid.loop = true;
  textureVid.play();

  // Load video texture
  let videoTexture = new THREE.VideoTexture(textureVid);
  videoTexture.format = THREE.RGBFormat;
  videoTexture.minFilter = THREE.NearestFilter;
  videoTexture.maxFilter = THREE.NearestFilter;
  videoTexture.generateMipmaps = false;

  let textureVid2 = document.createElement("video");
  textureVid2.src = "textures/windows.mp4"; // transform gif to mp4
  textureVid2.loop = true;
  textureVid2.play();

  // Load video texture
  let videoTexture2 = new THREE.VideoTexture(textureVid2);
  videoTexture2.format = THREE.RGBFormat;
  videoTexture2.minFilter = THREE.NearestFilter;
  videoTexture2.maxFilter = THREE.NearestFilter;
  videoTexture2.generateMipmaps = false;

  switch (click) {
    case 1:
      monitor_screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.76, 0.001),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: videoTexture,
        })
      );
      break;
    case 2:
      monitor_screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.76, 0.001),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: texture_2,
        })
      );
      break;
    case 3:
      monitor_screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.76, 0.001),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: videoTexture,
        })
      );
      break;
    case 4:
      monitor_screen = new THREE.Mesh(
        new THREE.BoxGeometry(1.95, 0.76, 0.001),
        new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: videoTexture2,
        })
      );
      break;
    default:
  }
  scene.add(monitor_screen);
  monitor_screen.position.set(0, 0.6, -0.01);
  monitor_screen.rotation.x += Math.PI / 24;
  monitor_screen.receiveShadow = true;
  monitor_screen.castShadow = true;
}
//function for table texture change on mouse click

//eventListener
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
window.addEventListener("click", onClick);
//eventListener

window.onload = init; //call init function on load
