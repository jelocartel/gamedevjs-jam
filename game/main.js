define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler',
  './modules/animate',
  './modules/monsterAI',
  './modules/rexIO'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler,
  animate,
  monsterAi,
  reksio
) {
  'use strict';
  var scene;

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    lights.createLights();
    player.init().then(function() {
      sceneClass.scene.add( player.player );
    });
    sceneClass.scene.add( ground.ground );
    scene.camera.position.z = 170;

    reksio.init().then(function() {
      reksio.mesh.position.set( -150, 10, 0 );
      sceneClass.scene.add( reksio.mesh );

      animate.jumpTo(reksio.mesh.position ,1, '+=100', '+=0');
      animate.jumpTo(reksio.mesh.position ,1, '+=50', '+=37.5', 1);
      animate.jumpTo(reksio.mesh.position ,1.5, '-=50', '+=40', 2);
      animate.jumpTo(reksio.mesh.position, 2, '+=100', '+=50', 3.5);
      monsterAi.setMonster(reksio);
      setTimeout(function(){ monsterAi.start(); }, 6000);
    });

    render();
  }

  function render() {
    requestAnimationFrame( render );
    player.update();
    reksio.update();
    scene.renderer.render( scene.scene, scene.camera );
  }

  window.onload = init;

});
