	//sets up sign images for GUI
	var signWidth = 32;
	var signHeight = 32;
	
	var northGUIImg = new Image();
	northGUIImg.src = "images/up.png";
	var eastGUIImg = new Image();
	eastGUIImg.src = "images/right.png";
	var southGUIImg = new Image();
	southGUIImg.src = "images/down.png";
	var westGUIImg = new Image();
	westGUIImg.src = "images/left.png";
	
	//sets cell width
	var cw = w/(tiles[0].length+2);
	//sets up GUI vars
	var muteBtn = new Image();
	muteBtn.src = "images/sound.png";
	var pauseBtn = new Image();
	pauseBtn.src = "images/pause.png";
	//x-coordinate of the GUI area
	var GUIx = cw*tiles[0].length;
	
	//set buttons
	var NORTH_BTN = {img:upImg, x:GUIx+15, y:70, width:signWidth, height:signHeight};
	var EAST_BTN = {img:rightImg, x:GUIx+15, y:120, width:signWidth, height:signHeight};
	var SOUTH_BTN = {img:downImg, x:GUIx+15, y:170, width:signWidth, height:signHeight};
	var WEST_BTN = {img:leftImg, x:GUIx+15, y:220, width:signWidth, height:signHeight};
	var SIGN_BTNS = [NORTH_BTN, EAST_BTN, SOUTH_BTN, WEST_BTN];
	
	function paintGUI() {
		ctx.fillStyle = "dimgray";		
		ctx.fillRect(GUIx, 0, cw*2, h);
		//draw pause & mute
		ctx.drawImage(pauseBtn, GUIx+35, 5);
		ctx.drawImage(muteBtn, GUIx+11, 5);
		//draw text
		ctx.fillStyle = "white";
		ctx.fillText("Time: " + time, GUIx+5, 45);
		ctx.fillText("Score: " + score, GUIx+5, 35);
		//draw signs
		ctx.drawImage(NORTH_BTN.img, NORTH_BTN.x, NORTH_BTN.y);
		ctx.drawImage(EAST_BTN.img, EAST_BTN.x, EAST_BTN.y);
		ctx.drawImage(SOUTH_BTN.img, SOUTH_BTN.x, SOUTH_BTN.y);
		ctx.drawImage(WEST_BTN.img, WEST_BTN.x, WEST_BTN.y);
	}