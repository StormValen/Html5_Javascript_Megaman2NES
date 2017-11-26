var MegamanGame = MegamanGame || {};

MegamanGame.prefab_huevoBirdBomber = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"huevo");
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle', 1, 1), 1, true);
    this.animations.add('broken',Phaser.Animation.generateFrameNames('attack',1,1),10,true);
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y =  400;
    this.miniBirdsSpawned = false;
};

MegamanGame.prefab_huevoBirdBomber.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_huevoBirdBomber.prototype.constructor = MegamanGame.prefab_huevoBirdBomber;

MegamanGame.prefab_huevoBirdBomber.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    if(this.body.blocked.down){
        this.animations.play('broken');
        if(!this.miniBirdsSpawned){
            this.miniBirdsSpawn();  
            this.miniBirdsSpawned = true;
        }
    }
}

MegamanGame.prefab_huevoBirdBomber.prototype.miniBirdsSpawn = function(){
    this.mini1 = new MegamanGame.prefab_miniBird(this.game,this.body.x+20,this.body.y,this.level);
    this.mini2 = new MegamanGame.prefab_miniBird(this.game,this.body.x,this.body.y-20,this.level);
    this.mini3 = new MegamanGame.prefab_miniBird(this.game,this.body.x+20,this.body.y-20,this.level);
    this.mini4 = new MegamanGame.prefab_miniBird(this.game,this.body.x+10,this.body.y-10,this.level);
    
    this.game.add.existing(this.mini1);
    this.game.add.existing(this.mini2);
    this.game.add.existing(this.mini3);
    this.game.add.existing(this.mini4);
}