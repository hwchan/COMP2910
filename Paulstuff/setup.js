/*************************
	Screen variables
*************************/

//sets cell width to fraction of height or to a fraction of whichever axis proportionally larger than 16/9
var cw = window.innerHeight / 9;
if (window.innerHeight > window.innerWidth/16*9){
	var cw = window.innerWidth / 16;
}

//sets variables w and h multiple of cell width
var w = cw*16;
var h = cw*9;

//prepares the canvas
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
ctx.canvas.width  = w;
ctx.canvas.height = h;
 ctx.mozImageSmoothingEnabled = false;
 ctx.msImageSmoothingEnabled = false;
 ctx.imageSmoothingEnabled = false;


/*************************
	Game variables
*************************/

//game variables
var score;
var time;
var paused = false;

//time and animation constants
var tickPeriod = 100;
var animConst = cw/(60*(tickPeriod/1000));


/*************************
	Game images
*************************/

//sets up sign images
var upImg = new Image();
upImg.src = "images/up.png";
var rightImg = new Image();
rightImg.src = "images/right.png";
var downImg = new Image();
downImg.src = "images/down.png";
var leftImg = new Image();
leftImg.src = "images/left.png";
var emptyImg = new Image();
emptyImg.src = "images/empty.png";




/*************************
	Music and sounds
*************************/

//set gameboard music
var music = new Audio('music/gameplay.mp3');
music.loop = true;

//set sign placed sound
var signplaceSound = new Audio('music/signplace.mp3');




