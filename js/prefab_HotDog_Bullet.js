var MegamanGame = MegamanGame || {};

MegamanGame.prefab_HotDog_Bullet = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"dogShoot");
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y = -220;
};

MegamanGame.prefab_HotDog_Bullet.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_HotDog_Bullet.prototype.constructor = MegamanGame.prefab_HotDog_Bullet;
