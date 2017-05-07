define(function() {
  var level = 0;
  var monster
  var setLevel = function (lev) {
    level = lev
  }
  var setMonster = function(obj) {
    monster = obj;
  }
  var start = function() {
    var tw;
    var onRepeat= function() {
      tw.pause();
      TweenMax.to(monster.rotation, 0.5, {y:'+=' + (Math.PI), onComplete: function(){tw.resume();}} );
      var pauseTime =  ~~((Math.random() * 2900) + 1000);
      setTimeout(function() {
        tw.pause();
        monster.material.color.setHex(0xffff00);
        setTimeout(function() {
          tw.resume();
          monster.material.color.setHex(0x0000ff);
        }, 1000);
      }, pauseTime);
    }
    tw = TweenMax.to(monster.position, 3, {x:'-=200', repeat:-1, yoyo:true, onRepeat:onRepeat, repeatDelay:1.0, ease:Linear.easeNone});
  }
  return {
    setLevel: setLevel,
    setMonster: setMonster,
    start: start
  };
});
