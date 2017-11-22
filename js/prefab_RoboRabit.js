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
    
    if(this.body.x - this.level.megaman.body.x >= 75){
        this.animations.play('idle');
        this.body.setSize(30,37);
    }
    else { this.animations.play('jump_force');
         this.body.setSize(30,35);}
    /*
    else if(this.body.blocked.down){
        //this.jump();
    }
    else if(!this.body.blocked.down){
        //this.animations.play('air');
    }*/
    
    this.game.physics.arcade.collide(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching.up && enemy.body.touching.down){
            player.body.velocity.y = -gameOptions.megamanJump;
            enemy.kill();
        }else{
          player.hit();
        }
    });
};

MegamanGame.prefab_RoboRabit.prototype.jump = function(){
    this.animations.play('jump_force');
    this.body.velocity.x = this.speed*this.direction;
    this.body.velocity.y = -this.high_jump;
};