Crafty.c("Mushroom", {
    init:  function() {
        this.requires("2D, Canvas, SpriteAnimation, mushroom")
        // Gravitaion (Solid) für normales Springen
        .addComponent('Gravity').gravity("Solid");
    }
});

function generateMushroom(x,y) {
    Crafty.e("2D, Canvas, Collision").attr({
        h:bs, 
        w:bs, 
        x:x*bs, 
        y:height-bs*y
    });
}