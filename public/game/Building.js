Class.create("Building", {
	el: null,
	name: "Building",
	width: 160,
	height: 256,
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
	   	for (var x=0;x<5;x++)
		{ 
			for (var y=0;y<8;y++)
			{ 
				this.map.squareCollection[(this.el.x / 32 + x)+'-'+(this.el.y / 32 + y)].canWalkOnIt = false;
			}
		}
		this.stage.append(this.el);
 	   	this.scene.mainCaracter.el.zIndex(this.el.zIndex()+1);
	},
	initPosition: function(isX){
		if(isX)
			this.el.x = this.map.xSquareToCoord(this.position.x)-64;
		else
			this.el.y = this.map.xSquareToCoord(this.position.y)-96;
	},
	add: function() {
	    this.stage.append(this.el);
	},
	add: function() {
	    this.stage.append(this.el);
	},

	initAnimation: function() {
        var animation = canvas.Animation.new({
                images: "Building",
                animations: {
                    BuildingInit: {
                        frames: [0, 0],
                        size: {
                            width: 160,
                            height: 245
                        },
                        frequence: 0
                    }
                }
            });

        animation.add(this.el);
        this.animation = animation;
		this.animation.play("BuildingInit", 'stop');
    }
});
	var Building = {
	Building: {
		"new": function(stage, scene, position) {
			return Class["new"]("Building", [stage, scene, position]);
		}
	}
};