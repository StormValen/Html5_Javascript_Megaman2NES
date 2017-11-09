var MegamanGame = MegamanGame || {};

MegamanGame.scene_Game= {
    
    init:function(){
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.megamanGravity;
        
        this.game.world.setBounds(0,0,gameOptions.level1Width,gameOptions.level1Heigh);
    },
    
    preload:function(){
        this.load.tilemap('WoodmanLevel','tilemaps/NewMapWoodman.json',null,Phaser.Tilemap.TILED_JSON);
        this.load.image('MegamanTileset','img/MegamanTileset.png');
        this.load.image('basic','img/fondonegro.png');
        
        this.game.load.atlas('megaman_sprites', 'img/sprites.png', 'img/sprites.json');
        
    },
    
    create:function(){
        this.map = this.game.add.tilemap('WoodmanLevel');
        this.map.addTilesetImage('MegamanTileset');
        this.map.addTilesetImage('basic');
        
        this.terrain = this.map.createLayer('Terrain');
        this.stairs = this.map.createLayer('Stairs');
        this.blockedDoor = this.map.createLayer('BlockedDoor');
        this.map.createLayer('Background'); 
        
        this.map.setCollisionBetween(0,100,true,'Terrain',true);
        //this.map.setCollisionBetween(4,4,true,'Stairs',true);    
        //this.map.setCollisionByIndex(4,true,'Stairs',true);
        this.map.setCollisionByExclusion(0,true,'Stairs',true);
        
        
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
    },
    
    update:function(){
        this.game.physics.arcade.collide(this.megaman,this.terrain);
       this.game.physics.arcade.overlap(this.megaman,this.stairs, this.hasCollidedWithStairs, null, this);
        
        this.megaman.body.applyGravity = true;
        this.megaman.body.velocity.x = 0;
        
        //ACCIONES POR TECLAS MEGAMAN
        if(this.cursors.left.isDown)
        {
            this.megaman.body.velocity.x = -gameOptions.megamanSpeed;
            
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.megaman.animations.play("shoot_run");  
            }
            else if(this.megaman.body.blocked.down)
            {
                this.megaman.animations.play("run"); 
            }
            this.megaman.scale.x = 1; 
        }
        
        else if(this.cursors.right.isDown)
        { 
            this.megaman.body.velocity.x = gameOptions.megamanSpeed;
            
            if(this.x.isDown && this.megaman.body.blocked.down)
            {
                this.megaman.animations.play("shoot_run");   
            }
            else if(this.megaman.body.blocked.down)
            {
                this.megaman.animations.play("run");
            }
            this.megaman.scale.x = -1;  
        }
        
        else if(this.megaman.body.blocked.down && this.megaman.body.velocity.x == 0){
             
            if(this.x.isDown && this.megaman.body.blocked.down){
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
       }/*
       if(this.x.isDown && !this.megaman.body.blocked.down)
       {
           this.megaman.animations.play("shoot_air");
       }*/
        

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