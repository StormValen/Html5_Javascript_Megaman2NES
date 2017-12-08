var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Woodman = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'woodman_sprites');
    this.anchor.setTo(0.5);
    
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle',1,1),10,true);
    this.animations.add('atack',Phaser.Animation.generateFrameNames('atack',1,2),10,true);
    this.animations.add('ritual',Phaser.Animation.generateFrameNames('ritual',1,3),10,true);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',1,1),10,true);
    
    this.spped = _speed;
    this.direction = _direction;
    this.damage = 1;
    this.live = 100;
    
    
    this.jumpRate = 2000;
    this.nextJump = 0;
    
    
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
};

MegamanGame.prefab_Woodman.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Woodman.prototype.constructor = MegamanGame.prefab_Woodman;

//FUNCTIONS 
MegamanGame.prefab_Woodman.prototype.create = function(){
    
};

MegamanGame.prefab_Woodman.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    this.game.debug.body(this);
    if(this.body.blocked.down){
        this.animations.play('iddle');
        this.body.setSize(30,37);
    }
    //this.animations.play('iddle');
    
    //Colision con Megaman
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.hit(enemy.scale.x,enemy.damage);
        }
    });
    
    if((this.body.x - 100 < this.level.megaman.body.x && this.body.x + 100 > this.level.megaman.body.x)  && this.game.time.now > this.nextJump){
        if(this.level.megaman.body.x < this.body.x ){ this.scale.x = 1;}
        else if(this.level.megaman.body.x > this.body.x ){ this.scale.x = -1;}
        
        this.nextJump = this.game.time.now + this.jumpRate;
        this.jump();
       this.body.setSize(30,37);
        
    }
};

MegamanGame.prefab_Woodman.prototype.jump = function(){
    this.animations.play('jump');
    if(this.scale.x == 1){ this.body.velocity.x = this.speed * this.direction; }
    else if(this.scale.x == -1){ this.body.velocity.x = -this.speed * this.direction; }
    this.body.velocity.y = -this.high_jump;
};

MegamanGame.prefab_Woodman.prototype.hit = function(damage){
   
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