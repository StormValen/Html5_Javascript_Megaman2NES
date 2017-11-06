var MegamanGame = MegamanGame || {};
var spaceKey;

MegamanGame.scene_Menu = {
    init:function(){
        /*this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameOptions.gameWidth/2, gameOptions.gameHeigth/2);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);   
        this.game.world.setBounds(0,0,gameOptions.level1Width, gameOptions.level1Height);*/
    },
    preload:function(){
        this.game.load.image('title', 'img/MainMenu.png');
    },
    create:function(){        
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR]);//la guardas
        
        this.title = this.game.add.image(0,0,'title');
    },
    update:function(){
        if (this.spaceKey.isDown){
            this.state.start('bossSelect');
        }
    },
};