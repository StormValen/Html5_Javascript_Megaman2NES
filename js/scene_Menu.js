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
        this.game.load.image('title', 'img/title_megaman.png');
    },
    create:function(){        
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);//registras la key
        this.game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR]);//la guardas
        
        this.title = this.game.add.image(gameOptions.gameWidth/2,gameOptions.gameHeight/2,'title');
        this.title.anchor.setTo(0.5);
        this.title.scale.setTo(2);
        
        this.normal = this.game.add.text(this.game.world.centerX, this.game.world.centerY+150, 'NORMAL');
        this.normal.font = 'Arial Black';
        this.normal.fill = '#FFFFFF';
        this.normal.strokeThickness = 5;
        this.normal.anchor.setTo(.5);
        this.dificil = this.game.add.text(this.game.world.centerX, this.game.world.centerY+190, 'DIFFICULT');
        this.dificil.font = 'Arial Black';
        this.dificil.fill = '#5f5f5f';
        this.dificil.strokeThickness = 5;
        this.dificil.anchor.setTo(.5);
        
        this.continuar = this.game.add.text(this.game.world.centerX, this.game.world.centerY+240, 'PRESS  START');
        this.continuar.font = 'Arial Black';
        this.continuar.fill = '#FFFFFF';
        this.continuar.strokeThickness = 5;
        this.continuar.anchor.setTo(.5);
    },
    update:function(){
        if (this.spaceKey.isDown){
            this.state.start('bosSelect');
        }
    },
    /*crearTexto:function(){
        this.normal = this.game.add.text(this.game.world.centerX, this.game.world.centerY+150, 'NORMAL');
        this.normal.font = 'Arial Black';
        this.normal.fill = '#FFFFFF';
        this.normal.strokeThickness = 5;
        this.normal.anchor.setTo(.5);
        
        this.continuar = this.game.add.text(this.game.world.centerX, this.game.world.centerY+200, 'PRESS START');
        this.continuar.font = 'Arial Black';
        this.continuar.fill = '#FFFFFF';
        this.continuar.strokeThickness = 5;
        this.continuar.anchor.setTo(.5);
    }*/
    
};