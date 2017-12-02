var MegamanGame = MegamanGame || {};

MegamanGame.scene_GameOverSelector= {
    init:function(){
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        this.positionStickX = 84;
        this.positionContinue = 113;
        this.positionSelection = 127;
        this.positionPasword = 139;
        this.selection = false;
        },
    preload:function(){
        this.game.load.image("background","img/GameOverSelector.png");
        this.game.load.image('stick', 'img/flecha.png');
    },
    create:function(){
        this.game.add.sprite(0,0,"background");
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.ENTER]);//la guardas

        this.stick =  this.game.add.sprite(this.positionStickX, this.positionContinue, 'stick');
        this.stick.anchor.setTo(0.5);
    },
    update:function(){
        if(this.cursors.down.isDown && this.cursors.down.duration < 10){
            if(this.stick.position.y == this.positionContinue){
                this.stick.position.y = this.positionSelection;
                this.selection = true;
            }
            else if(this.stick.position.y == this.positionSelection){
                this.stick.position.y = this.positionPasword;
                this.selection = false;
            }
            else if(this.stick.position.y == this.positionPasword){
                this.stick.position.y = this.positionContinue;
            }
        }
            if(this.stick.position.y == this.positionContinue && this.enterKey.isDown){ this.state.start("game");}
            else if(this.selection == true && this.enterKey.isDown){ this.state.start("bossSelect");}
            else if(this.selection == false && this.enterKey.isDown){console.log("pasword");}
        
    }
}