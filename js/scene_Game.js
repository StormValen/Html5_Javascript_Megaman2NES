var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
                                    ////////// INIT FUNCTION //////////
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Height); // para la camara el heigth tiene q ser el del juego y no nivel
    },
    
                                     ////////// PRELOAD FUNCTION //////////
    preload:function(){
        
        //MUSICA
        this.game.load.audio('music', 'sounds/Gameplay.mp3');
        this.game.load.audio('jumpS', 'sounds/salto.mp3');
        this.game.load.audio('shootS', 'sounds/disparo.mp3');        
        
        //MAP LOAD
        this.load.tilemap('WoodmanLevel','tilemaps/NewMapWoodman.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('ExtraBackground','tilemaps/ExtraBackground.png');
        this.load.image('MegamanTileset','img/MegamanTileset.png');
        this.load.image('basic','img/fondonegro.png');
        
        
        //STAIRS LOAD
        this.load.image('stairs_1','tilemaps/StairsLayer/stair_1.png');
        this.load.image('stairs_2','tilemaps/StairsLayer/stair_2.png');
        this.load.image('stairs_3','tilemaps/StairsLayer/stair_3.png');
        this.load.image('stairs_4','tilemaps/StairsLayer/stair_4.png');
        this.load.image('stairs_5','tilemaps/StairsLayer/stair_5.png');
        this.load.image('stairs_6','tilemaps/StairsLayer/stair_6.png');
        this.load.image('stairs_7','tilemaps/StairsLayer/stair_7.png');
        this.load.image('stairs_8','tilemaps/StairsLayer/stair_8.png');
        
        //LEAVES BUG
        this.load.image("MoreLeaves","img/MoreLeaves.png");
        
        //DOORS LAYER
        this.load.image('DoorsLayer','img/DoorsLayer.png');
        
        //HUD LOAD
        this.game.load.atlas('hud_lives', 'img/vidas.png', 'img/vidas.json');     
        
        //MEGAMAN LOAD
        this.game.load.atlas('megaman_sprites', 'img/sprites.png', 'img/sprites.json');             //Megaman
        this.game.load.image('megaman_bullet', 'img/megaman_bullet.png');                           //Megaman - Shoot
        this.megaman_bullet_speed = 300;
        
        //ENEMIES SPRITES LOADING
        this.game.load.atlas('roborabit_sprites', 'img/roborabit.png', 'img/roborabit.json');       //Roborabit
        this.game.load.atlas('birdbomber_sprites', 'img/birdbomber.png','img/birdbomber.json');     //Birdbomber
        this.game.load.atlas('rooster_sprites','img/rooster.png','img/rooster.json');               //Rooster
        this.game.load.atlas('ballbat_sprites','img/ballBat.png','img/ballBat.json');               //Ballbat   
        this.game.load.atlas('hotdog_sprites','img/hotdog.png','img/hotdog.json');                  //Hotdog
        this.game.load.atlas('gorilla_sprites','img/gorilla.png','img/gorilla.json');               //Gorilla
        this.game.load.image('dogShoot', 'img/dogShoot.png');                                       //Hotdog - Shoot     
        this.game.load.atlas('huevo','img/animHuevo.png','img/animHuevo.json');                     //Birdbomber - Shoot
        this.game.load.atlas('zanahoria','img/zanahora.png','img/zanahoria.json');                  //Roborabit - Shoot
        
        //item vida
        this.load.image('item_vida','img/itemVida.png');
        
        
    },
    
    
    
                                    ////////// CREATE FUNCTION //////////
    create:function(){
        
        //MUSICA
        this.music = this.add.audio('music');
        this.music.loop = true;
        this.music.play();
        this.shootS = this.add.audio('shootS');
        this.jumpS = this.add.audio('jumpS');
        
        //ALL MAP
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanTileset');
        this.map.addTilesetImage('basic');
        
        this.terrain = this.map.createLayer('Terrain');
        this.extraBackground = this.game.add.image(0,0,'ExtraBackground');
        this.blockedDoor = this.game.add.image(0,0,"DoorsLayer");
        this.map.createLayer('Background'); 
        
        this.map.setCollisionBetween(1,100,true,'Terrain',true);  
        
        this.stairs = this.game.add.group();
        this.stairs1 = this.game.add.sprite(1184,192,"stairs_1");
        this.stairs2 = this.game.add.sprite(1072,432,"stairs_2");
        this.stairs3 = this.game.add.sprite(1984,432,"stairs_3");
        this.stairs4 = this.game.add.sprite(1840,176,"stairs_4");
        this.stairs5 = this.game.add.sprite(3024,48,"stairs_5");
        this.stairs6 = this.game.add.sprite(2848,416,"stairs_6");
        this.stairs7 = this.game.add.sprite(3008,656,"stairs_7");
        this.stairs8 = this.game.add.sprite(2848,896,"stairs_8");
        this.stairs.add(this.stairs1);
        this.stairs.add(this.stairs2);
        this.stairs.add(this.stairs3);
        this.stairs.add(this.stairs4);
        this.stairs.add(this.stairs5);
        this.stairs.add(this.stairs6);
        this.stairs.add(this.stairs7);
        this.stairs.add(this.stairs8);
        this.game.physics.arcade.enable(this.stairs);
        
        this.MoreLeaves = this.game.add.image(0,0,"MoreLeaves");
        
        //MEGAMAN
        this.intialPosition_x = 3120; this.intialPosition_y = 1088;
        this.megaman = new MegamanGame.prefab_Megaman(this.game,this.intialPosition_x,this.intialPosition_y,this);
        this.game.add.existing(this.megaman);
        this.megaman.body.collideWorldBounds=true;
        
        //ROBORABIT PRUEBA
        this.roborabit0 = new MegamanGame.prefab_RoboRabit(this.game,528,128 ,this,50,-1,300);
        this.game.add.existing(this.roborabit0);
        
        this.roborabit1 = new MegamanGame.prefab_RoboRabit(this.game,768,160,this,50,-1,300);
        this.game.add.existing(this.roborabit1);
        
        this.roborabit2 = new MegamanGame.prefab_RoboRabit(this.game,1152,176,this,50,-1,300);
        this.game.add.existing(this.roborabit2);
        
        this.roborabit3 = new MegamanGame.prefab_RoboRabit(this.game,2864,400,this,50,-1,300);
        this.game.add.existing(this.roborabit3);
        
        this.roborabit4 = new MegamanGame.prefab_RoboRabit(this.game,2992,640 ,this,50,-1,300);
        this.game.add.existing(this.roborabit4);
        
        this.roborabit5 = new MegamanGame.prefab_RoboRabit(this.game,2864,880,this,50,-1,300);
        this.game.add.existing(this.roborabit5);
        
        //BIRDBOMBER PRUEBA
        this.birdbomber0 = new MegamanGame.prefab_BirdBomber(this.game,2352,32,this,60,-1,200);
        this.game.add.existing(this.birdbomber0);
        
        this.birdbomber1 = new MegamanGame.prefab_BirdBomber(this.game,2544,32,this,60,-1,200);
        this.game.add.existing(this.birdbomber1);
        
        this.birdbomber2 = new MegamanGame.prefab_BirdBomber(this.game,2688,32,this,60,-1,200);
        this.game.add.existing(this.birdbomber2);
        
        this.birdbomber3 = new MegamanGame.prefab_BirdBomber(this.game,2800,16,this,60,-1,200);
        this.game.add.existing(this.birdbomber3);
        
        //ROOSTER PRUEBA
        this.rooster1 = new MegamanGame.prefab_Rooster(this.game,3120,1088,this,110,-1,275);
        this.game.add.existing(this.rooster1);
        
        this.rooster2 = new MegamanGame.prefab_Rooster(this.game,3232,1056,this,110,-1,275);
        this.game.add.existing(this.rooster2);
        
        this.rooster3 = new MegamanGame.prefab_Rooster(this.game,3344,1056,this,110,-1,275);
        this.game.add.existing(this.rooster3);
        
        this.rooster4 = new MegamanGame.prefab_Rooster(this.game,3456,1056,this,110,-1,275);
        this.game.add.existing(this.rooster4);
        
        this.rooster0 = new MegamanGame.prefab_Rooster(this.game,3568,1056,this,110,-1,275);
        this.game.add.existing(this.rooster0); 
        
        //BALLBAL PRUEBA
        
        this.ballbat0 = new MegamanGame.prefab_BallBat(this.game,256,64,this,110,-1,20);
        this.game.add.existing(this.ballbat0);
        
        this.ballbat1 = new MegamanGame.prefab_BallBat(this.game,320,96,this,110,-1,20);
        this.game.add.existing(this.ballbat1);
        
        this.ballbat2 = new MegamanGame.prefab_BallBat(this.game,384,80 ,this,110,-1,20);
        this.game.add.existing(this.ballbat2);
        
        this.ballbat3 = new MegamanGame.prefab_BallBat(this.game,496,32,this,110,-1,20);
        this.game.add.existing(this.ballbat3);
        
        this.ballbat4 = new MegamanGame.prefab_BallBat(this.game,576,16 ,this,110,-1,20);
        this.game.add.existing(this.ballbat4);
        
        this.ballbat5 = new MegamanGame.prefab_BallBat(this.game,640,32,this,110,-1,20);
        this.game.add.existing(this.ballbat5);
        
        this.ballbat6 = new MegamanGame.prefab_BallBat(this.game,832,96,this,110,-1,20);
        this.game.add.existing(this.ballbat6);
        
        this.ballbat7 = new MegamanGame.prefab_BallBat(this.game,944,64,this,110,-1,20);
        this.game.add.existing(this.ballbat7);
        
        this.ballbat8 = new MegamanGame.prefab_BallBat(this.game,1040,64 ,this,110,-1,20);
        this.game.add.existing(this.ballbat8);
        
        this.ballbat9 = new MegamanGame.prefab_BallBat(this.game,1168,64,this,110,-1,20);
        this.game.add.existing(this.ballbat9);
        
        this.ballbat10 = new MegamanGame.prefab_BallBat(this.game,1136,336,this,110,-1,20);
        this.game.add.existing(this.ballbat10);
        
        this.ballbat11 = new MegamanGame.prefab_BallBat(this.game,1104,368,this,110,-1,20);
        this.game.add.existing(this.ballbat11);
        
        this.ballbat12 = new MegamanGame.prefab_BallBat(this.game,1072,352,this,110,-1,20);
        this.game.add.existing(this.ballbat12);
        
        this.ballbat13 = new MegamanGame.prefab_BallBat(this.game,1904,336,this,110,-1,20);
        this.game.add.existing(this.ballbat13);
        
        this.ballbat14 = new MegamanGame.prefab_BallBat(this.game,1856,304,this,110,-1,20);
        this.game.add.existing(this.ballbat14);
        
        
         //HOT DOG PRUEBA
        this.hotdog0 = new MegamanGame.prefab_HotDog(this.game,1216,592,this,-1);
        this.game.add.existing(this.hotdog0);
        
        this.hotdog1 = new MegamanGame.prefab_HotDog(this.game,1472,560,this,-1);
        this.game.add.existing(this.hotdog1);
        
        this.hotdog2 = new MegamanGame.prefab_HotDog(this.game,1760,528,this,-1);
        this.game.add.existing(this.hotdog2);
         
        //GORILLA PRUEBA
        this.gorilla0 = new MegamanGame.prefab_Gorilla(this.game,2160,300,this,50,-1,300);
        this.game.add.existing(this.gorilla0);
        
        this.gorilla1 = new MegamanGame.prefab_Gorilla(this.game,2256,300,this,50,-1,300);
        this.game.add.existing(this.gorilla1); 
        
        this.gorilla2 = new MegamanGame.prefab_Gorilla(this.game,2512,300,this,50,-1,300);
        this.game.add.existing(this.gorilla2);
        
        this.gorilla3 = new MegamanGame.prefab_Gorilla(this.game,2672,300,this,50,-1,300);
        this.game.add.existing(this.gorilla3);
        
        //HUD
        this.hud_lives = this.game.add.sprite(20,20, "hud_lives");
        this.hud_lives.fixedToCamera = true;
        this.hud_lives.animations.add('idle',Phaser.Animation.generateFrameNames('iddle', 1, 29), 10, true);
        
        //KEYBOARD
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        
        
        //CAMERA
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
        
        this.lastValueOfGround = 0; //Necesary for megaman movement
        
        this.load_megaman_bullets();
    },
    
                                ////////// UPDATE FUNCTION //////////
    update:function(){
        
        //HUD
        this.hud_lives.animations.play("idle");
        this.result = this.megaman.live/5;
        this.result = Math.trunc(this.result);
        this.hud_lives.animations.frame = 28 - this.result;

        
        //BIRD BOMBER DROPPS EGG
        if(this.birdbomber0.getEggDropped() == true && this.birdbomber0.getCarringEgg() == true){
            this.egg0 = new MegamanGame.prefab_huevoBirdBomber(this.game,this.birdbomber0.body.x+10,this.birdbomber0.body.y+20,this);
            this.game.add.existing(this.egg0);
            this.birdbomber0.setCarringEgg();
        }
        
        if(this.birdbomber1.getEggDropped() == true && this.birdbomber1.getCarringEgg() == true){
            this.egg1 = new MegamanGame.prefab_huevoBirdBomber(this.game,this.birdbomber1.body.x+10,this.birdbomber1.body.y+20,this);
            this.game.add.existing(this.egg1);
            this.birdbomber1.setCarringEgg();
        }
        
        if(this.birdbomber2.getEggDropped() == true && this.birdbomber2.getCarringEgg() == true){
            this.egg2 = new MegamanGame.prefab_huevoBirdBomber(this.game,this.birdbomber2.body.x+10,this.birdbomber2.body.y+20,this);
            this.game.add.existing(this.egg2);
            this.birdbomber2.setCarringEgg();
        }
        
        if(this.birdbomber3.getEggDropped() == true && this.birdbomber3.getCarringEgg() == true){
            this.egg3 = new MegamanGame.prefab_huevoBirdBomber(this.game,this.birdbomber3.body.x+10,this.birdbomber3.body.y+20,this);
            this.game.add.existing(this.egg3);
            this.birdbomber3.setCarringEgg();
        }
        
        //COLISIONS
        this.game.physics.arcade.collide(this.megaman,this.terrain);
        this.game.physics.arcade.overlap(this.megaman,this.stairs, this.megamanWithStairs, null, this);
        this.game.physics.arcade.collide(this.bullets,this.terrain ,this.bulletsWithTerrain, null, this);

        this.megaman.body.allowGravity = true;
        

        this.megaman.body.velocity.x = 0;
        
       if(this.megaman.body.blocked.down){
            this.lastValueOfGround = this.megaman.body.position.y;
        }
        
        this.isMiniJumping = this.lastValueOfGround -this.megaman.body.position.y; 
        
        //ACCIONES POR TECLAS MEGAMAN
        if(this.cursors.left.isDown)
        {
            this.megaman.body.velocity.x = -gameOptions.megamanSpeed;
            this.megaman.scale.x = 1; 
            
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.create_megaman_bullet(this.megaman.scale.x);
                this.megaman.animations.play("shoot_run"); 
                this.shootS.play();
                this.megaman.body.setSize(16, 24,2,-1);
            }
            else if(this.megaman.body.blocked.down)
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("run"); 
                this.megaman.body.setSize(13, 24,4,-1);
            }
            
            
            else if(this.x.isDown && this.isMiniJumping > 1){
                this.create_megaman_bullet(this.megaman.scale.x);
                this.megaman.animations.play("shoot_air");
                
            }
        }
        
        else if(this.cursors.right.isDown)
        { 
            this.megaman.body.velocity.x = gameOptions.megamanSpeed;
            this.megaman.scale.x = -1; 
            
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.create_megaman_bullet(this.megaman.scale.x);
                this.megaman.animations.play("shoot_run");
                this.shootS.play();
                this.megaman.body.setSize(16, 24,2,-1);
            }
            else if(this.megaman.body.blocked.down)
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("run"); 
                this.megaman.body.setSize(13, 24,4,-1);
            }
            else if(this.x.isDown && this.isMiniJumping > 1){
                this.create_megaman_bullet(this.megaman.scale.x);
                this.megaman.animations.play("shoot_air");
            }
        }
        
        else if(this.cursors.right.isUp && this.cursors.left.isUp && this.megaman.body.blocked.down){
             
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.create_megaman_bullet(this.megaman.scale.x);   
                this.megaman.animations.play("shoot_idle");
                this.shootS.play();
            }
            else 
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("idle");
                this.megaman.body.setSize(16, 24,2,0);
            }
        }
        
      
        if(this.z.isDown && this.megaman.body.blocked.down ) //NO FUNCIONA
        {
            this.megaman.body.velocity.y = -gameOptions.megamanJump;
            gameOptions.megamanNextFire =0;
            this.megaman.animations.play("jump"); 
            this.jumpS.play();
        }
        else if(this.x.isDown && this.isMiniJumping > 1)
        {
            this.create_megaman_bullet(this.megaman.scale.x);
            this.megaman.animations.play("shoot_air");
        }
    },
    
    
    
                             ////////// ALL LOADS GROUPS FUNCTIONS //////////  
    
    //GROUP BULLETS
    load_megaman_bullets:function(){
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
    },
    
    //SHOOT BULLETS, USES PREPHAPS
    create_megaman_bullet:function(scale){
        
        if(this.game.time.now > gameOptions.megamanNextFire)
        {
            gameOptions.megamanNextFire = this.game.time.now + gameOptions.megamanFireRate;
            
            var bullet = this.bullets.getFirstExists(false);
        
            if(!bullet)
            {
                bullet = new MegamanGame.prefab_Megaman_Bullet(this.game,(this.megaman.x) - (scale * 20), this.megaman.y,this);
                this.bullets.add(bullet);
            }
            else
            {
                //reset
                bullet.reset((this.megaman.x) -(scale * 20), this.megaman.y);
            }

            if(scale == 1){bullet.body.velocity.x = -this.megaman_bullet_speed;}
            if(scale == -1){bullet.body.velocity.x = this.megaman_bullet_speed;}   
        }
    },
    
    
    // CALLBACK COLLISIONS WITH STAIRS
    megamanWithStairs:function(obj1, obj2){
       // console.log("stairs");
        if(this.cursors.up.isDown)
        {
            this.megaman.body.allowGravity = false;
            this.megaman.body.velocity.y = -gameOptions.megamanSpeed;
            this.megaman.animations.play("stair");
            this.megaman.scale.x = 1; 
            this.megaman.body.setSize(16, 24,0,0);
        }
        if(this.cursors.down.isDown)
        {
            this.megaman.body.allowGravity = false;
            this.megaman.body.velocity.y = gameOptions.megamanSpeed;
            this.megaman.animations.play("stair");
            this.megaman.scale.x = 1; 
            this.megaman.body.setSize(16, 24,0,0);
        }
        if(this.cursors.down.isUp && this.cursors.up.isUp)
        {
            this.megaman.body.allowGravity = true;
            this.megaman.animations.stop("stair");
        }
        
    },
    
    bulletsWithTerrain:function(bullet, terrain){
            bullet.kill();
    }
};