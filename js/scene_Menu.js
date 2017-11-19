var MegamanGame = MegamanGame || {};
var spaceKey;

MegamanGame.scene_Menu = {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },
    preload:function(){    
        this.game.load.image('title', 'img/MainMenu.png');
        
        this.game.load.audio('music', 'sounds/MainMenu.mp3');
        this.game.load.audio('tecla', 'sounds/tecla.mp3');
    },
    create:function(){        
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER]);//la guardas
        
        this.title = this.game.add.image(0,0,'title');
        
        this.music = this.add.audio('music');
        this.music.loop = true;
        this.music.play();
        this.tecla = this.add.audio('tecla');
    },
    update:function(){
       
        if (this.enterKey.isDown){
            this.tecla.play();
            this.music.stop();
            this.state.start('bossSelect');
        }
    },
};