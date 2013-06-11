var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Sockets).
    extend(Caracter).
    extend(Map).
    extend(Animation).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      CastleTown: '/img/CastleTown.png',
      ball: '/img/ball.png',
      chara: '/img/chara.png',
    }
  },
  canvasEl: $("#canvas_id"),
  map: null,
  mainCaracter: null,

  events: function(stage, scene) {
    scene.canvasEl.on('click', {map: scene.map}, scene.map.clickOnMap);
    scene.canvasEl.mousemove({map:scene.map}, scene.map.mouseMoveOnMap); 
  },

  ready: function(stage) {
    var scene = this;

    scene.map = canvas.Map.new(stage, scene);
    scene.canvasEl.on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    
  },
  render: function(stage) {
    stage.refresh();
  },

  mapLoad: function(e) {
    console.log('map load')
    var stage = e.data.stage,
        scene = e.data.scene;
    if(scene.mainCaracter === null) {
      scene.mainCaracter = canvas.Caracter.new(stage, scene);
      scene.events(stage, scene);
    }
    else {
      var tmpCarac = scene.mainCaracter;
      scene.mainCaracter.remove();

      scene.mainCaracter = canvas.Caracter.new(stage, scene, tmpCarac);
      scene.events(stage, scene);
    }
  }
});