// shared stuff for Countdown

var assert = require('assert');

/**
 * Some shared examples for `#stop` and `#pause` methods.
 * `#pause` is an alias for `#stop`.
 * @param c, instance of the Countdown class
 * @param mtd, [String]. Name of the property on `c` which is the method to test
 */
module.exports.behaviorForStop = function(c, mtd) {
  context('when timer is already running', function() {
    before('setup: start the timer', function() {
      c.start();
    });
    it('stops the countdown', function() {
      c[mtd]();
      assert(!c.isActive());
    });
    it('remembers where it started from', function() {
      c[mtd]();
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
};
