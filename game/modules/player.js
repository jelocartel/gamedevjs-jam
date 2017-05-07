define([
  './scene',
  './frameLoader',
  './platform'
],
function(scene, frameLoader, platform) {
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

  var that = this;
  player = new THREE.Group();
  var ticks = 0;
  var speed = 2;
  var currentFrame = 0;
  var frames = [];
  var playerPosition = {
    x: 0,
    y: 0
  };

  var playerVelocity = {
    x: 0,
    y: 0
  };
  var currentAnimation = 'idle';
  var animations = {
    'idle': [0],
    'walk': [0, 1, 2, 1],
    'jump': [3],
    'action': [4, 5, 6, 7]
  };

  var changeAnimation = function(animation) {
    currentAnimation = animation;
    currentFrame = 0;
  };
  var init = function() {
    var dfd = $.Deferred();
    frameLoader.load(framesUrls).then(function(frameMeshes) {
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

  var lookBack = function() {
    TweenMax.to(player.rotation, 0.3, { y: Math.PI });
  };

  var walkLeft = function() {
    if (currentAnimation === 'walk' && playerVelocity.x === -speed) {
      return;
    }
    changeAnimation('walk');
    playerVelocity.x = -speed;
  };

  var walkRight = function() {
    if (currentAnimation === 'walk' && playerVelocity.x === speed) {
      return;
    }
    changeAnimation('walk');
    playerVelocity.x = speed;
  };

  var changeFrame = function() {
    if (!frames.length) {
      return;
    }

    player.remove(player.children[0]);

    if (animations[currentAnimation].length - 1 === currentFrame) {
      currentFrame = 0;
    } else {
      currentFrame++;
    }

    // console.log('elo');
    player.add(frames[animations[currentAnimation][currentFrame]]);
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
      changeAnimation('jump');
      fallSpeed = 0;
      isJumping = true;
      jumpSpeed = 12;
    }
  };

  var checkJump = function() {
    changeAnimation('jump');
    playerVelocity.y = jumpSpeed;
    jumpSpeed--;
    if (jumpSpeed === 0) {
      isJumping = false;
      isFalling = true;
      fallSpeed = 0;
    }
  };


  var fallStop = function() {
    if (playerVelocity.x === 0) {
      changeAnimation('idle');
    } else {
      changeAnimation('walk');
    }
    isFalling = false;
    fallSpeed = 0;
    playerVelocity.y = 0;
    lockFalling = false;
  }
  var lockFalling;

  var checkFall = function() {
    // console.log('checkFall')
    // changePosition(0, - fallSpeed);
    if(!lockFalling)
    playerVelocity.y = -fallSpeed;
    fallSpeed++;
    // console.log('fall speed = ', fallSpeed)
    // for now same as start jump Speed;
    if (fallSpeed > 13) {
      fallStop();
    }
  };

  var checkCollision = function() {
    platform.allPlatforms.forEach(function(el, ind) {
      // console.log('checkCollision', playerPosition.y, player.position.y )
      // if ((isFalling) && (playerPosition.x < el.position.x + el.geometry.parameters.width) && (playerPosition.x + player.geometry.parameters.width > el.position.x) && (playerPosition.y /*+ player.geometry.parameters.height */ > el.position.y) && (playerPosition.y + player.geometry.parameters.height < el.position.y + el.geometry.parameters.height)) {
        // e.onCollide();
        // if(isFalling) {
        //   console.log('playerY=' + player.position.y +  'platform Y = '+ (el.position.y + el.geometry.parameters.height))
        // }
        var box = new THREE.Box3().setFromObject( player );
        // console.log( box.min, box.max, box.size() );
        if (isFalling && (player.position.x < el.position.x + el.geometry.parameters.width) && (player.position.x + box.max.x > el.position.x) && (player.position.y  - el.position.y - el.geometry.parameters.height < playerVelocity.y)) {
        console.log('collision!!!!');
        playerVelocity.y = el.position.y + el.geometry.parameters.height - player.position.y;
        // console.log(playerVelocity.y)
        lockFalling = true;
        if (player.position.y === el.position.y + el.geometry.parameters.height) 
        fallStop();
      }
    })
  }

  var update = function() {
    if (ticks % 8 === 0) {
      changeFrame();
    }
    player.position.x += playerVelocity.x;
    player.position.y += playerVelocity.y;
    checkCollision();
    if (isJumping) {
      checkJump();
    }
    if (isFalling) {
      checkFall();
    }

    if (!isJumping && !isFalling) {
      if (playerVelocity.x < 0) {
        lookRight();
      } else if (playerVelocity.x > 0) {
        lookLeft();
      } else {
        changeAnimation('idle');
        lookStraight();
      }
    }

    ticks++;
  };

  return {
    init: init,
    player: player,
    walkLeft: walkLeft,
    walkRight: walkRight,
    changePosition: changePosition,
    jump: jump,
    checkJump: checkJump,
    checkFall: checkFall,
    update: update,
    playerVelocity: playerVelocity
  };

});
