var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Caracter).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      CastleTown: '/img/CastleTown.png',
      ball: '/img/ball.png'
    }
  },

  ready: function(stage) {
    var scene = this;
    var map, tiled;

    map = this.createElement();

    tiled = canvas.Tiled.new();

    console.log('Avant Tiled Load');
    tiled.load(this, map, '/maps/TestMap.json');
    console.log('Après Tiled Load');

    console.log('Avant Tiled Ready');
    tiled.ready(function() {
      var tileW = this.getTileWidth(),
        tileH = this.getTileHeight(),
        layerObj = this.getLayerObject();
    });
    console.log('Après Tiled Ready');

    stage.append(map);



    caracter = canvas.Caracter.new(stage, this);
    map.on('click', caracter.move);
    caracter.el.on('click', caracter.move);

  }
});