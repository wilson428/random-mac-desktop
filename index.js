const fs = require('fs');
const Canvas = require('canvas');
const applescript = require('applescript');
const randomWalk = require('./random-walks');

var argv = require('minimist')(process.argv.slice(2));

var width = argv.w || argv.width;
var height = argv.h || argv.height;
var steps = argv.steps;
var size = argv.step_size;

if (!width) {
	console.log("Defaulting to width of", sr[0]);
	width = sr[0];
}

if (!height) {
	console.log("Defaulting to height of", sr[1]);
	height = sr[1];
}

if (!steps) {
	console.log("Defaulting to 1,000,000 steps");
	steps = 1000000;
}

if (!size) {
	console.log("Defaulting to step size of 4");
	size = 4;
}

var canvas = new Canvas(width, height);
canvas.width = width;
canvas.height = height;

var walk = randomWalk(canvas, steps, width, height, size);

var context = walk.draw();

var d = new Date();
var slug = d.toLocaleDateString() + "-" + d.toLocaleTimeString().replace(/:/g, "-");
var filename = "randomWalk_" + slug + "_" + steps + "_" + size + "_" + width + "_x_" + height + ".png";
var fullpath = "/Users/wilson/Pictures/randomImages/" + filename;

const out = fs.createWriteStream(fullpath)
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created at ' + fullpath))