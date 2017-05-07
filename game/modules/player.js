define([
  './scene'
],
function(scene) {
  var that = this;

	var geometry = new THREE.BoxGeometry( 20, 20, 20 );
	var material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
	var player = new THREE.Mesh( geometry, material );
  player.castShadow = true;
  // player.receiveShadow = true;

  var playerPosition = {
    x: player.position.x,
    y: player.position.y
  }
  var playerVelocity = {
    x: 0,
    y: 0
  }

  var changePosition = function(x, y) {
    // console.log('player changePosition ', axis, delta)
    // player.position.x += x;
    // player.position.y += y;
    playerPosition.x += x;
    playerPosition.y += y;
  };

  // var X = 0;
  // var Y = 0;

  var isJumping = false;
  var isFalling = false;

  var jumpSpeed = 0;
  var fallSpeed = 0;

  var jump = function() {
    // console.log('jump')
    if(!isJumping && !isFalling) {
      fallSpeed = 0;
      isJumping = true;
      jumpSpeed = 10;
    }
  }
  var checkJump = function() {
    // console.log('checkJump')
    // setPosition(X, Y - jumpSpeed);
    // changePosition(0, jumpSpeed);
    playerVelocity.y = jumpSpeed;
    jumpSpeed--;
    if (jumpSpeed === 0) {
      isJumping = false;
      isFalling = true;
      fallSpeed = 0;
    }
  }

  var fallStop = function() {
    console.log('stop  fall')
    isFalling = false;
    fallSpeed = 0;
    playerVelocity.y = 0;gti
    //that.jump();
  }


  var checkFall = function() {
    // console.log('checkFall')
    // changePosition(0, - fallSpeed);
    playerVelocity.y = -fallSpeed;
    fallSpeed++;
    // console.log('fall speed = ', fallSpeed)
    // for now same as start jump Speed;
    if (fallSpeed > 11) {
      console.log('elo');
      fallStop();
    }
    // if(that.Y < canvas.height - that.height) {
    //   that.setPosition(that.X, that.Y + that.fallSpeed);
    //   that.fallSpeed++;
    // } else {
    //   that.fallStop();
    // }
  }

  var update = function() {
    // console.log('update');
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
