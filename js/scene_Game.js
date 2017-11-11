var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.megamanGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Heigh);
    },
    
    preload:function(){
        this.load.tilemap('WoodmanLevel','tilemaps/NewMapWoodman.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('StairsLayer',"tilemaps/StairsLayer.png");
        this.load.image('ExtraBackground','tilemaps/ExtraBackground.png');
        this.load.image('MegamanTileset','img/MegamanTileset.png');
        this.load.image('basic','img/fondonegro.png');
        
        this.game.load.atlas('megaman_sprites', 'img/sprites.png', 'img/sprites.json');
        
        this.megaman_bullet_speed = 300;
        this.game.load.image('megaman_bullet', 'img/megaman_bullet.png');
        
    },
    
    create:function(){
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanTileset');
        this.map.addTilesetImage('basic');
        
        this.terrain = this.map.createLayer('Terrain');
        this.stairs = this.game.add.image(0,0,'StairsLayer');
        this.extraBackground = this.game.add.image(0,0,'ExtraBackground');
        this.blockedDoor = this.map.createLayer('BlockedDoor');
        this.map.createLayer('Background'); 
        
        this.map.setCollisionBetween(0,100,true,'Terrain',true);  
        
        this.megaman = this.game.add.sprite(1000,80,'megaman_sprites');
        this.megaman.anchor.setTo(0.5);
        this.megaman.animations.add('idle',Phaser.Animation.generateFrameNames('idle', 1, 3), 10, true);
        this.megaman.animations.add('run',Phaser.Animation.generateFrameNames('run', 1, 3), 10, true);
        this.megaman.animations.add('jump',Phaser.Animation.generateFrameNames('jump',1,1), 10, true);
        this.megaman.animations.add('shoot_idle',Phaser.Animation.generateFrameNames('shoot_idle',1,1), 10, true);
        this.megaman.animations.add('shoot_run',Phaser.Animation.generateFrameNames('shoot_run',1,3), 10, true);
        this.megaman.animations.add('shoot_air',Phaser.Animation.generateFrameNames('shoot_air',1,1), 10, true);
        this.megaman.animations.add('stair',Phaser.Animation.generateFrameNames('stair',1,2), 10, true);
        
        this.game.physics.arcade.enable(this.megaman);
        this.megaman.body.collideWorldBounds = true;
        this.megaman.body.setSize(14,24);
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        
        this.camera.follow(this.megaman,Phaser.Camera.FOLLOW_PLATFORMER);
        
        this.load_megaman_bullets();
    },
    
    update:function(){
        this.game.physics.arcade.collide(this.megaman,this.terrain);
        //this.game.physics.arcade.collide(this.megaman,this.stairs, this.hasCollidedWithStairs, null, this);
        
        this.megaman.body.applyGravity = true;
        this.megaman.body.velocity.x = 0;
        
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
                this.megaman.animations.play("run"); 
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
                this.megaman.animations.play("run");
            } 
        }
        
        else if(this.megaman.body.blocked.down && this.cursors.right.isUp && this.cursors.right.isUp){
             
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.create_megaman_bullet(this.megaman.scale.x);
                 this.megaman.animations.play("shoot_idle");
            }
            else 
            {
                this.megaman.animations.play("idle");
            }
        }
        
       if(this.z.isDown && this.megaman.body.blocked.down && this.z.downDuration(250))
       {
           this.megaman.body.velocity.y = -gameOptions.megamanJump;
           this.megaman.animations.play("jump");  
       }
        /*
       if(this.x.isDown && !this.megaman.body.blocked.down)
       {
           this.megaman.animations.play("shoot_air");
       }*/
        

    },
    
    load_megaman_bullets:function(){
        this.bullets = this.add.group();
        this.bullets.enableBody = true;
    },
    
    create_megaman_bullet:function(scale){
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

            
    },
    
    hasCollidedWithStairs:function(obj1, obj2){
        console.log('yes_');
        this.megaman.body.applyGravity = false;
        
        if(this.cursors.up.isDown)
        {
            this.megaman.body.velocity.y = -gameOptions.megamanSpeed;
            this.megaman.animations.play("stair");
            this.megaman.scale.x = 1; 
        }
        
        else if(this.cursors.down.isDown)
        {
            this.megaman.body.velocity.y = +gameOptions.megamanSpeed;
            this.megaman.animations.play("stair");
            this.megaman.scale.x = 1; 
        }
    }
};