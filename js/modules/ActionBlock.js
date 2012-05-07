// Action Block
Crafty.c("ActionBlock", {
	init : function() {
		this.requires("2D, Canvas, Collision");
		this.bind("EnterFrame", function() {
			var collision = this.hit("Mario");
			if(collision) {
				var mario = collision[0].obj;
				if(mario._y > this._y && !this.changed) {
					mario.score(1);
					this.change();
					this.changed = true;
				}
			}
		});
	},
	changed : false,
	change : function() {
		this.toggleComponent("ActionBlock", "Adobe");
		this.toggleComponent("iActionBlock", "iFir");
	},
	action : function() {
		alert("ActionB");
	}
});

// Mushroom Block
Crafty.c("MushroomBlock", {
	init : function() {
		this.requires("2D, Canvas, Collision");
		this.bind("EnterFrame", function() {
			var collision = this.hit("Mario");
			if(collision) {
				var mario = collision[0].obj;
				if(mario._y > this._y && !this.changed) {
					var BonusMushroom = Crafty.e("2D, Canvas, BonusMushroom");
					BonusMushroom.position(this._x, this._y -bs);
					this.change();
					this.changed = true;
				}
			}
		});
	},
	changed : false,
	change : function() {
		this.toggleComponent("MushroomBlock", "Adobe");
		this.toggleComponent("iActionBlock", "iFir");
	},
	action : function() {
		alert("ActionB");
	}
});

// Function to generate a new Action Block (TODO: Actions ;))
function generateActionBlock(x, y) {
	Crafty.e("2D, Canvas, Color, Collision, Solid, ActionBlock, iActionBlock").attr({
		h : bs,
		w : bs,
		x : x * bs,
		y : height - bs * y
	});
}

function generateMushroomBlock(x, y) {
	Crafty.e("2D, Canvas, Color, Collision, Solid, iActionBlock, MushroomBlock").attr({
		h : bs,
		w : bs,
		x : x * bs,
		y : height - bs * y
	});
}