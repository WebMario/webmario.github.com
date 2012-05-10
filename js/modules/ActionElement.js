Crafty.c("ActionElement", {
    init: function() {
        this.requires("2D, Canvas, Collision, Action");
        this._direction = 'r';
        this.addComponent('Gravity')
        .gravity("Solid");
        this.always = function(mario) {
            if(this.isWalking) {
                this.doStep();
            }
         
        }
        this.onHitSolid = function(box) {
            this.turn();
        };
    },
    isWalking : false,
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
                x : this.x + 1,
                y : this.y
            });
        } else if(this._direction == 'l') {
            this.attr({
                x : this.x - 1,
                y : this.y
            });
        }
    },
    position : function (x, y) {
        this.attr({
            x : x,
            y : y
        });
    }
});
