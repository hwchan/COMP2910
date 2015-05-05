$(document).ready(function(){
	//create a sign on click
	$( "#canvas" ).mousedown(function(e) {
		tempX = e.pageX;
		tempY = e.pageY;
		if(tiles[Math.floor(tempY/(cw+1))][Math.floor(tempX/(cw+1))]!=5){
			tiles[Math.floor(tempY/(cw+1))][Math.floor(tempX/(cw+1))]=3;
		}
	})
})