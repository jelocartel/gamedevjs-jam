define([
  './scene',
  './frameLoader'
],
function(scene, frameLoader) {
  var framesUrls = [
    'reksio/1',
    'reksio/2',
    'reksio/3',
    'reksio/stempel1',
    'reksio/stempel2',
    'reksio/stempel3',
  ];

  var that = this;
  monster = new THREE.Group();
  var ticks = 0;
  var speed = 2;
  var currentFrame = 0;
  var frames = [];
  var monsterPosition = {
    x: 0,
    y: 0
  };

  var monsterVelocity = {
    x: 0,
    y: 0
  };
  var currentAnimation = 'walk';
  var animations = {
    'idle': [0],
    'walk': [0, 1, 2, 1],
    'jump': [2],
    'action': [3, 4, 5]
  };

  var changeAnimation = function(animation) {
    currentAnimation = animation;
    currentFrame = 0;
  };
  var init = function() {
    var dfd = $.Deferred();
    frameLoader.load(framesUrls).then(function(frameMeshes) {
      frames = frameMeshes;
      monster.castShadow = true;
      monster.receiveShadow = true;
      changeFrame(0);
      lookLeft();
      dfd.resolve();
    });

    return dfd;
  };

  var lookLeft = function(cb) {
    cb = cb || function(){};
    TweenMax.to(monster.rotation, 0.3, { y: Math.PI/2 , onComplete: function(){ cb();}});
  };

  var lookRight = function(cb) {
    cb = cb || function(){};
    TweenMax.to(monster.rotation, 0.3, { y: -Math.PI/2, onComplete: function(){ cb();}});
  };

  var lookStraight = function(cb) {
    cb = cb || function(){};
    TweenMax.to(monster.rotation, 0.3, { y: 0, onComplete: function(){ cb();} });
  };

  var lookBack = function() {
    TweenMax.to(monster.rotation, 0.3, { y: Math.PI });
  };

  var walkLeft = function() {
    if (currentAnimation === 'walk' && monsterVelocity.x === -speed) {
      return;
    }
    changeAnimation('walk');
    monsterVelocity.x = -speed;
  };

  var walkRight = function() {
    if (currentAnimation === 'walk' && monsterVelocity.x === speed) {
      return;
    }
    changeAnimation('walk');
    monsterVelocity.x = speed;
  };

  var changeFrame = function() {
    if (!frames.length) {
      return;
    }

    monster.remove(monster.children[0]);

    if (animations[currentAnimation].length - 1 === currentFrame) {
      currentFrame = 0;
    } else {
      currentFrame++;
    }

    // console.log('elo');
    monster.add(frames[animations[currentAnimation][currentFrame]]);
  };

  var isJumping = false;
  var isFalling = false;

  var jumpSpeed = 0;
  var fallSpeed = 0;

  var update = function() {
    if (ticks % 8 === 0) {
      changeFrame();
    }
    ticks++;
  };

  return {
    init: init,
    mesh: monster,
    lookBack: lookBack,
    lookLeft: lookLeft,
    lookRight:lookRight,
    lookStraight: lookStraight,
    changeAnimation: changeAnimation,
    update: update,
  };

});
