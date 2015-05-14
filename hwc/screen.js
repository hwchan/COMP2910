var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var menuMusic = new Audio('music/menu.mp3');
menuMusic.loop = true;
var PLAY_BTN = {img:menuImg, x:50, y:162, width:205, height:68};

menuImg.onload = function(){
    startGame();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
        playGame();
    }
})

function startGame() {
    ctx.drawImage(menuImg, 0, 0);
    menuMusic.play();
}
                      
function playGame() {
    //delete PLAY_BTN (hacky fix)
    PLAY_BTN.width = 0;
    
    menuMusic.pause();
    music.play();
    paint();
    game_loop = setInterval(tick, 500);
}   