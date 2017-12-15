var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Gorilla= function(game,x,y, _level,_speed,_direction,_high_jump){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'gorilla_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('jump', 1, 1), 10, true);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',2,2), 10, true);
    this.animations.add('colgar',Phaser.Animation.generateFrameNames('colgar',1,2), 3, true);
    
    this.speed = _speed;
    this.direction = _direction;
    this.high_jump = _high_jump;
    this.jumpRate = 2000;
    this.nextJump = 0;
    
    this.colgar = false;
    this.attack_jump = false;
    this.pass = false;
    this.jumping = false;
    
    this.once_0 = true;
    this.once_1 = false;
    
    game.physics.arcade.enable(this);
    this.body.setSize(30,30, 0,10);
    this.damage = 3;
    this.live = 19;

};

MegamanGame.prefab_Gorilla.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Gorilla.prototype.constructor = MegamanGame.prefab_Gorilla;

MegamanGame.prefab_Gorilla.prototype.update = function(){
    
    if(this.attack_jump == false) {
        this.game.physics.arcade.collide(this,this.level.terrain);
    }
    //this.game.debug.body(this);
    
     if(this.body.blocked.down){
        this.animations.play('idle');
        this.body.velocity.x = 0;
    }
    
    if(this.colgar == false && this.body.x - this.level.megaman.body.x < 100 && this.pass == false){
         this.animations.play('jump');
         this.body.velocity.y = -this.high_jump;
         this.colgar = true;
    }
    
    if(this.colgar == true && this.pass == false){
        
        if(this.body.x - this.level.megaman.body.x < 50 && this.pass == false){
            this.attack_jump = true;
            this.animations.play('jump');
            
            if(this.level.megaman.body.y < this.body.y && this.pass == false){
                this.body.velocity.y = -this.high_jump;
                this.body.velocity.x = this.speed * this.direction;
            }
            
            if(this.level.megaman.body.y > this.body.y && this.pass == false){
                this.body.gravity.y = gameOptions.megamanGravity;
                if(this.level.megaman.body.y - 25 > this.body.y) { this.pass = true; }
           
            }
            
        }
        else{
            this.animations.play('colgar');
          
            if(this.animations.frame == 0 &&  this.once_0 == true){
                this.body.x = this.body.x +10; 
                this.once_0 = false;
                this.once_1 = true;
            }
            else if(this.animations.frame == 1 &&  this.once_1 == true){
                this.body.x = this.body.x -10; 
                this.once_0 = true;
                this.once_1 = false;
            }
        }
    }
    
    if(this.pass == true && this.jumping == false){
        this.animations.play('idle');
        this.attack_jump = false;
        this.body.setSize(30,30,0,7);
        this.jumping = true;
    }
    
     if(this.jumping == true && this.game.time.now > this.nextJump){
        if(this.level.megaman.body.x < this.body.x ){ this.scale.x = 1;}
        else if(this.level.megaman.body.x > this.body.x ){ this.scale.x = -1;}
        
        this.nextJump = this.game.time.now + this.jumpRate;
        this.jump();
    }
    
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.scale.x,enemy.damage);
        }
    });
    
};

MegamanGame.prefab_Gorilla.prototype.jump = function(){
    this.animations.play('jump');
    
    if(this.scale.x == 1){ this.body.setSize(30,30,10,7); this.body.velocity.x = this.speed * this.direction; }
    else if(this.scale.x == -1){ this.body.setSize(30,30,10,7); this.body.velocity.x = -this.speed * this.direction; }
    
    this.body.velocity.y = -this.high_jump;
};

MegamanGame.prefab_Gorilla.prototype.hit = function(damage){
   
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