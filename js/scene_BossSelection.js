var MegamanGame = MegamanGame || {};
var enterKey;

MegamanGame.scene_BossSelection = {
    init:function(){
    },
    preload:function(){
        this.game.load.image('background', 'img/stageSelect.png');
    },
    create:function(){
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER]);//la guardas
        this.title = this.game.add.image(0,0,'background');
    },
    update:function(){
         if (this.enterKey.isDown){
            this.state.start('game');
        }
    }
};