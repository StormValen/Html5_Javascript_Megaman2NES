var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
    preload:function(){
        this.load.tilemap('WoodmanLevel','tilemaps/Woodman_map.json',null,Phaser.Tilemap.TILED_JSON);
        
        this.load.image('MegamanMapTileset','img/MegamanMapTileset.png');
        this.load.image('Background','img/fondo negro.png');
        this.load.image('Dr.Woodman','img/Dr.Woodman.png');
    },
    create:function(){
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanMapTileset');
        this.map.addTilesetImage('Background');
        this.map.addTilesetImage('Dr.Woodman');
        
        this.map.createLayer('Terrain');
        this.map.createLayer('Stairs');
        this.map.createLayer('Doors');
        this.map.createLayer('Background');
    },
    update:function(){
       
    }
}