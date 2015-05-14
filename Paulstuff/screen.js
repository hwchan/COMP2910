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
    startGame();
}

$("#canvas").on("vmousedown", function(e4){
    if((e4.pageX >= buttonPosX && e4.pageX <= buttonPosX+buttonSizeX) && (e4.pageY >= buttonPosY && e4.pageY <= buttonPosY+buttonSizeY)) {
        playGame();
    }
})

function startGame() {
        ctx.drawImage(menuImg, 0, 0, w, h);
    menuMusic.play();
}
                      
function playGame() {
    //delete PLAY_BTN (hacky fix)
    PLAY_BTN.width = 0;
    
    menuMusic.pause();
    music.play();
    paint();
    game_loop = setInterval(tick, 100);
}   