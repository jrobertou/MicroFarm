var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Sockets).
    extend(Caracter).
    extend(Players).
    extend(OthersObject).
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
  username: document.cookie.split("=")[1],
  players: null,
  otherObjects: null,

  events: function(stage, scene) {
    scene.canvasEl.on('click', {map: scene.map}, scene.map.clickOnMap);
    scene.canvasEl.mousemove({map:scene.map}, scene.map.mouseMoveOnMap); 
    $("#PanelBle").on("click", {map: scene.map}, scene.map.buildWheat);
    $("#PanelBuilding").on("click  ", {map: scene.map}, scene.map.buildBuilding);
    scene.canvasEl.on("buildWheatClick", {stage: scene.stage, scene: scene , object : scene.otherObjects} ,scene.otherObjects.addWheat);
    scene.canvasEl.on("BuildBuildingClick", {stage: scene.stage, scene: scene , object : scene.otherObjects}  , scene.otherObjects.addBuilding);
  },

  ready: function(stage) {
    var scene = this;
    this.socketInit();
    this.stage = stage;
    this.players = canvas.Players.new(stage, scene);
    scene.otherObjects = canvas.OthersObject.new(stage, scene);
    
  },
  render: function(stage) {
    stage.refresh();
  },

  initMap: function(user, others) {
    var stage = this.stage,
        scene = this;

    scene.players.playersDbArray = others;

    scene.map = canvas.Map.new(stage, scene, user.map);
    scene.canvasEl.on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    scene.mainCaracter = user;
    scene.events(stage, scene);
  },

  mapLoad: function(e) {
    console.log('map load');
    var stage = e.data.stage,
        scene = e.data.scene;

    var tmpCarac = scene.mainCaracter;

    scene.mainCaracter = canvas.Caracter.new(stage, scene, tmpCarac);
    scene.otherObjects.reinitialize();
    scene.players.reinitialize();
    scene.players.addOthers();
    
  },

  socketInit: function(){
    var game = this;

    socket.on('welcome', function (data) {
        game.initMap(data);
    });

    socket.emit('iamanewboy', {username: game.username});

    socket.on('newPlayer', function (data) {
      game.players.add(data.user);
      game.players.playersDbArray = data.players;
    });

    socket.on('playerleave', function (data) {
      game.players.remove(data.user.name);
      game.players.playersDbArray = data.players;
    });

    socket.on('move', function (data) {
      game.players.playersDbArray = data.players;
      var user = game.players.get(data.user.name);
      if(user) {
        if(user.map == game.mainCaracter.map.coordonatesToString()) {
          user.initMove(data.user.position.x, data.user.position.y);
        }
      }
    });

    socket.on('changeMap', function (data) {
      game.players.playersDbArray = data.players;
      game.players.remove(data.name);
    });
  },
});