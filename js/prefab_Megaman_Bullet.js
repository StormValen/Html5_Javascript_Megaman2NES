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
    
    this.game.physics.arcade.overlap(this,this.level.roborabit0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.roborabit1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.roborabit2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.roborabit3,this.hit);
    this.game.physics.arcade.overlap(this,this.level.roborabit4,this.hit);
    this.game.physics.arcade.overlap(this,this.level.roborabit5,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.birdbomber0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.birdbomber1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.birdbomber2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.birdbomber3,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.rooster0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.rooster1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.rooster2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.rooster3,this.hit);
    this.game.physics.arcade.overlap(this,this.level.rooster4,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.hotdog0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.hotdog1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.hotdog2,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.gorilla0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.gorilla1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.gorilla2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.gorilla3,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.ballbat0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat3,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat4,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat5,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat6,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat7,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat8,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat9,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat10,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat11,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat12,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat13,this.hit);
    this.game.physics.arcade.overlap(this,this.level.ballbat14,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.egg0,this.hit);
    this.game.physics.arcade.overlap(this,this.level.egg1,this.hit);
    this.game.physics.arcade.overlap(this,this.level.egg2,this.hit);
    this.game.physics.arcade.overlap(this,this.level.egg3,this.hit);
    
    this.game.physics.arcade.overlap(this,this.level.woodman,this.hit);
    
};

MegamanGame.prefab_Megaman_Bullet.prototype.hit = function(enemy, player){
    if(enemy.body.touching && enemy.body.touching){
            player.hit(enemy.damage);
            enemy.kill();
        }
}