define([
  './player'
],
function(player) {
  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case ' ':
        break;
      case 'ArrowUp':
        // player.changePosition('y', 10);
        player.jump();
        break;
      // case 'ArrowDown':
      //   console.log('dół');
      //   player.changePosition(0, -10);
      //   break;
      case 'ArrowLeft':
        player.playerVelocity.x = -player.speed;
        // player.changePosition(-10, 0);
        break;
      case 'ArrowRight':
        // player.changePosition(10, 0);
        player.playerVelocity.x = player.speed;
        break;
      default:

    }
    //console.log(e.key);
  });

  document.addEventListener('keyup', function(e) {
    switch (e.key) {
      case ' ':
        console.log('spacja')
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
