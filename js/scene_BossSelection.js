var MegamanGame = MegamanGame || {};
var enterKey;

MegamanGame.scene_BossSelection = {
    init:function(){
    },
    preload:function(){
        this.game.load.image('background', 'img/stageSelect.png');
        
        this.game.load.audio('music', 'sounds/BossSelection.mp3');
        this.game.load.audio('tecla', 'sounds/tecla.mp3');
    },
    create:function(){
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER]);//la guardas
        this.title = this.game.add.image(0,0,'background');
        
        this.music = this.add.audio('music');
        this.music.loop = true;
        this.music.play();    
        this.tecla = this.add.audio('tecla');
    },
    update:function(){
         if (this.enterKey.isDown){
            this.tecla.play();
            this.music.stop();
            this.state.start('game');
        }
    }
};