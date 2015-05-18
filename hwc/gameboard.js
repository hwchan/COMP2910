//sets tile constructor array
//0: empty
//1: north
//2: east
//3: south
//4: west
//5: building
var tiles = [
    [0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ],
    [0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0 ],
    [0, 0, 0, 5, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0 ],
    [5, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 0 ],
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
for (var y = 0; y < tiles.length; y++){
    gameboard[y] = [];
    for (var x = 0; x < tiles[0].length; x++){
        gameboard[y][x] = new tile(tiles[y][x]);    
    }
}

//possible spawn and exit coordinates, and associated color
//[xDoor,yDoor,color,direction]
var doors = [];
doors.push(new door(0, 8, "rgba(255,0,0,.5)", 2));
doors.push(new door(12, 0, "rgba(0,255,0,.5)", 4));
doors.push(new door(12, 8, "rgba(0,0,255,.5)", 1));
doors.push(new door(5, 5, "rgba(255,255,0,.5)", 3));

//constructs a door object
function door(x, y, color, direction) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.direction = direction;
}

function drawTile(x, y) {
    switch (gameboard[y][x].contents) {
		case 0:
			ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			break;
		case 1:
			ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(upImg, x * cw, y * cw, cw, cw);
			break;
		case 2:
			ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(rightImg, x * cw, y * cw, cw, cw);
			break;
		case 3:
			ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(downImg, x * cw, y * cw, cw, cw);
			break;
		case 4:
			ctx.drawImage(emptyImg, x * cw, y * cw, cw, cw);
			ctx.drawImage(leftImg, x * cw, y * cw, cw, cw);
			break;
		case 5:
			ctx.fillStyle = "black";
			ctx.fillRect(x * cw, y * cw, cw, cw);
			break;
    }
}

function drawDoor(i) {
    ctx.strokeStyle = doors[i].color;
	ctx.lineWidth=5;
    ctx.strokeRect(doors[i].x * cw, doors[i].y * cw, cw, cw);
}