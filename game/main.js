define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler',
  './modules/animate'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler,
  animate
) {
  var scene, lights;
  var cube;

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    lights.createLights();

    // var material = new THREE.MeshLambertMaterial( { color: 0x444444, shading: THREE.FlatShading } );
    // var object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
    // object.position.set( -10, 100, -300 );
    // sceneClass.scene.add( object );
    // object = new THREE.Mesh( new THREE.SphereGeometry( 10, 10, 10 ), material );
    // console.log(object)
    // object.position.set( -300, 100, -300 );
    // sceneClass.scene.add( object );
    // scene.renderer.render(scene.scene, scene.camera);

    player.player.position.set( 0, 5, 0 );
    sceneClass.scene.add( player.player );
    sceneClass.scene.add( ground.ground );
    scene.camera.position.z = 170;
    var geometry = new THREE.BoxGeometry( 40, 40, 40 );
    var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set( -350, -50, -300 );
    sceneClass.scene.add( cube );
    scene.renderer.render(scene.scene, scene.camera);

    animate.jumpTo(cube.position ,1, '+=200', '+=0');
    animate.jumpTo(cube.position ,1, '+=100', '+=75', 1);
    animate.jumpTo(cube.position ,1.5, '-=100', '+=100', 2);
    animate.jumpTo(cube.position, 2, '+=200', '+=180', 3.5);
    // scene.renderer.shadowMapType = THREE.PCFSoftShadowMap;

    // var render = function () {
    //   requestAnimationFrame( render );
    //   // player.player.rotation.x += 0.1;
    //   player.player.rotation.y += 0.1;
    //   scene.renderer.render(scene.scene, scene.camera);
    // };
    // render();

    scene.renderer.render( scene.scene, scene.camera );
  }

  init();

  // window.addEventListener('keydown', function(evt) {
    // if (evt.keyCode === 38) {
    //   // up
    //   player.changePosition('y', 10);
    // } else if (evt.keyCode === 40) {
    //   // down
    //   player.changePosition('y', -10);
    // } else if (evt.keyCode === 37) {
    //   // left
    //   player.changePosition('x', -10);
    // } else if (evt.keyCode === 39) {
    //   // right
    //   player.changePosition('x', 10);
    // }
    // scene.renderer.render( scene.scene, scene.camera );
  // });

  function render() {
    requestAnimationFrame( render );
    // if (player.isJumping) {
    //   player.checkJump();
    // }
    // if (player.isFalling) {
    //   player.checkFall();
    // }
    player.update();
    scene.renderer.render( scene.scene, scene.camera );
  }
  render();

});
