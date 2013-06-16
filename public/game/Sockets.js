Class.create("Sockets", {
	name: null,
	stage: null,
	scene: null,
  initialize: function(stage, scene, name) {
    this.name = name;
    this.stage = stage;
    this.scene = scene;
  },

  emitDeplacement: function(position) {
    var that = this;
    socket.emit('move', {name: that.name, position: position});
  },

  emitChangeMap: function(mapStringPosition) {
    var that = this;
    socket.emit('changeMap', {name: that.name, map: mapStringPosition});
  }

});

var Sockets = {
  Sockets: {
    "new": function(stage, scene, name) {
      return Class["new"]("Sockets", [stage, scene, name]);
    }
  }
};