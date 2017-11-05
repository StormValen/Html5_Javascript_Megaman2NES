var MegamanGame = MegamanGame || {};

var gameOptions = {
    gameWidth:960,
    gameHeight:540,
    level1Width:1280,
    level1Height:800,
    bgColor:0x444444,
};

MegamanGame.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);
MegamanGame.game.state.add('bosSelect',MegamanGame.scene_BossSelection);
MegamanGame.game.state.add('menu',MegamanGame.scene_Menu);
MegamanGame.game.state.start('menu');