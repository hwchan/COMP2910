//helper method to get the mouse position relative to the canvas element
function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

//helper method for clicking button objects {img, x, y, width, height}
function clickButton(e, button){
	if(getMousePos(e).x >= button.x && getMousePos(e).x <= button.x + button.width 
        && getMousePos(e).y >= button.y && getMousePos(e).y <= button.y + button.height){
		return true;
	} else {
		return false;
	}
}