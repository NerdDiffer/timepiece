var EventEmitter = require('events').EventEmitter;
var inherits     = require('inherits');

inherits(Timepiece, EventEmitter);

function Timepiece(ms) {
  EventEmitter.call(this);

  this.ms = (typeof ms == 'undefined' ? 1000 : ms);

  this.on('stop', function() {
    if (this.ticker) {
      clearInterval(this.ticker);
      delete this.ticker;
    }
  });

  this.on('set', function() {
    if (this.ticker) {
      this.emit('stop');
      this.emit('start');
    }
  });
}

Timepiece.prototype.start = function() {
  this.emit('start');
  var self = this;

  this.ticker = setInterval(function() {
    self.emit('tick');
  }, this.ms);
};

Timepiece.prototype.stop = function() {
  this.emit('stop');
};

Timepiece.prototype.set = function(ms) {
  this.ms = ms;
  this.emit('set');
};

module.exports = Timepiece;
