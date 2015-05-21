var lostImg = new Image();
lostImg.src = "images/overlays/lose.png";
var RESTART_BTN = {x:cw*3.5, y:cw*4.5, 	width:cw*3, height:cw*1};
var MENU_BTN = {x:cw*9.5, y:cw*4.5, 	width:cw*3, height:cw*1};

//is called every paint frame
function drawLostGame(){
	ctx.drawImage(lostImg, 0, 0, w, h);
	music.pause();
	//the lose music is 9s long btw
	lose.play();
}

$("#canvas").mousedown(function (e) {
	if(currentScreen == "lose"){
		if(clickButton(e, RESTART_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			currentScreen = "game";
			lose.pause();
			lose.currentTime = 0;
			music.currentTime = 0;
			music.play();
			playGame();
		} else if(clickButton(e, MENU_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			currentScreen = "menu";
			lose.pause();
			lose.currentTime = 0;
			menuMusic.currentTime = 0;
		}
	}
})