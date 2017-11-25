var MegamanGame = MegamanGame || {};

MegamanGame.prefab_RoboRabit = function(game,x,y, _level,_speed,_direction,_high_jump){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'roborabit_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('jump', 1, 1), 10, true);
    this.animations.add('jump_force',Phaser.Animation.generateFrameNames('jump',2,2), 10, true);
    this.animations.add('air',Phaser.Animation.generateFrameNames('jump',3,3), 10, true);
    
    this.speed = _speed;
    this.direction = _direction;
    this.high_jump = _high_jump;
    this.jumpRate = 2000;
    this.nextJump = 0;
    
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    this.body.setSize(30,38);
};

MegamanGame.prefab_RoboRabit.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_RoboRabit.prototype.constructor = MegamanGame.prefab_RoboRabit;

MegamanGame.prefab_RoboRabit.prototype.create = function(){

};

MegamanGame.prefab_RoboRabit.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);    
    //this.game.debug.body(this);
    
    if(this.body.blocked.down){
        this.animations.play('idle');
        this.body.velocity.x = 0;
    }

    if((this.body.x - 100 < this.level.megaman.body.x && this.body.x + 100 > this.level.megaman.body.x)  && this.game.time.now > this.nextJump){
        if(this.level.megaman.body.x < this.body.x ){ this.scale.x = 1;}
        else if(this.level.megaman.body.x > this.body.x ){ this.scale.x = -1;}
        
        this.nextJump = this.game.time.now + this.jumpRate;
        this.jump();
      
        this.body.setSize(30,37);
    }
   
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.scale.x);
        }
    });
};

MegamanGame.prefab_RoboRabit.prototype.jump = function(){
    this.animations.play('air');
    
    if(this.scale.x == 1){ this.body.velocity.x = this.speed * this.direction; }
    else if(this.scale.x == -1){ this.body.velocity.x = -this.speed * this.direction; }
    
    this.body.velocity.y = -this.high_jump;
};

MegamanGame.prefab_RoboRabit.prototype.shoot = function(){
      
};