/**
	Returns the mouse/touch position.
		e: mouse event
		return: an object with x and y properties (i.e. getMousePos.x returns x)
**/
function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

/**
	Helper method for clicking/tapping button objects.
		e: mouse event
		button: button object i.e. {img, x, y, width, height}
		return: true if the button was clicked/tapped
**/
function clickButton(e, button){
    if (button != null) {
        if(getMousePos(e).x >= button.x && getMousePos(e).x <= button.x + button.width 
            && getMousePos(e).y >= button.y && getMousePos(e).y <= button.y + button.height){
            return true;
        } else {
            return false;
        }
    }
}

/**
	Animates from column-0 to column-len on a row.  
		object: the object getting animated (it needs to have a currentFrame var)
		sprite: the full sprite sheet with each row as a different animation
		fps: ticks until next sprite (for now)
		len: number of sprites per animation
		row: the row of the sprite sheet for the animation. starts at 0
		destX: the x coordinate to draw to
		destY: the y coordinate to draw to
**/
function animateSprite(object, sprite, fps, len, row, destX, destY) {
	//the x coordinate of the source sprite
	//e.g. moves between x=0, x=16 every 10 seconds
	//for fps=10, width=16, len=2
	var srcX = sprite.width*((Math.floor(object.currentFrame/fps))%len);
	
	//the y coordinate of the source sprite
	var srcY = sprite.height*row;
	
	//draw it
	ctx.drawImage(sprite.img, srcX, srcY, sprite.width, sprite.height, destX, destY, sprite.width, sprite.height);
	
	//increment counter to handle srcX (which sprite to render)
	object.currentFrame++;
}