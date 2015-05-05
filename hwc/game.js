$(document).ready(function(){
	//prepares the canvas
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//game variables
	var score = 0;
	var time = 0;

	//temp variables
	var xNext;
	var yNext;
	
	//sets map array
	//1: north
	//2: east
	//3: south
	//4: west
	//5: building
    var tiles = [
    [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 4 ],
    [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 5, 5, 5, 0, 2, 0, 0, 3, 0 ],
    [0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 5, 5, 5, 0, 2, 0, 3, 0, 0 ],
    [0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0 ],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0 ]
	];
	
	//sets student array
	//[x,y,d]
	var students = [
    [0, 0, 2 ],
    [6, 4, 4 ],
    [0, 3, 2 ],
    [8, 5, 2 ],
    [4, 1, 2 ],
    [8, 8, 4 ]
	];



	//sets cell width
	var cw = w/(tiles[0].length+2);
	//sets cell width/2 for drawing circles
	var rd = cw/2;
	
	//sets up sign images
	var upImg = new Image();
	upImg.src = "images/up.png";
	var rightImg = new Image();
	rightImg.src = "images/right.png";
	var downImg = new Image();
	downImg.src = "images/down.png";
	var leftImg = new Image();
	leftImg.src = "images/left.png";
	
	//sets up GUI vars
	var muteBtn = new Image();
	muteBtn.src = "images/sound.png";
	var pauseBtn = new Image();
	pauseBtn.src = "images/pause.png";
	//x-coordinate of the GUI area
	var GUIx = cw*tiles[0].length;
	
	//starts draw loop
	init();

	function init() {	
		//repaints every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 100);
	}
			
	//paint function
	function paint() {
		//Loops through and paints map
		for(var y = 0; y < tiles[0].length; ++y) {
			for(var x = 0; x < tiles.length; ++x) {
				drawTile(y,x);
			}
		}
		//paint GUI
		paintGUI();
		//paint students
		for(var i = 0; i < students.length; ++i) {
			drawStudent(i);
		}
	}
	
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

	function drawStudent(i) {
		ctx.beginPath();
		ctx.arc(students[i][0]*cw+rd, students[i][1]*cw+rd, rd, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fillStyle = "dimgray";
		ctx.fill();
		yNext = students[i][1];
		xNext = students[i][0];
		if (tiles[students[i][1]][students[i][0]] != 0) {
			students[i][2] = tiles[students[i][1]][students[i][0]];
		}
		switch (students[i][2]) {
			case 1:
			yNext--;
			break;
			case 2:
			xNext++;
			break;
			case 3:
			yNext++;
			break;
			case 4:
			xNext--;
			break;
		}
		if (tiles[yNext][xNext] != 5) {
			students[i][0] = xNext;
			students[i][1] = yNext; 
		}
	}
	
	$( "#canvas" )
	.mousedown(function(e) {
	tempX = e.pageX;
	tempY = e.pageY;
	if(tiles[Math.floor(tempY/(cw+1))][Math.floor(tempX/(cw+1))]!=5){
	tiles[Math.floor(tempY/(cw+1))][Math.floor(tempX/(cw+1))]=3;
	}
  })
})