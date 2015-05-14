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
    if (overX3 < gameboard[0].length+2)/*+2 to fix edge of play area glitch*/ {
        if (highlight) {
			try{
				if (gameboard[overY3-1][overX3-1].contents == 5) {
					ctx.fillStyle = "rgba(255, 0, 0, .5)";
					ctx.fillRect((overX3 * cw)-cw, (overY3 * cw)-cw, cw, cw);
				} else {
					ctx.globalAlpha = 0.5;
					ctx.drawImage(SIGN_BTNS[signPressed-1].img, (overX3 * cw)-cw, (overY3 * cw)-cw, cw, cw);
					ctx.globalAlpha = 1.0;
				}
			}
			catch(e){
			//suppress error	
			}
        }
    }
}

//checks if mouse is inside any of the four sign buttons when clicked,
//if yes sets highlight to true and saves which sign was pressed

//code for IE
var canvas = document.getElementById('canvas')
if (window.navigator.msPointerEnabled) {
canvas.addEventListener("MSPointerDown", function(e){
	overX = Math.floor(e.clientX / cw);
    overY = Math.floor(e.clientY / cw);
	
    for (var i = 0; i < 4; i++){
        if((e.clientX >= SIGN_BTNS[i].x && e.clientX <= (SIGN_BTNS[i].x+cw)) && (e.clientY >= SIGN_BTNS[i].y && e.clientY <= (SIGN_BTNS[i].y+cw))) {
            highlight = true;
            signPressed = i+1;
				e.preventDefault();
        }
    }
	try {
		//delete sign if clicked
		if(gameboard[overY][overX].contents == 1 || gameboard[overY][overX].contents == 2 || gameboard[overY][overX].contents == 3 || gameboard[overY][overX].contents == 4){
			gameboard[overY][overX].contents = 0;
		}
	}
	catch(e) {
		//suppress error	
	}
},false)

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
canvas.addEventListener("MSPointerUp", function(e2){
	overX2 = Math.floor(e2.clientX / cw);
	overY2 = Math.floor(e2.clientY / cw);
    try {
		if(gameboard[overY3-1][overX3-1].contents!=5 && signPressed != 0){
			//assign the selected sign to the tile at the cursor
			gameboard[overY3-1][overX3-1].contents = signPressed;
			signplaceSound.play();
			e2.preventDefault();
		}
	}
	catch(e){
		
	}
    highlight = false;
    signPressed = 0;
},false)

canvas.addEventListener("MSPointerMove", function(e3){
    //calculates which tile mouse is currently over
    overX3 = Math.floor(e3.clientX / cw);
    overY3 = Math.floor(e3.clientY / cw);
},false)
} else {
	//code for chrome+Firefox
$("#canvas").on("vmousedown", function(e){
	overX = Math.floor(e.clientX / cw);
    overY = Math.floor(e.clientY / cw);
	
    for (var i = 0; i < 4; i++){
        if((e.clientX >= SIGN_BTNS[i].x && e.clientX <= (SIGN_BTNS[i].x+cw)) && (e.clientY >= SIGN_BTNS[i].y && e.clientY <= (SIGN_BTNS[i].y+cw))) {
            highlight = true;
            signPressed = i+1;
				e.preventDefault();
        }
    }
	try {
		//delete sign if clicked
		if(gameboard[overY][overX].contents == 1 || gameboard[overY][overX].contents == 2 || gameboard[overY][overX].contents == 3 || gameboard[overY][overX].contents == 4){
			gameboard[overY][overX].contents = 0;
		}
	}
	catch(e) {
		//suppress error	
	}
})

//checks if a tile can be set at the current cursor position, 
//if it can be placed it places the tile stored
//
//it then sets the tile stored to an empty space and removes highlight if any
$("#canvas").on("vmouseup", function(e2){
	overX2 = Math.floor(e2.clientX / cw);
	overY2 = Math.floor(e2.clientY / cw);
	try {
		if(gameboard[overY3-1][overX3-1].contents!=5 && signPressed != 0){
			//assign the selected sign to the tile at the cursor
			gameboard[overY3-1][overX3-1].contents = signPressed;
			signplaceSound.play();
			e2.preventDefault();
		}
	}
	catch(e){
		//suppress error
	}
    highlight = false;
    signPressed = 0;
})

$("#canvas").on("vmousemove", function(e3){
    //calculates which tile mouse is currently over
    overX3 = Math.floor(e3.clientX / cw);
    overY3 = Math.floor(e3.clientY / cw);
})
};