
	//sets student array
	//[x,y,d]
	var students = [
	[0, 0, 2 ],
	[6, 4, 4 ],
	[0, 3, 2 ],
	[8, 5, 2 ],
	[4, 1, 2 ],
	[8, 8, 4 ]
	];

	//sets cell width/2 for drawing circles
	var rd = cw/2;

	function drawStudent(i) {
		ctx.beginPath();
		ctx.arc(students[i][0]*cw+rd, students[i][1]*cw+rd, rd, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fillStyle = "dimgray";
		ctx.fill();
	}

	function stepStudent(i) {
		yNext = students[i][1];
		xNext = students[i][0];
		if (tiles[students[i][1]][students[i][0]] != 0) {
			students[i][2] = tiles[students[i][1]][students[i][0]];
		}
		switch (students[i][2]) {
			case 1:
			yNext--;
			break;
			case 2:
			xNext++;
			break;
			case 3:
			yNext++;
			break;
			case 4:
			xNext--;
			break;
		}
        if (xNext >= 0 && yNext >= 0 && yNext < tiles.length && xNext < tiles[0].length) {
            if (tiles[yNext][xNext] != 5) {
                students[i][0] = xNext;
                students[i][1] = yNext; 
            }
        }
	}
