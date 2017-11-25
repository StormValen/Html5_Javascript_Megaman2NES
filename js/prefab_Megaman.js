var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Megaman = function(game,x,y, _level){
    this.level = _level;
    Phaser.Sprite.call(this,game,x,y,'megaman_sprites');
    
    this.animations.add('idle',Phaser.Animation.generateFrameNames('idle', 1, 3), 10, true);
    this.animations.add('run',Phaser.Animation.generateFrameNames('run', 1, 3), 10, true);
    this.animations.add('jump',Phaser.Animation.generateFrameNames('jump',1,1), 10, true);
    this.animations.add('shoot_idle',Phaser.Animation.generateFrameNames('shoot_idle',1,1), 10, true);
    this.animations.add('shoot_run',Phaser.Animation.generateFrameNames('shoot_run',1,3), 10, true);
    this.animations.add('shoot_air',Phaser.Animation.generateFrameNames('shoot_air',1,1), 10, true);
    this.animations.add('stair',Phaser.Animation.generateFrameNames('stair',1,2), 10, true);
        
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    this.body.collideWorldBounds = true;
    this.live = 100;
    this.speed = 100;
    this.jump_hit = 100;
    
};

MegamanGame.prefab_Megaman.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Megaman.prototype.constructor = MegamanGame.prefab_Megaman;

MegamanGame.prefab_Megaman.prototype.update = function(){
    
};

MegamanGame.prefab_Megaman.prototype.hit = function(scaleEnemy){
   
    if(scaleEnemy == 1){ this.body.velocity.x = -this.speed; }
    else if(scaleEnemy == -1){ this.body.velocity.x = this.speed; }
    this.body.velocity.y = -this.jump_hit;
    this.animations.play('jump');
    this.live--;
    if(this.live < 0){ this.kill(); this.level.state.start('game'); }
};