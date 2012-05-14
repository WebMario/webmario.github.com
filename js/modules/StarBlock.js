// Mushroom Block
Crafty.c("StarBlock", {
    init : function() {
        this.requires("ActionBlock");
        this.downAction = function() {
            if(!this.changed) {
                var Star = Crafty.e("Star");
                Star.position(this._x, this._y -bs);
                this.change();
            }
        }
    }
});
function generateStarBlock(x, y) {
    Crafty.e("StarBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}