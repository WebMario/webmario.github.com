window.onload = function () {
    // Initialize Crafty
    Crafty.init(width, // 640 Pixels Wide
        height// 480 Pixels Tall
        );
    Crafty.background("url('images/bg.png')");

    Crafty.canvas.init(); // Create a Canvas Element 
    // Define Floor
    loadSprites(); 
        
    startGame();
    
}
