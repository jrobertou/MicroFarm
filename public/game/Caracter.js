
Class.create("Caracter", {
	el: null,
	name: "chara",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	tiled: null,
	animation: null,
	speedAnimation: 3,
	target: null,

	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		this.el = this.scene.createElement();
		this.el.width = this.width;
		this.el.height = this.height;
	    this.el.drawImage(this.name);
	    this.stage.append(this.el);
	   	this.stage.refresh();
	   	this.initAnimation();
	    this.animation.play("walkInit", 'loop');
	},
	 /**
		@doc tiled/
		@method ready Calls the function when the layers are drawn
		@param {Function} callback
	 */
	initMove: function(squareX, squareY) {
		var caracter = this,
			map = caracter.scene.map;
		if(caracter.animation)
			caracter.animation.stop();

       	var now =  map.coordonatesToSquare(caracter.el.x, caracter.el.y);

       	caracter.targetPosition = {x: squareX!=now.x?squareX:null, y: squareY!=now.y?squareY:null};

       	var target = caracter.targetPosition;

       	console.log(caracter.targetPosition)

       	if(target.x || target.y){

       		var deltaX = target.x?target.x - now.x:0,
	       		deltaY = target.y?target.y - now.y:0;


	       	var delta = map.squareToCoordonates(deltaX, deltaY);

	       	var xdirection = (deltaX > 0)?'x':'-x',
	       		ydirection = (deltaY > 0)?'y':'-y';

	       	deltaX = Math.abs(deltaX);
	       	deltaY = Math.abs(deltaY);
	       	caracter.target = null;

	       	if(deltaX > deltaY){
	       		if(target.y)
	       			caracter.target = {direction: ydirection, nb: deltaY};

	    		caracter.nextSquare(xdirection, deltaX);	       		
	       	}
	    	else{
	    		if(target.x)
	       			caracter.target = {direction: xdirection, nb: deltaX};

	    		caracter.nextSquare(ydirection, deltaY);
	    	}
       	}	
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
	        		caracter.animation.stop();
	        		--nb;
	        		if(nb > 0){
	        			caracter.nextSquare(direction, nb);
	        		}
	        		else if(caracter.target) {
	        			var tmpTarget = caracter.target;
	        			caracter.target = null;
	        			caracter.nextSquare(tmpTarget.direction, tmpTarget.nb);
	        		}
        	});
		}
		else {
			canvas.Timeline.new(caracter.el).to({
					x: caracter.el.x,
					y: targetPosition
		        },
	        	caracter.speedAnimation, Ease.linear).call(function(){
	        		caracter.animation.stop();
	        		--nb;
	        		if(nb > 0){
	        			caracter.nextSquare(direction, nb);
	        		}
	        		else if(caracter.target) {
	        			var tmpTarget = caracter.target;
	        			caracter.target = null;
	        			caracter.nextSquare(tmpTarget.direction, tmpTarget.nb);
	        		}
        	});
		}

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

