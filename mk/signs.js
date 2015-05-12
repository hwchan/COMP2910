//if highlight is active and what its current color is
var highlight;
//the sign selected/clicked/dragged
var signPressed = 0;
//which tile the mouse it currently over
var overX;
var overY;
var signplaceSound = new Audio('music/signplace.mp3');

function drawHighlight() {
	if (highlight) {
		if (tiles[overY][overX] == 5) {
			ctx.fillStyle = "rgba(255, 0, 0, .5)";
			ctx.fillRect(overX * cw, overY * cw, cw, cw);
		} else {
			ctx.globalAlpha = 0.5;
			ctx.drawImage(SIGN_BTNS[signPressed-1].img, overX * cw, overY * cw);
			ctx.globalAlpha = 1.0;
		}
	}
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed
$("#canvas").mousedown(function (e) {

    for (var i = 0; i < 4; i++){
        if(clickButton(e, SIGN_BTNS[i])){
            highlight = true;
            signPressed = i+1;
        }
    }
	//delete sign if clicked
	if(tiles[overY][overX] == 1 || tiles[overY][overX] == 2 || tiles[overY][overX] == 3 || tiles[overY][overX] == 4){
		tiles[overY][overX] = 0;
	}
	
})

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
.mouseup(function(e2){
    if(tiles[overY][overX]!=5 && signPressed != 0){
        //assign the selected sign to the tile at the cursor
        tiles[overY][overX] = signPressed;
		signplaceSound.play();
    }
    highlight = false;
    signPressed = 0;
})

.mousemove(function(e3){
    //calculates which tile mouse is currently over
    overX = Math.floor(getMousePos(e3).x / cw);
    overY = Math.floor(getMousePos(e3).y / cw);
})