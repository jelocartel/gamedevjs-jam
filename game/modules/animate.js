define(function() {
  var jumpTo = function(obj, time, x, y, delay) {
    delay = delay || 0;
    TweenMax.to(obj, time, { x: x, delay: delay});
    TweenMax.to(obj, time, {ease: Back.easeOut.config( 2.0), y: y, delay: delay});
  }


  return {
    jumpTo: jumpTo
  };
});
