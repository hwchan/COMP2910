var menuImg = new Image();
menuImg.src = "images/walk.jpg";
var PLAY_BTN = {img:menuImg, x:50, y:162, width:205, height:68};

menuImg.onload = function(){
    startGame();
}

$("#canvas").mousedown(function(e) {
    if(clickButton(e, PLAY_BTN)) {
        startGame();
    }
})

function startGame() {
    ctx.drawImage(menuImg, 0, 0);
}
                      
function playGame() {
    paint();
    game_loop = setInterval(tick, 100);
}   