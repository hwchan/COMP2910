var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
var PLAY_BTN = {img:menuImg, x:0, y:0, width:cw*16, height:cw*9};

menuImg.onload = function(){
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    startGame();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
        playGame();
    }
})

function startGame() {
    ctx.drawImage(menuImg, 0, 0, cw*16, cw*9);
    menuMusic.play();
}
                      
function playGame() {
    //delete PLAY_BTN (hacky fix)
    PLAY_BTN.width = 0;
    
    menuMusic.pause();
    music.play();
    paint();
    //sets the spawn variables to spawn 10 students every 10 - 1 ticks
    setSpawn(10, 10, 1);
    //sets student period to be 5 - 1
    setSpeedVariance(10, 1);
    game_loop = setInterval(tick, 100);
}   