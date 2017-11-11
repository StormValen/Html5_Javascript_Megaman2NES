var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Megaman_Bullet = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"megaman_bullet");
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
};

MegamanGame.prefab_Megaman_Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Megaman_Bullet.prototype.constructor = MegamanGame.prefab_Megaman_Bullet;

MegamanGame.prefab_Megaman_Bullet.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    /*
     if(this.body.blocked.left || this.body.blocked.right){
        this.kill();
    }*/
};