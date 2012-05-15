/*
 *  Die Ziegelstein Klasse wird für die Map verwendet und stellt den Boden dar.
 * 	Sie erbt von der Klasse solid und Action
 */

Crafty.c("Adobe", {
    init: function() {
        this.requires("Action, Solid, iAdobe").
        attr({
            h:bs, 
            w:bs
        }
        );
        
    }
})

function generateAdobe(x, y) {
    Crafty.e("Adobe").position(x*bs, height-(bs*y));
}
    