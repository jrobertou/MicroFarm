
Class.create("Caracter", {
	el: null,
	name: "chara",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	tiled: null,
	animation: null,

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
		var caracter = this;

       //caracter.el.x = offsetX-(caracter.width/2);
       //caracter.el.y = offsetY-(caracter.height/2);
       var targetX = Math.floor(offsetX/32),
       		targetY = Math.floor(offsetY/32),
       		nowX = Math.floor(caracter.el.x/32),
       		nowY = Math.floor(caracter.el.y/32);

       	var deltaX = targetX - nowX,
       		deltaY = targetY - nowY;

       		console.log(deltaX+' : '+deltaY);

       	if(Math.abs(deltaX) > Math.abs(deltaY)){

       		var callback = function(){
	   			caracter.animation.stop();

	   			var callback2 = function(){
	       			caracter.animation.stop();
	       		};
	   			caracter.nextSquareY(deltaY*32, callback2);
	   		};
       		caracter.nextSquareX(deltaX*32, callback);
       	}
       	else{

	    	var callback = function(){
	   			caracter.animation.stop();

	   			var callback2 = function(){
	       			caracter.animation.stop();
	       		};
	   			caracter.nextSquareX(deltaX*32, callback2);
	   		};
       		caracter.nextSquareY(deltaY*32, callback);
       	}
    	caracter.stage.refresh();
    },

    nextSquareX: function(distance, callback){
    	var caracter = this;
		if(distance < 0) {
			caracter.animation.play("walkXback", "loop");
			ditance = caracter.el.x - Math.abs(distance) ;
			console.log(' - '+caracter.el.x)
		}
		else {
			caracter.animation.play("walkX", "loop");
			ditance = caracter.el.x + Math.abs(distance);
		}
		console.log('nextSquareX: '+distance);
    	canvas.Timeline.new(caracter.el).to({
            x: Math.abs(distance)
        }, Math.floor(Math.abs(distance)/6)).call(callback);

    },

    nextSquareY: function(distance, callback){
		var caracter = this;

		if(distance < 0) {
    		caracter.animation.play("walkYback", "loop");
			ditance = caracter.el.y - Math.abs(distance);
		}
		else {
    		caracter.animation.play("walkY", "loop");
			ditance = caracter.el.y + Math.abs(distance);
		}


		console.log('nextSquareY: '+distance);
    	canvas.Timeline.new(caracter.el).to({
            y: Math.abs(distance)
        }, Math.floor(Math.abs(distance)/6)).call(callback);

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

