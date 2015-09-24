var inherits  = require('inherits');
var Timepiece = require('./Timepiece.js');

// Treat these like class-level constants. Do not change.
// I'm not sure of the best way to make constants work in ES5...
var SEC_PER_MIN = 60;   // seconds per minute
var MS_PER_SEC  = 1000; // milliseconds per second

inherits(Metronome, Timepiece);

function Metronome() {
  Timepiece.call(this);

  this.bpm = this.toBPM(this.ms);

  this.on('set', function setBPM() {
    this.bpm = this.toBPM(this.ms);
  });
}

/**
 * Convert beats per minute to the number of milliseconds in one beat
 * @param bpm, the musical beats per minute. like a real metronome
 * @return, the duration of one beat, in milliseconds
 */
Metronome.prototype.fromBPM = function(bpm) {
  var msPerMin = SEC_PER_MIN * MS_PER_SEC; // milliseconds per minute
  return msPerMin / bpm;
};

/**
 * Convert milliseconds to beats per minute
 * @param ms, how long it takes to complete one beat, in milliseconds
 * @return, the beats per minute, or `bpm`
 */
Metronome.prototype.toBPM = function(ms) {
  var msPerMin = SEC_PER_MIN * MS_PER_SEC; // milliseconds per minute
  return msPerMin / ms;
};

module.exports = Metronome;