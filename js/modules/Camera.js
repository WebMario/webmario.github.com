Crafty.c("Camera",{
    infoText : null,
    mario : null,
    init : function() {
        this.infoText = Crafty.e("2D, DOM, Text").attr({
            w:200
        });
        return this;
    },
    camera: function(mario) {
        this.mario = mario;
        this.refresh();
        this.mario.bind("Moved",function() {
            this.refresh();
        });
        return this;
    },
    refresh: function() {
        Crafty.viewport.x = - this.mario.x+Crafty.viewport.width /2;
        this.infoText.attr({
            x: 20-Crafty.viewport.x,
            y:10
        });
        this.infoText.text("Score: "+this.mario.points+"<br />Lives: "+this.mario.lives+"<br />Immortal: "+this.mario.isImmortal);
    }
}); 