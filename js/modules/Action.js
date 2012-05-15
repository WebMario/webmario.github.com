/*
 *  Für diverse Arten von Events, welche von anderen Komponenten verwendet werden.
 */

Crafty.c("Action", {
    startX : 0,
    startY : 0,
    init : function() {
        this.requires("2D, Canvas, Collision")
        .bind("EnterFrame", function() {
            var collision = this.hit("Mario");
            if(collision) { 
                var mario = collision[0].obj;
                this.action(mario);
                if(mario._y > this._y-bs) {
                    this.downAction(mario);
                    // Hoch stop
                    mario._up = false;
                    // Runter start
                    mario._falling = true;
                }
            }
            
            var solidCollision = this.hit("Solid");
            if(solidCollision) {
                var box = solidCollision[0].obj;
                this.onHitSolid(box);
            }
            
            this.always();
        });
        

    },
    // Wird aufgerufen, wenn ein Element mit einem anderen Element vom Typ solid kolidiert.
    onHitSolid : function(box) {},
    // Wird aufgerufen, wenn mit Mario kollidiert wird
    action: function(mario) {
    },
    // Wird aufgerufen, wenn Mario unterhalb kollidiert.
    downAction : function(mario) {
        
    },
    // Wird bei jedem Frame aufgerufen
    always: function() {},
    // Lässt die Position eines Element genau angeben.
    position : function (x, y) {
        this.attr({
            x : x,
            y : y
        });
        this.startX = x;
        this.startY = y;
    }
});