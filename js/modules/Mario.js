Crafty.c("Mario", {
    // Kamera wird initalisiert
    camera : null,
    // Startpunktzahl von Mario
    points : 0,
    // Anzahl leben zu beginn
    lives : 3,
    // Anzahl Sekunden Unsterblichkeit initalisieren
    immortalSeconds : null,
    // Status Unsterblich Ja/Nein
    isImmortal : false,
    // Status Grösse Gross/klein
    grown : false,
    init : function() {
        // Benötigte Komponenten
        this.requires("Action, SpriteAnimation, Gravity, mario_small")
        // Gravitation auf alle festen Elemente
        .gravity("Solid")
        // Tastaturbelegung
        .addComponent('Twoway').twoway(2.7)
        // Wenn Taste down gedrückt, Mario bückt sich!
        .bind('KeyDown', function() {
            if(this.isDown('DOWN_ARROW'))
                if(this.grown == true) {
                    this.toggleComponent("mario_big", "mario_down");
                    this._y = this._y + 8;
                } else {
                    this.toggleComponent("mario_small", "mario_down");
                }
        });
        // Startposition von Mario setzen
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
            // Prüfen ob Mario noch unsterblich sein muss, falls nein sterblich machen und Bild ändern
            if(this.isImmortal) {
                var timeNow = new Date().getTime();

                if(this.immortalSeconds < timeNow) {

                    this.isImmortal = false;
                    if(this.grown == false) {
                        this.toggleComponent("mario_blink", "mario_small");
                    }
                    else {
                        this.toggleComponent("mario_big_blink", "mario_big");
                    }
                }
            }
            // Wenn Mari gebükct ist, grösse vermindern
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
    //Punkten funktion
    score : function(how_many) {
        this.points += how_many;
        this.camera.refresh();
    },
    // Mario stirbt und wird an Start zurückgesetzt!
    die : function() {
        if(this.grown) {
            this.diminish();
        } else {
            this.lives--;
            this._x = this.startX;
            this._y = this.startY;
        }
        this.camera.refresh();        
        if(this.lives <= 0) {
            alert("Game Over!");
            startGame();
        }
    },
    // Mario wächst.
    grow : function() {
        if(!this.grown) {
            this.grown = true;
            this.toggleComponent("mario_small", "mario_big");
            this._y = this._y - 8;
            this.animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2)
        } else {
            this.lives++;
        }
    },
    
    diminish : function() {
        this.grown = false;
        this.toggleComponent("mario_big", "mario_small");
        this.animate("walk_left", 0, 1, 2).animate("walk_right", 0, 0, 2);
        this._y = 0;

        
    },
    // Mario wird unsterblich
    immortal : function() {
        this.isImmortal = true;
        var d = new Date();
        this.immortalSeconds = d.getTime() + 10000;
        if(this.grown == false) {
            this.toggleComponent("mario_small", "mario_blink")
        }
        else {
            this.toggleComponent("mario_big", "mario_big_blink")
        }
    }
});
// Mario durch Funktion auf dem Spielfeld platzieren.
function putMario() {
    var mario = Crafty.e("Mario");
    mario.position (200, 10);
    mario.camera.refresh();
};
