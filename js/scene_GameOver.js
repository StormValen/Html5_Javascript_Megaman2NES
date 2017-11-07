var MegamanGame = MegamanGame || {};

MegamanGame.scene_GameOver= {
    
    preload:function(){
       this.game.load.image("background","img/gameOver.png");
    },
    create:function(){
        this.enterkey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.counter = 0;
        this.game.add.sprite(0,0,"background");
    },
    update:function(){
       
        if(this.counter >= 300 || this.enterkey.isDown){
            this.state.start("gameOverSelector");
        }
        this.counter = this.counter + 1;
    }
}