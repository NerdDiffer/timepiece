var assert = require('assert');

var Timepiece = require('../').Timepiece;

describe('Timepiece', function() {

  describe('inheriting prototype methods from EventEmitter', function() {
    var t = new Timepiece();
    var EventEmitter = require('events').EventEmitter;

    describe('constructors', function() {
      it('constructor of the child object is Timepiece', function() {
        assert.equal(t.constructor, Timepiece);
      });

      it('super-constructor of Timepiece is the EventEmitter', function() {
        assert.equal(t.constructor.super_, EventEmitter);
      });
    });

    describe('prototypes', function() {

      it('prototype of a Timepiece object is the prototype of Timepiece', function() {
        assert.equal(Object.getPrototypeOf(t), Timepiece.prototype);
      });

      it('prototype of the prototype of a Timepiece object is the prototype of EventEmitter', function() {
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
