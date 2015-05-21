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
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

var currentScreen = "menu";


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
emptyImg.src = "images/grass0.png";
var SIGNS = [upImg, rightImg, downImg, leftImg];



/*************************
	Music and sounds
*************************/

//set gameboard music
//Retro Hearts (8th Sense Remix) - Skullbeatz
//http://www.newgrounds.com/audio/listen/557827
//var music = new Audio('music/gameplay2.mp3');
//-Jumper- - Waterflame
//http://www.newgrounds.com/audio/listen/168734
var music = new Audio('music/gameplay3.mp3');
music.loop = true;

//sign placed sound
var signplaceSound = new Audio('music/signplace.mp3');
//button click sound
var clickSound = new Audio('music/click.mp3');
//sign select sound
var signclicked = new Audio('music/pickup.wav');
//despawn sound
var despawn = new Audio('music/despawn.mp3');
//victory sound
var victory = new Audio('music/victory.mp3');
//game over sound
var lose = new Audio('music/gameover.mp3');
//complete game sound
var complete = new Audio('music/complete.mp3');


