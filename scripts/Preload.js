var PreloadState = {
	preload: function(){
		this.load.baseURL = 'https://XristosTafarlis.github.io/Super-Mario/';
		this.load.crossOrigin = 'anonymous';
		
		//ionio logo
		var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 32, 'ionio_logo');
		logo.anchor.set(0.5, 0.5);
		logo.scale.set(0.75);

		//loading bar
		var loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 64, 'loadingBar');
		loadingBar.anchor.set(0.5, 0.5);
		this.load.setPreloadSprite(loadingBar);

		//Main menu images
		this.load.image('Title', 'assets/Title.png');
		this.load.image('lvl1', 'assets/Level1.png');
		this.load.image('lvl2', 'assets/Level2.png');
		this.load.image('lvl3', 'assets/Level3.png');

		//Maps
		this.load.tilemap('level1', 'maps/map1.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level2', 'maps/map2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.tilemap('level3', 'maps/map3.json', null, Phaser.Tilemap.TILED_JSON);
		
		//Sound preloads
		this.load.audio('mushroomSpawn', ['audio/mushroomSpawn.mp3', 'audio/mushroomSpawn.ogg']);
		this.load.audio('mushroomKill', ['audio/mushroomKill.mp3', 'audio/mushroomKill.ogg']);
		this.load.audio('death', ['audio/RIP.mp3', 'audio/RIP.ogg']);
		this.load.audio('Qmark', ['audio/bonus.mp3', 'audio/bonus.ogg']);
		this.load.audio('pipe', ['audio/pipe.mp3', 'audio/pipe.ogg']);
		this.load.audio('peru', ['audio/suita.mp3', 'audio/suita.ogg']);
		this.load.audio('click', ['audio/coin.wav']);
		this.load.audio('rip', ['audio/stomp.wav']);
		this.load.audio('sout', ['audio/kick.wav']);
		this.load.audio('hop', ['audio/jump.wav']);
		
		//Image preloads
		this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16, 16);
		this.load.spritesheet('mushroom', 'assets/mushroom.png', 16, 16);
		this.load.spritesheet('coinspin', 'assets/coinspin.png', 16, 80);
		this.load.spritesheet('endlvl', 'assets/endLevel.png', 16, 16);
		this.load.spritesheet('barrier', 'assets/barrier.png', 16, 16);
		this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
		this.load.spritesheet('turtle', 'assets/turtle.png', 16, 24);
		this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
		this.load.spritesheet('bonus', 'assets/bonus.png', 16, 16);
		this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
		this.load.spritesheet('fall', 'assets/fall.png', 16, 16);
		this.load.spritesheet('tp2', 'assets/tp2.png', 32, 16);
		this.load.spritesheet('tp', 'assets/tp.png', 16, 32);
	},
	create: function(){
		game.state.start('MainMenu');
	}
}
