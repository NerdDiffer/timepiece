# timepiece

A set of event emitters, built around `setInterval`. It's for casual use and
the API is pretty straight-forward. I would *not* recommend the stopwatch for
benchmarking, performance tests, or anything else requiring accuracy finer
than to-the-centisecond.

The base class is `Timepiece`. From that, there are a few subclasses.

* `Metronome`: set the tempo, by beats per minute. Add your event listeners
  to the 'tick' event.
* `Countdown`: count down timer, set from a number of seconds.
* `Stopwatch`: measure elapsed time and save splits.
  * Because of the non-guarantee of when exactly `setInterval` fires events,
    don't use this if you need precision to-the-millisecond or finer.

All classes will these emit these events:

* `'start'`: emitted when the object starts.
* `'stop'`: emitted when the object stops.
* `'set'`: emitted when you change some setting on an object. The setting will
  vary from class to class.
* `'tick'`: once an object has started, it will emit a 'tick' event at some
  interval of time. The interval is once per second, unless of course, you are
  using a `Metronome` at a tempo other than the default.

### Installation

`$ npm install timepiece`

## Usage

### `Metronome`

```javascript
var Metronome = require('timepiece').Metronome;

// By default, a metronome object is set to 60 bpm.
var metronome = new Metronome();
// But you could also initialize one at another tempo.
var allegro = new Metronome(144);
```

A metronome object emits a `'tick'` event on each beat
```javascript
metronome.on('tick', function logBPM(){
  console.log(metronome.bpm + ' bpm');
});
```

Start metronome. Emits a `'start'` event.
```javascript
metronome.start();
```

Practice your instrument, make some music...

Change the tempo. Emits a `'set'` event.
```javascript
metronome.set(108);
```

Stop metronome. Emits a `'stop'` event.
```javascript
metronome.stop();
```

### `Countdown`

```javascript
var Countdown = require('timepiece').Countdown;

// By default, count down from 60 seconds.
var countdown = new Countdown();
// But you could also count down from any other span, set by number of seconds.
var countdownFrom90 = new Countdown(90); // a minute & thirty seconds
```

A Countdown object emits a `'tick'` event, once per second.
```javascript
countdown.on('tick', function reportTimeLeft() {
  console.log(countdown.remaining);
});
```

Start the timer. Emits a `'start'` event.
```javascript
countdown.on('start', function stopped() {
  console.log('starting timer at ' + countdown.from + ' seconds');
});
countdown.start();
```

Pause the timer. Emits a `'stop'` event
```javascript
countdown.on('stop', function stopped() {
  console.log('stopped timer with' + countdown.remaining + ' seconds left.');
});
countdown.pause(); // you could also call `#stop` for the same behavior.
```

Resume the timer from wherever you left off
```javascript
countdown.resume(); // you could also call `#start`
```

Reset the timer to its original count down setting.  
**NOTE**: this does not start the timer again, you do this manually.
```javascript
countdown.reset();
```

Set the timer to count down from another value.  
**NOTE**: this method checks if the timer is active, before doing anything.  
If the timer is already active, then nothing happens.
```javascript
countdown.set(30);
```

It emits a `'finish'` event when timer runs out.
```javascript
countdown.on('finish', function happy() {
  console.log('exciting stuff!');
});
```

### `Stopwatch`

```javascript
var Stopwatch = require('timepiece').Stopwatch;

var stopwatch = new Stopwatch();
```

A Stopwatch object emits a `'tick'` event, once per second.
```javascript
stopwatch.on('tick', function reportElapsedTime() {
  console.log(stopwatch.elapsed + ' seconds');
});
```

Start the stopwatch. Emits a `'start'` event.
```javascript
stopwatch.start();
```

Split time, save to the `laps` array. Emits a `split'` event.  
The stopwatch continues running.
```javascript
stopwatch.on('split', function showLaps() {
  console.log(stopwatch.laps);
});
stopwatch.split();
```

Stop the stopwatch. Emits a `'stop'` event.
```javascript
stopwatch.stop();
```

Reset the timer back to 0 seconds. Does not start it again.
```javascript
stopwatch.reset();
```
