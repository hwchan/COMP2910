//game variables
var score = 0;
var difficulty = 7;

var time;

//time for each level scales with difficulty
switch (difficulty) {
    case 1:
		time = 60;
		break;
    case 2:
        time = 60;
		break;
    case 3:
        time = 60;
		break;
    case 4:
        time = 50;
		break;
    case 5:
        time = 40;
		break;
    case 6:
        time = 30;
		break;
    case 7:
        time = 30;
		break;
}




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
	
	//This sets the difficulty levels
	switch (difficulty) {
		case 2:
			if (Math.round(time*100) == 5500) {
				doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
				students.push(new student(2, 2));
			}
			break;
		case 3:
			switch (Math.round(time*100)) {
				case 5500:
					doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
					students.push(new student(2, 2));
					break;
				case 5000:
					doors.push(new door(Math.floor(Math.random() * 12), 2, "pink", 4));
					students.push(new student(3, 3));
					break;
			}
			break;
		case 4:
			switch (Math.round(time*100)) {
				case 4500:
					doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
					students.push(new student(2, 2));
					break;
				case 4000:
					doors.push(new door(Math.floor(Math.random() * 12), 2, "pink", 4));
					students.push(new student(3, 3));
					break;
				case 3500:
					doors.push(new door(Math.floor(Math.random() * 12), 3, "yellow", 4));
					students.push(new student(4, 4));
					break;
				case 3000:
					doors.push(new door(Math.floor(Math.random() * 12), 4, "yellow", 4));
					students.push(new student(5, 5));
					break;
			}
			break;
		case 5:
			switch (Math.round(time*100)) {
				case 3500:
					doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
					students.push(new student(2, 2));
					break;
				case 3000:
					doors.push(new door(Math.floor(Math.random() * 12), 2, "pink", 4));
					students.push(new student(3, 3));
					break;
				case 2500:
					doors.push(new door(Math.floor(Math.random() * 12), 3, "yellow", 4));
					students.push(new student(4, 4));
					break;
				case 2000:
					doors.push(new door(Math.floor(Math.random() * 12), 4, "yellow", 4));
					students.push(new student(5, 5));
					break;
			}
			break;
		case 6:
			switch (Math.round(time*100)) {
				case 2500:
					doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
					students.push(new student(2, 2));
					break;
				case 2000:
					doors.push(new door(Math.floor(Math.random() * 12), 2, "pink", 4));
					students.push(new student(3, 3));
					break;
				case 1500:
					doors.push(new door(Math.floor(Math.random() * 12), 3, "yellow", 4));
					students.push(new student(4, 4));
					break;
			}
			break;			
		case 7:
			switch (Math.round(time*100)) {
				case 2500:
					doors.push(new door(Math.floor(Math.random() * 12), 1, "green", 4));
					students.push(new student(2, 2));
					break;
				case 2000:
					doors.push(new door(Math.floor(Math.random() * 12), 2, "pink", 4));
					students.push(new student(3, 3));
					break;
				case 1500:
					doors.push(new door(Math.floor(Math.random() * 12), 3, "yellow", 4));
					students.push(new student(4, 4));
					break;
				case 1000:
					doors.push(new door(Math.floor(Math.random() * 12), 4, "yellow", 4));
					students.push(new student(5, 5));
					break;
			}
			break;
	}

    //if all the students have reached their goals player wins
    if (students.length == 0) {
		alert("You have defeated this level!");
        //win action
    }
	if (students.length != 0 && Math.round(time*100) == 0) {
		clearInterval(game_loop);
		alert("You lose!");
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