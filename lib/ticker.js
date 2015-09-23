var EventEmitter = require('events').EventEmitter;
var inherits     = require('inherits');

inherits(Ticker, EventEmitter);

function Ticker(ms) {
  EventEmitter.call(this);

  this.ms = (typeof ms == 'undefined' ? 1000 : ms);

  this.on('start', function() {
    var self = this;

    this.ticker = setInterval(function() {
      self.emit('tick');
    }, this.ms);
  });

  this.on('stop', function() {
    clearInterval(this.ticker);
    delete this.ticker;
  });

  this.on('set', function() {
    if (this.ticker) {
      this.emit('stop');
      this.emit('start');
    }
  });
}

Ticker.prototype.start = function() {
  this.emit('start');
};

Ticker.prototype.stop = function() {
  this.emit('stop');
};

Ticker.prototype.set = function(ms) {
  this.ms = ms;
  this.emit('set');
};

module.exports = Ticker;
