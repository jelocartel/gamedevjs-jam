define([
  './player',
  './title'
],
function(player, title) {
  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case ' ':
        break;
      case 'ArrowUp':
        // player.changePosition('y', 10);
        player.jump();
        break;
      case 'ArrowDown':
        title.go();
        break;
      case 'ArrowLeft':
        player.walkLeft();
        // player.changePosition(-10, 0);
        break;
      case 'ArrowRight':
        // player.changePosition(10, 0);
        player.walkRight();
        break;
      default:

    }
    //console.log(e.key);
  });

  document.addEventListener('keyup', function(e) {
    switch (e.key) {
      case ' ':
        player.action();
        break;
      // case 'ArrowUp':
      //   console.log('góra');
      //   // player.changePosition('y', 10);
      //   player.jump();
      //   break;
      // case 'ArrowDown':
      //   console.log('dół');
      //   player.changePosition(0, -10);
      //   break;
      case 'ArrowLeft':
        // player.changePosition(-10, 0);
        player.playerVelocity.x = 0;
        break;
      case 'ArrowRight':
        // player.changePosition(10, 0);
        player.playerVelocity.x = 0;
        break;
      default:

    }
    //console.log(e.key);
  });

  return {
  };
});
