/*
 * Definiert einen Standard ActionBlock, welcher bei einer Kollision mit Marios Kopf zu einem normalen Block wird.
 */
Crafty.c("ActionBlock", {
    init : function() {
        this.requires("2D, Canvas, Solid, Collision, Action, iActionBlock");
        // Wenn Mario von unten kollidiert.
        this.downAction = function(mario) {
            if(!this.changed){
                mario.score(10);
                this.change();
            }
        }
    },
    // Bereits ein normaler Block=
    changed : false,
    // Wechsel zu einem normalen Block
    change : function() {
        this.toggleComponent("ActionBlock", "Adobe");
        this.toggleComponent("iActionBlock", "iFir");
        this.changed = true;
    }
});



// Funktion um eine Action Block auf dem Spielfeld zu erzeugen.
function generateActionBlock(x, y) {
    Crafty.e("ActionBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}