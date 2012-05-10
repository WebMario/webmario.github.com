// Coin
Crafty.c("Coin", {
    init: function() {
        this.requires("ActionElement, iCoin");
        this.action = function(mario) {
            mario.score(1);
            this.destroy();
        }; 
        this.attr({
            h:bs, 
            w:bs
        });
    }
});

function generateCoin(x, y) {
    Crafty.e("Coin").position(x*bs,height-bs*y);
}
