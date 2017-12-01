var MegamanGame = MegamanGame || {};

MegamanGame.prefab_ItemVida = function(game,x,y, _level){
    Phaser.Sprite.call(this,game,x,y,"item_vida");
    this.level = _level;
    this.anchor.setTo(0.5);
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    game.physics.arcade.enable(this);
    this.body.gravity.y = gameOptions.megamanGravity;
    this.vida = 50;
  
    
};

MegamanGame.prefab_ItemVida.prototype = Object.create(Phaser.Sprite.prototype);
MegamanGame.prefab_ItemVida.prototype.constructor = MegamanGame.prefab_ItemVida;

MegamanGame.prefab_ItemVida.prototype.update = function(){
     this.game.physics.arcade.collide(this,this.level.terrain);
    
     this.game.physics.arcade.overlap(this,this.level.megaman,function(enemy,player){
        if(enemy.body.touching && enemy.body.touching){
             player.more_live(enemy.vida);
             enemy.kill();
        }
    });
 
}