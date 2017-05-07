define([
  './modules/scene',
  './modules/player',
  './modules/ground',
  './modules/lights',
  './modules/keyboardHandler',
  './modules/animate',
  './modules/monsterAI',
  './modules/rexIO',
  './modules/block',
  './modules/platform',
  './modules/windows',
  './modules/title'
], function(
  sceneClass,
  player,
  ground,
  lights,
  keyboardHandler,
  animate,
  monsterAi,
  reksio,
  block,
  platform,
  windows,
  title
) {
  'use strict';
  var scene;

  function init(event) {
    scene = sceneClass.createScene();
    sceneClass.scene = scene.scene;
    sceneClass.camera = scene.camera;
    lights.createLights();
    player.init().then(function() {
      sceneClass.scene.add( player.player );
    });

    sceneClass.scene.add( ground.ground );
    // sceneClass.scene.add( block.mesh );

    var monsterPlatform = {
      x: 0,
      y: 130,
      width: 1,
      height: 2,
    };

    block.init().then(function() {
      sceneClass.scene.add(block.getMesh());
      monsterPlatform.width = block.getSizes().x;
      //////////////////////////////TEMP//////////////////////////////

      var geometry = new THREE.BoxGeometry( monsterPlatform.width, monsterPlatform.height, 5 );
      var material = new THREE.MeshBasicMaterial( {color: 0x613000} );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.set(monsterPlatform.x, monsterPlatform.y, 0);
      sceneClass.scene.add( cube );
      ///////////////////////////////////////////////
    });

    var windowPositions = [];
    var platforms = [];
    windows.init().then(function() {
      var windowRows = 3;
      var windowCollumns = 6;
      var wrow = [];
      var windowsMarginHorizontal = block.getSizes().x/(windowCollumns+1);
      var windowsMarginVertical = block.getSizes().y/(windowRows+2);
      var startHor = -block.getSizes().x/2 + windowsMarginHorizontal;
      var startVer = 20;
      for (var j = 0; j< windowRows; j++) {
        windowPositions[j] = [];
        for (var i = 0; i < windowCollumns; i++) {
          var win = windows.createWindow();
          win.position.x = startHor + i * windowsMarginHorizontal;
          win.position.z = -10;
          win.position.y = startVer + j *windowsMarginVertical;
          sceneClass.scene.add(win);
          windowPositions[j].push(win);
          var plat = platform.createPlatform(0, 1.5, win.sizes().x+2);
          plat.name = j+'-'+i;
          win.name = j+'-'+i;
          platforms.push(plat);
          window.platform = plat;
          win.add(plat);
        }
      }
    }).then(function() {
      return title.init();
    }).then(function() {
      return reksio.init();
    }).then(function() {
      reksio.mesh.position.set( -150, 0, -5 );
      sceneClass.scene.add( reksio.mesh );

      var queue = [];
      queue.push([1 , -50, 0, null]);

      windowPositions.forEach(function(el) {
        var myWin = el[~~(Math.random()*6)];
        queue.push([1.5 , myWin.position.x, myWin.position.y+3, myWin]);
      });
      queue.push([1 , 20, 130, null]);

      var d = $.Deferred().resolve();
      while (queue.length > 0) {
        d = d.then(function(params) {
          return function() {
            return animate.jumpTo(reksio, params[0], params[1], params[2]).then(function(){
              if(params[3]) {
              var d = $.Deferred();
              reksio.lookStraight(function(){d.resolve();});
              return d;
            } else {
              return $.Deferred().resolve();
            }

            }).then(function(){
              if(params[3]) {
                reksio.changeAnimation('action');
              }
              return $.Deferred().resolve();
            }).then(function() {
              if(params[3]) {
                params[3].break();
              }
              return $.Deferred().resolve();
            }).then(function(){
              return animate.dfdTimeOut(function(){
                reksio.changeAnimation('walk');
              }, 800);
            });
          }
        }(queue.shift())); // you don't need the `.done`
      }
      d.then(function(){
        monsterAi.setMonster(reksio);
        monsterAi.setCallBack(function() {
          var geometry = new THREE.BoxGeometry( 15, 8 , 5 );
          var material = new THREE.MeshBasicMaterial( {color: 0xc13000} );
          var cube = new THREE.Mesh( geometry, material );
          cube.position.set(reksio.mesh.position.x, monsterPlatform.y, 0);
          sceneClass.scene.add( cube );
          TweenMax.to(cube.position, 2, { y: -30});
        });
        monsterAi.start(monsterPlatform);
      });
    });
    render();

  }

  function render() {
    requestAnimationFrame( render );
    player.update();
    reksio.update();
    scene.renderer.render( scene.scene, scene.camera );
  }

  window.onload = init;

});
