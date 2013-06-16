Class.create("Caracter", {
	id: 0,
	el: null,
	name: "chara",
	imageName: "chara",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	map: null,
	tiled: null,
	animation: null,
	speedAnimation: 3,
	target: null,
	move:false,
	socket: null,


	initialize: function(stage, scene, oldEl) {
		this.stage = stage;
		this.scene = scene;
		this.oldEl = oldEl;
		this.map = this.scene.map;
		this.render();
	},

	render: function() {
		var stage = this.stage,
			scene = this.scene;
		if(!this.oldEl.el) {
			this.name = this.oldEl.name;
			this.level = this.oldEl.level;
			this.el = this.scene.createElement();
		    this.el.drawImage(this.imageName);
		    this.initX(this.oldEl.position.x);
		    this.initY(this.oldEl.position.y);
		    this.gold = this.oldEl.gold;
		   	this.initAnimation();
		    this.animation.play("walkInit", 'loop');
   			scene.events(stage, scene);
   			this.socket = canvas.Sockets.new(stage, scene, this.name);
		}
		else {
      		this.oldEl.remove();
			this.el = this.oldEl.el;
			this.animation = this.oldEl.animation;
			this.socket = this.oldEl.socket;
			this.socket.emitChangeMap(this.map.coordonatesToString());
		}

		stage.append(this.el);
   		stage.refresh();
	},

	initX: function(value) {
		this.el.x = Math.floor(value*32);
	},

	initY: function(value) {
		this.el.y = Math.floor(value*32);
	},

	initPosition: function(isX){
		if(isX)
			this.el.x = this.map.xSquareToCoord(1);
		else
			this.el.y = this.map.ySquareToCoord(1);
	},

	initPositionEnd: function(isX){
		if(isX)
			this.el.x = this.map.xSquareToCoord(28);
		else
			this.el.y = this.map.ySquareToCoord(11);
	},

	getSquarePosition: function() {
		return this.map.coordonatesToSquare(this.el.x, this.el.y);
	},

	add: function() {
	    this.stage.append(this.el);
	},

	remove: function() {
	    this.el.remove();
	},

	initMove: function(squareX, squareY) {
		var caracter = this,
			map = caracter.scene.map;

    	caracter.socket.emitDeplacement({x: squareX, y:squareY});

		caracter.move = true;
		if(caracter.animation)
			caracter.animation.stop();

       	var now =  map.coordonatesToSquare(caracter.el.x, caracter.el.y);

       	caracter.targetPosition = {x: squareX!=now.x?squareX:null, y: squareY!=now.y?squareY:null};

       	var target = caracter.targetPosition;

       	if(target.x != null || target.y != null){

       		var deltaX = target.x != null?target.x - now.x:0,
	       		deltaY = target.y != null?target.y - now.y:0;


	       	var delta = map.squareToCoordonates(deltaX, deltaY);

	       	var xdirection = (deltaX > 0)?'x':'-x',
	       		ydirection = (deltaY > 0)?'y':'-y';

	       	deltaX = Math.abs(deltaX);
	       	deltaY = Math.abs(deltaY);
	       	caracter.target = null;
	       	
	       	if(deltaX > deltaY){
	       		if(target.y != null)
	       			caracter.target = {direction: ydirection, nb: deltaY};

	    		caracter.nextSquare(xdirection, deltaX);	       		
	       	}
	    	else{
	    		if(target.x != null)
	       			caracter.target = {direction: xdirection, nb: deltaX};

	    		caracter.nextSquare(ydirection, deltaY);
	    	}
       	}
       	else
   			caracter.move = false;
    },


    nextSquare: function(direction, nb){
    	var caracter = this,
    		targetPosition,
    		isMainCharacter = caracter.name === caracter.scene.mainCaracter.name;

		switch(direction) {
			case 'x': 
				caracter.animation.play("walkX", "loop");
				targetPosition = caracter.el.x + 32;
				break;
			case '-x':
				caracter.animation.play("walkXback", "loop");
				targetPosition = caracter.el.x - 32;
				break;
			case 'y': 
				caracter.animation.play("walkY", "loop");
				targetPosition = caracter.el.y + 32;
				break;
			case '-y': 
				caracter.animation.play("walkYback", "loop");
				targetPosition = caracter.el.y - 32;
				break;
			default:break;
		}

		if(direction == 'x' || direction == '-x') {
			canvas.Timeline.new(caracter.el).to({
					x: targetPosition,
					y: caracter.el.y
		        },
	        	caracter.speedAnimation, Ease.linear).call(function(){
	        		caracter.callbackNexSquare(direction, nb, !caracter.scene.map.isEndMapX(caracter.el.x, isMainCharacter));
        	});
		}
		else {
			canvas.Timeline.new(caracter.el).to({
					x: caracter.el.x,
					y: targetPosition
		        },
	        	caracter.speedAnimation, Ease.linear).call(function(){
	        		caracter.callbackNexSquare(direction, nb, !caracter.scene.map.isEndMapY(caracter.el.y, isMainCharacter));
        	});
		}

    },

    callbackNexSquare: function(direction, nb, mapIsNotEnd) {
    	var caracter = this;
    	caracter.animation.stop();
		--nb;
		if(nb > 0){
			caracter.nextSquare(direction, nb);
		}
		else if(caracter.target && mapIsNotEnd) {
    			var tmpTarget = caracter.target;
    			caracter.target = null;
    			caracter.nextSquare(tmpTarget.direction, tmpTarget.nb);
    		}
			else if(mapIsNotEnd == 'delete') {
					caracter.remove();
				}
				else
    				caracter.move = false;
    },

	initAnimation: function() {
        var animation = canvas.Animation.new({
                images: "chara",
                animations: {
                    walkInit: {
                        frames: [0, 0],
                        size: {
                            width: 128/4,
                            height: 192/4
                        },
                        frequence: 0
                    },
                    walkX: {
                        frames: [8, 11],
                        size: {
                            width: 128/4,
                            height: 192/4
                        },
                        frequence: 3
                    },
                    walkXback: {
                        frames: [4, 7],
                        size: {
                            width: 128/4,
                            height: 192/4
                        },
                        frequence: 3
                    },
                    walkY: {
                        frames: [0, 3],
                        size: {
                            width: 128/4,
                            height: 192/4
                        },
                        frequence: 3
                    },
                    walkYback: {
                        frames: [12, 15],
                        size: {
                            width: 128/4,
                            height: 192/4
                        },
                        frequence: 3
                    }
                }
            });
        //this.stage.append(el);
        animation.add(this.el);
        this.animation = animation;

    }

});
var Caracter = {
	Caracter: {
		"new": function(stage, scene, oldEl) {
			return Class["new"]("Caracter", [stage, scene, oldEl]);
		}
	}
};

