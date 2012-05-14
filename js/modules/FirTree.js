
Crafty.c("FirTree", {
    init:function() {
        this.requires("2D, Canvas, Solid, iFir")
    }
});

function generateSBFirTree(x, h) {
    for(var y = 0; y < h; y++) {
        for(var xa = x+y; xa < x+h; xa++) {
            Crafty.e("FirTree").attr({
                h:bs, 
                w:bs, 
                x:xa*(bs), 
                y:height-(bs*(y+3)) 
            });
        }
    }
}
function generateBSFirTree(x, h) {
    for(var y = h; y >= 0; y--) {
        for(var xa = x; xa < x+(h-y); xa++) {
            Crafty.e("FirTree").attr({
                h:bs,
                w:bs,
                x:xa*(bs),
                y:height-(bs*(y+3)) 
            });
        }
    }
}