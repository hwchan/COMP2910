//sets up GUI sign vars
var signWidth = cw;
var signHeight = cw;
var menuButtonWidth = cw;
var menuButtonHeight = cw;
var guiFont = "normal " + cw/4 + "pt Calibri"

//sets up GUI sign images
var northGUIImg = new Image();
northGUIImg.src = "images/up_btn.png";
var eastGUIImg = new Image();
eastGUIImg.src = "images/right_btn.png";
var southGUIImg = new Image();
southGUIImg.src = "images/down_btn.png";
var westGUIImg = new Image();
westGUIImg.src = "images/left_btn.png";

//sets up GUI options images
var soundImg = new Image();
soundImg.src = "images/sound.png";
var noSoundImg = new Image();
noSoundImg.src = "images/nosound.png";
var pauseImg = new Image();
pauseImg.src = "images/pause.png";
var unPauseImg = new Image();
unPauseImg.src = "images/unpause.png";

//x-coordinate of the GUI area
var GUIx = cw * gameboard[0].length;

//set sign buttons
var NORTH_BTN = {img:northGUIImg, x:GUIx+cw*.5, y:3*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var EAST_BTN = {img:eastGUIImg, x:GUIx+cw*.5, y:4.5*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var SOUTH_BTN = {img:southGUIImg, x:GUIx+cw*.5, y:6*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var WEST_BTN = {img:westGUIImg, x:GUIx+cw*.5, y:7.5*cw, width:signWidth, height:signHeight, currentFrame:0, selected:0};
var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];

//set menu buttons
var MUTE_BTN = {img:soundImg, x:GUIx+cw*0, y:cw*0, width:menuButtonWidth, height:menuButtonHeight};
var PAUSE_BTN = {img:pauseImg, x:GUIx+cw*1, y:cw*0, width:menuButtonWidth, height:menuButtonHeight};

//handle GUI interaction
$("#canvas").mousedown(function (e) {
    if (currentScreen == "game") {
        //handle mute/unmute
        if(clickButton(e, MUTE_BTN)) {
            if(!music.paused) {
                MUTE_BTN.img = noSoundImg;
                music.pause();
            } else {
                MUTE_BTN.img = soundImg;
                music.play();
            }
        //handle pause/unpause
        } else if(clickButton(e, PAUSE_BTN)) {
            //TODO change control logic to check for pause state and not the GUI image
            if(PAUSE_BTN.img == pauseImg){
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
    ctx.fillStyle = "dimgray";
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
    /*ctx.drawImage(NORTH_BTN.img, NORTH_BTN.x, NORTH_BTN.y, signWidth, signHeight);
    ctx.drawImage(EAST_BTN.img, EAST_BTN.x, EAST_BTN.y, signWidth, signHeight);
    ctx.drawImage(SOUTH_BTN.img, SOUTH_BTN.x, SOUTH_BTN.y, signWidth, signHeight);
    ctx.drawImage(WEST_BTN.img, WEST_BTN.x, WEST_BTN.y, signWidth, signHeight);*/
	for(var i=0; i<SIGN_BTNS.length; i++){
		animateSprite(SIGN_BTNS[i], SIGN_BTNS[i].img, 30, 2, SIGN_BTNS[i].selected, 16, 16, SIGN_BTNS[i].x, SIGN_BTNS[i].y);
	}
}

function toggleSelectedSign(i, isOn){
	if(isOn){
		SIGN_BTNS[i].selected = 1;
	} else {
		SIGN_BTNS[i].selected = 0;
	}
}