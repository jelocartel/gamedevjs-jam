define(function() {
  var scene,
      camera,
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane,
      renderer,
      container;

  var HEIGHT, WIDTH;

  var createScene = function() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;

    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
      );

    window.cam = camera;
    camera.position.x = 0;
    camera.position.z = 200;
    camera.position.y = 150;
    camera.rotation.x = -0.3;

    scene.fog = new THREE.Fog(0xefd1b5, 0.0025, 700);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;

    container = document.getElementById('game');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', handleWindowResize, false);

    return {
      scene: scene,
      renderer: renderer,
      camera: camera,
      WIDTH: WIDTH,
      HEIGHT: HEIGHT
    };
  };

  var handleWindowResize = function() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  };

  var refreshCamera = function(cb) {
    TweenMax.to(camera.rotation, 1, { x: 0});
    TweenMax.to(camera.position, 1, { x: 0, y: 80, z: 145, onComplete: cb });
  };

  return {
    refreshCamera: refreshCamera,
    createScene: createScene,
    scene: scene,
    camera: camera
  };
});
