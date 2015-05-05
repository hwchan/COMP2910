//starts game loop and repaint function
init();
paint();

function init() {	
    //updates game logic every 100ms
    game_loop = setInterval(step, 100);

}

//update game logic
function step() {
    //updates student positions
    for(var i = 0; i < students.length; ++i) {
        stepStudent(i);
    }
}

//draws current state
function paint() {
    requestAnimationFrame(paint);
    //paints map
    for(var y = 0; y < tiles[0].length; ++y) {
        for(var x = 0; x < tiles.length; ++x) {
            drawTile(y,x);
        }
    }
    //paints GUI
    paintGUI();
    //paints students
    for(var i = 0; i < students.length; ++i) {
        drawStudent(i);
    }
}