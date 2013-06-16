Class.create("OtherPlayers", {
	othersPlayers: [],
  names: [],
  stage: null,
  scene: null,

  initialize: function(stage, scene) {
    this.stage = stage;
    this.scene = scene;
  },

  add: function(El) {
    var newPlayer = canvas.Caracter.new(stage, scene, El);
    this.names.push(newPlayer.name);
    this.othersPlayers.push(newPlayer);
  },

  get: function(name){
    var i = this.names.indexOf(name);
    if(i != -1) {
      return this.othersPlayers.splice(i, 1);
    }
  },

  remove: function(name) {
    var i = this.names.indexOf(name);
    if(i != -1) {
      this.names.splice(i, 1);
      this.othersPlayers.splice(i, 1);
    }
  }
});

var OtherPlayers = {
  OtherPlayers: {
    "new": function(stage, scene) {
      return Class["new"]("Sockets", [stage, scene]);
    }
  }
};