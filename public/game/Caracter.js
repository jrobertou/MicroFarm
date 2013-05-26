
Class.create("Caracter", {
	el: null,
	name: "chara",
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


	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		this.map = this.scene.map;
		this.el = this.scene.createElement();

	    this.el.drawImage(this.name);
	    this.initXposition();
	    this.initYposition();
	    this.stage.append(this.el);
	   	this.stage.refresh();
	   	this.initAnimation();
	   	this.zIndex = 10;
	    this.animation.play("walkInit", 'loop');
	},

	initXposition: function(){
		this.el.x = this.map.xSquareToCoord(1);
	},
	initXpositionEnd: function(){
		this.el.x = this.map.xSquareToCoord(29);
	},

	initYposition: function(){
		this.el.y = this.map.ySquareToCoord(1);
	},
	initYpositionEnd: function(){
		this.el.y = this.map.ySquareToCoord(11);
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
		caracter.move = true;
		if(caracter.animation)
			caracter.animation.stop();

       	var now =  map.coordonatesToSquare(caracter.el.x, caracter.el.y);

       	caracter.targetPosition = {x: squareX!=now.x?squareX:null, y: squareY!=now.y?squareY:null};

       	var target = caracter.targetPosition;

       	console.log(caracter.targetPosition)

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
    		targetPosition;

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
	        		caracter.callbackNexSquare(direction, nb);
        	});
		}
		else {
			canvas.Timeline.new(caracter.el).to({
					x: caracter.el.x,
					y: targetPosition
		        },
	        	caracter.speedAnimation, Ease.linear).call(function(){
	        		caracter.callbackNexSquare(direction, nb);
        	});
		}

    },

    callbackNexSquare: function(direction, nb) {
    	var caracter = this;
    	caracter.animation.stop();
    		--nb;
    		if(nb > 0){
    			caracter.nextSquare(direction, nb);
    		}
    		else if(caracter.target && !caracter.scene.map.isEndMapX(caracter.el.x) && !caracter.scene.map.isEndMapY(caracter.el.y)) {
    			var tmpTarget = caracter.target;
    			caracter.target = null;
    			caracter.nextSquare(tmpTarget.direction, tmpTarget.nb);
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
		"new": function(stage, scene) {
			return Class["new"]("Caracter", [stage, scene]);
		}
	}
};

