Crafty.c("Target", 
    {
        finished: false,
        init: function() {
            this.addComponent('Collision')
            .bind("EnterFrame", function() {
                var collision = this.hit("Mario");
                if(collision) {             
                    
                    if(!this.finished) {
                        var mario = collision[0].obj;

                        alert("Geschafft! Du hast "+mario.points+" Punkte");
                        this.finished = true;    
                Crafty.stop();    
                }
                }
            });
        }
    });
function getCastle(xa) {
    var hi = bs *5;
    var wi = bs * 5;
    Crafty.e("2D, Canvas    , castle").attr({
        h:hi, 
        w:wi, 
        x:xa*(bs), 
        y:height-hi-(2*bs)
    });
    Crafty.e("2D, Canvas, Color, Collision, Target").attr({
        h:2*bs, 
        w:bs, 
        x:2*bs+xa*(bs), 
        y:height-(4*bs)
    });
}

function setFlag(xa) {
    generateBSFirTree(xa, 1);
    Crafty.e("2D, Canvas, flag").attr({
        h:bs, 
        w:bs, 
        x:xa*(bs), 
        y:height-(11*bs)
    });
    Crafty.e("2D, Canvas, bar").attr({
        h:bs*7, 
        w:bs, 
        x:xa*(bs), 
        y:height-(10*bs)
    });
}