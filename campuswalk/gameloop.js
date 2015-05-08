//game variables
var score = 0;
var time = 100;


//starts game loop and repaint function

//paint();
//game_loop = setInterval(tick, 100);


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