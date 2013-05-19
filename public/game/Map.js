
Class.create("Map", {
	el: null,
	name: "map",
	stage: null,
	scene: null,
	squareCollection: null,

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
	}

});
var Map = {
	Map: {
		"new": function(stage, scene) {
			return Class["new"]("Map", [stage, scene]);
		}
	}
};

