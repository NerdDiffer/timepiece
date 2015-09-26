var inherits  = require('inherits');
var Timepiece = require('./Timepiece.js');

inherits(Stopwatch, Timepiece);

function Stopwatch() {
  // emits 100 'tick' events per second
  Timepiece.call(this, 10);

  this.time = 0;

  this.on('tick', function increment() {
    this.time += 0.01;
  });
}

module.exports = Stopwatch;
