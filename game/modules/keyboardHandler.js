define(function() {

  document.addEventListener('keypress', function(e) {
    switch (e.key) {
      case ' ':
        console.log('spacja')
        break;
      case 'ArrowUp':
        console.log('góra')
        break;
      case 'ArrowDown':
        console.log('dół')
        break;
      case 'ArrowLeft':
        console.log('lewo')
        break;
      case 'ArrowRight':
        console.log('prawo')
        break;
      default:

    }
    //console.log(e.key);
  });

  return {
  };
});
