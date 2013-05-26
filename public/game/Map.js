
Class.create("Map", {
	el: null,
	tiled: null,
	name: "map",
	stage: null,
	scene: null,
	squareCollection: null,
	hoverSquare: null,
	clickSquare: null,
	squareWidth: 32,
	squareHeight: 32,
	currentMap: {x:0, y:0},
	lastSquareOnMap: null,
	maps: [
		['/maps/Map01.json', '/maps/Map02.json'],
		['/maps/Map03.json', '/maps/Map04.json']
	],

	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		var map = this;
       	map.createMap();
       	map.lastSquareOnMap = map.coordonatesToSquare(map.scene.canvasEl.width()-1, map.scene.canvasEl.height()-1);
	},

	createMap: function(){
		var map = this,
			mapsX = this.currentMap.x
			mapsY = this.currentMap.y;

		if(map.tiled)
			map.el.remove();

		map.el = map.scene.createElement();
       	map.tiled = canvas.Tiled.new();

		map.tiled.load(map.scene, map.el, map.maps[mapsX][mapsY]);
    
	    map.tiled.ready(function() {

	        map.squareCollection = this.squareCollection;
	        map.stage.append(map.el);
	        $("#canvas_id").trigger("mapLoad");

			map.hoverSquare = map.newSquare(0, 0, "#f3f3f3");
			map.stage.append(map.hoverSquare);
	    });
	},

	xCoordToSquare: function(x){
		return Math.floor(x/32);
	},

	yCoordToSquare: function(y){
		return Math.floor(y/32);
	},

	coordonatesToSquare: function(x, y){
		return {x:Math.floor(x/32), y:Math.floor(y/32)};
	},

	xSquareToCoord: function(x){
		return Math.floor(x*32);
	},

	ySquareToCoord: function(y){
		return Math.floor(y*32);
	},

	squareToCoordonates: function(x, y){
		return {x:x*32, y:y*32};
	},

	mouseMoveOnMap: function(e){
		var map = e.data.map,
			x = e.offsetX,
			y = e.offsetY;

		map.hoverSquare.x = x - Math.floor(x%map.squareWidth);
		map.hoverSquare.y = y - Math.floor(y%map.squareHeight);
	},

	clickOnMap: function(e){
		var map = e.data.map,
			coord = map.coordonatesToSquare(e.offsetX, e.offsetY);

		if(!map.scene.mainCaracter.move && map.squareCollection[coord.x+'-'+coord.y].canWalkOnIt){
			if(map.clickSquare)
			map.clickSquare.remove();
			map.clickSquare = map.newSquare(coord.x, coord.y, "green");
			map.stage.append(map.clickSquare);
    		map.scene.mainCaracter.initMove(coord.x, coord.y);
		}
				
	},

	isEndMapX: function(xValue) {
		xValue = this.xCoordToSquare(xValue);
		if(xValue == 0 || xValue == this.lastSquareOnMap.x) {
			this.loadNextXMap(xValue);
			return true;
		}
		else {
			return false;
		}
	},

	isEndMapY: function(yValue) {
		yValue = this.yCoordToSquare(yValue);

		if(yValue == 0 || yValue == this.lastSquareOnMap.y) {

			return true;
		}
		else {
			return false;
		}
	},

	loadNextXMap: function(xValue){
		var map = this,
			nextMap = null,
			previousMap = true;
		if(xValue == 0) {
			nextMap = map.maps[map.currentMap.x][map.currentMap.y-1]!= undefined ?true:false;
			if(nextMap){
				map.currentMap.y--;
			}
		}
		else{
			nextMap = map.maps[map.currentMap.x][map.currentMap.y+1]!= undefined ?true:false;
			if(nextMap){
				map.currentMap.y++;
				previousMap = false;
			}
		}

		if(nextMap) {
			var mainCaracter = map.scene.mainCaracter;
			mainCaracter.remove();
			map.createMap();
			if(previousMap)
				mainCaracter.initXpositionEnd();
			else
				mainCaracter.initXposition();
			mainCaracter.callbackNexSquare(null, 0);

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
		"new": function(stage, scene, caracterePosition) {
			return Class["new"]("Map", [stage, scene, caracterePosition]);
		}
	}
};

