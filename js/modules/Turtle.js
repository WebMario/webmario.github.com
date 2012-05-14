Crafty.c("Turtle", {
	init : function() {
		this._direction = 'r';
		this.lifes = 2;
		this.requires("Automove")
		this.requires("turtle").addComponent('Gravity').gravity("Solid").addComponent('Collision').bind("EnterFrame", function() {
			this.move();
			var collision = this.hit("Mario");
			if(collision) {
				var mario = collision[0].obj;
				if(mario._y + (mario._h - this._h) < this._y) {
					mario._y-=5;
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
			}
		}).onHit("Solid", function() {
			this.turn();
		});
	},
	position : function(x, y) {
		this.attr({
			x : x,
			y : y
		});
	},
	transformTurtle : function() {
		this.toggleComponent("turtle", "turtle_down");
	}
});

function generateTurtle(x, y) {
	var enemy = Crafty.e("2D, Canvas, Turtle");
	enemy.position(x, y);
}