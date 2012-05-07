Crafty.c("Castle", {
    init:function() {
    }
});

    
function getCastle(xa) {
    var hi = bs *5;
    var wi = bs * 5;
    Crafty.e("2D, Canvas, Color, Collision, Solid, ActionBlock").attr({
        h:hi, 
        w:wi, 
        x:xa*(bs), 
        y:height-hi-(2*bs)
    });
}

