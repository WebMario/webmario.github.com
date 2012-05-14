Crafty.c("Mario", {
    // Component Vars
    camera : null,
    points : 0,
    lives : 3,
    immortalSeconds : null,
    isImmortal : false,
    grown : false,
    init : function() {
        // Benötigte Componenten
        this.requires("Action, SpriteAnimation, Gravity, mario_small")
        .gravity("Solid")
        // Keyboard belegung
        .addComponent('Twoway').twoway(2.7)
        .bind('KeyDown', function() {
            if(this.isDown('DOWN_ARROW'))
                if(this.grown == true) {
                    this.toggleComponent("mario_big", "mario_down");
                    this._y = this._y + 8;
                } else {
                this.toggleComponent("mario_small", "mario_down");
            }
        });

        this.attr({
            x:200, 
            y:0
        });
        // Bei jedem Frame überprüfen
        this.always = function() {
            // Wenn Mario "runter" fällt, stirbt er!
            if(this._y > height) {
                this.die();
            }
            if(this.isImmortal) {
                var timeNow = new Date().getTime();

                if(this.immortalSeconds < timeNow) {

                    this.isImmortal = false;
                }
            }
        
            if(this.has('mario_down')) {
                if(!this.isDown('DOWN_ARROW')) {
                    if(this.grown) {
                        this._y = this._y - 8;
                        this.toggleComponent("mario_down", "mario_big");
                    } else {
                        this.toggleComponent("mario_down", "mario_small");
                    }
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
        this.grown = false;
        this._x = this.startX;
        this._y = this.startY;
        this.camera.refresh();        
        if(this.lives <= 0) {
            alert("Game Over!");
            startGame();
        }
},
grow : function() {
    if(!this.grown) {
        this.grown = true;
        this.toggleComponent("mario_small", "mario_big");
        this._w = 28;
        this._h = 28;
        this._y = this._y - 8;
        this.animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2)
    } else {
        lives++;
    }
},
immortal : function() {
    this.isImmortal = true;
    var d = new Date();
    this.immortalSeconds = d.getTime() + 10000;
}
});

function putMario() {
var mario = Crafty.e("Mario");
mario.position (200, 10);
};
