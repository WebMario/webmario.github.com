Crafty.c("Mario", {
	init : function() {
		// Benötigt für Comp
		this.requires("2D, Canvas, SpriteAnimation, mario_small")
		// Position
		.attr({
			x : 200,
			y : 10
		})
		// Gravitaion (Solid) für normales Springen
		.addComponent('Gravity').gravity("Solid")
		// Keyboard belegung
		.addComponent('Twoway')
		// Gravitations "Kraft""
		.twoway(2.7)
		// Bei jedem Frame
		.bind("EnterFrame", function() {
			// Kollision mit einem "Solid"-Element
			var collision = this.hit("Solid");
			if(collision) {
				var box = collision[0].obj;
				// Ist das Solid Element "oberhalb" von Mario, damit er nicht durch die Box springen kann
				if(this._y > box._y) {
					// Hoch stop
					this._up = false;
					// Runter start
					this._falling = true;
				}
			}
		})
		// Kollisionscomp.
		.addComponent('Collision')
		// Beim Bewegen
		.bind('Moved', function(from) {
			// Kollidiert mit einem Solid, stehenbleiben
			if(this.hit('Solid')) {
				this.attr({
					x : from.x,
					y : from.y
				});
			}
			//            if(this.hit('Enemy')) {
			//                Crafty.stop();
			//                startGame();
			//            }

			//Binding keyboard input to animations
		}).bind("NewDirection", function(direction) {
			if(direction.x < 0) {
				if(!this.isPlaying("walk_left")) {
					this.stop().animate("walk_left", 10, -1);
				}
			}
			if(direction.x > 0) {
				if(!this.isPlaying("walk_right")) {
					this.stop().animate("walk_right", 10, -1);
				}
			}
			if(!direction.x) {
				this.stop();
			}
		})
		// Camera
		this.camera = this.addComponent("Camera").camera(this);
	},
	//Provides the animations
	Move : function() {
		this.requires("SpriteAnimation, Collision, Grid").animate("walk_left", 0, 0, 2).animate("walk_right", 0, 0, 2)
	},
	camera : null,
	points : 0,
	lives : 3,
	score : function(how_many) {
		this.points += how_many;
		this.camera.refresh();
	},
	lost : function() {
		this.lives--;
		this.camera.refresh();
		this._y = 10;
		//this.destroy();
		if(this.lives <= 0) {
			alert("Game Over!");
			startGame();
		}
	}
});

function putMario() {
	var mario = Crafty.e("2D, Canvas, Mario").Move();
};