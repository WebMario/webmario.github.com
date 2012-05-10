// Action Block
Crafty.c("ActionBlock", {
    init : function() {
        this.requires("2D, Canvas, Solid, Collision, Action, iActionBlock");
        this.downAction = function(mario) {
            if(!this.changed){
                mario.score(10);
                this.change();
            }
        }
    },
    changed : false,
    change : function() {
        this.toggleComponent("ActionBlock", "Adobe");
        this.toggleComponent("iActionBlock", "iFir");
        this.changed = true;
    }
});



// Function to generate a new Action Block (TODO: Actions ;))
function generateActionBlock(x, y) {
    Crafty.e("ActionBlock").attr({
        h : bs,
        w : bs,
        x : x * bs,
        y : height - bs * y
    });
}