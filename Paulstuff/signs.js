//if highlight is active and what its current color is
var highlight;
//the sign selected/clicked/dragged
var signPressed = 0;
//which tile the mouse it currently over
var overX;
var overY;
var overX2;
var overY2;
var overX3;
var overY3;
var signplaceSound = new Audio('music/signplace.mp3');

function drawHighlight() {
    if (overX3 < gameboard[0].length) {
        if (highlight) {
            if (gameboard[overY3-1][overX3-1].contents == 5) {
                ctx.fillStyle = "rgba(255, 0, 0, .5)";
                ctx.fillRect((overX3 * cw)-cw, (overY3 * cw)-cw, cw, cw);
            } else {
                ctx.globalAlpha = 0.5;
                ctx.drawImage(SIGN_BTNS[signPressed-1].img, (overX3 * cw)-cw, (overY3 * cw)-cw);
                ctx.globalAlpha = 1.0;
            }
        }
    }
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed
var box1 = document.getElementById('canvas')
$("#canvas").on("vmousedown", function(e){

    for (var i = 0; i < 4; i++){
        if((e.pageX >= SIGN_BTNS[i].x && e.pageX <= (SIGN_BTNS[i].x+cw)) && (e.pageY >= SIGN_BTNS[i].y && e.pageY <= (SIGN_BTNS[i].y+cw))) {
            highlight = true;
            signPressed = i+1;
				e.preventDefault();
        }
    }
	overX = Math.floor(e.pageX / cw);
    overY = Math.floor(e.pageY / cw);
	//delete sign if clicked
	if(gameboard[overY][overX].contents == 1 || gameboard[overY][overX].contents == 2 || gameboard[overY][overX].contents == 3 || gameboard[overY][overX].contents == 4){
		gameboard[overY][overX].contents = 0;
	}
})

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
$("#canvas").on("vmouseup", function(e2){
	    overX2 = Math.floor(e2.pageX / cw);
		overY2 = Math.floor(e2.pageY / cw);
    if(gameboard[overY3-1][overX3-1].contents!=5 && signPressed != 0){
        //assign the selected sign to the tile at the cursor
        gameboard[overY3-1][overX3-1].contents = signPressed;
        signplaceSound.play();
		e2.preventDefault();
    }
    highlight = false;
    signPressed = 0;
})

$("#canvas").on("vmousemove", function(e3){
    //calculates which tile mouse is currently over
    overX3 = Math.floor(e3.pageX / cw);
    overY3 = Math.floor(e3.pageY / cw);
			e3.preventDefault();
})