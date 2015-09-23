var assert = require('assert');

var Ticker = require('../').Ticker;

describe('Ticker', function() {

  describe('inheriting prototype methods from EventEmitter', function() {
    var t = new Ticker();
    var EventEmitter = require('events').EventEmitter;

    describe('constructors', function() {
      it('constructor of the child object is Ticker', function() {
        assert.equal(t.constructor, Ticker);
      });

      it('super-constructor of Ticker is the EventEmitter', function() {
        assert.equal(t.constructor.super_, EventEmitter);
      });
    });

    describe('prototypes', function() {

      it('prototype of a Ticker object is the prototype of Ticker', function() {
        assert.equal(Object.getPrototypeOf(t), Ticker.prototype);
      });

      it('prototype of the prototype of a Ticker object is the prototype of EventEmitter', function() {
        assert.equal(
          Object.getPrototypeOf(Object.getPrototypeOf(t)),
          EventEmitter.prototype
        );
      });

    });
  });

  describe('#start', function() {

  });

  describe('#stop', function() {

  });

  describe('#set', function() {

  });

});
