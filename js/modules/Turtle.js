Crafty.c("Turtle", {
    transformed : false,
    init : function() {
        this.requires("ActionElement, iTurtle");
        this.action = function(mario) {
            if((mario._y + (mario._h - this._h) < this._y) || mario.isImmortal) {
                mario.score(10);
                
                if(!this.transformed) {
                    this.transformTurtle();
                } else {
                    this.destroy();
                }
                mario._up = true;
                
                mario._y -= 4*bs;
        } else {
                mario.die();
            }
        };

    },
    transformTurtle : function() {
        this.toggleComponent("iTurtle", "iTurtleDown");
        this.speed = 3;
        this.transformed = true;
    }
});
function generateTurtle(x, y) {
    var enemy = Crafty.e("Turtle");
    enemy.position(x*bs, height-y*bs);
}