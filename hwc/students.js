//                  //
// Storage/Spawning //
//                  //

//sets student array
var students = [];

//constructs a student object based on two indexes in the doorsz
function student(spawn, despawn) {
    this.x = doors[spawn].x;
    this.y = doors[spawn].y;
    this.direction = doors[spawn].direction;
    this.goal = despawn;
    this.period = Math.floor(Math.random() * speedRand) + speedConst;
    this.nextStep = this.period;
}

//variable portion of student period
var speedRand;
//minimum portion of student period
var speedConst;
//ticks until next spawn
var spawnIn = 10;

//numer of students to spawn
var spawnNum;
//minimum portion of spawn delay
var spawnConst;

//spawns a set number of students at random intervals and random spawns
function spawnStudents() {
    if (spawnIn == 0) {
        spawnIn = spawnConst;
        //if # students to spawn > 0 spawn student and decrement students to spawn
        if (spawnNum > 0) {
            //creates a new students with a random spawn and despawn
            students.push(new student(Math.floor(Math.random() * doors.length), Math.floor(Math.random() * doors.length)));
            spawnNum--;
        }
    }
    spawnIn--;
}

//function to set mix and min periods for students
function setSpeedVariance(max, min) {
    speedRand = max - min;
    speedConst = min;
}

//function to set number of students to spawn and the spawn delay between each
function setSpawn(num, con) {
    spawnNum = num;
    spawnConst = con;
}


//                  //
//      Drawing     //
//                  //

//student image vars
var student0Img = new Image();
student0Img.src = "images/students/student0.png";
var student0 = {img:student0Img, width:16, height:16};

//draws the student at index i
function drawStudent(i) {
	//ctx.drawImage(student0Img, students[i].x*cw, students[i].y*cw, cw, cw);
	animateSprite(student0, 30, 2, students[i].direction-1, students[i].x*cw, students[i].y*cw);
}


//                  //
//      Logic       //
//                  //

//temp variable to store where the student will step to if not blocked
var xNew;
var yNew;

//updates game logic of student at index i
function stepStudent(i) {
    //changes student direction if their current tile is not empty
    if (gameboard[students[i].y][students[i].x].contents !== 0 && gameboard[students[i].y][students[i].x].contents !== 5) {
        students[i].direction = gameboard[students[i].y][students[i].x].contents;
    }
    //sets new position to current positon
    yNew = students[i].y;
    xNew = students[i].x;
    //modifies new position based on direction
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
    //if student time until next step is 0 or < 0 takes a step 
    if (students[i].nextStep <= 0) {
        students[i].nextStep = students[i].period;
        //sets the students position to the updated position if not blocked or leaving grid
        if (xNew >= 0 && yNew >= 0 && yNew < gameboard.length && xNew < gameboard[0].length) {
            if (gameboard[yNew][xNew].contents !== 5) {
                students[i].x = xNew;
                students[i].y = yNew;
            }
        }
    }
    //if new position is the same as goal deletes the student and adds the current time to the score, if not decrements time until next step
    if (xNew === doors[students[i].goal].x && yNew === doors[students[i].goal].y) {
        students.splice(i, 1);
        score += time;
        //to account for change in index after splicing out student
        i--;
    } else {
        students[i].nextStep--;
    }
}
