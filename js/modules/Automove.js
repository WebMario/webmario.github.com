Crafty.c("Automove", {
	 turn : function() {

        if(this._direction == 'r') {
            this._direction = 'l';
        //alert("touched l");
        } else {
            this._direction = 'r';
        //alert("touched r");
        }

    },
    move : function() {
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
    }
});
