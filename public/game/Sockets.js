Class.create("Sockets", {
	name: null,
  initialize: function(stage, scene, name) {
    this.name = name;
  },

  emitDeplacement: function(mapStringPosition, position) {
    var that = this;
    socket.emit('move', {name: that.name, map: mapStringPosition, position: position});
  }
});

var Sockets = {
  Sockets: {
    "new": function(stage, scene, name) {
      return Class["new"]("Sockets", [stage, scene, name]);
    }
  }
};