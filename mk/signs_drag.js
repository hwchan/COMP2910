//if highlight is active and what its current color is
var highlight;
//the sign selected/clicked/dragged
var signPressed = 0;
//which tile the mouse it currently over
var overX;
var overY;
//offset for placing signs
var signOffsetX = -1;
var signOffsetY = -1;

function drawHighlight() {
	//+2 to fix edge of play area glitch
    if (overX < gameboard[0].length+2) {
        if (highlight) {
			try {
				if (gameboard[overY][overX].contents == 5) {
					ctx.fillStyle = "rgba(255, 0, 0, .5)";
					ctx.fillRect((overX * cw), (overY * cw), cw, cw);
				} else {
					ctx.globalAlpha = 0.5;
					ctx.drawImage(SIGNS[signPressed-1], (overX * cw), (overY * cw), cw, cw);
					ctx.globalAlpha = 1.0;
				}
			} catch(e) {
				//suppress error: do nothing for out of bounds
			}
        }
    }
}

//handles click/touch controls
if (window.navigator.msPointerEnabled) {
	//controls for IE
	var canvas = document.getElementById('canvas');
	canvas.addEventListener("MSPointerDown", function(e){
		mouseDown(e);
	},false);
	canvas.addEventListener("MSPointerUp", function(e){
		mouseUp(e);
	},false);
	canvas.addEventListener("MSPointerMove", function(e){
		mouseMove(e);
	},false);
} else {
	//controls for Chrome and Firefox
	$("#canvas").on("vmousedown", function(e){
		mouseDown(e);
	});
	$("#canvas").on("vmouseup", function(e){
		mouseUp(e);
	});
	$("#canvas").on("vmousemove", function(e){
		mouseMove(e);
	});
}

//select the correct sign pressed or delete a sign
function mouseDown(e) {
    if (currentScreen == "game") {
        getTileOnHover(e);
        //checks if mouse is inside any of the four sign buttons when clicked,
        //if yes sets highlight to true and saves which sign was pressed
        for (var i = 0; i < 4; i++){
            if(clickButton(e, SIGN_BTNS[i])){
                highlight = true;
                signPressed = i+1;
                e.preventDefault();
            }
        }
        //delete sign if clicked
        try {
            var contents = gameboard[overY-signOffsetY][overX-signOffsetX].contents;
            if(contents == 1 || contents == 2 || contents == 3 || contents == 4){
                gameboard[overY-signOffsetY][overX-signOffsetX].contents = 0;
            }
        } catch(e) {
            //suppress error: do nothing for out of bounds
        }
    }
}

//handle placing the sign
function mouseUp(e) {
    if (currentScreen == "game") {
        //checks if a tile can be set at the current cursor position, 
        //if it can be placed it places the tile stored
        //
        //it then sets the tile stored to an empty space and removes highlight if any
        try {
            if (overX != null && overY != null) {
                if(gameboard[overY][overX].contents !=5 && signPressed != 0){
                    //assign the selected sign to the tile at the cursor
                    gameboard[overY][overX].contents = signPressed;
                    signplaceSound.play();
                    e.preventDefault();
                }
            }
        } catch(e) {
            //suppress error: do nothing for out of bounds
        }
        highlight = false;
        signPressed = 0;
    }
}

//handle sign highlight
function mouseMove(e) {
    if (currentScreen == "game") {
	   getTileOnHover(e);
    }
}

function getTileOnHover(e){
	//calculates which tile mouse is currently over
    overX = Math.floor(getMousePos(e).x / cw) + signOffsetX;
    overY = Math.floor(getMousePos(e).y / cw) + signOffsetY;
}