var MegamanGame = MegamanGame || {};

MegamanGame.scene_BossSelection = {
    init:function(){
    },
    preload:function(){
        this.game.load.image('background', 'img/bosSelection.png');
       // this.game.load.image('background', 'img/main_menu.png');
    },
    create:function(){
        this.title = this.game.add.image(gameOptions.gameWidth/2,gameOptions.gameHeight/2,'background');
        this.title.anchor.setTo(0.5);
       // this.title.scale.setTo(2.5);
    },
    update:function(){
        
    }
};