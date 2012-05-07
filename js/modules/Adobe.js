
Crafty.c("Adobe", {
    init:function() {
    }
});
    
function generateAdobe(x, y) {
    Crafty.e("2D, Canvas, Color, Collision, Solid, Adobe, iAdobe").attr({
        h:bs, 
        w:bs, 
        x:x*(bs), 
        y:height-(bs*y)
    });
}
    