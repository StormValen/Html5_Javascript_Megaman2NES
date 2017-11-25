var MegamanGame = MegamanGame || {};

MegamanGame.prefab_HotDog = function(game,x,y, _level,_direction){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'hotdog_sprites');
    this.anchor.setTo(0.5,1);
    this.animations.add('idle',Phaser.Animation.generateFrameNames('iddle', 1, 6), 8, true);
    this.animations.add('atack',Phaser.Animation.generateFrameNames('ataque',1,2), 10, true);
    this.animations.add('spawn_air',Phaser.Animation.generateFrameNames('spawn',1,1), 10, true);
    this.animations.add('spawn_floor',Phaser.Animation.generateFrameNames('spawn',2,2), 10, true);
    
    this.direction = _direction;
    this.shootRate = 2000;
    this.nextShoot = this.game.time.now + 3000;
    this.idleRate = 2000;
    this.nextIdle = this.game.time.now;
    this.spawned_air = false;
    this.spawned_floor = false;
    this.isMiniJumping =0;
    this.lastValueOfGround =0;
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    
   
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    
};

MegamanGame.prefab_HotDog.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_HotDog.prototype.constructor = MegamanGame.prefab_HotDog;

MegamanGame.prefab_HotDog.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);    
    this.game.debug.body(this);
    
     if(this.body.blocked.down){
            this.lastValueOfGround = this.body.position.y;
         this.body.gravity.y = 0;
        }
        
    this.isMiniJumping = this.lastValueOfGround -this.body.position.y; 
    //console.log(this.isMiniJumping);
    
    if(!this.body.blocked.down && this.spawned_air == false){
         this.animations.play('spawn_air');
         this.spawned_air = true;
    }
    
    if(this.body.blocked.down && this.spawned_air == true && this.spawned_floor == false){
        this.animations.play('spawn_floor');
        this.body.setSize(30,30);
        this.spawned_floor = true;
    }
    
    if(this.spawned_floor == true){
       
        
        if(this.game.time.now > this.nextShoot){ 
            this.animations.play('atack');
            this.nextShoot = this.game.time.now + this.shootRate;
            this.createBullet();
        }
        else if(this.game.time.now > this.nextIdle) {
             this.animations.play('idle');
             this.nextIdle = this.game.time.now + this.idleRate;
        }
       
        this.body.setSize(60,60);
        this.body.velocity.x = 0;
    }
};


MegamanGame.prefab_HotDog.prototype.createBullet = function(){
    var bullet = this.bullets.getFirstExists(false);
        
    if(!bullet)
    {
        bullet = new MegamanGame.prefab_HotDog_Bullet(this.game,this.body.position.x, this.body.position.y+50,this.level);
        this.bullets.add(bullet);
    }
    else { bullet.reset(this.body.position.x, this.body.position.y+50); }
    bullet.body.velocity.x = -130;
    bullet.body.velocity.y = 110;
};