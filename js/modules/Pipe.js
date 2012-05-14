/*
 * Modul für die Röhren Links und Recht je oben und Unten.
 */

function generatePipe(x, h) {
    var currentHight = 1;
    for(; currentHight < h; currentHight++) {
        Crafty.e("2D, Canvas, Color, Collision, Solid, iPipeLeft").attr({
            h:bs, 
            w:bs, 
            x:x*bs, 
            y:height-(bs*(2+currentHight)) 
        });
        Crafty.e("2D, Canvas, Color, Collision, Solid, iPipeRight").attr({
            h:bs, 
            w:bs, 
            x:x*bs+bs, 
            y:height-(bs*(2+currentHight)) 
        });
    }
    
    Crafty.e("2D, Canvas, Color, Collision, Solid, iPipeLeftTop").attr({
        h:bs, 
        w:bs, 
        x:x*bs, 
        y:height-(bs*(2+currentHight)) 
    });
    Crafty.e("2D, Canvas, Color, Collision, Solid, iPipeRightTop").attr({
        h:bs, 
        w:bs, 
        x:x*bs+bs, 
        y:height-(bs*(2+currentHight)) 
    });
    
}