function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

//helper method for clicking button objects {img, x, y, width, height}
function clickButton(e, button){
	if(getMousePos(e).x >= button.x && getMousePos(e).x <= button.x + button.width 
        && getMousePos(e).y >= button.y && getMousePos(e).y <= button.y + button.height){
		return true;
	} else {
		return false;
	}
}

//prepares the canvas
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

//sets up sign images
var upImg = new Image();
upImg.src = "images/up.png";

var rightImg = new Image();
rightImg.src = "images/right.png";

var downImg = new Image();
downImg.src = "images/down.png";

var leftImg = new Image();
leftImg.src = "images/left.png";

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

//possible spawn and exit coordinates, and associated color
//[xDoor,yDoor,color]
var doors = [
    [0, 8, "red"],
    [12, 0, "green"]
];


//sets cell width based on size of map and resolution
var cw = h / (tiles.length);

function drawTile(x, y) {
    switch (tiles[y][x]) {
    case 0:
        ctx.fillStyle = "whitesmoke";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        break;
    case 1:
        ctx.drawImage(upImg, x * cw, y * cw);
        break;
    case 2:
        ctx.drawImage(rightImg, x * cw, y * cw);
        break;
    case 3:
        ctx.drawImage(downImg, x * cw, y * cw);
        break;
    case 4:
        ctx.drawImage(leftImg, x * cw, y * cw);
        break;
    case 5:
        ctx.fillStyle = "black";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        break;
    }
    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
}

function drawDoor(i) {
    ctx.strokeStyle = doors[i][2];
    ctx.strokeRect(doors[i][0] * cw, doors[i][1] * cw, cw, cw);
}

//---------------------------------------------------------------------------------------------

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


//sets student array
//[xCurrent,yCurrent,dCurrent,Goal]
var students = [
    [0, 0, 2, 0],
    [6, 4, 4, 1],
    [0, 3, 2, 0],
    [8, 5, 2, 1],
    [4, 1, 2, 0],
    [8, 8, 4, 1]
];

//sets cell width/2 for drawing circles
var rd = cw / 2;

//temp variable to store where the student will step to if not blocked
var xNew;
var yNew;

//draws the student at index i
function drawStudent(i) {
    ctx.beginPath();
    ctx.arc(students[i][0] * cw + rd, students[i][1] * cw + rd, rd, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "dimgray";
    ctx.fill();
    ctx.strokeStyle = doors[students[i][3]][2];
    ctx.stroke();
}

//updates game logic of student at index i
function stepStudent(i) {
    //changes student direction if their current tile is not empty
    if (tiles[students[i][1]][students[i][0]] !== 0) {
        students[i][2] = tiles[students[i][1]][students[i][0]];
    }
    //computes a new position based on their direction and position
    yNew = students[i][1];
    xNew = students[i][0];
    switch (students[i][2]) {
    case 1:
        yNew -= 1;
        break;
    case 2:
        xNew += 1;
        break;
    case 3:
        yNew += 1;
        break;
    case 4:
        xNew -= 1;
        break;
    }
    //sets the students position to the updated position if not blocked or leaving grid
    if (xNew >= 0 && yNew >= 0 && yNew < tiles.length && xNew < tiles[0].length) {
        if (tiles[yNew][xNew] !== 5) {
            students[i][0] = xNew;
            students[i][1] = yNew;
        }
    }
    //if new position is the same as goal deletes the student and adds the current time to the score
    if (xNew == doors[students[i][3]][0] && yNew == doors[students[i][3]][1]) {
        students.splice(i, 1);
        score += time;
    }
}

//if highlight is active and what its current color is
var highlight;
//the sign selected/clicked/dragged
var signPressed = 0;
//which tile the mouse it currently over
var overX;
var overY;

function drawHighlight() {
	if (highlight) {
		if (tiles[overY][overX] == 5) {
			ctx.fillStyle = "rgba(255, 0, 0, .5)";
			ctx.fillRect(overX * cw, overY * cw, cw, cw);
		} else {
			ctx.globalAlpha = 0.5;
			ctx.drawImage(SIGN_BTNS[signPressed].img, overX * cw, overY * cw);
			ctx.globalAlpha = 1.0;
		}
	}
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed
$("#canvas").mousedown(function (e) {
    for (var i = 0; i < 4; i++){
        if(clickButton(e, SIGN_BTNS[i])){
            highlight = true;
            signPressed = i;
        }
    }
	//delete sign if clicked
	if(tiles[overY][overX] == 1 || tiles[overY][overX] == 2 || tiles[overY][overX] == 3 || tiles[overY][overX] == 4){
		tiles[overY][overX] = 0;
	}
})

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
.mouseup(function(e2){
    if(tiles[overY][overX]!=5 && signPressed != 0){
        //assign the selected sign to the tile at the cursor
        tiles[overY][overX] = signPressed + 1;
    }
    highlight = false;
    signPressed = 0;
})

.mousemove(function(e3){
    //calculates which tile mouse is currently over
    overX = Math.floor(getMousePos(e3).x / cw);
    overY = Math.floor(getMousePos(e3).y / cw);
})

//game variables
var score = 0;
var time = 100;  

//updates game logic
function tick() {
    //updates student positions
    for (var i = 0; i < students.length; ++i) {
        stepStudent(i);
    }
    //decrements the time
    time -= .1;
    //if all the students have reached their goals player wins
    if (students.length == 0) {
        //win action
    }
}

//draws frame
function paint() {
    //runs paint every display refresh
    requestAnimationFrame(paint);
    //paints map
    for(var y = 0; y < tiles[0].length; ++y) {
        for(var x = 0; x < tiles.length; ++x) {
            drawTile(y,x);
        }
    }
    //paints doors
    for(var i = 0; i < doors.length; ++i) {
        drawDoor(i);
    }
	//paints highlight if true
    if (highlight) {
        drawHighlight();
    }
    //paints GUI
    paintGUI();
    //paints students
    for(var i = 0; i < students.length; ++i) {
        drawStudent(i);
    }
}


