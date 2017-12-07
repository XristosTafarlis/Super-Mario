var GamePlay = {
	create: function(){
		//Sounds
		mushroomKillSound = game.add.audio('mushroomKill');
		mushroomSound = game.add.audio ('mushroomSpawn');
		deathSound = game.add.audio('death');
		bonusSound = game.add.audio('Qmark');
		coinSound = game.add.audio('click');
		kickSound = game.add.audio('sout');
		jumpsound = game.add.audio('hop');
		killSound = game.add.audio('rip');
		tpSound = game.add.audio('pipe');
		music = game.add.audio('peru');
		
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.stage.backgroundColor = '#5c94fc';

		//Game music playback
		music.play('',0,1,true);
		
		//Setting text style
		txtStyle = {
			font: '25px arial',
			fill: '#ffffff',
			aligment: 'center',
			stroke: '#000000',
			strokeThickness : 1
		}
		//On screen score print
		scoretxt = game.add.text( 20, 10, '', txtStyle);
		scoretxt.fixedToCamera = true;
		score_count = parseInt(localStorage.getItem("totalScore"));
		
		//On screen lives print
		livestxt = game.add.text( 385, 10, '', txtStyle);
		livestxt.fixedToCamera = true;
		lives_count = parseInt(localStorage.getItem("lives"));
		
		//On Screen Game Over print
		GameOver = game.add.text( 160, 90, ' ',{
			font: "35px arial",
			fill: "#ffffff",
			aligment: "center",
			stroke: "#000000",
			strokeThickness: 3
		});
		GameOver.fixedToCamera = true;
		
		//Creating map
		map.addTilesetImage('tiles', 'tiles');
		map.setCollisionBetween( 4, 11, true, 'solid');
		map.createLayer('background');
		layer = map.createLayer('solid');
		layer.resizeWorld();
		
		//Creating coins
		coins = game.add.group();
		coins.enableBody = true;
		map.createFromTiles( 2, null, 'coin', 'stuff', coins);
		coins.callAll('animations.add', 'animations', 'spin', [ 0, 1, 2, 3, 4, 5, 6, 7], 8, true);
		coins.callAll('animations.play', 'animations', 'spin');
		
		//Creating bonus
		bonuses = game.add.group();
		bonuses.enableBody = true;
		map.createFromTiles( 3, null, 'bonus', 'stuff', bonuses);
		bonuses.callAll('animations.add', 'animations', 'switch', [ 0, 1, 2, 3, 4, 3, 2, 1], 5, true);
		bonuses.callAll('animations.play', 'animations', 'switch');
		bonuses.setAll('body.immovable', true);
		
		//Creating bonus mushroom box
		mushroomBox = game.add.group();
		mushroomBox.enableBody = true;
		map.createFromTiles( 23, null, 'bonus', 'stuff', mushroomBox);
		mushroomBox.callAll('animations.add', 'animations', 'switch', [ 0, 1, 2, 3, 4, 3, 2, 1], 5, true);
		mushroomBox.callAll('animations.play', 'animations', 'switch');
		mushroomBox.setAll('body.immovable', true);
	
		//Creating mushroom
		mushrooms = game.add.group();
		mushrooms.enableBody = true;
		map.createFromTiles( 24, null, 'mushroom', 'stuff', mushrooms);
	
		//Creating fall
		falls = game.add.group();
		falls.enableBody = true;
		map.createFromTiles(12, null, 'fall', 'stuff', falls);
		falls.callAll('animations.add', 'animations', 'swipe', [ 0, 1, 2, 3], 4, true);
		falls.callAll('animations.play', 'animations', 'swipe');
		falls.setAll('body.immovable', true);	
		
		//Creating barrier
		barriers = game.add.group();
		barriers.enableBody = true;
		map.createFromTiles( 22, null, 'barrier', 'stuff', barriers);
		barriers.callAll('animations.add', 'animations', 'none', [0], 2, false);
		barriers.callAll('animations.play', 'animations', 'none');
		barriers.setAll('body.immovable', true);
		
		//Creating teleport
		teleports = game.add.group();
		teleports.enableBody = true;
		map.createFromTiles( 25, null, 'tp', 'stuff', teleports);
		teleports.callAll('animations.add', 'animations', 'static', [0], 1, true);
		teleports.callAll('animations.play', 'animations', 'static');
		teleports.setAll('body.immovable', true);
		
		//Creating back teleport
		teleportsBack = game.add.group();
		teleportsBack.enableBody = true;
		map.createFromTiles( 24, null, 'tp2', 'stuff', teleportsBack);
		teleportsBack.callAll('animations.add', 'animations', 'static', [0], 1, true);
		teleportsBack.callAll('animations.play', 'animations', 'static');
		teleportsBack.setAll('body.immovable', true);
		
		//Creating turtles
		turtles = game.add.group();
		turtles.enableBody = true;
		map.createFromTiles( 26, null, 'turtle', 'stuff', turtles);
		turtles.callAll('animations.add', 'animations', 'moveLeft', [ 0, 1 ], 2, true);
		turtles.callAll('animations.add', 'animations', 'moveRight', [ 2, 3 ], 2, true);
		turtles.callAll('animations.play', 'animations', 'moveLeft');
		turtles.setAll('body.bounce.x', 1);
		turtles.setAll('body.gravity.y', 500);
		turtles.forEach(goombaSpeed, this);

		//Creating goombas
		goombas = game.add.group();
		goombas.enableBody = true;
		map.createFromTiles( 1, null, 'goomba', 'stuff', goombas);
		goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ], 2, true);
		goombas.callAll('animations.play', 'animations', 'walk');
		goombas.setAll('body.bounce.x', 1);
		goombas.setAll('body.gravity.y', 500);
		goombas.forEach(goombaSpeed, this);
	
		//Creating player
		player = game.add.sprite( 32, game.world.height - 48, 'mario');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 370;
		player.body.collideWorldBounds = true;
		player.animations.add('walkRight', [ 1, 2, 3], 10, true);
		player.animations.add('walkLeft', [ 8, 9, 10], 10, true);
		player.animations.add('TPLeft', [ 14, 15, 16, 17, 18, 19, 20], 7, false);
		player.animations.add('TPRight', [ 35, 36, 37, 38, 39, 40, 41], 7, false);
		player.animations.add('TPDownRight', [ 21, 22, 23, 24, 25, 26, 27], 7, false);
		player.animations.add('TPDownLeft', [ 28, 29, 30, 31, 32, 33, 34], 7, false);
		player.goesRight = true;
		cursors = game.input.keyboard.createCursorKeys();

		//Creatin castle
		endlevel = game.add.group();
		endlevel.enableBody = true;
		map.createFromTiles( 33, null, 'endlvl', 'stuff', endlevel);
		endlevel.callAll('animations.add', 'animations', '0frames', [0], 1, false);
		endlevel.callAll('animations.play', 'animations', '0frames');
		endlevel.setAll('body.immovable', true);
	},

	update: function() {
		jumpFix = false;
		game.world.bringToTop(goombas);
		cameraFunc(player);

		//Score print update
		scoretxt.text = "SCORE : " + score_count;
		game.world.bringToTop(scoretxt);
		
		//Lives print update
		if(lives_count == 1)
			livestxt.text = "LIFE : " + lives_count;
		else
			livestxt.text = "LIVES : " + lives_count;
		game.world.bringToTop(livestxt);
		
		//Game physics
		game.physics.arcade.collide(player, teleportsBack, tpBackCollide);
		game.physics.arcade.collide(player, mushroomBox, mushBoxColide);
		game.physics.arcade.collide(player, bonuses, bonusCollide);
		game.physics.arcade.collide(player, teleports, tpCollide);
		game.physics.arcade.collide(player, endlevel, nextLevel);
		game.physics.arcade.collide(turtles, layer, turtleAnim);
		game.physics.arcade.collide(turtles, teleports);
		game.physics.arcade.collide(goombas, barriers);
		game.physics.arcade.collide(turtles, barriers);
		game.physics.arcade.collide(goombas, layer);
		game.physics.arcade.collide(player, layer);
		game.physics.arcade.collide(coins, layer);


		game.physics.arcade.overlap(turtles, goombas, turtleVgoomba);
		game.physics.arcade.overlap(player, goombas, goombaOverlap);
		game.physics.arcade.overlap(player, turtles, turtleOverlap);
		game.physics.arcade.overlap(player, mushrooms, mushColide);
		game.physics.arcade.overlap(player, falls, fallOverlap);
		game.physics.arcade.overlap(player, coins, coinOverlap);
		
		//Player movement
		if (player.body.enable) {
			player.body.velocity.x = 0;
			if (cursors.left.isDown) {
				player.body.velocity.x = -90;
				player.animations.play('walkLeft');
				player.goesRight = false;
			} else if (cursors.right.isDown) {
				player.body.velocity.x = 90;
				player.animations.play('walkRight');
				player.goesRight = true;
			} else {
				player.animations.stop();
				if (player.goesRight)
					player.frame = 0;
				else
					player.frame = 7;
			}
			if (cursors.up.isDown && (player.body.onFloor()  || jumpFix == true)) {
				jumpFunction();
			}
			if (player.body.velocity.y != 0) {
				if (player.goesRight)
					player.frame = 5;
				else
					player.frame = 12;
			}
		}
	}
}