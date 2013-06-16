
Class.create("Map", {
	el: null,
	tiled: null,
	name: "map",
	stage: null,
	scene: null,
	squareCollection: null,
	hoverSquare: null,
	clickSquare: null,
	isBuildWheat: false,
	isBuildBuilding: false,
	squareWidth: 32,
	squareHeight: 32,
	currentMap: {x:0, y:0},
	lastSquareOnMap: null,
	plants: null,
	maps: [
		['/maps/Map01.json', '/maps/Map02.json','/maps/Map03.json'],
		['/maps/Map04.json', '/maps/Map05.json','/maps/Map06.json'],
		['/maps/Map07.json', '/maps/Map08.json','/maps/Map09.json']
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

		if(map.tiled){
			map.el.remove();
			map.tiled = null;
		}

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
		if(map.isBuildWheat)
		{
			map.isBuildWheat = false;
			$("#canvas_id").trigger("buildWheatClick",[map.stage, map.scene, {x:coord.x, y:coord.y}]);
		}
		else
			if(map.isBuildBuilding)
			{
				map.isBuildBuilding = false;
				$("#canvas_id").trigger("BuildBuildingClick",[map.stage, map.scene, {x:coord.x, y:coord.y}]);
			}
		else
			if(!map.scene.mainCaracter.move && map.squareCollection[coord.x+'-'+coord.y].canWalkOnIt){
				if(map.clickSquare)
				map.clickSquare.remove();
				map.clickSquare = map.newSquare(coord.x, coord.y, "green");
				map.stage.append(map.clickSquare);
	    		map.scene.mainCaracter.initMove(coord.x, coord.y);
			}
				
	},

	buildWheat:function(e){
		var map = e.data.map;
		map.isBuildWheat = true;
	},
	buildBuilding:function(e){
		var map = e.data.map;
		map.isBuildBuilding = true;
	},

	isEndMapX: function(xValue) {
		xValue = this.xCoordToSquare(xValue);
		if(xValue == 0 || xValue == this.lastSquareOnMap.x) {
			return this.loadNextMap(xValue, true);
		}
		else {
			return false;
		}
	},

	isEndMapY: function(yValue) {
		yValue = this.yCoordToSquare(yValue);

		if(yValue == 0 || yValue == this.lastSquareOnMap.y) {

			return this.loadNextMap(yValue, false);
		}
		else {
			return false;
		}
	},

	loadNextMap: function(value, isX){
		var map = this,
			nextMap = null,
			previousMap = true;
		if(value == 0) {
			if(isX)
				nextMap = map.maps[map.currentMap.x][map.currentMap.y-1];
			else
				nextMap = map.maps[map.currentMap.x-1] && map.maps[map.currentMap.x-1][map.currentMap.y];

			if(nextMap){
				if(isX)
					map.currentMap.y--;
				else
					map.currentMap.x--;
			}
			else
				return false;
		}
		else{
			if(isX)
				nextMap = map.maps[map.currentMap.x][map.currentMap.y+1];
			else
				nextMap = map.maps[map.currentMap.x+1] && map.maps[map.currentMap.x+1][map.currentMap.y];


			if(nextMap){
				if(isX)
					map.currentMap.y++;
				else
					map.currentMap.x++;

				previousMap = false;
			}
			else
				return false;
		}

		if(nextMap) {
			var mainCaracter = map.scene.mainCaracter;
			map.createMap();

			if(previousMap)
				mainCaracter.initPositionEnd(isX);
			else
				mainCaracter.initPosition(isX);

			mainCaracter.callbackNexSquare(null, 0, 
				isX? !mainCaracter.scene.map.isEndMapY(mainCaracter.el.y) : !mainCaracter.scene.map.isEndMapY(mainCaracter.el.x)
			);

			return true;
		}
		else
			return false;

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

