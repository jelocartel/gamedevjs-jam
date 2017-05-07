define(function() {

  var geometry = new THREE.BoxGeometry( 10000, 1, 10000 );
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
  var ground = new THREE.Mesh( geometry, material );
  
  // ground.castShadow = true;
  ground.receiveShadow = true;

  return {
    ground: ground
  };

});
