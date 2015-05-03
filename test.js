$(document).ready(function(){
	//prepares the canvas
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//sets map array
	//
	//0 = empty
	//1-4 = sign
	//5 = blocking
    var tiles = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0,],
    [0, 0, 0, 0, 5, 5, 5, 5, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 5, 5, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 5, 0, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 5, 0, 5, 0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 5, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
	];

	//sets cell width
	var cw = w/tiles[0].length;

	//starts draw loop
	init();




function init() {	
	//repaints every 60ms
	if(typeof game_loop != "undefined") clearInterval(game_loop);
	game_loop = setInterval(paint, 60);
	}
		
	//paint function
function paint() {
	//background color
	ctx.fillStyle = "whitesmoke";
	ctx.fillRect(0, 0, w, h);
	//border color
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
	//Loops through and paints tiles
	for(var x = 0; x < tiles[0].length; ++x) {
    	for(var y = 0; y < tiles.length; ++y) {
    		if (tiles[y][x] != 0)
        	drawTile(y,x);
    		}
		}
	}
		
function drawTile(y, x)
	{
	switch (tiles[y][x]) {
    	case 1:
        ctx.fillStyle = "red";
        break;
    	case 2:
        ctx.fillStyle = "green";
        break;
    	case 3:
        ctx.fillStyle = "blue";
        break;
    	case 4:
        ctx.fillStyle = "yellow";
        break;
    	case 5:
        ctx.fillStyle = "grey";
        break;
		}
		//-1 and -2 offsets are to add a "stroke" around tiles
		ctx.fillRect(x*cw+1, y*cw+1, cw-2, cw-2);
	}
	
})