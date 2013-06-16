Class.create("Players", {
	players: [],
  playersDbArray: [],
  stage: null,
  scene: null,

  initialize: function(stage, scene) {
    this.stage = stage;
    this.scene = scene;
  },

  add: function(El) {
    console.log('ADDDD => '+this.scene.map.coordonatesToString()+'   '+this.scene.mainCaracter.name);
    console.log(El);
    if(El.map == this.scene.map.coordonatesToString() && El.name != this.scene.mainCaracter.name) {
      var newPlayer = canvas.Caracter.new(this.stage, this.scene, El);
      this.players[El.name] = newPlayer;
    }
  },

  addOthers: function() {
    
    for(playerTmp in this.playersDbArray) {
        this.add(playerTmp);
    }
  },

  get: function(name){
    return this.players[name];
  },

  remove: function(name) {
    if(this.players[name]) {
      this.players[name].remove();
      this.players.splice(name, 1);
    }
  },

  reinitialize: function() {
    for(player in this.players) {
        this.remove(player.name);
    }
    this.players = [];
  }
});

var Players = {
  Players: {
    "new": function(stage, scene) {
      return Class["new"]("Players", [stage, scene]);
    }
  }
};