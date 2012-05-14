Crafty.c("Mario", {
<<<<<<< HEAD
	init : function() {
		// Benötigt für Comp
		this.requires("2D, Canvas, SpriteAnimation, mario_small")
		this.requires('KeyBoard')
		//Wenn down Key gedrückt wird
		.bind('KeyDown', function() {
			if(this.isDown('DOWN_ARROW'))
				if(this.grown == true) {
					this.toggleComponent("mario_big", "mario_down");
				} else {
					this.toggleComponent("mario_small", "mario_down");
				}
		})
		// Position
		.attr({
			x : 200/*15*/,
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
			if(this.has('mario_down')) {
				if(!this.isDown('DOWN_ARROW')) {
					if(this.grown == true) {
						this.toggleComponent("mario_down", "mario_big");
					} else {
						this.toggleComponent("mario_down", "mario_small");
					}
				}
			}
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

					// this.addComponent("mario_big");
					//   this._w = 28;
					// this._h = 28;
				}
			}
			if(this._y > height) {
				this._x -= 100;
				this.lost();
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
		this.requires("SpriteAnimation, Collision, Grid").animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2)
	},
	camera : null,
	points : 0,
	lives : 3,
	grown : false,
	down : false,
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
	},
	grow : function() {
		this.grown = true;
	}
});

function putMario() {
	var mario = Crafty.e("2D, Canvas, Mario").Move();
};
=======
    // Component Vars
    camera : null,
    points : 0,
    lives : 3,
    status : 1,
    init : function() {
        // Benötigte Componenten
        this.requires("ActionElement, SpriteAnimation, mario_small")
        // Keyboard belegung
        .addComponent('Twoway')
        .twoway(2.7);
        // Bei jedem Frame überprüfen
        this.always = function() {
            // Wenn Mario "runter" fällt, stirbt er!
            if(this._y > height){
                this.die();
            }
            if(this.isImmortal) {
                var timeNow = new Date().getTime();
                
              
                
                if(this.immortalSeconds < timeNow) {

                    this.isImmortal = false;
                }
            }			
        }
        // Beim Bewegen
        this.bind('Moved', function(from) {
            // Kollidiert mit einem Solid, stehenbleiben
            if(this.hit('Solid')) {
                
            this.attr({
                x : from.x,
                y : from.y
                });
            }
            // Beim einschlagen einer neuen Richtung (Links oder Rechts)
            }).bind("NewDirection", function(direction) {
            // Nach Links 
            if(direction.x < 0) {
                if(!this.isPlaying("walk_left")) {
                    this.stop().animate("walk_left", 10, -1);
                }
            }
            // Nach Rechts
            if(direction.x > 0) {
                if(!this.isPlaying("walk_right")) {
                    this.stop().animate("walk_right", 10, -1);
                }
            }
            // Keine Ausrichtung
            if(!direction.x) {
                this.stop();
            }
        })
        // Camera
        .camera = this.addComponent("Camera").camera(this)
        
        // Animation
        .animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2);

    },
    score : function(how_many) {
        this.points += how_many;
        this.camera.refresh();
    },
    die : function() {
        this.lives--;
        this.camera.refresh();
        this._x = this.startX;
        this._y = this.startY;
        //this.destroy();
        if(this.lives <= 0) {
            alert("Game Over!");
            startGame();
        }
    },
    grow : function() {
        if(this.status < 2) {
            status++;
            
            this.toggleComponent("mario_small", "mario_big");
            this._w = 28;
            this._h = 28;
            this._y = this._y -15;
            this.animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2)
            
        } else {
            lives++;
        }
    },
    immortalSeconds: null,
    isImmortal: false,
    immortal : function () {
        this.isImmortal = true;
        var d = new Date();
        // 20000 = Solange ist er unsterblich
        this.immortalSeconds = d.getTime()+5000; 
    }
});

function putMario() {
    var mario = Crafty.e("Mario");
    mario.position(300, 10);
};
>>>>>>> 1230f30a575adf31bc6ad5ebbfdf96816ba3ee49
