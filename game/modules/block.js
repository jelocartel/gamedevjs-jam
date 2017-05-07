define([
    './frameLoader'
  ], function(frameLoader) {
  var blockFile = [
    'windows/block'
  ];
  var mesh;
  var box;
  var getSizes = function() {
    return box.size();
  };

  var init = function() {
    var dfd = $.Deferred();
    frameLoader.load(blockFile).then(function(frameMeshes) {
      mesh = frameMeshes[0];
      mesh.scale.set(4, 4, 4);
      box = new THREE.Box3().setFromObject(mesh);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.position.z = -getSizes().z/2;
      dfd.resolve(mesh);
    });
    return dfd;
  };

  return {
    init: init,
    getMesh: function() {
      return mesh;
    },
    getSizes: getSizes
  };

});
