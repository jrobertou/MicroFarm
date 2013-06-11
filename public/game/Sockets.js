
Class.create("Sockets", {
  caractere: null,

  initialize: function(caractere) {
    this.caractere = caractere;
    console.log("sockets init");
    this.render();
  },

  render: function() {
    

  },

});
var Sockets = {
  Sockets: {
    "new": function(caractere) {
      return Class["new"]("Sockets", [caractere]);
    }
  }
};

