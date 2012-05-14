
function generateMap() {
    // Simple Blocks
    //        for(var xa = 0; xa < 66 ; xa++) {
    //            for(var ya =1; ya < 3; ya++) {
    //                generateFloor(xa, ya);
    //            }
    //        }
    generateGnome(230, 10);        
    generateFloor(0, 66);
       
<<<<<<< HEAD
   	generateTurtle(250, 20);           
=======
    
    
>>>>>>> 1230f30a575adf31bc6ad5ebbfdf96816ba3ee49
    generateMushroomBlock(15, 6);              
    generateCoin(19, 7)
    generateAdobe(19, 6);
    generateStarBlock(20, 6);
    generateAdobe(21, 6);
    generateActionBlock(22, 6);
    generateActionBlock(21, 10);
    generateAdobe(23, 6);
        
    generatePipe(27, 2);
    generatePipe(38, 3);
    generatePipe(45, 4);
    generatePipe(55, 4);
        
    generateActionBlock(62, 7);
        
    generateFloor(68, 83);
    //        for(xa = 68; xa < 83 ; xa++) {
    //            for(ya =1; ya < 3; ya++){
    //                generateFloor(xa, ya);
    //            }
    //        }
    generateAdobe(74, 6);
    generateActionBlock(75, 6);
    generateAdobe(76, 6);
        
    generateFromTo(77, 10, 8, 1, generateAdobe);
        
    generateFloor(77, 83);
        
    generateFloor(86, 148);
        
    generateFromTo(88, 10, 3, 1, generateAdobe);
    generateActionBlock(91, 10);
        
    generateActionBlock(91, 6);
        
    generateAdobe(96, 6);
        
    generateActionBlock(97, 6);
        
    generateActionBlock(102 , 6);
    generateActionBlock(105 , 6);
    generateActionBlock(105 , 10    );
    generateActionBlock(108 , 6);
        
    generateAdobe(114, 6);
        
    generateFromTo(117, 10, 3, 1, generateAdobe);
        
    generateAdobe(124, 10);
    generateActionBlock(125, 10);
    generateActionBlock(126, 10);
    generateAdobe(127, 10);
    generateAdobe(125, 6);
    generateAdobe(126, 6);
        
    generateSBFirTree(129, 4);
        
    generateBSFirTree(135, 4);
        
    generateSBFirTree(143, 5);
        
    generateFloor(150, 250);

    generateBSFirTree(150, 5);
        
    generatePipe(160, 2);
        
    generateAdobe(165, 6);
    generateAdobe(166, 6);
    generateActionBlock(167, 6);
    generateAdobe(168, 6);
        
    generatePipe(176, 2);
        
    generateSBFirTree(178, 9);
        
    setFlag(200);
        
    getCastle(205);

    putMario();

}