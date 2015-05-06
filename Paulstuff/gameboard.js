//prepares the canvas
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

//sets up sign images
var upImg = new Image();
upImg.src = "images/up.png";
var rightImg = new Image();
rightImg.src = "images/right.png";
var downImg = new Image();
downImg.src = "images/down.png";
var leftImg = new Image();
leftImg.src = "images/left.png";
var down2Img= new Image();
down2Img.src = "images/down2.png"

//sets map array
//1: north
//2: east
//3: south
//4: west
//5: building
var tiles = [
    [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 4 ],
    [1, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 5, 5, 5, 0, 2, 0, 0, 3, 0 ],
    [0, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 5, 5, 5, 0, 2, 0, 3, 0, 0 ],
    [0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0 ],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0 ],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0 ]
];

//possible spawn and exit coordinates, and associated color
//[xDoor,yDoor,color]
var doors = [
    [0, 8, "red"],
    [12, 0, "green"]
];


//sets cell width based on size of map and resolution
var cw = h / (tiles.length);

function drawTile(x, y) {
    switch (tiles[y][x]) {
    case 0:
        ctx.fillStyle = "whitesmoke";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        break;
    case 1:
        ctx.drawImage(upImg, x * cw, y * cw);
        break;
    case 2:
        ctx.drawImage(rightImg, x * cw, y * cw);
        break;
    case 3:
        ctx.drawImage(downImg, x * cw, y * cw);
        break;
    case 4:
        ctx.drawImage(leftImg, x * cw, y * cw);
        break;
    case 5:
        ctx.fillStyle = "black";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        break;
    }
    ctx.strokeStyle = "lightgray";
    ctx.strokeRect(x * cw, y * cw, cw, cw);
}

function drawDoor(i) {
    ctx.strokeStyle = doors[i][2];
    ctx.strokeRect(doors[i][0] * cw, doors[i][1] * cw, cw, cw);
}