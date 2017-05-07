define([
  './scene'
],
function(scene) {
  var that = this;

	var geometry = new THREE.BoxGeometry( 20, 20, 20 );
	var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	var player = new THREE.Mesh( geometry, material );
  player.castShadow = true;
  player.receiveShadow = true;

  var playerPosition = {
    x: player.position.x,
    y: player.position.y
  };

  var playerVelocity = {
    x: 0,
    y: 0
  };

  var changePosition = function(x, y) {
    playerPosition.x += x;
    playerPosition.y += y;
  };

  var isJumping = false;
  var isFalling = false;

  var jumpSpeed = 0;
  var fallSpeed = 0;

  var jump = function() {
    if(!isJumping && !isFalling) {
      fallSpeed = 0;
      isJumping = true;
      jumpSpeed = 10;
    }
  };

  var checkJump = function() {
    playerVelocity.y = jumpSpeed;
    jumpSpeed--;
    if (jumpSpeed === 0) {
      isJumping = false;
      isFalling = true;
      fallSpeed = 0;
    }
  };


  var fallStop = function() {
    isFalling = false;
    fallSpeed = 0;
    playerVelocity.y = 0;
  };


  var checkFall = function() {
    playerVelocity.y = -fallSpeed;
    fallSpeed++;
    if (fallSpeed > 11) {
      fallStop();
    }
  };

  var update = function() {
      player.position.x += playerVelocity.x;
    player.position.y += playerVelocity.y;
    if (isJumping) {
      checkJump();
    }
    if (isFalling) {
      checkFall();
    }

  };

  return {
    player: player,
    changePosition: changePosition,
    jump: jump,
    checkJump: checkJump,
    checkFall: checkFall,
    update: update,
    playerVelocity: playerVelocity
  };

});
