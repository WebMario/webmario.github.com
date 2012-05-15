Crafty.c("Turtle", {
	transormed : false,
	init : function() {
		this.requires("ActionElement, iTurtle");
		this.action = function(mario) {
			if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
				mario.score(10);

				if(!this.transformed) {
					this.transformTurtle(mario);
				} else {
					this.destroy();
				}
			} else {
				mario.die();
			}
		};

	},
	transformTurtle : function(mario) {
		mario._y -= 5;
		mario._gy = 1;
		this.toggleComponent("iTurtle", "iTurtleDown");
		this.speed = 3;
		this._gx = 50;
		this.transformed = true;
	}
});
function generateTurtle(x, y) {
	var enemy = Crafty.e("Turtle");
	enemy.position(x * bs, height - y * bs);
}