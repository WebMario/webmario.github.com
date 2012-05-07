Crafty.c("Enemy", {
    init : function() {
        this._direction = 'r';
        this.requires("Automove")
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