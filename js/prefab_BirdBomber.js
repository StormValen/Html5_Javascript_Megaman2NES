var MegamanGame = MegamanGame || {};

MegamanGame.prefab_BirdBomber = function(game, x, y,_level,_speed,_direction,_jumpPower){
    this.level = _level;
    this.eggDroped = false;
    this.CarringEgg = true;
    Phaser.Sprite.call(this,game,x,y,'birdbomber_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('bomba',Phaser.Animation.generateFrameNames('bomba', 1, 2), 10, true);
    this.animations.add('vuelo',Phaser.Animation.generateFrameNames('vuelo',1,2,),10,true);
    
    this.speed = _speed;
    this.direction = _direction;
    
    game.physics.arcade.enable(this);
    this.body.gravity.y =0;
    
    this.damage = 5;
    this.live = 49;
};

MegamanGame.prefab_BirdBomber.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_BirdBomber.prototype.constructor = MegamanGame.prefab_BirdBomber;

//Functions

MegamanGame.prefab_BirdBomber.prototype.create = function(){
    
};

MegamanGame.prefab_BirdBomber.prototype.update = function(){
    
    this.radioActivacion = 300;
    
    this.vectorMM_EE_X = this.level.megaman.position.x - this.position.x;
    this.vectorMM_EE_Y = this.level.megaman.position.y - this.position.y;
    this.vectorMM_EE_module = Math.sqrt(Math.pow(this.vectorMM_EE_X,2) + Math.pow(this.vectorMM_EE_Y,2));
    
    //this.game.physics.arcade.collide(this,this.level.terrain);
    if(this.vectorMM_EE_module < this.radioActivacion){
        this.body.velocity.x = this.speed*this.direction;
    
    if(this.body.x < this.level.megaman.body.x){
        this.animations.play('vuelo');
        this.eggDroped = true;
    }else if(this.eggDroped == false){
        this.animations.play('bomba');
    }
    }
    
     this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.hit(enemy.scale.x,enemy.damage);
        }
    });
    
};

MegamanGame.prefab_BirdBomber.prototype.getEggDropped = function(){
    return this.eggDroped;
};

MegamanGame.prefab_BirdBomber.prototype.getCarringEgg = function(){
    return this.CarringEgg;
};

MegamanGame.prefab_BirdBomber.prototype.setCarringEgg = function(){
    this.CarringEgg = false;
};

MegamanGame.prefab_BirdBomber.prototype.hit = function(damage){
   
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