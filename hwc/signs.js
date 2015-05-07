//if highlight is active and what its current color is
var highlight;
var highlightColor;
//which tile to set when one clicks
var signPressed = 0;
//which tile the mouse it currently over
var overX;
var overY;

function drawHighlight() {
    ctx.fillStyle = highlightColor;
    ctx.fillRect(overX * cw, overY * cw, cw, cw);
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed
$("#canvas").mousedown(function (e) {
    for (var i = 0; i < 4; i++){
        if(clickButton(e, SIGN_BTNS[i])){
            highlight = true;
            signPressed = i + 1;
        }
    }
})

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
.mouseup(function(e2){
    if(tiles[overY][overX]!=5){
        //assign the selected sign to the tile at the cursor
        tiles[overY][overX] = signPressed;
    }
    highlight = false;
    signPressed = 0;
})

.mousemove(function(e3){
    //calculates which tile mouse is currently over
    overX = Math.floor(getMousePos(e3).x / cw);
    overY = Math.floor(getMousePos(e3).y / cw);
    //if highlight is true checks whether tile can be placed at current cursor location,
    //and sets the highlight color to reflect this
    if (highlight) {
        if (tiles[overY][overX] == 5) {
            highlightColor = "rgba(255, 0, 0, .5)";
        } else {
            highlightColor = "rgba(255, 255, 0, .5)"
        }
    }
})