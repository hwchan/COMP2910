//sets cell width to fraction of height or to a fraction of whichever axis proportionally larger than 16/9
var cw = window.innerHeight / 9;
if (window.innerHeight > window.innerWidth/16*9)
var cw = window.innerWidth / 16;

//sets variables w and h multiple of cell width
var w = cw*16;
var h = cw*9;

var tickPeriod = 50;
var animConst = cw/(60*(tickPeriod/1000));