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
    //-8 offset is to compensate the game board being 8px away from the screen edge
    for (var i = 0; i < 4; i++){
        if(e.pageX - 8 >= SIGN_BTNS[i].x && e.pageX - 8 <= SIGN_BTNS[i].x + SIGN_BTNS[i].width 
        && e.pageY - 8 >= SIGN_BTNS[i].y && e.pageY - 8 <= SIGN_BTNS[i].y + SIGN_BTNS[i].height){
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
    //
    //-8 offset is to compensate the game board being 8px away from the screen edge
    overX = Math.floor((e3.pageX - 8) / cw);
    overY = Math.floor((e3.pageY - 8) / cw);
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