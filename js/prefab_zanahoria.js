var MegamanGame = MegamanGame || {};

MegamanGame.prefab_zanahoria = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"zanahoria");
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle', 1, 1), 1, true);
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y = 0;
    this.shootDirectionX = (this.level.megaman.body.x - this.body.x)*2;
    this.shootDirectionY = (this.level.megaman.body.y - this.body.y)*2;
    
};

MegamanGame.prefab_zanahoria.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_zanahoria.prototype.constructor = MegamanGame.prefab_zanahoria;

MegamanGame.prefab_zanahoria.prototype.update = function(){
    this.body.velocity.x = this.shootDirectionX;
    this.body.velocity.y = this.shootDirectionY;
}