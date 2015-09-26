var assert = require('assert');

var Stopwatch = require('../').Stopwatch;

describe('Stopwatch', function() {
  describe('initial settings', function() {
    var s = new Stopwatch();
    it('starts at 0', function() {
      assert.equal(s.time, 0);
    });
    it('is not running', function() {
      assert(!s.isActive());
    });
    it('actually has its "ms" property set to 10', function() {
      // this means it will emit 100 'tick' events per second
      assert.equal(s.ms, 10);
    });
  });
});
