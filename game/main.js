define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler',
  './modules/animate',
  './modules/monsterAI'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler,
  animate,
  monsterAi
) {
  var scene, lights;
  var cube;

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    lights.createLights();

    player.player.position.set( 0, 5, 0 );
    sceneClass.scene.add( player.player );
    sceneClass.scene.add( ground.ground );
    scene.camera.position.z = 170;
    var geometry = new THREE.BoxGeometry( 20, 20, 20 );
    var material = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
    cube = new THREE.Mesh( geometry, material );
    window.cube = cube;
    cube.position.set( -150, 10, 0 );
    sceneClass.scene.add( cube );

    animate.jumpTo(cube.position ,1, '+=100', '+=0');
    animate.jumpTo(cube.position ,1, '+=50', '+=37.5', 1);
    animate.jumpTo(cube.position ,1.5, '-=50', '+=40', 2);
    animate.jumpTo(cube.position, 2, '+=100', '+=50', 3.5);
    monsterAi.setMonster(cube);
    setTimeout(function(){ monsterAi.start(); }, 6000);

  }

  init();


  function render() {
    requestAnimationFrame( render );

    player.update();
    scene.renderer.render( scene.scene, scene.camera );
  }
  render();

});
