var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
    preload:function(){
        this.load.tilemap('WoodmanLevel','tilemaps/NewMapWoodman.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('MegamanTileset','img/MegamanTileset.png');
        this.load.image('basic','img/fondonegro.png');
    },
    create:function(){
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanTileset');
        this.map.addTilesetImage('basic');
        
        this.map.createLayer('Terrain');
        this.map.createLayer('Stairs');
        this.map.createLayer('BlockedDoor');
        this.map.createLayer('Background');
    },
    update:function(){
       
    }
}