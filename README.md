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

#### Brief overview of file structure

###### js/application/utility
Helper functions, ie get context, create audio buffers

###### js/application/scheduler
what fires events, based on [this](http://www.html5rocks.com/en/tutorials/audio/scheduling/)

###### js/application/destinations
the end result of event firing, ie play a sample, osc, or canvas

###### js/application/controllers
controllers (directives) for editing sequence or automation, so far a grid and kaos pad. Also holds the sequence controller, this should be the only folder with controllers (point of truth for sequence model, and cursorX/Y model)

###### js/application/transport
Directive for play/pause


#### Old:

###### sequencer.js
handles of prepping object to scheduler.js

###### service.js
rootScope that everything shares (tempo, measures, etc)

#### /modules
Directives that work as an intermediary between DOM manipulation and the sequence object

###### transport.js
play, pause, tempo, measure

###### grid.js
adding, removing signatures, assigning callbacks per layer

###### router.js, not done yet
node routing for audio stuff, ie source -> destination configuration

###### automation.js, not done yet
visual automation of callback paramaters over time.

####/asset handling

will be what handles/defines callbacks, right now it's just osc and samples


## To use
Press space or toggle play.