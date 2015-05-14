//sets cell width to whichever axis proportionally larger than 16/9
var cw = window.innerHeight / 9;
if (window.innerHeight > window.innerWidth/16*9)
var cw = window.innerWidth / 16;