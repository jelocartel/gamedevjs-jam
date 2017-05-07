define(function() {

  var ground = new THREE.Mesh(
    new THREE.PlaneGeometry(1000, 1000),
    new THREE.MeshLambertMaterial({
      color: 0x003300
    })
  );
  ground.castShadow = false;
  ground.receiveShadow = true;
  ground.rotation.x = -Math.PI * 0.5;


  return {
    ground: ground
  };

});
