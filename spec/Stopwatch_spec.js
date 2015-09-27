var assert = require('assert');

var Stopwatch = require('../').Stopwatch;

describe('Stopwatch', function() {
  describe('initial settings', function() {
    var s = new Stopwatch();
    it('starts at 0', function() {
      assert.equal(s.elapsed, 0);
    });
    it('is not running', function() {
      assert(!s.isActive());
    });
  });

  describe('scenario: splits and laps', function() {
    var s = new Stopwatch();
    var testInterval = 1000;
    context('splitting 1 second after starting', function() {
      before('start timer', function() {
        s.start();
      });
      it('splits after 1 second', function(done) {
        setTimeout(function stopAtInterval() {
          s.split();
          assert(s.isActive());
          done();
        }, testInterval);
      });
      it('has 1.00 seconds as elapsed time', function() {
        assert.strictEqual(s.elapsed, 1.00);
      });
      it('has this split time', function() {
        assert.deepEqual(s.laps, [1.00]);
      });
    });

    context('run for 1.00 second and split again', function() {
      it('splits after 1.0 second', function(done) {
        setTimeout(function stopAtInterval() {
          s.split();
          assert(s.isActive());
          done();
        }, testInterval);
      });
      it('now has 2.00 seconds as elapsed time', function() {
        assert.strictEqual(s.elapsed, 2.00);
      });
      it('has these split times', function() {
        assert.deepEqual(s.laps, [1.00, 2.00]);
      });
    });
  });

  describe('scenario: starting & stopping', function() {
    var s = new Stopwatch();
    var testInterval = 1500;

    context('stopping 1.5 seconds after starting', function() {
      before('start timer', function() {
        s.start();
      });
      it('stops after 1.5 seconds', function(done) {
        setTimeout(function stopAtInterval() {
          s.stop();
          assert(!s.isActive());
          done();
        }, testInterval);
      });
      it('has 1.50 seconds as elapsed time', function() {
        assert.strictEqual(s.elapsed, 1.50);
      });
    });

    context('starting again: run for 1.50 seconds and stop', function() {
      before('start timer', function() {
        s.start();
      });
      it('stops after 1.5 seconds', function(done) {
        setTimeout(function stopAtInterval() {
          s.stop();
          assert(!s.isActive());
          done();
        }, testInterval);
      });
      it('now has 3.00 seconds as elapsed time', function() {
        assert.strictEqual(s.elapsed, 3.00);
      });
    });
  });
});
