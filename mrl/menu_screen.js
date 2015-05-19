var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;



//Defines the play button
var playImg = new Image();
playImg.src = "images/play.png";
var PLAY_BTN = {img:playImg, x:w/2-cw*2, y:h/2-cw, width:cw*4, height:cw*1};

var difficulty1Img = new Image();
difficulty1Img.src = "images/difficulty1.png";
var DIFFICULTY1_BTN = {img:difficulty1Img, x:w/2-2*cw, y:h/2, width:cw, height:cw};

var difficulty2Img = new Image();
difficulty2Img.src = "images/difficulty2.png";
var DIFFICULTY2_BTN = {img:difficulty2Img, x:w/2-cw, y:h/2, width:cw, height:cw};

onload = function(){
    drawMenu();
}

function drawMenu(){
    drawBackground();
    ctx.drawImage(PLAY_BTN.img, PLAY_BTN.x, PLAY_BTN.y, PLAY_BTN.width, PLAY_BTN.height);
    ctx.drawImage(DIFFICULTY1_BTN.img, DIFFICULTY1_BTN.x, DIFFICULTY1_BTN.y, DIFFICULTY1_BTN.width, DIFFICULTY1_BTN.height);
    ctx.drawImage(DIFFICULTY2_BTN.img, DIFFICULTY2_BTN.x, DIFFICULTY2_BTN.y, DIFFICULTY2_BTN.width, DIFFICULTY2_BTN.height);
    menuMusic.play();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
		//tear down menu
		PLAY_BTN = null;
		menuMusic.pause();
		music.play();
        setGameboard();
        playGame();
    }
    if(clickButton(e, DIFFICULTY1_BTN)) {
		difficulty = 1;
    }
    if(clickButton(e, DIFFICULTY2_BTN)) {
		difficulty = 2;
    }
    drawMenu();
})

function drawBackground() {
    for(var y = 0; y < 9; ++y) {
        for(var x = 0; x < 16; ++x) {
            ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
        }
    }
}