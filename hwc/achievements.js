//achievement variables
var acheiv1;
var acheiv2;
var acheiv3;

function achievement1() {
	if (acheiv1 != 'true') {
	setAchievement(achvImg0, .85, w/2-cw*2.5, cw*.5, 1500, cw*5, cw*2);
	acheiv1 = 'true';
	document.getElementById("ach1").value = acheiv1;
	}
}

function achievement2() {
	if (acheiv2 != 'true') {
	setAchievement(achvImg1, .85, w/2-cw*2.5, cw*.5, 1500, cw*5, cw*2);
	acheiv2 = 'true';
	document.getElementById("ach2").value = acheiv2;
	}
}

function achievement3() {
	if (acheiv3 != 'true') {
	setAchievement(achvImg2, .85, w/2-cw*2.5, cw*.5, 1500, cw*5, cw*2);
	acheiv3 = 'true';
	document.getElementById("ach3").value = acheiv3;
	}
}