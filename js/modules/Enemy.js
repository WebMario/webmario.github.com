Crafty.c("Enemy", {
    init : function() {
        this._direction = 'r';
        
        this.requires("enemy")
        .addComponent('Gravity')
        .gravity("Solid")
        .addComponent('Collision')
        .bind("EnterFrame", function() {
            this.move();
            var collision = this.hit("Mario");
            if(collision) {
                
                var mario = collision[0].obj;
                if(mario._y+(mario._h - this._h) < this._y) {
                    mario.score(10);
                    mario._up = true;
                    this.destroy();   
                } else {
                    mario.lost();
                }
            }
        }).onHit("Solid", function() {
            this.turn();
        });
    //        .onHit("Mario", function(mario) {
    //            if(mario._y > this._y) {
    //                this.die();
    //            }
    //        });
        
    //        .onHit("2D", function() {
    //            if(this.hit('Mario')) {
    //                //Keine fucking Funktion!
    //                //alert("Game Over");
    //                Crafty.stop();
    //                startGame();
    //            } else {
    //                this.turn();
    //            }
    //        });
    //        // Gravitation
    ////        this.
    //        .addComponent("Collision").
    //            bind('EnterFrame', function() {        
    //            enemy.move();
    //        });
    //        this.addComponent('Collision')
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
    }, 
    position : function (x, y) {
        this.attr({
            x : x,
            y : y
        });
    }
});

function generateEnemy(x, y) {
    var enemy = Crafty.e("2D, Canvas, Enemy");
    enemy.position(x, y);
}