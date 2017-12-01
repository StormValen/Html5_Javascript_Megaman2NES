var MegamanGame = MegamanGame || {};

MegamanGame.prefab_Megaman_Bullet = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"megaman_bullet");
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.damage = 10;
};

MegamanGame.prefab_Megaman_Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_Megaman_Bullet.prototype.constructor = MegamanGame.prefab_Megaman_Bullet;

MegamanGame.prefab_Megaman_Bullet.prototype.update = function(){
    
    this.game.physics.arcade.overlap(this,this.level.roborabit0,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.damage);
            enemy.destroy();
        }
    });
}