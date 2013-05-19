var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Caracter).
    extend(Map).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      CastleTown: '/img/CastleTown.png',
      ball: '/img/ball.png',
      chara: '/img/chara.png'
    }
  },
  map: null,
  mainCaracter: null,


  ready: function(stage) {
    var scene = this;

    scene.map = canvas.Map.new(stage, this);

    $("#canvas_id").on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    
  },

  mapLoad: function(e){
    var stage = e.data.stage,
      scene = e.data.scene;

    scene.mainCaracter = canvas.Caracter.new(stage, scene);
    $("#canvas_id").on('click', {caracter: scene.mainCaracter}, scene.mainCaracter.move);
  }
});