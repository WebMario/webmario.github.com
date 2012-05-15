/*
 * Die Klasse Turtle stellt den Gegner "Schildkröte" dar. Sie erbt von der Klasse ActionElement.
 */

Crafty.c("Turtle", {
	//Boolean für die Transformation in den Panzer
	transformed : false,
	init : function() {
		//Erbt von ActionElemnt und hat das sprite prüft
		this.requires("ActionElement, iTurtle");
		//Action wird von der Superklasse ActionElement aufgerufen wenn es eine Kollision mit Mario gibt
		this.action = function(mario) {
			//Wenn Mario draufspring transformiert sich die Schildkröte oder Stirbt sonst stirbt Mario
			if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
				mario.score(10);
				if(!this.transformed) {
					this.transformTurtle(mario);
				} else {
					mario._y -= 10;
					mario._gy = 2;
					this.destroy();
				}
			} else {
				mario.die();
			}
		};

	},
	//Verwandelt die Schildkröte in den Panzer
	transformTurtle : function(mario) {
		mario._y -= 5;
		mario._gy = 1;
		this.toggleComponent("iTurtle", "iTurtleDown");
		this.speed = 3;
		this._gx = 30;
		this.transformed = true;
	}
});
//Funktion, die die Schildkröte generiert
function generateTurtle(x, y) {
	var enemy = Crafty.e("Turtle");
	enemy.position(x * bs, height - y * bs);
}