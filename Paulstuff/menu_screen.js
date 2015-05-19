var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
var playMusic = new Audio('music/playsign.mp3');
var pickupMusic = new Audio('music/pickup.wav');
var winMusic = new Audio('music/victory.mp3');
var loseMusic = new Audio('music/gameover.mp3');
//start button vars
var buttonPosX = (5/48)*w;
var buttonPosY = (162/270)*h;
var buttonSizeX = (205/480)*w;
var buttonSizeY = (68/270)*h;
var PLAY_BTN = {img:menuImg, x: buttonPosX, y: buttonPosY, width: buttonSizeX, height: buttonSizeY};

menuImg.onload = function(){
    ctx.drawImage(menuImg, 0, 0, w, h);
    menuMusic.play();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
		//tear down menu
		PLAY_BTN = null;
		menuMusic.pause();
		playMusic.play();
		music.play();
        playGame();
    }
})