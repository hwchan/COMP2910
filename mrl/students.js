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
    this.nextStep = 0;
	this.currentFrame = 0;
    this.animX = this.x * cw;
    this.animY = this.y * cw;
    this.blocked = true;
}

//variable portion of student period
var speedRand;
//minimum portion of student period
var speedConst;
//ticks until next spawn
var spawnIn = 0;

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
var student0 = {img:student0Img, width:32, height:32};

//draws the student at index i
function drawStudent(i) {
    if (!students[i].blocked && !paused) {
        switch (students[i].direction) {
        case 1:
            students[i].animY -= animConst/students[i].period;
            break;
        case 2:
            students[i].animX += animConst/students[i].period;
            break;
        case 3:
            students[i].animY += animConst/students[i].period;
            break;
        case 4:
            students[i].animX -= animConst/students[i].period;
            break;
        }
    } else {
        students[i].animX = students[i].animX;
        students[i].animY = students[i].animY;
    }  
	animateSprite(students[i], student0, 30, 2, students[i].direction-1, students[i].animX, students[i].animY);
}


//                  //
//      Logic       //
//                  //

//temp variable to store where the student will step to if not blocked
var xNew;
var yNew;

//updates game logic of student at index i
function stepStudent(i) {
    //if student time until next step is 0 or < 0 takes a step 
    if (students[i].nextStep <= 0) {
        //sets the time until next step to period
        students[i].nextStep = students[i].period;
        //sets animation position to current positon
        students[i].animX = students[i].x * cw;
        students[i].animY = students[i].y * cw;
        //sets new position to current positon
        yNew = students[i].y;
        xNew = students[i].x;
        
        //changes student direction if their current tile is not empty
        if (gameboard[students[i].y][students[i].x].contents !== 0 && gameboard[students[i].y][students[i].x].contents !== 5) {
            students[i].direction = gameboard[students[i].y][students[i].x].contents;
        }
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
        
        //sets student to blocked, unset if they are not blocked
        students[i].blocked = true;
        //sets the students position to the updated position if not blocked or leaving grid
        if (xNew >= 0 && yNew >= 0 && yNew < gameboard.length && xNew < gameboard[0].length) {
            if (gameboard[yNew][xNew].contents !== 5) {
                students[i].x = xNew;
                students[i].y = yNew;
                students[i].blocked = false;
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