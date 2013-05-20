var canvas = CE.defines('canvas_id').
    extend(Scrolling).
    extend(Spritesheet).
    extend(Tiled).
    extend(Input).
    extend(Caracter).
    extend(Map).
    extend(Animation).
    ready(function() {
      canvas.Scene.call('MyScene');
    });

canvas.Scene.new({
  name: 'MyScene',
  materials: {
    images: {
      CastleTown: '/img/CastleTown.png',
      ball: '/img/ball.png',
      chara: '/img/chara.png'
    }
  },
  map: null,
  mainCaracter: null,

  events: function(stage, scene) {
    $("#canvas_id").on('click', {map: scene.map}, scene.map.clickOnMap);
    $('#canvas_id').mousemove({map:scene.map}, scene.map.mouseMouveOnMap);
    
  },

  ready: function(stage) {
    var scene = this;

    scene.map = canvas.Map.new(stage, scene);
    $("#canvas_id").on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    
  },
  render: function(stage) {
    this.scrolling.update();
    stage.refresh();
  },

  mapLoad: function(e) {
    var stage = e.data.stage,
      scene = e.data.scene;

    scene.mainCaracter = canvas.Caracter.new(stage, scene);
    scene.events(stage, scene);
    scene.scrolling();
  },
  scrolling: function() {
    var scene = this;
    //Création du Scrolling avec la taille d'un Tile
    this.scrolling = canvas.Scrolling.new(this, 32, 32);
    
     //On définit en fonction de quoi bouge la Camera
    //Normalement le var mainCaracter = this.createElement(); doit déja êter fais
    this.scrolling.setMainElement(scene.mainCaracter.el);
    console.log("Fonction scrolling",this.scrolling);
    //Ajout du Scroll à la Map
    //Normalement le var map = this.createElement(); doit déja êter fais
    this.scrolling.addScroll({
       element: scene.map.el, 
       speed: 5,
       block: true,
       width: 512,
       height: 512
    });
  }
});