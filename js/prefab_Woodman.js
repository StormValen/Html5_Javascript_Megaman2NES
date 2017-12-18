var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Woodman = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'woodman_sprites');
    this.anchor.setTo(0.5);
    
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle',1,1),10,true);
    this.animations.add('atack',Phaser.Animation.generateFrameNames('atack',1,2),10,false);
    this.animations.add('ritual',Phaser.Animation.generateFrameNames('ritual',1,3),10,false);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',1,1),10,false);
    
    this.speed = _speed;
    this.direction = _direction;
    this.damage = 1;
    this.live = 140;
    this.high_jump = _jumpPower/1.5;
    this.ritual = false;
    
    this.jumpRate = 4000;
    this.attackRate = 10000;
    this.ritualRate = 8000;
    this.nextJump = 0;
    this.nextAttack = 0;
    this.nextRitual = 0;
    
    this.currentAnimation = this.animations.play('iddle');
    
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    
    this.hud_lives_woodman;
    this.first = false;
    
    this.shieldOBJ;
};

MegamanGame.prefab_Woodman.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Woodman.prototype.constructor = MegamanGame.prefab_Woodman;

//FUNCTIONS 
MegamanGame.prefab_Woodman.prototype.create = function(){
    
};

MegamanGame.prefab_Woodman.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    
    if(this.level.megaman.body.position.x > 3808){
        //HUD
    if(this.body.position.x - this.level.megaman.body.position.x < 130 && this.first == false){
    
        this.hud_lives_woodman = this.game.add.sprite(35,20, "hud_lives_woodman");
        this.hud_lives_woodman.fixedToCamera = true;
        this.hud_lives_woodman.animations.add('idle',Phaser.Animation.generateFrameNames('iddle', 1, 29), 10, true);
        
        this.first = true;
    }
    if(this.first == true){
        this.hud_lives_woodman.animations.play("idle");
        this.result = this.live/5;
        this.result = Math.trunc(this.result);
        this.hud_lives_woodman.animations.frame = 28 - this.result;
    }
        
    ///////
    
    if(this.body.blocked.down){
        this.body.velocity.x = 0;
        this.animations.play('iddle');
    }
    
    //Colision con Megaman
    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.hit(enemy.scale.x,enemy.damage);
        }
    });
    
    //JUMP
    if(this.game.time.now > this.nextJump){
        if(this.level.megaman.body.x < this.body.x ){ this.scale.x = 1;}
        else if(this.level.megaman.body.x > this.body.x ){ this.scale.x = -1;}
        this.nextJump = this.game.time.now + this.jumpRate;
        this.jump();
  
    }else{
        this.body.gravity.y = gameOptions.megamanGravity;
    }
    
    //ATTACK
    if(this.game.time.now > this.nextAttack){
        this.nextAttack = this.game.time.now + this.attackRate;
        this.attack();
    }
    
    //SHIELD
    if(this.game.time.now > this.nextRitual){
        this.nextRitual = this.game.time.now + this.ritualRate;
        this.shield();
    }
    
    if(this.ritual = true){
         this.shieldOBJ.setPositionWM(this.body.x+16,this.body.y+16);
    }
    }
    
};

MegamanGame.prefab_Woodman.prototype.jump = function(){
    this.animations.play('jump');
    if(this.scale.x == 1){ this.body.velocity.x = this.speed * this.direction; }
    else if(this.scale.x == -1){ this.body.velocity.x = -this.speed * this.direction; }
    this.body.velocity.y = -this.high_jump;
};

MegamanGame.prefab_Woodman.prototype.attack = function(){
    this.currentanimation = this.animations.play('atack');
    this.hoja0 = new MegamanGame.prefab_hojasWoodman(this.game,242*16,64*16,this.level);
    this.hoja1 = new MegamanGame.prefab_hojasWoodman(this.game,245*16,64*16,this.level);
    this.hoja2 = new MegamanGame.prefab_hojasWoodman(this.game,248*16,64*16,this.level);
    this.hoja3 = new MegamanGame.prefab_hojasWoodman(this.game,251*16,64*16,this.level);
    this.game.add.existing(this.hoja0);  
    this.game.add.existing(this.hoja1);
    this.game.add.existing(this.hoja2);
    this.game.add.existing(this.hoja3);
};

MegamanGame.prefab_Woodman.prototype.shield = function(){
    this.ritual = true;
    this.animations.play('ritual');
    this.shieldOBJ = new MegamanGame.prefab_ShieldWoodman(this.game,this.body.x,this.body.y,this.level,50,-1,300, true);
    this.game.add.existing(this.shieldOBJ);    
};

MegamanGame.prefab_Woodman.prototype.hit = function(damage){
    
    if(this.shieldOBJ.isOn == false){
          this.live = this.live - damage;
    }
  
    if(this.live <= 0 ){ 
        this.destroy();
        MegamanGame.game.state.start('menu');
    }
};