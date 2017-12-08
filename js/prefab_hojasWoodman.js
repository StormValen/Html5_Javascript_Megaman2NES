var MegamanGame = MegamanGame || {};

MegamanGame.prefab_hojasWoodman = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"hojas_woodman");
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle', 1, 8), 10, true);
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y = 20;
    this.damage = 10;
    
};

MegamanGame.prefab_hojasWoodman.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_hojasWoodman.prototype.constructor = MegamanGame.prefab_hojasWoodman;

MegamanGame.prefab_hojasWoodman.prototype.update = function(){
    
    this.animations.play("iddle"); 

    this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.scale.x,enemy.damage);
            enemy.destroy();
        }
    });
}