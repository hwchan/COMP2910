var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
var buttonPosX = (5/48)*w;
var buttonPosY = (162/270)*h;
var buttonSizeX = (205/480)*w;
var buttonSizeY = (68/270)*h;
var PLAY_BTN = {img:menuImg, x: buttonPosX, y: buttonPosY, width: buttonSizeX, height: buttonSizeY};

menuImg.onload = function(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    startGame();
}

function startGame() {
    ctx.drawImage(menuImg, 0, 0, w, h);
    menuMusic.play();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
        playGame();
    }
})
                      
function playGame() {
    //delete PLAY_BTN
    PLAY_BTN = null;
    menuMusic.pause();
    music.play();
    //                          //
    //  sets game variables     //
    //                          //
    //sets a student to spawn every 10 ticks 10 times
    setSpawn(10, 10);
    //sets student period to be 1 to 5 ticks
    setSpeedVariance(5, 1);
    score = 0;
    time = 100;
    game_loop = setInterval(tick, 100);
    paint();
}   