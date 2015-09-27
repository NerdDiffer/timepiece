var inherits  = require('inherits');
var Timepiece = require('./Timepiece.js');

inherits(Stopwatch, Timepiece);

/**
 * Treat this variable like a class-level constant.
 * It is the number of digits after the decimal point.
 * It should be greater than 0 && no greater than 2.
 * Don't expect accuracy to the millisecond.
 */
var PRECISION = 2;

function Stopwatch() {
  Timepiece.call(this);

  this.elapsed = 0;
  this.laps = [];

  this.on('start', function() {
    this.createTimestamp();
  });
  this.on('stop', function() {
    this.updateTimestamp();
  });
  this.on('split', function() {
    this.addSplit();
    this.updateTimestamp();
  });
}

Stopwatch.prototype.hasTimestamp = function() {
  return this.hasOwnProperty('timestamp');
};

Stopwatch.prototype.createTimestamp = function() {
  if (!this.hasTimestamp()) {
    this.timestamp = new Date();
  }
};

Stopwatch.prototype.updateTimestamp = function() {
  if (this.hasTimestamp()) {
    var diff = new Date() - this.timestamp;
    this.elapsed = processTimestamp(diff);
  }
};

Stopwatch.prototype.reset = function() {
  delete this.timestamp;
};

Stopwatch.prototype.split = function() {
  this.emit('split');
};

Stopwatch.prototype.addSplit = function() {
  var diff = new Date() - this.timestamp;
  this.laps.push(processTimestamp(diff));
};

/**
 * - convert milliseconds to seconds
 * - convert to a string version of the number, specified to `PRECISION`
 *   digits after the decimal point.
 *   `PRECISION` is a variable local to this Stopwatch file.
 * - convert back to a floating point number
 * @param t, elapsed time in milliseconds
 * @return, elapsed time in seconds
 */
function processTimestamp(t) {
  return parseFloat((t / 1000).toPrecision(PRECISION));
}

module.exports = Stopwatch;
