define([
    './frameLoader',
    './scene'
  ], function(frameLoader, scene) {
  var blockFile = [
    'title'
  ];
  var mesh;
  var box;
  var getSizes = function() {
    return box.size();
  };
  var dfd = $.Deferred();
  var init = function() {

    frameLoader.load(blockFile).then(function(frameMeshes) {
      mesh = frameMeshes[0];
      mesh.scale.set(4, 4, 4);
      mesh.position.z += 10;
      box = new THREE.Box3().setFromObject(mesh);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      // mesh.position.z = -getSizes().z/2;
      scene.scene.add(mesh);
    });
    return dfd;
  };

  var go = function() {
    TweenMax.to(mesh.position, 1, { y: -150, onComplete: function() {
      TweenMax.to(scene.camera.rotation, 1, { x: 0});
      TweenMax.to(scene.camera.position, 1, { x: 0, y: 80, z: 145, onComplete: dfd.resolve });
    }});
  };

  return {
    init: init,
    getMesh: function() {
      return mesh;
    },
    getSizes: getSizes,
    go: go
  };

});
