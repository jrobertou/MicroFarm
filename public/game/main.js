var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Sockets).
    extend(Caracter).
    extend(OtherPlayers).
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
  otherPlayers: null,

  events: function(stage, scene) {
    scene.canvasEl.on('click', {map: scene.map}, scene.map.clickOnMap);
    scene.canvasEl.mousemove({map:scene.map}, scene.map.mouseMoveOnMap); 
    $("#PanelBle").on("click", {map: scene.map}, scene.map.buildWheat);
    $("#PanelBuilding").on("click", {map: scene.map}, scene.map.buildBuilding);
    scene.canvasEl.on("buildWheatClick", canvas.Plantation.new);
    scene.canvasEl.on("BuildBuildingClick", canvas.Building.new);
  },

  ready: function(stage) {
    var scene = this;
    this.socketInit();
    this.stage = stage;
    this.otherPlayers = canvas.OtherPlayers.new(stage, scene);
    
  },
  render: function(stage) {
    stage.refresh();
  },

  initMap: function(param) {
    var stage = this.stage,
        scene = this;

    scene.otherPlayers.othersArray = param.others;
    scene.map = canvas.Map.new(stage, scene, param.me.map);
    scene.canvasEl.on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    scene.mainCaracter = param.me;
  },

  mapLoad: function(e) {
    console.log('map load');
    var stage = e.data.stage,
        scene = e.data.scene;

    var tmpCarac = scene.mainCaracter;

    scene.mainCaracter = canvas.Caracter.new(stage, scene, tmpCarac);
    scene.events(stage, scene);
    scene.otherPlayers.reinitialize();
    scene.otherPlayers.addOthers();
    
  },

  socketInit: function(){
    var game = this;

    socket.on('welcome', function (data) {
      game.initMap(data);
    });

    socket.emit('iamanewboy', {username: game.username});

    socket.on('newOtherPlayers', function (data) {
      game.otherPlayers.add(data);
    });

    socket.on('playerleave', function (data) {
      game.otherPlayers.remove(data.name);
    });

    socket.on('move', function (data) {
      game.otherPlayers.othersArray = data.players;
      var user = game.otherPlayers.get(data.user.name);
      if(user)
        user.initMove(data.user.position.x, data.user.position.y);
    });

    socket.on('moveMap', function (data) {
      game.otherPlayers.othersArray = data.players;
      game.otherPlayers.remove(data.name);
    });
  },
});