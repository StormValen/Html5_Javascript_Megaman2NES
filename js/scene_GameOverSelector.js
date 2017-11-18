var MegamanGame = MegamanGame || {};

var MegamanGame = MegamanGame || {};

MegamanGame.scene_GameOverSelector= {
    
    preload:function(){
       this.game.load.image("background","img/gameOverSelector.jpg");
    },
    create:function(){
        this.continue = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.stageSelection = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.password = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        
        this.game.add.sprite(0,0,"background");
        
        
    },
    update:function(){
       
        if(this.continue.isDown){
            //restart game level
        }
        if(this.stageSelection.isDown){
            this.state.start("bossSelect");
        }
        if(this.password.isDown){
            //start password selector
        }
    }
}