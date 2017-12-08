var MegamanGame = MegamanGame || {};

MegamanGame.prefab_ShieldWoodman = function(game, x, y,_level,_speed,_direction,_jumpPower,isOn){
    this.level = _level;
        
    Phaser.Sprite.call(this,game,x,y,'shield');
    this.anchor.setTo(0.5);
    this.animations.add('shield',[0,1,2,3],10,true);
    this.animations.play('shield');
    
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;
    
    this.timeAlive = 0;
    this.isOn = isOn; 
};

MegamanGame.prefab_ShieldWoodman.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_ShieldWoodman.prototype.constructor = MegamanGame.prefab_ShieldWoodman;

//FUNCTIONS 

MegamanGame.prefab_ShieldWoodman.prototype.setPositionWM = function(X,Y){
    this.position.x = X;
    this.position.y = Y;
};

MegamanGame.prefab_ShieldWoodman.prototype.update = function(){
    if(this.timeAlive > 300){
        this.destroy();    
        this.isOn = false;
    }
    this.timeAlive = this.timeAlive +1;
};