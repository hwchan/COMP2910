var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
var PLAY_BTN = {img:menuImg, x: 2*cw, y: 5*cw, width: 7*cw, height: 3*cw};

menuImg.onload = function(){
	ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    startGame();
}

$("#canvas").on("vmousedown", function(e4){
    if((e4.pageX >= PLAY_BTN.x && e4.pageX <= PLAY_BTN.x+PLAY_BTN.width) && (e4.pageY >= PLAY_BTN.y && e4.pageY <= PLAY_BTN.y+PLAY_BTN.height)) {
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