var MegamanGame = MegamanGame || {};

MegamanGame.prefab_RoboRabit = function(game,x,y, _level,_speed,_direction,_high_jump){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'roborabit_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('jump', 1, 1), 10, true);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',1,3), 10, true);
    
    this.speed = _speed;
    this.direction = _direction;
    this.high_jump = _high_jump;
    
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    this.body.setSize(30,38);
};

MegamanGame.prefab_RoboRabit.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_RoboRabit.prototype.constructor = MegamanGame.prefab_RoboRabit;

MegamanGame.prefab_RoboRabit.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    
    this.animations.play('jump');
    this.body.velocity.x = this.speed*this.direction;
    this.body.velocity.y = -this.high_jump;
    
    //this.game.time.events.loop(Phaser.Timer.SECOND * 3,  , this); 
    
    this.body.velocity.y = -this.high_jump;
    
    this.game.physics.arcade.collide(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching.up && enemy.body.touching.down){
            player.body.velocity.y = -gameOptions.megamanJump;
            enemy.kill();
        }else{
          player.hit();
        }
    });
};