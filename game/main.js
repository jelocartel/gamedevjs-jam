define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler',
  './modules/animate',
  './modules/monsterAI',
  './modules/rexIO',
  './modules/block',
  './modules/platform'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler,
  animate,
  monsterAi,
  reksio,
  block,
  platform
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
    // sceneClass.scene.add( block.mesh );

//////////////////////////////TEMP//////////////////////////////
    var monsterPlatform = {
      x: 0,
      y: 130,
      width: 200,
      height: 10,
    }
    var geometry = new THREE.BoxGeometry( monsterPlatform.width, monsterPlatform.height, 5 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.set(monsterPlatform.x, monsterPlatform.y, 0);
    sceneClass.scene.add( cube );
///////////////////////////////////////////////
    block.init().then(function() {
      sceneClass.scene.add(block.getMesh());
    });
    reksio.init().then(function() {
      reksio.mesh.position.set( -150, 10, 0 );
      sceneClass.scene.add( reksio.mesh );

      animate.jumpTo(reksio, 1 , -50, 10).then(function() {
        return animate.jumpTo(reksio, 1, 0, 47.5);
      }).then(function(){
        return animate.jumpTo(reksio, 1.5, -50, 87.5);
      }).then(function(){
        return animate.jumpTo(reksio, 2, 100, 136);
      }).then(function(){
        monsterAi.setMonster(reksio);
        monsterAi.start(monsterPlatform);
      })
    });

    platform.allPlatforms.forEach(function(el) {
      sceneClass.scene.add( el );
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
