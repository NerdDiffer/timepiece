var assert = require('assert');

var Metronome = require('../').Metronome;

describe('Metronome', function() {

  describe('#fromBPM', function() {
    var m = new Metronome();

    it('returns the number of milliseconds per one beat', function() {
      assert.equal(m.fromBPM(30), 500);
      assert.equal(m.fromBPM(60), 1000);
      assert.equal(m.fromBPM(120), 2000);
    });
  });

  describe('#toBPM', function() {
    var m = new Metronome();

    it('returns the beats per minute', function() {
      assert.equal(m.toBPM(), 60);
      assert.equal(m.bpm, 60);
    });
    it('returns the beats per minute', function() {
      m.set(2000);
      assert.equal(m.toBPM(), 120);
      assert.equal(m.bpm, 120);
    });
  });

  xdescribe('changing the tempo', function() {
    var m = new Metronome();

    it('can change its tempo', function() {
      m.set();
      assert.equal();
    });
  });
});
