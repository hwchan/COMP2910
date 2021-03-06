//sets up GUI sign vars
var signWidth = cw*1.5;
var signHeight = cw*1.5;
var menuButtonWidth = cw;
var menuButtonHeight = cw;
var guiFont = "normal " + cw/4 + "pt Calibri"

//sets up GUI sign images
var northGUIImg = new Image();
northGUIImg.src = "images/gui/up_btn.png";
var eastGUIImg = new Image();
eastGUIImg.src = "images/gui/right_btn.png";
var southGUIImg = new Image();
southGUIImg.src = "images/gui/down_btn.png";
var westGUIImg = new Image();
westGUIImg.src = "images/gui/left_btn.png";

//sets up GUI options images
var soundImg = new Image();
soundImg.src = "images/gui/sound.png";
var noSoundImg = new Image();
noSoundImg.src = "images/gui/nosound.png";
var pauseImg = new Image();
pauseImg.src = "images/gui/pause.png";
var unPauseImg = new Image();
unPauseImg.src = "images/gui/unpause.png";

//x-coordinate of the GUI area
var GUIx = cw * gameboard[0].length;

//set sign buttons
var NORTH_BTN = {img:northGUIImg, 	x:GUIx+cw*.25, y:2.75*cw, 	width:signWidth, height:signHeight, currentFrame:0, selected:0};
var EAST_BTN = {img:eastGUIImg, 	x:GUIx+cw*.25, y:4.25*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var SOUTH_BTN = {img:southGUIImg, 	x:GUIx+cw*.25, y:5.75*cw, 	width:signWidth, height:signHeight, currentFrame:0, selected:0};
var WEST_BTN = {img:westGUIImg, 	x:GUIx+cw*.25, y:7.25*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];

//set menu buttons
var MUTE_BTN = {img:soundImg, x:GUIx+cw*0, y:cw*0, width:menuButtonWidth, height:menuButtonHeight};
var PAUSE_BTN = {img:pauseImg, x:GUIx+cw*1, y:cw*0, width:menuButtonWidth, height:menuButtonHeight};

//handle GUI interaction
$("#canvas").mousedown(function (e) {
    if (currentScreen == "game") {
        //handle mute/unmute
        if(clickButton(e, MUTE_BTN)) {
			clickSound.play();
            if(!music.paused) {
                MUTE_BTN.img = noSoundImg;
                music.pause();
            } else {
                MUTE_BTN.img = soundImg;
                music.play();
            }
        //handle pause/unpause
        } else if(clickButton(e, PAUSE_BTN) && !overlay) {
			clickSound.play();
            //TODO change control logic to check for pause state and not the GUI image
            if(!paused){
                PAUSE_BTN.img = unPauseImg;
                clearInterval(game_loop);
                paused = true;
            } else {
                paused = false;
                PAUSE_BTN.img = pauseImg;
                game_loop = setInterval(tick, tickPeriod);
            }
        }
    }
})

function paintGUI() {
    ctx.fillStyle = 'rgb(49,49,49)';
    ctx.fillRect(GUIx, 0, cw * 2, h);
    //draw pause & mute
    ctx.drawImage(PAUSE_BTN.img, PAUSE_BTN.x, PAUSE_BTN.y, menuButtonWidth, menuButtonHeight);
    ctx.drawImage(MUTE_BTN.img, MUTE_BTN.x, MUTE_BTN.y, menuButtonWidth, menuButtonHeight);
    //draw text
    ctx.fillStyle = "white";
    //time and score are now rounded to closest whole integer
    ctx.font = guiFont;
	ctx.fillText("Level: " + difficulty, GUIx + cw * .25, cw*1.5);
    ctx.fillText("Score: " + Math.round(score), GUIx + cw * .25, cw*1.85);
	ctx.fillText("Time: " + Math.round(time), GUIx + cw * .25, cw*2.2);
    //draw signs
	for(var i=0; i<SIGN_BTNS.length; i++){
		animateSprite(SIGN_BTNS[i], SIGN_BTNS[i].img, 30, 2, SIGN_BTNS[i].selected, 24, 24, SIGN_BTNS[i].x, SIGN_BTNS[i].y, signWidth, signHeight);
	}
}

function toggleSelectedSign(i, isOn){
	if(isOn){
		SIGN_BTNS[i].selected = 1;
	} else {
		SIGN_BTNS[i].selected = 0;
	}
}

$("#canvas").mousedown(function (e) {
	if(currentScreen == "game" && paused){
		if(clickButton(e, RESTART_BTN)){
			clickSound.play();
			currentScreen = "game";
			lose.pause();
			lose.currentTime = 0;
			music.currentTime = 0;
			music.play();
			playGame();
		} else if(clickButton(e, MENU_BTN)){
            clearInterval(game_loop);
            score = 0;
            students = [];
			clickSound.play();
			currentScreen = "menu";
			lose.pause();
            lose.currentTime = 0;
            music.pause();
			menuMusic.currentTime = 0;
		} else if(clickButton(e, SUBMIT_BTN)) {
			//todo for submit
			prompt("Enter your username");
		}
	}
})