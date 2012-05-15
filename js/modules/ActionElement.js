/*
 * Behandelt ein automatisch bewegliches Element
 */

Crafty.c("ActionElement", {
    // Geschwindigikeit des Elements
    speed : 1,
    init: function() {
        // Gravitation und Action, erste Richtung wird angegeben.
        this.requires("Action, Gravity");
        this._direction = 'r';
        this.gravity("Solid");
        // Funktionen des ActionModuls werden überschrieben
        this.always = function() {
                this.doStep();
        }
        this.onHitSolid = function(box) {
            this.turn();
        };
    },
    // Wenn das Element mit einem anderen Element kollidiert, dreht es sich
    turn : function() {

        if(this._direction == 'r') {
            this._direction = 'l';
        //alert("touched l");
        } else {
            this._direction = 'r';
        //alert("touched r");
        }

    },
    // Führt einen Schritt aus.
    doStep : function() {
        if(this._direction == 'r') {
            this.attr({
                x : this.x + this.speed,
                y : this.y
            });
        } else if(this._direction == 'l') {
            this.attr({
                x : this.x - this.speed,
                y : this.y
            });
        }
    }
});
