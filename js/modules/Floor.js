Crafty.c("Floor", {
    init:function() {
    }
});

function generateFloor(x, w) {
    for(var xa = x; xa < w; xa++) {
        for(var ya = 1; ya <= 2; ya++) {
            Crafty.e("2D, Canvas, Color, Collision, Solid, Floor, iFloor").attr({
                h:bs, 
                w:bs, 
                x:xa*(bs), 
                y:height-(bs*ya)
            });
        }
    }

}
