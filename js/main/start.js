/*
 * Initialisiert das Spiel und ruft die wichtigsten Funktionen zur vorbereitung
 * des Spielbeginns auf
 */

window.onload = function () {
    // Initialisiere Crafty
    Crafty.init(width, //Breite des Spiels
        height// Höhe des Spiels
        );
    Crafty.background("url('images/bg.png')"); //Hintergrundbild laden

    Crafty.canvas.init(); // Generiere das Hauptcanvas, in welchem das Spiel abläuft 
    //Funktion zum laden der Sprites wird aufgerufen
    loadSprites(); 
    // Startet das eigentliche Spiel
    startGame();
    
}
