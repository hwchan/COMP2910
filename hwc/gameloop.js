
	//starts draw loop
	init();

	function init() {	
		//repaints every 60ms
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(step, 100);
        draw_loop = setInterval(paint, 16);
	}
	
	//paint function
	function step() {
		paintGUI();
		//paint students
		for(var i = 0; i < students.length; ++i) {
            stepStudent(i);
		}
	}

	function paint() {
		//Loops through and paints map
		for(var y = 0; y < tiles[0].length; ++y) {
			for(var x = 0; x < tiles.length; ++x) {
				drawTile(y,x);
			}
		}
		//paint GUI
		paintGUI();
		//paint students
		for(var i = 0; i < students.length; ++i) {
			drawStudent(i);
		}
	}

