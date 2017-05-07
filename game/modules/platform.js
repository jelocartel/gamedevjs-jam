define(function() {

  var Platform = function(x, y, length) {
    var geometry = new THREE.BoxGeometry( length, 2, 25 );
    var material = new THREE.MeshLambertMaterial( { color: 0xcc9933 } );
    var platform = new THREE.Mesh( geometry, material );

    platform.castShadow = true;
    platform.receiveShadow = true;

    platform.position.x = x;
    platform.position.y = y;

    return platform;
  };

  var allPlatforms = [];

  var createPlatform = function(x, y, length) {
    var platform = new Platform(x, y, length);
    allPlatforms.push(platform);
    return platform;
  };


  return {
    createPlatform: createPlatform,
    allPlatforms: allPlatforms
  };

});
