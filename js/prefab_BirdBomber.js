var MegamanGame = MegamanGame || {};

MegamanGame.prefab_BirdBomber = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    this.eggDroped = false;
    Phaser.Sprite.call(this,game,x,y,'birdbomber_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('bomba',Phaser.Animation.generateFrameNames('bomba', 1, 2), 10, true);
    this.animations.add('vuelo',Phaser.Animation.generateFrameNames('vuelo',1,2,),10,true);
    
    this.speed = _speed;
    this.direction = _direction;
    
    game.physics.arcade.enable(this);
    this.body.gravity.y =0;
};

MegamanGame.prefab_BirdBomber.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_BirdBomber.prototype.constructor = MegamanGame.prefab_BirdBomber;

//Functions

MegamanGame.prefab_BirdBomber.prototype.create = function(){
    
}

MegamanGame.prefab_BirdBomber.prototype.update = function(){
    
    this.game.physics.arcade.collide(this,this.level.terrain);
    this.body.velocity.x = this.speed*this.direction;
    
    if(this.body.x < this.level.megaman.body.x){
        this.animations.play('vuelo');
        this.eggDroped = true;
    }else if(this.eggDroped == false){
        this.animations.play('bomba');
    }
}