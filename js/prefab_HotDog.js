var MegamanGame = MegamanGame || {};

MegamanGame.prefab_HotDog = function(game,x,y, _level,_direction){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'hotdog_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('iddle', 1, 6), 6, true);
    this.animations.add('atack',Phaser.Animation.generateFrameNames('ataque',1,2), 10, true);
    this.animations.add('spawn_air',Phaser.Animation.generateFrameNames('spawn',1,1), 10, true);
    this.animations.add('spawn_floor',Phaser.Animation.generateFrameNames('spawn',2,2), 10, true);
    
    this.direction = _direction;
    this.jumpRate = 2000;
    this.nextJump = 0;
    this.spawned_air = false;
    this.spawned_floor = false;
    this.isMiniJumping =0;
    this.lastValueOfGround =0;
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
};

MegamanGame.prefab_HotDog.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_HotDog.prototype.constructor = MegamanGame.prefab_HotDog;

MegamanGame.prefab_HotDog.prototype.create = function(){

};

MegamanGame.prefab_HotDog.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);    
    this.game.debug.body(this);
    
     if(this.body.blocked.down){
            this.lastValueOfGround = this.body.position.y;
        }
        
    this.isMiniJumping = this.lastValueOfGround -this.body.position.y; 
    console.log(this.isMiniJumping);
    
    if(!this.body.blocked.down && this.spawned_air == false){
         this.animations.play('spawn_air');
         this.spawned_air = true;
    }
    
    if(this.body.blocked.down && this.spawned_air == true && this.spawned_floor == false){
        this.animations.play('spawn_floor');
        this.body.setSize(30,30);
        this.spawned_floor = true;
    }
    
    if(this.body.blocked.down && this.spawned_floor == true){
            this.animations.play('idle');
        
            if(this.isMiniJumping >0.5){this.body.setSize(60,50);}
            else{this.body.setSize(60,60);}
 
        this.body.velocity.x = 0;
    }
};