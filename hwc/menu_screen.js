var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;

var backgroundImg = new Image();
backgroundImg.src = "images/background.png";


//Defines the play button
var playImg = new Image();
playImg.src = "images/play.png";
var PLAY_BTN = {img:playImg, x:w/2-cw*2, y:h/2-cw*1.5, width:cw*4, height:cw*1};

var difficulty1Img = new Image();
difficulty1Img.src = "images/difficulty1.png";
var DIFFICULTY1_BTN = {img:difficulty1Img, x:w/2-2*cw, y:h/2+cw/2, width:cw, height:cw, currentFrame:0};

var difficulty2Img = new Image();
difficulty2Img.src = "images/difficulty2.png";
var DIFFICULTY2_BTN = {img:difficulty2Img, x:w/2-cw, y:h/2+cw/2, width:cw, height:cw, currentFrame:0};

var difficulty3Img = new Image();
difficulty3Img.src = "images/difficulty3.png";
var DIFFICULTY3_BTN = {img:difficulty3Img, x:w/2, y:h/2+cw/2, width:cw, height:cw, currentFrame:0};

var difficulty4Img = new Image();
difficulty4Img.src = "images/difficulty4.png";
var DIFFICULTY4_BTN = {img:difficulty4Img, x:w/2+cw, y:h/2+cw/2, width:cw, height:cw, currentFrame:0};

//Starts draw loop on page load
onload = function(){
    paint();
}


//Global draw loop
function paint() {
    //runs paint every display refresh
    requestAnimationFrame(paint);
    //checks current screen and draws it
    switch (currentScreen) {
		case "menu":
			drawMenu();
			break;
        case "game":
			drawGame();
			break;
	}
}

//draws menu background and buttons
function drawMenu(){
    drawBackground();
    drawButton(PLAY_BTN);
    //drawButton(DIFFICULTY1_BTN);
	//drawButton(DIFFICULTY2_BTN);
    //drawButton(DIFFICULTY3_BTN);
    //drawButton(DIFFICULTY4_BTN);
	console.log(difficulty);
	switch(difficulty){
		case 1:
			animateSprite(DIFFICULTY1_BTN, DIFFICULTY1_BTN.img, 10, 1, 1, 16, 16, DIFFICULTY1_BTN.x, DIFFICULTY1_BTN.y);
			animateSprite(DIFFICULTY2_BTN, DIFFICULTY2_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY2_BTN.x, DIFFICULTY2_BTN.y);
			animateSprite(DIFFICULTY3_BTN, DIFFICULTY3_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY3_BTN.x, DIFFICULTY3_BTN.y);
			animateSprite(DIFFICULTY4_BTN, DIFFICULTY4_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY4_BTN.x, DIFFICULTY4_BTN.y);
			break;
		case 2:
			animateSprite(DIFFICULTY1_BTN, DIFFICULTY1_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY1_BTN.x, DIFFICULTY1_BTN.y);
			animateSprite(DIFFICULTY2_BTN, DIFFICULTY2_BTN.img, 10, 1, 1, 16, 16, DIFFICULTY2_BTN.x, DIFFICULTY2_BTN.y);
			animateSprite(DIFFICULTY3_BTN, DIFFICULTY3_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY3_BTN.x, DIFFICULTY3_BTN.y);
			animateSprite(DIFFICULTY4_BTN, DIFFICULTY4_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY4_BTN.x, DIFFICULTY4_BTN.y);
			break;
		case 3:
			animateSprite(DIFFICULTY1_BTN, DIFFICULTY1_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY1_BTN.x, DIFFICULTY1_BTN.y);
			animateSprite(DIFFICULTY2_BTN, DIFFICULTY2_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY2_BTN.x, DIFFICULTY2_BTN.y);
			animateSprite(DIFFICULTY3_BTN, DIFFICULTY3_BTN.img, 10, 1, 1, 16, 16, DIFFICULTY3_BTN.x, DIFFICULTY3_BTN.y);
			animateSprite(DIFFICULTY4_BTN, DIFFICULTY4_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY4_BTN.x, DIFFICULTY4_BTN.y);
			break;
		case 4:
			animateSprite(DIFFICULTY1_BTN, DIFFICULTY1_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY1_BTN.x, DIFFICULTY1_BTN.y);
			animateSprite(DIFFICULTY2_BTN, DIFFICULTY2_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY2_BTN.x, DIFFICULTY2_BTN.y);
			animateSprite(DIFFICULTY3_BTN, DIFFICULTY3_BTN.img, 10, 1, 0, 16, 16, DIFFICULTY3_BTN.x, DIFFICULTY3_BTN.y);
			animateSprite(DIFFICULTY4_BTN, DIFFICULTY4_BTN.img, 10, 1, 1, 16, 16, DIFFICULTY4_BTN.x, DIFFICULTY4_BTN.y);
			break;
	}    
    menuMusic.play();
}

//button listeners for main menu
$("#canvas").mousedown(function(e) {
    if (currentScreen == "menu") {
        if(clickButton(e, DIFFICULTY1_BTN)) {
            difficulty = 1;
        }
        if(clickButton(e, DIFFICULTY2_BTN)) {
            difficulty = 2;
        }
        if(clickButton(e, DIFFICULTY3_BTN)) {
            difficulty = 3;
        }
        if(clickButton(e, DIFFICULTY4_BTN)) {
            difficulty = 4;
        }
        drawMenu();
        if(clickButton(e, PLAY_BTN)) {
            //tear down menu
            currentScreen = "game";
            menuMusic.pause();
            music.play();
            playGame();
        }
    }
})

function drawBackground() {
    for(var y = 0; y < 5; ++y) {
        for(var x = 0; x < 8; ++x) {
            ctx.drawImage(backgroundImg, x * cw * 2, y * cw * 2, cw * 2, cw * 2);
        }
    }
}