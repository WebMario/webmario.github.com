/*
 * Dient zur Steuerung der Kamera an Mario und für die Infotexte.
 */
Crafty.c("Camera",{
    //Infotext wird initialisiert
    infoText : null,
    //Mario wird initalisiert
    mario : null,
    init : function() {
        //Eine Textbox wird erstellt
        this.infoText = Crafty.e("2D, DOM, Text").attr({
            w:200
        });
        return this;
    },
    //Die Kamera wird an die Movefunktion von Mario gebunden
    camera: function(mario) {
        this.mario = mario;
        this.refresh();
        this.mario.bind("Moved",function() {
            this.refresh();
        });
        return this;
    },
    //Immer wenn Mario sich bewegt, wird das sichtfeld verschoben
    //Mario und der Text bleiben dabei stets am selben Ort.
    refresh: function() {
        Crafty.viewport.x = - this.mario.x+Crafty.viewport.width /2;
        this.infoText.attr({
            x: 20-Crafty.viewport.x,
            y:10
        });
        this.infoText.text("Score: "+this.mario.points+"<br />Lives: "+this.mario.lives+"<br />Immortal: "+this.mario.isImmortal);
    }
}); 