var MegamanGame = MegamanGame || {};

MegamanGame.scene_GameOver= {
    
    preload:function(){
       this.game.load.image("background","img/gameOver.png");
       this.game.load.audio('music', 'sounds/GameOver.mp3');
    },
    create:function(){
        this.enterkey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.counter = 0;
        this.game.add.sprite(0,0,"background");
        
         
        this.music = this.add.audio('music');
        this.music.loop = true;
        this.music.play();    
    },
    update:function(){
       
        if(this.counter >= 300 || this.enterkey.isDown){
            this.music.stop();
            this.state.start("gameOverSelector");
        }
        this.counter = this.counter + 1;
    }
}