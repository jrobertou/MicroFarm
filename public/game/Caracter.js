
Class.create("Caracter", {
	el: null,
	name: "chara",
	width: 32,
	height: 48,
	stage: null,
	scene: null,
	tiled: null,

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
       	this.el.on("click", this.dragright);
	},
	 /**
		@doc tiled/
		@method ready Calls the function when the layers are drawn
		@param {Function} callback
	 */
	move: function(event) {
		var caracter = event.data.caracter;
       caracter.el.x = event.offsetX-(caracter.width/2);
       caracter.el.y = event.offsetY-(caracter.height/2);
       var tmpX = Math.floor(event.offsetX/32)
       		tmpY = Math.floor(event.offsetY/32);
       console.log([tmpX+'-'+tmpY]);
       console.log(caracter.scene.map.squareCollection[tmpX+'-'+tmpY]);
       caracter.stage.refresh();
    },


	walk: function() {
        var animation = canvas.Animation.new({
                images: "chara",
                animations: {
                    walk: {
                        frames: [8, 11],
                        size: {
                            width: 32,
                            height: 48
                        },
                        frequence: 7
                    }
                }
            });
        this.stage.append(el);
        animation.add(el);
        animation.play("walk", "loop");

    }

});
var Caracter = {
	Caracter: {
		"new": function(stage, scene) {
			return Class["new"]("Caracter", [stage, scene]);
		}
	}
};

