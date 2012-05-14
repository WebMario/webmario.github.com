Crafty.c("Mushroom", {
	init : function() {
		this.requires("ActionElement, iMushroom").action = function(mario) {
			mario.grow();
			this.destroy();
		};
	}
});

// Star
Crafty.c("Star", {
	init : function() {
		this.requires("Action, iStar").action = function(mario) {
			mario.immortal(10);
			this.destroy();
		};
	}
}); 