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
    
    this.damage = 1;
    this.live = 29;
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
        this.radioActivacion = 200;
    
        this.vectorMM_EE_X = this.level.megaman.position.x - this.position.x;
        this.vectorMM_EE_Y = this.level.megaman.position.y - this.position.y;
        this.vectorMM_EE_module = Math.sqrt(Math.pow(this.vectorMM_EE_X,2) + Math.pow(this.vectorMM_EE_Y,2));
        if(this.vectorMM_EE_module < this.radioActivacion){
            this.shoot();
        }
        this.body.setSize(30,37);
    }
   
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.hit(enemy.scale.x,enemy.damage);
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
      this.newShoot = new MegamanGame.prefab_zanahoria(this.game,this.body.x,this.body.y,this.level);
    this.game.add.existing(this.newShoot);
};

MegamanGame.prefab_RoboRabit.prototype.hit = function(damage){
   
    this.live = this.live - damage;
    if(this.live < 0 ){ 
        this.random = this.game.rnd.integerInRange(1, 2);
        if(this.random == 1){
            this.vida = new MegamanGame.prefab_ItemVida(this.game,this.body.position.x,this.body.position.y,this.level);
            this.game.add.existing(this.vida);
        }
        this.destroy(); 
        
    }
};