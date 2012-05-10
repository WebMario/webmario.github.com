Crafty.c("Mushroom", {
    init : function() {
        this.requires("ActionElement, iMushroom")
        .action = function(mario) {
            mario.grow();
            this.destroy();
        };    
        this.isWalking = true;
    
    }
});