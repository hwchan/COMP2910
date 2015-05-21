var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;

var backgroundImg = new Image();
backgroundImg.src = "images/menu/background.png";


//Defines the play button
var playImg = new Image();
playImg.src = "images/menu/play.png";
var PLAY_BTN = {img:playImg, x:w/2-cw*2, y:h/2+cw/2, width:cw*4, height:cw*1};

var lvlImg = new Image();
lvlImg.src = "images/menu/lvl.png";

var titleImg = new Image();
titleImg.src = "images/menu/title.png";

var difficultyY = h/2+cw*1.5;

var difficulty1Img = new Image();
difficulty1Img.src = "images/menu/difficulty1.png";
var DIFFICULTY1_BTN = {img:difficulty1Img, x:w/2-3*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty2Img = new Image();
difficulty2Img.src = "images/menu/difficulty2.png";
var DIFFICULTY2_BTN = {img:difficulty2Img, x:w/2-2*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty3Img = new Image();
difficulty3Img.src = "images/menu/difficulty3.png";
var DIFFICULTY3_BTN = {img:difficulty3Img, x:w/2-1*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty4Img = new Image();
difficulty4Img.src = "images/menu/difficulty4.png";
var DIFFICULTY4_BTN = {img:difficulty4Img, x:w/2+0*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty5Img = new Image();
difficulty5Img.src = "images/menu/difficulty5.png";
var DIFFICULTY5_BTN = {img:difficulty5Img, x:w/2+1*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty6Img = new Image();
difficulty6Img.src = "images/menu/difficulty6.png";
var DIFFICULTY6_BTN = {img:difficulty6Img, x:w/2+2*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var difficulty7Img = new Image();
difficulty7Img.src = "images/menu/difficulty7.png";
var DIFFICULTY7_BTN = {img:difficulty7Img, x:w/2+3*cw, y:difficultyY, width:cw, height:cw, currentFrame:0};

var DIFFICULTY_BTNS = [DIFFICULTY1_BTN, DIFFICULTY2_BTN, DIFFICULTY3_BTN, DIFFICULTY4_BTN, DIFFICULTY5_BTN, DIFFICULTY6_BTN, DIFFICULTY7_BTN]

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
            if (paused) {
				drawPaused();
            }
			break;
	}
}

//draws menu background and buttons
function drawMenu(){
    drawBackground();
    drawButton(PLAY_BTN);
	//lvl image
	ctx.drawImage(lvlImg, w/2-4*cw, difficultyY, cw, cw);
	//menu title image
	ctx.drawImage(titleImg, w/2-4*cw, cw, cw*8, cw*3);
	//paint difficulty buttons
	paintDifficultyButton(difficulty-1)    
    menuMusic.play();
}

function paintDifficultyButton(index){
	for(var i=0; i<DIFFICULTY_BTNS.length; i++){
		if(index == i){
			animateSprite(DIFFICULTY_BTNS[i], DIFFICULTY_BTNS[i].img, 10, 1, 1, 16, 16, DIFFICULTY_BTNS[i].x, DIFFICULTY_BTNS[i].y, cw, cw);
		} else {
			animateSprite(DIFFICULTY_BTNS[i], DIFFICULTY_BTNS[i].img, 10, 1, 0, 16, 16, DIFFICULTY_BTNS[i].x, DIFFICULTY_BTNS[i].y, cw, cw);
		}
	}
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
		if(clickButton(e, DIFFICULTY5_BTN)) {
            difficulty = 5;
        }
		if(clickButton(e, DIFFICULTY6_BTN)) {
            difficulty = 6;
        }
		if(clickButton(e, DIFFICULTY7_BTN)) {
            difficulty = 7;
        }
        drawMenu();
        if(clickButton(e, PLAY_BTN)) {
            //tear down menu
            currentScreen = "game";
            menuMusic.pause();
            music.play();
			score = 0;
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