var MegamanGame = MegamanGame || {};

MegamanGame.prefab_huevoBirdBomber = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"huevo");
    this.animations.add('iddle',Phaser.Animation.generateFrameNames('iddle', 1, 1), 1, true);
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y =  400;
};

MegamanGame.prefab_huevoBirdBomber.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_huevoBirdBomber.prototype.constructor = MegamanGame.prefab_huevoBirdBomber;

MegamanGame.prefab_huevoBirdBomber.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.terrain);
    if(this.body.blocked.down){
        this.kill();
    }
}