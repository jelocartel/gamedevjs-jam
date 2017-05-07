define(function() {

  var Platform = function(x, y, length) {
    var geometry = new THREE.BoxGeometry( length, 1, 1 );
    var material = new THREE.MeshLambertMaterial( { color: 0x0000ff } );
    var platform = new THREE.Mesh( geometry, material );
    
    platform.castShadow = true;
    platform.receiveShadow = true;

    platform.position.x = x;
    platform.position.y = y;

    return platform;
  };

  var createPlatform = function(x, y, length) {
    var platform = new Platform(x, y, length);
    return platform;
  }

  var platform1 = createPlatform(0, 40, 100);
  var platform2 = createPlatform(-30, 80, 130);
  var platform3 = createPlatform(-10, 120, 50);

  var allPlatforms = [platform1, platform2, platform3];

  return {
    // createPlatform: createPlatform
    allPlatforms: allPlatforms
  };

});
