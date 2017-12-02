var MegamanGame = MegamanGame || {};

var MegamanGame = MegamanGame || {};

MegamanGame.scene_GameOverSelector= {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.positionStickX = 0;//
        this.positionStickY = 0;//
        this.continue = true;
        this.selection = false;
        this.pasword = false;
        },
    preload:function(){
       //this.game.load.image("background","img/gameOverSelector.jpg");
        this.game.load.image('stick', 'img/flecha.png');
    },
    create:function(){
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER]);//la guardas
        
        this.stick =  this.game.add.sprite(gameOptions.gameWidth/2, gameOptions.gameHeight/2, 'stick');
        this.stick.anchor.setTo(0.5);
        //this.game.add.sprite(0,0,"background");
        
        
    },
    update:function(){
       if(this.cursors.down.isDown && this.cursors.down.duration < 10){
           this.selection = true;
           this.stick.position.y += 20;
       }
        
        if(this.cursors.up.isDown && this.cursors.up.duration < 10){
            this.pasword = true;
            this.continue = false;
           this.stick.position.y -= 20;
       }
        if(this.continue == true && this.enterKey.isDown){
            console.log("continue");
        }
       else if(this.selection == true && this.enterKey.isDown){
            console.log("selection");
        }
       else if(this.pasword == true && this.enterKey.isDown){
            console.log("pasword");
        }
    }
}