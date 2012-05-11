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

// Star
Crafty.c("Star", {
    init: function() {
        //alert("done");
        this.requires("ActionElement, iStar")
        .action = function(mario) {
            mario.immortal(10);
            this.destroy();
        };
    }
});