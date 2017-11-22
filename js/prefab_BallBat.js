var MegamanGame = MegamanGame || {};

MegamanGame.prefab_BallBat = function(game, x, y,_level,_speed){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'ballbat_sprites');
    this.anchor.setTo(0.5);
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle', 1, 1), 10, true);
    this.animations.add('open',Phaser.Animation.generateFrameNames('abrir',1,2,),10,false);
    this.animations.add('fly',Phaser.Animation.generateFrameNames('volar',1,2),10,true);
    this.speed = _speed;
    game.physics.arcade.enable(this);
    
    this.megamanIsDetected = false;
    this.isOpen = false;
    
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    
    this.desiredVelocityX = 0;
    this.desiredVelocityY = 0;
    
    this.SteeringForceX = 0;
    this.SteeringForceY = 0;
};

MegamanGame.prefab_BallBat.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_BallBat.prototype.constructor = MegamanGame.prefab_BallBat;

//Functions

MegamanGame.prefab_BallBat.prototype.create = function(){
    
}

MegamanGame.prefab_BallBat.prototype.update = function(){
    if(this.body.x - this.level.megaman.body.x < 100){ //Mejorar esto <---
        this.megamanIsDetected = true;
    }
    if(this.megamanIsDetected == false){
        this.animations.play('iddle');
    }else if(this.megamanIsDetected == true){
        if(this.isOpen == false){
            this.anim = this.animations.play('open',false);
            this.anim.onComplete.add(this.open,this);
        }else{
            this.animations.play('fly');
            this.scale.y = -1;
            //Seek Behavior
    
            this.desiredVelocityX = this.body.x - this.level.megaman.body.x;
            this.desiredVelocityY = this.body.y - this.level.megaman.body.y;
    
            this.SteeringForceX = this.body.velocity.x - this.desiredVelocityX;
            this.SteeringForceY = this.body.velocity.y - this.desiredVelocityY;
    
            this.SteeringForceX /= 4;
            this.SteeringForceY /= 4;
    
            this.body.velocity.x = this.SteeringForceX;
            this.body.velocity.y = this.SteeringForceY;
        }
    }
}

MegamanGame.prefab_BallBat.prototype.open = function(){
    this.isOpen = true;
}