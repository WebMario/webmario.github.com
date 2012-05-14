Crafty.c("Action", {
    startX : 0,
    startY : 0,
    init : function() {
        this.requires("2D, Canvas, Collision")
        .bind("EnterFrame", function() {
            var collision = this.hit("Mario");
            if(collision) { 
                var mario = collision[0].obj;
                this.action(mario);
                if(mario._y > this._y-bs) {
                    this.downAction(mario);
                    // Hoch stop
                    mario._up = false;
                    // Runter start
                    mario._falling = true;
                }
            }
            
            var solidCollision = this.hit("Solid");
            if(solidCollision) {
                var box = solidCollision[0].obj;
                this.onHitSolid(box);
            }
            
            this.always();
        });
        

    },
    onHitSolid : function(box) {},
    action: function(mario) {
    },
    downAction : function(mario) {
        
    },
    always: function() {},
    position : function (x, y) {
        this.attr({
            x : x,
            y : y
        });
        this.startX = x;
        this.startY = y;
    }
});