//if highlight is active and what its current color is
var highlight;
var highlightColor;
//which tile to set when one clicks
var signPressed = 0;
//which tile the user clicks
var clickX;
var clickY;
//which tile the mouse it currently over
var overX;
var overY;

function drawHighlight() {
	    if (highlight) {
        if (tiles[overY][overX] == 5) {
            ctx.fillStyle = "rgba(255, 0, 0, .5)";
			ctx.fillRect(overX * cw, overY * cw, cw, cw);
        } else if(clickX - 8 >= SIGN_BTNS[0].x && clickX - 8 <= SIGN_BTNS[0].x + SIGN_BTNS[0].width 
        && clickY - 8 >= SIGN_BTNS[0].y && clickY - 8 <= SIGN_BTNS[0].y + SIGN_BTNS[0].height) {
			ctx.drawImage(upImg, overX * cw, overY * cw);
        }  else if(clickX - 8 >= SIGN_BTNS[1].x && clickX - 8 <= SIGN_BTNS[1].x + SIGN_BTNS[1].width 
        && clickY - 8 >= SIGN_BTNS[1].y && clickY - 8 <= SIGN_BTNS[1].y + SIGN_BTNS[1].height) {
			ctx.drawImage(rightImg, overX * cw, overY * cw);
        } else if(clickX - 8 >= SIGN_BTNS[2].x && clickX - 8 <= SIGN_BTNS[2].x + SIGN_BTNS[2].width 
        && clickY - 8 >= SIGN_BTNS[2].y && clickY - 8 <= SIGN_BTNS[2].y + SIGN_BTNS[2].height) {
			ctx.drawImage(down2Img, overX * cw, overY * cw);
        } else if(clickX - 8 >= SIGN_BTNS[3].x && clickX - 8 <= SIGN_BTNS[3].x + SIGN_BTNS[3].width 
        && clickY - 8 >= SIGN_BTNS[3].y && clickY - 8 <= SIGN_BTNS[3].y + SIGN_BTNS[3].height) {
			ctx.drawImage(leftImg, overX * cw, overY * cw);
        }
    }
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed
$("#canvas").mousedown(function (e) {
    //-8 offset is to compensate the game board being 8px away from the screen edge
	clickX = e.pageX;
	clickY = e.pageY;
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
})