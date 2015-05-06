
//sets student array
var students = [];
students.push(new student(0, 1));
students.push(new student(1, 0));

//sets cell width/2 for drawing circles
var rd = cw / 2;

//temp variable to store where the student will step to if not blocked
var xNew;
var yNew;

//constructs a student object based on two indexes in the doorsz
function student(spawn, despawn) {
    this.x = doors[spawn].x;
    this.y = doors[spawn].y;
    this.direction = doors[spawn].direction;
    this.goal = despawn;
}

//draws the student at index i
function drawStudent(i) {
    ctx.beginPath();
    ctx.arc(students[i].x * cw + rd, students[i].y * cw + rd, rd, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "dimgray";
    ctx.fill();
    ctx.strokeStyle = doors[students[i].goal].color;
    ctx.stroke();
}

//updates game logic of student at index i
function stepStudent(i) {
    //changes student direction if their current tile is not empty
    if (tiles[students[i].y][students[i].x] !== 0) {
        students[i].direction = tiles[students[i].y][students[i].x];
    }
    //computes a new position based on their direction and position
    yNew = students[i].y;
    xNew = students[i].x;
    switch (students[i].direction) {
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
            students[i].x = xNew;
            students[i].y = yNew;
        }
    }
    //if new position is the same as goal deletes the student and adds the current time to the score
    if (xNew == doors[students[i].goal].x && yNew == doors[students[i].goal].y) {
        students.splice(i, 1);
        score += time;
    }
}