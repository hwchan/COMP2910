
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

//student image vars
var student0Img = new Image();
student0Img.src = "images/students/student0.png";

//draws the student at index i
function drawStudent(i) {
//    ctx.beginPath();
//    ctx.arc(students[i][0] * cw + rd, students[i][1] * cw + rd, rd, 0, Math.PI * 2, true);
//    ctx.closePath();
//    ctx.fillStyle = "dimgray";
//    ctx.fill();
//    ctx.strokeStyle = doors[students[i][3]][2];
//    ctx.stroke();
	
	//holy crap arrays as objects are hard to understand
	ctx.drawImage(student0Img, students[i][0]*cw, students[i][1]*cw);
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
