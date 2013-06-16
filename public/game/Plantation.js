Class.create("Plantation", {
	el: null,
	name: "Sprite",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	map: null,
	tiled: null,
	animation: null,
	position: null,
	characterid: null,
	speedAnimation: 3,

	initialize: function(stage, scene, position) {
		this.stage = stage;
		this.scene = scene;
		this.position = position; 
		this.render();
	},

	render: function() {
		this.map = this.scene.map;
		this.el = this.scene.createElement();

	    this.el.drawImage(this.name);
	    this.initPosition(true);
	    this.initPosition(false);
	   	this.stage.refresh();
	   	this.initAnimation();
	   	this.map.squareCollection[this.position.x+'-'+this.position.y].canWalkOnIt = false;
	   	this.stage.append(this.el);
	   	this.scene.mainCaracter.el.zIndex(this.el.zIndex()+1);
	},
	initPosition: function(isX){
		if(isX)
			this.el.x = this.map.xSquareToCoord(this.position.x);
		else
			this.el.y = this.map.xSquareToCoord(this.position.y);
	},
	add: function() {
	    this.stage.append(this.el);
	},
	add: function() {
	    this.stage.append(this.el);
	},

	initAnimation: function() {
        var animation = canvas.Animation.new({
                images: "Sprite",
                animations: {
                    WheatStart: {
                        frames: [243,244],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: 0
                    }
                }
            });

        animation.add(this.el);
        this.animation = animation;
		this.animation.play("WheatStart", 'stop');
    }
});
	var Plantation = {
	Plantation: {
		"new": function(stage, scene, position) {
			return Class["new"]("Plantation", [stage, scene, position]);
		}
	}
};