//This sets the difficulty
var difficulty = 0;
var maxTime;

//starts the game: gameboard, gameloop, etc.
function playGame(){
	//sets a student to spawn every 10 ticks 10 times
    //setSpawn(1, 10);
    //sets student period to be 1 to 5 ticks
    //setSpeedVariance(1, 1);
	
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
			setSpeedVariance(1, 1);
			break;
		case 2:
			time = 60;
			setSpawn(2, 10);
			setSpeedVariance(2, 1);
			break;
		case 3:
			time = 60;
			setSpawn(3, 10);
			setSpeedVariance(2, 1);
			break;
		case 4:
			time = 50;
			setSpawn(3, 10);
			setSpeedVariance(2, 1);
			break;
		case 5:
			time = 50;
			setSpawn(4, 5);
			setSpeedVariance(3, 1);
			break;
		case 6:
			time = 30;
			setSpawn(4, 5);
			setSpeedVariance(3, 1);
			break;
		case 7:
			time = 30;
			setSpawn(10, 10);
			setSpeedVariance(20, 5);
			break;
	}
	maxTime = time;
    score = 0;
    game_loop = setInterval(tick, tickPeriod);
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
    if (students.length == 0 && Math.round(time) < maxTime-6 ) {
        //win action
		alert("You have defeated this level!");
		clearInterval(game_loop);
    }
    //if time = 0 game failure state
    if (time <= 0) {
        //failure action
		alert("You lose!");
        paused = true;
        clearInterval(game_loop);
    } else {
        //decrements the time
        time -= tickPeriod/1000;
    }
}

//draws frame
function drawGame() {
    //runs paint every display refresh
    //paints map
    /*for(var y = 0; y < gameboard[0].length; ++y) {
        for(var x = 0; x < gameboard.length; ++x) {
            drawTile(y,x);
        }
    }*/
	
	
	
	
	
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
		if(students[i] != null){
			checkGoal(i);
			drawStudent(i);
		}
    }
}