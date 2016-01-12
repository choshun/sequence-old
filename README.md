## sequence

### Setup

1. make sure you have node, npm, and mongodb installed
2. Go to root
3. $ npm install
4. $ npm install -g bower
5. $ bower install
6. $ npm start
7. $ mongod
8. Go to  http://localhost:3000

example json of time signatures. Time is in fraction of 1 measure, so .25 at 60bpm is .25 secs

```javascript
var SEQUENCE = [
    {
        "time": 0.25,
        "events": [
            {
                "layer": 1,
                "type": "audio",
                "params": {
                    "sample": 1,
                    "velocity": 0.5
                }
            }
        ]
    }
];
```

### app structure

##### js/application/utility
Helper functions, ie get context, create audio buffers

##### js/application/scheduler
what fires events, based on [this](http://www.html5rocks.com/en/tutorials/audio/scheduling/)

##### js/application/destinations
the end result of event firing, ie play a sample, osc, or canvas

##### js/application/controllers
controllers (directives) for editing sequence or automation, so far a grid and kaos pad. Could include a piano roll, you get the idea.

##### js/application/transport
Directive for play/pause. Creates concept of measure, beat, tempo etc.

##### js/application/sequence
The source of truth for the sequence model. Should have the only ng controller (as of now).

### To use
It should just be playing. Click on stuff.