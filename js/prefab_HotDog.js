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
    this.nextShoot = 0
    this.idleRate = 2000;
    this.nextIdle = 0
    this.spawned_air = false;
    this.spawned_floor = false;
    this.isMiniJumping =0;
    this.lastValueOfGround =0;
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    
    this.first = true;
    this.second = false;
    this.actual_time1 = this.game.time.now;
    this.actual_time2 = this.game.time.now;
    
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    
};

MegamanGame.prefab_HotDog.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_HotDog.prototype.constructor = MegamanGame.prefab_HotDog;

MegamanGame.prefab_HotDog.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);    
    this.radioActivacion = 125;
    
    this.vectorMM_EE_X = this.position.x -this.level.megaman.position.x;
    this.vectorMM_EE_Y = this.position.y -this.level.megaman.position.y;
    this.vectorMM_EE_module = Math.sqrt(Math.pow(this.vectorMM_EE_X,2) + Math.pow(this.vectorMM_EE_Y,2));
    
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
       
           
        if(this.first == true ){
            
            if(this.nextIdle < 2000) {
                this.animations.play('idle');
            }
            else{
                this.first = false;
                this.second = true;
            }
            this.nextIdle = this.game.time.now - this.actual_time1;
            this.actual_time2 = this.game.time.now;
        }
        else if(this.second == true){
            
             
            if(this.nextShoot < 2000){ 
                if(this.vectorMM_EE_module < this.radioActivacion){
                    this.animations.play('atack');
                if(this.nextShoot%250<10){ this.createBullet(); }
                }
            }
            else{
                this.first = true;
                this.second = false;
            }
            this.nextShoot = this.game.time.now - this.actual_time2;
            this.actual_time1 = this.game.time.now;
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