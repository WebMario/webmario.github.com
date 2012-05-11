Crafty.c("Adobe", {
    init: function() {
        this.requires("Action, Solid, iAdobe");
    }
})

function generateAdobe(x, y) {
    Crafty.e("Adobe").attr({
        h:bs, 
        w:bs, 
        x:x*(bs), 
        y:height-(bs*y)
    });
}
    