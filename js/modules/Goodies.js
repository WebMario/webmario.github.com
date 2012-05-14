/*
 * Definiert die "Goodies" die Mario im Spiel sammlen kann.
 */

// Der Bonuspilz, der Mario wachsen lässt.
Crafty.c("Mushroom", {
	init : function() {
            // Die Action reagiert mit Mario.
		this.requires("ActionElement, iMushroom").action = function(mario) {
                    // Mario wächst.
			mario.grow();
                        // Der Bonuspilz wird aus dem Speicher entfernt
			this.destroy();
		};
	}
});

// Der Stern, der Mario unsterblich machen lässt.
Crafty.c("Star", {
	init : function() {
            // Die Action reaggiert auf Mario.
		this.requires("Action, iStar").action = function(mario) {
                    // Mario wird für 10 Sekunden unsterblich.
			mario.immortal(10);
                        // Der STern wird aus dem speicher entfernt.
			this.destroy();
		};
	}
}); 