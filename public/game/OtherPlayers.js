Class.create("OtherPlayers", {
	othersPlayers: [],
  names: [],
  othersArray: [],
  stage: null,
  scene: null,

  initialize: function(stage, scene) {
    this.stage = stage;
    this.scene = scene;
  },

  add: function(El) {
    if(El.map == this.scene.map.coordonatesToString()) {
      var newPlayer = canvas.Caracter.new(this.stage, this.scene, El);
      this.names.push(newPlayer.name);
      this.othersPlayers.push(newPlayer);
    }
  },

  addOthers: function() {
    var others = this.othersArray;
    for(var i= 0, imax=others.length; i<imax; i++) {
        this.add(others[i]);
    }
  },

  get: function(name){
    var i = this.names.indexOf(name);
    if(i != -1) {
      return this.othersPlayers[i];
    }
  },

  remove: function(name) {
    var i = this.names.indexOf(name);
    if(i != -1) {
      this.othersPlayers[i].remove();
      this.names.splice(i, 1);
      this.othersPlayers.splice(i, 1);
    }
  },

  reinitialize: function() {
    for(var i= 0, imax=this.names.length; i<imax; i++) {
        this.remove(this.names[i]);
    }
  }
});

var OtherPlayers = {
  OtherPlayers: {
    "new": function(stage, scene) {
      return Class["new"]("OtherPlayers", [stage, scene]);
    }
  }
};