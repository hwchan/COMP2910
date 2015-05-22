//sets tile constructor array
//0: empty
//1: north
//2: east
//3: south
//4: west
//5: building
var tiles = [
    [0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ],
    [0, 0, 5, 5, 0, 5, 0, 5, 5, 5, 5, 0, 5, 5 ],
    [5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0 ],
    [5, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0 ],
    [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 5, 5, 5, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];

//constructs a tile object
function tile(contents) {
    this.contents = contents;
    this.students = [];
    this.img = null;
}

//sets gameboard array
var gameboard = [];

//all possible spawn and exit coordinates
var allDoors = [];
allDoors.push(new door(0, 6, "rgba(255,0,0,.75)", 3));				//red
allDoors.push(new door(4, 7, "rgba(0,255,0,.75)", 2));				//green
allDoors.push(new door(10, 7, "rgba(0,0,255,.75)", 1));				//blue

allDoors.push(new door(7, 5, "rgba(255,255,0,.75)", 3));			//yellow
allDoors.push(new door(0, 3, "rgba(255,0,255,.75)", 2));			//purple
allDoors.push(new door(3, 1, "rgba(0,255,255,.75)", 2));			//cyan

allDoors.push(new door(13, 0, "rgba(255,128,0,.75)", 4));			//orange
allDoors.push(new door(12, 6, "rgba(255, 255, 255, .75)", 1));		//white


//possible current spawn and exit coordinates, and associated color for this level
//[xDoor,yDoor,color,direction]
var doors = [];
//number of doors to have open
var numDoors = 2;

//constructs a door object
function door(x, y, color, direction, active) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.direction = direction;
	this.active = active;
}

function drawTile(x, y) {
    switch (gameboard[y][x].contents) {
		case 0:
			//ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			break;
		case 1:
			//ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(upImg, x * cw, y * cw, cw, cw);
			break;
		case 2:
			//ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(rightImg, x * cw, y * cw, cw, cw);
			break;
		case 3:
			//ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(downImg, x * cw, y * cw, cw, cw);
			break;
		case 4:
			//ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(leftImg, x * cw, y * cw, cw, cw);
			break;
		case 5:
			//ctx.fillStyle = "black";
			//ctx.fillRect(x * cw, y * cw, cw, cw);
			break;
    }
}

function resetGameboard() {

	//reset doors
	for(var i=0; i<doors.length; i++){
		allDoors.push(doors[i]);
	}
	doors = [];
	
	//reset tiles
    for (var y = 0; y < tiles.length; y++){
        gameboard[y] = [];
        for (var x = 0; x < tiles[0].length; x++){
            gameboard[y][x] = new tile(tiles[y][x]);    
        }
    }
	//set doors
	if (numDoors > 8) numDoors = 8;
	for(var i=0; i<numDoors; i++){
		var index = Math.floor(Math.random()*allDoors.length);
		doors.push(allDoors[index]);
		allDoors.splice(index, 1);
	}

}

function drawDoor(i) {
    ctx.strokeStyle = doors[i].color;
	ctx.lineWidth=cw/8;
    ctx.strokeRect(doors[i].x * cw, doors[i].y * cw, cw, cw);
}

resetGameboard();