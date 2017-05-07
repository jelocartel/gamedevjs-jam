define(function() {
  var jumpTo = function(obj, time, x, y, delay) {
    var dfd = $.Deferred();
    delay = delay || 0.3;
    if(obj.mesh.position.x > x) {
      obj.lookRight();
    } else {
      obj.lookLeft();
    }
    TweenMax.to(obj.mesh.position, time, { x: x, delay: delay});
    TweenMax.to(obj.mesh.position, time, {ease: Back.easeOut.config( 2.0), y: y, delay: delay, onComplete: function(){ dfd.resolve();}});
    return dfd;
  }
  var dfdTimeOut = function(toDo, time) {
    var dfd = $.Deferred();
    setTimeout(function() {
      toDo();
      dfd.resolve();
    }, time);
    return dfd;
  }

  return {
    jumpTo: jumpTo,
    dfdTimeOut: dfdTimeOut
  };
});
