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

  events: function(stage, scene){
    $("#canvas_id").on('click', {map: scene.map}, scene.map.clickOnMap);
    $('#canvas_id').mousemove({map:scene.map}, scene.map.mouseMouveOnMap);
    
  },

  ready: function(stage) {
    var scene = this;

    scene.map = canvas.Map.new(stage, scene);
    $("#canvas_id").on("mapLoad", {stage:stage, scene: scene}, scene.mapLoad);
    
  },

  mapLoad: function(e){
    var stage = e.data.stage,
      scene = e.data.scene;

    scene.mainCaracter = canvas.Caracter.new(stage, scene);
    scene.events(stage, scene);
    scrolling();
  },
  scrolling: function()
  {
    //Création du Scrolling avec la taille d'un Tile
    this.scrolling = canvas.Scrolling.new(this, 32, 32);
    
     //On définit en fonction de quoi bouge la Camera
    //Normalement le var mainCaracter = this.createElement(); doit déja êter fais
    this.scrolling.setMainElement(this.mainCaracter);

    //Ajout du Scroll à la Map
    //Normalement le var map = this.createElement(); doit déja êter fais
    this.scrolling.addScroll({
       element: this.map, 
       speed: 3,
       block: true,
       width: 960,
       height: 320
    });
  }
});