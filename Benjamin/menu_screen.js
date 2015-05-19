var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
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
		music.play();
		
        playGame(1);
    }
})