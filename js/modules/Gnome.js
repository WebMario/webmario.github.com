/*
 * Der einfachste Gegner von Mario, ein Pilz der zweischen zwei Spielelementen
 * hin und her geht.
 */

Crafty.c("Gnome", {
    init : function() {
        this.requires("ActionElement, iEnemy")
        // Was passiert, wenn der Pilz von Mario von oben getroffen wird oder 
        // Mario unstesrblich ist.
        .action = function(mario) {
            if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
                // Mario kriegt 10 Punkte
                mario.score(10);
                // Mario bewegt sich ein stück nach Oben, nachdem er den Pilz 
                // zerstört.
                mario._up = true;
                // Der Pilz wird aus dem Speicher entfernt.
                this.destroy();
            } else {
                // Falls Mario den Pilz nicht von oben trifft und nicht unsterblich ist,
                // verliert Mario ein leben.
                mario.die();
            }
        };
        this.isWalking = true;
    }
});

//Funktion zum erstellen eines Pilzes auf dem Spielfeld.
function generateGnome(x, y) {
    var enemy = Crafty.e("Gnome");
    enemy.position(x, y);
}