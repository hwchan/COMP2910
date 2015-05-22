var lostImg = new Image();
lostImg.src = "images/overlays/lose.png";
var winImg = new Image();
winImg.src = "images/overlays/win.png";
var RESTART_BTN = {x:cw*2, y:cw*4.875, 	width:cw*3, height:cw*1};
var SUBMIT_BTN = {x:cw*5.66, y:cw*4.875, 	width:cw*4.6875, height:cw*1};
var MENU_BTN = {x:cw*11, y:cw*4.875, 	width:cw*3, height:cw*1};

function drawLostGame(){
	ctx.drawImage(lostImg, 0, 0, w, h);
	//draw score
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + Math.round(score), cw*7.25, cw*4.5);
	music.pause();
	//the lose music is 9s long btw
	lose.play();
}

function drawWonGame(){
	//alert ('You have unlocked achievement 3: Master of the walk.');
	achievement3();
	ctx.drawImage(winImg, 0, 0, w, h);
	//draw score
	ctx.fillStyle = "white";
	ctx.fillText("Score: " + Math.round(score), cw*7.25, cw*4.5);
	music.pause();

	complete.play();
}

//TODO: the buttons are part of the static bg img, mousedown is a mess

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
		} else if(clickButton(e, SUBMIT_BTN)) {
			//todo for submit
			prompt("Enter your username");
		}
	} else if(currentScreen == "win"){
		if(clickButton(e, RESTART_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			currentScreen = "game";
			complete.pause();
			complete.currentTime = 0;
			music.currentTime = 0;
			music.play();
			playGame();
		} else if(clickButton(e, MENU_BTN)){
			clickSound.play();
			score = 0;
			students = [];
			currentScreen = "menu";
			complete.pause();
			complete.currentTime = 0;
			menuMusic.currentTime = 0;
		} else if(clickButton(e, SUBMIT_BTN)) {
			//todo for submit
			prompt("Enter your username");
		}
	}
})