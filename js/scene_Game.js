var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
                                    ////////// INIT FUNCTION //////////
    init:function(){
          
        this.game.physics.startSystem(Phaser.Physics.ARCADE); 
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Heigh);
    },
    
    
    
                                     ////////// PRELOAD FUNCTION //////////
    preload:function(){
        
        
        //MAP LOAD
        this.load.tilemap('WoodmanLevel','tilemaps/NewMapWoodman.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('ExtraBackground','tilemaps/ExtraBackground.png');
        this.load.image('MegamanTileset','img/MegamanTileset.png');
        this.load.image('basic','img/fondonegro.png');
        
        
        //Layer escaleras
        this.load.image('stairs_1','tilemaps/StairsLayer/stair_1.png');
        this.load.image('stairs_2','tilemaps/StairsLayer/stair_2.png');
        this.load.image('stairs_3','tilemaps/StairsLayer/stair_3.png');
        this.load.image('stairs_4','tilemaps/StairsLayer/stair_4.png');
        this.load.image('stairs_5','tilemaps/StairsLayer/stair_5.png');
        this.load.image('stairs_6','tilemaps/StairsLayer/stair_6.png');
        this.load.image('stairs_7','tilemaps/StairsLayer/stair_7.png');
        this.load.image('stairs_8','tilemaps/StairsLayer/stair_8.png');
        
        
        //MEGAMAN LOAD
        this.game.load.atlas('megaman_sprites', 'img/sprites.png', 'img/sprites.json');
        this.megaman_bullet_speed = 300;
        this.game.load.image('megaman_bullet', 'img/megaman_bullet.png');
        
        
    },
    
    
    
                                    ////////// CREATE FUNCTION //////////
    create:function(){
        
        //ALL MAP
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanTileset');
        this.map.addTilesetImage('basic');
        
        this.terrain = this.map.createLayer('Terrain');
        this.extraBackground = this.game.add.image(0,0,'ExtraBackground');
        this.blockedDoor = this.map.createLayer('BlockedDoor');
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
        
        //MEGAMAN
        this.megaman = new MegamanGame.prefab_Megaman(this.game,1100,80,this);
        this.game.add.existing(this.megaman);
        
        
        //KEYBOARD
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        
        
        //CAMERA
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
        
        
        //GROUP LOADS
        this.load_megaman_bullets();
        
        
        this.lastValueOfGround = 0;
    },
    
    
    
    
                                ////////// UPDATE FUNCTION //////////
    update:function(){
        
        
        //COLISIONS
        this.game.physics.arcade.collide(this.megaman,this.terrain);
        this.game.physics.arcade.overlap(this.megaman,this.stairs, this.megamanWithStairs, null, this);
        this.game.physics.arcade.collide(this.bullets,this.terrain ,this.bulletsWithTerrain, null, this);

    
        this.megaman.body.applyGravity = true;
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
            }
            else if(this.megaman.body.blocked.down)
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("run"); 
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
            }
            else if(this.megaman.body.blocked.down)
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("run"); 
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
            }
            else 
            {
                gameOptions.megamanNextFire =0;
                this.megaman.animations.play("idle");
            }
        }
        
      
        if(this.z.isDown && this.megaman.body.blocked.down ) //NO FUNCIONA
        {
            this.megaman.body.velocity.y = -gameOptions.megamanJump;
            gameOptions.megamanNextFire =0;
            this.megaman.animations.play("jump"); 
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
        console.log('stairs');
        this.megaman.body.applyGravity = false;
        
        if(this.cursors.up.isDown)
        {
            this.megaman.body.velocity.y = -gameOptions.megamanSpeed;
            this.megaman.animations.play("stair");
            this.megaman.scale.x = 1; 
        }
        else if(this.cursors.up.isUp)
        {
            this.megaman.animations.play("jump");  
            this.megaman.scale.x = 1; 
        }
    },
    
    bulletsWithTerrain:function(bullet, terrain){
            bullet.kill();
    }
};