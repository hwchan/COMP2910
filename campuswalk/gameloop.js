//This sets the difficulty
var difficulty = 1;
var maxTime;
var overlay = false;
var lvl2 = new Image();
var lvl3 = new Image();
var lvl4 = new Image();
var lvl5 = new Image();
var lvl6 = new Image();
var lvl7 = new Image();

var pauseScreen = new Image();
pauseScreen.src = "images/overlays/paused.png";

lvl2.src = "images/overlays/lvl2.png";
lvl3.src = "images/overlays/lvl3.png";
lvl4.src = "images/overlays/lvl4.png";
lvl5.src = "images/overlays/lvl5.png";
lvl6.src = "images/overlays/lvl6.png";
lvl7.src = "images/overlays/lvl7.png";

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
	victory.play();
    clearInterval(game_loop);
    setTimeout(nxtLevel, 5000);  // 5 seconds
}

function nxtLevel() {
    spawnIn = 0;
    difficulty++;
	playGame();
    overlay = false;
}

//Global draw loop
function paint() {
    //runs paint every display refresh
    requestAnimationFrame(paint);
    //checks current screen and draws it
    switch (currentScreen) {
		case "menu":
			drawMenu();
			break;
        case "game":
			drawGame();
            if (paused) {
				drawPaused();
            }
			break;
		case "lose":
			drawLostGame();
			break;
	}
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
		complete.play();
		alert("You have defeated this game!");
		clearInterval(game_loop);
    } else if (students.length == 0) {
		showOverlay();
	}
    
    
    //if time = 0 game failure state
    if (time <= 0) {
        //failure action
        clearInterval(game_loop);
		currentScreen = "lose";
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