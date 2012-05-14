Crafty.c("ActionElement", {
    speed : 1,
    init: function() {
        this.requires("Action, Gravity");
        this._direction = 'r';
        this.gravity("Solid");
        this.always = function() {
                this.doStep();
        }
        this.onHitSolid = function(box) {
            this.turn();
        };
    },
    turn : function() {

        if(this._direction == 'r') {
            this._direction = 'l';
        //alert("touched l");
        } else {
            this._direction = 'r';
        //alert("touched r");
        }

    },
    doStep : function() {
        if(this._direction == 'r') {
            this.attr({
                x : this.x + this.speed,
                y : this.y
            });
        } else if(this._direction == 'l') {
            this.attr({
                x : this.x - this.speed,
                y : this.y
            });
        }
    }
});
