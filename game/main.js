define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler
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
    scene.renderer.render( scene.scene, scene.camera );
  }

  init();
  function render() {
    requestAnimationFrame( render );
    player.update();
    scene.renderer.render( scene.scene, scene.camera );
  }
  render();
});
