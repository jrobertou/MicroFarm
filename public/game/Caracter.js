
Class.create("Caracter", {
	el: null,
	name: "ball",
	width: 64,
	height: 64,
	stage: null,
	scene: null,

	initialize: function(stage, scene) {
		this.stage = stage;
		this.scene = scene;
		this.render();
	},

	render: function() {
		this.el = this.scene.createElement(this.width, this.height);
        this.el.drawImage(this.name);
        this.el.setOriginPoint("middle");
        this.stage.append(this.el);
        this.move();
       	this.stage.refresh();
	},
	 /**
		@doc tiled/
		@method ready Calls the function when the layers are drawn
		@param {Function} callback
	 */
	move: function() {
       this.x += 5;
       this.rotation += 1;
       this.stage.refresh();
    }

});
var Caracter = {
	Caracter: {
		"new": function(stage, scene) {
			return Class["new"]("Caracter", [stage, scene]);
		}
	}
};

