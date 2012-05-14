// Erstelle Mario Instanz
var mario = Crafty.e("2D, Canvas, Mario");
// Test - Mario verliert leben.
var lebenAktuell = mario.lives;
mario.die();
if(lebenAktuell == mario.lives) {
    alert('Mario stirbt nicht!');
}

// Test Mario bekommt Pilz
mario.grow();
if(mario.status != 2) {
    alert("Mario wächst nicht");
}
mario.grow();
if(mario.lives != 3) {
    alert("Mario bekommt kein neues Leben nach Pilzkonsum");
}

//Test Mario punktet
var punkteAktuell = mario.score;
mario.score(10);
if(mario.score <= punkteAktuell) {
    alert("Mario hat nicht gepunktet!");
}

// Test Mario wird unsterblich
mario.immortal(10);
if(mario.isImmortal != true) {
    alert("Mario ist nicht unsterblich");
}
