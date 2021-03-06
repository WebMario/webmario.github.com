/*
 * Funktion durch die die Map erstellt wird.
 * Die Map wird durch das aufrufen der einzelnen erstellungsfunktionen generiert.
 */

function generateMap() {

	generateGnome(18, 3);
	generateTurtle(30, 3);
	generateFloor(0, 66);

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
	generateGnome(54,3);
	generatePipe(55, 4);
        
    generateCoin(62,8);
	generateActionBlock(62, 7);

	generateFloor(68, 83);
	generateAdobe(74, 6);
	generateActionBlock(75, 6);
    generateCoin(76,7);
	generateAdobe(76, 6);

	generateFromTo(77, 10, 8, 1, generateAdobe);
	generateFromTo(77, 11, 8, 1, generateCoin);

	generateFloor(77, 83);

	generateFloor(86, 148);
	generatePipe(88,3);
	generateGnome(94,3);
	generateGnome(96,3);
	generateGnome(98,3);
	
	generateAdobe(110,3);
	generateTurtle(115,3);

	generateFromTo(88, 10, 3, 1, generateAdobe);
	generateActionBlock(91, 10);
    generateCoin(91,7);
	generateActionBlock(91, 6);
        
    generateCoin(76,7);
	generateAdobe(96, 6);

	generateActionBlock(97, 6);

	generateActionBlock(102, 6);
	generateActionBlock(105, 6);
	generateStarBlock(105, 10);
	generateActionBlock(108, 6);

	generateAdobe(114, 6);

	generateFromTo(117, 10, 3, 1, generateAdobe);

	generateAdobe(124, 10);
	generateActionBlock(125, 10);
	generateMushroomBlock(126, 10);
	generateAdobe(127, 10);
    generateCoin(125, 7);
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
    generateCoin(176, 3);
    generateCoin(176, 4);
    generateCoin(176, 5);
    generateCoin(176, 6);
	generatePipe(176, 2);

	generateSBFirTree(178, 9);

	setFlag(200);

	getCastle(205);

	putMario();

}