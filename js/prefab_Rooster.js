var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Rooster = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    this.jumped = false;
    Phaser.Sprite.call(this,game,x,y,'rooster_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('run',Phaser.Animation.generateFrameNames('run', 1, 3), 10, true);
    
    this.speed = _speed;
    this.direction = _direction;
    this.jumpPower = _jumpPower;
    
    game.physics.arcade.enable(this);
    this.body.gravity.y =gameOptions.megamanGravity;
    
    this.damage = 1;
    this.live = 19;
};

MegamanGame.prefab_Rooster.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Rooster.prototype.constructor = MegamanGame.prefab_Rooster;

//Functions

MegamanGame.prefab_Rooster.prototype.create = function(){
    
}

MegamanGame.prefab_Rooster.prototype.update = function(){
    
    this.radioActivacion = 200;
    
    this.vectorMM_EE_X = this.level.megaman.position.x - this.position.x;
    this.vectorMM_EE_Y = this.level.megaman.position.y - this.position.y;
    this.vectorMM_EE_module = Math.sqrt(Math.pow(this.vectorMM_EE_X,2) + Math.pow(this.vectorMM_EE_Y,2));
        this.game.physics.arcade.collide(this,this.level.terrain);
    if(this.vectorMM_EE_module < this.radioActivacion){
      this.body.velocity.x = this.speed*this.direction;
    
    if(this.body.x < this.level.megaman.body.x +25 && this.jumped == false){
        this.jump();
        this.jumped = true;
    }
    this.animations.play('run');  
    }
    
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.hit(enemy.scale.x,enemy.damage);
        }
    });
    
}

MegamanGame.prefab_Rooster.prototype.jump = function(){
    this.body.velocity.y = -this.jumpPower;
}

MegamanGame.prefab_Rooster.prototype.hit = function(damage){
   
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