//counter for current sprite (frame) for the animation
var count = 0;

//Animates from column-0 to column-len on a row.  
////sprite: the full sprite sheet with each row as a different animation
////fps: ticks until next sprite (for now)
////len: number of sprites per animation
////row: the row of the sprite sheet for the animation. starts at 0
////destX: the x coordinate to draw to
////destY: the y coordinate to draw to
function animateSprite(sprite, fps, len, row, destX, destY) {
	//the x coordinate of the source sprite
	//e.g. moves between x=0, x=16 every 10 seconds
	//for fps=10, width=16, len=2
	var srcX = sprite.width*((Math.floor(count/fps))%len);
	
	//the y coordinate of the source sprite
	var srcY = sprite.height*row;
	
	//draw it
	ctx.drawImage(sprite.img, srcX, srcY, sprite.width, sprite.height, destX, destY, sprite.width, sprite.height);
	
	//increment counter to handle srcX (which sprite to render)
	count++;
}