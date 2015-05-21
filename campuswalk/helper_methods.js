/**
	Returns the mouse/touch position.
		e: mouse event
		return: an gameObject with x and y properties (i.e. getMousePos.x returns x)
**/
function getMousePos(e) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top
	};
}

/**
	Helper method for clicking/tapping button gameObjects.
		e: mouse event
		button: button gameObject i.e. {img, x, y, width, height}
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
		gameObject: the gameObject getting animated (it needs to have a currentFrame var)
		sprite: the full sprite sheet with each row as a different animation
		fps: ticks until next sprite (for now)
		len: number of sprites per animation
		row: the row of the sprite sheet for the animation. starts at 0
		width: sprite width
		height: sprite height
		destX: the x coordinate to draw to
		destY: the y coordinate to draw to
**/
function animateSprite(gameObject, sprite, fps, len, row, width, height, destX, destY, destWidth, destHeight) {
	//the x coordinate of the source sprite
	//e.g. moves between x=0, x=16 every 10 seconds
	//for fps=10, width=16, len=2
	var srcX = width*((Math.floor(gameObject.currentFrame/fps))%len);
	
	//the y coordinate of the source sprite
	var srcY = height*row;
	
	
	//draw it
	ctx.drawImage(sprite, srcX, srcY, width, height, destX, destY, destWidth, destHeight);
	
	//increment counter to handle srcX (which sprite to render)
	gameObject.currentFrame++;
}

function fillPattern(img, w, h) {
    ctx.drawImage(img, 0, 0, w, h);
    while (w < canvas.width) {
        ctx.drawImage(canvas, w, 0);
        w *= 2;
    }
    while (h < canvas.height) {
        ctx.drawImage(canvas, 0, h);
        h *= 2;
    }
}

function drawButton(button) {
    ctx.drawImage(button.img, button.x, button.y, button.width, button.height);
}