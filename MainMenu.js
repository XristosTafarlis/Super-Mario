var MainMenu = {
	create: function(){
		this.stage.backgroundColor = '#000020';

		//Creating Super Mario
		var superMario = game.add.image(256, 40, 'Title');
		superMario.anchor.set(0.5, 0.5);
		
		//Creating level 1 button
		var buttonLVL1 = game.add.button(256 , 104, "lvl1", function(){

			//Updating current map
			localStorage.setItem("currentLevel", 1);
			currentMap = parseInt(localStorage.getItem("currentLevel"));

			map = game.add.tilemap('level1');
			game.state.start('GamePlay');
		});
		buttonLVL1.anchor.set(0.5, 0.5);

		//Creating level 2 button
		var buttonLVL2 = game.add.button(256 , 152, "lvl2", function(){

			//Updating current map
			localStorage.setItem("currentLevel", 2);
			currentMap = parseInt(localStorage.getItem("currentLevel"));

			map = game.add.tilemap('level2');
			game.state.start('GamePlay');
		});
		buttonLVL2.anchor.set(0.5, 0.5);

		//Creating level 3 button
		var buttonLVL3 = game.add.button(256 , 200, "lvl3", function(){

			//Updating current map
			localStorage.setItem("currentLevel", 3);
			currentMap = parseInt(localStorage.getItem("currentLevel"));

			map = game.add.tilemap('level3');
			game.state.start('GamePlay');
		});
		buttonLVL3.anchor.set(0.5, 0.5);
	}
}