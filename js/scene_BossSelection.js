var MegamanGame = MegamanGame || {};
var spaceKey;

MegamanGame.scene_BossSelection = {
    init:function(){
    },
    preload:function(){
        this.game.load.image('background', 'img/stageSelect.png');
    },
    create:function(){
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR]);//la guardas
        this.title = this.game.add.image(0,0,'background');
    },
    update:function(){
         if (this.spaceKey.isDown){
            this.state.start('gameOver');
        }
    }
};