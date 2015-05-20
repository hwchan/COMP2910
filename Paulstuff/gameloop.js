//This sets the difficulty
var difficulty = 7;

//starts the game: gameboard, gameloop, etc.
function playGame(){
	//sets a student to spawn every 10 ticks 10 times
    //setSpawn(1, 10);
    //sets student period to be 1 to 5 ticks
    //setSpeedVariance(1, 1);
	
	switch (difficulty) {
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
    score = 0;
    game_loop = setInterval(tick, tickPeriod);
    paint();
}

//updates game logic
function tick() {
    //updates student positions
    for (var i = 0; i < students.length; ++i) {
        stepStudent(i);
    }
    //spawns a student each tick
    spawnStudents();
    //if all the students have reached their goals player wins
    if (students.length == 0 && Math.round(time) < 20 ) {
        //win action
		music.pause();
		alert("You have completed this level!");
		winMusic.play();
		clearInterval(game_loop);
    }
    //if time = 0 game failure state
    if (time <= 0) {
        //failure action
		music.pause();
		alert("You lose!");
		acheiv1 = true;
		loseMusic.play();
        paused = true;
        clearInterval(game_loop);
		document.forms["achievements"].submit();
    } else {
        //decrements the time
        time -= tickPeriod/1000;
    }
}

//draws frame
function paint() {
    //runs paint every display refresh
    requestAnimationFrame(paint);
    //paints map
    for(var y = 0; y < gameboard[0].length; ++y) {
        for(var x = 0; x < gameboard.length; ++x) {
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