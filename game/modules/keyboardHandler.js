define([
  './player'
],
function(player) {
  document.addEventListener('keydown', function(e) {
    switch (e.key) {
      case ' ':
        console.log('spacja')
        break;
      case 'ArrowUp':
        console.log('góra');
        // player.changePosition('y', 10);
        player.jump();
        break;
      // case 'ArrowDown':
      //   console.log('dół');
      //   player.changePosition(0, -10);
      //   break;
      case 'ArrowLeft':
        console.log('lewo');
        player.playerVelocity.x = -10;
        // player.changePosition(-10, 0);
        break;
      case 'ArrowRight':
        console.log('prawo');
        // player.changePosition(10, 0);
        player.playerVelocity.x = 10;
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
        console.log('lewo');
        // player.changePosition(-10, 0);
        player.playerVelocity.x = 0;
        break;
      case 'ArrowRight':
        console.log('prawo');
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
