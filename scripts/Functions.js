function jumpFunction() {
	player.body.velocity.y = -220;
	player.animations.stop();
	
	//Jump sound playback
	jumpsound.play( '', 0, 0.7);
}

function cameraFunc(player) {
	//Making the camera stop before the bonus part of the map
	if(player.x >= 3231 && player.x <= 3472){
		game.camera.follow(null);
	}else if (player.x >= 3744 && player.x <= 3968){
		game.camera.x = 3712;
		game.camera.follow(null);
	}else{
		game.camera.follow(player);
	}
}

function fallOverlap(player, fall) {
	//Calling death function
	DeathOccurs();
}

function coinOverlap(player, coin) {
	coin.kill();
	
	//Coin sound playback
	coinSound.play();
	
	//Coin score add
	score_count += 10;
}

function bonusCollide(player, bonus) {
	jumpFix = true;
	if (player.body.touching.up && bonus.frame != 5) {
		jumpFix = false;

		//Bonus sound playback
		bonusSound.play();

		coinspin = game.make.sprite(bonus.x , bonus.y - 80, 'coinspin');
		coins.addChild(coinspin);
		game.world.bringToTop(coins);
		coinspin.animations.add('getcoin', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], 19 ,false);
		coinspin.animations.play('getcoin');

		//Bonus score update
		score_count += 50;

		bonus.animations.stop();
		bonus.frame = 5;
	}else if (player.body.touching.up){
		jumpFix = false;
	}else if (player.body.touching.right){
		jumpFix = false;
	}else if (player.body.touching.left){
		jumpFix = false;
	}
}

function mushBoxColide(player, box) {
	jumpFix = true;
	if (player.body.touching.up && box.frame != 5) {
		jumpFix = false;

		//Mushroom spawn sound playback
		mushroomSound.play();

		//Creating single mushroom
		mushroom = game.make.sprite(box.x , box.y - 16, 'mushroom');
		mushrooms.addChild(mushroom);
		mushroom.animations.add('spawn', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 32 ,false);
		mushroom.animations.play('spawn');
		game.physics.arcade.enable(mushroom);
			
		box.animations.stop();
		box.frame = 5;
	}else if (player.body.touching.up){
		jumpFix = false;
	}else if (player.body.touching.right){
		jumpFix = false;
	}else if (player.body.touching.left){
		jumpFix = false;
	}
}

function mushColide(player, mushroom) {
	//Mushroom kill sound playback
	mushroomKillSound.play();

	score_count += 1000;
	mushroom.kill();
}

function tpCollide(player, teleport) {
	jumpFix = true;
	if (cursors.left.isDown && player.y > 144){
			
		//Teleport sound playback
		tpSound.play();

		jumpFix = false;
		player.body.enable = false;
		player.animations.play('TPLeft');
			
		game.time.events.add(Phaser.Timer.SECOND * 1.05 , function() {
			player.body.enable = true;
			player.x = 3749;
			player.y = 144;
		});
	}else if (player.body.touching.up){
		jumpFix = false;
	}else if (player.body.touching.right){
		jumpFix = false;
	}else if (player.body.touching.left){
		jumpFix = false;
	}
}

function tpBackCollide(player, teleport) {
	jumpFix = true;
	if (cursors.down.isDown && player.body.touching.down && player.x > 4560 ){

		//Teleport sound playback
		tpSound.play();

		jumpFix = false;
		player.body.enable = false;

		if(player.goesRight)
			player.animations.play('TPDownRight');
		else
			player.animations.play('TPDownLeft');
		game.time.events.add(Phaser.Timer.SECOND * 1.05 , function() {
			player.body.enable = true;
			player.x = 600;
			player.y = 128;
		});
	}else if (player.body.touching.up){
		jumpFix = false;
	}else if (player.body.touching.right){
		jumpFix = false;
	}else if (player.body.touching.left){
		jumpFix = false;
	}
}

function turtleAnim(turtle, layer){
	//Updating turtle's animation
	if(turtle.frame != 4){
		if(turtle.body.velocity.x > 0)
			turtle.animations.play('moveRight');
		else
			turtle.animations.play('moveLeft');
	}else
	turtle.frame = 4;
}

function turtleSpeed(turtle) {
	//Giving every turtle random speed
	turtle.body.velocity.x = game.rnd.integerInRange(-25, -15);
}

function turtleOverlap(player, turtle){
	if(player.body.touching.down && (turtle.frame != 4)) {

		//Turtle score add
		score_count += 30;

		//kill sound playback
		killSound.play();

		//Creating turtles behavior
		turtle.body.velocity.x = 0;
		turtle.animations.stop();
		turtle.frame = 4;
		turtle.body.setSize(16, 16, 0, 8);
		if (cursors.up.isDown){
			player.body.velocity.y = -200;

			//Jump sound playback
			jumpsound = game.add.audio('hop');
			jumpsound.play( '', 0, 1);
		}else
			player.body.velocity.y = -80;
	}else if(player.body.touching.down && (turtle.frame == 4)){
		turtle.body.velocity.x = 0;
		if (cursors.up.isDown){
			player.body.velocity.y = -220;
			jumpsound = game.add.audio('hop');
			jumpsound.play( '', 0, 1);
		}else
			player.body.velocity.y = -80;
	}else if(player.body.touching.left && (turtle.frame == 4)){
		if (turtle.body.velocity.x == 0){

			//Kick sound playback
			kickSound.play();

			turtle.body.velocity.x = -1000000000;
			turtle.body.velocity.x = -170;
			player.body.velocity.x = 1000000000;
		}
		else
			DeathOccurs();
	}else if(player.body.touching.right && (turtle.frame == 4)){
		if (turtle.body.velocity.x == 0){

			//Kick sound playback
			kickSound.play();

			turtle.body.velocity.x = 1000000000;
			turtle.body.velocity.x = 170;
			player.body.velocity.x = -1000000000;
		}
		else
			DeathOccurs();
	}else if((player.body.touching.right || player.body.touching.left) && (turtle.frame != 4))
		DeathOccurs();
}

			
function turtleVgoomba(turtle, goomba) {
	if(turtle.frame == 4 && turtle.body.velocity.x != 0){
		//Goomba score add
		score_count +=25;
		//kill sound playback
		killSound.play();

		//Killing goombas on turtle overlap
		goomba.animations.stop();
		goomba.frame = 2;
		goomba.body.enable = false;
		game.time.events.add(Phaser.Timer.SECOND, function() {
			goomba.kill();
		});
	}
}

function goombaSpeed(goomba) {
	//Giving every goomba random speed
	goomba.body.velocity.x = game.rnd.integerInRange(-25, -15);
}

function goombaOverlap(player, goomba) {
	if (player.body.touching.down) {
			
		//kill sound playback
		killSound.play();

		//Goomba score add
		score_count += 25;
			
		goomba.animations.stop();
		goomba.frame = 2;
		goomba.body.enable = false;
		if (cursors.up.isDown){
			player.body.velocity.y = -200;
			jumpsound = game.add.audio('hop');
			jumpsound.play( '', 0, 1);
		}else{
			player.body.velocity.y = -80;
		}
		game.time.events.add(Phaser.Timer.SECOND, function() {
			goomba.kill();
		});
	} else {
		goomba.body.enable = false;
		//Calling death function
		DeathOccurs();	
	}
}

function nextLevel(){
	if(currentMap == 1){
		player.body.enable = false;

		//End level tp animation
		if(player.goesRight)
			player.animations.play('TPRight');
		else
			player.animations.play('TPLeft');
			
		map = game.add.tilemap("level2");
		music.stop();

		//Keeping score for the next level
		localStorage.setItem("totalScore", score_count);

		//Updating current map
		localStorage.setItem("currentLevel", 2);
		currentMap = parseInt(localStorage.getItem("currentLevel"));
			
		game.time.events.add(Phaser.Timer.SECOND, function() {
			player.body.enable = true;
			game.state.restart();
		});
	}else if(currentMap == 2){
		player.body.enable = false;

		//End level tp animation
		if(player.goesRight)
			player.animations.play('TPRight');
		else
			player.animations.play('TPLeft');
			
		map = game.add.tilemap("level3");
		music.stop();

		//Keeping score for the next level
		localStorage.setItem("totalScore", score_count);

		//Updating current map
		localStorage.setItem("currentLevel", 3);
		currentMap = parseInt(localStorage.getItem("currentLevel"));
			
		game.time.events.add(Phaser.Timer.SECOND, function() {
			player.body.enable = true;
			this.game.state.restart();
		});
	}else if(currentMap == 3){
		player.body.enable = false;

		//End level tp animation
		if(player.goesRight)
			player.animations.play('TPRight');
		else
			player.animations.play('TPLeft');
			
		map = game.add.tilemap("level3");
		music.stop();

		//Keeping score
		localStorage.setItem("totalScore", score_count);

		localStorage.setItem("lives", 3);

		game.time.events.add(Phaser.Timer.SECOND, function() {
			player.body.enable = true;
			game.state.start('VictoryState');
		});
	}
}

function DeathOccurs() {
		
	//Death sound playback
	deathSound.play();
	music.stop();
		
	//Lives update
	lives_count -= 1;
	localStorage.setItem("lives", lives_count);
		
	player.frame = 6;
	player.body.enable = false;
	player.animations.stop();
		
	game.time.events.add(Phaser.Timer.SECOND * 3, function() {
		if(lives_count > 0){
			this.game.state.restart();
		}else if(lives_count == 0){
			GameOver.text = "Game Over!";
			game.world.bringToTop(GameOver);
			//Back to Main Menu
			game.time.events.add(Phaser.Timer.SECOND, function() {

				//Calling main menu state, reseting lives and score
				game.state.start("MainMenu");
				localStorage.setItem("lives", 3);
				localStorage.setItem("totalScore", 0);
			});
		}
	});
}
