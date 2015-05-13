//counter for current image (frame) for the animation
var count = 0;

//Animates from column-0 to column-len
//fps: ticks until next image (for now)
//len: number of images per animation
function animateSprite(sprite, fps, len, row, destX, destY) {
	//the x coordinate of the source image
	//e.g. moves between x=0, x=16 every 10 seconds
	//for fps=10, width=16, len=2
	var srcX = sprite.width*((Math.floor(count/fps))%len);
	
	//the y coordinate of the source image
	var srcY = sprite.height*row;
	
	ctx.drawImage(sprite.img, srcX, srcY, sprite.width, sprite.height, destX, destY, sprite.width, sprite.height);
	
	count++;
}