//sets up GUI sign vars
var signWidth = cw;
var signHeight = cw;
var menuButtonWidth = cw*.5;
var menuButtonHeight = cw*.5;
var guiFont = "normal " + cw/4 + "pt Calibri"

//sets up GUI sign images
var northGUIImg = new Image();
northGUIImg.src = "images/up.png";
var eastGUIImg = new Image();
eastGUIImg.src = "images/right.png";
var southGUIImg = new Image();
southGUIImg.src = "images/down.png";
var westGUIImg = new Image();
westGUIImg.src = "images/left.png";

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
var NORTH_BTN = {img:upImg, x:GUIx+cw*.5, y:3*cw, width:signWidth, height:signHeight};
var EAST_BTN = {img:rightImg, x:GUIx+cw*.5, y:4.5*cw, width:signWidth, height:signHeight};
var SOUTH_BTN = {img:downImg, x:GUIx+cw*.5, y:6*cw, width:signWidth, height:signHeight};
var WEST_BTN = {img:leftImg, x:GUIx+cw*.5, y:7.5*cw, width:signWidth, height:signHeight};
var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];

//set menu buttons
var MUTE_BTN = {img:soundImg, x:GUIx+cw*.25, y:cw*.25, width:menuButtonWidth, height:menuButtonHeight};
var PAUSE_BTN = {img:pauseImg, x:GUIx+cw*1.25, y:cw*.25, width:menuButtonWidth, height:menuButtonHeight};

//handle GUI interaction
$("#canvas").mousedown(function (e) {
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
		} else {
			PAUSE_BTN.img = pauseImg;
			game_loop = setInterval(tick, tickPeriod);
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
    ctx.fillText("Time: " + Math.round(time), GUIx + cw * .25, cw*1.75);
    ctx.fillText("Score: " + Math.round(score), GUIx + cw * .25, cw*1.25);
    //draw signs
    ctx.drawImage(NORTH_BTN.img, NORTH_BTN.x, NORTH_BTN.y, signWidth, signHeight);
    ctx.drawImage(EAST_BTN.img, EAST_BTN.x, EAST_BTN.y, signWidth, signHeight);
    ctx.drawImage(SOUTH_BTN.img, SOUTH_BTN.x, SOUTH_BTN.y, signWidth, signHeight);
    ctx.drawImage(WEST_BTN.img, WEST_BTN.x, WEST_BTN.y, signWidth, signHeight);
}