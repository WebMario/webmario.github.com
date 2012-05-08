// Coin
Crafty.c("Coin", {
    init: function() {
        this.requires("2D, Canvas, Collision");
        this.bind("EnterFrame", function() {
            var collision = this.hit("Mario");
            if(collision) {
                var mario = collision[0].obj;
                    mario.score(1);
                    this.destroy();             
            }
        });
    }
});


function generateCoin(x, y) {
    Crafty.e("2D, Canvas, Collision, Coin, iCoin").attr({
        h:bs, 
        w:bs, 
        x:x*bs, 
        y:height-bs*y
    });
}