//This sets the difficulty
var difficulty = 1;
var maxTime;
var overlay = false;
var lostGame = false;
var wonGame = false;
var lvl2 = new Image();
var lvl3 = new Image();
var lvl4 = new Image();
var lvl5 = new Image();
var lvl6 = new Image();
var lvl7 = new Image();
var pauseScreen = new Image();
var lostImg = new Image();
var wonImg = new Image();
var scoreFont = "normal " + cw + "pt Calibri"

wonImg.src = "images/won.png";
lostImg.src = "images/lose.png";
pauseScreen.src = "images/paused.png";
lvl2.src = "images/lvl2.png";
lvl3.src = "images/lvl3.png";
lvl4.src = "images/lvl4.png";
lvl5.src = "images/lvl5.png";
lvl6.src = "images/lvl6.png";
lvl7.src = "images/lvl7.png";

var RST_BTN = {img:lostImg, x:cw*4.5, y:cw*3.5, width:cw*5, height:cw*2};
var MENU_BTN = {img:lostImg, x:cw*4.5, y:h-cw*3, width:cw*5, height:cw*2};

//starts the game: gameboard, gameloop, etc.
function playGame(){
    resetGameboard();
	switch (difficulty) {
		//case 0 for debugging
		case 0:
			time = 100;
			setSpawn(10, 10);
			setSpeedVariance(10, 10);
			break;
		case 1:
			time = 100;
			setSpawn(1, 10);
			setSpeedVariance(10, 5);
			break;
		case 2:
			time = 60;
			setSpawn(2, 10);
			setSpeedVariance(10, 5);
			break;
		case 3:
			time = 60;
			setSpawn(3, 10);
			setSpeedVariance(10, 5);
			break;
		case 4:
			time = 50;
			setSpawn(3, 10);
			setSpeedVariance(10, 5);
			break;
		case 5:
			time = 50;
			setSpawn(4, 10);
			setSpeedVariance(10, 4);
			break;
		case 6:
			time = 30;
			setSpawn(4, 10);
			setSpeedVariance(10, 3);
			break;
		case 7:
			time = 30;
			setSpawn(10, 10);
			setSpeedVariance(10, 2);
			break;
	}
	maxTime = time;
    game_loop = setInterval(tick, tickPeriod);
}

// shows the overlay screen for 5 seconds then starts the next level
function showOverlay() {
    overlay = true;
    clearInterval(game_loop);
    setTimeout(nxtLevel, 5000);  // 5 seconds
}

function nxtLevel() {
    spawnIn = 0;
    difficulty++;
	playGame();
    overlay = false;
}


//updates game logic
function tick() {
    //updates student positions
    for (var i = 0; i < students.length; ++i) {
		if(students[i] != null){
			stepStudent(i);
		}
    }
    //spawns a student each tick
    spawnStudents();
    //if all the students have reached their goals player wins
    if (students.length == 0 && difficulty ==  7) {
        //win action
		wonGame = true;
    } else if (students.length == 0) {
		showOverlay();
	}
    
    
    //if time = 0 game failure state
    if (time <= 0) {
        clearInterval(game_loop);
        lostGame = true;
    } else {
        //decrements the time
        time -= tickPeriod/1000;
    }
}

//draws frame
function drawGame() {
	//paint map
	var bgImg = new Image();
	bgImg.src = "images/mockup.png";
	ctx.drawImage(bgImg, 0, 0, w-2*cw, h);
	//paint signs
	for(var x = 0; x < gameboard[0].length; ++x) {
        for(var y = 0; y < gameboard.length; ++y) {
            switch (gameboard[y][x].contents) {
				case 0:
					break;
				case 1:
					ctx.drawImage(upImg, x * cw, y * cw, cw, cw);
					break;
				case 2:
					ctx.drawImage(rightImg, x * cw, y * cw, cw, cw);
					break;
				case 3:
					ctx.drawImage(downImg, x * cw, y * cw, cw, cw);
					break;
				case 4:
					ctx.drawImage(leftImg, x * cw, y * cw, cw, cw);
					break;
				case 5:
					break;
			}
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
    
    if (overlay) {
        switch (difficulty) {
            case 0:
                ctx.drawImage(lvl1,0,0,cw*14,h);
                break;
            case 1:
                ctx.drawImage(lvl2,0,0,cw*14,h);
                break;
            case 2:
                ctx.drawImage(lvl3, 0,0,cw*14,h);
                break;
            case 3:
                ctx.drawImage(lvl4,0,0,cw*14,h);
                break;
            case 4:
                ctx.drawImage(lvl5,0,0,cw*14,h);
                break;
            case 5:
                ctx.drawImage(lvl6,0,0,cw*14,h);
                break;
            case 6:
                ctx.drawImage(lvl7,0,0,cw*14,h);
                break;
        }    
    }
    
}

//pause overlay
function drawPaused() {
    ctx.drawImage(pauseScreen,0,0,cw*14,h);
}

function drawLostGame() {
    ctx.drawImage(lostImg,0,0,w,h);
}

function drawWonGame() {
    ctx.drawImage(wonImg,0,0,w,h);
    ctx.font = scoreFont;
    ctx.fillStyle = "black";
    ctx.fillText(Math.round(time), w/2 + cw*.5, h/2 + cw*.4);
}

$("#canvas").mousedown(function(e) {
    if (currentScreen == "game" && lostGame == true) {
        clearInterval(game_loop);
        //Go to the menu screen
        if(clickButton(e, MENU_BTN)) {
            lostGame = false;
            currentScreen = "menu";
        //Restart from the same difficulty
        } else if(clickButton(e, RST_BTN)) {
            lostGame = false;
            playGame();
        }
    }
})

$("#canvas").mousedown(function(e) {
    if (currentScreen == "game" && wonGame == true) {
        //Go to the menu screen
        if(clickButton(e, MENU_BTN)) {
            wonGame = false;
            clearInterval(game_loop);
            currentScreen = "menu";
        }
    }
})