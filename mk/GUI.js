//sets up sign images for GUI
var signWidth = 32;
var signHeight = 32;
var menuButtonWidth = 16;
var menuButtonHeight = 16;

//sets up sign images
var northGUIImg = new Image();
northGUIImg.src = "images/up.png";
var eastGUIImg = new Image();
eastGUIImg.src = "images/right.png";
var southGUIImg = new Image();
southGUIImg.src = "images/down.png";
var westGUIImg = new Image();
westGUIImg.src = "images/left.png";

//sets up GUI images
var soundImg = new Image();
soundImg.src = "images/sound.png";
var noSoundImg = new Image();
noSoundImg.src = "images/nosound.png";
var pauseImg = new Image();
pauseImg.src = "images/pause.png";
var unPauseImg = new Image();
unPauseImg.src = "images/unpause.png";
//x-coordinate of the GUI area
var GUIx = cw * tiles[0].length;

//set sign buttons
var NORTH_BTN = {img:upImg, x:GUIx+15, y:70, width:signWidth, height:signHeight};
var EAST_BTN = {img:rightImg, x:GUIx+15, y:120, width:signWidth, height:signHeight};
var SOUTH_BTN = {img:downImg, x:GUIx+15, y:170, width:signWidth, height:signHeight};
var WEST_BTN = {img:leftImg, x:GUIx+15, y:220, width:signWidth, height:signHeight};
var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];

//set menu buttons
var MUTE_BTN = {img:noSoundImg, x:GUIx+11, y:5, width:menuButtonWidth, height:menuButtonHeight};
var PAUSE_BTN = {img:unPauseImg, x:GUIx+35, y:5, width:menuButtonWidth, height:menuButtonHeight};

//set music and sound vars
var music = new Audio('h.mp3');
music.loop = true;

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
		if(PAUSE_BTN.img == unPauseImg){
			PAUSE_BTN.img = pauseImg;
		} else {
			PAUSE_BTN.img = unPauseImg;
		}
	}
})

function paintGUI() {
    ctx.fillStyle = "dimgray";
    ctx.fillRect(GUIx, 0, cw * 2, h);
    //draw pause & mute
    ctx.drawImage(PAUSE_BTN.img, PAUSE_BTN.x, PAUSE_BTN.y);
    ctx.drawImage(MUTE_BTN.img, MUTE_BTN.x, MUTE_BTN.y);
    //draw text
    ctx.fillStyle = "white";
    //time and score are now rounded to closest whole integer
    ctx.fillText("Time: " + Math.round(time), GUIx + 5, 45);
    ctx.fillText("Score: " + Math.round(score), GUIx + 5, 35);
    //draw signs
    ctx.drawImage(NORTH_BTN.img, NORTH_BTN.x, NORTH_BTN.y);
    ctx.drawImage(EAST_BTN.img, EAST_BTN.x, EAST_BTN.y);
    ctx.drawImage(SOUTH_BTN.img, SOUTH_BTN.x, SOUTH_BTN.y);
    ctx.drawImage(WEST_BTN.img, WEST_BTN.x, WEST_BTN.y);
}