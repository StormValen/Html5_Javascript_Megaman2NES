var MegamanGame = MegamanGame || {};

MegamanGame.prefab_miniBird = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"birdbomber_sprites");
    this.animations.add('pajaro',Phaser.Animation.generateFrameNames('pajaro', 1, 2), 10, true);
    this.animations.play('pajaro');
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;
    
    this.damage = 1;
};

MegamanGame.prefab_miniBird.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_miniBird.prototype.constructor = MegamanGame.prefab_miniBird;

MegamanGame.prefab_miniBird.prototype.update = function(){
    this.animations.play('pajaro');
    this.body.velocity.x = -60;
    
     this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.scale.x,enemy.damage);
            enemy.destroy();
        }
    });
}
