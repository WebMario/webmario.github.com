/*
 * Modul, welches den Block generiert aus dem der Stern entspringt.
 */
Crafty.c("StarBlock", {
    init : function() {
        this.requires("ActionBlock");
        this.downAction = function() {
            if(!this.changed) {
                // Ein Stern wird oberhalb des Blocks erzeugt.
                var Star = Crafty.e("Star");
                Star.position(this._x, this._y -bs);
                // Der StarBlock wird zum normalen Block
                this.change();
            }
        }
    }
});

// Funktion zum Generieren eines StarBlocks auf dem Spielfeld
function generateStarBlock(x, y) {
    Crafty.e("StarBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}