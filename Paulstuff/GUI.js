//sets up sign images for GUI
var signWidth = cw;
var signHeight = cw;
var menuButtonWidth = cw/2;
var menuButtonHeight = cw/2;

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
var GUIx = cw * gameboard[0].length;
var nBTNy = (7/27)*h;
var eBTNy = (12/27)*h;
var sBTNy = (17/27)*h;
var wBTNy = (22/27)*h;
//set sign buttons
var NORTH_BTN = {img:upImg, x:GUIx+cw/2, y: nBTNy, width:signWidth, height:signHeight};
var EAST_BTN = {img:rightImg, x:GUIx+cw/2, y: eBTNy, width:signWidth, height:signHeight};
var SOUTH_BTN = {img:downImg, x:GUIx+cw/2, y: sBTNy, width:signWidth, height:signHeight};
var WEST_BTN = {img:leftImg, x:GUIx+cw/2, y: wBTNy, width:signWidth, height:signHeight};
var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];

var menuBTNy = (1/54)*h;
var muteBTNx = GUIx+cw/3.75;
var pauseBTNx = GUIx+1.25*cw;
//set menu buttons
var MUTE_BTN = {img:soundImg, x: muteBTNx, y:menuBTNy, width:menuButtonWidth, height:menuButtonHeight};
var PAUSE_BTN = {img:pauseImg, x: pauseBTNx, y:menuBTNy, width:menuButtonWidth, height:menuButtonHeight};

//set music and sound vars
var music = new Audio('music/strobe.mp3');
music.loop = true;

//handle GUI interaction
var box1 = document.getElementById('canvas')
$("#canvas").on('vmousedown', function(e5){
	//handle mute/unmute
    if((e5.pageX>=(GUIx+19) && e5.pageX<=(GUIx+19+cw/2)) && (e5.pageY>=13 && e5.pageY<=(13+cw/2))) {
		if(!music.paused) {
			MUTE_BTN.img = noSoundImg;
			music.pause();
		} else {
			MUTE_BTN.img = soundImg;
			music.play();
		}
	//handle pause/unpause
	} else if((e5.pageX>=(GUIx+43) && e5.pageX<=(GUIx+43+cw/2)) && (e5.pageY>=13 && e5.pageY<=(13+cw/2))) {
		//TODO change control logic to check for pause state and not the GUI image
		if(PAUSE_BTN.img == pauseImg){
			PAUSE_BTN.img = unPauseImg;
			clearInterval(game_loop);
		} else {
			PAUSE_BTN.img = pauseImg;
			game_loop = setInterval(tick, 100);
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
    ctx.fillText("Time: " + Math.round(time), GUIx + 5, 1.5*cw);
    ctx.fillText("Score: " + Math.round(score), GUIx + 5, 1.125*cw);
    //draw signs
    ctx.drawImage(NORTH_BTN.img, NORTH_BTN.x, NORTH_BTN.y);
    ctx.drawImage(EAST_BTN.img, EAST_BTN.x, EAST_BTN.y);
    ctx.drawImage(SOUTH_BTN.img, SOUTH_BTN.x, SOUTH_BTN.y);
    ctx.drawImage(WEST_BTN.img, WEST_BTN.x, WEST_BTN.y);
}