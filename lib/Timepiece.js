var EventEmitter = require('events').EventEmitter;
var inherits     = require('inherits');

inherits(Timepiece, EventEmitter);

function Timepiece(ms) {
  EventEmitter.call(this);

  this.ms = (typeof ms == 'undefined' ? 1000 : ms);

  this.on('start', function stopTickerIfActive() {
    var self = this;
    this.ticker = setInterval(function emitTick() {
      self.emit('tick');
    }, this.ms);
  });

  this.on('stop', function stopTickerIfActive() {
    if (this.ticker) {
      clearInterval(this.ticker);
      delete this.ticker;
    }
  });

  this.on('set', function restartTickerIfActive() {
    if (this.ticker) {
      this.emit('stop');
      this.emit('start');
    }
  });
}

Timepiece.prototype.start = function() {
  this.emit('start');
};

Timepiece.prototype.stop = function() {
  this.emit('stop');
};

Timepiece.prototype.set = function(ms) {
  this.ms = ms;
  this.emit('set');
};

module.exports = Timepiece;
