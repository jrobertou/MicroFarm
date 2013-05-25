
Class.create("Map", {
	el: null,
	name: "map",
	stage: null,
	scene: null,
	squareCollection: null,
	hoverSquare: null,
	clickSquare: null,
	squareWidth: 32,
	squareHeight: 32,


	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		var map = this;
		map.el = this.scene.createElement();

       	var tiled = canvas.Tiled.new();

       	tiled.load(map.scene, map.el, '/maps/TestMap2.json');
    
	    tiled.ready(function() {

	        map.squareCollection = this.squareCollection;
	        map.stage.append(map.el);
	        $("#canvas_id").trigger("mapLoad");

	    });
	},

	coordonatesToSquare: function(x, y){
		var map = this;
		var tmpX = Math.floor(x/32),
		  tmpY = Math.floor(y/32);
		return {x:tmpX, y:tmpY};
	},

	squareToCoordonates: function(squreX, squreY){
		var map = this;
		var tmpX = squreX * 32,
		  tmpY = squreY * 32;
		return {x:tmpX, y:tmpY};
	},


	mouseMoveOnMap: function(e){
		var map = e.data.map,
			coord = map.coordonatesToSquare(e.offsetX, e.offsetY);

		$('.mouse').html(JSON.stringify(coord));
		
		if(map.hoverSquare)
		map.hoverSquare.remove();
		map.hoverSquare = map.newSquare(coord.x, coord.y, "#f3f3f3");
		map.stage.append(map.hoverSquare);
	},

	clickOnMap: function(e){
		var map = e.data.map,
			coord = map.coordonatesToSquare(e.offsetX, e.offsetY);

		if(map.squareCollection[coord.x+'-'+coord.y].canWalkOnIt){
			if(map.clickSquare)
			map.clickSquare.remove();
			map.clickSquare = map.newSquare(coord.x, coord.y, "green");
			map.stage.append(map.clickSquare);
    		map.scene.mainCaracter.initMove(coord.x, coord.y);
		}
				
	},

	newSquare: function(x, y, color){
		var el = this.scene.createElement();
		
		var coor = this.squareToCoordonates(x, y);

        el.strokeStyle = color;
        el.strokeRect(coor.x, coor.y, 32, 32);
		return el;
	}

});
var Map = {
	Map: {
		"new": function(stage, scene) {
			return Class["new"]("Map", [stage, scene]);
		}
	}
};

