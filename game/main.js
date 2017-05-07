define([
  './modules/scene',
  './modules/keyboardHandler'
], function(
  sceneClass
) {
  var scene, lights;


  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    var material = new THREE.MeshLambertMaterial( { color: 0x223333, shading: THREE.FlatShading } );
    var object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
    object.position.set( -10, 100, -300 );
    sceneClass.scene.add( object );
    object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
    object.position.set( -250, 100, -300 );
    sceneClass.scene.add( object );
    scene.renderer.render(scene.scene, scene.camera);

  }

  init();
});
