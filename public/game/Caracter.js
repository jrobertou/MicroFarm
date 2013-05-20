
Class.create("Caracter", {
	el: null,
	name: "chara",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	tiled: null,
	animation: null,
	speedAnimation: 2,

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
    this.el.setOriginPoint("middle");
    this.stage.append(this.el);
   	this.stage.refresh();
   	this.initAnimation();
    this.animation.play("walkInit", "loop");
	},
	 /**
		@doc tiled/
		@method ready Calls the function when the layers are drawn
		@param {Function} callback
	 */
	move: function(offsetX, offsetY) {
		var caracter = this,
			map = caracter.scene.map;

       //caracter.el.x = offsetX-(caracter.width/2);
       //caracter.el.y = offsetY-(caracter.height/2);
       var target = map.coordonatesToSquare(offsetX, offsetY),
       		now =  map.coordonatesToSquare(caracter.el.x, caracter.el.y);

       	var deltaX = target.x - now.x,
       		deltaY = target.y - now.y;

       	console.log(deltaX+' : '+deltaY);

       	var delta = map.squareToCoordonates(deltaX, deltaY);

       	if(Math.abs(deltaX) > Math.abs(deltaY)){

       		caracter.nextSquareX(delta, 'x');
       	}
       	else{

       		caracter.nextSquareY(delta, 'y');
       	}
    	caracter.stage.refresh();
    	
    },

    nextSquareX: function(delta, firstCall){

    	var caracter = this,
    		map = this.scene.map;

		if(delta.x < 0) {

			caracter.animation.play("walkXback", "loop");
			delta.x = caracter.el.x - Math.abs(delta.x);

		}
		else {

			caracter.animation.play("walkX", "loop");
			delta.x = caracter.el.x + Math.abs(delta.x);

		}

    	canvas.Timeline.new(caracter.el).to({
	            x: delta.x
	        },
        	Math.floor(delta.x/caracter.speedAnimation)).call(function(){
        		caracter.animation.stop();
        		if(firstCall == 'x'){
        			caracter.nextSquareY(delta, firstCall);
        		}
        	}
        );

    },

    nextSquareY: function(delta, firstCall){
		
		console.log(delta);
        var caracter = this,
    		map = this.scene.map;

		if(delta.y < 0) {

    		caracter.animation.play("walkYback", "loop");
			delta.y = caracter.el.y - Math.abs(delta.y);

		}
		else {

    		caracter.animation.play("walkY", "loop");
			delta.y = caracter.el.y + Math.abs(delta.y);

		}

    	canvas.Timeline.new(caracter.el).to({
	            y: delta.y
	        },
        	Math.floor(delta.y/caracter.speedAnimation)).call(function(){
        		caracter.animation.stop();
        		if(firstCall == 'y'){
        			caracter.nextSquareX(delta, firstCall);
        		}
        	}
        );

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

