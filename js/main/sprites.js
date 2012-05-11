function loadSprites() {
    // Sprites laden

    // This will create entities called floor, wall1 and stairs
    Crafty.sprite(32, "images/dungeon.png", {
        floor : [0, 0],
        wall1 : [2, 1],
        stairs : [3, 1]
    });

    // This will create entities called hero1 and blob1
    Crafty.sprite(32, "images/characters.png", {
        hero1 : [5, 3],
        blob1 : [4, 7]
    });
    Crafty.sprite(16, "images/sprites.png", {
        iFloor : [0, 0],
        iActionBlock : [1, 0],
        iAdobe : [2,0],
        iFir : [3,0],
        iCoin : [4,0],
        iPipeLeft : [5,0],
        iPipeRight : [6,0],
        iPipeLeftTop : [7,0],
        iPipeRightTop : [8,0],
        iMushroom : [9, 0],
        iEnemy: [11,0],
        iStar: [12,0]
    });
    Crafty.sprite(20, "images/mario.png", {
        mario_small : [0,0],
        mario_leer : [1,0]
    });
    Crafty.sprite(28, "images/mario_gross.png", {
        mario_big : [0,0]
    });
    Crafty.sprite(80, "images/castle.png", {
        castle : [0,0]
    });
    Crafty.sprite(24, "images/flag.png", {
        flag : [0,0],
        bar : [1,0]
    });
    
}