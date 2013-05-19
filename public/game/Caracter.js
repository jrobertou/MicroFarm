
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

       	if(deltaX > deltaY){

       		var callback = function(){
	   			caracter.animation.stop();

	   			var callback = function(){
	       			caracter.animation.stop();
	       		};
	   			caracter.nextSquareY(deltaY*32, callback);
	   		};
       		caracter.nextSquareX(deltaX*32, callback);
       	}
       	else{

	    	var callback = function(){
	   			caracter.animation.stop();

	   			var callback = function(){
	       			caracter.animation.stop();
	       		};
	   			caracter.nextSquareX(deltaX*32, callback);
	   		};
       		caracter.nextSquareY(deltaY*32, callback);
       	}
    	caracter.stage.refresh();
    },

    nextSquareX: function(distance, callback){
		var caracter = this;
    	caracter.animation.play("walkX", "loop");

    	canvas.Timeline.new(caracter.el).to({
            x: caracter.el.x+distance
        }, Math.floor(distance/6)).call(callback);

    },

    nextSquareY: function(distance, callback){
		var caracter = this;

    	caracter.animation.play("walkY", "loop");

    	canvas.Timeline.new(caracter.el).to({
            y: caracter.el.y+distance
        }, Math.floor(distance/6)).call(callback);

    },


	initAnimation: function() {
        var animation = canvas.Animation.new({
                images: "chara",
                animations: {
                    walkX: {
                        frames: [8, 11],
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

