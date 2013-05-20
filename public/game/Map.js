
Class.create("Map", {
	el: null,
	name: "map",
	stage: null,
	scene: null,
	squareCollection: null,
	hoverSquare: null,
	clickSquare: null,


	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		var map = this;
		map.el = this.scene.createElement();

       	var tiled = canvas.Tiled.new();

       	tiled.load(map.scene, map.el, '/maps/TestMap.json');
    
	    tiled.ready(function() {

	        map.squareCollection = this.squareCollection;
	        map.stage.append(map.el);
	        $("#canvas_id").trigger("mapLoad");

	    });
	},

	mouseToSquare: function(x, y){
		var tmpX = Math.floor(event.offsetX/32),
		  tmpY = Math.floor(event.offsetY/32);
		return {x:tmpX, y:tmpY};
	},


	mouseMouveOnMap: function(e){
		var map = e.data.map,
			coord = map.mouseToSquare(e.offsetX, e.offsetY);

		$('.mouse').html(e.offsetX+', '+ e.offsetY);
		/*
		if(map.hoverSquare)
		map.hoverSquare.remove();
		map.hoverSquare = map.newSquare(coord.x, coord.y, "#f3f3f3");
		map.stage.append(map.hoverSquare);
		*/
				
	},

	clickOnMap: function(e){
		var map = e.data.map,
			coord = map.mouseToSquare(e.offsetX, e.offsetY);

		if(map.squareCollection[coord.x+'-'+coord.y].canWalkOnIt){
			if(map.clickSquare)
			map.clickSquare.remove();
			map.clickSquare = map.newSquare(coord.x, coord.y, "green");
			map.stage.append(map.clickSquare);
    		map.scene.mainCaracter.move(e.offsetX, e.offsetY);
		}
				
	},

	newSquare: function(x, y, color){
		var el = this.scene.createElement();

		x = x*32;
		y = y*32;

        el.strokeStyle = color;
        el.strokeRect(x, y, 32, 32);
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

