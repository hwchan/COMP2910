//game variables
var score;
var time;

//starts game loop and repaint function

//paint();
//game_loop = setInterval(tick, 100);


//updates game logic
function tick() {
    //updates student positions
    for (var i = 0; i < students.length; ++i) {
        stepStudent(i);
    }
    //spawns a student each tick
    spawnStudents();
    //if all the students have reached their goals player wins
    if (students.length == 0) {
        //win action
    }
    //if time = 0 game failure state
    if (time == 0) {
        //failure action
        clearInterval(game_loop);
    } else {
        //decrements the time
        time -= 1;
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