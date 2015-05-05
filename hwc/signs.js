
	
	var highlight;
	var highlightColor;
	var overX;
	var overY;
	
	function drawHighlight() {
        ctx.fillStyle = highlightColor;
        ctx.fillRect(overX*cw, overY*cw, cw, cw);
	}
	
	//create a sign on click
	var clickX;
	var clickY;
	$("#canvas").mousedown(function(e) {
		clickX=e.pageX
		clickY=e.pageY
		for(i=0; i<4; i++){
			if(clickX>=SIGN_BTNS[i].x && clickX<=SIGN_BTNS[i].x+SIGN_BTNS[i].width 
			&& clickY>=SIGN_BTNS[i].y && clickY<=SIGN_BTNS[i].y+SIGN_BTNS[i].height){
				highlight = true;
			}
		}
	}).mouseup(function(e2){
		var tempTileX = Math.floor(e2.pageX/(cw+1));
		var tempTileY = Math.floor(e2.pageY/(cw+1));
		if(tiles[tempTileY][tempTileX]!=5){
			//check which sign button is pressed
			for(i=0; i<4; i++){
				if(clickX>=SIGN_BTNS[i].x && clickX<=SIGN_BTNS[i].x+SIGN_BTNS[i].width 
				&& clickY>=SIGN_BTNS[i].y && clickY<=SIGN_BTNS[i].y+SIGN_BTNS[i].height){
					//assign the selected sign to the tile at the cursor
					tiles[tempTileY][tempTileX]=i+1;
				}
			}
		}
		highlight = false;
	}).mousemove(function(e3){
        if (highlight) {
            overX = Math.floor(e3.pageX/(cw+1));
            overY = Math.floor(e3.pageY/(cw+1));
            if (tiles[overY][overX] == 5) {
                highlightColor = "rgba(255, 0, 0, .5)";
            } else {
                highlightColor = "rgba(255, 255, 0, .5)"
            }
        }
	})
