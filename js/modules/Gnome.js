Crafty.c("Gnome", {
	init : function() {
		this.requires("ActionElement, iEnemy").action = function(mario) {
			if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
				mario.score(10);
				mario._up = true;
				this.destroy();
			} else {
				mario.die();
			}
		};
		this.isWalking = true;
	}
});

function generateGnome(x, y) {
	var enemy = Crafty.e("Gnome");
	enemy.position(x, y);
}