/*
 * Modul, welches die Goldmünzen definiert, welche im Spiel gesammelt werden
 * können
 */
Crafty.c("Coin", {
    init: function() {
        this.requires("Action, iCoin");
        this.action = function(mario) {
            //Wenn Mario eine Münze sammelt, kriegt er 10 PUnkte
            mario.score(10)
            //Die Münze wird aus dem Speicher entfernt.
            this.destroy();
        }; 
        this.attr({
            //Die Höhe und Breite der Münze wird definiert (Blockgrösse).
            h:bs, 
            w:bs
        });
    }
});

//Funktion um eine Münze auf dem Spielfeld(Map) zu erzeugen.
function generateCoin(x, y) {
    Crafty.e("Coin").position(x*bs,height-bs*y);
}
