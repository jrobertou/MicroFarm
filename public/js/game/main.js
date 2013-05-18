var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      CastleTown: '/img/CastleTown.png'
    }
  },

  ready: function(stage) {
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
  }
});