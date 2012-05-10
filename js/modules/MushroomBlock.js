// Mushroom Block
Crafty.c("MushroomBlock", {
    init : function() {
        this.requires("ActionBlock");
        this.downAction = function() {
            if(!this.changed) {
                var BonusMushroom = Crafty.e("Mushroom");
                BonusMushroom.position(this._x, this._y -bs);
                this.change();
            }
        }
    }
});
function generateMushroomBlock(x, y) {
    Crafty.e("MushroomBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}