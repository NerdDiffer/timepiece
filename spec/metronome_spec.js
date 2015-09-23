var assert = require('assert');

var Metronome = require('../').Metronome;

describe('Metronome', function() {

  describe('#fromBPM', function() {
    var m = new Metronome();

    context('when tempo is 30 bpm', function() {
      it('one beat is 2000 milliseconds', function() {
        assert.equal(m.fromBPM(30), 2000);
      });
    });
    context('when tempo is 60 bpm', function() {
      it('one beat is 1000 milliseconds', function() {
        assert.equal(m.fromBPM(60), 1000);
      });
    });
    context('when tempo is 120 bpm', function() {
      it('one beat is 500 milliseconds', function() {
        assert.equal(m.fromBPM(120), 500);
      });
    });
  });

  describe('#toBPM', function() {
    var m = new Metronome();

    context('when one beat is 2000 milliseconds', function() {
      it('returns tempo of 30 bpm', function() {
        assert.equal(m.toBPM(2000), 30);
      });
    });
    context('when one beat is 1000 milliseconds', function() {
      it('returns tempo of 60 bpm', function() {
        assert.equal(m.toBPM(1000), 60);
      });
    });
    context('when one beat is 500 milliseconds', function() {
      it('returns tempo of 120 bpm', function() {
        assert.equal(m.toBPM(500), 120);
      });
    });
  });

  describe('changing the tempo', function() {
    var m = new Metronome();

    context('setup: checking default settings', function() {
      it('bpm is 60', function() {
        assert.equal(m.bpm, 60);
      });
      it('one beat takes 1000 ms', function() {
        assert.equal(m.ms, 1000);
      });
    });

    context('after a tempo change', function() {

      beforeEach(function setNewBPM() {
        m.set(m.fromBPM(75)); // number of milliseconds for one beat at 75 bpm
      });

      it('bpm is 75', function() {
        assert.equal(m.bpm, 75);
      });
      it('one beat takes 800 ms', function() {
        assert.equal(m.ms, 800);
      });
    });
  });
});
