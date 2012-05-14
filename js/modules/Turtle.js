Crafty.c("Turtle", {
	init : function() {
		this._direction = 'r';
		this.lifes = 2;
		this.requires("ActionElement");
		this.isWalking = true;
		this.requires("turtle").addComponent('Gravity').gravity("Solid").addComponent('Collision').action = function(mario) {
			if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
				mario._y -= 5;
				mario._gy = 1;
				mario.score(10);
				this.lifes--;
				if(this.lifes >= 1) {
					this.transformTurtle();
					this._direction = 'r';
					this._gx = 50;
				} else {
					this.destroy();
				}
			} else {
				mario.lost();
			}
		};

	},
	transformTurtle : function() {
		this.toggleComponent("turtle", "turtle_down");
		this.speed = 3;
	},
});

function generateTurtle(x, y) {
	var enemy = Crafty.e("2D, Canvas, Turtle");
	enemy.position(x, y);
}