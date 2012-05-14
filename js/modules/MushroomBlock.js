/*
 * Modul, welches den Block generiert aus dem der Bonuspilz entspringt.
 */
Crafty.c("MushroomBlock", {
    init : function() {
        //Basiert auf einen normalen Actionblock
        this.requires("ActionBlock");
        this.downAction = function() {
            if(!this.changed) {
                // Ein Bonuspilz wird oberhalb des Blocks erzeugt.
                var BonusMushroom = Crafty.e("Mushroom");
                BonusMushroom.position(this._x, this._y -bs);
                // Der MushroomBlock wird zum normalen Block
                this.change();
            }
        }
    }
});

// Funktion zum Generieren eines Mushroomblocks auf dem Spielfeld
function generateMushroomBlock(x, y) {
    Crafty.e("MushroomBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}