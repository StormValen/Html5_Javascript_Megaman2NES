var MegamanGame = MegamanGame || {};

var gameOptions = {
    gameWidth:960,
    gameHeight:540,
    level1Width:1280,
    level1Height:800,
    bgColor:0x444444,
};

platformer.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);
platformer.game.state.add('main',MegamanGame.level1);
platformer.game.state.start('main');