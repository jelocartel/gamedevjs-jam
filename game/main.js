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
  'use strict';
  var scene;

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    lights.createLights();

    player.player.position.set( 0, 5, 0 );
    sceneClass.scene.add( player.player );
    sceneClass.scene.add( ground.ground );
    scene.camera.position.z = 170;
    var geometry = new THREE.BoxGeometry( 40, 40, 40 );
    var material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
    var cube = new THREE.Mesh( geometry, material );
    window.cube = cube;
    cube.position.set( -350, -50, -300 );
    sceneClass.scene.add( cube );

    animate.jumpTo(cube.position ,1, '+=200', '+=0');
    animate.jumpTo(cube.position ,1, '+=100', '+=75', 1);
    animate.jumpTo(cube.position ,1.5, '-=100', '+=100', 2);
    animate.jumpTo(cube.position, 2, '+=200', '+=180', 3.5);

  }

  init();


  function render() {
    requestAnimationFrame( render );
    player.update();
    scene.renderer.render( scene.scene, scene.camera );
  }
  render();

});
