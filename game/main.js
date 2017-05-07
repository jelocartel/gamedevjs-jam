define([
  './modules/scene',
  './modules/keyboardHandler',
  './modules/animate'
], function(
  sceneClass,
  keyboardHandler,
  animate
) {
  var scene, lights;
  var cube;
  var prog = 0;
  var step = function() {
    if(prog>4) {
      prog=0;
      //cube.rotation.x = cube.rotation.x +0.1;
    }
    prog++;
    scene.renderer.render(scene.scene, scene.camera);
    window.requestAnimationFrame(step);
  }

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;

    var geometry = new THREE.BoxGeometry( 40, 40, 40 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    cube = new THREE.Mesh( geometry, material );
    cube.position.set( -350, -50, -300 );
    sceneClass.scene.add( cube );
    scene.renderer.render(scene.scene, scene.camera);

    window.requestAnimationFrame(step);
    animate.jumpTo(cube.position ,1, '+=200', '+=0');
    animate.jumpTo(cube.position ,1, '+=100', '+=75', 1);
    animate.jumpTo(cube.position ,1.5, '-=100', '+=100', 2);
    animate.jumpTo(cube.position, 2, '+=200', '+=180', 3.5)
    //ease: Back.easeOut.config( 1.7)
  }

  init();
});
