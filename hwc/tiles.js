
	//sets up sign images
	var upImg = new Image();
	upImg.src = "images/up.png";
	var rightImg = new Image();
	rightImg.src = "images/right.png";
	var downImg = new Image();
	downImg.src = "images/down.png";
	var leftImg = new Image();
	leftImg.src = "images/left.png";	
	
	function drawTile(x, y) {
		switch (tiles[y][x]) {
			case 0:
			ctx.fillStyle = "whitesmoke";
			ctx.fillRect(x*cw, y*cw, cw, cw);
			break;
			case 1:
			ctx.drawImage(upImg, x*cw, y*cw);
			break;
			case 2:
			ctx.drawImage(rightImg, x*cw, y*cw);
			break;
			case 3:
			ctx.drawImage(downImg, x*cw, y*cw);
			break;
			case 4:
			ctx.drawImage(leftImg, x*cw, y*cw);
			break;
			case 5:
			ctx.fillStyle = "black";
			ctx.fillRect(x*cw, y*cw, cw, cw);
			break;
		}	
		ctx.strokeStyle = "lightgray";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}
