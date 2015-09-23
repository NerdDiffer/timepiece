var inherits = require('inherits');
var Ticker   = require('./ticker.js');

// The ratio of seconds to milliseconds. Do not change this.
var ratio = 60 / 1000;

inherits(Metronome, Ticker);

function Metronome() {
  Ticker.call(this);

  this.bpm = this.toBPM();

  this.on('set', function() {
    this.bpm = this.toBPM();
  });
}

/**
 * Pass in beats per minute & return the number of milliseconds it takes for
 *   one beat to pass.
 * @param bpm, the musical beats per minute. like a real metronome
 * @return, the duration of one beat, in milliseconds
 */
Metronome.prototype.fromBPM = function(bpm) {
  return bpm / ratio;
};

/**
 * Convert from milliseconds to beats per minute
 */
Metronome.prototype.toBPM = function() {
  return this.ms * ratio;
};

module.exports = Metronome;
