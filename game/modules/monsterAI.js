define([
  './animate'
],function(animate) {
  var level = 0;
  var monster
  var setLevel = function (lev) {
    level = lev
  }
  var setMonster = function(obj) {
    monster = obj;
  }
  var start = function() {
    var platform = {
      x: -50,
      y: 130,
      width: 200,
      height: 10,
    }
    var tw;
    var startDirection;
    if(Math.abs(platform.x - monster.mesh.position.x) < (platform.width/2)) {
      startDirection = 'left';
    } else {
      startDirection = 'right';
    }
    if (startDirection==='right') {
      monster.lookRight();
    } else {
      monster.lookLeft();
    }

    var onRepeat = function() {
      tw.pause();
      startDirection = startDirection === 'right' ? 'left': 'right';
      if (startDirection==='right') {
        monster.lookRight(function(){tw.resume();});
      } else {
        monster.lookLeft(function(){tw.resume();});
      }
      var pauseTime =  ~~((Math.random() * 2500) + 1000);
      animate.dfdTimeOut(function(){
        tw.pause();
        monster.lookStraight();
        monster.changeAnimation('action');
      }, pauseTime).then(function(){
        return animate.dfdTimeOut(function(){
          if (startDirection==='right') {
            monster.lookRight();
          } else {
            monster.lookLeft();
          }
          tw.resume();
          monster.changeAnimation('walk');
        }, 1000);
      });
    };
    tw = TweenMax.to(monster.mesh.position, 3, {x:'-=200', repeat:-1, yoyo:true, onRepeat:onRepeat, repeatDelay:1.0, ease:Linear.easeNone});
  };
  return {
    setLevel: setLevel,
    setMonster: setMonster,
    start: start
  };
});
