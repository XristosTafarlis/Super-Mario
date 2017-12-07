var VictoryState = {
	create: function(){
		this.stage.backgroundColor = '#000040';
		var totalScorePrint = game.add.text(256, 120, "Total Score : " + parseInt(localStorage.getItem("totalScore")), {
			font: '50px arial',
			fill: '#ffffff',
			aligment: 'center',
			stroke: '#000000',
			strokeThickness : 2.5
		});
		totalScorePrint.anchor.set(0.5, 0.5);

		//Reseting score
		localStorage.setItem("totalScore", 0)

		game.time.events.add(Phaser.Timer.SECOND * 3, function() {
			game.state.start('MainMenu');
		});
	}
}
