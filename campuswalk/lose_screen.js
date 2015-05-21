var lostImg = new Image();
lostImg.src = "images/overlays/lose.png";
var RESTART_BTN = {x:cw*3.5, y:cw*4.5, 	width:cw*3, height:cw*1};
var MENU_BTN = {x:cw*9.5, y:cw*4.5, 	width:cw*3, height:cw*1};

function drawLostGame(){
	ctx.drawImage(lostImg, 0, 0, w, h);
}

$("#canvas").mousedown(function (e) {
	if(currentScreen == "lose"){
		if(clickButton(e, RESTART_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			currentScreen = "game";
			playGame();
		} else if(clickButton(e, MENU_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			music.pause();
			currentScreen = "menu";
		}
	}
})