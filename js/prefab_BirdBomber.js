var MegamanGame = MegamanGame || {};

MegamanGame.prefab_BirdBomber = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    this.eggDroped = false;
    this.CarringEgg = true;
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
    
};

MegamanGame.prefab_BirdBomber.prototype.update = function(){
    
    this.radioActivacion = 300;
    
    this.vectorMM_EE_X = this.level.megaman.position.x - this.position.x;
    this.vectorMM_EE_Y = this.level.megaman.position.y - this.position.y;
    this.vectorMM_EE_module = Math.sqrt(Math.pow(this.vectorMM_EE_X,2) + Math.pow(this.vectorMM_EE_Y,2));
    
    this.game.physics.arcade.collide(this,this.level.terrain);
    if(this.vectorMM_EE_module < this.radioActivacion){
        this.body.velocity.x = this.speed*this.direction;
    
    if(this.body.x < this.level.megaman.body.x){
        this.animations.play('vuelo');
        this.eggDroped = true;
    }else if(this.eggDroped == false){
        this.animations.play('bomba');
    }
    }
    
};

MegamanGame.prefab_BirdBomber.prototype.getEggDropped = function(){
    return this.eggDroped;
};

MegamanGame.prefab_BirdBomber.prototype.getCarringEgg = function(){
    return this.CarringEgg;
};

MegamanGame.prefab_BirdBomber.prototype.setCarringEgg = function(){
    this.CarringEgg = false;
};