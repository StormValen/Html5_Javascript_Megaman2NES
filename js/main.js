var MegamanGame = MegamanGame || {};

var gameOptions = {
    gameWidth:256,
    gameHeight:240,
    level1Width:10000, 
    level1Height:10000, 
    bgColor:0xf0f0f0,
    
    megamanGravity:900,
    megamanSpeed:80,
    megamanJump:300,
    
    megamanFireRate:400,
    megamanNextFire:0
};

MegamanGame.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);
MegamanGame.game.state.add('menu',MegamanGame.scene_Menu);
MegamanGame.game.state.add('bossSelect',MegamanGame.scene_BossSelection);
MegamanGame.game.state.add('game',MegamanGame.scene_Game);
MegamanGame.game.state.add('gameOver',MegamanGame.scene_GameOver);
MegamanGame.game.state.add('gameOverSelector',MegamanGame.scene_GameOverSelector);
MegamanGame.game.state.start('menu');