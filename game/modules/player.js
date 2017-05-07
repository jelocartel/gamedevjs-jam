define([
  './scene',
  './frameLoader',
  './platform',
  './ground'
],
function(scene, frameLoader, platform, ground) {
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

  var actionsInterval = 3;
  var currentActionsInterval = 0;
  var isAction = false;

  var action = function() {
    if (isJumping || isFalling || currentAnimation !== 'idle') {
      return;
    }

    currentActionsInterval = 0;
    isAction = true;
    // playerVelocity.x = 0;
    // playerVelocty.y = 0;
    lookBack();
    changeAnimation('action');
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
    if ((currentAnimation === 'walk' && playerVelocity.x === -speed) || isAction) {
      return;
    }
    changeAnimation('walk');
    playerVelocity.x = -speed;
  };

  var walkRight = function() {
    if ((currentAnimation === 'walk' && playerVelocity.x === speed) || isAction) {
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
      currentActionsInterval++;
    } else {
      currentFrame++;
    }

    // console.log('elo');
    player.add(frames[animations[currentAnimation][currentFrame]]);
  };
  // var changePosition = function(x, y) {
  //   playerPosition.x += x;
  //   playerPosition.y += y;
  // };

  var isJumping = false;
  var isFalling = false;

  var jumpSpeed = 0;
  var fallSpeed = 0;

  var jump = function() {
    if(!isJumping && !isFalling) {
      changeAnimation('jump');
      fallSpeed = 0;
      isJumping = true;
      jumpSpeed = 5;
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
    } else if (currentAnimation !== 'walk') {
      changeAnimation('walk');
    }
    isFalling = false;
    fallSpeed = 0;
    playerVelocity.y = 0;
    // lockFalling = false;
  }
  // var lockFalling;

  var checkFall = function() {
    // console.log('checkFall')
    // changePosition(0, - fallSpeed);
    // if(!lockFalling)
    playerVelocity.y = -fallSpeed;
    fallSpeed++;
    // console.log('fall speed = ', fallSpeed)
    // for now same as start jump Speed;
    if (fallSpeed > 5) {
      fallStop();
    }
  };

  var checkCollision = function() {
    var box = new THREE.Box3().setFromObject( player );

    var caster = new THREE.Raycaster();
    var ray = new THREE.Vector3(0, -1, 0);
    caster.set(player.position, ray);
    // var collision = caster.intersectObjects(platforms.platforms.map(function(p){ return p.bbox; }).concat([startingPlatform]));
    var collision = caster.intersectObjects(platform.allPlatforms);
    if (collision.length) {
      for (var i = 0; i < collision.length; i++) {
        if (collision[i].distance < fallSpeed+2) {
          player.position.y = collision[i].object.position.y + 1;
          fallStop();
          // console.log(currentAnimation)
          break;
        }
      }
    }
    if (currentAnimation === 'walk' ) {
      for (var i = 0; i < collision.length; i++) {
        if (collision[i].distance > 1) {
          // console.log(collision[i])
          // player.position.y = collision[i].object.position.y + 1;
          // fallStop();
          // isJumping = false;
          isFalling = true;
          // fallSpeed = 0;
          // jumpSpeed = 0;
          // checkJump();
          break;
        }
      } 
    }
  }

  var update = function() {
    console.log(currentAnimation)
    if (ticks % 8 === 0) {
      if (currentActionsInterval === actionsInterval) {
        changeAnimation('idle');
        isAction = false;
      }
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

      if (playerVelocity.x < 0) {
        lookRight();
      } else if (playerVelocity.x > 0) {
        lookLeft();
      } else if (!isAction) {
        changeAnimation('idle');
        lookStraight();
      }

    ticks++;
  };


  return {
    init: init,
    player: player,
    action: action,
    walkLeft: walkLeft,
    walkRight: walkRight,
    jump: jump,
    checkJump: checkJump,
    checkFall: checkFall,
    update: update,
    playerVelocity: playerVelocity
  };

});
