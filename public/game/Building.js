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
				if((this.el.x / 32 + x) > 29 || ((this.el.y / 32 + y) > 14) || ((this.el.x / 32 + x) < 0) || ((this.el.y / 32 + y) < 0) || ((this.el.x / 32 + x) == this.scene.mainCaracter.el.x / 32) && ((this.el.y / 32 + y) == this.scene.mainCaracter.el.y / 32) || this.map.squareCollection[(this.el.x / 32 + x)+'-'+(this.el.y / 32 + y)].canWalkOnIt == false)
				{
					alert('Emplacement invalide.');
					return;
				}	
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
		"new": function(e, stage, scene, position) {
			return Class["new"]("Building", [stage, scene, position]);
		}
	}
};