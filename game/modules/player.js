define([
  './scene',
  './frameLoader'
],
function(scene, frameLoader) {
  var that = this;
  player = new THREE.Group();

  var speed = 2;
  var framesUrls = [
    'dobromir/walk1',
    'dobromir/walk2',
    'dobromir/walk3',
    'dobromir/jump1',
    'dobromir/mlot1',
    'dobromir/mlot2',
    'dobromir/mlot3',
    'dobromir/mlot4'
  ];
  var frames = [];

  var init = function() {
    var dfd = $.Deferred();
    frameLoader.load(framesUrls).then(function(frameMeshes) {
      console.log(frameMeshes);
      frames = frameMeshes;
      player.castShadow = true;
      player.receiveShadow = true;
      changeFrame(0);
      lookLeft();
      dfd.resolve();
    });

    return dfd;
  };

  var lookLeft = function() {
    TweenMax.to(player.rotation, 0.3, { y: Math.PI/2 });
  };

  var lookRight = function() {
    TweenMax.to(player.rotation, 0.3, { y: -Math.PI/2 });
  };

  var lookStraight = function() {
    TweenMax.to(player.rotation, 0.3, { y: 0 });
  };

  var playerPosition = {
    x: 0,
    y: 0
  };

  var playerVelocity = {
    x: 0,
    y: 0
  };

  var currentFrame = 0;

  var changeFrame = function(frame) {
    if (!frames.length) {
      return;
    }

    player.remove(frames[currentFrame]);
    currentFrame = frame;
    player.add(frames[frame]);
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

    if (playerVelocity.x < 0) {
      lookRight();
    } else if (playerVelocity.x > 0) {
      lookLeft();
    } else {
      lookStraight();
    }
  };

  return {
    init: init,
    player: player,
    speed: speed,
    changePosition: changePosition,
    jump: jump,
    checkJump: checkJump,
    checkFall: checkFall,
    update: update,
    playerVelocity: playerVelocity
  };

});
