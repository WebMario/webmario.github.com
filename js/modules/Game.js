/*
 * Das Spiel wird gestartet
 */

function startGame() {
    Crafty.scene("main", function() {
        //Die Map wird erstellt
        generateMap();

    });
    // Die Startszene wird geladen, Das Spiel beginnt!
    Crafty.scene("main");

}