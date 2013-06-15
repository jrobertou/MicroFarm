var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Sockets).
    extend(Caracter).
    extend(Map).
    extend(Animation).
    extend(Plantation).
    extend(Building).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      Sprite: '/img/Sprite.png',
      Building: '/img/building.png',
      ball: '/img/ball.png',
      chara: '/img/chara.png',
    }
  },
  canvasEl: $("#canvas_id"),
  map: null,
  mainCaracter: null,
  gameSockets: null,
  socket: null,

  events: function(stage, scene) {
    scene.canvasEl.on('click', {map: scene.map}, scene.map.clickOnMap);
    scene.canvasEl.mousemove({map:scene.map}, scene.map.mouseMoveOnMap); 
    $("#PanelBle").on("click", {map: scene.map}, scene.map.buildWheat);
    $("#PanelBuilding").on("click", {map: scene.map}, scene.map.buildBuilding);
    scene.canvasEl.on("buildWheatClick", canvas.Plantation.new);
    scene.canvasEl.on("BuildBuildingClick", canvas.Building.new);
  },

  ready: function(stage) {
    this.socketInit();
    
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
  },

  socketInit: function(){

    socket.on('youData', function (data) {
      console.log(data);
    });
  },
});