	//sets cell width
	var cw = w/(tiles[0].length+2);
	//sets up GUI vars
	var muteBtn = new Image();
	muteBtn.src = "images/sound.png";
	var pauseBtn = new Image();
	pauseBtn.src = "images/pause.png";
	//x-coordinate of the GUI area
	var GUIx = cw*tiles[0].length;

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
		ctx.drawImage(upImg, GUIx+15, 70);
		ctx.drawImage(rightImg, GUIx+15, 120);
		ctx.drawImage(downImg, GUIx+15, 170);
		ctx.drawImage(leftImg, GUIx+15, 220);
	}
