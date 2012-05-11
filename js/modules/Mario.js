Crafty.c("Mario", {
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
        if(!immortal) {
            this.lives--;
            this.camera.refresh();
            this._x = this.startX;
            this._y = this.startY;
            //this.destroy();
            if(this.lives <= 0) {
                alert("Game Over!");
                startGame();
            }
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
    
    immortal: false    
});

function putMario() {
    var mario = Crafty.e("Mario");
    mario.position(300, 10);
};
