//game variables
var score = 0;
var time = 100;
var running = true;

//starts game loop and repaint function
paint();
game_loop = setInterval(tick, 100);
window.addEventListener('keydown',this.check,false);

function check(e) {
    var code = e.keyCode;
    //Up arrow pressed
    if (code == 80) {
        clearInterval(game_loop);
		running = false;
	}
	if (code == 82) {
		if (running == false) {
			game_loop = setInterval(tick, 100); 
			running = true;
		}
	}
}

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