Crafty.c("BonusMushroom", {
    init : function() {
        this._direction = 'r';
        this.requires("Automove")
        this.requires("iBonusMushroom")
        .addComponent('Gravity')
        .gravity("Solid")
        .addComponent('Collision')
        .bind("EnterFrame", function() {
            this.move();
            var collision = this.hit("Mario");
            if(collision) {     
                var mario = collision[0].obj;
                mario.grow();
                this.destroy();
            }
        }).onHit("Solid", function() {
            this.turn();
        });
    },
    position : function (x, y) {
        this.attr({
            x : x,
            y : y
        });
    }
});

function generateBonusMushroom(x, y) {
    var BonusMushroom = Crafty.e("2D, Canvas, BonusMushroom");
    BonusMushroom.position(x, y);
}