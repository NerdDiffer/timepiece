var assert = require('assert');

var Countdown = require('../').Countdown;

describe('Countdown', function() {
  describe('initial settings', function() {
    context('by default:', function() {
      var c = new Countdown();

      it('is set to countdown from 60 seconds', function() {
        assert.equal(c.from, 60);
      });
    });
    context('custom settings less than 1 minute', function() {
      var c = new Countdown(30);

      it('can start countdown at 30 seconds', function() {
        assert.equal(c.from, 30);
      });
    });
    context('custom settings more than 1 minute', function() {
      var c = new Countdown(1800);

      it('can start countdown at 30 minutes', function() {
        assert.equal(c.from, 1800);
      });
    });
  });

  describe('#start', function() {

    context('when timer is not running', function() {
      var c = new Countdown();

      it('setup: double-check timer is not running', function() {
        assert(!c.isActive());
      });
      it('resumes the countdown', function() {
        c.start();
        assert(c.isActive());
      });
      after('teardown: stop the timer', function() {
        c.stop();
      });
    });
    context('when timer is already running', function() {
      var c = new Countdown();

      it.skip('does nothing', function() {
        // setup: verify timer is already running
        c.start();
        assert(c.isActive());
        // TODO: is this worth testing?
        // how do I test that nothing happens? with spies?
        // should I emit an event if its passed over?
      });
    });
  });

  describe('#stop', function() {
    var c = new Countdown();

    context('when timer is already running', function() {
      before('setup: start the timer', function() {
        c.start();
      });
      it('stops the countdown', function() {
        c.stop();
        assert(!c.isActive());
      });
      it('remembers where it started from', function() {
        c.stop();
        assert.equal(c.from, 60);
      });
    });
    context('when timer is not running', function() {
      it.skip('does nothing', function() {
        // TODO: is this worth testing?
        // how do I test that nothing happens? with spies?
        // should I emit an event if its passed over?
      });
    });
  });

  describe('#set', function() {
    context('if timer is not running', function() {
      var c = new Countdown();

      it('beforehand, timer is set to 60', function() {
        assert.equal(c.from, 60);
      });
      it('afterwards, sets a new value of the "from" property', function() {
        c.set(5);
        assert.equal(c.from, 5);
      });
    });
    context('if timer is already running', function() {
      it.skip('does nothing', function() {
        // TODO: is this worth testing?
        // how do I test that nothing happens? with spies?
        // should I emit an event if its passed over?
      });
    });
  });

  describe('#reset', function() {
    context('whether or not the timer is running', function() {
      var c = new Countdown();

      before('setup: start countdown and verify 2 things', function() {
        c.start();
        assert(c.isActive());
        it('waits a second & confirms the countdown went down', function(done) {
          setTimeout(function() {
            console.log(c.remaining, c.from);
            assert.notEqual(c.remaining, c.from);
            done();
          }, 1000);
        });
      });
      beforeEach('reset the timer', function() {
        c.reset();
      });
      afterEach('start up the timer again', function() {
        c.start();
      });

      it('stops the timer', function(done) {
        setTimeout(function() {
          assert(!c.isActive());
          done();
        }, 1000);
      });
      it('sets "remaining" to its original value, "from"', function() {
        assert.equal(c.remaining, c.from);
      });
    });
  });

  describe('#pause', function() {
    // is an alias for `#stop`, provides same behavior
  });

  describe('#resume', function() {
    // is an alias for `#start`, provides same behavior
  });

  describe('a scenario', function() {
    var c = new Countdown();
    // Artificially set time between assertions.
    // This is to emulate a simple scenario.
    // Typically, if you make Mocha wait longer than 2000 ms, it will give up.
    // But there are command-line options for Mocha to increase the limit.
    var msForTesting = 1000;

    before('set to 5 seconds & start', function() {
      c.set(5);
      c.start();
    });

    context('starting at 5 seconds', function() {
      it('has 4 seconds left after 1 second', function(done) {
        setTimeout(function() {
          assert.equal(c.remaining, 4);
          // Ensure that the timeout is respected by calling
          // `done` inside the callback to `setTimeout`.
          // Otherwise, the test suite will move on to evaluate the wrong
          // assertion under the wrong `it` block & provide false positives.
          done();
        }, msForTesting);
      });
      it('has 3 seconds left after 2 seconds', function(done) {
        setTimeout(function() {
          assert.equal(c.remaining, 3);
          done();
        }, msForTesting);
      });
      it('has 2 seconds left after 3 seconds', function(done) {
        setTimeout(function() {
          assert.equal(c.remaining, 2);
          done();
        }, msForTesting);
      });
      it('has 1 second  left after 4 seconds', function(done) {
        setTimeout(function() {
          assert.equal(c.remaining, 1);
          done();
        }, msForTesting);
      });
      it('emits a finish event with 0 seconds remaining', function(done) {
        var isFinished = false;
        c.once('finish', function() {
          isFinished = true;
        });

        setTimeout(function() {
          assert(isFinished);
          done();
        }, msForTesting);
      });
      it('remembers where it started from', function(done) {
        setTimeout(function() {
          assert.equal(c.from, 5);
          done();
        }, msForTesting);
      });
    });

    context('stopping countdown', function() {
      it('deletes the ticker property from the countdown', function(done) {
        setTimeout(function() {
          c.stop();
          assert(!c.hasOwnProperty('ticker'));
          done();
        }, msForTesting);
      });
    });
  });
});