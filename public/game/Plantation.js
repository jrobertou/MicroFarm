Class.create("Plantation", {
	el: null,
	name: "FarmVillage",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	map: null,
	tiled: null,
	animation: null,
	position: null,
	speedAnimation: 3,

	initialize: function(stage, scene, position) {
		this.stage = stage;
		this.scene = scene;
		this.position = position; 
		$("#canvas_id").trigger("addPlantClick");
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
	   	this.stage.append(this.el);
	    
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
                images: "FarmVillage",
                animations: {
                    WheatStart: {
                        frames: [16, 16],
                        size: {
                            width: 32,
                            height: 32
                        },
                        frequence: 0
                    }
                }
            });
        //this.stage.append(el);
        animation.add(this.el);
        this.animation = animation;
		this.animation.play("WheatStart", 'stop');
    }

});
	var Plantation = {
	Plantation: {
		"new": function(e, stage, scene, position) {
			return Class["new"]("Plantation", [stage, scene, position]);
		}
	}

};