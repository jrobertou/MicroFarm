Class.create("OthersObject", {
	othersObject: [],
  stage: null,
  scene: null,

  initialize: function(stage, scene) {
    this.stage = stage;
    this.scene = scene;
  },

  addWheat: function(e, position) {
      var xChar = e.data.scene.mainCaracter.el.x / 32;
      var yChar = e.data.scene.mainCaracter.el.y / 32;
      if((xChar == position.x && yChar == position.y) || (xChar == position.x && (yChar + 1) == position.y) ||  e.data.scene.map.squareCollection[position.x+'-'+ position.y].canWalkOnIt == false)
      {
        alert('Emplacement invalide.');
        return;
      }
      else
      {
        var newWheat = canvas.Plantation.new(e.data.stage, e.data.scene, position);
        e.data.object.othersObject.push(newWheat);
        console.log(e.data.object.othersObject.length);
      }}
  ,
  addBuilding: function(e, position) {
    var xChar = e.data.scene.mainCaracter.el.x / 32;
    var yChar = e.data.scene.mainCaracter.el.y / 32;
    var xBuild = position.x - 2;
    var yBuild = position.y - 3;

    for (var x=0;x<5;x++)
    { 
      for (var y=0;y<8;y++)
      { 
        if((xBuild + x) == xChar && (yBuild + y) == yChar)
        {
          alert('Emplacement invalide - Impossible de construire par dessus le personnage.');
          return;
        } 
        else
          if((xBuild + x) > 29 || (xBuild + x) < 0 || (yBuild + y) > 13 || (yBuild + y) < 0)
          {
            alert('Emplacement invalide - Impossible de construire entre deux cartes.');
            return;
          }
        else 
          if(e.data.scene.map.squareCollection[(xBuild + x)+'-'+(yBuild + y)].canWalkOnIt == false)
          {
            alert('Emplacement invalide - Impossible de construire à cette emplacement.');
            return;
          }
      }
    }
      var newBuilding = canvas.Building.new(e.data.stage, e.data.scene, position);
      e.data.object.othersObject.push(newBuilding);
      console.log(e.data.object.othersObject.length);
  },
  reinitialize: function() {
    for(var i= 0, imax=this.othersObject.length; i<imax; i++) {
        this.othersObject[i].el.remove();
    }
    this.othersObject.splice(0,this.othersObject.length);
  }
});

var OthersObject = {
  OthersObject: {
    "new": function(stage, scene) {
      return Class["new"]("OthersObject", [stage, scene]);
    }
  }
};